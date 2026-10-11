import { NextResponse } from "next/server";
import { normalizeLiveTrainResponse } from "@/lib/railkitNormalizer";

const RAILKIT_API_KEY = process.env.RAILKIT_API_KEY || "";

function formatDateForLiveApi(rawDate?: string): string {
  if (!rawDate || rawDate === "today") {
    const now = new Date();
    return `${String(now.getDate()).padStart(2, "0")}-${String(now.getMonth() + 1).padStart(2, "0")}-${now.getFullYear()}`;
  }

  if (rawDate === "yesterday") {
    const d = new Date(Date.now() - 86400000);
    return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
  }

  if (rawDate === "tomorrow") {
    const d = new Date(Date.now() + 86400000);
    return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
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
  const trainNumber = searchParams.get("trainNumber")?.trim() || searchParams.get("trainNo")?.trim() || "";
  const rawDate = searchParams.get("date")?.trim() || "";

  if (!trainNumber) {
    return NextResponse.json(
      { success: false, error: "Please provide a valid train number." },
      { status: 400 }
    );
  }

  const formattedDate = formatDateForLiveApi(rawDate);

  try {
    const res = await fetch(`https://api.railkit.in/api/v1/trains/${trainNumber}/live/${formattedDate}`, {
      method: "GET",
      headers: {
        "x-api-key": RAILKIT_API_KEY,
        "accept": "application/json",
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
      cache: "no-store",
    });

    const json = await res.json().catch(() => null);

    if (res.ok && json && json.success && json.data) {
      const normalized = normalizeLiveTrainResponse(json, trainNumber, formattedDate);
      if (normalized) {
        return NextResponse.json({
          success: true,
          data: normalized,
        });
      }
    }

    // Zero fabrication: If RailKit does not return live data, state clearly
    return NextResponse.json(
      {
        success: false,
        error: json?.error || "Live information unavailable for this train right now.",
      },
      { status: 404 }
    );
  } catch (err: any) {
    console.error("Live train status error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "Live information unavailable for this train right now.",
      },
      { status: 500 }
    );
  }
}
