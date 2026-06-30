"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pill,
  Package,
  Smartphone,
  Building2,
  Bath,
  Cookie,
  Zap,
  Clock,
  Sparkles,
  CheckCircle2,
  Box,
  Star,
  ArrowRight,
  History as HistoryIcon,
  Train,
  Volume2,
  VolumeX,
  Heart,
  MessageCircle,
  Play,
  Pause,
  Instagram,
  ArrowLeft,
  Mail,
  MapPin,
  Loader2,
} from "lucide-react";

// Submit to backend API routes
async function submitToWaitlist(email: string) {
  const response = await fetch('/api/waitlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email })
  });
  return response.ok;
}

async function submitContact(data: Record<string, string>) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  return response.ok;
}

const steps = [
  {
    number: '01',
    title: 'Inside Train & Upcoming Station',
    description: 'Order from inside the running train for delivery at the upcoming station.',
    icon: <Box className="w-6 h-6 sm:w-8 sm:h-8" />
  },
  {
    number: '02',
    title: 'Add Details & Order',
    description: 'Add your train number and seat, pick what you need.',
    icon: <Package className="w-6 h-6 sm:w-8 sm:h-8" />
  },
  {
    number: '03',
    title: 'On-Seat Delivery',
    description: 'We will deliver directly to you in the running train.',
    icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
  },
];

const products = [
  {
    title: '24/7 Dedicated Support',
    description: 'Need help? Reach out to our dedicated support team anytime for any inquiries as we prepare for launch.',
    bg: 'bg-blue-50',
    icon: <Clock className="w-6 h-6 text-blue-600" />,
    wide: true,
  },
  {
    title: 'Travel Essentials',
    description: 'Blankets, pillows, locks, and travel accessories.',
    bg: 'bg-slate-50',
    icon: <Package className="w-6 h-6 text-slate-600" />,
  },
  {
    title: 'Electronics',
    description: 'Chargers, power banks, earphones and gadgets.',
    bg: 'bg-slate-50',
    icon: <Smartphone className="w-6 h-6 text-slate-600" />,
  },
  {
    title: 'City Famous',
    description: 'Specialities and famous items from your current city.',
    bg: 'bg-slate-50',
    icon: <Building2 className="w-6 h-6 text-slate-600" />,
  },
  {
    title: 'Snacks',
    description: 'Quick munchies and travel-friendly snacks.',
    bg: 'bg-slate-50',
    icon: <Cookie className="w-6 h-6 text-slate-600" />,
  },
];

const testimonials = [
  { name: 'Rohit', role: 'Passenger at Delhi Station', text: 'Local vendors often sell low-quality or fake products. I would always prefer ordering from RailQuick because it solves this exact problem.' },
  { name: 'Shreya', role: 'Solo Traveler', text: 'I\'ll definitely use this service. No overpricing, no different or fake products — that\'s what travelers actually need.' },
  { name: 'Varun', role: 'Regular Commuter', text: 'Finding trusted products during a train journey is always a problem. RailQuick makes it simple, reliable, and stress-free.' },
  { name: 'Gaurav', role: 'Business Traveler', text: 'Knowing that the products are verified gives confidence. I don\'t mind ordering if I know I\'m getting genuine items.' },
  { name: 'Ayush', role: 'Student Traveler', text: 'This feels like a service Indian Railways passengers have needed for a long time.' },
];

const stats = [
  { value: '100+', label: 'Ongoing Train Deliveries' },
  { value: '400+', label: 'Testers' },
  { value: '5', label: 'Routes' },
  { value: '1000+', label: 'Interactions' },
];

const brands = ['IIT KGP', 'IIT Delhi', 'Times of India', 'Aaj Tak', 'ANI', 'Delhi Yuva Festival', 'Delhi Government'];

const reels = [
  { id: 1, shortcode: "DaI7oi8CGq5" },
  { id: 2, shortcode: "DZ-p8WzC4I3" },
  { id: 3, shortcode: "DZ2DnOsiAAQ" },
  { id: 4, shortcode: "DZsQDrzi_Xq" },
  { id: 5, shortcode: "DZKSVyJiORs" },
  { id: 6, shortcode: "DZHX9mNiPjD" },
  { id: 7, shortcode: "DSdBNYVjlBc" },
  { id: 8, shortcode: "DSaYD3yjjcP" },
];

