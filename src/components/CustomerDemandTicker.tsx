"use client";

import React, { useState } from "react";
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

export default function CustomerDemandTicker() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-20 lg:py-28 bg-[#0b0f19] text-white relative overflow-hidden border-t border-b border-slate-800">
      {/* High-Tech Background Ambient Radar Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-blue-600/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-amber-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Subtle Blueprint Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Pulsing Live Telemetry Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-black uppercase tracking-wider mb-5 shadow-[0_0_24px_rgba(16,185,129,0.18)]">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span>Live Passenger Radar &bull; 100+ Trains Monitored</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-tight text-white">
            Real Passengers Waiting for <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">RailQuick</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
            Real passenger requests received while en route on running trains across Indian Railways.
            From emergency medicines to fast phone chargers, water, and baby diapers &mdash; this is why on-seat delivery matters.
          </p>

          {/* 3 High-Impact Telemetry Stats Badges (100+ Routes Included) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {/* Stat 1: 500+ Inquiries */}
            <div className="bg-[#111827]/85 backdrop-blur-xl border border-slate-700/60 hover:border-slate-600 rounded-2xl p-4 sm:p-5 text-left flex items-center gap-3.5 shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
                <PhoneCall className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white flex items-center gap-1.5">
                  500+
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/25">
                    Live Pilot
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-medium leading-snug">
                  Urgent Calls &amp; Emails Logged
                </div>
              </div>
            </div>

            {/* Stat 2: 100+ Train Routes (Updated from 14+) */}
            <div className="bg-[#111827]/85 backdrop-blur-xl border border-slate-700/60 hover:border-slate-600 rounded-2xl p-4 sm:p-5 text-left flex items-center gap-3.5 shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                <Train className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white flex items-center gap-1.5">
                  100+
                  <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/25">
                    Verified
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-medium leading-snug">
                  Train Routes Across India
                </div>
              </div>
            </div>

            {/* Stat 3: 100% Coach Accuracy */}
            <div className="bg-[#111827]/85 backdrop-blur-xl border border-slate-700/60 hover:border-slate-600 rounded-2xl p-4 sm:p-5 text-left flex items-center gap-3.5 shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-white flex items-center gap-1.5">
                  100%
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/25">
                    MRP Only
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-medium leading-snug">
                  Direct Coach Gate Handoff
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HORIZONTAL INFINITE TICKER (RIGHT -> LEFT) */}
      {/* Pauses completely on hover or touch, smoothly gliding at gentle reading pace */}
      <div
        className="relative group marquee-container w-full overflow-hidden py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          className={`flex gap-4 sm:gap-6 animate-marquee py-3 group-hover:[animation-play-state:paused] ${
            isPaused ? "[animation-play-state:paused]" : ""
          }`}
          style={{ width: "max-content", animationDuration: "115s" }}
        >
          {/* Double list for smooth, seamless, infinite 0% to -50% loop */}
          {[...customerRequests, ...customerRequests].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="flex-shrink-0 w-[330px] sm:w-[410px] bg-[#111827]/95 backdrop-blur-2xl border border-slate-800 hover:border-amber-400/60 rounded-3xl p-5 sm:p-6 transition-all duration-300 hover:shadow-[0_16px_40px_rgba(245,158,11,0.12)] hover:-translate-y-1 flex flex-col justify-between group/card relative overflow-hidden"
            >
              {/* Subtle top edge gradient highlight */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500/40 to-transparent group-hover/card:via-amber-400 transition-all" />

              <div>
                {/* Header: Category Badge + Station/Time */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span
                    className={`text-[11px] font-extrabold px-3 py-1 rounded-full border ${item.categoryTheme.badge} uppercase tracking-wider`}
                  >
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {item.stationOrTime}
                  </span>
                </div>

                {/* Railway Train & Berth Badge (Authentic Railway Ticket Telemetry) */}
                <div className="flex items-center justify-between gap-2 bg-[#090d16] border border-slate-800/90 rounded-xl px-3 py-2.5 mb-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <Train className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <span className="text-xs font-bold text-slate-200 truncate font-mono">
                      {item.trainNo} &bull; {item.train}
                    </span>
                  </div>
                  {item.coachSeat && (
                    <span className="text-[11px] font-mono font-black text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md shrink-0">
                      {item.coachSeat}
                    </span>
                  )}
                </div>

                {/* Passenger Quote */}
                <blockquote className="text-slate-100 text-[15px] font-semibold leading-relaxed mb-5 relative pl-3.5 border-l-2 border-amber-500/70 group-hover/card:border-amber-400 transition-colors">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              {/* Card Footer: Passenger Avatar, Name, and Dispatch Status */}
              <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-white font-black text-xs flex items-center justify-center shadow-inner">
                    {item.initials}
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                      {item.name}
                      {item.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {item.role}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full inline-block">
                    Pilot Logged
                  </span>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                    {item.timeAgo}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ambient Left/Right Edge Shadows */}
        <div className="absolute inset-y-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-[#0b0f19] via-[#0b0f19]/90 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-[#0b0f19] via-[#0b0f19]/90 to-transparent pointer-events-none z-10" />
      </div>

      {/* Interactive Helper Text */}
      <div className="text-center mt-6">
        <p className="text-xs text-slate-400 flex items-center justify-center gap-2 font-medium">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Hover or tap any passenger card to pause &bull; Continuous real-time stream</span>
        </p>
      </div>
    </section>
  );
}
