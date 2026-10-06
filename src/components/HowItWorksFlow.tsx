"use client";

import React from "react";
import { Train, ShieldCheck, Check, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function HowItWorksFlow() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
            <span>3 Simple Steps</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto font-medium">
            Order essentials, hot restaurant food &amp; emergency supplies delivered
            directly to your train berth in 3 simple steps.
          </p>
        </div>

        {/* ─── DESKTOP VIEW (md and up): Structured Railway Track Connector ─── */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          {/* Structured Railway Track Connecting Line running through all 3 cards */}
          <div className="absolute top-[88px] inset-x-8 h-6 -translate-y-1/2 pointer-events-none z-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 860 24"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Wooden Sleepers */}
              <line
                x1="40"
                y1="12"
                x2="820"
                y2="12"
                stroke="#cbd5e1"
                strokeWidth="12"
                strokeDasharray="4 16"
              />
              {/* Top Rail */}
              <line
                x1="30"
                y1="8"
                x2="830"
                y2="8"
                stroke="#94a3b8"
                strokeWidth="2.5"
                strokeDasharray="10 4"
              />
              {/* Bottom Rail */}
              <line
                x1="30"
                y1="16"
                x2="830"
                y2="16"
                stroke="#94a3b8"
                strokeWidth="2.5"
                strokeDasharray="10 4"
              />
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-8 relative z-10">
            {/* ─── Step 1: Enter Train & Berth (Desktop) ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative w-64 h-44 mb-8 flex items-center justify-center">
                <div className="w-56 h-36 bg-white rounded-2xl shadow-[0_12px_36px_rgba(15,23,42,0.06)] border border-slate-100 p-4 flex flex-col justify-center gap-2 group-hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)] transition-all duration-300">
                  <div className="w-16 h-3 bg-slate-200/80 rounded-full" />
                  <div className="w-32 h-3 bg-slate-100 rounded-full" />
                  <div className="flex items-center gap-1.5 pt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-slate-400 font-mono tracking-wider">
                      12004 • SHATABDI
                    </span>
                  </div>
                </div>

                <div className="absolute -bottom-2 -left-2 sm:-left-3 bg-[#181c2e] text-white rounded-2xl shadow-xl px-3.5 py-2.5 flex items-center gap-3 border border-slate-800 group-hover:scale-105 transition-transform duration-300">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-500/30">
                    <Train className="w-4 h-4" />
                  </div>
                  <div className="w-16 h-2 bg-slate-700 rounded-full" />
                </div>
              </div>

              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-black mb-3">
                1
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                Enter Train &amp; Berth
              </h3>
              <p className="text-sm text-slate-500 max-w-[260px] leading-relaxed font-medium">
                Add your 10-digit PNR or train number to sync your coach, seat, and upcoming station halts in real time.
              </p>
            </motion.div>

            {/* ─── Step 2: Choose What You Need (Desktop) ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative w-64 h-44 mb-8 flex items-center justify-center">
                <div className="w-52 h-36 bg-white rounded-2xl shadow-[0_12px_36px_rgba(15,23,42,0.06)] border border-slate-100 flex items-end justify-center gap-2.5 pb-4 px-4 group-hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)] transition-all duration-300">
                  <div className="w-3 h-14 bg-[#181c2e] rounded-full transition-all group-hover:h-16 duration-300" />
                  <div className="w-3 h-7 bg-[#181c2e] rounded-full transition-all group-hover:h-8 duration-300" />
                  <div className="w-3 h-22 bg-[#181c2e] rounded-full transition-all group-hover:h-24 duration-300" />
                  <div className="w-3 h-16 bg-[#181c2e] rounded-full transition-all group-hover:h-18 duration-300" />
                  <div className="w-3 h-10 bg-[#181c2e] rounded-full transition-all group-hover:h-12 duration-300" />
                </div>

                <div className="absolute -top-1 right-2 sm:right-3 w-10 h-10 rounded-full bg-[#f43f5e] shadow-lg shadow-rose-500/40 flex items-center justify-center text-white ring-4 ring-white group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-black mb-3">
                2
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                Choose What You Need
              </h3>
              <p className="text-sm text-slate-500 max-w-[260px] leading-relaxed font-medium">
                Pick from fresh restaurant meals, snacks, medicines, and travel essentials at 100% genuine printed MRP.
              </p>
            </motion.div>

            {/* ─── Step 3: Delivered at Your Seat (Desktop) ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative w-64 h-44 mb-8 flex items-center justify-center">
                <div className="w-44 h-40 bg-[#181c2e] rounded-2xl shadow-[0_18px_45px_rgba(24,28,46,0.25)] p-4 flex flex-col justify-between text-white group-hover:shadow-[0_24px_55px_rgba(24,28,46,0.35)] transition-all duration-300 border border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center text-white">
                      <ArrowDown className="w-3 h-3" />
                    </div>
                    <div className="text-left">
                      <span className="text-[9px] text-slate-400 block uppercase font-bold tracking-wider leading-none">
                        NEXT HALT
                      </span>
                      <span className="text-xs font-black text-white font-mono mt-1 block">
                        18 mins
                      </span>
                    </div>
                  </div>

                  <div className="text-left pt-2">
                    <div className="text-[10px] text-slate-400 font-mono tracking-widest leading-none mb-1">
                      •••• 8421
                    </div>
                    <div className="text-lg font-black text-white tracking-tight flex items-center gap-1.5">
                      <span>DELIVERY</span>
                      <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 -left-3 sm:-left-4 -translate-y-1/2 bg-white text-slate-900 px-3.5 py-1.5 rounded-xl shadow-xl border border-slate-100 text-xs font-black tracking-tight whitespace-nowrap flex items-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                  <span className="text-blue-600 font-bold">+</span>
                  <span>Berth B4-42</span>
                </div>
              </div>

              <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-black mb-3">
                3
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
                Delivered at Your Seat
              </h3>
              <p className="text-sm text-slate-500 max-w-[260px] leading-relaxed font-medium">
                Our platform runner meets your exact coach during the station halt. Verify with OTP and enjoy your order.
              </p>
            </motion.div>
          </div>
        </div>

        {/* ─── MOBILE VIEW: Staggered Structure (Step 1 Left, Step 2 Right, Step 3 Center) with Curved Railway Track ─── */}
        <div className="md:hidden relative max-w-sm mx-auto flex flex-col gap-14 py-4">
          {/* Continuous Curved Railway Track Line Connecting the 3 Steps */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 340 820"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Wooden Sleeper Dashes along the S-Curve Track */}
              <path
                d="M 100 120 C 100 230, 240 220, 240 370 C 240 520, 170 510, 170 660"
                stroke="#cbd5e1"
                strokeWidth="10"
                strokeDasharray="4 14"
                strokeLinecap="round"
              />
              {/* Rail Line Left */}
              <path
                d="M 97 120 C 97 230, 237 220, 237 370 C 237 520, 167 510, 167 660"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="8 4"
                strokeLinecap="round"
              />
              {/* Rail Line Right */}
              <path
                d="M 103 120 C 103 230, 243 220, 243 370 C 243 520, 173 510, 173 660"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="8 4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* ─── Step 1: Mobile (Left Aligned) ─── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-start text-left relative z-10 w-[85%]"
          >
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-black mb-3 shadow-xs">
              1
            </div>

            {/* Step 1 Card: White card with 12004 • SHATABDI + Dark floating pill */}
            <div className="relative w-60 h-40 mb-4 flex items-center justify-start">
              <div className="w-52 h-32 bg-white rounded-2xl shadow-[0_12px_36px_rgba(15,23,42,0.08)] border border-slate-200 p-3.5 flex flex-col justify-center gap-2">
                <div className="w-14 h-2.5 bg-slate-200/80 rounded-full" />
                <div className="w-28 h-2.5 bg-slate-100 rounded-full" />
                <div className="flex items-center gap-1.5 pt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-500 font-mono tracking-wider">
                    12004 • SHATABDI
                  </span>
                </div>
              </div>

              {/* Overlapping Floating Dark Pill on Bottom-Left */}
              <div className="absolute -bottom-1.5 -left-1 bg-[#181c2e] text-white rounded-xl shadow-lg px-2.5 py-1.5 flex items-center gap-2 border border-slate-800">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 flex items-center justify-center text-white shadow-xs">
                  <Train className="w-3.5 h-3.5" />
                </div>
                <div className="w-12 h-1.5 bg-slate-700 rounded-full" />
              </div>
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Enter Train &amp; Berth
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Add your 10-digit PNR or train number to sync your coach, seat, and upcoming station halts in real time.
            </p>
          </motion.div>

          {/* ─── Step 2: Mobile (Right Aligned) — EXACT MATCH TO REFERENCE IMAGE ─── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-end text-right self-end relative z-10 w-[85%]"
          >
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-black mb-3 shadow-xs">
              2
            </div>

            {/* Step 2 Card: EXACT match to picture — 5 dark equalizer bars + floating coral ShieldCheck badge */}
            <div className="relative w-60 h-40 mb-4 flex items-center justify-end">
              <div className="w-48 h-32 bg-white rounded-2xl shadow-[0_12px_36px_rgba(15,23,42,0.08)] border border-slate-200 flex items-end justify-center gap-2 pb-3.5 px-3">
                <div className="w-2.5 h-12 bg-[#181c2e] rounded-full" />
                <div className="w-2.5 h-6 bg-[#181c2e] rounded-full" />
                <div className="w-2.5 h-20 bg-[#181c2e] rounded-full" />
                <div className="w-2.5 h-14 bg-[#181c2e] rounded-full" />
                <div className="w-2.5 h-8 bg-[#181c2e] rounded-full" />
              </div>

              {/* Floating Coral Badge on Top-Right */}
              <div className="absolute top-1 right-2 w-9 h-9 rounded-full bg-[#f43f5e] shadow-lg shadow-rose-500/40 flex items-center justify-center text-white ring-4 ring-white">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Choose What You Need
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Pick from fresh meals, snacks, medicines, and travel essentials at 100% genuine printed MRP.
            </p>
          </motion.div>

          {/* ─── Step 3: Mobile (Center Aligned) ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center self-center relative z-10 w-[90%]"
          >
            <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-black mb-3 shadow-xs">
              3
            </div>

            {/* Step 3 Card: Dark card with Next Halt 18 mins + OTP code + DELIVERY ✓ + Berth pill */}
            <div className="relative w-60 h-40 mb-4 flex items-center justify-center">
              <div className="w-44 h-34 bg-[#181c2e] rounded-2xl shadow-xl p-3.5 flex flex-col justify-between text-white border border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-slate-700/80 flex items-center justify-center text-white">
                    <ArrowDown className="w-2.5 h-2.5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[8px] text-slate-400 block uppercase font-bold tracking-wider leading-none">
                      NEXT HALT
                    </span>
                    <span className="text-[11px] font-black text-white font-mono mt-0.5 block leading-none">
                      18 mins
                    </span>
                  </div>
                </div>

                <div className="text-left pt-1 border-t border-slate-800">
                  <div className="text-[9px] text-slate-400 font-mono tracking-widest leading-none mb-0.5">
                    •••• 8421
                  </div>
                  <div className="text-sm font-black text-white tracking-tight flex items-center gap-1">
                    <span>DELIVERY</span>
                    <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* Overlapping Floating White Pill on Left */}
              <div className="absolute top-1/2 left-2 -translate-y-1/2 bg-white text-slate-900 px-2.5 py-1 rounded-lg shadow-lg border border-slate-100 text-[10px] font-black tracking-tight whitespace-nowrap flex items-center gap-1">
                <span className="text-blue-600 font-bold">+</span>
                <span>Berth B4-42</span>
              </div>
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Delivered at Your Seat
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium max-w-[260px]">
              Our platform runner meets your exact coach during the station halt. Verify with OTP and enjoy your order.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
