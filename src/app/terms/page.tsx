"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, ArrowLeft, Shield, CheckCircle, Scale, RefreshCw, Mail, Globe } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* Header / Hero */}
      <section className="pt-40 pb-16 relative overflow-hidden bg-gradient-to-b from-blue-50/60 via-slate-50/50 to-white text-slate-900 border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.08),transparent_50%)] pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-semibold mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-slate-900 mb-4">
            Terms &amp; Conditions
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
                Welcome to RailQuick Private Limited. These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of RailQuick Private Limited&apos;s website, web application, pilot programs, waitlists, and related services (collectively, the &quot;Platform&quot;). By accessing or using RailQuick Private Limited, you agree to be bound by these Terms.
              </p>
            </div>

            <hr className="border-slate-100" />

            {/* 1. About RailQuick Private Limited */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <Shield className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">1. About RailQuick Private Limited</h2>
              </div>
              <p>
                RailQuick Private Limited is building a technology platform designed to simplify railway travel by enabling passengers to access essential products and services during their journey through verified partners and operational networks.
              </p>
              <p className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 text-sm text-slate-600 italic">
                At present, RailQuick Private Limited is operating in a limited pilot and validation phase. Certain features and services may be experimental and subject to change.
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
                  "Provide accurate information when using RailQuick Private Limited.",
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
                  "Interfere with the operation or security of RailQuick Private Limited.",
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
                RailQuick Private Limited is currently conducting pilot operations and service validation. By participating in pilot programs, users acknowledge that:
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
                RailQuick Private Limited works with verified vendors, partners, and operational teams to facilitate deliveries. While we strive to ensure a smooth experience, delivery times and product availability may occasionally be affected by factors beyond our control, including:
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
                The RailQuick Private Limited name, logo, designs, software, content, graphics, and technology are owned by RailQuick Private Limited and protected under applicable intellectual property laws. No part of the Platform may be copied, reproduced, distributed, modified, or commercially exploited without prior written permission from RailQuick Private Limited.
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
                Your use of RailQuick Private Limited is also governed by our{" "}
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
                To the fullest extent permitted under applicable law, RailQuick Private Limited shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:
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
                RailQuick Private Limited&apos;s total liability, if any, shall be limited to the extent required under applicable law.
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
                We are continuously improving RailQuick Private Limited. We reserve the right to modify, update, suspend, or discontinue any part of the Platform, features, services, or pilot programs at any time without prior notice.
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
                RailQuick Private Limited may revise these Terms from time to time. Updated Terms will become effective upon publication on the Platform. Continued use of RailQuick Private Limited after such updates constitutes acceptance of the revised Terms.
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
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from the use of RailQuick Private Limited shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.
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
                Thank you for supporting RailQuick Private Limited as we build the future of train travel convenience in India.
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
