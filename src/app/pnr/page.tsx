"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PNRInput from "@/components/pnr/PNRInput";
import { Train, Clock, ShieldCheck, Sparkles, Navigation, ArrowRight } from "lucide-react";

export default function PnrPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheckPnr = async (pnr: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/railkit/pnr?pnr=${pnr}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        setErrorMessage(
          json.error || "We couldn't find a valid journey for this PNR. Check the number and try again."
        );
        setIsLoading(false);
        return;
      }

      // Navigate to dedicated result dashboard with verified PNR
      router.push(`/pnr/result?pnr=${pnr}`);
    } catch {
      setErrorMessage("We're having trouble checking your journey right now. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
      {/* Global Navbar */}
      <Navbar />

      <main className="flex-1 pt-32 sm:pt-36 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Subtle Live Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs font-black mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>NEW LAUNCHED • Live Railway Telemetry</span>
          </div>

          {/* Exact Headings as required (Section 1) */}
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-3">
            Check Your PNR
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed font-medium mb-8">
            Enter your 10-digit PNR to view your journey and track your train live.
          </p>

          {/* Large 10-Digit PNR Input Form */}
          <div className="mb-6">
            <PNRInput onCheck={handleCheckPnr} isLoading={isLoading} />
          </div>

          {/* Loading Skeleton State (Section 3) */}
          {isLoading && (
            <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm animate-pulse space-y-4 my-6 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-200" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                </div>
              </div>
              <div className="h-20 bg-slate-100 rounded-2xl" />
              <div className="text-center py-2">
                <span className="text-xs font-bold text-slate-500 animate-pulse flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Checking your journey...
                </span>
              </div>
            </div>
          )}

          {/* Error Message banner */}
          {errorMessage && (
            <div className="max-w-xl mx-auto p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm font-semibold my-4">
              {errorMessage}
            </div>
          )}

          {/* Alternate flow link: Check Train directly without PNR (Section 11) */}
          <div className="mt-8 pt-6 border-t border-slate-200/60 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span>Don't have your PNR handy?</span>
            <Link
              href="/check-train"
              className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1 underline underline-offset-4"
            >
              <span>Track Train by Number or Name</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
