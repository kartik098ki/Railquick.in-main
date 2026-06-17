"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle2,
  Train,
  Banknote,
  Gift,
  ArrowRight,
  WifiOff,
  Mic,
  Radio
} from "lucide-react";

async function submitVendorApplication(data: Record<string, any>) {
  const response = await fetch('/api/vendors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  return response.ok;
}

const features = [
  {
    title: 'VendorAI Logistics Mapping',
    description: 'VendorAI maps all trains and seats in real-time. Predict Indian Railways passenger demand before the train even arrives.',
    icon: <BrainCircuit className="w-6 h-6 text-indigo-600" />,
    gradient: 'from-indigo-500 to-purple-400'
  },
  {
    title: 'Offline Mesh Sync',
    description: 'Train passing through zero-network rural zones? Customers order via Bluetooth or SMS, and VendorAI syncs it instantly offline.',
    icon: <Radio className="w-6 h-6 text-cyan-600" />,
    gradient: 'from-cyan-500 to-blue-400'
  },
  {
    title: 'Hyperfast Inventory Turnover',
    description: 'Sell products significantly faster compared to an offline stall, guaranteed minimum 3x daily turnover rate.',
    icon: <TrendingUp className="w-6 h-6 text-emerald-600" />,
    gradient: 'from-emerald-500 to-teal-400'
  },
  {
    title: 'Voice-Activated Stock',
    description: 'Hands full? Just say "Added 50 Biryanis" and VendorAI NLP perfectly updates your IRCTC pantry stock in real-time.',
    icon: <Mic className="w-6 h-6 text-amber-600" />,
    gradient: 'from-amber-500 to-orange-400'
  },
  {
    title: 'Automated Seat Payouts',
    description: 'Earn exact performance bonuses and dynamic payouts on all rapid on-seat deliveries you fulfill successfully.',
    icon: <Banknote className="w-6 h-6 text-purple-600" />,
    gradient: 'from-purple-500 to-fuchsia-400'
  },
  {
    title: 'Zero Commission for 1 Year',
    description: 'Join today and get the cutting-edge RailQuick VendorAI platform absolutely FREE for your first 12 months.',
    icon: <Gift className="w-6 h-6 text-rose-600" />,
    gradient: 'from-rose-500 to-pink-400'
  }
];

export default function VendorsPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    isIrctcTender: false
  });

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const success = await submitVendorApplication(formData);
      if (success) {
        toast({ title: 'Application Submitted!', description: 'Welcome to the future of rail logistics. Our team will contact you shortly.', variant: 'default' });
        setFormData({ name: '', email: '', phone: '', city: '', isIrctcTender: false });
      } else {
        toast({ title: 'Error', description: 'Failed to submit the form. Please try again.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Something went wrong. Please check your connection.', variant: 'destructive' });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${headerScrolled ? 'bg-slate-950/80 backdrop-blur-xl border-slate-800 shadow-sm' : 'bg-transparent border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Link href="/" className="flex items-center gap-2 group bg-white p-2 rounded-xl backdrop-blur-md">
              <img src="/images/logo-full.png" alt="RailQuick" className="h-7 sm:h-9 w-auto mix-blend-multiply" />
            </Link>

            <div className="hidden md:flex items-center gap-1 bg-slate-900/50 backdrop-blur-md p-1 rounded-full border border-slate-800">
              {[
                { label: 'Home', href: '/' },
                { label: 'Vendors', href: '/vendors' },
                { label: 'Test Phase', href: '/test-phase' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${item.href === '/vendors'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <Button asChild className="bg-white hover:bg-slate-200 text-slate-900 rounded-full px-6 h-11 font-bold">
                <a href="#onboard">Join as Partner</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-[0.02] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20 mb-6">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span className="text-xs sm:text-sm font-semibold text-indigo-300 tracking-wide uppercase">RailQuick Vendor Network</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
                Turbocharge Your <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  Railway Sales.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Whether you operate a bustling station stall or you are a local vendor moving inside the ongoing train, our VendorAI system connects your daily inventory with exactly what the passengers want. Deliver directly to their coach seat in minutes and scale your local business effortlessly.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Button 
                  asChild
                  className="w-full sm:w-auto px-8 h-14 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-lg font-bold transition-all shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:shadow-[0_0_60px_-15px_rgba(79,70,229,0.7)]"
                >
                  <a href="#onboard">Start Selling <ArrowRight className="ml-2 w-5 h-5" /></a>
                </Button>
                <div className="flex items-center gap-3 text-sm text-slate-400 mt-4 sm:mt-0 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span>1 Year 100% Free Guarantee</span>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Dashboard Mockup */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden sm:block"
            >
              <div className="rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
                
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-white font-bold text-lg">Live Train Map Dashboard</h3>
                    <p className="text-sm text-slate-400">AI Demand Predictor Active</p>
                  </div>
                  <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { train: 'Rajdhani Express', arrival: 'In 12 Mins', items: 24, status: 'High Demand' },
                    { train: 'Shatabdi Exp', arrival: 'In 28 Mins', items: 15, status: 'Moderate' },
                    { train: 'Vande Bharat', arrival: 'In 45 Mins', items: 42, status: 'Surge Warning' },
                  ].map((row, i) => (
                    <div key={i} className="flex flex-wrap items-center justify-between p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                          <Train className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{row.train}</p>
                          <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" /> {row.arrival}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{row.items} Orders</p>
                        <p className={`text-xs mt-0.5 font-medium ${row.status.includes('Surge') ? 'text-rose-400' : 'text-indigo-400'}`}>{row.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-indigo-500 rounded-full blur-[80px] opacity-20 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Logistics Deep Dive */}
      <section className="py-24 relative z-10 bg-slate-950/80 overflow-hidden border-t border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-indigo-500/10 rounded-[100%] blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="mb-16 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">Built for Indian Railways: VendorAI</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">VendorAI bridges the gap in low-network zones. Our offline mesh network ensures customer orders reach you inside the remote train instantly—no internet needed. We route you coach-by-coach perfectly.</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                { title: 'Dynamic Customer Matching', desc: 'Customers traveling in your train get notified that your pantry/stall is onboard and active.', icon: <Clock className="w-5 h-5" /> },
                { title: 'Seat-level Heatmaps', desc: 'See exactly which coaches have active orders. Skip empty cabins and walk straight to buyers.', icon: <MapPin className="w-5 h-5" /> },
                { title: 'In-Train Routing Details', desc: 'The AI logistics system maps the train layout, guiding moving vendors seamlessly from Coach S1 to B4.', icon: <TrendingUp className="w-5 h-5" /> }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 bg-slate-900/50 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.5rem] opacity-20 blur-2xl animate-pulse" />
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                 <div className="h-4 w-full mb-8 border-b border-slate-800 flex items-center gap-2 pb-4">
                   <div className="w-3 h-3 rounded-full bg-rose-500" />
                   <div className="w-3 h-3 rounded-full bg-amber-500" />
                   <div className="w-3 h-3 rounded-full bg-emerald-500" />
                   <span className="text-slate-500 text-xs ml-4 font-mono">live-tracking.ai</span>
                 </div>
                 <div className="flex justify-between items-end mb-10">
                   <div>
                     <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" /> Ongoing Train Vendor Mode
                     </p>
                     <h3 className="text-xl sm:text-2xl font-bold text-white">Inside Vande Bharat Express</h3>
                   </div>
                   <div className="text-right">
                     <p className="text-3xl sm:text-4xl font-black text-cyan-400">Mesh Sync</p>
                     <p className="text-slate-500 text-sm">Offline Orders Received</p>
                   </div>
                 </div>
                 
                 <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-0.5 before:bg-slate-800">
                   {[
                     { station: 'Coach C1 (You are here)', time: '0 Active Orders', active: false },
                     { station: 'Coach C2', time: 'Deliver 2x Meals', active: false },
                     { station: 'Coach C4', time: 'Deliver 4x Water Bottles', active: true },
                   ].map((stop, i) => (
                     <div key={i} className="flex gap-6 relative">
                       <div className={`w-6 h-6 rounded-full border-4 border-slate-900 ${stop.active ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-slate-700'} shrink-0 z-10`} />
                       <div>
                         <p className={`font-bold text-lg ${stop.active ? 'text-indigo-400' : 'text-slate-400'}`}>{stop.station}</p>
                         <p className="text-sm text-slate-500">{stop.time}</p>
                       </div>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 relative z-10 border-t border-slate-800 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Partner with RailQuick?</h2>
            <p className="text-slate-400 text-lg">We provide an end-to-end technological ecosystem to digitize your existing railway operations instantly.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-slate-700 transition-colors overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                <div className="w-14 h-14 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-center mb-6 
                  group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Vision Prototype section */}
      <section className="py-24 relative z-10 bg-slate-950/50 overflow-hidden border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="order-2 lg:order-1 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-[3rem] opacity-10 blur-2xl animate-pulse" />
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
                 <div className="h-4 w-full mb-8 border-b border-slate-800 flex items-center gap-2 pb-4">
                   <div className="w-3 h-3 rounded-full bg-rose-500" />
                   <div className="w-3 h-3 rounded-full bg-amber-500" />
                   <div className="w-3 h-3 rounded-full bg-emerald-500" />
                   <span className="text-slate-500 text-xs ml-4 font-mono">vendor-vision.ai</span>
                 </div>
                 
                 <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 aspect-video flex items-center justify-center mb-6">
                    <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center opacity-10" />
                    {/* Fake Camera Target */}
                    <div className="w-48 h-48 border-2 border-amber-500/50 relative">
                        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-amber-500" />
                        <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-amber-500" />
                        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-amber-500" />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-amber-500" />
                        <div className="absolute inset-0 bg-amber-500/5 animate-pulse" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                       <div className="bg-slate-900/90 backdrop-blur text-amber-400 text-xs font-mono py-1 px-2 border border-slate-800 rounded">Analysis: 84% Crowd Density</div>
                       <div className="bg-emerald-500/20 text-emerald-400 text-xs font-bold py-1 px-2 border border-emerald-500/30 rounded flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"/> Live Scan
                       </div>
                    </div>
                 </div>

                 <div className="bg-slate-800/50 rounded-2xl p-5 border border-slate-700/50">
                   <h3 className="text-white font-bold mb-2 flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> AI Recommendation</h3>
                   <p className="text-slate-400 text-sm">High heat & heavy passenger influx detected at Platform 2. <strong className="text-white">Stock up on 40 extra Cold Water bottles and 20 Lassi cups</strong> before Vande Bharat arrives.</p>
                 </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full border border-amber-500/20 mb-2">
                <span className="text-xs sm:text-sm font-semibold text-amber-400 tracking-wide uppercase">New Prototype</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">VendorAI Vision Scanner</h2>
              <p className="text-slate-400 text-lg">Just point your phone camera at the platform. Our predictive AI instantly analyzes the passenger crowd, weather, and historical data to tell you exactly what items will sell out in the next 10 minutes.</p>
              
              <ul className="space-y-4 mt-8">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-emerald-400"/></div>
                  <p className="text-slate-300"><strong className="text-white block">Visual Crowd Analysis</strong> Know if the crowd is mostly families (stock snacks) or commuters (stock tea).</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 className="w-4 h-4 text-emerald-400"/></div>
                  <p className="text-slate-300"><strong className="text-white block">Zero Waste Prediction</strong> Stop guessing what to load on your trolley. The AI ensures zero unsold inventory.</p>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="onboard" className="py-20 bg-slate-950 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Kickstart Your 1-Year Free Trail</h2>
                <p className="text-slate-400 mb-8 text-lg">Leave your details below. Our vendor onboarding team will verify your stall integration and activate your dashboard access.</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0 text-indigo-400">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">Pan-India Network</h4>
                      <p className="text-slate-400 text-sm mt-1">Currently operating in major hubs and rapidly expanding across the network.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0 text-emerald-400">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">Scale Beyond Limits</h4>
                      <p className="text-slate-400 text-sm mt-1">Sell effectively both offline and digitally. Double your exposure instantly.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <div className="bg-slate-950/50 rounded-3xl p-6 sm:p-8 border border-slate-800">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Contact Person Name</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-14 bg-slate-900 border-slate-800 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl"
                        placeholder="Rahul Sharma"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-300">Email Address</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-14 bg-slate-900 border-slate-800 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl"
                        placeholder="rahul@example.com"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Contact Number</label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="h-14 bg-slate-900 border-slate-800 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">City / Station Hub</label>
                        <Input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="h-14 bg-slate-900 border-slate-800 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl"
                          placeholder="New Delhi"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2 pb-1 p-4 bg-slate-900 border border-slate-800 rounded-xl mt-2">
                      <input
                        type="checkbox"
                        id="isIrctcTender"
                        name="isIrctcTender"
                        checked={formData.isIrctcTender}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
                      />
                      <label htmlFor="isIrctcTender" className="text-sm text-slate-300 font-medium cursor-pointer">
                        We are an authorized IRCTC Tender Holder
                      </label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg transition-all"
                  >
                    {isSubmitting ? 'Submitting...' : 'Claim 1-Year Free Access'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 pt-16 pb-8 border-t border-slate-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <Link href="/" className="inline-block mb-4 p-2 bg-white rounded-xl">
                <img src="/images/logo-full.png" alt="RailQuick" className="h-7 sm:h-9 w-auto mix-blend-multiply" />
              </Link>
              <p className="text-sm sm:text-base text-slate-400 mb-5 max-w-sm">RailQuick Partners Portal. Digitizing Indian Railway local vendors with AI-powered logistics.</p>
            </div>
          </div>
          <div className="border-t border-slate-900 pt-6 text-center">
            <p className="text-slate-500 text-sm">© 2026 RailQuick App. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
