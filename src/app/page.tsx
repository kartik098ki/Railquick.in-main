"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import CheckPnrModal from "@/components/CheckPnrModal";
import Navbar from "@/components/Navbar";
import RainThunderEffect from "@/components/RainThunderEffect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import TicketPnrButton from "@/components/TicketPnrButton";
import { toast } from "@/hooks/use-toast";
import HowItWorksFlow from "@/components/HowItWorksFlow";
import WhatWeDeliverSection from "@/components/WhatWeDeliverSection";
import WatchOurStorySection from "@/components/WatchOurStorySection";
import RailQuickGuarantees from "@/components/RailQuickGuarantees";
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
  Users,
  Map,
  Loader2,
  ShieldCheck,
  Droplet,
  UtensilsCrossed,
} from "lucide-react";

// Submit to backend API routes
async function submitToWaitlist(email: string, city?: string) {
  const response = await fetch('/api/waitlist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, city: city || '' })
  });
  if (!response.ok) return false;
  const resData = await response.json().catch(() => ({}));
  return resData.success === true;
}

async function submitContact(data: Record<string, string>) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) return false;
  const resData = await response.json().catch(() => ({}));
  return resData.success === true;
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
    icon: <Clock className="w-6 h-6 text-emerald-600" />,
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
  { value: '100+', numericValue: 100, suffix: '+', label: 'Ongoing Train Deliveries' },
  { value: '500+', numericValue: 500, suffix: '+', label: 'Testers' },
  { value: '7k+', numericValue: 7000, suffix: '+', label: 'Customers Waitlist' },
  { value: '10000+', numericValue: 10000, suffix: '+', label: 'Interactions' },
];


const reels = [
  { id: 1, shortcode: "DeHgLUGmEgr" },
  { id: 2, shortcode: "Dd_XK35iJ7p" },
  { id: 3, shortcode: "Dd4Dk1dCNk8" },
  { id: 4, shortcode: "Ddf39K9mBeU" },
  { id: 5, shortcode: "DdBSEesq5u_" },
  { id: 6, shortcode: "DbQrnvXiHwg" },
  { id: 7, shortcode: "DbCtWWozgw8" },
  { id: 8, shortcode: "Da2edDWCq3_" },
  { id: 9, shortcode: "Das6fpQT5VL" },
  { id: 10, shortcode: "DaVFShsCSK3" },
];

// Stable outside component — prevents infinite re-render in typewriter useEffect
const TYPING_CATEGORIES = ['Snacks', 'Water', 'Chargers', 'Essentials', 'Medicines', 'Pillows'];

