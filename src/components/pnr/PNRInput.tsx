"use client";

import React, { useState } from "react";
import { Train, ArrowRight, Loader2, AlertCircle, ShieldCheck } from "lucide-react";

interface PNRInputProps {
  onCheck: (pnr: string) => Promise<void> | void;
  isLoading?: boolean;
  initialValue?: string;
  className?: string;
}

export default function PNRInput({
  onCheck,
  isLoading = false,
  initialValue = "",
  className = "",
}: PNRInputProps) {
  const [pnr, setPnr] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    // Numbers only, maximum 10 digits
    const digitsOnly = rawVal.replace(/\D/g, "").slice(0, 10);
    setPnr(digitsOnly);
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    if (pnr.length !== 10) {
      setError("Please enter a valid 10-digit PNR.");
      return;
    }

    setError(null);
    onCheck(pnr);
  };

  return (
    <div className={`w-full max-w-xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative bg-white rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 border border-slate-200/90 shadow-lg shadow-slate-200/50 transition-all focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/10">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Input area */}
            <div className="relative flex-1 flex items-center pl-3 sm:pl-4">
              <Train className="w-5 h-5 text-emerald-600 shrink-0 mr-2.5" />
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                value={pnr}
                onChange={handleChange}
                placeholder="Enter 10-digit PNR number"
                disabled={isLoading}
                aria-label="10-digit PNR number"
                className="w-full h-12 bg-transparent text-slate-900 font-mono font-bold text-lg sm:text-xl tracking-wider placeholder:tracking-normal placeholder:font-sans placeholder:font-medium placeholder:text-slate-400 placeholder:text-sm sm:placeholder:text-base outline-none"
              />
              {/* Subtle 10-digit counter */}
              <div className="shrink-0 px-2.5 py-1 mr-1 rounded-lg bg-slate-100 text-[11px] font-mono font-bold text-slate-500 select-none">
                {pnr.length}/10 digits
              </div>
            </div>

            {/* Primary CTA */}
            <button
              type="submit"
              disabled={isLoading || pnr.length !== 10}
              className="h-12 px-6 sm:px-7 rounded-xl sm:rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 shadow-sm shrink-0 active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Checking...</span>
                </>
              ) : (
                <>
                  <span>Check PNR</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Inline Error Message */}
        {error && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Subtle trust notice */}
        <div className="flex items-center justify-center gap-4 text-[11px] font-medium text-slate-400 pt-1">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Official IRCTC Telemetry
          </span>
          <span>•</span>
          <span>Instant Live Radar Sync</span>
        </div>
      </form>
    </div>
  );
}
