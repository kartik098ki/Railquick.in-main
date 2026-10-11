"use client";

import React from "react";
import { motion } from "framer-motion";
import { Train, Navigation2 } from "lucide-react";
import { NormalizedJourneyData } from "@/lib/railkitNormalizer";

interface TrainProgressProps {
  data: NormalizedJourneyData;
  className?: string;
}

export default function TrainProgress({ data, className = "" }: TrainProgressProps) {
  const { live, journey } = data;

  if (!live || live.progress === undefined) {
    return null;
  }

  const progressPct = Math.min(100, Math.max(0, live.progress));

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Journey Progress
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
            {progressPct}% Completed
          </h3>
        </div>

        {/* Distance Stats if available */}
        {live.distanceCovered !== undefined && live.totalDistance !== undefined && (
          <div className="text-right">
            <span className="text-[11px] font-mono font-bold text-slate-500 block">
              {live.distanceCovered} km / {live.totalDistance} km
            </span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-bold inline-block mt-0.5">
              {live.distanceRemaining} km remaining
            </span>
          </div>
        )}
      </div>

      {/* Progress Track */}
      <div className="relative pt-6 pb-2">
        {/* Origin and Destination labels */}
        <div className="flex justify-between text-xs font-black text-slate-700 mb-2">
          <span>{journey.sourceCode}</span>
          <span>{journey.destinationCode}</span>
        </div>

        {/* Outer bar */}
        <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full relative"
          />
        </div>

        {/* Floating Train Pin on Progress Bar */}
        <div
          className="absolute top-7 -translate-x-1/2 transition-all duration-1000"
          style={{ left: `${progressPct}%` }}
        >
          <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md border-2 border-white">
            <Train className="w-3.5 h-3.5 text-emerald-400" />
          </div>
        </div>

        {/* Subtitle Station names */}
        <div className="flex justify-between text-[11px] text-slate-500 font-medium mt-3">
          <span className="truncate max-w-[45%]">{journey.source}</span>
          <span className="truncate max-w-[45%] text-right">{journey.destination}</span>
        </div>
      </div>
    </div>
  );
}
