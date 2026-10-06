"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Train,
  Clock,
  Sparkles,
  ShieldCheck,
  MapPin,
  Bell,
  CheckCircle2,
  ArrowRight,
  Loader2,
  Calendar,
  Ticket,
  ExternalLink,
} from "lucide-react";

interface CheckPnrModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPnr?: string;
  initialTab?: "pnr" | "train";
}

// Target Launch Time: 7 October 2026, 8:00 PM IST
const TARGET_LAUNCH_DATE_STR = "2026-10-07T20:00:00+05:30";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

function calculateTimeRemaining(): TimeLeft {
  const target = new Date(TARGET_LAUNCH_DATE_STR).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isLive: diff <= 0,
  };
}

export default function CheckPnrModal({
  isOpen,
  onClose,
}: CheckPnrModalProps) {
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeRemaining());
  const [notifyInput, setNotifyInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Live second-by-second countdown clock
  useEffect(() => {
    setTimeLeft(calculateTimeRemaining());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format 2-digit numbers
  const pad = (n: number) => String(n).padStart(2, "0");

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const trimmed = notifyInput.trim();

    if (!trimmed) {
      setErrorMsg("Please enter your mobile number or email.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          city: "PNR_Radar_Launch_Oct7_8PM",
          name: "PNR Radar Traveler",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubscribed(true);
      } else {
        setErrorMsg(data.message || "Could not reserve alert. Please check your input.");
      }
    } catch {
      setErrorMsg("Connection error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop with frosted glass effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="relative w-full max-w-lg z-10 text-slate-900"
          >
            {/* Ticket Card Frame */}
            <div className="relative bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
              {/* Authentic Ticket Left & Right Notches */}
              <span className="absolute -left-3 top-28 -translate-y-1/2 w-6 h-6 bg-slate-950/80 rounded-full shadow-inner z-30 pointer-events-none" />
              <span className="absolute -right-3 top-28 -translate-y-1/2 w-6 h-6 bg-slate-950/80 rounded-full shadow-inner z-30 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 z-40 w-8 h-8 rounded-full bg-white/90 hover:bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center shadow-xs border border-slate-200 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header: Warm Ticket Stub Theme */}
              <div className="bg-gradient-to-r from-amber-50 via-orange-50/70 to-amber-100/80 px-6 pt-7 pb-5 border-b border-dashed border-amber-300 relative text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 text-[10px] font-black uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                    Coming Soon • Phase 3
                  </span>
                  <span className="text-[10px] font-black tracking-wider text-slate-600 bg-white/70 px-2 py-0.5 rounded-full border border-slate-200">
                    7 OCT • 8:00 PM IST
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Train className="w-6 h-6 text-amber-600" /> Live PNR &amp; Train Radar
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed max-w-sm">
                  Direct satellite coach telemetry, live platform runner tracking &amp; seat delivery unlock on 7th October at 8:00 PM IST.
                </p>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-7 space-y-6">
                {/* ─── LIVE COUNTDOWN DISPLAY ─── */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> Launch Countdown
                    </span>
                    <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      Target: 7 Oct, 8:00 PM
                    </span>
                  </div>

                  {timeLeft.isLive ? (
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                      <span className="text-sm font-black text-emerald-800">
                        ⚡ Telemetry is now live! Initializing radar stream...
                      </span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 sm:gap-2.5 text-center">
                      {/* Days */}
                      <div className="bg-slate-900 text-white rounded-2xl p-2.5 sm:p-3 border border-slate-800 shadow-sm flex flex-col items-center justify-center">
                        <span className="font-mono font-black text-2xl sm:text-3xl tracking-tight text-amber-400">
                          {pad(timeLeft.days)}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-slate-400 mt-0.5">
                          Days
                        </span>
                      </div>

                      {/* Hours */}
                      <div className="bg-slate-900 text-white rounded-2xl p-2.5 sm:p-3 border border-slate-800 shadow-sm flex flex-col items-center justify-center">
                        <span className="font-mono font-black text-2xl sm:text-3xl tracking-tight text-white">
                          {pad(timeLeft.hours)}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-slate-400 mt-0.5">
                          Hours
                        </span>
                      </div>

                      {/* Minutes */}
                      <div className="bg-slate-900 text-white rounded-2xl p-2.5 sm:p-3 border border-slate-800 shadow-sm flex flex-col items-center justify-center">
                        <span className="font-mono font-black text-2xl sm:text-3xl tracking-tight text-white">
                          {pad(timeLeft.minutes)}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-slate-400 mt-0.5">
                          Minutes
                        </span>
                      </div>

                      {/* Seconds */}
                      <div className="bg-slate-900 text-white rounded-2xl p-2.5 sm:p-3 border border-slate-800 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
                        <span className="font-mono font-black text-2xl sm:text-3xl tracking-tight text-amber-400">
                          {pad(timeLeft.seconds)}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-slate-400 mt-0.5">
                          Seconds
                        </span>
                        <div className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      </div>
                    </div>
                  )}
                </div>

                {/* ─── WHAT TO EXPECT IN PHASE 3 ─── */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                    What unlocks at 8:00 PM:
                  </span>
                  <div className="space-y-2 text-left">
                    <div className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-5 h-5 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                        <MapPin className="w-3 h-3" />
                      </div>
                      <div>
                        <strong className="text-slate-900 font-bold">Direct Berth Delivery:</strong>
                        <span className="text-slate-600 block text-[11px]">Runner meets your coach door during scheduled halts.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-5 h-5 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Train className="w-3 h-3" />
                      </div>
                      <div>
                        <strong className="text-slate-900 font-bold">Live GPS &amp; Halt Sync:</strong>
                        <span className="text-slate-600 block text-[11px]">Real-time delay tracking, platform numbers &amp; coach positions.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 text-xs text-slate-700">
                      <div className="w-5 h-5 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-3 h-3" />
                      </div>
                      <div>
                        <strong className="text-slate-900 font-bold">100% Genuine MRP:</strong>
                        <span className="text-slate-600 block text-[11px]">Printed retail price, zero markups, OTP sealed handoff.</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─── PRIORITY NOTIFICATION SIGNUP (DIRECT SUPABASE SYNC) ─── */}
                <div>
                  {isSubscribed ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-left flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-black text-emerald-900">
                          Priority Alert Confirmed!
                        </p>
                        <p className="text-[11px] text-emerald-700 mt-0.5">
                          We will notify you the exact moment the Live PNR Radar launches on Oct 7 at 8:00 PM IST.
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleNotifySubmit} className="space-y-2.5">
                      <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                        <Bell className="w-3.5 h-3.5 text-amber-600" />
                        Get Alert When Radar Launches
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Enter your phone or email..."
                          value={notifyInput}
                          onChange={(e) => {
                            setNotifyInput(e.target.value);
                            if (errorMsg) setErrorMsg(null);
                          }}
                          disabled={isSubmitting}
                          style={{ fontSize: "14px" }}
                          className="w-full h-12 pl-4 pr-32 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold placeholder:text-slate-400 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all shadow-inner"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting || !notifyInput.trim()}
                          className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <>
                              <span>Notify Me</span>
                              <ArrowRight className="w-3 h-3 text-amber-400" />
                            </>
                          )}
                        </button>
                      </div>
                      {errorMsg && (
                        <p className="text-[11px] font-bold text-rose-600 text-left pl-1">
                          {errorMsg}
                        </p>
                      )}
                    </form>
                  )}
                </div>

                {/* ─── PROTOTYPE EXPLORER LINK ─── */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Testing our telemetry prototype?</span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      router.push("/check-train?train=12004&date=today");
                    }}
                    className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 underline underline-offset-2 transition-colors"
                  >
                    Preview Route Engine <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
