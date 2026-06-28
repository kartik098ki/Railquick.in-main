"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Smartphone, Zap, MapPin, Train, ShieldCheck, Cpu, Package, Users, Rocket, Handshake, Flame, ArrowLeft, ArrowRight, Play } from "lucide-react";

export default function TestPhasePage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2 group">
              <img src="/images/logo-full.png" alt="RailQuick" className="h-10 sm:h-12 w-auto mix-blend-multiply" />
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
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${item.href === '/test-phase'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                    }`}
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
          </div>

          {/* Mobile Nav Links - Pill Style */}
          <div className="flex px-4 pb-4 md:hidden">
            <div className="w-full bg-slate-100/50 backdrop-blur-md border border-slate-200/50 rounded-full p-1 overflow-x-auto no-scrollbar">
              <div className="flex items-center gap-1 min-w-max">
                {[
                  { label: "Home", href: "/" },
                  { label: "About", href: "/about" },
                  { label: "Test Phase", href: "/test-phase" },
                  { label: "Contact", href: "/contact" },
                  { label: "Hiring", href: "/hiring" }
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${item.href === '/test-phase'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full border border-slate-200 shadow-sm mb-8 hover:shadow-md transition-shadow cursor-default"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-slate-700">RailQuick Testing Journey</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight px-4 leading-[1.1]"
          >
            From Station to
            <br />
            <span className="text-blue-600">Moving Trains</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            This is not a simulation. We proved that RailQuick is a working, scalable solution for onboard train logistics through extreme real-world testing.
          </motion.p>
        </div>
      </section>

      {/* Test Phase 1 */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-xl shadow-slate-200/30 border border-slate-100/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row gap-12 relative z-10">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold bg-blue-50/80 px-4 py-2 rounded-xl text-sm border border-blue-100/50">
                  <MapPin className="w-4 h-4" /> Delhi Railway Station
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                  Test Phase 1
                  <span className="block text-slate-400 text-xl sm:text-2xl font-bold mt-1.5">Ground Validation</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  In our first testing phase, we started at Delhi Railway Station, focusing on validating the core concept of RailQuick. We tested basic order placement through our app, vendor coordination at the station, and manual delivery mapping to passengers.
                </p>
                <div className="bg-blue-50/50 border border-blue-100/60 rounded-2xl p-6">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-blue-600" /> Real-World Challenges Discovered:
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                      <Zap className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" /> Vendor confusion in locating exact coach and seat numbers.
                    </li>
                    <li className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                      <Zap className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" /> High volatility in exact train stop times.
                    </li>
                    <li className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                      <Zap className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" /> Essential need for real-time order status transparency.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="lg:w-[420px] flex flex-col justify-center space-y-6">
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg relative border border-slate-100">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full" 
                    src="https://www.youtube.com/embed/nY7lpmJQ0QQ" 
                    title="Test Phase 1 Video" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
                <div className="bg-slate-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-50 group-hover:scale-105 transition-transform duration-700" />
                  <h3 className="text-xl font-bold mb-3 relative z-10">Phase 1 Result</h3>
                  <p className="text-slate-400 relative z-10 text-sm sm:text-base leading-relaxed mb-6">
                    We successfully proved that passengers value order reliability, but identified major logistics automation gaps.
                  </p>
                  <div className="space-y-3.5 relative z-10 text-sm sm:text-base">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-slate-400">Concept Acceptance</span>
                      <span className="text-green-400 font-bold flex items-center gap-1">Validated <CheckCircle2 className="w-4 h-4" /></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Delivery Handoff</span>
                      <span className="text-orange-400 font-bold flex items-center gap-1">Needs Automation <Cpu className="w-4 h-4" /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Phase 2 */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-xl shadow-slate-200/30 border border-slate-100/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row-reverse gap-12 relative z-10">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 text-indigo-600 font-bold bg-indigo-50/80 px-4 py-2 rounded-xl text-sm border border-indigo-100/50">
                  <Train className="w-4 h-4" /> Delhi → Jaipur Route
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
                  Test Phase 2
                  <span className="block text-slate-500 text-xl sm:text-2xl font-bold mt-1.5">Live Train Handover</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  In Phase 2, we took a big leap — testing our delivery models on live running environment trains between Delhi and Jaipur. We successfully coordinated and completed test handovers on the running Shalimar Malani Express (Train No. 14662 & 14661) on 5th and 6th March 2026.
                </p>
                <div className="bg-indigo-50/50 border border-indigo-100/60 rounded-2xl p-6">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Train className="w-5 h-5 text-indigo-600" /> Operational Metrics Validated:
                  </h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                      <Zap className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" /> Verified precise 5-minute passenger handover windows.
                    </li>
                    <li className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                      <Zap className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" /> Structured running partner-network along the station route.
                    </li>
                    <li className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                      <Zap className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" /> Seamless coordination on the train movement live status.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="lg:w-[420px] flex flex-col justify-center space-y-6">
                <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg relative border border-slate-100 bg-slate-900 flex flex-col items-center justify-center p-6 text-center group cursor-pointer">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-slate-950/70" />
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white relative z-10 group-hover:scale-110 transition-transform shadow-lg border border-white/30">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                  <div className="mt-4 relative z-10">
                    <h4 className="text-white font-bold text-base">Test Phase 2 Video</h4>
                    <span className="inline-block mt-1 bg-blue-500 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Coming Soon
                    </span>
                  </div>
                </div>

                <div className="bg-slate-950 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 opacity-50 group-hover:scale-105 transition-transform duration-700" />
                  <h3 className="text-xl font-bold mb-3 relative z-10">Phase 2 Result</h3>
                  <p className="text-slate-400 relative z-10 text-sm sm:text-base leading-relaxed mb-6">
                    Verified that the 5-minute delivery framework is highly scalable on active Indian railway routes.
                  </p>
                  <div className="space-y-3.5 relative z-10 text-sm sm:text-base">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-slate-400">Live Delivery</span>
                      <span className="text-green-400 font-bold flex items-center gap-1">100% Success <CheckCircle2 className="w-4 h-4" /></span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Co-ordination</span>
                      <span className="text-green-400 font-bold flex items-center gap-1">Flawless <CheckCircle2 className="w-4 h-4" /></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Highlights */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Key Highlights</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Phase 2 Achievements</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white border border-slate-100 rounded-[2rem] p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="mx-auto w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm"><Rocket className="w-7 h-7" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">10+ Successful Orders</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">We successfully delivered on-seat directly inside active coaches on a live running train.</p>
            </div>
            
            <div className="bg-white border border-slate-100 rounded-[2rem] p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="mx-auto w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm"><Handshake className="w-7 h-7" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Verified Partners</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">Built and integrated a partner network of verified local vendors along the station route.</p>
            </div>

            <div className="bg-white border border-slate-100 rounded-[2rem] p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="mx-auto w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm"><Zap className="w-7 h-7" /></div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Live Status Coordination</h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">Achieved seamless timing coordination between vendors, train dispatch, and seat handoff.</p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border-l-4 border-blue-600 rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" /> Why Phase 2 Was Vital
            </h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Unlike static mockups, this test checked real-world variables — including train speed, changing arrivals, platform heights, and active seat location inside packed trains. We proved that RailQuick is a functional, highly robust delivery engine.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tight">Be part of our journey</h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
            Join our waitlist and be the first to experience on-seat delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#waitlist">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-10 h-16 text-lg font-bold shadow-xl shadow-slate-900/20 transition-all hover:shadow-2xl hover:shadow-slate-900/30 hover:-translate-y-1 w-full sm:w-auto">
                Join Waitlist
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="h-16 px-10 text-lg font-bold rounded-full border-2 hover:bg-slate-50 w-full sm:w-auto">
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
