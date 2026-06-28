"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { FileText, ArrowLeft, Shield, CheckCircle, Scale, RefreshCw, Mail, Globe } from "lucide-react";

export default function TermsPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
                    className={`flex-1 text-center py-2.5 px-1 rounded-full text-[11px] font-extrabold tracking-tight transition-all duration-300 ${item.href === '/terms'
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
        </div>
      </nav>

      {/* Header / Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.15),transparent_50%)] pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-semibold mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400 mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
            Effective Date: <span className="text-white font-semibold">June 24, 2026</span>
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-6 sm:p-10 lg:p-12 space-y-12 text-slate-700 leading-relaxed">
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 font-medium">
                Welcome to RailQuick. These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of RailQuick&apos;s website, web application, pilot programs, waitlists, and related services (collectively, the &quot;Platform&quot;). By accessing or using RailQuick, you agree to be bound by these Terms.
              </p>
            </div>

            <hr className="border-slate-100" />

            {/* 1. About RailQuick */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <Shield className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">1. About RailQuick</h2>
              </div>
              <p>
                RailQuick is building a technology platform designed to simplify railway travel by enabling passengers to access essential products and services during their journey through verified partners and operational networks.
              </p>
              <p className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-sm text-slate-600 italic">
                At present, RailQuick is operating in a limited pilot and validation phase. Certain features and services may be experimental and subject to change.
              </p>
            </div>

            {/* 2. Use of the Platform */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">2. Use of the Platform</h2>
              </div>
              <p>Users agree to:</p>
              <ul className="grid sm:grid-cols-2 gap-3 pl-0 list-none">
                {[
                  "Provide accurate information when using RailQuick.",
                  "Use the Platform only for lawful purposes.",
                  "Submit correct journey details when participating in deliveries or pilot programs.",
                  "Respect the rights of other users, vendors, and delivery partners."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="pt-2 text-slate-900 font-semibold">Users must not:</p>
              <ul className="grid sm:grid-cols-2 gap-3 pl-0 list-none">
                {[
                  "Attempt to gain unauthorized access to the Platform.",
                  "Interfere with the operation or security of RailQuick.",
                  "Use false train, passenger, or contact information.",
                  "Engage in fraudulent, abusive, or harmful activities."
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 bg-red-50/30 border border-red-100/50 rounded-xl p-3 text-sm">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Pilot and Beta Services */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">3. Pilot and Beta Services</h2>
              </div>
              <p>
                RailQuick is currently conducting pilot operations and service validation. By participating in pilot programs, users acknowledge that:
              </p>
              <div className="space-y-3">
                {[
                  "Certain features may be under development.",
                  "Service areas may be limited.",
                  "Product availability may vary.",
                  "Delivery timelines are estimates and may depend on train schedules, station conditions, operational limitations, and vendor availability.",
                  "Features may be modified, suspended, or discontinued without prior notice."
                ].map((text, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      0{idx + 1}
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base m-0">{text}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500 pt-2">
                Our goal during this phase is to improve the platform and build a reliable service for railway passengers across India.
              </p>
            </div>

            {/* 4. Orders and Deliveries */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">4. Orders and Deliveries</h2>
              </div>
              <p>
                RailQuick works with verified vendors, partners, and operational teams to facilitate deliveries. While we strive to ensure a smooth experience, delivery times and product availability may occasionally be affected by factors beyond our control, including:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  "Train delays",
                  "Platform changes",
                  "Operational restrictions",
                  "Weather conditions",
                  "Vendor inventory limitations",
                  "Network or technical issues"
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center text-sm font-semibold text-slate-800">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Intellectual Property */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <Scale className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">5. Intellectual Property</h2>
              </div>
              <p>
                The RailQuick name, logo, designs, software, content, graphics, and technology are owned by RailQuick and protected under applicable intellectual property laws. No part of the Platform may be copied, reproduced, distributed, modified, or commercially exploited without prior written permission from RailQuick.
              </p>
            </div>

            {/* 6. Privacy */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <Shield className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">6. Privacy</h2>
              </div>
              <p>
                Your use of RailQuick is also governed by our{" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700 font-semibold underline underline-offset-4">
                  Privacy Policy
                </Link>
                . By using the Platform, you consent to the collection and use of information as described in the Privacy Policy.
              </p>
            </div>

            {/* 7. Limitation of Liability */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <Scale className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">7. Limitation of Liability</h2>
              </div>
              <p>
                To the fullest extent permitted under applicable law, RailQuick shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Use of the Platform",
                  "Service interruptions",
                  "Delivery delays",
                  "Technical errors",
                  "Third-party actions",
                  "Train schedule changes"
                ].map((item, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-800 text-xs px-3 py-1.5 rounded-full font-medium border border-slate-200/50">
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-sm text-slate-500">
                RailQuick&apos;s total liability, if any, shall be limited to the extent required under applicable law.
              </p>
            </div>

            {/* 8. Changes to the Platform */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">8. Changes to the Platform</h2>
              </div>
              <p>
                We are continuously improving RailQuick. We reserve the right to modify, update, suspend, or discontinue any part of the Platform, features, services, or pilot programs at any time without prior notice.
              </p>
            </div>

            {/* 9. Changes to These Terms */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">9. Changes to These Terms</h2>
              </div>
              <p>
                RailQuick may revise these Terms from time to time. Updated Terms will become effective upon publication on the Platform. Continued use of RailQuick after such updates constitutes acceptance of the revised Terms.
              </p>
            </div>

            {/* 10. Governing Law */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <Scale className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">10. Governing Law</h2>
              </div>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from the use of RailQuick shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.
              </p>
            </div>

            {/* 11. Contact Us */}
            <div className="space-y-4 bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 text-slate-900 mb-2">
                <div className="p-2 bg-blue-100 rounded-xl text-blue-700">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold tracking-tight">11. Contact Us</h2>
              </div>
              <p>For questions regarding these Terms:</p>
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <a href="mailto:support@railquick.in" className="flex items-center gap-3 p-4 bg-white border border-slate-200/65 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all group">
                  <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-semibold m-0">Email support</p>
                    <p className="text-sm font-bold text-slate-800 m-0 group-hover:text-blue-600 transition-colors">support@railquick.in</p>
                  </div>
                </a>
                <a href="https://railquick.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-white border border-slate-200/65 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all group">
                  <Globe className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500 font-semibold m-0">Official Website</p>
                    <p className="text-sm font-bold text-slate-800 m-0 group-hover:text-blue-600 transition-colors">railquick.in</p>
                  </div>
                </a>
              </div>
              <p className="text-sm text-slate-500 pt-4 text-center font-medium">
                Thank you for supporting RailQuick as we build the future of train travel convenience in India.
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
