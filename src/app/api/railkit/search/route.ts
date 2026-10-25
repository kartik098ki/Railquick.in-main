import { NextResponse } from "next/server";
import { TRAIN_DIRECTORY, resolveTrainInfo } from "@/lib/trainDatabase";
import { railkitSignedGet } from "@/lib/railkitClient";

const POPULAR_TRAINS = Object.values(TRAIN_DIRECTORY).map((t) => ({
  trainNo: t.trainNo,
  trainName: t.trainName,
  route: `${t.from.name} (${t.from.code}) ⇄ ${t.to.name} (${t.to.code})`,
  stopsText: t.stops.map((s) => `${s.name} ${s.code}`).join(" ").toLowerCase(),
}));

const searchCache = new Map<
  string,
  { trains: Array<{ trainNo: string; trainName: string; route: string }>; ts: number }
>();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim() || searchParams.get("q")?.trim() || "";

  if (!query || query.length < 2) {
    return NextResponse.json({
      success: true,
      trains: POPULAR_TRAINS.slice(0, 8).map(({ trainNo, trainName, route }) => ({
        trainNo,
        trainName,
        route,
      })),
    });
  }

  const cacheKey = query.toLowerCase();
  const cached = searchCache.get(cacheKey);
  if (cached && Date.now() - cached.ts < 5 * 60 * 1000) {
    return NextResponse.json({
      success: true,
      trains: cached.trains,
    });
  }

  try {
    // 1. Numeric train number lookup (4-5 digits)
    if (/^\d{4,5}$/.test(query)) {
      // 1A. For 5-digit train numbers, /info returns exact train name + origin & destination stations
      if (query.length === 5) {
        const infoJson = await railkitSignedGet(`/api/v1/trains/${query}/info`, 5500);
        const info = infoJson?.data?.trainInfo;
        if (info) {
          const fromStr = info.from_stn_name
            ? `${info.from_stn_name}${info.from_stn_code ? ` (${info.from_stn_code})` : ""}`
            : "";
          const toStr = info.to_stn_name
            ? `${info.to_stn_name}${info.to_stn_code ? ` (${info.to_stn_code})` : ""}`
            : "";
          const single = [
            {
              trainNo: String(info.train_no || query),
              trainName: info.train_name || `Train ${query}`,
              route: fromStr && toStr ? `${fromStr} ⇄ ${toStr}` : "Indian Railways Express",
            },
          ];
          searchCache.set(cacheKey, { trains: single, ts: Date.now() });
          return NextResponse.json({
            success: true,
            trains: single,
          });
        }
      }

      // 1B. Try /api/v1/trains/{query} prefix search
      const json = await railkitSignedGet(`/api/v1/trains/${query}`, 5500);
      const trainsList = json?.data?.trains;
      if (Array.isArray(trainsList) && trainsList.length > 0) {
        const mapped = trainsList.map((t: any) => {
          const no = String(t.trainNo || t.train_no || query);
          const localMatch = TRAIN_DIRECTORY[no];
          const route =
            t.from && t.to
              ? `${t.from} ⇄ ${t.to}`
              : localMatch
              ? `${localMatch.from.name} (${localMatch.from.code}) ⇄ ${localMatch.to.name} (${localMatch.to.code})`
              : "Indian Railways Express";
          return {
            trainNo: no,
            trainName: t.trainName || t.train_name || localMatch?.trainName || `Train ${no}`,
            route,
          };
        });
        searchCache.set(cacheKey, { trains: mapped, ts: Date.now() });
        return NextResponse.json({
          success: true,
          trains: mapped,
        });
      }

      // 1C. Fallback to local directory
      const resolved = resolveTrainInfo(query);
      const single = [
        {
          trainNo: resolved.trainNo,
          trainName: resolved.trainName,
          route: `${resolved.from.name} (${resolved.from.code}) ⇄ ${resolved.to.name} (${resolved.to.code})`,
        },
      ];
      return NextResponse.json({
        success: true,
        trains: single,
      });
    }

    // 2. Search by train name or station name/code
    const qLower = query.toLowerCase();
    const qWords = qLower.split(/\s+/).filter(Boolean);
    const localFiltered = POPULAR_TRAINS.filter(
      (t) =>
        t.trainNo.includes(query) ||
        t.trainName.toLowerCase().includes(qLower) ||
        t.route.toLowerCase().includes(qLower) ||
        qWords.every(
          (w) =>
            t.trainName.toLowerCase().includes(w) ||
            t.route.toLowerCase().includes(w) ||
            t.stopsText.includes(w)
        )
    ).map(({ trainNo, trainName, route }) => ({ trainNo, trainName, route }));

    let upstreamTrains: Array<{ trainNo: string; trainName: string; route: string }> = [];
    const json = await railkitSignedGet(
      `/api/v1/trains/search?name=${encodeURIComponent(query)}`,
      5500
    );

    if (json) {
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
            route:
              t.from_stn_name && t.to_stn_name
                ? `${t.from_stn_name} ⇄ ${t.to_stn_name}`
                : t.from && t.to
                ? `${t.from} ⇄ ${t.to}`
                : "Indian Railways Express",
          }))
          .filter((t: any) => t.trainNo);
      }
    }

    const seen = new Set<string>();
    const merged: Array<{ trainNo: string; trainName: string; route: string }> = [];

    for (const t of [...upstreamTrains, ...localFiltered]) {
      if (t.trainNo && !seen.has(t.trainNo)) {
        seen.add(t.trainNo);
        const local = TRAIN_DIRECTORY[t.trainNo];
        const route =
          t.route && t.route !== "Indian Railways Express"
            ? t.route
            : local
            ? `${local.from.name} (${local.from.code}) ⇄ ${local.to.name} (${local.to.code})`
            : "Indian Railways Express";
        merged.push({
          trainNo: t.trainNo,
          trainName: t.trainName || local?.trainName || `Train ${t.trainNo}`,
          route,
        });
      }
    }

    const finalResults = merged.slice(0, 10);
    if (finalResults.length > 0) {
      searchCache.set(cacheKey, { trains: finalResults, ts: Date.now() });
    }
    return NextResponse.json({
      success: true,
      trains: finalResults,
    });
  } catch (err: any) {
    console.error("Train search error:", err);
    return NextResponse.json({
      success: true,
      trains: POPULAR_TRAINS.slice(0, 8).map(({ trainNo, trainName, route }) => ({
        trainNo,
        trainName,
        route,
      })),
    });
  }
}
