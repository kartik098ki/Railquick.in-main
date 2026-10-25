"use client";

import React from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    number: "1",
    title: "Enter Train & Berth",
    description:
      "Add your 10-digit PNR or train number to sync your coach, seat, and upcoming station halts in real time.",
    imgWebp: "/images/hiw-ill-1.webp?v=hd",
    imgPng: "/images/hiw-ill-1.png?v=hd",
    mobileAlign: "left" as const,
  },
  {
    number: "2",
    title: "Choose What You Need",
    description:
      "Pick from fast chargers, emergency medicines, sealed snacks, and travel essentials at 100% genuine printed MRP.",
    imgWebp: "/images/hiw-ill-2.webp?v=hd2",
    imgPng: "/images/hiw-ill-2.png?v=hd2",
    mobileAlign: "right" as const,
  },
  {
    number: "3",
    title: "Delivered at Your Seat",
    description:
      "Our platform runner meets your exact coach during the station halt. Verify with OTP and enjoy your order.",
    imgWebp: "/images/hiw-ill-3.webp?v=hd",
    imgPng: "/images/hiw-ill-3.png?v=hd",
    mobileAlign: "center" as const,
  },
];

export default function HowItWorksFlow() {
  return (
    <section
      id="how-it-works"
      className="pt-6 pb-12 sm:pt-10 sm:pb-20 bg-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header — Positioned slightly higher on a pure white background */}
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#182238] border border-slate-700/80 shadow-xs mb-3 sm:mb-4">
            <svg
              className="w-3.5 h-3.5 text-[#f5c469]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L14.6 9.4L22 12L14.6 14.6L12 22L9.4 14.6L2 12L9.4 9.4L12 2Z" />
            </svg>
            <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.14em] text-[#f6d58e]">
              3 SIMPLE STEPS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-[50px] font-black text-[#111827] tracking-tight leading-[1.1] mb-2.5 sm:mb-3.5">
            How it works
          </h2>

          <p className="text-slate-600 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto font-medium px-2">
            Order travel essentials, fast chargers, emergency medicines &amp; sealed snacks
            delivered directly to your train berth in 3 simple steps
          </p>
        </div>

        {/* ─── DESKTOP / LAPTOP VIEW: 3-Column Layout + Separate SVG Dotted Track + 3 Ultra-HD Visuals ─── */}
        <div className="hidden md:block relative max-w-6xl mx-auto">
          {/* Separate HTML/SVG S-Curve Double-Dotted Connector Line */}
          <div
            className="absolute inset-x-0 top-[76px] lg:top-[88px] h-32 pointer-events-none z-0"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 1200 160"
              fill="none"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Upper dotted line */}
              <path
                d="M 190 82 C 330 22, 465 22, 600 82 C 735 142, 870 142, 1010 74"
                stroke="#cbd5e1"
                strokeWidth="2.5"
                strokeDasharray="9 8"
                strokeLinecap="round"
              />
              {/* Lower dotted line */}
              <path
                d="M 190 92 C 330 32, 465 32, 600 92 C 735 152, 870 152, 1010 84"
                stroke="#cbd5e1"
                strokeWidth="2.5"
                strokeDasharray="9 8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* 3-Column Step Grid */}
          <div className="relative z-10 grid grid-cols-3 gap-8 lg:gap-12 items-start">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="group flex flex-col items-center text-center"
              >
                {/* Individual High-Resolution HD Step Visual (1200x896 native) */}
                <div className="relative w-full max-w-[335px] lg:max-w-[375px] aspect-[1200/896] mb-4 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                  <picture className="w-full h-full flex items-center justify-center">
                    <source srcSet={step.imgWebp} type="image/webp" />
                    <img
                      src={step.imgPng}
                      alt={step.title}
                      width={1200}
                      height={896}
                      className="w-full h-full object-contain block select-none"
                      loading="eager"
                      decoding="async"
                    />
                  </picture>
                </div>

                {/* Separate HTML Numbered Step Indicator */}
                <div className="w-8 h-8 rounded-full bg-[#111827] text-white text-sm font-black flex items-center justify-center mb-3 shadow-xs">
                  {step.number}
                </div>

                {/* Step Title */}
                <h3 className="text-xl lg:text-[25px] font-black text-[#111827] tracking-tight leading-snug mb-2">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm lg:text-[15px] text-slate-600 leading-relaxed max-w-[295px] font-normal">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── MOBILE VIEW: Staggered Layout with Curved Dotted Track on Pure White ─── */}
        <div className="md:hidden relative max-w-md mx-auto">
          {/* Continuous Vertical Curved SVG Dotted Track Connecting Step 1 -> Step 2 -> Step 3 */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            viewBox="0 0 340 840"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M 102 110 C 102 250, 238 250, 238 410 C 238 570, 170 580, 170 710"
              stroke="#e2e8f0"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <path
              d="M 102 110 C 102 250, 238 250, 238 410 C 238 570, 170 580, 170 710"
              stroke="#94a3b8"
              strokeWidth="2"
              strokeDasharray="7 7"
              strokeLinecap="round"
            />
          </svg>

          <div className="relative z-10 flex flex-col gap-8">
            {STEPS.map((step, index) => {
              const isLeft = step.mobileAlign === "left";
              const isRight = step.mobileAlign === "right";

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`flex flex-col ${
                    isLeft
                      ? "items-start text-left self-start w-[88%]"
                      : isRight
                      ? "items-end text-right self-end w-[88%]"
                      : "items-center text-center self-center w-[92%]"
                  }`}
                >
                  {/* Step Visual Container (Seamless without card border/shadow) */}
                  <div className="w-full max-w-[260px] mb-2">
                    <picture>
                      <source srcSet={step.imgWebp} type="image/webp" />
                      <img
                        src={step.imgPng}
                        alt={step.title}
                        width={1200}
                        height={896}
                        className="w-full h-auto object-contain block select-none"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </div>

                  {/* Step Number + Title + Description */}
                  <div
                    className={`flex flex-col ${
                      isLeft
                        ? "items-start"
                        : isRight
                        ? "items-end"
                        : "items-center"
                    } px-1`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 rounded-full bg-[#111827] text-white text-xs font-black flex items-center justify-center shadow-2xs shrink-0">
                        {step.number}
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-[#111827] tracking-tight">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed max-w-[250px]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
