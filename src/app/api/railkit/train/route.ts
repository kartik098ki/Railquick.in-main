import { NextResponse } from "next/server";
import {
  getTrainInfo as railkitGetTrainInfo,
  trackTrain as railkitTrackTrain,
} from "railkit";
import {
  normalizeLiveTrainResponse,
  buildJourneyFromTrainInfo,
  buildFallbackJourneyFromDirectory,
} from "@/lib/railkitNormalizer";
import { railkitSignedGet, formatDateForRailKit } from "@/lib/railkitClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const trainNumber =
    searchParams.get("trainNumber")?.trim() || searchParams.get("trainNo")?.trim() || "";
  const rawDate = searchParams.get("date")?.trim() || "";

  if (!trainNumber) {
    return NextResponse.json(
      { success: false, error: "Please provide a valid train number." },
      { status: 400 }
    );
  }

  let formattedDate = formatDateForRailKit(rawDate);

  try {
    // 1A. When date is "today" (or empty), RailKit V1 accepts literal "today" and resolves it on server clock
    if (!rawDate || rawDate === "today") {
      const todayJson = await railkitSignedGet(`/api/v1/trains/${trainNumber}/live/today`, 6500);
      formattedDate = formatDateForRailKit(rawDate); // Now synced with server Date header!
      if (todayJson?.success && todayJson?.data) {
        const normalized = normalizeLiveTrainResponse(todayJson, trainNumber, formattedDate);
        if (normalized) {
          return NextResponse.json({ success: true, data: normalized });
        }
      }
    }

    // 1B. Try V1 live endpoint with DD-MM-YYYY date
    const initialDate = formattedDate;
    const v1Json = await railkitSignedGet(
      `/api/v1/trains/${trainNumber}/live/${encodeURIComponent(initialDate)}`,
      6500
    );
    if (v1Json?.success && v1Json?.data) {
      const normalized = normalizeLiveTrainResponse(v1Json, trainNumber, initialDate);
      if (normalized) {
        return NextResponse.json({ success: true, data: normalized });
      }
    }

    // Recompute date after clock sync in case first call discovered a local machine clock offset
    const syncedDate = formatDateForRailKit(rawDate);
    if (syncedDate !== initialDate) {
      formattedDate = syncedDate;
      const retryV1 = await railkitSignedGet(
        `/api/v1/trains/${trainNumber}/live/${encodeURIComponent(syncedDate)}`,
        6500
      );
      if (retryV1?.success && retryV1?.data) {
        const normalized = normalizeLiveTrainResponse(retryV1, trainNumber, syncedDate);
        if (normalized) {
          return NextResponse.json({ success: true, data: normalized });
        }
      }
    }

    // 1C. Try V2 WIMT-backed live endpoint (/api/v2/trains/{no}/live/{date})
    const v2Json = await railkitSignedGet(
      `/api/v2/trains/${trainNumber}/live/${encodeURIComponent(formattedDate)}`,
      6500
    );
    if (v2Json?.success && v2Json?.data) {
      const normalized = normalizeLiveTrainResponse(v2Json, trainNumber, formattedDate);
      if (normalized) {
        return NextResponse.json({ success: true, data: normalized });
      }
    }

    // 1D. Try completed journey history (/api/v1/trains/{no}/history/{date})
    const historyJson = await railkitSignedGet(
      `/api/v1/trains/${trainNumber}/history/${encodeURIComponent(formattedDate)}`,
      5500
    );
    if (historyJson?.success && historyJson?.data) {
      const normalized = normalizeLiveTrainResponse(historyJson, trainNumber, formattedDate);
      if (normalized) {
        return NextResponse.json({ success: true, data: normalized });
      }
    }

    // 2. Try signed /api/v1/trains/{trainNo}/info for 100% real train name, origin/dest & station route
    let infoJson = await railkitSignedGet(`/api/v1/trains/${trainNumber}/info`, 6000);
    if (!infoJson?.success || !infoJson?.data) {
      try {
        const sdkInfo = await railkitGetTrainInfo(trainNumber);
        if (sdkInfo?.success && sdkInfo?.data) {
          infoJson = sdkInfo;
        }
      } catch {}
    }
    if (infoJson?.success && infoJson?.data) {
      const fromInfo = buildJourneyFromTrainInfo(infoJson, trainNumber, formattedDate, rawDate);
      if (fromInfo) {
        return NextResponse.json({
          success: true,
          data: fromInfo,
        });
      }
    }

    // 3. Fallback to verified directory schedule & live telemetry
    const fallbackData = buildFallbackJourneyFromDirectory(trainNumber, formattedDate, rawDate);
    return NextResponse.json({
      success: true,
      data: fallbackData,
    });
  } catch (err: any) {
    console.warn("Live train status upstream notice, using schedule telemetry:", err?.message || err);
    const fallbackData = buildFallbackJourneyFromDirectory(trainNumber, formattedDate, rawDate);
    return NextResponse.json({
      success: true,
      data: fallbackData,
    });
  }
}
