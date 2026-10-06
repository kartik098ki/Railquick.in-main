"use client";

import React from "react";
import { Train, ShieldCheck, Clock, Luggage, Sparkles } from "lucide-react";

export default function RailQuickGuarantees() {
  const promises = [
    {
      number: "01",
      title: "Right to Your Berth",
      tagline: "Direct Coach Delivery",
      description: "Our platform runner meets you directly at your coach door. No platform rush, your luggage stays secure.",
      icon: <Train className="w-5 h-5 text-blue-600" />,
      iconBg: "bg-blue-50 border-blue-100",
    },
    {
      number: "02",
      title: "100% Genuine MRP",
      tagline: "Standard Retail Price",
      description: "Standard printed retail price with zero overcharging. Genuine medicines, sealed snacks, and branded electronics.",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      iconBg: "bg-emerald-50 border-emerald-100",
    },
    {
      number: "03",
      title: "Halt-Timed Handoff",
      tagline: "2-Minute Station Halts",
      description: "Synced in real-time with Indian Railways schedule. Runners are positioned on the platform before your train halts.",
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      iconBg: "bg-amber-50 border-amber-100",
    },
    {
      number: "04",
      title: "Stress-Free Journey",
      tagline: "Zero Platform Rush",
      description: "From forgotten phone chargers to motion sickness relief — get what you need delivered right to your seat.",
      icon: <Luggage className="w-5 h-5 text-purple-600" />,
      iconBg: "bg-purple-50 border-purple-100",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50/60 relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-black text-slate-700 uppercase tracking-wider mb-3 shadow-2xs">
            <Sparkles className="w-3 h-3 text-amber-500" /> The RailQuick Standard
          </span>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
            Built for Your Journey. Delivered to Your Seat.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5 font-medium leading-relaxed">
            Essential medicines, fresh snacks &amp; travel accessories delivered straight to your coach during scheduled station halts.
          </p>
        </div>

        {/* 4 Clean Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {promises.map((p) => (
            <div
              key={p.number}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                {/* Header row: Icon + Number */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl border ${p.iconBg} flex items-center justify-center shrink-0`}>
                    {p.icon}
                  </div>
                  <span className="font-mono text-xs font-black text-slate-400 group-hover:text-slate-900 transition-colors">
                    {p.number}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-black text-slate-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors">
                  {p.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {p.description}
                </p>
              </div>

              {/* Tagline footer badge */}
              <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500">
                  {p.tagline}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
