"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Train,
  Ticket,
  Search,
  ArrowRight,
  Loader2,
  Calendar,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";

interface CheckPnrModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPnr?: string;
  initialTab?: "pnr" | "train";
}

const POPULAR_TRAINS = [
  { no: "12004", name: "Lucknow Shatabdi" },
  { no: "12952", name: "Mumbai Rajdhani" },
  { no: "22436", name: "Vande Bharat" },
  { no: "12302", name: "Howrah Rajdhani" },
  { no: "12626", name: "Kerala Express" },
];

export default function CheckPnrModal({
  isOpen,
  onClose,
  defaultPnr = "",
  initialTab = "pnr",
}: CheckPnrModalProps) {
  const router = useRouter();

  // Active Tab: PNR vs Train
  const [activeTab, setActiveTab] = useState<"pnr" | "train">(initialTab);

  // Tab 1: PNR state
  const [pnr, setPnr] = useState(defaultPnr);
  const [pnrError, setPnrError] = useState<string | null>(null);
  const [isPnrSubmitting, setIsPnrSubmitting] = useState(false);

  // Tab 2: Train state
  const [trainInput, setTrainInput] = useState("");
  const [trainDate, setTrainDate] = useState("today");
  const [customDate, setCustomDate] = useState("");
  const [trainError, setTrainError] = useState<string | null>(null);
  const [trainSuggestions, setTrainSuggestions] = useState<
    Array<{ trainNo: string; trainName: string; route: string }>
  >([]);
  const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);

  const pnrInputRef = useRef<HTMLInputElement>(null);
  const trainInputRef = useRef<HTMLInputElement>(null);

  // Synchronize when opened
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setPnr(defaultPnr);
      setPnrError(null);
      setTrainError(null);
      setTrainSuggestions([]);
      setTimeout(() => {
        if (initialTab === "pnr") {
          pnrInputRef.current?.focus();
        } else {
          trainInputRef.current?.focus();
        }
      }, 100);
    }
  }, [isOpen, defaultPnr, initialTab]);

  // Autocomplete train suggestions with debounce
  useEffect(() => {
    const trimmed = trainInput.trim();
    if (activeTab === "train" && trimmed.length >= 2) {
      setIsSearchingSuggestions(true);
      const timer = setTimeout(async () => {
        try {
          const res = await fetch(
            `/api/railkit/search?query=${encodeURIComponent(trimmed)}`
          );
          const json = await res.json();
          if (json.success && Array.isArray(json.trains)) {
            setTrainSuggestions(json.trains);
          } else {
            setTrainSuggestions([]);
          }
        } catch {
          setTrainSuggestions([]);
        } finally {
          setIsSearchingSuggestions(false);
        }
      }, 200);

      return () => clearTimeout(timer);
    } else {
      setTrainSuggestions([]);
    }
  }, [trainInput, activeTab]);

  // PNR input handler (digits only, max 10)
  const handlePnrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPnr(cleaned);
    if (pnrError && cleaned.length === 10) {
      setPnrError(null);
    }
  };

  // Submit PNR -> navigate to /pnr/result
  const handlePnrSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pnr.trim();

    if (clean.length !== 10) {
      setPnrError("Please enter a valid 10-digit PNR.");
      return;
    }

    setPnrError(null);
    setIsPnrSubmitting(true);
    onClose();
    router.push(`/pnr/result?pnr=${clean}`);
  };

  // Submit Train -> navigate to /check-train
  const handleTrainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = trainInput.trim();

    if (!clean) {
      setTrainError("Please enter a train number (e.g. 12004) or train name.");
      return;
    }

    // Direct numeric train number (4-5 digits)
    if (/^\d{4,5}$/.test(clean)) {
      setTrainError(null);
      onClose();
      router.push(
        `/check-train?train=${clean}&date=${encodeURIComponent(trainDate)}`
      );
      return;
    }

    // Top match from suggestion list
    if (trainSuggestions.length > 0) {
      const top = trainSuggestions[0];
      setTrainError(null);
      onClose();
      router.push(
        `/check-train?train=${top.trainNo}&date=${encodeURIComponent(trainDate)}`
      );
      return;
    }

    // Lookup on server
    try {
      const res = await fetch(
        `/api/railkit/search?query=${encodeURIComponent(clean)}`
      );
      const json = await res.json();
      if (json.success && json.trains && json.trains.length > 0) {
        const top = json.trains[0];
        setTrainError(null);
        onClose();
        router.push(
          `/check-train?train=${top.trainNo}&date=${encodeURIComponent(trainDate)}`
        );
        return;
      }
    } catch {}

    setTrainError(`Could not find train "${clean}". Please enter a 5-digit train number (e.g. 12004).`);
  };

  const handleSelectTrainSuggestion = (trainNo: string) => {
    setTrainInput(trainNo);
    setTrainSuggestions([]);
    onClose();
    router.push(
      `/check-train?train=${trainNo}&date=${encodeURIComponent(trainDate)}`
    );
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
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Container — Compact & Sleek for Mobile */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-[460px] z-10 text-slate-900"
          >
            {/* Modal Card Frame */}
            <div className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 max-h-[88vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-3 right-3 sm:top-3.5 sm:right-3.5 z-40 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-all"
              >
                <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Header with "NEW LAUNCHED" Badge */}
              <div className="bg-gradient-to-br from-amber-50/90 via-orange-50/50 to-emerald-50/50 px-4 pt-4 pb-3 sm:px-5 sm:pt-5 sm:pb-3.5 border-b border-slate-100 text-left">
                {/* NEW LAUNCHED BADGE */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-900 text-[10px] font-black uppercase tracking-wider mb-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                  <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                  <span>NEW LAUNCHED</span>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  {activeTab === "pnr" ? "Check Your PNR" : "Live Train Tracking"}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 font-medium mt-0.5 max-w-sm">
                  {activeTab === "pnr"
                    ? "Enter 10-digit PNR to view your journey and track live coach location."
                    : "Enter train number or name to check live running status."}
                </p>

                {/* Dual Tabs Switcher */}
                <div className="mt-3 flex items-center p-1 rounded-xl bg-slate-200/70 border border-slate-200/80">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("pnr");
                      setPnrError(null);
                      setTimeout(() => pnrInputRef.current?.focus(), 80);
                    }}
                    className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                      activeTab === "pnr"
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Ticket className="w-3.5 h-3.5 text-amber-600" />
                    <span>Check by PNR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("train");
                      setTrainError(null);
                      setTimeout(() => trainInputRef.current?.focus(), 80);
                    }}
                    className={`flex-1 py-1.5 px-2.5 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                      activeTab === "train"
                        ? "bg-white text-slate-900 shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Train className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Train No / Name</span>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5 space-y-3.5">
                {/* ══════════ TAB 1: CHECK BY PNR ══════════ */}
                {activeTab === "pnr" && (
                  <form onSubmit={handlePnrSubmit} className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-500">
                          10-Digit PNR Number
                        </label>
                        <span
                          className={`text-[10px] sm:text-[11px] font-mono font-bold transition-colors ${
                            pnr.length === 10
                              ? "text-emerald-600"
                              : "text-slate-400"
                          }`}
                        >
                          {pnr.length} / 10 digits
                        </span>
                      </div>

                      <div className="relative">
                        <input
                          ref={pnrInputRef}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={10}
                          value={pnr}
                          onChange={handlePnrChange}
                          placeholder="e.g. 6948325823"
                          className="w-full h-11 sm:h-12 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-extrabold text-base sm:text-lg text-center tracking-[0.2em] placeholder:text-slate-300 placeholder:font-normal placeholder:tracking-normal focus:bg-white focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all shadow-inner"
                        />
                        {pnr.length === 10 && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        )}
                      </div>

                      {pnrError && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-rose-600 text-xs font-bold animate-fadeIn">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{pnrError}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
                      Found on the top-left corner of your IRCTC ticket or SMS.
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      disabled={isPnrSubmitting}
                      className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      {isPnrSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                          <span>Checking your journey...</span>
                        </>
                      ) : (
                        <>
                          <span>Check PNR</span>
                          <ArrowRight className="w-4 h-4 text-amber-400" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* ══════════ TAB 2: CHECK BY TRAIN NO / NAME ══════════ */}
                {activeTab === "train" && (
                  <form onSubmit={handleTrainSubmit} className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-500">
                          Train Number or Name
                        </label>
                        <span className="text-[10px] text-slate-400 font-medium">
                          e.g. 12004 or Shatabdi
                        </span>
                      </div>

                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          ref={trainInputRef}
                          type="text"
                          value={trainInput}
                          onChange={(e) => {
                            setTrainInput(e.target.value);
                            if (trainError) setTrainError(null);
                          }}
                          placeholder="Search 12004, Rajdhani, Vande Bharat..."
                          className="w-full h-11 pl-9 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-xs sm:text-sm placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                        />
                        {isSearchingSuggestions ? (
                          <Loader2 className="w-3.5 h-3.5 text-slate-400 animate-spin absolute right-3 top-1/2 -translate-y-1/2" />
                        ) : trainInput ? (
                          <button
                            type="button"
                            onClick={() => {
                              setTrainInput("");
                              setTrainSuggestions([]);
                            }}
                            className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        ) : null}

                        {/* Autocomplete Dropdown */}
                        {trainSuggestions.length > 0 && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden z-30 max-h-48 overflow-y-auto">
                            {trainSuggestions.map((item) => (
                              <button
                                key={item.trainNo}
                                type="button"
                                onClick={() => handleSelectTrainSuggestion(item.trainNo)}
                                className="w-full px-3 py-2 text-left hover:bg-emerald-50/80 border-b border-slate-100 last:border-0 flex items-center justify-between gap-2 transition-colors"
                              >
                                <div>
                                  <span className="font-mono font-black text-slate-900 text-xs mr-2">
                                    {item.trainNo}
                                  </span>
                                  <span className="text-xs font-bold text-slate-700">
                                    {item.trainName}
                                  </span>
                                </div>
                                <span className="text-[10px] font-mono text-slate-400 truncate max-w-[120px]">
                                  {item.route}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {trainError && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-rose-600 text-xs font-bold animate-fadeIn">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{trainError}</span>
                        </div>
                      )}
                    </div>

                    {/* Journey Date Selector */}
                    <div>
                      <label className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-1">
                        Journey Day / Date
                      </label>
                      <div className="grid grid-cols-3 gap-1 mb-2">
                        {[
                          { id: "yesterday", label: "Yesterday" },
                          { id: "today", label: "Today" },
                          { id: "tomorrow", label: "Tomorrow" },
                        ].map((d) => (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => {
                              setTrainDate(d.id);
                              setCustomDate("");
                            }}
                            className={`py-1 px-1.5 rounded-lg text-[11px] font-bold transition-all border ${
                              trainDate === d.id && !customDate
                                ? "bg-emerald-50 text-emerald-900 border-emerald-300 font-black shadow-2xs"
                                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                            }`}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>

                      {/* Custom Date Input for Multi-Day journeys */}
                      <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/90 rounded-xl px-2.5 py-1">
                        <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="text-[11px] text-slate-500 font-medium shrink-0">Select Date:</span>
                        <input
                          type="date"
                          value={customDate}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCustomDate(val);
                            if (val) {
                              const [y, m, d] = val.split("-");
                              setTrainDate(`${d}-${m}-${y}`);
                            }
                          }}
                          className="bg-transparent text-[11px] font-bold text-slate-900 outline-none w-full cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Quick Popular Trains Chips */}
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold block mb-1">
                        Popular Trains:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {POPULAR_TRAINS.map((t) => (
                          <button
                            key={t.no}
                            type="button"
                            onClick={() => handleSelectTrainSuggestion(t.no)}
                            className="text-[10px] sm:text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 px-2 py-0.5 rounded-md border border-slate-200 transition-colors flex items-center gap-1"
                          >
                            <span className="font-mono font-bold text-slate-900">{t.no}</span>
                            <span>{t.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <span>Track Train</span>
                      <ArrowRight className="w-4 h-4 text-emerald-400" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
