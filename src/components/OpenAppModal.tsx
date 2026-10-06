"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Mail, MapPin, Loader2, ArrowRight, X, Sparkles } from "lucide-react";

interface OpenAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
  defaultCity?: string;
}

export default function OpenAppModal({
  isOpen,
  onClose,
  defaultEmail = "",
  defaultCity = "",
}: OpenAppModalProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [city, setCity] = useState(defaultCity);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<"form" | "connecting">("form");
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !city) {
      toast({
        title: "Validation Required",
        description: "Please provide both your email address and current location.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Send data to Supabase first via /api/waitlist
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, city }),
      });

      const resData = await response.json().catch(() => ({}));

      if (!response.ok || resData.success !== true) {
        throw new Error(resData.message || "Failed to record data in Supabase.");
      }

      // 2. Data collected in Supabase successfully -> Start visual connection progress
      setStep("connecting");
      setProgress(0);

      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 10;
        setProgress(currentProgress);

        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onClose();
            setIsSubmitting(false);
            setStep("form");
            setProgress(0);
            // 3. Open actual app website after data collection
            window.location.href = "https://www.railquickapp.com";
          }, 300);
        }
      }, 70);
    } catch (err: any) {
      console.error("Open App submission error:", err);
      toast({
        title: "Submission Notice",
        description: err.message || "Proceeding to app...",
        variant: "destructive",
      });
      // Fallback redirect if network error
      window.location.href = "https://www.railquickapp.com";
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 z-10 overflow-y-auto max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>

            {step === "form" ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                    Access RailQuick App
                  </h3>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed mt-1.5 font-medium">
                    Enter your email and location to connect to the live app.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block pl-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full h-13 pl-12 pr-4 bg-slate-50/50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 placeholder-slate-400 outline-none text-base font-semibold shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block pl-1">
                      Current Location / City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. New Delhi"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        disabled={isSubmitting}
                        className="w-full h-13 pl-12 pr-4 bg-slate-50/50 border border-slate-200/80 rounded-2xl focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 placeholder-slate-400 outline-none text-base font-semibold shadow-xs"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-13 mt-6 bg-slate-950 hover:bg-slate-900 text-white rounded-2xl font-bold text-base transition-all duration-300 shadow-lg shadow-slate-950/15 hover:shadow-xl active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-white" /> Saving to Supabase...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2 group">
                        Open Live App <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                <p className="text-xs text-slate-500 font-medium">Data collected in Supabase successfully!</p>

                {/* Progress bar */}
                <div className="flex flex-col items-center mt-5 w-full">
                  <div className="flex justify-between text-xs text-slate-400 font-bold w-56 mb-1.5">
                    <span>
                      {progress < 40
                        ? "Saved in Supabase"
                        : progress >= 40 && progress < 80
                        ? "Opening web app..."
                        : "Redirecting..."}
                    </span>
                    <span className="text-blue-600 font-black">{progress}%</span>
                  </div>
                  <div className="w-56 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/50">
                    <motion.div
                      animate={{ width: `${progress}%` }}
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
  );
}
