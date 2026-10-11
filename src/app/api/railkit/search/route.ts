import { NextResponse } from "next/server";
import { TRAIN_DIRECTORY } from "@/lib/trainDatabase";

const RAILKIT_API_KEY =
  process.env.RAILKIT_API_KEY || "irctc_d2736176c9ea10f80fb61dc03c41522e7553930a39941cdb";

const POPULAR_TRAINS = Object.values(TRAIN_DIRECTORY).map((t) => ({
  trainNo: t.trainNo,
  trainName: t.trainName,
  route: `${t.from.name} ⇄ ${t.to.name}`,
}));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim() || searchParams.get("q")?.trim() || "";

  if (!query || query.length < 2) {
    return NextResponse.json({
      success: true,
      trains: POPULAR_TRAINS.slice(0, 8),
    });
  }

  try {
    // 1. If numeric digits (4-5), search via RailKit trains endpoint
    if (/^\d{4,5}$/.test(query)) {
      try {
        const res = await fetch(`https://api.railkit.in/api/v1/trains/${query}`, {
          method: "GET",
          headers: {
            "x-api-key": RAILKIT_API_KEY,
            "accept": "application/json",
          },
          signal: AbortSignal.timeout(6000),
          next: { revalidate: 60 },
        });

        if (res.ok) {
          const json = await res.json().catch(() => null);
          const trainsList = json?.data?.trains;
          if (Array.isArray(trainsList) && trainsList.length > 0) {
            return NextResponse.json({
              success: true,
              trains: trainsList.map((t: any) => ({
                trainNo: String(t.trainNo || t.train_no || query),
                trainName: t.trainName || t.train_name || `Train ${query}`,
                route: t.from && t.to ? `${t.from} ⇄ ${t.to}` : "Indian Railways Express",
              })),
            });
          }
        }
      } catch {
        // Fall through to known train directory
      }

      const match = TRAIN_DIRECTORY[query];
      if (match) {
        return NextResponse.json({
          success: true,
          trains: [
            {
              trainNo: match.trainNo,
              trainName: match.trainName,
              route: `${match.from.name} ⇄ ${match.to.name}`,
            },
          ],
        });
      }
    }

    // 2. Search by train name
    const qLower = query.toLowerCase();
    const localFiltered = POPULAR_TRAINS.filter(
      (t) =>
        t.trainNo.includes(query) ||
        t.trainName.toLowerCase().includes(qLower) ||
        t.route.toLowerCase().includes(qLower)
    );

    let upstreamTrains: Array<{ trainNo: string; trainName: string; route: string }> = [];
    try {
      const res = await fetch(`https://api.railkit.in/api/v1/trains/search?name=${encodeURIComponent(query)}`, {
        method: "GET",
        headers: {
          "x-api-key": RAILKIT_API_KEY,
          accept: "application/json",
        },
        signal: AbortSignal.timeout(5000),
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const json = await res.json().catch(() => null);
        const list = Array.isArray(json?.data)
          ? json.data
          : Array.isArray(json?.data?.trains)
          ? json.data.trains
          : Array.isArray(json?.trains)
          ? json.trains
          : [];

        if (list.length > 0) {
          upstreamTrains = list
            .map((t: any) => ({
              trainNo: String(t.trainNo || t.train_no || t.trainNumber || ""),
              trainName: t.trainName || t.train_name || t.name || "",
              route: `${t.from_stn_name || t.fromStation || t.from || "Origin"} ⇄ ${t.to_stn_name || t.toStation || t.to || "Destination"}`,
            }))
            .filter((t: any) => t.trainNo);
        }
      }
    } catch {
      // Upstream failed or timed out, use local directory matches
    }

    const seen = new Set<string>();
    const merged: Array<{ trainNo: string; trainName: string; route: string }> = [];

    for (const t of [...upstreamTrains, ...localFiltered]) {
      if (t.trainNo && !seen.has(t.trainNo)) {
        seen.add(t.trainNo);
        merged.push(t);
      }
    }

    return NextResponse.json({
      success: true,
      trains: merged.slice(0, 10),
    });
  } catch (err: any) {
    console.error("Train search error:", err);
    return NextResponse.json({
      success: true,
      trains: POPULAR_TRAINS.slice(0, 8),
    });
  }
}
