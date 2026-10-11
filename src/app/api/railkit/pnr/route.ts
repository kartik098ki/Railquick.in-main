import { NextResponse } from "next/server";
import { normalizePNRResponse, normalizeLiveTrainResponse } from "@/lib/railkitNormalizer";

const RAILKIT_API_KEY =
  process.env.RAILKIT_API_KEY || "irctc_d2736176c9ea10f80fb61dc03c41522e7553930a39941cdb";

function formatDateForLiveApi(rawDate?: string): string {
  if (!rawDate) {
    const now = new Date();
    return `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()}`;
  }

  // Already DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(rawDate)) {
    return rawDate;
  }

  // Handle YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) {
    const [y, m, d] = rawDate.split("-");
    return `${d}-${m}-${y}`;
  }

  // Try standard date parsing (e.g. "22 Aug 2026, 04:35:00 pm" or "11 Oct 2026")
  const parsed = new Date(rawDate);
  if (!isNaN(parsed.getTime())) {
    const d = String(parsed.getDate()).padStart(2, "0");
    const m = String(parsed.getMonth() + 1).padStart(2, "0");
    return `${d}-${m}-${parsed.getFullYear()}`;
  }

  return rawDate;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawPnr = searchParams.get("pnr")?.trim() || "";

  // 1. Strict 10-digit numeric validation
  const cleanPnr = rawPnr.replace(/\D/g, "");

  if (cleanPnr.length !== 10) {
    return NextResponse.json(
      {
        success: false,
        error: "Please enter a valid 10-digit PNR.",
      },
      { status: 400 }
    );
  }

  try {
    // 2. Call the actual RailKit PNR API (API key is secure on backend)
    const pnrRes = await fetch(`https://api.railkit.in/api/v1/pnr/${cleanPnr}`, {
      method: "GET",
      headers: {
        "x-api-key": RAILKIT_API_KEY,
        "accept": "application/json",
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
      cache: "no-store",
    });

    const pnrJson = await pnrRes.json().catch(() => null);

    if (!pnrRes.ok || !pnrJson || pnrJson.success === false || !pnrJson.data) {
      const errorMsg =
        pnrJson?.error ||
        pnrJson?.message ||
        "No PNR data found or invalid PNR number in Indian Railways system. Please verify your 10-digit PNR.";

      return NextResponse.json(
        {
          success: false,
          error: errorMsg,
        },
        { status: pnrRes.status === 404 ? 404 : 400 }
      );
    }

    // 3. Normalize verified PNR response
    const journeyData = normalizePNRResponse(pnrJson, cleanPnr);

    if (!journeyData || !journeyData.train.number) {
      return NextResponse.json(
        {
          success: false,
          error: "Could not retrieve verified journey details for this PNR.",
        },
        { status: 404 }
      );
    }

    // 4. Retrieve live train status using the EXACT train number and journey date from the PNR
    const exactTrainNumber = journeyData.train.number;
    const formattedDate = formatDateForLiveApi(journeyData.journey.date);

    try {
      const liveRes = await fetch(
        `https://api.railkit.in/api/v1/trains/${exactTrainNumber}/live/${formattedDate}`,
        {
          method: "GET",
          headers: {
            "x-api-key": RAILKIT_API_KEY,
            "accept": "application/json",
          },
          signal: AbortSignal.timeout(8000),
          cache: "no-store",
        }
      );

      if (liveRes.ok) {
        const liveJson = await liveRes.json().catch(() => null);
        if (liveJson && liveJson.success && liveJson.data) {
          const liveNormalized = normalizeLiveTrainResponse(liveJson, exactTrainNumber, formattedDate);
          if (liveNormalized && liveNormalized.live) {
            journeyData.live = liveNormalized.live;
          }
        }
      }
    } catch (liveErr) {
      // If live is unavailable, do NOT invent data. Keep live: null.
      console.warn("Live train status unavailable for PNR journey:", liveErr);
    }

    return NextResponse.json({
      success: true,
      data: journeyData,
    });
  } catch (err: any) {
    console.error("RailKit PNR error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "We're having trouble connecting to Indian Railways right now. Please try again.",
      },
      { status: 500 }
    );
  }
}
