"use client";

import React from "react";
import { Bell, Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

interface DeliveryAvailabilityProps {
  isAvailable: boolean;
  trainNumber: string;
  trainName?: string;
  onOpenAlertModal: () => void;
  className?: string;
}

export default function DeliveryAvailability({
  isAvailable,
  trainNumber,
  trainName,
  onOpenAlertModal,
  className = "",
}: DeliveryAvailabilityProps) {
  if (isAvailable) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-r from-emerald-50 via-white to-teal-50/80 rounded-3xl p-5 sm:p-6 border border-emerald-200/90 shadow-[0_10px_30px_rgba(16,185,129,0.08)] ${className}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100/90 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                <span>Active Service Route</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1.5 tracking-tight">
                RailQuick on-seat delivery is live on Train {trainNumber}!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5 leading-relaxed">
                Order travel essentials, fresh snacks &amp; regional specialties delivered directly to your berth.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/60 rounded-3xl p-5 sm:p-6 border border-blue-200/80 shadow-[0_12px_34px_rgba(37,99,235,0.07)] ${className}`}
    >
      {/* Subtle decorative glow */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
        <div className="flex items-start gap-3.5 sm:gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-600/25">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-blue-800 bg-blue-100/80 px-2.5 py-0.5 rounded-full border border-blue-200">
                <Sparkles className="w-2.5 h-2.5 text-blue-600" />
                <span>Route Expansion Alert</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Instant SMS / WhatsApp</span>
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Want on-seat delivery on Train {trainNumber}{trainName ? ` (${trainName})` : ""}?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 leading-relaxed max-w-xl">
              We&apos;re rapidly activating new trains and stations. Tap <strong>Get Notified</strong> and we&apos;ll alert you as soon as berth delivery goes live for this train.
            </p>
          </div>
        </div>

        {/* High-Trust Primary Get Notified CTA */}
        <button
          type="button"
          onClick={onOpenAlertModal}
          className="h-12 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 shrink-0 active:scale-95 cursor-pointer group"
        >
          <Bell className="w-4 h-4 text-amber-300" />
          <span>Get Notified</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
