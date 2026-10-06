"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Train } from "lucide-react";

interface TicketPnrButtonProps {
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "amber" | "lite" | "emerald" | "navy";
  showLiveDot?: boolean;
  label?: string;
}

export default function TicketPnrButton({
  onClick,
  className = "",
  size = "md",
  variant = "amber",
  showLiveDot = true,
  label = "Check PNR",
}: TicketPnrButtonProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    } else {
      router.push("/pnr-status");
    }
  };

  // Light, authentic railway ticket design
  const themeStyles = {
    amber: {
      bg: "bg-gradient-to-r from-amber-50/95 via-white to-orange-50/95 hover:from-amber-100/80 hover:via-amber-50/90 hover:to-orange-100/80 text-slate-900",
      border: "border-amber-300/80 hover:border-amber-400",
      shadow: "shadow-xs hover:shadow-md shadow-amber-500/10",
      stubBg: "bg-amber-100/60 text-amber-800",
      dashed: "border-amber-300/70",
      badgeBg: "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
      barcode: "text-amber-800/60",
      pulse: "bg-emerald-500",
    },
    lite: {
      bg: "bg-white hover:bg-slate-50 text-slate-800",
      border: "border-slate-200 hover:border-slate-300",
      shadow: "shadow-xs hover:shadow-md shadow-slate-200/40",
      stubBg: "bg-slate-100 text-slate-700",
      dashed: "border-slate-200",
      badgeBg: "bg-emerald-50 text-emerald-700 border border-emerald-200",
      barcode: "text-slate-400",
      pulse: "bg-emerald-500",
    },
    emerald: {
      bg: "bg-emerald-50/90 hover:bg-emerald-100/80 text-emerald-950",
      border: "border-emerald-300/80 hover:border-emerald-400",
      shadow: "shadow-xs hover:shadow-md shadow-emerald-500/10",
      stubBg: "bg-emerald-100/70 text-emerald-800",
      dashed: "border-emerald-300/60",
      badgeBg: "bg-emerald-100 text-emerald-800 border border-emerald-300/60",
      barcode: "text-emerald-800/50",
      pulse: "bg-emerald-600",
    },
    navy: {
      bg: "bg-slate-900 hover:bg-slate-800 text-white",
      border: "border-amber-400/60",
      shadow: "shadow-md shadow-slate-950/30",
      stubBg: "bg-white/10 text-amber-300",
      dashed: "border-amber-400/30",
      badgeBg: "bg-amber-400/20 text-amber-300",
      barcode: "text-amber-400/70",
      pulse: "bg-emerald-400",
    },
  }[variant] || {
    bg: "bg-gradient-to-r from-amber-50 via-white to-orange-50 text-slate-900",
    border: "border-amber-300",
    shadow: "shadow-xs",
    stubBg: "bg-amber-100/60 text-amber-800",
    dashed: "border-amber-300",
    badgeBg: "bg-emerald-50 text-emerald-700",
    barcode: "text-amber-800/60",
    pulse: "bg-emerald-500",
  };

  // Size variations
  const isSm = size === "sm";
  const isLg = size === "lg";

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`relative group inline-flex items-center select-none overflow-hidden transition-all duration-300 active:scale-95 hover:-translate-y-0.5 ${
        isSm
          ? "h-9 rounded-xl text-xs"
          : isLg
          ? "h-12 rounded-2xl text-base"
          : "h-10 sm:h-11 rounded-2xl text-sm"
      } ${themeStyles.bg} ${themeStyles.shadow} border ${themeStyles.border} ${className}`}
      title="Track Indian Railways Live PNR Status"
      aria-label="Check PNR Status"
    >
      {/* Authentic Train Ticket Notch Cutouts */}
      <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-50 border-r border-amber-300/40 rounded-full shadow-inner pointer-events-none z-20" />
      <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 bg-slate-50 border-l border-amber-300/40 rounded-full shadow-inner pointer-events-none z-20" />

      {/* Ticket Left Stub (Train Icon + Mini Barcode) */}
      <div
        className={`flex items-center justify-center shrink-0 border-r border-dashed ${themeStyles.dashed} ${themeStyles.stubBg} ${
          isSm ? "px-2.5 h-full" : "px-3.5 h-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center gap-0.5">
          <Train className={isSm ? "w-3.5 h-3.5" : isLg ? "w-5 h-5" : "w-4 h-4"} />
          {/* Stylized tiny ticket perforation barcode */}
          <span
            className={`font-mono text-[7px] tracking-tighter leading-none select-none font-black ${themeStyles.barcode}`}
          >
            ||||
          </span>
        </div>
      </div>

      {/* Ticket Body: Label */}
      <div className={`flex items-center gap-1.5 ${isSm ? "px-3" : "px-4"}`}>
        <span className="font-black tracking-tight whitespace-nowrap">
          {label}
        </span>
      </div>

      {/* Glossy ticket foil sheen on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
    </button>
  );
}
