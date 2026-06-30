"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { AlertCircle, ArrowLeft, Info, HelpCircle, FileWarning, Award, Sparkles } from "lucide-react";

export default function DisclaimerPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/images/logo-full.png" alt="RailQuick" className="h-8 sm:h-12 w-auto mix-blend-multiply transition-all" />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100/50 backdrop-blur-md p-1 rounded-full border border-slate-200/50">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Test Phase', href: '/test-phase' },
                { label: 'Contact', href: '/contact' },
                { label: "We're Hiring", href: '/hiring' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 text-slate-500 hover:text-slate-900 hover:bg-white/50"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <Link href="/#waitlist">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 h-11 shadow-lg shadow-slate-900/20 transition-all hover:shadow-xl hover:-translate-y-0.5 font-bold">
                  Join Waitlist
                </Button>
              </Link>
            </div>

            {/* Mobile Action Button */}
            <div className="md:hidden">
              <Link href="/#waitlist">
                <Button className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200/50 rounded-full px-3.5 h-8 text-[11px] font-bold shadow-sm active:scale-95 transition-all">
                  Test Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Nav Links - Pill Style (Premium App Control) */}
        <div className="flex px-4 pb-4 md:hidden w-full">
          <div className="w-full bg-slate-100/80 backdrop-blur-md border border-slate-200/30 rounded-full p-1 shadow-sm">
            <div className="flex items-center justify-between gap-0.5 w-full">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Test", href: "/test-phase" },
                { label: "Contact", href: "/contact" },
                { label: "Hiring", href: "/hiring" }
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex-1 text-center py-2.5 px-1 rounded-full text-[11px] font-extrabold tracking-tight transition-all duration-300 ${item.href === '/disclaimer'
                    ? 'bg-white text-blue-600 shadow-[0_2px_10px_rgba(15,23,42,0.06)] border border-slate-100/50'
                    : 'text-slate-500 hover:text-slate-900'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Header / Hero */}
      <section className="pt-40 pb-16 relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-slate-50/50 to-white text-slate-900 border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 transition-colors text-sm font-semibold mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="inline-flex items-center justify-center p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100 mb-6">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-slate-900 mb-4">
            Pilot Program Disclaimer
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto">
            Important notice regarding our current phase of operations.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-6 sm:p-10 lg:p-12 space-y-10 text-slate-700 leading-relaxed">
            
            {/* Warning Alert Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 sm:p-6 flex items-start gap-4">
              <FileWarning className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-amber-900 mb-1 text-base">Important Notice</h3>
                <p className="text-amber-800 text-sm sm:text-base m-0 leading-relaxed">
                  RailQuick is currently operating as a pilot and validation program.
                </p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 text-base sm:text-lg">
                The purpose of this pilot is to evaluate customer demand, operational feasibility, vendor coordination, delivery workflows, and overall service experience before a wider public launch.
              </p>
            </div>

            <hr className="border-slate-100" />

            {/* Acknowledge Points */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                  <Info className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Participant Terms</h2>
              </div>
              <p className="text-slate-600">
                By participating in the RailQuick Pilot Program, you acknowledge and agree that:
              </p>

              <div className="space-y-3">
                {[
                  "RailQuick is currently under development.",
                  "Features, pricing, delivery processes, and product availability may change without notice.",
                  "Certain functionalities may be incomplete, unavailable, or subject to technical issues.",
                  "Participation does not create any guarantee of future service availability.",
                  "Delivery timelines during the pilot phase are estimates and may be affected by train schedules, station operations, vendor availability, weather conditions, or technical factors.",
                  "Feedback provided by participants may be used by RailQuick to improve products, services, and operational processes.",
                  "RailQuick reserves the right to suspend, modify, expand, restrict, or terminate the pilot program at any time."
                ].map((text, idx) => (
                  <div key={idx} className="flex gap-4 items-start bg-slate-50 hover:bg-slate-100/50 border border-slate-100 p-4 rounded-2xl transition-all group">
                    <div className="w-7 h-7 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 group-hover:bg-amber-200 transition-colors">
                      {idx + 1}
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base m-0 leading-relaxed font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Thank you Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 translate-y-12 translate-x-12 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/10 rounded-xl text-amber-400">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">Thank You</h3>
              </div>
              <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
                RailQuick appreciates the participation and support of early users who help us build a better travel experience for railway passengers across India.
              </p>
              <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-white font-extrabold text-lg m-0">RailQuick</h4>
                  <p className="text-xs text-amber-400 font-bold m-0 uppercase tracking-wider">Delivering Essentials to Your Train Seat.</p>
                </div>
                <Link href="/#waitlist">
                  <Button className="bg-white hover:bg-slate-100 text-slate-900 rounded-full font-bold px-6 py-2 shadow-lg">
                    Join Waiting List
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
