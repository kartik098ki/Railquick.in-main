"use client";

import React from "react";
import { Package, Bell, Sparkles, CheckCircle2 } from "lucide-react";

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
        className={`bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-100/60 rounded-3xl p-5 sm:p-6 border border-emerald-300 shadow-sm ${className}`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-2 py-0.5 rounded-full">
                Active Service Route
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 mt-1">
                RailQuick on-seat delivery is live on this train!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5 leading-relaxed">
                Order travel essentials, fresh snacks & regional specialties delivered directly to your berth.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Exact requirement when delivery is unavailable (Section 15)
  return (
    <div
      className={`bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 rounded-3xl p-5 sm:p-6 border border-amber-200/90 shadow-sm ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shrink-0 shadow-xs">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                Network Expansion
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              RailQuick delivery isn't available on this train yet.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5 leading-relaxed max-w-xl">
              We’re expanding our delivery network across more trains and stations. Get notified as soon as on-seat delivery unlocks for Train {trainNumber}.
            </p>
          </div>
        </div>

        {/* Primary Get Alert CTA */}
        <button
          type="button"
          onClick={onOpenAlertModal}
          className="h-11 px-5 sm:px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm shrink-0 active:scale-95"
        >
          <Bell className="w-4 h-4 text-amber-400" />
          <span>Get Alert</span>
        </button>
      </div>
    </div>
  );
}
