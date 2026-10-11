"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bell, CheckCircle2, Loader2, Train, Calendar, Smartphone, Mail, AlertCircle } from "lucide-react";

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
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            className="relative w-full max-w-md bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-200 z-10 text-slate-900"
          >
            {/* Close Button */}
            <button
              onClick={handleResetAndClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {isSuccess ? (
              /* Success State (Section 16) */
              <div className="text-center py-4 space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  You're on the list!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-sm mx-auto">
                  We'll let you know when RailQuick becomes available for this train.
                </p>

                <div className="bg-slate-50 rounded-2xl p-3 border border-slate-200 text-left text-xs text-slate-600 space-y-1 mt-4">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Train:</span>
                    <span className="font-bold text-slate-900">{trainNumber} {trainName}</span>
                  </div>
                  {pnr && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">PNR:</span>
                      <span className="font-mono font-bold text-slate-900">{pnr}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Alert to:</span>
                    <span className="font-bold text-emerald-700">{mobile}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="w-full mt-4 h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm transition-all"
                >
                  Done
                </button>
              </div>
            ) : (
              /* Alert Form */
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Bell className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                    Priority Waitlist
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Get Delivery Alert
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5 leading-relaxed">
                  Be the first to know when RailQuick berth delivery activates on your route.
                </p>

                {/* Auto-populated train info chips (Section 16) */}
                <div className="my-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-wrap gap-2 text-xs">
                  <span className="flex items-center gap-1 font-mono font-bold text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    <Train className="w-3.5 h-3.5 text-emerald-600" />
                    {trainNumber} {trainName}
                  </span>
                  {journeyDate && (
                    <span className="flex items-center gap-1 font-mono text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      {journeyDate}
                    </span>
                  )}
                  {pnr && (
                    <span className="font-mono text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                      PNR: {pnr}
                    </span>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="text-xs font-black text-slate-800 block mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                        disabled={isSubmitting}
                        className="w-full h-11 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 text-xs sm:text-sm font-bold text-slate-900 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-slate-800 block mb-1">
                      Email Address <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full h-11 pl-9 pr-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 text-xs sm:text-sm text-slate-900 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || mobile.length < 10}
                    className="w-full mt-2 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving Alert...</span>
                      </>
                    ) : (
                      <span>Notify Me</span>
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
