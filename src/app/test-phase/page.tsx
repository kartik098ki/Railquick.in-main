"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Smartphone, Zap, MapPin, Train, ShieldCheck, Cpu, Package, Users, Rocket, Handshake, Flame } from "lucide-react";

const phases = [
  {
    number: '01',
    title: 'Phase 1: Testing',
    status: 'completed',
    description: 'We conducted extensive testing with real travelers to validate our concept and understand their needs.',
    achievements: [
      '80+ early testers validated our model',
      '200+ traveler interactions at stations',
      '5 train routes covered in Delhi NCR',
    ],
  },
  {
    number: '02',
    title: 'Phase 2: Live Train Delivery',
    status: 'completed',
    description: 'We conducted our Test Phase 2 on 5th and 6th March 2026 on the running Shalimar Malani Express (Train No. 14662 & 14661).',
    achievements: [
      'Delivered 10+ orders successfully in a running train',
      'Talked to 300+ train travelers directly',
      'Tested real-time logistics and delivery handoffs',
    ],
  },
];

export default function TestPhasePage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
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
                  className={`flex-1 text-center py-2.5 px-1 rounded-full text-[11px] font-extrabold tracking-tight transition-all duration-300 ${item.href === '/test-phase'
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

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-orange-100/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm mb-8 hover:shadow-md transition-shadow"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold text-slate-700">RailQuick Testing Journey</span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight px-4 leading-[1.1]">
            From Station to <br className="hidden sm:block"/> <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Moving Trains</span>
          </h1>

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
      <section className="py-20 lg:py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col lg:flex-row gap-12 relative z-10">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 text-blue-600 font-bold bg-blue-50 px-4 py-2 rounded-xl text-sm">
                  <MapPin className="w-4 h-4" /> Delhi Railway Station
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">
                  Test Phase 1 <br/> <span className="text-slate-500 text-2xl sm:text-3xl font-semibold">Ground Testing</span>
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  In our first testing phase, we started at Delhi Railway Station, focusing on validating the core concept of RailQuick. We tested basic order placement through our app, vendor coordination at the station, and manual delivery mapping to passengers.
                </p>
                <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-blue-600"/> Real-World Challenges Discovered:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-slate-700">
                      <Zap className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" /> Vendor confusion in locating exact seats.
                    </li>
                    <li className="flex items-start gap-3 text-slate-700">
                      <Zap className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" /> Delays in delivery timing.
                    </li>
                    <li className="flex items-start gap-3 text-slate-700">
                      <Zap className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" /> Lack of real-time coordination.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="lg:w-[400px] flex flex-col justify-center space-y-6">
                <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200">
                  <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/nY7lpmJQ0QQ" title="Test Phase 1 Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <div className="bg-slate-950 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group border border-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-50 group-hover:scale-105 transition-transform duration-700" />
                  <h3 className="text-2xl font-bold mb-4 relative z-10 tracking-tight">Phase 1 Result</h3>
                  <p className="text-slate-300 relative z-10 text-sm sm:text-base leading-relaxed mb-6">
                    We successfully proved that passengers value order reliability, but identified major logistics automation gaps.
                  </p>
                  <div className="space-y-4 relative z-10 text-sm">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-slate-400 font-medium">Concept Acceptance</span>
                      <span className="bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                        Validated <CheckCircle2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-slate-400 font-medium">Delivery Handoff</span>
                      <span className="bg-amber-500/15 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                        Needs Automation <Cpu className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Test Phase 2 */}
      <section className="py-20 lg:py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-2 text-indigo-300 font-bold bg-indigo-500/20 px-5 py-2 rounded-full text-sm mb-6 border border-indigo-500/30">
              <Train className="w-5 h-5" /> Delhi → Jaipur Route
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
              Test Phase 2 <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Live Train Testing</span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
              In Phase 2, we took a big leap — from station testing to live running trains between Delhi and Jaipur. We conducted testing on live environment trains and mastered the onboard delivery system while the train was moving.
            </p>

            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full" />
              <div className="relative bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 hover:bg-slate-800 transition-colors">
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                  <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Test Phase 2 Video</h3>
                <div className="inline-block bg-blue-500/20 text-blue-300 font-semibold px-4 py-1.5 rounded-full text-sm mb-4 border border-blue-500/30">Coming Soon</div>
                <p className="text-slate-400 text-lg">Watch how we mastered <span className="text-white font-bold decoration-wavy underline decoration-blue-500">5-minute delivery</span> on a live running train!</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 text-center hover:bg-white/15 transition-all">
              <div className="mx-auto w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6"><Rocket className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold mb-3">10+ Successful Orders</h3>
              <p className="text-slate-400">We successfully delivered on-seat directly through our app in a running train.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 text-center hover:bg-white/15 transition-all">
              <div className="mx-auto w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6"><Handshake className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold mb-3">Verified Network</h3>
              <p className="text-slate-400">Built a network of 10+ verified local vendors along the route.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 text-center hover:bg-white/15 transition-all">
              <div className="mx-auto w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6"><Zap className="w-8 h-8" /></div>
              <h3 className="text-xl font-bold mb-3">Real-time Coordination</h3>
              <p className="text-slate-400">Tested flawless coordination between passengers, vendors, and train movement.</p>
            </div>
          </div>

          {/* What makes it powerful */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] p-8 sm:p-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/20 blur-3xl rounded-full" />
            <div className="max-w-2xl relative z-10">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 flex items-center gap-3">
                <Flame className="w-8 h-8 md:w-10 md:h-10 text-orange-400" /> What Makes Phase 2 Powerful
              </h3>
              <p className="text-lg sm:text-xl text-blue-100 mb-6 leading-relaxed">
                Unlike Phase 1, this was not a simulation. This was real users, real trains, real deliveries — <span className="text-white font-bold underline decoration-wavy decoration-blue-400 underline-offset-4">in motion</span>.
              </p>
              <p className="text-xl font-bold">We proved that RailQuick is not just an idea, but a working, scalable solution.</p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-20 lg:py-32 bg-white border-t border-slate-100">
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
