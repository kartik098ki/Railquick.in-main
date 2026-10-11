"use client";

import React from "react";
import { Train, Calendar, MapPin, User, Armchair, ShieldCheck, CheckCircle2 } from "lucide-react";
import { NormalizedJourneyData } from "@/lib/railkitNormalizer";

interface PNRJourneyCardProps {
  data: NormalizedJourneyData;
  className?: string;
}

export default function PNRJourneyCard({ data, className = "" }: PNRJourneyCardProps) {
  const { train, journey, passenger, pnr } = data;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* ─── TICKET HEADER & TRAIN CARD ─── */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Top Ticket Header Banner */}
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50/60 to-slate-50 px-5 sm:px-6 py-4 border-b border-dashed border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200">
                Confirmed Ticket
              </span>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-0.5">
                {train.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-mono font-black text-xs sm:text-sm shadow-xs">
              {train.number}
            </span>
            {pnr && (
              <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-mono font-bold text-xs">
                PNR: {pnr}
              </span>
            )}
          </div>
        </div>

        {/* Route & Journey Details */}
        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Origin */}
            <div className="text-left">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Boarding Station
              </div>
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {journey.sourceCode}
              </p>
              <p className="text-xs text-slate-600 font-medium mt-0.5 truncate">
                {journey.source}
              </p>
            </div>

            {/* Travel Line Visual */}
            <div className="flex flex-col items-center justify-center px-2 py-1 text-center">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 mb-1">
                <Calendar className="w-3 h-3 text-amber-500" />
                <span>{journey.date}</span>
              </div>
              <div className="w-full flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-600" />
                <div className="h-0.5 flex-1 bg-gradient-to-r from-emerald-600 via-amber-400 to-blue-600 relative">
                  <Train className="w-3.5 h-3.5 text-slate-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="w-2 h-2 rounded-full bg-blue-600" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-1">
                Class {journey.class || "3A"} • {journey.quota || "General"} Quota
              </span>
            </div>

            {/* Destination */}
            <div className="text-left md:text-right">
              <div className="flex items-center md:justify-end gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" /> Destination
              </div>
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {journey.destinationCode}
              </p>
              <p className="text-xs text-slate-600 font-medium mt-0.5 truncate">
                {journey.destination}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─── PROMINENT "YOUR SEAT" CARD (SECTION 10) ─── */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-700/80 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/80">
          <div className="flex items-center gap-2">
            <Armchair className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm sm:text-base font-black tracking-tight uppercase">
              Your Seat Information
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {passenger.status || "CONFIRMED"}
          </span>
        </div>

        {/* 3 Prominent Stat Blocks */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-4 text-center">
          {/* Coach */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Coach
            </span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-300 mt-0.5 block">
              {passenger.coach || "--"}
            </span>
          </div>

          {/* Seat / Berth */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Berth / Seat
            </span>
            <span className="text-2xl sm:text-3xl font-black font-mono text-white mt-0.5 block">
              {passenger.seat || "--"}
            </span>
          </div>

          {/* Berth Type */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/10">
            <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Berth Type
            </span>
            <span className="text-sm sm:text-lg font-black text-amber-300 mt-1 block truncate">
              {passenger.berthType || "--"}
            </span>
          </div>
        </div>

        {/* Extra Passenger list if multiple passengers exist */}
        {passenger.passengersList && passenger.passengersList.length > 1 && (
          <div className="mt-4 pt-3 border-t border-slate-700/80">
            <span className="text-[11px] font-bold text-slate-400 block mb-2">
              All Passengers on this PNR:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {passenger.passengersList.map((p) => (
                <div key={p.number} className="bg-white/5 rounded-xl p-2 text-xs flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Passenger {p.number}</span>
                  <span className="font-mono font-bold text-emerald-300">
                    {p.coach}-{p.seat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
