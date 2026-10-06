"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import CheckPnrModal from "@/components/CheckPnrModal";
import TicketPnrButton from "@/components/TicketPnrButton";
import { CheckCircle2, Clock, Smartphone, Zap, MapPin, Train, ShieldCheck, Cpu, Package, Users, Rocket, Handshake, Flame, Mail, Loader2, ArrowRight } from "lucide-react";

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
      'Delivered 100+ orders successfully in a running train',
      'Talked to 300+ train travelers directly',
      'Tested real-time logistics and delivery handoffs',
    ],
  },
];

export default function TestPhasePage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [testCity, setTestCity] = useState('');
  const [testSubmitting, setTestSubmitting] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);
  const [testProgress, setTestProgress] = useState(0);

  const handleTestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testEmail || !testCity) {
      toast({ title: 'Validation Error', description: 'Please fill in all fields.', variant: 'destructive' });
      return;
    }

    setTestSubmitting(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: testEmail, city: testCity }),
      });

      if (response.ok) {
        setTestSuccess(true);
        setTestProgress(0);
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          setTestProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setShowTestModal(false);
              setTestSuccess(false);
              setTestEmail('');
              setTestCity('');
              setTestProgress(0);
              window.location.href = 'https://www.railquickapp.com';
            }, 300);
          }
        }, 80);
      } else {
        const errorData = await response.json();
        toast({ title: 'Error', description: errorData.message || 'Failed to submit details.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Connection Error', description: 'Failed to reach servers. Please try again.', variant: 'destructive' });
    } finally {
      setTestSubmitting(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [showCheckPnrModal, setShowCheckPnrModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <CheckPnrModal isOpen={showCheckPnrModal} onClose={() => setShowCheckPnrModal(false)} />

      {/* Unified Navigation */}
      <Navbar onOpenPnrModal={() => setShowCheckPnrModal(true)} />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-52 lg:pb-40 relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-white to-slate-50">
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none md:scale-125 md:opacity-70 transition-all duration-1000" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[250px] bg-sky-100/20 rounded-full blur-3xl pointer-events-none md:scale-150 transition-all duration-1000" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm mb-8 hover:shadow-md transition-shadow md:px-6 md:py-3 md:shadow-md"
          >
            <span className="flex h-2.5 w-2.5 md:h-3 md:w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-blue-600"></span>
            </span>
            <span className="text-sm md:text-base font-semibold text-slate-700">RailQuick Testing Journey</span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-slate-900 mb-6 md:mb-10 tracking-tight px-4 leading-[1.1]">
            From Station to <br className="hidden sm:block"/> <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Moving Trains</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-2xl md:max-w-3xl mx-auto leading-relaxed md:leading-normal"
          >
            This is not a simulation. We proved that RailQuick is a working, scalable solution for onboard train logistics through extreme real-world testing.
          </motion.p>
        </div>
      </section>

      {/* Test Phase 1 */}
      <section className="py-20 lg:py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 lg:p-16 md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] border border-slate-100 relative overflow-hidden transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl pointer-events-none md:scale-150 md:-translate-y-10" />
            
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative z-10">
              <div className="flex-1 space-y-6 md:space-y-8">
                <div className="inline-flex items-center gap-1.5 text-blue-600 font-bold bg-blue-50 border border-blue-100 px-3.5 py-1.5 md:px-5 md:py-2 md:text-sm rounded-full text-xs uppercase tracking-wider shadow-sm">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" /> Delhi Railway Station
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                  Test Phase 1 <br/> <span className="text-slate-500 text-2xl sm:text-3xl lg:text-4xl font-semibold">Ground Testing</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed md:leading-relaxed max-w-xl">
                  In our first testing phase, we started at Delhi Railway Station, focusing on validating the core concept of RailQuick. We tested basic order placement through our app, vendor coordination at the station, and manual delivery mapping to passengers.
                </p>
                <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 sm:p-8 md:p-10 md:shadow-inner">
                  <h4 className="font-bold text-slate-900 mb-5 md:text-xl flex items-center gap-2 md:mb-6">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-blue-600"/> 
                    Real-World Challenges Discovered:
                  </h4>
                  <div className="grid gap-3.5 md:gap-4">
                    {[
                      "Vendor confusion in locating exact seats.",
                      "Delays in delivery timing.",
                      "Lack of real-time coordination."
                    ].map((challenge, i) => (
                      <div key={i} className="flex items-center gap-3.5 md:gap-5 bg-white border border-slate-100 rounded-2xl md:rounded-[1.5rem] p-4 md:p-5 md:shadow-[0_2px_10px_rgb(0,0,0,0.02)] md:hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 shadow-sm">
                          <Zap className="w-4 h-4 md:w-5 md:h-5" />
                        </div>
                        <span className="text-sm md:text-base font-semibold text-slate-700">{challenge}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:w-[450px] flex flex-col justify-center space-y-6 md:space-y-8">
                <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl relative border border-slate-200 md:shadow-[0_20px_40px_rgba(0,0,0,0.1)] md:hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-shadow duration-500">
                  <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/nY7lpmJQ0QQ" title="Test Phase 1 Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
                <div className="bg-slate-950 text-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group border border-slate-800 md:hover:-translate-y-1 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-50 group-hover:scale-105 transition-transform duration-700" />
                  <h3 className="text-2xl font-bold mb-4 relative z-10 tracking-tight">Phase 1 Result</h3>
                  <p className="text-slate-300 relative z-10 text-sm sm:text-base leading-relaxed mb-6">
                    We successfully proved that passengers value order reliability, but identified major logistics automation gaps.
                  </p>
                  <div className="space-y-4 relative z-10 text-sm">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-slate-400 font-medium">Concept Acceptance</span>
                      <span className="bg-blue-500/15 border border-blue-500/30 text-blue-400 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-full blur-[100px] pointer-events-none md:scale-125 transition-all duration-1000" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl md:max-w-4xl mx-auto mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-2 text-blue-300 font-bold bg-blue-500/20 px-5 py-2 rounded-full text-sm md:text-base md:px-6 md:py-2.5 mb-6 md:mb-8 border border-blue-500/30">
              <Train className="w-5 h-5 md:w-6 md:h-6" /> Delhi → Jaipur Route
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-6 md:mb-8 tracking-tight md:leading-tight">
              Test Phase 2 <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Live Train Testing</span>
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl md:max-w-3xl mx-auto mb-10 md:mb-14">
              In Phase 2, we took a big leap — from station testing to live running trains between Delhi and Jaipur. We conducted testing on live environment trains and mastered the onboard delivery system while the train was moving.
            </p>

            <div className="relative max-w-xl md:max-w-4xl mx-auto">
              <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full md:scale-110 md:opacity-30 transition-opacity" />
              <div className="relative bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 md:p-14 hover:bg-slate-800 transition-colors md:shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 text-blue-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <svg className="w-8 h-8 md:w-10 md:h-10 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">Test Phase 2 Video</h3>
                <div className="inline-block bg-blue-500/20 text-blue-300 font-semibold px-4 py-1.5 md:px-5 md:py-2 md:text-base rounded-full text-sm mb-4 md:mb-6 border border-blue-500/30">Coming Soon</div>
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">Watch how we mastered <span className="text-white font-bold decoration-wavy underline decoration-blue-500">on-seat delivery</span> on a live running train!</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-20 md:mb-32">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 text-center hover:bg-white/15 md:hover:-translate-y-2 md:hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-500">
              <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-blue-500/20 text-blue-400 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center mb-6 md:mb-8"><Rocket className="w-8 h-8 md:w-10 md:h-10" /></div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">100+ Successful Orders</h3>
              <p className="text-slate-400 md:text-lg">We successfully delivered on-seat directly through our app in a running train.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 text-center hover:bg-white/15 md:hover:-translate-y-2 md:hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-500">
              <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-blue-500/20 text-blue-400 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center mb-6 md:mb-8"><Handshake className="w-8 h-8 md:w-10 md:h-10" /></div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Verified Network</h3>
              <p className="text-slate-400 md:text-lg">Built a network of 10+ verified local vendors along the route.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 text-center hover:bg-white/15 md:hover:-translate-y-2 md:hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-500">
              <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-blue-500/20 text-blue-400 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center mb-6 md:mb-8"><Zap className="w-8 h-8 md:w-10 md:h-10" /></div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Real-time Coordination</h3>
              <p className="text-slate-400 md:text-lg">Tested flawless coordination between passengers, vendors, and train movement.</p>
            </div>
          </div>

          {/* What makes it powerful */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[2rem] p-8 sm:p-12 md:p-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 shadow-2xl md:shadow-[0_30px_60px_rgba(16,185,129,0.2)] relative overflow-hidden transition-shadow">
            <div className="absolute -right-20 -top-20 w-64 h-64 md:w-96 md:h-96 bg-white/20 blur-3xl rounded-full" />
            <div className="max-w-2xl md:max-w-3xl relative z-10">
              <h3 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 md:mb-6 flex items-center gap-3 md:gap-5 tracking-tight">
                <Flame className="w-8 h-8 md:w-12 md:h-12 text-orange-400" /> What Makes Phase 2 Powerful
              </h3>
              <p className="text-lg sm:text-xl md:text-2xl text-blue-100 mb-6 md:mb-8 leading-relaxed">
                Unlike Phase 1, this was not a simulation. This was real users, real trains, real deliveries — <span className="text-white font-bold underline decoration-wavy decoration-blue-400 underline-offset-4">in motion</span>.
              </p>
              <p className="text-xl md:text-3xl font-bold">We proved that RailQuick is not just an idea, but a working, scalable solution.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Test Phase 3: Clean, High-Impact Coming Soon */}
      <section className="py-20 lg:py-32 bg-slate-950 text-white relative overflow-hidden border-t border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/25 text-blue-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>Phase 3 • Coming Soon</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-5 leading-tight">
            Direct Berth Delivery <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              On Running Trains
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mb-12 font-normal">
            The next chapter of RailQuick. Fresh meals, pharmacy essentials, and city sweets delivered right to your seat during scheduled train halts.
          </p>

          {/* 3 Core Highlights (Clean & Concise) */}
          <div className="grid md:grid-cols-3 gap-6 text-left mb-12">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center mb-4 font-black">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">2-Min Coach Handoff</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Platform runners meet you right at your coach gate. You never have to step off or risk your luggage.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-4 font-black">
                🛡️
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">100% Genuine MRP</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Zero arbitrary markups. Genuine printed retail pricing on all packaged items, medicines, and snacks.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-4 font-black">
                🔒
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5">OTP Sealed Handoff</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Tamper-evident sealed packaging unlocked exclusively with your 4-digit verification code.
              </p>
            </div>
          </div>

          {/* Clean Action Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
                Be First to Experience Phase 3
              </h4>
              <p className="text-xs sm:text-sm text-slate-400">
                Join our private beta group for priority onboarding and launch notifications.
              </p>
            </div>
            <Button
              onClick={() => setShowTestModal(true)}
              className="bg-white hover:bg-slate-200 text-slate-950 rounded-full px-8 h-12 text-sm font-bold shadow-lg transition-transform active:scale-95 shrink-0"
            >
              Get Priority Access →
            </Button>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="py-20 lg:py-40 bg-white border-t border-slate-100">
        <div className="max-w-4xl md:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-slate-900 mb-8 md:mb-10 tracking-tight">Be part of our journey</h2>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 md:mb-16 max-w-2xl md:max-w-3xl mx-auto">
            Join our waitlist and be the first to experience on-seat delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <Button 
              onClick={() => setShowTestModal(true)}
              className="bg-slate-900 hover:bg-blue-600 text-white rounded-full px-10 md:px-12 h-16 md:h-20 text-lg md:text-xl font-bold shadow-xl shadow-slate-900/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-1 w-full sm:w-auto"
            >
              Join Waitlist
            </Button>
            <Link href="/contact">
              <Button variant="outline" className="h-16 md:h-20 px-10 md:px-12 text-lg md:text-xl font-bold rounded-full border-2 md:border-4 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all duration-300 w-full sm:w-auto">
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      {/* Test App Modal */}
      <AnimatePresence>
        {showTestModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/30 backdrop-blur-md"
              onClick={() => {
                if (!testSubmitting && !testSuccess) setShowTestModal(false);
              }}
            />
            
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-white rounded-[32px] p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden text-slate-900"
            >
              {!testSuccess ? (
                <>
                  <button
                    onClick={() => setShowTestModal(false)}
                    disabled={testSubmitting}
                    className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="text-center mb-6 mt-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50/80 border border-blue-100 rounded-full text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
                      <span>⚡</span>
                      <span>Live App Beta</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      Access RailQuick App
                    </h3>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed mt-1.5">
                      Enter your details to launch the live platform.
                    </p>
                  </div>

                  <form onSubmit={handleTestSubmit} className="space-y-4 relative z-10">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block pl-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={testEmail}
                          onChange={(e) => setTestEmail(e.target.value)}
                          disabled={testSubmitting}
                          className="w-full h-13 pl-12 pr-4 bg-slate-50/50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 placeholder-slate-400 outline-none text-base font-semibold shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block pl-1">Current City / Station</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. New Delhi"
                          value={testCity}
                          onChange={(e) => setTestCity(e.target.value)}
                          disabled={testSubmitting}
                          className="w-full h-13 pl-12 pr-4 bg-slate-50/50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 placeholder-slate-400 outline-none text-base font-semibold shadow-sm"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={testSubmitting}
                      className="w-full h-13 mt-6 bg-slate-950 hover:bg-slate-900 text-white rounded-2xl font-bold text-base transition-all duration-300 shadow-lg shadow-slate-950/15 hover:shadow-xl hover:shadow-slate-950/20 active:scale-[0.98]"
                    >
                      {testSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin text-white" /> Connecting Securely...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2 group">
                          Access Live App <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full border border-blue-100 text-blue-600 flex items-center justify-center mb-6 relative">
                    <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping opacity-35" />
                    <Loader2 className="w-8 h-8 animate-spin" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Connecting to App</h3>
                  
                  {/* Progress simulator */}
                  <div className="flex flex-col items-center mt-5">
                    <div className="flex justify-between text-xs text-slate-400 font-bold w-56 mb-1.5">
                      <span>
                        {testProgress < 30
                          ? "Saving profile..."
                          : testProgress >= 30 && testProgress < 75
                          ? "Securing connection..."
                          : "Opening App..."}
                      </span>
                      <span className="text-blue-600 font-black">{testProgress}%</span>
                    </div>
                    <div className="w-56 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                      <motion.div
                        animate={{ width: `${testProgress}%` }}
                        transition={{ duration: 0.1 }}
                        className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 h-full rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
