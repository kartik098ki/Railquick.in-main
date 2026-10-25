"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
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
import { NormalizedJourneyData, NormalizedStation } from "@/lib/railkitNormalizer";
import { resolveTrainInfo } from "@/lib/trainDatabase";
import {
  isValidTrainSearchQuery,
  searchTrainsOptimized,
  getCachedTrainSuggestions,
} from "@/lib/trainSearchCache";
import {
  Train,
  Clock,
  MapPin,
  Calendar,
  CalendarX,
  Search,
  ArrowRight,
  ArrowLeft,
  RotateCw,
  Share2,
  AlertCircle,
  Loader2,
  Sparkles,
  Bell,
  CheckCircle2,
} from "lucide-react";

const POPULAR_QUICK_TRAINS = [
  { no: "12004", name: "Lucknow Shatabdi", route: "NDLS ⇄ LJN" },
  { no: "12952", name: "Mumbai Rajdhani", route: "NDLS ⇄ MMCT" },
  { no: "22436", name: "Vande Bharat Express", route: "NDLS ⇄ BSB" },
  { no: "12302", name: "Howrah Rajdhani", route: "NDLS ⇄ HWH" },
  { no: "12626", name: "Kerala Express", route: "NDLS ⇄ TVC" },
  { no: "12002", name: "Bhopal Shatabdi", route: "NDLS ⇄ RKMP" },
];

function parseJourneyDate(dateParam: string): Date {
  const now = new Date();
  if (!dateParam || dateParam === "today") return now;
  if (dateParam === "yesterday") return new Date(now.getTime() - 86400000);
  if (dateParam === "tomorrow") return new Date(now.getTime() + 86400000);

  if (dateParam.includes("-")) {
    const parts = dateParam.split("-");
    if (parts[0].length === 4) {
      return new Date(`${dateParam}T00:00:00`);
    } else if (parts.length === 3) {
      const [d, m, y] = parts;
      return new Date(Number(y), Number(m) - 1, Number(d));
    }
  }
  return now;
}

function checkTrainOperationOnDate(trainNo: string, dateParam: string) {
  const trainInfo = resolveTrainInfo(trainNo);
  const runningDays = trainInfo?.runningDays || "All 7 Days";
  const dateObj = parseJourneyDate(dateParam);

  const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const weekdayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayIdx = dateObj.getDay();
  const currentWeekday = weekdayNames[dayIdx];
  const currentShort = weekdayShort[dayIdx];

  const lowerDays = runningDays.toLowerCase();
  let operates = true;

  if (lowerDays.includes("all 7 days") || lowerDays.includes("daily")) {
    operates = true;
  } else if (lowerDays.startsWith("except ")) {
    const exceptDay = lowerDays.replace("except ", "").trim();
    operates = !currentWeekday.toLowerCase().startsWith(exceptDay);
  } else {
    const allowed = runningDays.split(",").map((s) => s.trim().slice(0, 3).toLowerCase());
    operates = allowed.some((d) => currentShort.toLowerCase().startsWith(d));
  }

  // Find next 3 running dates from now
  const upcomingRuns: Array<{ label: string; dateParam: string; formatted: string }> = [];
  const baseNow = new Date();
  for (let offset = 0; offset <= 7; offset++) {
    const candidate = new Date(baseNow.getTime() + offset * 86400000);
    const candDayIdx = candidate.getDay();
    const candWeekday = weekdayNames[candDayIdx];
    const candShort = weekdayShort[candDayIdx];

    let candRuns = true;
    if (lowerDays.includes("all 7 days") || lowerDays.includes("daily")) {
      candRuns = true;
    } else if (lowerDays.startsWith("except ")) {
      const exceptDay = lowerDays.replace("except ", "").trim();
      candRuns = !candWeekday.toLowerCase().startsWith(exceptDay);
    } else {
      const allowed = runningDays.split(",").map((s) => s.trim().slice(0, 3).toLowerCase());
      candRuns = allowed.some((d) => candShort.toLowerCase().startsWith(d));
    }

    if (candRuns) {
      const dd = String(candidate.getDate()).padStart(2, "0");
      const mm = String(candidate.getMonth() + 1).padStart(2, "0");
      const yyyy = candidate.getFullYear();
      const dateParamVal = offset === 0 ? "today" : offset === 1 ? "tomorrow" : `${dd}-${mm}-${yyyy}`;
      const label = offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : candShort;
      const formatted = candidate.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
      upcomingRuns.push({ label, dateParam: dateParamVal, formatted });
      if (upcomingRuns.length >= 3) break;
    }
  }

  const allDaysList = [
    { short: "Mon", full: "Monday" },
    { short: "Tue", full: "Tuesday" },
    { short: "Wed", full: "Wednesday" },
    { short: "Thu", full: "Thursday" },
    { short: "Fri", full: "Friday" },
    { short: "Sat", full: "Saturday" },
    { short: "Sun", full: "Sunday" },
  ].map((d) => {
    let dayRuns = true;
    if (lowerDays.includes("all 7 days") || lowerDays.includes("daily")) {
      dayRuns = true;
    } else if (lowerDays.startsWith("except ")) {
      const exceptDay = lowerDays.replace("except ", "").trim();
      dayRuns = !d.full.toLowerCase().startsWith(exceptDay);
    } else {
      const allowed = runningDays.split(",").map((s) => s.trim().slice(0, 3).toLowerCase());
      dayRuns = allowed.some((item) => d.short.toLowerCase().startsWith(item));
    }
    return { ...d, runs: dayRuns };
  });

  return {
    operates,
    runningDays,
    weekdayName: currentWeekday,
    weekdayShort: currentShort,
    formattedDate: dateObj.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      weekday: "short",
    }),
    trainInfo,
    upcomingRuns,
    allDaysList,
  };
}

function CheckTrainContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const trainParam = searchParams.get("train") || searchParams.get("trainNumber") || "12004";
  const dateParam = searchParams.get("date") || "today";

  // Search Mode: Train Number vs Train Name (Section 11)
  const [searchMode, setSearchMode] = useState<"number" | "name">("number");
  const [searchInput, setSearchInput] = useState(trainParam);
  const [hasUserTyped, setHasUserTyped] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dateParam);
  const [customDateInput, setCustomDateInput] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{ trainNo: string; trainName: string; route: string }>>([]);
  const [isSearchingSuggestions, setIsSearchingSuggestions] = useState(false);

  const [data, setData] = useState<NormalizedJourneyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [secondsSinceUpdate, setSecondsSinceUpdate] = useState(0);
  const dateInputRef = useRef<HTMLInputElement>(null);

  // Date formatted options
  const now = new Date();
  const yest = new Date(now.getTime() - 86400000);
  const tom = new Date(now.getTime() + 86400000);

  const formatDateDisplay = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
  const formatWeekday = (d: Date) => d.toLocaleDateString("en-IN", { weekday: "short" });
  const customDateFormatted = customDateInput
    ? new Date(`${customDateInput}T00:00:00`).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      })
    : "";

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
    setSearchInput(trainParam);
    setSelectedDate(dateParam);
    setHasUserTyped(false);
    setSuggestions([]);
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

  // Only call search API once the user has finished writing the full 5-digit train number
  // or paused after finishing a train name (900ms settle time)
  useEffect(() => {
    if (!hasUserTyped) {
      setIsSearchingSuggestions(false);
      return;
    }

    const trimmed = searchInput.trim();

    if (!isValidTrainSearchQuery(trimmed)) {
      setSuggestions([]);
      setIsSearchingSuggestions(false);
      return;
    }

    const cached = getCachedTrainSuggestions(trimmed);
    if (cached !== null) {
      setSuggestions(cached);
      setIsSearchingSuggestions(false);
      return;
    }

    const isCompleteTrainNo = /^\d{5}$/.test(trimmed);
    const settleDelayMs = isCompleteTrainNo ? 350 : 900;
    const controller = new AbortController();

    const t = setTimeout(async () => {
      setIsSearchingSuggestions(true);
      try {
        const results = await searchTrainsOptimized(trimmed, controller.signal);
        if (!controller.signal.aborted) {
          setSuggestions(results);
        }
      } catch {
        if (!controller.signal.aborted) {
          setSuggestions([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsSearchingSuggestions(false);
        }
      }
    }, settleDelayMs);

    return () => {
      clearTimeout(t);
      controller.abort();
      setIsSearchingSuggestions(false);
    };
  }, [searchInput, hasUserTyped]);

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchInput.trim();
    if (!clean) return;

    setHasUserTyped(false);
    setIsSearchingSuggestions(false);

    // If numeric (4 or 5 digits)
    if (/^\d{4,5}$/.test(clean)) {
      setSuggestions([]);
      fetchTelemetry(clean, selectedDate);
      router.push(`/check-train?train=${clean}&date=${encodeURIComponent(selectedDate)}`);
      return;
    }

    // If suggestions currently loaded, take top match
    if (suggestions.length > 0) {
      const selected = suggestions[0];
      setSuggestions([]);
      setSearchInput(selected.trainNo);
      fetchTelemetry(selected.trainNo, selectedDate);
      router.push(`/check-train?train=${selected.trainNo}&date=${encodeURIComponent(selectedDate)}`);
      return;
    }

    // Try live search lookup before displaying error
    try {
      setIsSearchingSuggestions(true);
      const trains = await searchTrainsOptimized(clean, undefined, true);
      if (trains.length > 0) {
        const top = trains[0];
        setSuggestions([]);
        setSearchInput(top.trainNo);
        fetchTelemetry(top.trainNo, selectedDate);
        router.push(`/check-train?train=${top.trainNo}&date=${encodeURIComponent(selectedDate)}`);
        return;
      }
    } catch {
      // Fall through to error message
    } finally {
      setIsSearchingSuggestions(false);
    }

    setErrorMessage(`Could not find train "${clean}". Please enter a 5-digit train number (e.g. 12004) or select from the list below.`);
  };

  const handleSelectTrain = (trainNo: string) => {
    setHasUserTyped(false);
    setSearchInput(trainNo);
    setSuggestions([]);
    fetchTelemetry(trainNo, selectedDate);
    router.push(`/check-train?train=${trainNo}&date=${encodeURIComponent(selectedDate)}`);
  };

  const handleSelectDate = (dateVal: string) => {
    setSelectedDate(dateVal);
    fetchTelemetry(trainParam, dateVal);
    router.push(`/check-train?train=${trainParam}&date=${encodeURIComponent(dateVal)}`);
  };

  const scheduleStatus = checkTrainOperationOnDate(trainParam, selectedDate);
  const isNotRunningOnDate =
    !scheduleStatus.operates ||
    data?.live?.journeyState === "not_running" ||
    (errorMessage !== null &&
      (errorMessage.toLowerCase().includes("not running") ||
        errorMessage.toLowerCase().includes("not scheduled") ||
        errorMessage.toLowerCase().includes("does not run")));

  const trainNumber = data?.train?.number || scheduleStatus.trainInfo.trainNo || trainParam;
  const trainName = data?.train?.name || scheduleStatus.trainInfo.trainName;
  const trainType = data?.train?.type || scheduleStatus.trainInfo.trainType || "Superfast Express";
  const sourceName = data?.journey?.source || scheduleStatus.trainInfo.from.name;
  const sourceCode = data?.journey?.sourceCode || scheduleStatus.trainInfo.from.code;
  const destinationName = data?.journey?.destination || scheduleStatus.trainInfo.to.name;
  const destinationCode = data?.journey?.destinationCode || scheduleStatus.trainInfo.to.code;

  const scheduledStations: NormalizedStation[] =
    data?.live?.stations && data.live.stations.length > 0
      ? data.live.stations.map((s) => ({
          ...s,
          state: "upcoming" as const,
          delayText: "Scheduled",
          delayMinutes: 0,
        }))
      : (scheduleStatus.trainInfo.stops || []).map((st: any) => ({
          code: st.code,
          name: st.name,
          platform: st.platform || "1",
          scheduledArrival: st.arr && st.arr !== "--" ? st.arr : undefined,
          actualArrival: st.arr && st.arr !== "--" ? st.arr : undefined,
          scheduledDeparture: st.dep && st.dep !== "--" ? st.dep : undefined,
          actualDeparture: st.dep && st.dep !== "--" ? st.dep : undefined,
          delayText: "Scheduled",
          delayMinutes: 0,
          state: "upcoming" as const,
          deliveryAvailable: isRailQuickAvailable(trainNumber, st.code),
        }));

  const deliveryAvailable = data
    ? isRailQuickAvailable(
        data.train.number,
        data.live?.currentStationCode || data.journey.destinationCode
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
              setHasUserTyped(false);
              if (!/^\d*$/.test(searchInput.trim())) {
                setSearchInput("");
              }
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
              setHasUserTyped(false);
              if (/^\d+$/.test(searchInput.trim())) {
                setSearchInput("");
              }
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
                onChange={(e) => {
                  setHasUserTyped(true);
                  setSearchInput(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
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

        {/* User-Friendly Journey Date Selector Cards */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span>Journey Start Date</span>
            </span>
            {customDateInput && (
              <button
                type="button"
                onClick={() => {
                  setCustomDateInput("");
                  handleSelectDate("today");
                }}
                className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Reset to Today
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              {
                id: "yesterday",
                label: "Yesterday",
                sub: `${yesterdayFormatted} • ${formatWeekday(yest)}`,
              },
              {
                id: "today",
                label: "Today",
                sub: `${todayFormatted} • ${formatWeekday(now)}`,
                liveDot: true,
              },
              {
                id: "tomorrow",
                label: "Tomorrow",
                sub: `${tomorrowFormatted} • ${formatWeekday(tom)}`,
              },
            ].map((d) => {
              const isSelected = selectedDate === d.id && !customDateInput;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => {
                    setCustomDateInput("");
                    handleSelectDate(d.id);
                  }}
                  className={`py-2.5 px-3 rounded-2xl transition-all border flex flex-col items-start sm:items-center justify-center text-left sm:text-center cursor-pointer ${
                    isSelected
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200/80"
                  }`}
                >
                  <span className="text-xs font-extrabold tracking-tight flex items-center gap-1.5">
                    {d.liveDot && (
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isSelected ? "bg-white animate-pulse" : "bg-emerald-500"
                        }`}
                      />
                    )}
                    {d.label}
                  </span>
                  <span
                    className={`text-[10.5px] font-semibold mt-0.5 ${
                      isSelected ? "text-emerald-100" : "text-slate-400"
                    }`}
                  >
                    {d.sub}
                  </span>
                </button>
              );
            })}

            {/* 4th Card: Interactive Calendar Date Picker Card */}
            <div
              onClick={() => {
                try {
                  dateInputRef.current?.showPicker?.();
                } catch {
                  dateInputRef.current?.focus();
                }
              }}
              className={`relative py-2.5 px-3 rounded-2xl transition-all border flex flex-col items-start sm:items-center justify-center text-left sm:text-center cursor-pointer overflow-hidden ${
                customDateInput
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200/80"
              }`}
            >
              <span className="text-xs font-extrabold tracking-tight flex items-center gap-1.5">
                <Calendar
                  className={`w-3.5 h-3.5 ${
                    customDateInput ? "text-white" : "text-emerald-600"
                  }`}
                />
                <span>{customDateInput ? customDateFormatted : "Other Date"}</span>
              </span>
              <span
                className={`text-[10.5px] font-semibold mt-0.5 ${
                  customDateInput ? "text-emerald-100" : "text-slate-400"
                }`}
              >
                {customDateInput ? "Custom Selected" : "Open Calendar"}
              </span>
              <input
                ref={dateInputRef}
                type="date"
                value={customDateInput}
                aria-label="Pick custom journey date"
                onChange={(e) => {
                  const val = e.target.value;
                  setCustomDateInput(val);
                  if (val) {
                    const [y, m, d] = val.split("-");
                    const formatted = `${d}-${m}-${y}`;
                    handleSelectDate(formatted);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
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
      ) : isNotRunningOnDate ? (
        <>
          {/* Header Card: Train & Route Information */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="font-mono text-xs font-black bg-slate-900 text-white px-2.5 py-0.5 rounded-lg">
                  {trainNumber}
                </span>
                <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
                  Not Operating on {scheduleStatus.currentShort}
                </span>
                <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {trainType}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {trainName}
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {sourceName} ({sourceCode}) ⇄ {destinationName} ({destinationCode})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAlertModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <span>Get Departure Alert</span>
              </button>
              <button
                type="button"
                onClick={() => fetchTelemetry(trainParam, selectedDate)}
                title="Refresh Status"
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Dedicated High-Trust "Train Does Not Run on This Date" Card */}
          <div className="bg-white rounded-3xl border border-rose-200/90 shadow-sm overflow-hidden p-5 sm:p-7">
            <div className="flex items-start gap-3.5 pb-5 border-b border-rose-100">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                <CalendarX className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-200 text-[10.5px] font-black uppercase tracking-wider mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                  Train Does Not Run on This Date
                </div>
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                  Train {trainNumber} does not run on {scheduleStatus.weekdayName} ({scheduleStatus.formattedDate})
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                  According to official Indian Railways timetables, this train has no scheduled service on {scheduleStatus.weekdayName}s.
                </p>
              </div>
            </div>

            {/* 7-Day Weekly Running Calendar Breakdown */}
            <div className="mt-5">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block mb-2.5">
                Weekly Operating Schedule:
              </span>
              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {scheduleStatus.allDaysList.map((day) => {
                  const isSelectedDay =
                    day.full.toLowerCase() === scheduleStatus.weekdayName.toLowerCase();
                  return (
                    <div
                      key={day.short}
                      className={`p-2 rounded-2xl text-center border transition-all ${
                        isSelectedDay
                          ? "ring-2 ring-rose-500 ring-offset-1 font-black shadow-xs"
                          : ""
                      } ${
                        day.runs
                          ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                          : "bg-rose-50/80 border-rose-200 text-rose-900"
                      }`}
                    >
                      <span className="text-[11px] sm:text-xs font-bold block">{day.short}</span>
                      <span className="text-[10.5px] sm:text-[11px] font-black mt-0.5 block">
                        {day.runs ? "Runs ✓" : "Off ✕"}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-[11.5px] text-slate-500 font-medium mt-2.5">
                Official Schedule:{" "}
                <span className="font-bold text-slate-800">{scheduleStatus.runningDays}</span>
              </p>
            </div>

            {/* Nearest Running Dates Quick-Select Buttons */}
            {scheduleStatus.upcomingRuns.length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-100">
                <span className="text-xs font-black text-slate-800 block mb-2.5">
                  Nearest Dates When Train {trainNumber} Runs (Click to View):
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {scheduleStatus.upcomingRuns.map((run) => (
                    <button
                      key={run.dateParam}
                      type="button"
                      onClick={() => handleSelectDate(run.dateParam)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-xs cursor-pointer active:scale-95"
                    >
                      <Calendar className="w-3.5 h-3.5 text-emerald-200" />
                      <span>
                        Switch to {run.label} ({run.formatted})
                      </span>
                      <ArrowRight className="w-3 h-3 text-emerald-300" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Delivery Note for Non-Running Dates */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-4 sm:p-5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900">
                On-Seat Delivery Inactive for Selected Date
              </h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5 leading-relaxed">
                Because Train {trainNumber} is not operating on {scheduleStatus.formattedDate}, seat delivery and live GPS telemetry are paused. Select one of the running dates above to place essentials orders.
              </p>
            </div>
          </div>

          {/* Scheduled Station Halts (Official Reference Timetable) */}
          {scheduledStations.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div>
                  <h4 className="text-sm font-black text-slate-800">
                    Official Route Timetable (For Reference)
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Scheduled halts and arrival timings for Train {trainNumber}.
                  </p>
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-xl">
                  {scheduledStations.length} Stops
                </span>
              </div>
              <StationTimeline stations={scheduledStations} />
            </div>
          )}

          {/* Section 16: Get Alert Modal */}
          <TrainAlertModal
            isOpen={isAlertModalOpen}
            onClose={() => setIsAlertModalOpen(false)}
            trainNumber={trainNumber}
            trainName={trainName}
            journeyDate={scheduleStatus.formattedDate}
            source="train_tracking"
          />
        </>
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
              {data.live?.progress !== undefined && <TrainProgress data={data} />}

              {/* Section 9: Live Station Timeline */}
              {data.live?.stations && data.live.stations.length > 0 && (
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
