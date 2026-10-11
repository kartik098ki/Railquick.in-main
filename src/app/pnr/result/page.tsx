"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PNRJourneyCard from "@/components/pnr/PNRJourneyCard";
import TrainLocation from "@/components/train/TrainLocation";
import TrainProgress from "@/components/train/TrainProgress";
import StationTimeline from "@/components/train/StationTimeline";
import DeliveryAvailability from "@/components/railquick/DeliveryAvailability";
import TrainAlertModal from "@/components/railquick/TrainAlertModal";
import { isRailQuickAvailable } from "@/lib/railquickAvailability";
import { NormalizedJourneyData } from "@/lib/railkitNormalizer";
import {
  ArrowLeft,
  RotateCw,
  Share2,
  AlertCircle,
  Train,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";

function PnrResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pnr = searchParams.get("pnr")?.trim() || "";

  const [data, setData] = useState<NormalizedJourneyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [secondsSinceUpdate, setSecondsSinceUpdate] = useState(0);

  // Fetch PNR and connected live train data
  const fetchData = async () => {
    if (!pnr || pnr.length !== 10) {
      setError("Please provide a valid 10-digit PNR.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/railkit/pnr?pnr=${pnr}`);
      const json = await res.json();

      if (!res.ok || !json.success) {
        setError(json.error || "We couldn't find a valid journey for this PNR. Check the number and try again.");
        setIsLoading(false);
        return;
      }

      setData(json.data);
      setSecondsSinceUpdate(0);
      setError(null);
    } catch {
      setError("We're having trouble checking your journey right now. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pnr]);

  // Section 29: Auto-refresh live train API every 60 seconds while tracking page is active
  useEffect(() => {
    if (!data) return;

    // Second tick counter for "Last updated X sec ago"
    const tickInterval = setInterval(() => {
      setSecondsSinceUpdate((prev) => prev + 1);
    }, 1000);

    // Refresh live train telemetry every 60s
    const refreshInterval = setInterval(async () => {
      if (data?.train?.number) {
        try {
          const res = await fetch(
            `/api/railkit/train?trainNumber=${data.train.number}&date=${data.journey.date}`
          );
          const liveJson = await res.json();
          if (liveJson.success && liveJson.data?.live) {
            setData((prev) =>
              prev ? { ...prev, live: liveJson.data.live } : liveJson.data
            );
            setSecondsSinceUpdate(0);
          }
        } catch {
          // Keep existing telemetry if background tick fails
        }
      }
    }, 60000);

    return () => {
      clearInterval(tickInterval);
      clearInterval(refreshInterval);
    };
  }, [data?.train?.number, data?.journey?.date]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const url = window.location.href;
      if (navigator.share) {
        navigator.share({
          title: `Train ${data?.train?.number} (${data?.train?.name}) Live Tracking`,
          url,
        }).catch(() => {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 space-y-6 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-40" />
        <div className="h-44 bg-white rounded-3xl border border-slate-200" />
        <div className="h-32 bg-white rounded-3xl border border-slate-200" />
        <div className="h-64 bg-white rounded-3xl border border-slate-200" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="max-w-lg mx-auto py-16 px-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-900 mb-2">Journey Lookup Issue</h2>
        <p className="text-sm text-slate-600 mb-6 font-medium">
          {error || "We couldn't retrieve journey details for this PNR."}
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/pnr"
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
          >
            Back to PNR
          </Link>
          <button
            onClick={() => {
              setIsLoading(true);
              fetchData();
            }}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const deliveryAvailable = isRailQuickAvailable(
    data.train.number,
    data.live?.currentStationCode || data.journey.destinationCode
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ─── TOP ACTION BAR ─── */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200/60">
        <Link
          href="/pnr"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to PNR
        </Link>

        {/* Section 29: Auto-refresh indicator */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3 text-emerald-600" />
            Last updated {secondsSinceUpdate}s ago
          </span>
          <button
            onClick={() => {
              setIsLoading(true);
              fetchData();
            }}
            title="Refresh Live Telemetry"
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200 transition-all active:scale-95 shadow-2xs"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleShare}
            title="Share Tracking Link"
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200 transition-all active:scale-95 shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ─── TOP SECTION: YOUR TRAIN & YOUR SEAT (SECTIONS 4, 6, 10) ─── */}
      <PNRJourneyCard data={data} />

      {/* ─── SECTION 15: DELIVERY AVAILABILITY CARD (CRITICAL FOR RAILQUICK) ─── */}
      <DeliveryAvailability
        isAvailable={deliveryAvailable}
        trainNumber={data.train.number}
        trainName={data.train.name}
        onOpenAlertModal={() => setIsAlertModalOpen(true)}
      />

      {/* ─── LIVE TELEMETRY OR LIVE UNAVAILABLE CARD ─── */}
      {data.live ? (
        <>
          {/* SECTION 7: LIVE TRAIN LOCATION */}
          <TrainLocation data={data} />

          {/* SECTION 8: JOURNEY PROGRESS */}
          {data.live.progress !== undefined && <TrainProgress data={data} />}

          {/* SECTION 9: LIVE STATION TIMELINE */}
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
            Live satellite telemetry will be updated once Indian Railways broadcasts real-time GPS coordinates for this journey.
          </p>
        </div>
      )}

      {/* ─── SECTION 16: GET ALERT MODAL ─── */}
      <TrainAlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        trainNumber={data.train.number}
        trainName={data.train.name}
        journeyDate={data.journey.date}
        pnr={data.pnr}
        source="pnr_tracking"
      />
    </div>
  );
}

export default function PnrResultPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      <main className="flex-1 pt-32 sm:pt-36 pb-20 px-4 sm:px-6">
        <Suspense
          fallback={
            <div className="max-w-4xl mx-auto py-12 text-center text-slate-400 font-bold">
              Loading journey status...
            </div>
          }
        >
          <PnrResultContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
