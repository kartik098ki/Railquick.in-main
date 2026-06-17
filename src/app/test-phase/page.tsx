"use client";

import Link from "next/link";
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

        {/* Mobile Nav Links - Pill Style (Reverted to Scrollable) */}
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${item.href === "/test-phase"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
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
                <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-50 group-hover:scale-105 transition-transform duration-700" />
                  <h3 className="text-2xl font-bold mb-4 relative z-10">Phase 1 Result</h3>
                  <p className="text-slate-300 relative z-10 text-lg leading-relaxed mb-6">
                    We successfully proved that the idea works, but also identified key gaps in logistics and automation that needed fixing.
                  </p>
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="text-slate-400">Concept</span>
                      <span className="text-green-400 font-bold flex items-center gap-1">Validated <CheckCircle2 className="w-4 h-4"/></span>
                    </div>
                    <div className="flex items-center justify-between pb-2">
                      <span className="text-slate-400">Logistics</span>
                      <span className="text-orange-400 font-bold flex items-center gap-1">Needs Automation <Cpu className="w-4 h-4 ml-1"/></span>
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

      {/* Footer */}
      <footer className="bg-slate-950 pt-12 sm:pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <Link href="/" className="inline-block mb-3 bg-white p-2 rounded-xl shadow-sm">
                <img src="/images/logo-full.png" alt="RailQuick" className="h-10 sm:h-12 w-auto" />
              </Link>
              <p className="text-sm sm:text-base text-slate-400 mb-5 max-w-sm">Your journey, our priority. Revolutionizing train travel with on-seat essential delivery.</p>
              <div className="flex gap-2 sm:gap-3">
                <a href="https://www.linkedin.com/company/railquick/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 rounded-lg sm:rounded-xl flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-all">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a href="https://www.youtube.com/@Railquick" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 rounded-lg sm:rounded-xl flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-all">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href="https://x.com/railquick" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 rounded-lg sm:rounded-xl flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-all">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://www.instagram.com/railquick/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 rounded-lg sm:rounded-xl flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-all">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                </a>
                <a href="mailto:contact.railquick@gmail.com" className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 rounded-lg sm:rounded-xl flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-all">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Quick Links</h4>
              <div className="space-y-2 sm:space-y-3">
                <Link href="/" className="block text-slate-400 hover:text-white transition-colors text-sm sm:text-base">Home</Link>
                <Link href="/about" className="block text-slate-400 hover:text-white transition-colors text-sm sm:text-base">About Us</Link>
                <Link href="/test-phase" className="block text-slate-400 hover:text-white transition-colors text-sm sm:text-base">Test Phase</Link>
                <Link href="/contact" className="block text-slate-400 hover:text-white transition-colors text-sm sm:text-base">Contact</Link>
                <Link href="/hiring" className="block text-slate-400 hover:text-white transition-colors text-sm sm:text-base">Careers</Link>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3 text-sm sm:text-base">Contact</h4>
              <div className="space-y-2 sm:space-y-3 text-slate-400 text-sm sm:text-base">
                <p>contact.railquick@gmail.com</p>
                <p>Delhi, India</p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 text-center">
            <p className="text-slate-500 text-sm">© 2026 RailQuick. Revolutionizing train travel.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
