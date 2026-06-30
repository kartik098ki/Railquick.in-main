"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { ShieldCheck, ArrowLeft, Database, Eye, Lock, HardDrive, Cookie, ExternalLink, Mail } from "lucide-react";

export default function PrivacyPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-100 selection:text-emerald-900">
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
                  className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 text-slate-500 hover:text-slate-900 hover:bg-white/50"
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

            {/* Mobile Action Button */}
            <div className="md:hidden">
              <Link href="/#waitlist">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full px-3.5 h-8 text-[11px] font-bold shadow-md shadow-blue-500/10 active:scale-95 transition-all">
                  ⚡ Test Now
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
                  className={`flex-1 text-center py-2.5 px-1 rounded-full text-[11px] font-extrabold tracking-tight transition-all duration-300 ${item.href === '/privacy'
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

      {/* Header / Hero */}
      <section className="pt-40 pb-16 relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-slate-50/50 to-white text-slate-900 border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors text-sm font-semibold mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="inline-flex items-center justify-center p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-slate-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto">
            Effective Date: <span className="text-slate-900 font-semibold">June 24, 2026</span>
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-6 sm:p-10 lg:p-12 space-y-12 text-slate-700 leading-relaxed">
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 font-medium">
                RailQuick (&quot;RailQuick&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting the privacy of individuals who visit our website, web application, and participate in our pilot programs. This Privacy Policy describes how information is collected, used, stored, and protected when you access or interact with RailQuick.
              </p>
            </div>

            <hr className="border-slate-100" />

            {/* 1. Information We Collect */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                  <Database className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">1. Information We Collect</h2>
              </div>
              <p>We may collect information that you voluntarily provide, including:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Full Name",
                  "Mobile Number",
                  "Email Address",
                  "Train PNR Number",
                  "Coach and Seat Information",
                  "Boarding and Destination Details",
                  "Feedback and Support Requests"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-semibold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
              <p className="pt-2">We may also automatically collect:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "IP Address",
                  "Browser Information",
                  "Device Information",
                  "Website Usage Data",
                  "Cookies and Analytics Data"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm font-semibold text-slate-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Purpose of Collection */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                  <Eye className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">2. Purpose of Collection</h2>
              </div>
              <p>Information may be used for:</p>
              <ul className="space-y-3 pl-0 list-none">
                {[
                  "Managing pilot and beta testing programs",
                  "Coordinating test deliveries and service validation",
                  "Communicating product updates and announcements",
                  "Improving platform functionality and user experience",
                  "Fraud prevention and security monitoring",
                  "Compliance with applicable legal obligations"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 bg-emerald-50/30 border border-emerald-100/50 rounded-2xl p-4 text-sm sm:text-base">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Information Sharing */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">3. Information Sharing</h2>
              </div>
              <p className="font-semibold text-slate-900">
                RailQuick does not sell, rent, or trade personal information.
              </p>
              <p>Information may be shared only with:</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Delivery and operational partners involved in service fulfillment",
                  "Technology and hosting service providers",
                  "Analytics and communication providers",
                  "Government or regulatory authorities when legally required"
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm text-slate-700">
                    <span className="text-emerald-600 mr-2 font-bold">•</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Data Security */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">4. Data Security</h2>
              </div>
              <p>
                RailQuick implements reasonable administrative, technical, and organizational safeguards to protect information from unauthorized access, misuse, or disclosure.
              </p>
              <p className="bg-amber-50/50 border border-amber-100 rounded-2xl p-4 text-sm text-amber-800">
                <strong>Please Note:</strong> However, no internet-based service can guarantee absolute security.
              </p>
            </div>

            {/* 5. Data Retention */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                  <HardDrive className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">5. Data Retention</h2>
              </div>
              <p>
                Information will be retained only for as long as reasonably necessary to provide services, operate pilot programs, improve our platform, comply with legal obligations, or resolve disputes.
              </p>
            </div>

            {/* 6. Cookies */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                  <Cookie className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">6. Cookies</h2>
              </div>
              <p>
                We may use cookies and similar technologies to improve website functionality, understand user behavior, and enhance platform performance.
              </p>
            </div>

            {/* 7. Third-Party Services */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">7. Third-Party Services</h2>
              </div>
              <p>
                Our website may contain links to third-party services. RailQuick is not responsible for the privacy practices or content of such services.
              </p>
            </div>

            {/* 8. Changes to this Policy */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                  <Database className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">8. Changes to this Policy</h2>
              </div>
              <p>
                RailQuick reserves the right to modify this Privacy Policy at any time. Updated versions will be posted on this page with the revised effective date.
              </p>
            </div>

            {/* 9. Contact */}
            <div className="space-y-4 bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 text-slate-900 mb-2">
                <div className="p-2 bg-emerald-100 rounded-xl text-emerald-700">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold tracking-tight">9. Contact Us</h2>
              </div>
              <p>For privacy-related inquiries:</p>
              <div className="pt-2">
                <a href="mailto:contact@railquick.in" className="inline-flex items-center gap-3 p-4 bg-white border border-slate-200/65 rounded-2xl hover:border-emerald-400 hover:shadow-md transition-all group">
                  <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-semibold m-0">Email Support</p>
                    <p className="text-sm font-bold text-slate-800 m-0 group-hover:text-emerald-600 transition-colors">contact@railquick.in</p>
                  </div>
                </a>
              </div>
              <p className="text-sm text-slate-500 pt-6 text-center font-medium">
                By using RailQuick, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
