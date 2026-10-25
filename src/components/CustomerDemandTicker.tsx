"use client";

import React from "react";
import { useInteractiveMarquee } from "@/hooks/use-interactive-marquee";
import {
  PhoneCall,
  Mail,
  Train,
  Clock,
  ShieldCheck,
  AlertCircle,
  MapPin,
  Sparkles,
  CheckCircle2,
  Navigation,
  Activity,
  Flame,
} from "lucide-react";

interface CustomerRequest {
  id: string;
  name: string;
  initials: string;
  role: string;
  train: string;
  trainNo: string;
  coachSeat?: string;
  quote: string;
  category: string;
  categoryTheme: {
    badge: string;
    glow: string;
    border: string;
  };
  stationOrTime: string;
  timeAgo: string;
  verified: boolean;
}

const customerRequests: CustomerRequest[] = [
  {
    id: "cr-1",
    name: "Sumit Chaudhary",
    initials: "SC",
    role: "Family Traveler",
    train: "Lucknow Shatabdi",
    trainNo: "12004",
    coachSeat: "Coach C2 • Seat 44",
    quote: "I want to order kids’ cough syrup medicines.",
    category: "Medicines & Health",
    categoryTheme: {
      badge: "bg-rose-500/15 text-rose-300 border-rose-500/30",
      glow: "group-hover:border-rose-500/40",
      border: "border-rose-500/20",
    },
    stationOrTime: "En route Kanpur Jn",
    timeAgo: "8 mins ago",
    verified: true,
  },
  {
    id: "cr-2",
    name: "Bandana Jaiswar",
    initials: "BJ",
    role: "Solo Passenger",
    train: "Howrah Rajdhani Express",
    trainNo: "12301",
    coachSeat: "Coach B5 • Berth 23",
    quote: "Need medicine for stomach pain or loose motion.",
    category: "Emergency Health",
    categoryTheme: {
      badge: "bg-red-500/15 text-red-300 border-red-500/30",
      glow: "group-hover:border-red-500/40",
      border: "border-red-500/20",
    },
    stationOrTime: "Approaching Mughalsarai",
    timeAgo: "14 mins ago",
    verified: true,
  },
  {
    id: "cr-3",
    name: "Gurinder Jit Singh",
    initials: "GS",
    role: "Senior Passenger",
    train: "Amritsar–Ajmer Express",
    trainNo: "19612",
    coachSeat: "Coach S6 • Seat No. 71",
    quote: "I need Eno in the Amritsar–Ajmer train, S6, Seat No. 71.",
    category: "Digestion / OTC",
    categoryTheme: {
      badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      glow: "group-hover:border-amber-500/40",
      border: "border-amber-500/20",
    },
    stationOrTime: "Halt at Bhatinda Jn",
    timeAgo: "19 mins ago",
    verified: true,
  },
  {
    id: "cr-4",
    name: "Rohit Sharma",
    initials: "RS",
    role: "Business Traveler",
    train: "Mumbai Tejas Rajdhani",
    trainNo: "12952",
    coachSeat: "Coach A3 • Seat 18",
    quote: "Need basic medicines during my train journey.",
    category: "Health Essentials",
    categoryTheme: {
      badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      glow: "group-hover:border-emerald-500/40",
      border: "border-emerald-500/20",
    },
    stationOrTime: "Passing Kota Jn",
    timeAgo: "22 mins ago",
    verified: true,
  },
  {
    id: "cr-5",
    name: "Neha Verma",
    initials: "NV",
    role: "Traveling with Baby",
    train: "Dibrugarh Rajdhani",
    trainNo: "12424",
    coachSeat: "Coach B2 • Berth 12",
    quote: "Looking for baby-care essentials while travelling by train.",
    category: "Baby & Family",
    categoryTheme: {
      badge: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      glow: "group-hover:border-purple-500/40",
      border: "border-purple-500/20",
    },
    stationOrTime: "24-hr Long Stretch",
    timeAgo: "27 mins ago",
    verified: true,
  },
  {
    id: "cr-6",
    name: "Aman Singh",
    initials: "AS",
    role: "Student",
    train: "Vande Bharat Express",
    trainNo: "22436",
    coachSeat: "Coach C4 • Seat 52",
    quote: "Need hygiene essentials delivered to my seat.",
    category: "Hygiene & Care",
    categoryTheme: {
      badge: "bg-sky-500/15 text-sky-300 border-sky-500/30",
      glow: "group-hover:border-sky-500/40",
      border: "border-sky-500/20",
    },
    stationOrTime: "Exiting Varanasi Jn",
    timeAgo: "31 mins ago",
    verified: true,
  },
  {
    id: "cr-7",
    name: "Pooja Gupta",
    initials: "PG",
    role: "Solo Traveler",
    train: "Sealdah Duronto Express",
    trainNo: "12260",
    coachSeat: "Coach H1 • Coupe A",
    quote: "I need medicine delivered before my next station.",
    category: "Urgent Delivery",
    categoryTheme: {
      badge: "bg-orange-500/15 text-orange-300 border-orange-500/30",
      glow: "group-hover:border-orange-500/40",
      border: "border-orange-500/20",
    },
    stationOrTime: "High Speed Section",
    timeAgo: "35 mins ago",
    verified: true,
  },
  {
    id: "cr-8",
    name: "Rahul Kumar",
    initials: "RK",
    role: "Daily Commuter",
    train: "Purushottam Express",
    trainNo: "12802",
    coachSeat: "Coach S4 • Seat 36",
    quote: "Need essentials for my journey — waiting for RailQuick.",
    category: "Journey Essentials",
    categoryTheme: {
      badge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
      glow: "group-hover:border-blue-500/40",
      border: "border-blue-500/20",
    },
    stationOrTime: "Passing Prayagraj Jn",
    timeAgo: "41 mins ago",
    verified: true,
  },
  {
    id: "cr-9",
    name: "Simran Kaur",
    initials: "SK",
    role: "Vacation Traveler",
    train: "Chandigarh Shatabdi",
    trainNo: "12046",
    coachSeat: "Coach E1 • Seat 14",
    quote: "Looking for medicines and personal-care essentials on my train.",
    category: "Personal Care",
    categoryTheme: {
      badge: "bg-teal-500/15 text-teal-300 border-teal-500/30",
      glow: "group-hover:border-teal-500/40",
      border: "border-teal-500/20",
    },
    stationOrTime: "New Delhi to Ambala",
    timeAgo: "44 mins ago",
    verified: true,
  },
  {
    id: "cr-10",
    name: "Arjun Mehta",
    initials: "AM",
    role: "Long-Distance Passenger",
    train: "Trivandrum Rajdhani",
    trainNo: "12431",
    coachSeat: "Coach B8 • Seat 61",
    quote: "Need essentials delivered directly to my seat.",
    category: "Berth Delivery",
    categoryTheme: {
      badge: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30",
      glow: "group-hover:border-indigo-500/40",
      border: "border-indigo-500/20",
    },
    stationOrTime: "Konkan Coastal Route",
    timeAgo: "49 mins ago",
    verified: true,
  },
  {
    id: "cr-11",
    name: "Priyanshu Verma",
    initials: "PV",
    role: "Tech Professional",
    train: "Bhopal Shatabdi Express",
    trainNo: "12002",
    coachSeat: "Coach C5 • Seat 29",
    quote: "Phone battery at 4%, urgently need a 65W Type-C charger & cable at next junction.",
    category: "Chargers & Tech",
    categoryTheme: {
      badge: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
      glow: "group-hover:border-cyan-500/40",
      border: "border-cyan-500/20",
    },
    stationOrTime: "Arriving Agra Cantt",
    timeAgo: "52 mins ago",
    verified: true,
  },
  {
    id: "cr-12",
    name: "Deepak Bansal",
    initials: "DB",
    role: "Family Traveler",
    train: "August Kranti Rajdhani",
    trainNo: "12954",
    coachSeat: "Coach B3 • Berth 45",
    quote: "Need 2 bottles of sealed mineral water and wet wipes for family in coach B3.",
    category: "Water & Beverages",
    categoryTheme: {
      badge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
      glow: "group-hover:border-blue-500/40",
      border: "border-blue-500/20",
    },
    stationOrTime: "Vadodara Jn Halt",
    timeAgo: "56 mins ago",
    verified: true,
  },
  {
    id: "cr-13",
    name: "Kavita Saxena",
    initials: "KS",
    role: "Traveling with Toddler",
    train: "Kerala Express",
    trainNo: "12626",
    coachSeat: "Coach S3 • Berth 68",
    quote: "Ran out of baby diapers and feeding wipes on 24-hr journey — RailQuick is a lifesaver.",
    category: "Baby Care",
    categoryTheme: {
      badge: "bg-pink-500/15 text-pink-300 border-pink-500/30",
      glow: "group-hover:border-pink-500/40",
      border: "border-pink-500/20",
    },
    stationOrTime: "Bhopal Jn Junction",
    timeAgo: "1 hr ago",
    verified: true,
  },
  {
    id: "cr-14",
    name: "Vikram Rathore",
    initials: "VR",
    role: "Solo Traveler",
    train: "Pooja Superfast Express",
    trainNo: "12414",
    coachSeat: "Coach B1 • Seat 15",
    quote: "Need a sturdy luggage number lock and travel neck pillow for overnight journey.",
    category: "Travel Comfort",
    categoryTheme: {
      badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      glow: "group-hover:border-amber-500/40",
      border: "border-amber-500/20",
    },
    stationOrTime: "Jaipur Jn Boarding",
    timeAgo: "1 hr ago",
    verified: true,
  },
  {
    id: "cr-15",
    name: "Meenakshi Sundaram",
    initials: "MS",
    role: "Healthcare Worker",
    train: "Tamil Nadu Express",
    trainNo: "12622",
    coachSeat: "Coach S8 • Berth 31",
    quote: "Need sanitary hygiene pads and antiseptic hand sanitizer at Kanpur station.",
    category: "Hygiene Essentials",
    categoryTheme: {
      badge: "bg-rose-500/15 text-rose-300 border-rose-500/30",
      glow: "group-hover:border-rose-500/40",
      border: "border-rose-500/20",
    },
    stationOrTime: "Kanpur Central Halt",
    timeAgo: "1.5 hrs ago",
    verified: true,
  },
  {
    id: "cr-16",
    name: "Harsh Vardhan",
    initials: "HV",
    role: "Student",
    train: "Gorakhdham Express",
    trainNo: "12556",
    coachSeat: "Coach A2 • Seat 19",
    quote: "Craving packaged roasted makhanas and energy biscuits for late night journey.",
    category: "Travel Munchies",
    categoryTheme: {
      badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      glow: "group-hover:border-emerald-500/40",
      border: "border-emerald-500/20",
    },
    stationOrTime: "Moradabad Jn Halt",
    timeAgo: "2 hrs ago",
    verified: true,
  },
];

