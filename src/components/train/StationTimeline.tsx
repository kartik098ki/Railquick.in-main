"use client";

import React, { useState } from "react";
import { Check, Clock, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { NormalizedStation } from "@/lib/railkitNormalizer";

interface StationTimelineProps {
  stations: NormalizedStation[];
  className?: string;
}

export default function StationTimeline({ stations, className = "" }: StationTimelineProps) {
  const [showAllPassed, setShowAllPassed] = useState(false);

  if (!stations || stations.length === 0) {
    return null;
  }

  const passedStations = stations.filter((s) => s.state === "completed");
  const currentStation = stations.find((s) => s.state === "current") || stations[0];
  const upcomingStations = stations.filter((s) => s.state === "upcoming");

  // On mobile/compact view, we can collapse older passed stations if there are many (> 3)
  const shouldCollapsePassed = passedStations.length > 3 && !showAllPassed;
  const visiblePassedStations = shouldCollapsePassed
    ? passedStations.slice(passedStations.length - 2)
    : passedStations;

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            Live Station Timeline
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Real-time platform halts & schedule tracking
          </p>
        </div>
        <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-xl">
          {stations.length} Stops
        </span>
      </div>

      {/* Passed Stations Collapse Toggle */}
      {passedStations.length > 3 && (
        <button
          type="button"
          onClick={() => setShowAllPassed(!showAllPassed)}
          className="w-full mb-4 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 border border-slate-200/60"
        >
          {showAllPassed ? (
            <>
              <span>Hide {passedStations.length - 2} earlier stops</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Show {passedStations.length - 2} earlier departed stops</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      )}

      {/* Timeline List */}
      <div className="relative pl-6 sm:pl-8 space-y-6">
        {/* Continuous background vertical line */}
        <div className="absolute left-[11px] sm:left-[15px] top-3 bottom-3 w-0.5 bg-slate-200" />

        {/* 1. Passed Stations */}
        {visiblePassedStations.map((station, idx) => (
          <div key={`passed-${station.code}-${idx}`} className="relative group">
            {/* Completed Node (✓) */}
            <div className="absolute -left-[23px] sm:-left-[27px] top-1 w-5 h-5 rounded-full bg-slate-900 text-emerald-400 flex items-center justify-center shadow-xs border-2 border-white z-10">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 opacity-70 hover:opacity-100 transition-opacity">
              <div>
                <span className="font-mono text-[10px] font-bold text-slate-400 mr-2">
                  {station.code}
                </span>
                <span className="text-sm font-bold text-slate-700">
                  {station.name}
                </span>
                {station.platform && (
                  <span className="text-[10px] text-slate-400 ml-2 font-mono">
                    PF {station.platform}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                <span>Arr: {station.actualArrival || station.scheduledArrival}</span>
                <span>Dep: {station.actualDeparture || station.scheduledDeparture}</span>
              </div>
            </div>
          </div>
        ))}

        {/* 2. Current Station (Visually Prominent with Pulsing Indicator) */}
        {currentStation && (
          <div className="relative my-4">
            {/* Pulsing Live Node */}
            <div className="absolute -left-[27px] sm:-left-[31px] top-3 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md border-4 border-white z-10 animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-white" />
            </div>

            <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-300 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  Current Station
                </span>
                {currentStation.delayMinutes !== undefined && (
                  <span
                    className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md ${
                      currentStation.delayMinutes > 0
                        ? "bg-amber-100 text-amber-900 border border-amber-300"
                        : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                    }`}
                  >
                    {currentStation.delayMinutes > 0
                      ? `${currentStation.delayMinutes}m delay`
                      : "On Time"}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    {currentStation.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono font-bold">
                    Code: {currentStation.code} • Platform {currentStation.platform || "1"} • Halt: {currentStation.halt || "2m"}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono font-bold text-slate-800 bg-white/80 p-2 rounded-xl border border-emerald-200/60">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-normal">Arrival</span>
                    <span>{currentStation.actualArrival || currentStation.scheduledArrival}</span>
                  </div>
                  <div className="w-px h-6 bg-slate-200" />
                  <div>
                    <span className="text-[10px] text-slate-400 block font-normal">Departure</span>
                    <span>{currentStation.actualDeparture || currentStation.scheduledDeparture}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Upcoming Stations (○) */}
        {upcomingStations.map((station, idx) => (
          <div key={`upcoming-${station.code}-${idx}`} className="relative group">
            {/* Upcoming Circle Node (○) */}
            <div className="absolute -left-[22px] sm:-left-[26px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-slate-300 group-hover:border-slate-500 z-10 transition-colors" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-slate-700">
              <div>
                <span className="font-mono text-[10px] font-bold text-slate-400 mr-2">
                  {station.code}
                </span>
                <span className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {station.name}
                </span>
                {station.platform && (
                  <span className="text-[10px] text-slate-400 ml-2 font-mono">
                    PF {station.platform}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                <span>Arr: {station.scheduledArrival}</span>
                <span>Dep: {station.scheduledDeparture}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
