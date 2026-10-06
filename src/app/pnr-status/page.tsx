"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import CheckPnrModal from "@/components/CheckPnrModal";
import Navbar from "@/components/Navbar";
import TicketPnrButton from "@/components/TicketPnrButton";
import OpenAppModal from "@/components/OpenAppModal";
import { motion, AnimatePresence } from "framer-motion";
import {
  Train,
  Clock,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Search,
  Gauge,
  ArrowLeft,
  Copy,
  Check,
  Bell,
  Sparkles,
  Compass,
  AlertCircle,
  Loader2,
  Ticket,
  Calendar,
  Layers,
  Share2,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface StationStop {
  code: string;
  name: string;
  halt: string;
  arr: string;
  dep: string;
  status: string;
  passed: boolean;
  platform?: string;
  deliveryAvailable?: boolean;
  etaMins?: number;
  distanceKm?: string;
}

interface CoachItem {
  type: string;
  number: string;
}

interface TelemetryData {
  pnr: string;
  trainNumber: string;
  trainName: string;
  trainType?: string;
  travelTime?: string;
  runningDays?: string;
  totalDistance?: string;
  totalHalts?: number;
  journeyDate?: string;
  boardingDate?: string;
  fromStation: { code: string; name: string };
  toStation: { code: string; name: string };
  chartStatus: string;
  currentStatus: string;
  delayMins: number;
  currentSpeed: string;
  runStatus?: "in_transit" | "at_origin" | "completed" | "completed_today" | "upcoming";
  segmentProgress?: number;
  distanceToNext?: string;
  prevStation?: {
    code: string;
    name: string;
    dep?: string;
    platform?: string;
  } | null;
  nextStation: {
    code: string;
    name: string;
    platform: string;
    eta: string;
    halt: string;
    deliveryEligible: boolean;
  };
  passengers?: {
    number: number;
    bookingStatus: string;
    currentStatus: string;
    coach: string;
    berth: string;
    berthType: string;
    class: string;
    quota: string;
  }[];
  coachPosition?: CoachItem[] | string;
  stations: StationStop[];
  lastUpdated: string;
  isTrainSearch?: boolean;
}

function PnrStatusContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pnrParam = searchParams.get("pnr");
  const trainParam = searchParams.get("train") || searchParams.get("trainNumber");
  const dateParam = searchParams.get("date") || "today";

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TelemetryData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedPnr, setCopiedPnr] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [isOpenAppModalOpen, setIsOpenAppModalOpen] = useState(false);

  // Station timeline collapse/blur states
  const [showAllPastStations, setShowAllPastStations] = useState(false);
  const [showAllUpcomingStations, setShowAllUpcomingStations] = useState(false);

  // Search Bar State
  const [searchMode, setSearchMode] = useState<"train" | "pnr">(pnrParam ? "pnr" : "train");
  const [searchInput, setSearchInput] = useState(trainParam || pnrParam || "12004");
  const [selectedDate, setSelectedDate] = useState(dateParam);

  const fetchData = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      let endpoint = "";
      if (trainParam) {
        endpoint = `/api/pnr-status?train=${encodeURIComponent(trainParam)}&date=${encodeURIComponent(dateParam)}`;
        setSearchMode("train");
        setSearchInput(trainParam);
      } else if (pnrParam) {
        endpoint = `/api/pnr-status?pnr=${encodeURIComponent(pnrParam)}`;
        setSearchMode("pnr");
        setSearchInput(pnrParam);
      } else {
        endpoint = `/api/pnr-status?train=12004&date=today`;
        setSearchMode("train");
        setSearchInput("12004");
      }

      const res = await fetch(endpoint);
      const json = await res.json();

      if (json.success && (json.trainNumber || json.data?.trainNumber)) {
        const payload = json.data && (json.data.trainNumber || json.data.pnr) ? json.data : json;
        setData(payload);
        setErrorMessage(null);
      } else {
        setErrorMessage(
          json.error || "No active train telemetry or booking data found."
        );
        setData(null);
      }
    } catch {
      setErrorMessage("Could not connect to live radar servers. Please check your internet connection.");
      setData(null);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pnrParam, trainParam, dateParam]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchInput.trim().replace(/\D/g, "");

    if (searchMode === "pnr") {
      setIsCheckModalOpen(true);
      return;
    } else {
      if (clean.length >= 4 && clean.length <= 5) {
        router.push(`/check-train?train=${clean}&date=${encodeURIComponent(selectedDate)}`);
      } else {
        toast({
          title: "Invalid Train Number",
          description: "Please enter a valid 5-digit train number (e.g. 12004 or 12952).",
          variant: "destructive",
        });
      }
    }
  };

  const handleCopyIdentifier = () => {
    const textToCopy = data?.pnr || data?.trainNumber || "";
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedPnr(true);
      toast({ title: "Copied!", description: `${textToCopy} copied to clipboard.` });
      setTimeout(() => setCopiedPnr(false), 2000);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
    toast({ title: "Refreshing Status...", description: "Connecting to live GPS train telemetry." });
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const shareUrl = window.location.href;
      if (navigator.share) {
        navigator.share({
          title: `Live Status: ${data?.trainName} (${data?.trainNumber})`,
          text: `Check live location & berth delivery status for Train ${data?.trainNumber} on RailQuick.`,
          url: shareUrl,
        }).catch(() => {});
      } else if (navigator?.clipboard) {
        navigator.clipboard.writeText(shareUrl);
        toast({ title: "Link Copied!", description: "Live tracking link copied to clipboard." });
      }
    }
  };

  const passedStations = data?.stations?.filter((s) => s.passed) || [];
  const upcomingStations = data?.stations?.filter((s) => !s.passed) || [];
  const totalStations = data?.stations?.length || 1;
  const progressPct = Math.min(100, Math.round((passedStations.length / totalStations) * 100));

  // The last passed station (1 station to show)
  const lastPassedStation = passedStations.length > 0 ? passedStations[passedStations.length - 1] : null;
  const earlierPassedStations = passedStations.length > 1 ? passedStations.slice(0, passedStations.length - 1) : [];

  // Next upcoming station (1 station to show prominently)
  const immediateNextStation = upcomingStations.length > 0 ? upcomingStations[0] : null;
  const laterUpcomingStations = upcomingStations.length > 1 ? upcomingStations.slice(1) : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-amber-100 selection:text-amber-900">
      <CheckPnrModal isOpen={isCheckModalOpen} onClose={() => setIsCheckModalOpen(false)} />
      <OpenAppModal isOpen={isOpenAppModalOpen} onClose={() => setIsOpenAppModalOpen(false)} />

      {/* ─── UNIFIED NAVIGATION ─── */}
      <Navbar onOpenPnrModal={() => setIsCheckModalOpen(true)} />

      <main className="flex-1 pt-20 sm:pt-24 pb-16">
        {/* Top Hero Search Banner */}
        <section className="bg-gradient-to-b from-amber-50/60 via-slate-50/50 to-white text-slate-900 py-6 sm:py-10 relative overflow-hidden border-b border-slate-200/80">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
              <div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-slate-500 text-xs font-bold mb-2 hover:text-slate-900 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
                </Link>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                    {data?.isTrainSearch ? "Live Train Running Radar" : "Live PNR Berth Status"}
                  </h1>
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-black uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Telemetry
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCheckModalOpen(true)}
                  className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-100/80 hover:bg-amber-200/80 border border-amber-300 text-amber-950 text-xs font-bold transition-all group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
                  <span>⚡ LIVE PNR RADAR LAUNCHING 7TH OCT AT 8:00 PM IST — Click for Countdown</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Quick Search Toggle Form */}
            <div className="max-w-2xl bg-white/80 backdrop-blur-md p-3.5 sm:p-4 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setSearchMode("pnr");
                    setSearchInput("");
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                    searchMode === "pnr"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:text-slate-900"
                  }`}
                >
                  <Ticket className="w-3 h-3 inline mr-1 text-amber-400" /> 10-Digit PNR
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSearchMode("train");
                    setSearchInput("12004");
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                    searchMode === "train"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:text-slate-900"
                  }`}
                >
                  <Train className="w-3 h-3 inline mr-1 text-amber-400" /> Train Number
                </button>
              </div>

              <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={searchMode === "pnr" ? 10 : 5}
                    placeholder={searchMode === "pnr" ? "Enter 10-digit PNR..." : "Enter 5-digit Train No (e.g. 12004)..."}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value.replace(/\D/g, "").slice(0, searchMode === "pnr" ? 10 : 5))}
                    style={{ fontSize: "16px" }}
                    className="w-full h-11 pl-4 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono font-black text-sm placeholder:text-slate-400 focus:bg-white focus:border-amber-500 focus:outline-none transition-all tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  className="h-11 px-6 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95 whitespace-nowrap"
                >
                  <Search className="w-3.5 h-3.5 text-amber-400" /> {searchMode === "pnr" ? "Check PNR" : "Check Train"}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-6 relative z-20">
          {loading ? (
            <div className="space-y-4 pt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm animate-pulse">
                  <div className="h-5 bg-slate-200 rounded w-1/4 mb-3" />
                  <div className="h-8 bg-slate-200 rounded w-1/2 mb-2" />
                  <div className="h-4 bg-slate-100 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : errorMessage ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl border border-rose-200 p-6 sm:p-8 shadow-xl text-center max-w-xl mx-auto my-6"
            >
              <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-black text-slate-900 mb-2">No Active Data Found</h2>
              <p className="text-sm text-slate-600 leading-relaxed font-medium mb-5">{errorMessage}</p>
              <button
                onClick={() => router.push("/pnr-status?train=12004&date=today")}
                className="h-11 px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-md transition-all"
              >
                Track Shatabdi 12004 Live
              </button>
            </motion.div>
          ) : data ? (
            <div className="space-y-6">
              {/* ── 1. TICKET HEADER CARD (Clean, Professional) ── */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-amber-50 via-white to-orange-50 px-5 sm:px-7 py-3.5 border-b border-amber-200/90 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block leading-none">
                        {data.isTrainSearch ? "Train Telemetry" : "IRCTC PNR Booking"}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-base sm:text-lg font-black font-mono text-slate-900">
                          {data.isTrainSearch ? `Train ${data.trainNumber}` : data.pnr}
                        </span>
                        <button
                          onClick={handleCopyIdentifier}
                          className="p-1 hover:bg-slate-100 rounded text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          {copiedPnr ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin text-amber-600" : ""}`} />
                      <span className="hidden sm:inline">Refresh</span>
                    </button>

                    <button
                      onClick={handleShare}
                      className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1"
                    >
                      <Share2 className="w-3 h-3 text-amber-600" />
                      <span className="hidden sm:inline">Share</span>
                    </button>

                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-bold">
                      {data.chartStatus}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-7">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-700 uppercase">
                        {data.trainNumber} • {data.journeyDate ? `Date: ${data.journeyDate}` : "Daily"}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-0.5">
                        {data.trainName}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black">
                        {data.delayMins > 0 ? `${data.delayMins}m Delay` : "Right on Time"}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1 font-mono">
                        <Gauge className="w-3.5 h-3.5 text-blue-600" />
                        {data.currentSpeed}
                      </span>
                    </div>
                  </div>

                  {/* Route Summary */}
                  <div className="grid grid-cols-3 gap-2 py-4 items-center text-center">
                    <div className="text-left">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Origin</span>
                      <span className="text-base sm:text-xl font-black text-slate-900 font-mono">{data.fromStation.code}</span>
                      <p className="text-xs text-slate-600 font-medium truncate">{data.fromStation.name}</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-mono font-black text-emerald-600">{progressPct}% Route Done</span>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block">Destination</span>
                      <span className="text-base sm:text-xl font-black text-slate-900 font-mono">{data.toStation.code}</span>
                      <p className="text-xs text-slate-600 font-medium truncate">{data.toStation.name}</p>
                    </div>
                  </div>

                  {/* Passenger Berth & Coach Visualizer Details (for PNR mode) */}
                  {!data.isTrainSearch && data.passengers && data.passengers.length > 0 && (
                    <div className="pt-4 border-t border-slate-100">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-500 block mb-2">
                        Confirmed Berth &amp; Passenger Details
                      </span>
                      <div className="grid grid-cols-4 gap-2 text-center mb-4">
                        <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
                          <span className="text-[10px] uppercase text-emerald-800 block font-bold">Coach</span>
                          <span className="text-lg font-black text-emerald-900 font-mono">{data.passengers[0]?.coach || "B4"}</span>
                        </div>
                        <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
                          <span className="text-[10px] uppercase text-emerald-800 block font-bold">Berth / Seat</span>
                          <span className="text-lg font-black text-emerald-900 font-mono">{data.passengers[0]?.berth || "42"}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                          <span className="text-[10px] uppercase text-slate-400 block font-bold">Status</span>
                          <span className="text-base font-black text-emerald-600 font-mono">{data.passengers[0]?.currentStatus || "CNF"}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                          <span className="text-[10px] uppercase text-slate-400 block font-bold">Quota</span>
                          <span className="text-base font-black text-slate-900 font-mono">{data.passengers[0]?.quota || "GN"}</span>
                        </div>
                      </div>

                      {/* Coach Composition Strip */}
                      {data.coachPosition && data.coachPosition.length > 0 && (
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-500 mb-1.5">
                            <span>Train Rake Composition</span>
                            <span className="text-emerald-700">★ Your Coach: {data.passengers[0]?.coach || "B4"}</span>
                          </div>
                          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-2 px-1">
                            {data.coachPosition.map((coach: any, idx: number) => {
                              const isUserCoach = coach.number.includes(data.passengers[0]?.coach || "B4");
                              return (
                                <div
                                  key={idx}
                                  className={`shrink-0 px-2.5 py-1.5 rounded-lg border text-[11px] font-mono font-bold flex flex-col items-center min-w-[50px] transition-all ${
                                    isUserCoach
                                      ? "bg-amber-500 text-slate-950 border-amber-600 shadow-md ring-2 ring-amber-300 scale-105"
                                      : "bg-slate-100 text-slate-600 border-slate-200"
                                  }`}
                                >
                                  <span>{coach.type}</span>
                                  <span className="text-[9px] font-normal opacity-80">{coach.number}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* ── 2. REAL-TIME TRAIN POSITION & STATION TIMELINE (HIGH-TECH LIVE RADAR) ── */}
              <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-sm text-slate-900 overflow-hidden relative">
                {/* HUD Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100 relative z-10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
                      <span className="text-[11px] font-mono font-black uppercase tracking-widest text-emerald-700">
                        Live Satellite GPS Telemetry
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-amber-500" /> Train Abhi Kahan Hai (Live Radar)
                    </h3>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-cyan-600" />
                      <span>Speed: <strong className="text-slate-900">{data.currentSpeed}</strong></span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      Updated {data.lastUpdated}
                    </span>
                  </div>
                </div>

                {/* ── HIGH-VISIBILITY NEXT STATION & ARRIVAL PLATFORM CARD ── */}
                <div className="bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-100/80 border-2 border-emerald-300 rounded-2xl p-4 sm:p-5 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Train className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-200/90 px-2 py-0.5 rounded-md">
                          Next Railway Halt
                        </span>
                        <span className="text-xs font-bold text-slate-600 font-mono">
                          ETA: <strong className="text-slate-900">{data.nextStation?.eta || "15 mins"}</strong>
                        </span>
                        {data.nextStation?.halt && (
                          <span className="text-xs font-semibold text-slate-500">
                            • Halt: {data.nextStation.halt}
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                        {data.nextStation?.name || "Upcoming Station"}{" "}
                        <span className="text-sm font-bold font-mono text-slate-500">
                          ({data.nextStation?.code})
                        </span>
                      </h4>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        📍 {data.currentStatus || "Approaching next scheduled station"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-emerald-200/70 pt-3 sm:pt-0 shrink-0">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-900 sm:text-right block mb-1">
                      Expected Platform
                    </span>
                    <span className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-sm sm:text-base font-black font-mono shadow-md flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      Platform {data.nextStation?.platform || "1"}
                    </span>
                  </div>
                </div>

                {/* CONTINUOUS VERTICAL TIMELINE */}
                <div className="relative z-10 space-y-0">
                  {(() => {
                    const stations = data.stations || [];
                    const firstUpcomingIdx = stations.findIndex((s: any) => !s.passed);

                    return stations.map((st: any, idx: number) => {
                      const isPassed = !!st.passed;
                      const isNextHalt = idx === firstUpcomingIdx;
                      const isOrigin = idx === 0;
                      const isTerminus = idx === stations.length - 1;
                      const showTrainBeforeThis = idx === firstUpcomingIdx && firstUpcomingIdx > 0;

                      return (
                        <React.Fragment key={st.code || idx}>
                          {/* Real-time Blue Train Position Icon sitting on track between passed & upcoming */}
                          {showTrainBeforeThis && (
                            <div className="flex items-center gap-2.5 sm:gap-4 my-2">
                              {/* Left track column with blue train badge */}
                              <div className="w-7 sm:w-10 flex flex-col items-center justify-center shrink-0 relative">
                                <div className="w-[3px] h-3.5 bg-[#00c853] absolute top-0" />
                                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-white border-2 border-blue-500 text-blue-600 shadow-md flex items-center justify-center z-10 animate-pulse">
                                  <Train className="w-4 h-4 text-blue-600" />
                                </div>
                                <div className="w-[3px] h-3.5 bg-slate-300 absolute bottom-0" />
                              </div>

                              {/* Live Status Banner */}
                              <div className="flex-1 py-2 px-3 sm:px-4 rounded-xl bg-blue-50/90 border border-blue-200 text-blue-950 flex flex-col sm:flex-row sm:items-center justify-between gap-1 shadow-2xs">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping shrink-0" />
                                  <span className="text-xs sm:text-sm font-bold">
                                    {data.currentStatus || "Live Train In-Transit"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-blue-800">
                                  <span className="bg-white border border-blue-200 px-2 py-0.5 rounded-md shadow-2xs">
                                    Speed: {data.currentSpeed || "78 km/h"}
                                  </span>
                                  <span>•</span>
                                  <span>Next Halt: {st.name}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Station Row: Vertical Track Line on Left + Clean Card on Right */}
                          <div className="flex items-stretch gap-2.5 sm:gap-4 relative group">
                            {/* Left Vertical Track Line & Dot */}
                            <div className="w-7 sm:w-10 flex flex-col items-center shrink-0 relative">
                              {/* Top Line Segment */}
                              {idx > 0 && (
                                <div
                                  className={`w-[3px] flex-1 ${
                                    isPassed ? "bg-[#00c853]" : "bg-slate-300"
                                  }`}
                                />
                              )}
                              {idx === 0 && <div className="flex-1" />}

                              {/* Station Waypoint Dot */}
                              <div
                                className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full z-10 shrink-0 ${
                                  isPassed
                                    ? "bg-[#00c853] ring-4 ring-emerald-100"
                                    : "bg-slate-400 ring-4 ring-slate-100"
                                }`}
                              />

                              {/* Bottom Line Segment */}
                              {idx < stations.length - 1 && (
                                <div
                                  className={`w-[3px] flex-1 ${
                                    isPassed && stations[idx + 1]?.passed
                                      ? "bg-[#00c853]"
                                      : "bg-slate-300"
                                  }`}
                                />
                              )}
                              {idx === stations.length - 1 && <div className="flex-1" />}
                            </div>

                            {/* Station Card: Matching Screenshot */}
                            <div
                              className={`flex-1 rounded-xl sm:rounded-2xl p-3.5 sm:p-5 transition-all my-1.5 ${
                                isPassed
                                  ? "bg-[#f4fbf7] border border-emerald-100/90"
                                  : isNextHalt
                                  ? "bg-white border-2 border-emerald-400 shadow-md ring-2 ring-emerald-100/60"
                                  : "bg-white border border-slate-200/80 shadow-xs"
                              }`}
                            >
                              {/* Top Header: Station Name & Right Badges */}
                              <div className="flex items-start justify-between gap-2 mb-2 sm:mb-3">
                                <div>
                                  <h4 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-1.5 flex-wrap">
                                    <span>{st.name}</span>
                                    <span className="text-xs sm:text-sm font-semibold text-slate-500 font-mono">
                                      ({st.code})
                                    </span>
                                    {isOrigin && (
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                                        Origin
                                      </span>
                                    )}
                                    {isTerminus && (
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                                        Terminus
                                      </span>
                                    )}
                                  </h4>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
                                  {st.platform && (
                                    <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 rounded-md bg-[#00c853] text-white text-[10px] sm:text-xs font-bold shadow-2xs">
                                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                      PF {st.platform}
                                    </span>
                                  )}
                                  {st.delayBadge && st.delayBadge.toLowerCase().includes("late") && (
                                    <span className="px-2 sm:px-2.5 py-0.5 rounded-md bg-[#ffebee] text-[#d32f2f] text-[10px] sm:text-xs font-bold border border-rose-200/60">
                                      {st.delayBadge}
                                    </span>
                                  )}
                                  {st.delayBadge && st.delayBadge.toLowerCase().includes("on time") && (
                                    <span className="px-2 sm:px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] sm:text-xs font-bold border border-emerald-200">
                                      On Time
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Bottom Timings: 2 Columns (ARRIVAL and DEPARTURE) */}
                              <div className="grid grid-cols-2 gap-3 sm:gap-4 items-center">
                                {/* Left: ARRIVAL */}
                                <div>
                                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                                    ARRIVAL
                                  </span>
                                  <span className="text-sm sm:text-base font-bold text-slate-900 block font-mono">
                                    {st.arrActual || st.arr || "--"}
                                  </span>
                                  <span className="text-xs font-medium text-slate-400 block font-mono">
                                    {st.arrScheduled || st.arr || "--"}
                                  </span>
                                </div>

                                {/* Right: DEPARTURE */}
                                <div className="text-right">
                                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                                    DEPARTURE
                                  </span>
                                  <span className="text-sm sm:text-base font-bold text-slate-900 block font-mono">
                                    {st.depActual || st.dep || "--"}
                                  </span>
                                  <span className="text-xs font-medium text-slate-400 block font-mono">
                                    {st.depScheduled || st.dep || "--"}
                                  </span>
                                </div>
                              </div>

                              {/* Next Halt Berth Delivery Banner */}
                              {isNextHalt && (
                                <div className="mt-3 pt-2.5 border-t border-emerald-100 flex items-center justify-between gap-2 flex-wrap">
                                  <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Next Halt ({st.halt || "2 min"}) • Berth Delivery Ready
                                  </span>
                                  <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full">
                                    Platform Runner Assigned
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    });
                  })()}
                </div>
              </div>

{/* ── 3. EXPANDING TO THIS TRAIN CARD ── */}
              <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-500/30 rounded-3xl p-5 sm:p-7 shadow-xs">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-xl">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-900 font-bold text-[11px] uppercase">
                      <Sparkles className="w-3 h-3 text-amber-600" /> Expanding to Train {data.trainNumber}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900">
                      RailQuick Seat Delivery Coming Soon to {data.trainName}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      Register your mobile number to get an instant launch alert and ₹100 credit on your first order.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsOpenAppModalOpen(true)}
                    className="h-11 px-5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5"
                  >
                    <Bell className="w-3.5 h-3.5 text-amber-400" /> Get Launch Alert
                  </button>
                </div>
              </div>

            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function PnrStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="flex flex-col items-center gap-3 text-slate-600 font-bold">
            <Train className="w-7 h-7 text-amber-600 animate-bounce" />
            <span className="text-sm">Connecting to live train radar...</span>
          </div>
        </div>
      }
    >
      <PnrStatusContent />
    </Suspense>
  );
}
