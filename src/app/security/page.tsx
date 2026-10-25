"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  ArrowLeft,
  Lock,
  KeyRound,
  Shield,
  CreditCard,
  UserCheck,
  FileCheck,
  AlertTriangle,
  Mail,
  CheckCircle2,
  Server,
  EyeOff,
} from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-100 selection:text-slate-900">
      <Navbar />

      {/* Header / Hero */}
      <section className="pt-36 sm:pt-40 pb-12 sm:pb-16 relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-slate-50/60 to-white text-slate-900 border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.06),transparent_50%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="inline-flex items-center justify-center p-3.5 bg-blue-50 text-blue-600 rounded-2xl border border-blue-200/70 mb-5 shadow-2xs">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-slate-900 mb-3">
            Security &amp; Trust Policy
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto font-medium">
            RailQuick Private Limited • Built with Bank-Grade Security for Every Train Passenger
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
            <span>Last Updated:</span>
            <span className="font-bold text-slate-900">October 2026</span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40 p-6 sm:p-10 lg:p-12 space-y-12 text-slate-700 leading-relaxed">
            
            {/* Introduction */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-3">
                1. Our Commitment to Safety &amp; Trust
              </h2>
              <p className="text-slate-600 font-medium leading-relaxed">
                At RailQuick Private Limited (&quot;RailQuick&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;our&quot;), passenger safety, payment integrity, and data protection are foundational. Delivering essential items to passengers inside moving trains requires rigorous digital security combined with verified physical protocols. This Security Policy outlines the technical and operational safeguards implemented across our platform.
              </p>
            </div>

            {/* Payment & Financial Security */}
            <div className="pt-8 border-t border-slate-100">
              <div className="flex items-center gap-2.5 mb-3">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  2. Payment &amp; Financial Transaction Security
                </h2>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed mb-4">
                All financial transactions on RailQuick are processed through Reserve Bank of India (RBI) authorized and PCI-DSS Level 1 certified payment gateways.
              </p>
              <ul className="space-y-2.5 text-slate-600 text-sm sm:text-base font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span><strong>Zero Card Storage:</strong> RailQuick never stores, handles, or caches your credit card numbers, debit card details, CVVs, or NetBanking credentials on our servers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span><strong>Encrypted UPI Processing:</strong> UPI transactions are routed through NPCI-authorized secure intent flows, ensuring two-factor PIN verification on your native UPI app.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span><strong>Automated Instant Refunds:</strong> If a scheduled station halt handoff cannot be fulfilled due to unforeseen train delays or rescheduling, refunds are processed instantly via automated webhook reconciliations.</span>
                </li>
              </ul>
            </div>

            {/* PNR & Travel Data Privacy */}
            <div className="pt-8 border-t border-slate-100">
              <div className="flex items-center gap-2.5 mb-3">
                <EyeOff className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  3. PNR &amp; Passenger Travel Confidentiality
                </h2>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed mb-4">
                We believe your journey plans belong strictly to you. RailQuick enforces a strict zero-surveillance policy:
              </p>
              <ul className="space-y-2.5 text-slate-600 text-sm sm:text-base font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span><strong>No PNR Data Brokering:</strong> We never sell, rent, monetize, or share passenger PNR numbers, coach numbers, or travel itineraries with third-party advertisers or brokers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span><strong>Automated Telemetry Purge:</strong> Live train telemetry lookups and PNR coach verification data are kept only for the duration of the active delivery window and purged systematically post-journey.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span><strong>DPDP Act Compliance:</strong> All passenger records comply with the Digital Personal Data Protection (DPDP) Act, 2023, giving passengers the absolute right to erasure.</span>
                </li>
              </ul>
            </div>

            {/* Physical Station Runner Verification */}
            <div className="pt-8 border-t border-slate-100">
              <div className="flex items-center gap-2.5 mb-3">
                <UserCheck className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  4. Station Runner &amp; Berth Delivery Protocols
                </h2>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed mb-4">
                Physical security at railway platforms and coach doorways is strictly governed:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">Police &amp; Background Verification</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Every station delivery runner undergoes government photo ID and criminal background checks before receiving platform authorization badges.
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">Tamper-Evident Packaging</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Medicines, drinking water bottles, and travel essentials are handed over in sealed, tamper-evident security packaging with printed serial seals.
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">Berth Handoff Verification</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Deliveries are handed over strictly at the coach door / berth matching the confirmed passenger PNR or order token to prevent misplacement.
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 mb-1">Zero Platform Disruption</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Runners adhere strictly to Railway Protection Force (RPF) platform regulations, ensuring smooth passenger movement and train departures.
                  </p>
                </div>
              </div>
            </div>

            {/* Infrastructure & Network Security */}
            <div className="pt-8 border-t border-slate-100">
              <div className="flex items-center gap-2.5 mb-3">
                <Server className="w-5 h-5 text-amber-600" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  5. Infrastructure, Encryption &amp; Cloud Safeguards
                </h2>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed mb-4">
                RailQuick infrastructure is hosted on ISO 27001, SOC 2 Type II compliant cloud providers with continuous automated security audits:
              </p>
              <ul className="space-y-2.5 text-slate-600 text-sm sm:text-base font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span><strong>End-to-End Encryption:</strong> All platform traffic is encrypted in transit using TLS 1.3 with HSTS (HTTP Strict Transport Security) and encrypted at rest with AES-256.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span><strong>DDoS &amp; Bot Protection:</strong> High-capacity edge web application firewalls (WAF) inspect requests to mitigate brute-force and scraping attempts.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span><strong>Role-Based Access Control (RBAC):</strong> Internal access to support consoles operates under strict least-privilege principles with mandatory multi-factor authentication (MFA).</span>
                </li>
              </ul>
            </div>

            {/* Vulnerability Disclosure */}
            <div className="pt-8 border-t border-slate-100">
              <div className="flex items-center gap-2.5 mb-3">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  6. Vulnerability Disclosure &amp; Bug Reporting
                </h2>
              </div>
              <p className="text-slate-600 font-medium leading-relaxed mb-4">
                We welcome responsible disclosures from ethical security researchers. If you identify a potential security vulnerability across RailQuick systems, please notify our security response team:
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block">Security Response Contact</span>
                  <span className="text-sm sm:text-base font-black text-slate-900">contact@railquick.in / security@railquick.in</span>
                </div>
                <a
                  href="mailto:contact@railquick.in?subject=Security%20Vulnerability%20Report"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shrink-0 shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Report Vulnerability</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
