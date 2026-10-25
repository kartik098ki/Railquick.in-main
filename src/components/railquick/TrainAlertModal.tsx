"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Bell,
  CheckCircle2,
  Loader2,
  Train,
  Calendar,
  Mail,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

interface TrainAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainNumber: string;
  trainName?: string;
  journeyDate?: string;
  pnr?: string;
  source?: string;
}

export default function TrainAlertModal({
  isOpen,
  onClose,
  trainNumber,
  trainName = "",
  journeyDate = "",
  pnr = "",
  source = "train_tracking",
}: TrainAlertModalProps) {
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanMobile = mobile.replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/train-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile_number: cleanMobile,
          email: email.trim() || undefined,
          pnr: pnr || undefined,
          train_number: trainNumber,
          train_name: trainName,
          journey_date: journeyDate,
          source: pnr ? "pnr_tracking" : source,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSuccess(true);
      } else {
        setErrorMsg(data.message || "Could not register alert. Please try again.");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setErrorMsg(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResetAndClose}
            className="absolute inset-0 bg-slate-900/55 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="relative w-full max-w-md bg-white rounded-[28px] overflow-hidden shadow-2xl border border-slate-200/90 z-10 text-slate-900"
          >
            {/* Close Button */}
            <button
              onClick={handleResetAndClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-slate-100 border border-slate-200/80 text-slate-600 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {isSuccess ? (
              /* Celebratory Confirmation State */
              <div className="p-6 sm:p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/25">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>Priority Alert Activated</span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  You&apos;re on the Priority List!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-sm mx-auto">
                  We&apos;ll send an instant alert to your phone as soon as RailQuick on-seat delivery unlocks for your train.
                </p>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 text-left text-xs text-slate-600 space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-semibold">Train Route:</span>
                    <span className="font-extrabold text-slate-900">
                      {trainNumber} {trainName}
                    </span>
                  </div>
                  {pnr && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 font-semibold">PNR Number:</span>
                      <span className="font-mono font-bold text-slate-900">{pnr}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 font-semibold">Alert Number:</span>
                    <span className="font-extrabold text-emerald-700">+91 {mobile}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full mt-4 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-2xl text-sm transition-all shadow-md shadow-blue-600/20 cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Polished Alert Subscription Form */
              <div>
                {/* Top Gradient Header Banner */}
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50/60 to-emerald-50/50 px-5 pt-5 pb-4 sm:px-6 sm:pt-6 sm:pb-5 border-b border-slate-100">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/10 border border-blue-500/25 text-blue-800 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                    <Bell className="w-3 h-3 text-blue-600" />
                    <span>Instant Launch Notification</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Get Notified for This Train
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 font-medium mt-1 leading-relaxed">
                    Enter your number to receive a priority WhatsApp/SMS alert when on-seat delivery goes live.
                  </p>

                  {/* Auto-populated Train Summary Chips */}
                  <div className="mt-3.5 flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 font-mono font-extrabold text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200/90 shadow-2xs">
                      <Train className="w-3.5 h-3.5 text-blue-600" />
                      <span>
                        {trainNumber} {trainName}
                      </span>
                    </span>
                    {journeyDate && (
                      <span className="inline-flex items-center gap-1.5 font-mono font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200/90 shadow-2xs">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{journeyDate}</span>
                      </span>
                    )}
                    {pnr && (
                      <span className="inline-flex items-center font-mono font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200/90 shadow-2xs">
                        PNR: {pnr}
                      </span>
                    )}
                  </div>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-extrabold text-slate-800">
                        WhatsApp / Mobile Number <span className="text-rose-500">*</span>
                      </label>
                      <span
                        className={`text-[10px] font-mono font-bold ${
                          mobile.length === 10 ? "text-emerald-600" : "text-slate-400"
                        }`}
                      >
                        {mobile.length}/10 digits
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700 font-mono font-extrabold text-xs">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder="Enter 10-digit mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        disabled={isSubmitting}
                        className="w-full h-12 pl-14 pr-10 rounded-xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 text-sm font-extrabold text-slate-900 outline-none transition-all"
                      />
                      {mobile.length === 10 && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2" />
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-extrabold text-slate-800 block mb-1.5">
                      Email Address <span className="text-slate-400 font-medium">(optional)</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 text-sm font-semibold text-slate-900 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium pt-0.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Zero spam. Only 1 alert when this train route activates.</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || mobile.length < 10}
                    className="w-full h-12 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:shadow-none cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Activating Alert...</span>
                      </>
                    ) : (
                      <>
                        <Bell className="w-4 h-4 text-amber-300" />
                        <span>Notify Me When Live</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
