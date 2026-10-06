"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import Navbar from "@/components/Navbar";
import TicketPnrButton from "@/components/TicketPnrButton";
import CheckPnrModal from "@/components/CheckPnrModal";
import { motion } from "framer-motion";
import {
  Sparkles,
  Train,
  Bell,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Utensils,
  BookOpen,
  CheckCircle2,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function BlogPage() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isCheckPnrOpen, setIsCheckPnrOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      toast({
        title: "Please enter contact info",
        description: "Enter your email or WhatsApp number to get notified.",
        variant: "destructive",
      });
      return;
    }
    setSubscribed(true);
    toast({
      title: "You're on the early list! 🎉",
      description: "We will notify you as soon as the first RailQuick Journal story drops.",
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col justify-between selection:bg-amber-100 selection:text-slate-950">
      <CheckPnrModal isOpen={isCheckPnrOpen} onClose={() => setIsCheckPnrOpen(false)} />

      {/* Unified Navigation Bar */}
      <Navbar onOpenPnrModal={() => setIsCheckPnrOpen(true)} />

      {/* Main Hero - Coming Soon */}
      <main className="flex-1 flex flex-col justify-center items-center pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black uppercase tracking-wider mb-6 shadow-2xs"
          >
            <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
            <span>RailQuick Travel Journal — Launching Soon</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-4"
          >
            Something Mast is Cooking!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium mb-10"
          >
            We are putting the finishing touches on our curated Indian Railways travel guides, passenger rights breakdowns, Tatkal speed hacks, and station food capital secrets.
          </motion.p>

          {/* Notify Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-xl max-w-lg mx-auto mb-12"
          >
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="text"
                  placeholder="Enter email or WhatsApp number"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="flex-1 h-12 px-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 focus:bg-white focus:border-slate-400 focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  className="h-12 px-6 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs rounded-2xl shadow-md flex items-center justify-center gap-2 shrink-0 transition-all active:scale-98"
                >
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>Notify Me</span>
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-2 text-emerald-700 font-black text-sm py-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>You're subscribed! We will alert you on first publish.</span>
              </div>
            )}
            <span className="text-[11px] text-slate-400 font-mono mt-3 block">
              Join 7k+ customers on our early waitlist.
            </span>
          </motion.div>

          {/* Sneak Peek Articles Preview */}
          <div className="text-left mb-12">
            <h3 className="text-xs font-mono font-black uppercase tracking-widest text-slate-400 mb-4 text-center">
              Sneak Peek — Upcoming Articles
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs relative overflow-hidden">
                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md mb-2 inline-block">
                  Coming Soon
                </span>
                <h4 className="text-sm font-black text-slate-900 leading-snug mb-1">
                  The 2-Minute Halt Miracle: How Runner Delivery Works
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  How on-seat platform runners navigate coach doors in seconds.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs relative overflow-hidden">
                <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md mb-2 inline-block">
                  Coming Soon
                </span>
                <h4 className="text-sm font-black text-slate-900 leading-snug mb-1">
                  IRCTC Passenger Rights 2026: Free Food &amp; Refund Guide
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Official rules for delay meals, TDR refunds &amp; berth rights.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs relative overflow-hidden">
                <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md mb-2 inline-block">
                  Coming Soon
                </span>
                <h4 className="text-sm font-black text-slate-900 leading-snug mb-1">
                  Station Food Capital: Iconic Junction Sweets &amp; Meals
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Agra Petha, Mathura Peda &amp; Kanpur Poha delivered fresh.
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs transition-all"
          >
            <span>Back to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
