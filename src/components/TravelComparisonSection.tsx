"use client";

import React from "react";
import { CheckCircle2, XCircle, ShieldCheck, Zap, Heart, AlertTriangle, Sparkles } from "lucide-react";

export default function TravelComparisonSection() {
  const painPoints = [
    "Running in panic during a brief 2-minute station halt.",
    "Leaving your luggage or family unattended on the train.",
    "Paying arbitrary 2x vendor markups above printed MRP.",
    "Buying duplicate chargers or low-quality local items in a rush.",
    "Risking the train departing while you are stuck on the platform.",
  ];

  const railQuickBenefits = [
    "Relax comfortably on your seat while our runner handles everything.",
    "Your luggage stays 100% safe by your side throughout your journey.",
    "Billed strictly at official printed MRP — zero overpricing guaranteed.",
    "Verified branded tech, sanitized blankets, and genuine essentials.",
    "Verified runner meets you right at your coach door the moment the train halts.",
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/40 to-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-xs font-black text-blue-700 uppercase tracking-widest mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" /> THE TRAVEL TRANSFORMATION
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How RailQuick Changes Train Journeys
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 font-medium">
            Solving the biggest travel anxieties faced by 24+ million daily railway passengers.
          </p>
        </div>

        {/* 2 Column Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: Traditional Platform Stress */}
          <div className="bg-rose-50/50 border border-rose-200/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-black">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-rose-700">
                    The Platform Struggle
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    Without RailQuick
                  </h3>
                </div>
              </div>

              <div className="space-y-3.5 my-6">
                {painPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700 font-medium leading-relaxed m-0">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-rose-200/60 text-xs font-bold text-rose-800">
              High stress, platform chaos, and constant safety worry.
            </div>
          </div>

          {/* Card 2: The RailQuick Experience */}
          <div className="bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60 border-2 border-emerald-300 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-md shadow-emerald-600/20">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-700">
                    Effortless &amp; Reliable
                  </span>
                  <h3 className="text-xl font-black text-slate-900">
                    With RailQuick
                  </h3>
                </div>
              </div>

              <div className="space-y-3.5 my-6">
                {railQuickBenefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-800 font-semibold leading-relaxed m-0">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-200 relative z-10 flex items-center justify-between text-xs font-black text-emerald-800">
              <span>Peace of mind on every kilometer of track.</span>
              <Heart className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
