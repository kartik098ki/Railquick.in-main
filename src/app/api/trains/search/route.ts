import { NextResponse } from "next/server";
import { configure, getTrainInfo } from "railkit";
import { TRAIN_DIRECTORY, resolveTrainInfo } from "@/lib/trainDatabase";

const API_KEY = process.env.RAILKIT_API_KEY || "irctc_e6be745cb2116767464349ff98cf094ae7188c3fd518b9f3";

try {
  configure(API_KEY);
} catch (e) {
  console.warn("RailKit configure warning:", e);
}

// Generate rich popular trains list from train directory
const POPULAR_TRAINS = Object.values(TRAIN_DIRECTORY).map((t) => ({
  trainNo: t.trainNo,
  trainName: t.trainName,
  route: `${t.from.name} ⇄ ${t.to.name}`,
}));

async function fetchDirectTrainInfo(trainNo: string) {
  try {
    const res = await fetch(`https://api.railkit.in/api/v1/trains/${trainNo}/info`, {
      method: "GET",
      headers: {
        "x-api-key": API_KEY,
        "accept": "application/json",
      },
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.success !== false && json.data?.trainInfo) {
        return json.data.trainInfo;
      }
    }
  } catch {
    // Network or key error
  }
  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim() || searchParams.get("q")?.trim() || "";

  if (!query || query.length < 2) {
    return NextResponse.json({
      success: true,
      trains: POPULAR_TRAINS.slice(0, 15),
    });
  }

  try {
    // 1. If 4 or 5 numeric digits, lookup official live train info via Direct REST or SDK
    if (/^\d{4,5}$/.test(query)) {
      // 1A. Try Direct REST endpoint
      const directInfo = await fetchDirectTrainInfo(query);
      if (directInfo) {
        return NextResponse.json({
          success: true,
          trains: [
            {
              trainNo: directInfo.train_no || query,
              trainName: directInfo.train_name || `Express ${query}`,
              route:
                directInfo.from_stn_name && directInfo.to_stn_name
                  ? `${directInfo.from_stn_name} ⇄ ${directInfo.to_stn_name}`
                  : "Indian Railways Route",
            },
          ],
        });
      }

      // 1B. Try SDK
      try {
        const numRes = await getTrainInfo(query);
        if (numRes && numRes.success && numRes.data?.trainInfo) {
          const t = numRes.data.trainInfo;
          return NextResponse.json({
            success: true,
            trains: [
              {
                trainNo: t.train_no || query,
                trainName: t.train_name || `Express ${query}`,
                route:
                  t.from_stn_name && t.to_stn_name
                    ? `${t.from_stn_name} ⇄ ${t.to_stn_name}`
                    : "Indian Railways Route",
              },
            ],
          });
        }
      } catch (err) {
        console.warn("Railkit SDK getTrainInfo notice:", err);
      }

      // 1C. High-fidelity database lookup
      const resolved = resolveTrainInfo(query);
      if (resolved) {
        return NextResponse.json({
          success: true,
          trains: [
            {
              trainNo: resolved.trainNo,
              trainName: resolved.trainName,
              route: `${resolved.from.name} ⇄ ${resolved.to.name}`,
            },
          ],
        });
      }
    }

    // 2. Fuzzy filter curated popular trains list
    const qLower = query.toLowerCase();
    const filtered = POPULAR_TRAINS.filter(
      (t) =>
        t.trainNo.includes(query) ||
        t.trainName.toLowerCase().includes(qLower) ||
        t.route.toLowerCase().includes(qLower)
    );

    if (filtered.length > 0) {
      return NextResponse.json({
        success: true,
        trains: filtered.slice(0, 10),
      });
    }

    // 3. Fallback for numeric search: resolve using smart directory
    if (/^\d{3,5}$/.test(query)) {
      const resolved = resolveTrainInfo(query);
      return NextResponse.json({
        success: true,
        trains: [
          {
            trainNo: resolved.trainNo,
            trainName: resolved.trainName,
            route: `${resolved.from.name} ⇄ ${resolved.to.name}`,
          },
        ],
      });
    }

    return NextResponse.json({
      success: true,
      trains: POPULAR_TRAINS.slice(0, 5),
    });
  } catch (err: any) {
    console.error("Train search error:", err);
    return NextResponse.json({
      success: true,
      trains: POPULAR_TRAINS.slice(0, 5),
    });
  }
}
