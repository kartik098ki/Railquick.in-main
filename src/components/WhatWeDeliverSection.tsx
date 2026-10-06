"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Package,
  Smartphone,
  Pill,
  Building2,
  Cookie,
} from "lucide-react";

export default function WhatWeDeliverSection() {
  const products = [
    {
      title: "24/7 Dedicated Support",
      description: "Need help? Reach out to our dedicated support team anytime for any inquiries as we prepare for launch.",
      bg: "bg-blue-50/70 border-blue-200/80",
      icon: <Clock className="w-6 h-6 text-blue-600" />,
      iconBg: "bg-white text-blue-600 shadow-2xs",
      wide: true,
    },
    {
      title: "Travel Essentials",
      description: "Blankets, pillows, locks, and travel accessories.",
      bg: "bg-slate-50 border-slate-200/80",
      icon: <Package className="w-6 h-6 text-slate-700" />,
      iconBg: "bg-white text-slate-700 shadow-2xs",
    },
    {
      title: "Electronics",
      description: "Chargers, power banks, earphones and gadgets.",
      bg: "bg-slate-50 border-slate-200/80",
      icon: <Smartphone className="w-6 h-6 text-slate-700" />,
      iconBg: "bg-white text-slate-700 shadow-2xs",
    },
    {
      title: "Medicines",
      description: "Essential medicines and basic medical supplies.",
      bg: "bg-slate-50 border-slate-200/80",
      icon: <Pill className="w-6 h-6 text-slate-700" />,
      iconBg: "bg-white text-slate-700 shadow-2xs",
    },
    {
      title: "City Famous",
      description: "Agra petha, Mathura peda, local station specialties.",
      bg: "bg-slate-50 border-slate-200/80",
      icon: <Building2 className="w-6 h-6 text-slate-700" />,
      iconBg: "bg-white text-slate-700 shadow-2xs",
    },
    {
      title: "Snacks",
      description: "Chips, biscuits, juices, chocolates, and munchies.",
      bg: "bg-slate-50 border-slate-200/80",
      icon: <Cookie className="w-6 h-6 text-slate-700" />,
      iconBg: "bg-white text-slate-700 shadow-2xs",
    },
  ];

  return (
    <section id="what-we-deliver" className="py-16 sm:py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-extrabold text-blue-600 uppercase tracking-widest mb-3">
            What We Deliver
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Curated essentials for every journey
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-2 font-medium">
            Everything you need on your seat during your train travel.
          </p>
        </div>

        {/* Clean Box Type Grid Matching Starting Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {products.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`p-6 sm:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                item.bg
              } ${item.wide ? "sm:col-span-2 lg:col-span-3" : ""}`}
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${item.iconBg}`}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
