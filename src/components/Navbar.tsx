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
  { label: "About", href: "/about" },
  { label: "Test Phase", href: "/test-phase" },
  { label: "Contact", href: "/contact" },
  { label: "We're Hiring", href: "/hiring" },
];

const MOBILE_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Test", href: "/test-phase" },
  { label: "Contact", href: "/contact" },
  { label: "Hiring", href: "/hiring" },
];

export default function Navbar({ onOpenPnrModal }: NavbarProps) {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [internalModalOpen, setInternalModalOpen] = useState(false);
  const pathname = usePathname();

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
        isOpen={internalModalOpen}
        onClose={() => setInternalModalOpen(false)}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white md:bg-transparent shadow-[0_2px_24px_rgba(15,23,42,0.10)] md:shadow-none ${
          headerScrolled
            ? "md:bg-white/95 md:backdrop-blur-xl md:border-b md:border-slate-100 md:shadow-sm"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="inline-block shrink-0">
              <Logo className="h-9 sm:h-12 w-auto" />
            </Link>

            {/* Desktop Nav - Original Floating Pill Design */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100/50 backdrop-blur-md p-1 rounded-full border border-slate-200/50">
              {NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-4 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Ticket PNR Action Button */}
            <div className="hidden md:block shrink-0">
              <TicketPnrButton
                onClick={handleOpenPnr}
                size="md"
                variant="amber"
              />
            </div>

            {/* Mobile Ticket PNR Action Button */}
            <div className="md:hidden shrink-0">
              <TicketPnrButton
                onClick={handleOpenPnr}
                size="sm"
                variant="amber"
              />
            </div>
          </div>
        </div>

        {/* Mobile Nav Links - Floating White Glass Pill Bar */}
        <div className="flex px-4 pb-3 md:hidden w-full overflow-x-auto no-scrollbar">
          <div className="w-full bg-white border border-slate-200/80 rounded-full p-1 shadow-[0_4px_20px_rgba(15,23,42,0.10)]">
            <div className="flex items-center justify-between gap-0.5 w-full">
              {MOBILE_NAV_LINKS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex-1 text-center py-2 px-1 rounded-full text-[11px] font-extrabold tracking-tight transition-all duration-300 ${
                      isActive
                        ? "bg-white text-blue-600 shadow-sm border border-slate-100"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {item.label}
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
