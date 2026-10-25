"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import TicketPnrButton from "@/components/TicketPnrButton";
import CheckPnrModal from "@/components/CheckPnrModal";

interface NavbarProps {
  onOpenPnrModal?: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Test Phase", href: "/test-phase" },
  { label: "Contact", href: "/contact" },
  { label: "Vendor", href: "/vendor" },
  { label: "We're Hiring", href: "/hiring" },
];

export default function Navbar({ onOpenPnrModal }: NavbarProps) {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenPnr = () => {
    if (onOpenPnrModal) {
      onOpenPnrModal();
    } else {
      setInternalModalOpen(true);
    }
  };

  return (
    <>
      <CheckPnrModal
        isOpen={!onOpenPnrModal && internalModalOpen}
        onClose={() => setInternalModalOpen(false)}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          headerScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm"
            : isHome
            ? "bg-transparent shadow-none"
            : "bg-white/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none shadow-[0_2px_20px_rgba(15,23,42,0.08)] md:shadow-none"
        }`}
      >
        {/* Top Bar: aligned at px-[8%] on desktop so RailQuick sits directly above the first marigold swag */}
        <div className="w-full px-4 md:px-[8%] relative z-30">
          <div className="flex items-center justify-between h-15 sm:h-18 md:h-[4.6vw] md:min-h-[60px] md:max-h-[78px]">
            {/* Logo */}
            <Link href="/" className="inline-block shrink-0 relative z-30">
              <Logo className="h-9 sm:h-11 md:h-11 lg:h-12 w-auto drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]" />
            </Link>

            {/* Desktop Nav - Crisp White Oval Capsule Pill Design */}
            <div className="hidden md:flex items-center gap-1 bg-white/95 backdrop-blur-xl p-1.5 rounded-full border border-white shadow-[0_8px_30px_rgba(15,23,42,0.14)]">
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;
                const isVendor = item.label === "Vendor";
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative px-4 lg:px-5 xl:px-6 py-2 rounded-full text-xs lg:text-sm font-bold transition-all duration-300 flex items-center justify-center ${
                      isActive
                        ? "bg-white text-slate-900 shadow-[0_2px_10px_rgba(15,23,42,0.10)] border border-slate-200/80"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/60"
                    }`}
                  >
                    <span className="relative inline-flex items-center">
                      <span>{item.label}</span>
                      {isVendor && (
                        <span className="absolute -top-2.5 -right-3.5 px-1.5 py-[1.5px] rounded-full bg-emerald-600 text-white text-[8px] lg:text-[8.5px] font-black uppercase tracking-wider shadow-xs leading-none pointer-events-none">
                          Join
                        </span>
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Desktop Ticket PNR Action Button */}
            <div className="hidden md:block shrink-0 relative z-30">
              <TicketPnrButton
                onClick={handleOpenPnr}
                size="md"
                variant="amber"
              />
            </div>

            {/* Mobile Ticket PNR Action Button */}
            <div className="md:hidden shrink-0 relative z-30">
              <TicketPnrButton
                onClick={handleOpenPnr}
                size="sm"
                variant="amber"
              />
            </div>
          </div>
        </div>

        {/* Mobile Nav Links - Unified 5 Links (Home, Test Phase, Contact, Vendor, We're Hiring) matching Laptop across all pages */}
        <div className="flex px-3.5 pb-2.5 md:hidden w-full relative z-30">
          <div className="w-full bg-white/95 backdrop-blur-xl border border-white/90 rounded-full p-1 shadow-[0_6px_22px_rgba(15,23,42,0.14)]">
            <div className="flex items-center justify-between gap-0.5 w-full">
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;
                const isVendor = item.label === "Vendor";
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`relative px-2.5 py-2 rounded-full text-[11px] sm:text-xs whitespace-nowrap tracking-tight transition-all duration-300 text-center flex items-center justify-center ${
                      isActive
                        ? "bg-white text-[#0c4a8a] font-extrabold shadow-[0_2px_8px_rgba(15,23,42,0.10)] border border-slate-200/80"
                        : "text-slate-500 hover:text-slate-900 font-bold"
                    }`}
                  >
                    <span className="relative inline-flex items-center">
                      <span>{item.label}</span>
                      {isVendor && (
                        <span className="absolute -top-2.5 -right-3.5 px-1.5 py-[1.5px] rounded-full bg-emerald-600 text-white text-[7px] font-black uppercase tracking-wider shadow-xs leading-none pointer-events-none">
                          Join
                        </span>
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
