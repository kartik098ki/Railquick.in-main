"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Building2, User, Phone, Mail, MapPin, Train, Package, FileText, CheckCircle2, Loader2, X } from "lucide-react";

import OpenAppModal from "@/components/OpenAppModal";
import CheckPnrModal from "@/components/CheckPnrModal";
import TicketPnrButton from "@/components/TicketPnrButton";
import Navbar from "@/components/Navbar";

export default function PartnerPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showOpenAppModal, setShowOpenAppModal] = useState(false);
  const [showCheckPnrModal, setShowCheckPnrModal] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    mobileNumber: "",
    email: "",
    city: "",
    railwayStation: "",
    productCategories: "",
    shortDescription: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let isSuccess = false;

    // 1. Dual-store into Supabase via /api/vendors (Required)
    try {
      const supResponse = await fetch("/api/vendors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.ownerName || formData.businessName,
          email: formData.email,
          phone: formData.mobileNumber,
          city: formData.city,
          isIrctcTender: false,
          inquiry: `[Partner Form] Business: ${formData.businessName}, Station: ${formData.railwayStation}, Categories: ${formData.productCategories}, Description: ${formData.shortDescription}`
        }),
      });

      if (supResponse.ok) {
        const supData = await supResponse.json().catch(() => ({}));
        if (supData.success === true) {
          isSuccess = true;
        }
      }
    } catch (supErr) {
      console.warn("Supabase submission error:", supErr);
    }

    // 2. Backup to Google Sheet via SheetDB
    try {
      await fetch("https://sheetdb.io/api/v1/fix2tdq007q3o", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [
            {
              businessName: formData.businessName,
              ownerName: formData.ownerName,
              mobileNumber: formData.mobileNumber,
              email: formData.email,
              city: formData.city,
              railwayStation: formData.railwayStation,
              productCategories: formData.productCategories,
              shortDescription: formData.shortDescription,
              timestamp: new Date().toISOString(),
            }
          ]
        }),
      });
    } catch (sheetErr) {
      console.warn("SheetDB submission warning:", sheetErr);
    }

    if (isSuccess) {
      setShowSuccessModal(true);
      setFormData({
        businessName: "",
        ownerName: "",
        mobileNumber: "",
        email: "",
        city: "",
        railwayStation: "",
        productCategories: "",
        shortDescription: ""
      });
    } else {
      toast.error("Failed to submit application. Please try again.");
    }

    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      <OpenAppModal isOpen={showOpenAppModal} onClose={() => setShowOpenAppModal(false)} />
      <CheckPnrModal isOpen={showCheckPnrModal} onClose={() => setShowCheckPnrModal(false)} />

      {/* Unified Navbar */}
      <Navbar onOpenPnrModal={() => setShowCheckPnrModal(true)} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/40 via-slate-50 to-slate-50 -z-10" />
        
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider mb-6 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Partnership Program
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6">
              Partner With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">RailQuick</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
              We are launching soon. If you want to sell your products through RailQuick and become one of our launch partners, reach out to us by filling out the form below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xl shadow-slate-200/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Business Name</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <Input
                      required
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Your Business Name"
                      className="pl-10 h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Owner Name</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <Input
                      required
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="Full Name"
                      className="pl-10 h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Mobile Number</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <Input
                      required
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="+91"
                      className="pl-10 h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <Input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="pl-10 h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">City</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <Input
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Your City"
                      className="pl-10 h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Railway Station (Nearest)</label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Train className="w-4 h-4" />
                    </div>
                    <Input
                      required
                      name="railwayStation"
                      value={formData.railwayStation}
                      onChange={handleChange}
                      placeholder="e.g. New Delhi (NDLS)"
                      className="pl-10 h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Product Categories</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Package className="w-4 h-4" />
                  </div>
                  <Input
                    required
                    name="productCategories"
                    value={formData.productCategories}
                    onChange={handleChange}
                    placeholder="e.g. Snacks, Electronics, Medicines"
                    className="pl-10 h-12 rounded-2xl bg-slate-50/50 border-slate-200 focus-visible:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Short Description</label>
                <div className="relative">
                  <div className="absolute left-3.5 top-4 text-slate-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <textarea
                    required
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us a bit about your products and business..."
                    className="w-full pl-10 py-3 rounded-2xl bg-slate-50/50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 sm:h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-extrabold text-base shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" /> Submitting Application...
                  </span>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Premium Success Popup Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSuccessModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-2xl border border-slate-100 text-center z-10 overflow-hidden"
            >
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-3 sm:mb-5 shadow-inner">
                <CheckCircle2 className="w-7 h-7 sm:w-9 sm:h-9 stroke-[2.5]" />
              </div>

              <span className="inline-block px-2.5 sm:px-3.5 py-0.5 sm:py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] sm:text-xs font-black rounded-full uppercase tracking-wider mb-2 sm:mb-3">
                ✅ Application Received Successfully
              </span>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-1.5 sm:mb-2">
                🎉 Application Submitted Successfully!
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6 font-medium">
                Thank you for applying to partner with RailQuick. Our team will review your application and contact you shortly.
              </p>

              <Button
                onClick={() => setShowSuccessModal(false)}
                className="w-full h-10 sm:h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl sm:rounded-2xl font-bold shadow-lg shadow-slate-900/20 text-xs sm:text-sm"
              >
                Done
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
