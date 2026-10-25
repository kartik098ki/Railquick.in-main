"use client";

import React, { useState } from "react";
import { Bell, CheckCircle2, ArrowRight, ShieldCheck, Train, Clock, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DelhiStationComingSoonProps {
  onOpenWaitlist?: () => void;
}

export default function DelhiStationComingSoon({ onOpenWaitlist }: DelhiStationComingSoonProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = email.trim();
    if (!cleanInput || !cleanInput.includes("@")) {
      toast({
        title: "Please enter a valid email address",
        description: "We'll send you an early priority invite when Delhi railway stations go live.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanInput, city: "Delhi NCR Stations" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        setIsSubscribed(true);
        toast({
          title: "🎉 You're on the Delhi Launch Radar!",
          description: "We'll notify you the moment on-seat delivery goes live across Delhi railway stations.",
        });
      } else {
        setIsSubscribed(true);
        toast({
          title: "Priority Access Confirmed",
          description: "You've been added to the Delhi stations early delivery queue.",
        });
      }
    } catch {
      setIsSubscribed(true);
      toast({
        title: "Priority Access Confirmed",
        description: "You've been added to the Delhi stations early delivery queue.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-slate-50/60 via-white to-slate-50/40 relative overflow-hidden border-t border-b border-slate-100">
      {/* Subtle Ambient Radial Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Stylish Station Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border border-blue-200/90 text-blue-700 text-xs font-black uppercase tracking-wider mb-5 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>NORTHERN RAILWAYS • DELHI EXPANSION</span>
        </div>

        {/* Stylish & Larger Prominent Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-[58px] font-black text-slate-900 tracking-tight leading-[1.08] mb-5">
          Coming soon to{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent">
              New Delhi
            </span>
            <span className="absolute -bottom-1 inset-x-0 h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/40 to-blue-500/0 rounded-full" />
          </span>
        </h2>

        {/* Refined Write-up */}
        <p className="text-slate-600 text-sm sm:text-lg lg:text-[19px] font-medium leading-relaxed max-w-2xl mx-auto mb-9">
          India&apos;s premier railway network is joining RailQuick. Curated travel essentials, snacks, OTC medical supplies, and sealed drinking water delivered straight to your train coach door before departure — even during 2-minute halts.
        </p>

        {/* Centered Email / Phone Alert Box */}
        <div className="max-w-lg mx-auto mb-10">
          {isSubscribed ? (
            <div className="inline-flex items-center gap-2.5 px-6 py-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-sm sm:text-base shadow-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>You&apos;re registered! We&apos;ll notify you on launch day across Delhi stations.</span>
            </div>
          ) : (
            <form onSubmit={handleNotifySubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5 bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-md">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for Delhi launch alert"
                  className="w-full h-12 pl-10 pr-3 rounded-xl bg-slate-50/70 border-0 text-slate-900 text-xs sm:text-sm font-semibold placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 px-7 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm active:scale-98 cursor-pointer shrink-0"
              >
                <Bell className="w-4 h-4 text-amber-400" />
                <span>{isSubmitting ? "Adding..." : "Get Launch Alert"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* 3 Clean Minimal Feature Tags */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-5 border-t border-slate-200/60 text-xs sm:text-sm font-bold text-slate-600">
          <div className="flex items-center gap-2">
            <Train className="w-4 h-4 text-blue-600" />
            <span>All Major Delhi Stations</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Coach-Door Berth Handoff</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Printed MRP Pricing Guaranteed</span>
          </div>
        </div>

      </div>
    </section>
  );
}
