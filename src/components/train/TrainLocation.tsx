"use client";

import React from "react";
import { MapPin, Navigation, Clock, Gauge, ArrowRight } from "lucide-react";
import { NormalizedJourneyData } from "@/lib/railkitNormalizer";

interface TrainLocationProps {
  data: NormalizedJourneyData;
  className?: string;
}

export default function TrainLocation({ data, className = "" }: TrainLocationProps) {
  const { live, train } = data;

  if (!live) {
    return (
      <div className={`bg-amber-50/80 rounded-3xl border border-amber-200/80 p-5 sm:p-6 text-center ${className}`}>
        <p className="text-sm font-bold text-amber-900">
          Live information unavailable for this train right now.
        </p>
      </div>
    );
  }

  const isDelay = typeof live.delay === "number" && live.delay > 0;

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-6 ${className}`}>
      {/* Live Badge & Title */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </span>
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-500">
            Live Train Location
          </h3>
        </div>

        {/* Live Status Pill */}
        <div
          className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 border ${
            isDelay
              ? "bg-amber-50 text-amber-900 border-amber-300"
              : "bg-emerald-50 text-emerald-900 border-emerald-300"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>{live.statusText}</span>
        </div>
      </div>

      {/* Primary Current Location Headline */}
      <div className="mb-5">
        <span className="text-xs font-bold text-slate-400 block mb-1">
          Currently at / near:
        </span>
        <div className="flex items-start gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
            <Navigation className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              {live.currentStation}
            </h4>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Train {train.number} ({train.name}) is in active transit.
            </p>
          </div>
        </div>
      </div>

      {/* 3-Part Station Sequence (Previous -> Next) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {/* Previous Station */}
        {live.previousStation && (
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Departed From
            </span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-slate-800 truncate">
                {live.previousStation}
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                Departed ✓
              </span>
            </div>
          </div>
        )}

        {/* Next Station */}
        {live.nextStation && (
          <div className="bg-emerald-50/70 rounded-2xl p-3.5 border border-emerald-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">
              Approaching Next
            </span>
            <div className="flex items-center justify-between">
              <span className="text-sm font-black text-slate-900 truncate">
                {live.nextStation}
              </span>
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded-md flex items-center gap-1">
                Next <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