const getCategoryBadgeClass = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes("emergency") || cat.includes("urgent")) {
    return "bg-red-50 text-red-700 border-red-200";
  }
  if (cat.includes("medicine") || cat.includes("health")) {
    return "bg-rose-50 text-rose-700 border-rose-200";
  }
  if (cat.includes("digestion") || cat.includes("otc") || cat.includes("snack")) {
    return "bg-amber-50 text-amber-800 border-amber-200";
  }
  if (cat.includes("baby") || cat.includes("family")) {
    return "bg-purple-50 text-purple-700 border-purple-200";
  }
  if (cat.includes("hygiene") || cat.includes("care")) {
    return "bg-sky-50 text-sky-700 border-sky-200";
  }
  if (cat.includes("electronic") || cat.includes("charger") || cat.includes("device")) {
    return "bg-blue-50 text-blue-700 border-blue-200";
  }
  return "bg-emerald-50 text-emerald-700 border-emerald-200";
};

export default function CustomerDemandTicker() {
  const { containerRef, isDragging, handlers } = useInteractiveMarquee({
    speed: 36,
    copies: 3,
  });

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white via-slate-50/70 to-white text-slate-900 relative overflow-hidden border-t border-b border-slate-200/80">
      {/* Subtle Ambient Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Dot Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Pulsing Live Telemetry Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-black uppercase tracking-wider mb-4 shadow-2xs">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
            </span>
            <span>Live Passenger Radar &bull; 100+ Trains Monitored</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 leading-tight text-slate-900">
            Real Passengers Waiting for <span className="text-blue-600">RailQuick</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
            Real passenger requests received while en route on running trains across Indian Railways.
            From emergency medicines to fast phone chargers, water, and baby diapers &mdash; this is why on-seat delivery matters.
          </p>

          {/* 2 High-Impact Telemetry Stats Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
            {/* Stat 1: 500+ Inquiries */}
            <div className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-4 text-left flex items-center gap-3.5 shadow-sm transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-600 flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 flex items-center gap-1.5">
                  500+
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Live Pilot
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-medium leading-snug">
                  Urgent Calls &amp; Emails Logged
                </div>
              </div>
            </div>

            {/* Stat 2: 100+ Train Routes */}
            <div className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl p-4 text-left flex items-center gap-3.5 shadow-sm transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shrink-0">
                <Train className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900 flex items-center gap-1.5">
                  100+
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                    Verified
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-medium leading-snug">
                  Train Routes Across India
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL INFINITE TICKER (RIGHT -> LEFT) */}
      {/* Runs automatically, pauses on touch/hover and lets users scroll or drag freely left & right */}
      <div
        ref={containerRef}
        {...handlers}
        className={`relative w-full overflow-x-auto no-scrollbar py-3 select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        title="Swipe or drag left & right to explore"
      >
        <div className="flex gap-3.5 sm:gap-5 py-3 w-max">
          {/* Triple list for smooth, seamless, infinite 2-way loop */}
          {[...customerRequests, ...customerRequests, ...customerRequests].map((item, idx) => {
            const badgeClass = getCategoryBadgeClass(item.category);
            return (
              <div
                key={`${item.id}-${idx}`}
                className="flex-shrink-0 w-[270px] sm:w-[380px] bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl sm:rounded-3xl p-4 sm:p-5 transition-all duration-300 shadow-xs hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between group/card relative overflow-hidden"
              >
                {/* Subtle top edge gradient highlight */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent group-hover/card:via-blue-600 transition-all" />

                <div>
                  {/* Header: Category Badge + Station/Time */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] sm:text-[11px] font-black px-2.5 py-1 rounded-full border ${badgeClass} uppercase tracking-wider`}
                    >
                      {item.category}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      {item.stationOrTime}
                    </span>
                  </div>

                  {/* Railway Train & Berth Badge (Authentic Railway Ticket Telemetry) */}
                  <div className="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200/90 rounded-xl px-2.5 py-2 mb-3">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <div className="w-5 h-5 rounded-md bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                        <Train className="w-3 h-3 text-blue-600" />
                      </div>
                      <span className="text-[11px] sm:text-xs font-bold text-slate-800 truncate font-mono">
                        {item.trainNo} &bull; {item.train}
                      </span>
                    </div>
                    {item.coachSeat && (
                      <span className="text-[10px] sm:text-[11px] font-mono font-black text-amber-900 bg-amber-100 border border-amber-200 px-1.5 py-0.5 rounded shrink-0">
                        {item.coachSeat}
                      </span>
                    )}
                  </div>

                  {/* Passenger Quote */}
                  <blockquote className="text-slate-800 text-[13px] sm:text-[14px] font-semibold leading-relaxed mb-4 relative pl-3 border-l-2 border-amber-500 group-hover/card:border-blue-600 transition-colors">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Card Footer: Passenger Avatar, Name, and Dispatch Status */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-black text-[11px] sm:text-xs flex items-center justify-center shadow-xs">
                      {item.initials}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1">
                        {item.name}
                        {item.verified && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                        {item.role}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block">
                      Pilot Logged
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ambient Left/Right Edge Overlays: small on mobile, smooth fade */}
        <div className="absolute inset-y-0 left-0 w-8 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-8 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
}
