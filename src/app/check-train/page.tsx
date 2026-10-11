"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrainLocation from "@/components/train/TrainLocation";
import TrainProgress from "@/components/train/TrainProgress";
import StationTimeline from "@/components/train/StationTimeline";
import DeliveryAvailability from "@/components/railquick/DeliveryAvailability";
import TrainAlertModal from "@/components/railquick/TrainAlertModal";
import { isRailQuickAvailable } from "@/lib/railquickAvailability";
import { NormalizedJourneyData } from "@/lib/railkitNormalizer";
import {
  Train,
  Clock,
  MapPin,
  Calendar,
  Search,
  ArrowRight,
  ArrowLeft,
  RotateCw,
  Share2,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

const POPULAR_QUICK_TRAINS = [
  { no: "12004", name: "Lucknow Shatabdi", route: "NDLS ⇄ LJN" },
  { no: "12952", name: "Mumbai Rajdhani", route: "NDLS ⇄ MMCT" },
  { no: "22436", name: "Vande Bharat Express", route: "NDLS ⇄ BSB" },
  { no: "12302", name: "Howrah Rajdhani", route: "NDLS ⇄ HWH" },
  { no: "12626", name: "Kerala Express", route: "NDLS ⇄ TVC" },
  { no: "12002", name: "Bhopal Shatabdi", route: "NDLS ⇄ RKMP" },
];

function CheckTrainContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const trainParam = searchParams.get("train") || searchParams.get("trainNumber") || "12004";
  const dateParam = searchParams.get("date") || "today";

  // Search Mode: Train Number vs Train Name (Section 11)
  const [searchMode, setSearchMode] = useState<"number" | "name">("number");
  const [searchInput, setSearchInput] = useState(trainParam);
  const [selectedDate, setSelectedDate] = useState(dateParam);
  const [customDateInput, setCustomDateInput] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{ trainNo: string; trainName: string; route: string }>>([]);
  const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);

  const [data, setData] = useState<NormalizedJourneyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [secondsSinceUpdate, setSecondsSinceUpdate] = useState(0);

  // Date formatted options
  const now = new Date();
  const yest = new Date(now.getTime() - 86400000);
  const tom = new Date(now.getTime() + 86400000);

  const formatDateDisplay = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const formatDateValue = (d: Date) => {
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    return `${day}-${month}-${d.getFullYear()}`;
  };

  const yesterdayFormatted = formatDateDisplay(yest);
  const todayFormatted = formatDateDisplay(now);
  const tomorrowFormatted = formatDateDisplay(tom);

  // Fetch train telemetry
  const fetchTelemetry = async (trainNo: string, date: string) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const endpoint = `/api/railkit/train?trainNumber=${encodeURIComponent(trainNo)}&date=${encodeURIComponent(date)}`;
      const res = await fetch(endpoint);
      const json = await res.json();

      if (json.success && json.data) {
        setData(json.data);
        setSecondsSinceUpdate(0);
        setErrorMessage(null);
      } else {
        setErrorMessage(
          json.error || `Live location isn't available for Train ${trainNo} right now. Please check the train number.`
        );
        setData(null);
      }
    } catch {
      setErrorMessage("Live location isn't available for this journey right now.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry(trainParam, dateParam);
  }, [trainParam, dateParam]);

  // Section 29: Auto-refresh live train API every 60 seconds
  useEffect(() => {
    if (!trainParam) return;

    const tick = setInterval(() => {
      setSecondsSinceUpdate((prev) => prev + 1);
    }, 1000);

    const refresh = setInterval(async () => {
      try {
        const endpoint = `/api/railkit/train?trainNumber=${encodeURIComponent(trainParam)}&date=${encodeURIComponent(selectedDate)}`;
        const res = await fetch(endpoint);
        const json = await res.json();
        if (json.success && json.data?.live) {
          setData((prev) => (prev ? { ...prev, live: json.data.live } : json.data));
          setSecondsSinceUpdate(0);
        }
      } catch {
        // Silently preserve current telemetry
      }
    }, 60000);

    return () => {
      clearInterval(tick);
      clearInterval(refresh);
    };
  }, [trainParam, selectedDate]);

  // Autocomplete train name/number search
  useEffect(() => {
    const trimmed = searchInput.trim();
    if (trimmed.length >= 2) {
      setIsSearchingSuggestions(true);
      const t = setTimeout(async () => {
        try {
          const res = await fetch(`/api/railkit/search?query=${encodeURIComponent(trimmed)}`);
          const json = await res.json();
          if (json.success && json.trains) {
            setSuggestions(json.trains);
          }
        } catch {
          setSuggestions([]);
        } finally {
          setIsSearchingSuggestions(false);
        }
      }, 250);
      return () => clearTimeout(t);
    } else {
      setSuggestions([]);
    }
  }, [searchInput]);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchInput.trim();
    if (!clean) return;

    // If numeric (4 or 5 digits)
    if (/^\d{4,5}$/.test(clean)) {
      setSuggestions([]);
      router.push(`/check-train?train=${clean}&date=${encodeURIComponent(selectedDate)}`);
      return;
    }

    // If suggestions currently loaded, take top match
    if (suggestions.length > 0) {
      const selected = suggestions[0];
      setSuggestions([]);
      setSearchInput(selected.trainNo);
      router.push(`/check-train?train=${selected.trainNo}&date=${encodeURIComponent(selectedDate)}`);
      return;
    }

    // Try live search lookup before displaying error
    try {
      const res = await fetch(`/api/railkit/search?query=${encodeURIComponent(clean)}`);
      const json = await res.json();
      if (json.success && json.trains && json.trains.length > 0) {
        const top = json.trains[0];
        setSuggestions([]);
        setSearchInput(top.trainNo);
        router.push(`/check-train?train=${top.trainNo}&date=${encodeURIComponent(selectedDate)}`);
        return;
      }
    } catch {}

    setErrorMessage(`Could not find train "${clean}". Please enter a 5-digit train number (e.g. 12004) or select from the list below.`);
  };

  const handleSelectTrain = (trainNo: string) => {
    setSearchInput(trainNo);
    setSuggestions([]);
    router.push(`/check-train?train=${trainNo}&date=${encodeURIComponent(selectedDate)}`);
  };

  const handleSelectDate = (dateVal: string) => {
    setSelectedDate(dateVal);
    router.push(`/check-train?train=${trainParam}&date=${encodeURIComponent(dateVal)}`);
  };

  const deliveryAvailable = data
    ? isRailQuickAvailable(
        data.train.number,
        data.live.currentStationCode || data.journey.destinationCode
      )
    : false;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ─── SEARCH & CONTROLS SECTION (SECTIONS 11 & 12) ─── */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-900 border border-emerald-300 text-[10px] font-black uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              Live Train Radar
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Live Train Status
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Track real-time coach telemetry, speed, delays & station halts.
            </p>
          </div>

          <Link
            href="/pnr"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl border border-emerald-200 transition-colors shrink-0"
          >
            <span>Have a PNR? Check PNR</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Option 1 & Option 2 Mode Toggle (Section 11) */}
        <div className="flex items-center gap-2 mb-3">
          <button
            type="button"
            onClick={() => {
              setSearchMode("number");
              setSuggestions([]);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
              searchMode === "number"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Option 1: Train Number
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchMode("name");
              setSuggestions([]);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all ${
              searchMode === "name"
                ? "bg-slate-900 text-white shadow-xs"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            Option 2: Train Name
          </button>
        </div>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder={
                  searchMode === "number"
                    ? "Enter 5-digit Train Number (e.g. 12004, 12952)"
                    : "Search Train by Name (e.g. Shatabdi, Rajdhani, Vande Bharat)"
                }
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 font-bold text-sm sm:text-base placeholder:text-slate-400 placeholder:font-normal focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
              />
              {isSearchingSuggestions && (
                <Loader2 className="w-4 h-4 text-slate-400 animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
              )}
            </div>

            <button
              type="submit"
              className="h-12 px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm shrink-0"
            >
              <span>Track Train</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>

          {/* Autocomplete Dropdown Suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-30 max-h-60 overflow-y-auto">
              {suggestions.map((item) => (
                <button
                  key={item.trainNo}
                  type="button"
                  onClick={() => handleSelectTrain(item.trainNo)}
                  className="w-full px-4 py-2.5 text-left hover:bg-emerald-50/70 border-b border-slate-100 last:border-0 flex items-center justify-between gap-2 transition-colors"
                >
                  <div>
                    <span className="font-mono font-black text-slate-900 mr-2 text-xs">
                      {item.trainNo}
                    </span>
                    <span className="text-xs font-bold text-slate-700">{item.trainName}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">{item.route}</span>
                </button>
              ))}
            </div>
          )}
        </form>

        {/* Journey Date Selector (Section 12) */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
            <Calendar className="w-3.5 h-3.5" /> Date:
          </span>
          {[
            { id: "yesterday", label: `Yesterday (${yesterdayFormatted})` },
            { id: "today", label: `Today (${todayFormatted})` },
            { id: "tomorrow", label: `Tomorrow (${tomorrowFormatted})` },
          ].map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => {
                setCustomDateInput("");
                handleSelectDate(d.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDate === d.id && !customDateInput
                  ? "bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs font-black"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60"
              }`}
            >
              {d.label}
            </button>
          ))}

          {/* Custom Date Input for Multi-Day or Specific Journeys */}
          <div className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-2.5 py-1 transition-colors">
            <span className="text-xs font-bold text-slate-500">Pick Date:</span>
            <input
              type="date"
              value={customDateInput}
              onChange={(e) => {
                const val = e.target.value;
                setCustomDateInput(val);
                if (val) {
                  const [y, m, d] = val.split("-");
                  const formatted = `${d}-${m}-${y}`;
                  handleSelectDate(formatted);
                }
              }}
              className="bg-transparent text-xs font-bold text-slate-900 outline-none cursor-pointer"
            />
          </div>
        </div>

        {/* Popular Express Trains Shortcuts */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100 text-xs text-slate-500">
          <span className="font-bold text-slate-400 mr-1">Popular:</span>
          {POPULAR_QUICK_TRAINS.map((q) => (
            <button
              key={q.no}
              type="button"
              onClick={() => handleSelectTrain(q.no)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                trainParam === q.no
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {q.name} ({q.no})
            </button>
          ))}
        </div>
      </div>

      {/* ─── LIVE TRACKING DASHBOARD RESULTS (SECTIONS 13, 14, 15) ─── */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-44 bg-white rounded-3xl border border-slate-200" />
          <div className="h-32 bg-white rounded-3xl border border-slate-200" />
          <div className="h-64 bg-white rounded-3xl border border-slate-200" />
        </div>
      ) : errorMessage || !data ? (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black text-slate-900 mb-1">Live Location Unavailable</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4 font-medium">
            {errorMessage || "Live location isn't available for this journey right now."}
          </p>
          <button
            type="button"
            onClick={() => fetchTelemetry(trainParam, selectedDate)}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
          >
            Retry Telemetry
          </button>
        </div>
      ) : (
        <>
          {/* Header Card: Live Status & Route (Section 13) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs font-black bg-slate-900 text-white px-2.5 py-0.5 rounded-lg">
                  {data.train.number}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {data.train.type || "Superfast Express"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {data.train.name}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {data.journey.source} ({data.journey.sourceCode}) ⇄ {data.journey.destination} ({data.journey.destinationCode})
              </p>
            </div>

            <div className="flex items-center gap-3 text-right">
              <div>
                <span className="text-[10px] text-slate-400 font-mono block">Active Telemetry</span>
                <span className="text-xs font-mono font-bold text-emerald-700 flex items-center justify-end gap-1">
                  <Clock className="w-3 h-3" /> Updated {secondsSinceUpdate}s ago
                </span>
              </div>
              <button
                type="button"
                onClick={() => fetchTelemetry(trainParam, selectedDate)}
                title="Refresh Status"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-2xs"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Section 15: RailQuick Delivery Availability Card */}
          <DeliveryAvailability
            isAvailable={deliveryAvailable}
            trainNumber={data.train.number}
            trainName={data.train.name}
            onOpenAlertModal={() => setIsAlertModalOpen(true)}
          />

          {/* Section 13, 14, 9: Live Status / Unavailable */}
          {data.live ? (
            <>
              {/* Section 13: Where is the train? Current Location Card */}
              <TrainLocation data={data} />

              {/* Section 14: Journey Progress Card with Animated Bar */}
              {data.live.progress !== undefined && <TrainProgress data={data} />}

              {/* Section 9: Live Station Timeline */}
              {data.live.stations && data.live.stations.length > 0 && (
                <StationTimeline stations={data.live.stations} />
              )}
            </>
          ) : (
            <div className="bg-amber-50/80 rounded-3xl border border-amber-200/90 p-5 sm:p-6 text-center shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-2">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-sm sm:text-base font-black text-amber-950">
                Live information unavailable for this train right now.
              </h4>
              <p className="text-xs text-amber-800/80 mt-1 max-w-md mx-auto">
                Real-time tracking is updated once Indian Railways broadcasts live train telemetry for this date.
              </p>
            </div>
          )}

          {/* Section 16: Get Alert Modal */}
          <TrainAlertModal
            isOpen={isAlertModalOpen}
            onClose={() => setIsAlertModalOpen(false)}
            trainNumber={data.train.number}
            trainName={data.train.name}
            journeyDate={data.journey.date}
            source="train_tracking"
          />
        </>
      )}
    </div>
  );
}

export default function CheckTrainPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 pt-32 sm:pt-36 pb-20 px-4 sm:px-6">
        <Suspense
          fallback={
            <div className="max-w-4xl mx-auto py-12 text-center text-slate-400 font-bold">
              Loading live train radar...
            </div>
          }
        >
          <CheckTrainContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