export default function HomePage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const reelsSectionRef = useRef<HTMLDivElement>(null);
  const [isReelsInView, setIsReelsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsReelsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );
    if (reelsSectionRef.current) {
      observer.observe(reelsSectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handlePrevReel = () => {
    setActiveReelIndex((prev) => {
      const next = (prev - 1 + reels.length) % reels.length;
      if (containerRef.current) {
        const container = containerRef.current;
        const itemWidth = container.scrollWidth / reels.length;
        container.scrollTo({ left: next * itemWidth, behavior: 'smooth' });
      }
      return next;
    });
  };

  const handleNextReel = () => {
    setActiveReelIndex((prev) => {
      const next = (prev + 1) % reels.length;
      if (containerRef.current) {
        const container = containerRef.current;
        const itemWidth = container.scrollWidth / reels.length;
        container.scrollTo({ left: next * itemWidth, behavior: 'smooth' });
      }
      return next;
    });
  };

  const handleContainerScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft;
    const itemWidth = container.scrollWidth / reels.length;
    const newIndex = Math.round(scrollPosition / itemWidth);
    if (newIndex !== activeReelIndex && newIndex >= 0 && newIndex < reels.length) {
      setActiveReelIndex(newIndex);
    }
  };

  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalEmail, setModalEmail] = useState('');
  const [modalSubmitting, setModalSubmitting] = useState(false);

  const [showTestModal, setShowTestModal] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [testCity, setTestCity] = useState('');
  const [testSubmitting, setTestSubmitting] = useState(false);
  const [testSuccess, setTestSuccess] = useState(false);
  const [testProgress, setTestProgress] = useState(0);

  const handleTestNow = () => {
    setShowTestModal(true);
  };

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


  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const success = await submitToWaitlist(waitlistEmail);
      if (success) {
        setWaitlistEmail('');
        setShowSuccessOverlay(true);
      } else {
        toast({ title: 'Error', description: 'Failed to join waitlist.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Something went wrong.', variant: 'destructive' });
    }
    setIsSubmitting(false);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalSubmitting(true);
    try {
      const success = await submitToWaitlist(modalEmail);
      if (success) {
        setModalEmail('');
        setShowModal(false);
        setShowSuccessOverlay(true);
      } else {
        toast({ title: 'Error', description: 'Failed to submit.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Something went wrong.', variant: 'destructive' });
    }
    setModalSubmitting(false);
  };

  const faqs = [
    { question: 'How does RailQuick work?', answer: 'Simply enter your PNR, browse our catalog of essentials, and place your order. We\'ll deliver it right to your train seat at the next station or directly inside the running train.' },
    { question: 'Which cities are currently serviced?', answer: 'We are currently testing our services in Delhi at Hazrat Nizamuddin, New Delhi, Delhi Junction, and Anand Vihar Terminal. We\'ll be expanding to more cities soon!' },
    { question: 'What payment methods are accepted?', answer: 'We accept various payment methods, including credit/debit cards, UPI, and cash on delivery (COD) for your convenience.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Email Modal (for Join Waitlist) */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-scale-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center mb-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-2xl">
                
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Join Waitlist</h3>
              <p className="text-sm sm:text-base text-slate-600 px-2">Enter your email to join the waitlist.</p>
            </div>
            <form onSubmit={handleModalSubmit} className="space-y-3 sm:space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={modalEmail}
                onChange={(e) => setModalEmail(e.target.value)}
                required
                className="w-full h-12 sm:h-14 px-4 sm:px-5 border-slate-200 rounded-xl text-center text-base"
              />
              <Button
                type="submit"
                disabled={modalSubmitting}
                className="w-full h-12 sm:h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-base"
              >
                {modalSubmitting ? 'Submitting...' : 'Join Waitlist'}
              </Button>
            </form>
          </div>
        </div>
      )}

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
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${item.href === '/'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <Button onClick={handleTestNow} className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 h-11 shadow-lg shadow-slate-900/20 transition-all hover:shadow-xl hover:-translate-y-0.5 font-bold">
                Join Waitlist
              </Button>
            </div>

            {/* Mobile Action Button */}
            <div className="md:hidden">
              <Button 
                onClick={handleTestNow} 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-3.5 h-8 text-[11px] font-bold shadow-md shadow-blue-500/10 active:scale-95 transition-all"
              >
                ⚡ Test Now
              </Button>
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
                  className={`flex-1 text-center py-2.5 px-1 rounded-full text-[11px] font-extrabold tracking-tight transition-all duration-300 ${item.label === "Home"
                    ? "bg-white text-blue-600 shadow-[0_2px_10px_rgba(15,23,42,0.06)] border border-slate-100/50"
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


      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Mobile Hero */}
        <div className="md:hidden relative min-h-screen flex flex-col bg-white">
          {/* Subtle background blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-80" />
          <div className="absolute bottom-20 left-0 w-48 h-48 bg-slate-50 rounded-full blur-2xl" />

          <div className="relative flex flex-col flex-1 px-5 pt-32 pb-10">
            {/* Top badges */}
            <div className="flex items-center gap-2 mb-7 flex-wrap">
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-3 py-1.5">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-blue-700 text-xs font-bold">India&apos;s First · 5-Min Delivery</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-emerald-700 text-xs font-bold">100+ Live Deliveries</span>
              </div>
            </div>

            {/* Main headline */}
            <h1 className="text-[52px] font-black text-slate-900 leading-[1.0] tracking-tight mb-4">
              <span className="block">Train</span>
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">On-Seat</span>
              <span className="block">Delivery</span>
            </h1>

            <p className="text-slate-500 text-base leading-relaxed mb-8">
              Get essentials delivered right to your seat while the train is moving. Fast, verified, reliable.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleTestNow}
                className="w-full py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white rounded-2xl text-base font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] hover:scale-[1.01] transition-all flex items-center justify-center gap-2 group"
              >
                Test Now <span className="group-hover:translate-x-1 transition-transform">⚡</span>
              </button>
              <Link href="/test-phase" className="w-full">
                <button className="w-full py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-2xl text-base font-semibold active:scale-[0.98] hover:scale-[1.01] transition-all hover:border-slate-400">
                  Learn About Test Phase →
                </button>
              </Link>
            </div>


          </div>
        </div>


        {/* Desktop Hero */}
        <div className="hidden md:flex relative min-h-screen items-center pt-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />
          <div className="absolute top-10 left-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-orange-100/30 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 w-full">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div className="text-left">
                <div className="flex items-center gap-2 mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-sm font-semibold text-slate-700">India&apos;s First <span className="text-blue-600 mx-1">•</span> <span className="text-slate-900 font-bold">5-Min Delivery</span></span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-bold text-slate-800">100+ Ongoing Train Deliveries</span>
                  </div>
                </div>

                <h1 className="flex flex-col text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-tight mb-8">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Train On-Seat</span>
                  <span>Essential Delivery</span>
                </h1>

                <p className="text-xl lg:text-2xl text-slate-600 max-w-lg mb-10 leading-relaxed">
                  Essentials Delivered Directly to Your Train Seat
                </p>

                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleTestNow}
                    className="px-8 py-7 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white hover:from-blue-700 hover:to-indigo-700 rounded-2xl text-lg font-bold transition-all hover:scale-105 shadow-xl shadow-blue-500/25 flex items-center gap-2 group"
                  >
                    Test Now <span className="group-hover:translate-x-1 transition-transform">⚡</span>
                  </Button>
                  <Link href="/test-phase">
                    <Button variant="outline" className="px-8 py-7 border-2 border-slate-200 hover:border-slate-900 rounded-2xl text-lg font-bold transition-all hover:scale-105">
                      Test Phase
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative flex justify-center lg:scale-110">
                <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-slate-100 max-w-sm w-full">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center text-white text-xl">
                      📦
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Order Ready</p>
                      <p className="text-sm text-slate-500">Seat 42, Coach B3</p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-5">
                    {['Medicines', 'Charger', 'Water'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" />
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 bg-white rounded-xl px-4 py-2 shadow-md border text-sm font-semibold text-green-600 animate-float">
                  ✓ Ready to deliver
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Marquee */}
      <section className="py-8 sm:py-10 bg-slate-900 relative overflow-hidden">
        <p className="relative text-center text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
          Our brand showcase        </p>
        <div className="relative flex animate-marquee">
          {[...brands, ...brands, ...brands].map((brand, i) => (
            <div key={i} className="flex-shrink-0 px-6 sm:px-10 text-sm sm:text-lg font-bold text-slate-600 hover:text-white transition-colors">
              {brand}
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">How It Works</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">Get your essentials in 3 simple steps</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative bg-slate-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="absolute top-4 right-4 text-4xl sm:text-5xl font-black bg-gradient-to-br from-blue-600/35 to-cyan-500/25 bg-clip-text text-transparent select-none">
                  {step.number}
                </div>
                <div className="relative w-11 h-11 sm:w-14 sm:h-14 bg-white rounded-lg sm:rounded-xl flex items-center justify-center text-slate-900 shadow-sm mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5 sm:mb-2">{step.title}</h3>
                <p className="text-sm sm:text-base text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Reels Section */}
      <section ref={reelsSectionRef} className="pt-12 pb-20 sm:pt-20 lg:pt-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 relative z-10 text-center">
          <span className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-widest mb-3 inline-block">
            RailQuick in Action
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 mt-2 mb-3">
            Watch Our Story
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            See how we are transforming train travel across India. Follow us on Instagram{' '}
            <a
              href="https://www.instagram.com/railquick/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 font-bold hover:underline inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              @railquick <ArrowRight className="w-4 h-4" />
            </a>
          </p>
        </div>

        {/* Reels Carousel */}
        <div className="relative max-w-6xl mx-auto px-4">
          {/* Left Arrow (Desktop) */}
          <button
            onClick={handlePrevReel}
            className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex w-12 h-12 bg-white hover:bg-slate-50 border border-slate-200 rounded-full items-center justify-center text-slate-900 shadow-xl transition-all hover:scale-110 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow (Desktop) */}
          <button
            onClick={handleNextReel}
            className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex w-12 h-12 bg-white hover:bg-slate-50 border border-slate-200 rounded-full items-center justify-center text-slate-900 shadow-xl transition-all hover:scale-110 active:scale-95"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Scrolling Track */}
          <div 
            ref={containerRef}
            onScroll={handleContainerScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory py-4 sm:py-6 px-4 no-scrollbar scroll-smooth"
          >
            {reels.map((reel, index) => {
              const isActive = index === activeReelIndex;
              return (
                <div
                  key={reel.id}
                  className={`flex-shrink-0 w-[200px] sm:w-[240px] aspect-[9/16] snap-center rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-xl transition-all duration-500 border-2 ${
                    isActive
                      ? 'scale-100 border-pink-500 ring-4 ring-pink-500/25 z-30 shadow-pink-500/30'
                      : 'scale-95 border-slate-200/50 opacity-60 filter blur-[0.5px] hover:opacity-85 hover:blur-none'
                  }`}
                >
                  <iframe
                    src={`https://www.instagram.com/p/${reel.shortcode}/embed/?autoplay=${isActive && isReelsInView ? '1' : '0'}`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    allowTransparency={true}
                    className="absolute inset-0 w-full h-full bg-slate-900"
                  ></iframe>
                  
                  {/* Overlay to disable iframe interaction when not active, allowing for smooth swipe/scroll */}
                  {!isActive && <div className="absolute inset-0 z-10 cursor-pointer" />}
                </div>
              );
            })}
          </div>

          {/* Carousel Dot Indicators */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {reels.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActiveReelIndex(idx);
                  if (containerRef.current) {
                    const container = containerRef.current;
                    const itemWidth = container.scrollWidth / reels.length;
                    container.scrollTo({ left: idx * itemWidth, behavior: 'smooth' });
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeReelIndex 
                    ? 'w-6 bg-pink-500 shadow-md shadow-pink-500/20' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">What We Deliver</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">Curated essentials for every journey</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* 24/7 Support — spans full width on mobile, full width on desktop too */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="col-span-2 group p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-blue-50 border border-blue-100 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 relative z-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-2xl font-bold text-slate-900 mb-1 sm:mb-2">24/7 Dedicated Support</h3>
                  <p className="text-slate-600 leading-relaxed text-xs sm:text-base">Need help? Reach out to our dedicated support team anytime for any inquiries as we prepare for launch.</p>
                </div>
              </div>
            </motion.div>

            {/* Travel Essentials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 relative z-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <Package className="w-6 h-6 text-slate-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-2xl font-bold text-slate-900 mb-1 sm:mb-2">Travel Essentials</h3>
                  <p className="text-slate-600 leading-relaxed text-xs sm:text-base">Blankets, pillows, locks, and travel accessories.</p>
                </div>
              </div>
            </motion.div>

            {/* Medicines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="group p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 relative z-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <Pill className="w-6 h-6 text-slate-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-2xl font-bold text-slate-900 mb-1 sm:mb-2">Medicines</h3>
                  <p className="text-slate-600 leading-relaxed text-xs sm:text-base">Essential medicines and basic medical supplies.</p>
                </div>
              </div>
            </motion.div>

            {/* Hygiene */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 relative z-10">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-slate-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-2xl font-bold text-slate-900 mb-1 sm:mb-2">Hygiene</h3>
                  <p className="text-slate-600 leading-relaxed text-xs sm:text-base">Personal hygiene products and daily essentials.</p>
                </div>
              </div>
            </motion.div>

            {/* Remaining products */}
            {[
              { title: 'Electronics', desc: 'Chargers, power banks, earphones and gadgets.', icon: <Smartphone className="w-6 h-6 text-slate-600" /> },
              { title: 'City Famous', desc: 'Specialities and famous items from your current city.', icon: <Building2 className="w-6 h-6 text-slate-600" /> },
              { title: 'Snacks', desc: 'Quick munchies and travel-friendly snacks.', icon: <Cookie className="w-6 h-6 text-slate-600" /> },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i + 2) * 0.1 }}
                className="group p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 relative z-10">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-2xl font-bold text-slate-900 mb-1 sm:mb-2">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-base">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Stats */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-widest mb-2">By the numbers</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Growing every day</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="group bg-slate-50 border border-slate-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 hover:-translate-y-1">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 group-hover:text-white mb-2 transition-colors">{stat.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 group-hover:text-blue-100 uppercase tracking-wider font-semibold transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
          <div className="text-center">
            <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Testimonials</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">What our early users say</h2>
          </div>
        </div>

        <div className="relative">
          <div className="flex gap-4 animate-marquee py-4">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={i} className="flex-shrink-0 w-[280px] sm:w-[340px] bg-slate-50 rounded-xl sm:rounded-2xl p-5 sm:p-6 hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className="flex text-amber-400 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-700 mb-3 sm:mb-4 leading-relaxed text-sm">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">Why Choose Us</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Experience train travel like never before
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                title: 'Lightning Fast Delivery',
                description: 'Get your essentials delivered to your seat at the next station stop or directly inside the running train.',
                gradient: 'from-blue-500 to-cyan-400',
                icon: <Zap className="w-6 h-6" />
              },
              {
                title: 'Quality Guaranteed',
                description: 'We source only verified, high-quality products for your peace of mind.',
                gradient: 'from-green-500 to-emerald-400',
                icon: <CheckCircle2 className="w-6 h-6" />
              },
              {
                title: 'Wide Selection',
                description: "From medicines to gadgets, we've got everything you might need.",
                gradient: 'from-purple-500 to-pink-400',
                icon: <Package className="w-6 h-6" />
              },
            ].map((feature, index) => (
              <div key={index} className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-100 hover:border-transparent hover:shadow-lg transition-all duration-300">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${feature.gradient} rounded-lg sm:rounded-xl flex items-center justify-center text-white text-lg sm:text-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">FAQ</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-xl sm:rounded-2xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm sm:text-base pr-4">{faq.question}</span>
                  <svg className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${activeFaq === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeFaq === index ? 'max-h-96' : 'max-h-0'}`}>
                  <p className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="waitlist" className="py-16 sm:py-24 bg-slate-950 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
            Be the first to experience RailQuick
          </h2>
          
          {/* Card Layout to prevent squeezed text on mobile */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6 max-w-xl mx-auto mb-10 text-center shadow-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider mb-3">
              <span>⚡</span> Live seat tracking
            </div>
            <p className="text-base sm:text-lg text-slate-100 font-bold mb-1.5">
              Live Seat Delivery Tracking
            </p>
            <p className="text-xs sm:text-sm text-slate-450 leading-relaxed max-w-md mx-auto">
              Watch your order travel across the station directly to your seat in real-time. Experience seamless updates at every step.
            </p>
          </div>

          <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3.5 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              required
              className="flex-1 h-14 px-5 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-2xl text-base"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccessOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white rounded-[2rem] max-w-sm w-full text-center relative overflow-hidden shadow-2xl border border-white/20"
            >
              {/* Premium Header Area */}
              <div className="relative h-32 bg-slate-900 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-50" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-400 rounded-full blur-3xl opacity-30" />
                
                <motion.div 
                  initial={{ scale: 0, rotate: -45 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 relative z-10"
                >
                  <CheckCircle2 className="w-8 h-8 text-cyan-300" />
                </motion.div>
              </div>

              {/* VIP Ticket Tear Line (CSS Trick) */}
              <div className="relative h-6 bg-white flex items-center justify-between px-[-10px] -mt-3">
                <div className="w-6 h-6 bg-slate-900/60 rounded-full absolute -left-3" />
                <div className="w-full border-t-2 border-dashed border-slate-200" />
                <div className="w-6 h-6 bg-slate-900/60 rounded-full absolute -right-3" />
              </div>

              <div className="p-8 pt-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> 
                </div>
                
                <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">You&apos;re On Board!</h2>
                <p className="text-sm text-slate-500 mb-8 leading-relaxed px-2">
                  Your spot is secured. We&apos;ll ping you the moment RailQuick launches at your station.
                </p>

                <Button
                  onClick={() => setShowSuccessOverlay(false)}
                  className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-base shadow-[0_0_40px_-10px_rgba(0,0,0,0.3)] transition-all hover:scale-[1.02]"
                >
                  Got It!
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