export default function HomePage() {
  const router = useRouter();
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [showCheckPnrModal, setShowCheckPnrModal] = useState(false);
  const [homePnrInput, setHomePnrInput] = useState("");
  const [activeWorkStep, setActiveWorkStep] = useState(0);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const reelsSectionRef = useRef<HTMLDivElement>(null);
  const [isReelsInView, setIsReelsInView] = useState(false);

  // Authentic Typewriter animation state — starts with first word, no empty flash
  const [typedText, setTypedText] = useState(TYPING_CATEGORIES[0]);
  const [catIndex, setCatIndex] = useState(0);
  const [isDeletingCat, setIsDeletingCat] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentCategory = TYPING_CATEGORIES[catIndex % TYPING_CATEGORIES.length];

    if (!isDeletingCat) {
      if (typedText !== currentCategory) {
        timer = setTimeout(() => {
          setTypedText(currentCategory.slice(0, typedText.length + 1));
        }, 70);
      } else {
        // Stay full for 2.2 seconds before deleting
        timer = setTimeout(() => {
          setIsDeletingCat(true);
        }, 2200);
      }
    } else {
      if (typedText !== '') {
        timer = setTimeout(() => {
          setTypedText(currentCategory.slice(0, typedText.length - 1));
        }, 40);
      } else {
        // Brief pause when empty before typing next word
        timer = setTimeout(() => {
          setIsDeletingCat(false);
          setCatIndex((prev) => (prev + 1) % TYPING_CATEGORIES.length);
        }, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, isDeletingCat, catIndex]);

  // Animated counter state
  const [countersAnimated, setCountersAnimated] = useState(false);
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersAnimated) {
          setCountersAnimated(true);
          stats.forEach((stat, index) => {
            const target = stat.numericValue;
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              setAnimatedValues((prev) => {
                const newVals = [...prev];
                newVals[index] = Math.round(current);
                return newVals;
              });
            }, duration / steps);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, [countersAnimated]);

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
  const [activeFeatureTab, setActiveFeatureTab] = useState(0);

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
    const cleanInput = waitlistEmail.trim();
    if (!cleanInput) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: cleanInput, city: 'Delhi' }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        // STORED FIRST IN SUPABASE -> THEN SHOW SUCCESS POPUP!
        setWaitlistEmail('');
        setShowSuccessOverlay(true);
      } else {
        toast({
          title: 'Waitlist Notice',
          description: data.message || 'Could not join waitlist. Please verify your phone or email.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Connection Error',
        description: 'Failed to reach database. Please check your connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = modalEmail.trim();
    if (!cleanInput) return;

    setModalSubmitting(true);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: cleanInput, city: 'Delhi' }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success) {
        // STORED FIRST IN SUPABASE -> THEN SHOW SUCCESS POPUP!
        setModalEmail('');
        setShowModal(false);
        setShowSuccessOverlay(true);
      } else {
        toast({
          title: 'Notice',
          description: data.message || 'Could not register details in Supabase.',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Connection Error',
        description: 'Failed to reach database. Please check your connection.',
        variant: 'destructive',
      });
    } finally {
      setModalSubmitting(false);
    }
  };

  const faqs = [
    { question: 'How does RailQuick work?', answer: 'Simply enter your PNR, browse our catalog of essentials, and place your order. We\'ll deliver it right to your train seat at the next station or directly inside the running train.' },
    { question: 'Which cities are currently serviced?', answer: 'We are currently testing our services in Delhi at Hazrat Nizamuddin, New Delhi, Delhi Junction, and Anand Vihar Terminal. We\'ll be expanding to more cities soon!' },
    { question: 'What payment methods are accepted?', answer: 'We accept various payment methods, including credit/debit cards, UPI, and cash on delivery (COD) for your convenience.' },
    { question: 'What items can I order on the train?', answer: 'Snacks, beverages, emergency medicines, smartphone chargers, power banks, travel pillows, hygiene kits, and local city specialties.' },
    { question: 'What happens if my train is delayed?', answer: 'Our logistics platform tracks your train\'s live running status in real-time. Our station delivery runners coordinate automatically to meet your exact coach when your train arrives.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Check PNR Live Tracking Modal */}
      <CheckPnrModal isOpen={showCheckPnrModal} onClose={() => setShowCheckPnrModal(false)} />

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

      {/* Unified Global Navbar */}
      <Navbar onOpenPnrModal={() => setShowCheckPnrModal(true)} />


      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Mobile Hero — exact layout & white fog gradient matching reference photo */}
        <div className="md:hidden relative bg-slate-950 overflow-hidden min-h-[680px] flex flex-col justify-between pt-36 sm:pt-40 pb-12 px-5">

          {/* Full-bleed portrait train background */}
          <div className="absolute inset-0 z-0">
            <img
              src="/mobile-hero-train.jpg"
              alt="Train Background"
              className="w-full h-full object-cover object-center"
            />
            {/* Rain & Lightning */}
            <RainThunderEffect />
            {/* Soft White Fog/Glow gradient fade at top under white nav header */}
            <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-white via-white/85 via-white/35 to-transparent z-10 pointer-events-none" />
            {/* Bottom dark vignette overlay for headline & buttons readability */}
            <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-slate-950 via-slate-950/90 via-slate-950/40 to-transparent z-10 pointer-events-none" />
          </div>

          {/* Mobile Hero Content Layout */}
          <div className="relative z-20 flex flex-col justify-between flex-1 h-full w-full">

            {/* Badges stacked at top-left — generous top margin & no overlap */}
            <div className="flex flex-col items-start gap-2 pt-1">
              <div className="flex items-center gap-2 bg-slate-950/90 backdrop-blur-md border border-slate-700/80 rounded-full px-3.5 py-1.5 shadow-lg max-w-full">
                <span className="flex h-2 w-2 relative shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-white text-[11px] sm:text-xs font-bold tracking-tight">India&apos;s First On-Seat Train Delivery</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950/90 backdrop-blur-md border border-slate-700/80 rounded-full px-3.5 py-1.5 shadow-lg max-w-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                <span className="text-emerald-400 text-[11px] sm:text-xs font-bold tracking-tight">100+ Live Deliveries</span>
              </div>
            </div>

            {/* Train visible area — flex grows to show train engine in middle */}
            <div className="flex-1 min-h-[140px]" />

            {/* Headline + Subtitle positioned below train engine */}
            <div className="flex flex-col items-start gap-1.5 mb-4 text-left">
              <div className="flex items-center flex-nowrap gap-2 whitespace-nowrap font-black text-white tracking-tight" style={{fontSize:'clamp(28px,9vw,40px)'}}>
                <span className="text-white">Order</span>
                <span className="inline-flex items-center">
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent font-black">
                    {typedText}
                  </span>
                  <span className="inline-block bg-blue-500 ml-1.5 animate-pulse rounded-full" style={{width:'3px', height:'0.85em'}} />
                </span>
              </div>
              <div className="font-extrabold text-white tracking-tight leading-tight" style={{fontSize:'clamp(22px,7vw,32px)'}}>
                Delivered to Your Seat
              </div>
            </div>

            {/* Buttons pinned to bottom */}
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={handleTestNow}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-base font-extrabold shadow-xl shadow-blue-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
              >
                Open App <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link href="/test-phase" className="w-full">
                <button className="w-full py-4 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white rounded-2xl text-sm font-bold active:scale-[0.98] transition-all flex items-center justify-center">
                  Learn About Test Phase →
                </button>
              </Link>
            </div>

          </div>
        </div>

        {/* Desktop Hero */}
        <div className="hidden md:flex relative min-h-[85vh] lg:min-h-[90vh] items-center pt-16 pb-24 overflow-hidden bg-slate-950">
          {/* Background Train Image & Rain/Thunderstorm Effect */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/hero-train.jpg" 
              alt="Train Background" 
              className="w-full h-full object-cover object-right"
            />
            {/* Animated Rain & Thunderstorm Lightning Overlay */}
            <RainThunderEffect />
            {/* Smooth left-side white fog gradient so text sits cleanly on white */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 via-white/60 to-transparent w-full md:w-[65%] lg:w-[58%] z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none z-10" />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 w-full z-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Hero Left Content */}
              <div className="text-left">
                <div className="flex items-center gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-md rounded-full border border-slate-200/90 shadow-sm">
                    <span className="flex h-2.5 w-2.5 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                    </span>
                    <span className="text-sm font-bold text-slate-800">India&apos;s First On-Seat Train Delivery</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100/90 backdrop-blur-md border border-slate-200/80 rounded-full shadow-sm">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-bold text-slate-800">100+ Live Deliveries</span>
                  </div>
                </div>

                {/* Headline: Typewriter Animation */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-none mb-3 flex items-center flex-nowrap gap-3 sm:gap-4 whitespace-nowrap">
                  <span className="shrink-0 text-slate-900">Order</span>
                  <span className="inline-flex items-center text-slate-900 font-black">
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                      {typedText}
                    </span>
                    <span className="w-[4px] h-[0.85em] bg-blue-600 ml-2 inline-block animate-pulse rounded-full" />
                  </span>
                </h1>

                <p className="text-2xl sm:text-3xl text-slate-700 font-extrabold mb-8 tracking-tight">
                  Delivered to Your Seat
                </p>

                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleTestNow}
                    className="px-8 py-7 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-lg font-extrabold transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-slate-900/20 flex items-center gap-2 group"
                  >
                    Open App <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Link href="/test-phase">
                    <Button variant="outline" className="px-8 py-7 bg-white border-2 border-slate-200 hover:border-slate-400 text-slate-800 rounded-2xl text-lg font-bold transition-all duration-300 hover:scale-[1.02] shadow-sm">
                      Test Phase
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Value Highlights (Laptop: 4 Cards | Mobile: Ultra-Sleek Fast Express Order Widget) */}
      <section className="relative z-20 -mt-6 sm:-mt-10 lg:-mt-12 mb-10 md:mb-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Laptop View: 4 Clean Value Highlight Cards */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {[
              {
                title: "Direct Berth Delivery",
                subtitle: "Inside running trains",
                description: "Delivered straight to your coach during scheduled halts.",
                icon: <Train className="w-5 h-5 text-blue-600" />,
                iconBg: "bg-blue-50 border-blue-100",
              },
              {
                title: "100% Genuine MRP",
                subtitle: "Zero overpricing",
                description: "Standard printed retail price. No arbitrary vendor markups.",
                icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
                iconBg: "bg-emerald-50 border-emerald-100",
              },
              {
                title: "Swift Coach Handoff",
                subtitle: "Even in 2-min halts",
                description: "Runner meets you directly at your coach door. Zero platform rush, luggage stays safe.",
                icon: <Zap className="w-5 h-5 text-amber-600" />,
                iconBg: "bg-amber-50 border-amber-100",
              },
              {
                title: "Live GPS Sync",
                subtitle: "Route tracking",
                description: "Real-time sync with Indian Railways schedules & platforms.",
                icon: <MapPin className="w-5 h-5 text-indigo-600" />,
                iconBg: "bg-indigo-50 border-indigo-100",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/95 backdrop-blur-xl border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[0_8px_30px_rgba(15,23,42,0.06)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl border ${item.iconBg} flex items-center justify-center mb-3 shadow-2xs`}>
                    {item.icon}
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-blue-600 mb-1">
                    {item.subtitle}
                  </p>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View: High-Tech Interactive Feature Explorer with Tabs & Real Telemetry */}
          <div className="block md:hidden space-y-4">
            {/* 1. Horizontal Interactive Feature Pill Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 0, label: "Berth Delivery", icon: Train, color: "text-blue-600", activeBg: "bg-blue-600 text-white" },
                { id: 1, label: "Printed MRP", icon: ShieldCheck, color: "text-emerald-600", activeBg: "bg-emerald-600 text-white" },
                { id: 2, label: "2-Min Handoff", icon: Zap, color: "text-amber-600", activeBg: "bg-amber-600 text-white" },
                { id: 3, label: "Live GPS", icon: MapPin, color: "text-indigo-600", activeBg: "bg-indigo-600 text-white" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFeatureTab(tab.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all shadow-2xs ${
                    activeFeatureTab === tab.id
                      ? `${tab.activeBg} shadow-md scale-102`
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <tab.icon className={`w-3.5 h-3.5 ${activeFeatureTab === tab.id ? "text-white" : tab.color}`} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* 2. Active Feature Spotlight Card (Dynamic Content per Tab) */}
            <div className="bg-gradient-to-br from-white via-slate-50/50 to-blue-50/40 p-5 rounded-3xl border border-slate-200/90 shadow-sm relative overflow-hidden transition-all">
              {activeFeatureTab === 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">
                      Inside Running Trains
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">01 / 04</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight mb-1">
                    Direct Berth Delivery
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                    Delivered straight to your coach during scheduled halts. Our verified runner boards your specific coach door with your package.
                  </p>
                  {/* Interactive Coach Graphic */}
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-between text-xs font-mono shadow-2xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span className="font-bold text-slate-800">Coach B4 • Seat 42</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Runner At Door ✓
                    </span>
                  </div>
                </div>
              )}

              {activeFeatureTab === 1 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                      Zero Overpricing
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">02 / 04</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight mb-1">
                    100% Genuine MRP
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                    Standard printed retail price. No arbitrary vendor markups, surge prices, or inflated station platform rates.
                  </p>
                  {/* Official MRP Seal Graphic */}
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-between text-xs font-mono shadow-2xs">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span className="font-bold text-slate-800">Printed Retail Seal</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ₹0 Extra Charge
                    </span>
                  </div>
                </div>
              )}

              {activeFeatureTab === 2 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                      Even in 2-Min Halts
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">03 / 04</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight mb-1">
                    Swift Coach Handoff
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                    Runner meets you directly at your coach door. Zero platform rush, no leaving your seat, luggage stays completely safe.
                  </p>
                  {/* Timer graphic */}
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-between text-xs font-mono shadow-2xs">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500 animate-bounce" />
                      <span className="font-bold text-slate-800">Halt Window: 02:00 mins</span>
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      OTP Verified
                    </span>
                  </div>
                </div>
              )}

              {activeFeatureTab === 3 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-full border border-indigo-200">
                      Route Tracking
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400">04 / 04</span>
                  </div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight mb-1">
                    Live GPS Sync
                  </h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed mb-4">
                    Real-time sync with Indian Railways schedules &amp; platform changes. If train is delayed, runner delivery schedule automatically updates.
                  </p>
                  {/* GPS Radar Graphic */}
                  <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-between text-xs font-mono shadow-2xs">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      <span className="font-bold text-slate-800">Satellite Sync</span>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Live Delay Adapted
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Mobile PNR & Coach Track Quick Action Card (Hidden on mobile as requested) */}
            <div className="hidden sm:block bg-gradient-to-br from-amber-50/90 via-white to-orange-50/70 p-4 sm:p-5 rounded-3xl border border-amber-200/90 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                  <span className="text-[11px] font-mono font-black uppercase tracking-wider text-slate-900">
                    Live PNR &amp; Berth Radar
                  </span>
                </div>
                <span className="text-[10px] font-mono font-black bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                  IRCTC SYNC
                </span>
              </div>

              <p className="text-xs text-slate-600 font-medium mb-3">
                Check coach number, live train location, and order essentials directly to your seat.
              </p>

              <button
                type="button"
                onClick={() => setShowCheckPnrModal(true)}
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <Train className="w-4 h-4 text-amber-400" />
                <span>Track 10-Digit PNR / Train Status</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How RailQuick Works — Exact Match to Reference Design with S-Curve Dotted Line & Floating UI Cards */}
      <div id="how-it-works">
        <HowItWorksFlow />
      </div>

      {/* What We Deliver — Curated Essentials & Travel Comfort */}
      <WhatWeDeliverSection />

      {/* Watch Our Story — Interactive Silent Reels */}
      <WatchOurStorySection />

      {/* The RailQuick Promise — Real 4-Point Passenger Guarantees */}
      <RailQuickGuarantees />

      {/* Stats */}
      <section ref={statsRef} className="py-16 sm:py-24 lg:py-32 bg-white border-t border-b border-slate-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">By the numbers</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Growing every day</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white border border-slate-200/70 rounded-[2rem] p-6 sm:p-8 lg:p-10 text-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/15 hover:-translate-y-2 flex flex-col items-center justify-center min-h-[130px] sm:min-h-[180px]"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 group-hover:text-white mb-2 transition-colors duration-300 tabular-nums">
                  {animatedValues[index]}{stat.suffix}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 group-hover:text-blue-100 uppercase tracking-wider font-extrabold transition-colors duration-300 max-w-[150px] mx-auto leading-snug">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Why Travelers Choose Us */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-extrabold text-blue-600 uppercase tracking-widest mb-3">
              Why Travelers Choose Us
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">What our early users say</h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-2">Real feedback from train passengers across Indian Railways.</p>
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


      {/* FAQ */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">FAQ</p>
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

      {/* India's Train Delivery App Waitlist Section */}
      <section id="waitlist" className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden border-t border-slate-900">
        {/* Subtle Luxury Ambient Lighting */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-5 text-center z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-400/20 rounded-full text-xs font-black text-blue-400 uppercase tracking-widest mb-4 backdrop-blur-xs">
            ⚡ ON-SEAT IN-TRAIN PLATFORM
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.15]">
            India&apos;s Train Delivery App
          </h2>

          <p className="text-sm sm:text-base text-slate-400 mb-8 max-w-lg mx-auto px-2 leading-relaxed font-medium">
            Delivering verified travel essentials, fast chargers, emergency medicines &amp; sealed snacks directly to your seat while your train is in motion.
          </p>

          <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <Input
              type="text"
              placeholder="Enter mobile or email address"
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              required
              className="flex-1 h-14 px-5 bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-2xl text-sm sm:text-base"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-8 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? 'Saving to Database...' : 'Get Early Access'}
            </Button>
          </form>

          {/* Quick PNR Trigger in Waitlist */}
          <div className="flex items-center justify-center gap-4 text-xs text-slate-400 pt-2">
            <span>Traveling right now?</span>
            <button
              onClick={() => setShowCheckPnrModal(true)}
              className="text-blue-400 hover:text-blue-300 font-bold underline underline-offset-4 flex items-center gap-1 transition-colors"
            >
              Track Live PNR Status <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
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
