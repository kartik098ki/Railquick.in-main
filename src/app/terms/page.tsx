"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  FileText,
  ArrowLeft,
  Shield,
  CheckCircle,
  AlertTriangle,
  Scale,
  RefreshCw,
  Mail,
  ExternalLink,
  Store,
  Layers,
  Lock,
  Compass,
  FileCheck,
} from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-100 selection:text-slate-900">
      <Navbar />

      {/* Header / Hero */}
      <section className="pt-36 sm:pt-40 pb-12 sm:pb-16 relative overflow-hidden bg-gradient-to-b from-amber-50/40 via-slate-50/50 to-white text-slate-900 border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.06),transparent_50%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 transition-colors text-sm font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="inline-flex items-center justify-center p-3 bg-amber-50 text-amber-700 rounded-2xl border border-amber-200/60 mb-5 shadow-2xs">
            <FileText className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-slate-900 mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto font-medium">
            Last Updated: <span className="text-slate-900 font-semibold">11 October 2026</span>
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40 p-6 sm:p-10 lg:p-12 space-y-10 text-slate-700 leading-relaxed">
            {/* Preamble */}
            <div className="prose prose-slate max-w-none">
              <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
                Welcome to RailQuick Private Limited (&quot;RailQuick&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;).
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                These Terms &amp; Conditions govern your access to and use of the RailQuick website, web application, PNR checking feature, train search services, vendor registration facilities, waitlists, pilot programs, and related services (collectively, the &quot;Platform&quot;).
              </p>
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-sm text-amber-950 font-medium">
                By accessing or using the Platform, you agree to these Terms. If you do not agree, please discontinue using the relevant services.
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Quick jump menu */}
            <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-5">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Table of Contents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                <a href="#section-1" className="hover:text-amber-700 transition-colors">1. About RailQuick Private Limited</a>
                <a href="#section-2" className="hover:text-amber-700 transition-colors">2. Eligibility and Acceptable Use</a>
                <a href="#section-3" className="hover:text-amber-700 transition-colors">3. PNR Status &amp; Train Info Services</a>
                <a href="#section-4" className="hover:text-amber-700 transition-colors">4. Pilot and Beta Services</a>
                <a href="#section-5" className="hover:text-amber-700 transition-colors">5. Orders, Products, and Deliveries</a>
                <a href="#section-6" className="hover:text-amber-700 transition-colors">6. Become a Vendor</a>
                <a href="#section-7" className="hover:text-amber-700 transition-colors">7. Intellectual Property</a>
                <a href="#section-8" className="hover:text-amber-700 transition-colors">8. Privacy and Personal Information</a>
                <a href="#section-9" className="hover:text-amber-700 transition-colors">9. Third-Party Services</a>
                <a href="#section-10" className="hover:text-amber-700 transition-colors">10. Limitation of Liability</a>
                <a href="#section-11" className="hover:text-amber-700 transition-colors">11. Suspension and Termination</a>
                <a href="#section-12" className="hover:text-amber-700 transition-colors">12. Changes to Platform &amp; Terms</a>
                <a href="#section-13" className="hover:text-amber-700 transition-colors">13. Governing Law &amp; Jurisdiction</a>
                <a href="#section-14" className="hover:text-amber-700 transition-colors">14. Contact Us</a>
              </div>
            </div>

            {/* 1. About RailQuick Private Limited */}
            <div id="section-1" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
                  <Shield className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">1. About RailQuick Private Limited</h2>
              </div>
              <p>
                RailQuick Private Limited is an Indian technology company developing a platform to make railway journeys more convenient by connecting passengers with essential products and services through vendors and operational partners.
              </p>
              <p className="font-semibold text-slate-800">Our Platform currently includes or may include:</p>
              <ul className="grid sm:grid-cols-2 gap-2.5 list-none pl-0">
                {[
                  "PNR status checking and journey information.",
                  "Train search and train information services.",
                  "Essential-product ordering and delivery services.",
                  "Vendor registration and partnership opportunities.",
                  "Waitlists, pilot programs, and related digital services.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-3 bg-slate-50 border border-slate-200/60 rounded-xl text-sm">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl text-sm text-slate-600 italic">
                RailQuick is currently developing and validating its services through limited pilot operations. The availability, features, and geographical coverage of individual services may change as the Platform develops.
              </p>
            </div>

            {/* 2. Eligibility and Acceptable Use */}
            <div id="section-2" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">2. Eligibility and Acceptable Use</h2>
              </div>
              <p>
                You agree to use RailQuick only for lawful purposes and to provide accurate information when using our services.
              </p>
              <p className="font-semibold text-slate-900 pt-1">You must not:</p>
              <ul className="grid sm:grid-cols-2 gap-2.5 list-none pl-0">
                {[
                  "Submit false, misleading, or fraudulent information.",
                  "Misuse another person's PNR or personal information.",
                  "Attempt unauthorized access to our systems, APIs, or databases.",
                  "Interfere with the security or proper functioning of the Platform.",
                  "Use automated tools to extract or collect Platform information without authorization.",
                  "Use RailQuick for unlawful activities or activities that infringe another person's rights.",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-3 bg-red-50/40 border border-red-200/50 rounded-xl text-sm">
                    <span className="text-red-500 font-bold">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-slate-600">
                We may restrict access where we reasonably believe that a user has violated these Terms or applicable law.
              </p>
            </div>

            {/* 3. PNR Status and Train Information Services */}
            <div id="section-3" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
                  <Compass className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">3. PNR Status and Train Information Services</h2>
              </div>
              <p>
                RailQuick provides a facility through which users can enter a PNR number to retrieve available booking and journey information. Users may also search for trains and access available train-related information.
              </p>

              {/* 3.1 Third-Party API Provider */}
              <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-2">
                <h3 className="font-bold text-slate-900 text-base">3.1 Third-Party API Provider</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To provide these features, RailQuick integrates with <strong>RailKit (railkit.in)</strong>, an independent railway data API and software development platform.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Depending on the feature used, RailKit provides API functionality for retrieving PNR status, train details, train searches, and other railway-related information.
                </p>
                <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs sm:text-sm text-amber-950">
                  RailKit is not the official IRCTC API. RailQuick&apos;s use of RailKit does not imply any official partnership, authorization, endorsement, or affiliation with Indian Railways, IRCTC, or any railway authority.
                </div>
              </div>

              {/* 3.2 Accuracy and Availability */}
              <div className="space-y-2 pt-2">
                <h3 className="font-bold text-slate-900 text-base">3.2 Accuracy and Availability of Information</h3>
                <p className="text-sm text-slate-600">
                  RailQuick makes reasonable efforts to display the information returned by its data providers correctly. However, the availability and accuracy of information depend partly on the underlying data sources and external systems. Accordingly:
                </p>
                <ul className="space-y-2 text-sm text-slate-600 list-disc pl-5">
                  <li>PNR status and booking information may be unavailable, incomplete, delayed, or subject to change.</li>
                  <li>Train names, train numbers, routes, station details, schedules, and running information may not always reflect the latest railway updates.</li>
                  <li>Third-party APIs may experience downtime, rate limits, technical failures, or changes in their services.</li>
                  <li>Search results may not include every possible train or journey option.</li>
                  <li>Information displayed by RailQuick should not be treated as a guarantee of ticket confirmation, train operation, departure time, arrival time, or seat availability.</li>
                </ul>
                <p className="text-sm text-slate-600">
                  We aim to display information corresponding to the PNR, train number, or search details submitted by the user. However, we cannot guarantee error-free results in every situation.
                </p>
              </div>

              {/* 3.3 User Responsibility */}
              <div className="space-y-2 pt-2">
                <h3 className="font-bold text-slate-900 text-base">3.3 User Responsibility</h3>
                <ul className="space-y-1.5 text-sm text-slate-600 list-disc pl-5">
                  <li>Users are responsible for entering the correct PNR number, train number, journey date, and other requested details.</li>
                  <li>Before making travel decisions, users should verify important information through official railway channels.</li>
                  <li>RailQuick does not issue railway tickets or independently determine official reservation status through this information feature. Unless expressly stated otherwise, the feature is intended for informational convenience only.</li>
                </ul>
              </div>
            </div>

            {/* 4. Pilot and Beta Services */}
            <div id="section-4" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">4. Pilot and Beta Services</h2>
              </div>
              <p>RailQuick may operate certain services in a pilot, testing, or validation phase. During this period:</p>
              <ul className="space-y-2 text-sm text-slate-600 list-disc pl-5">
                <li>Some features may be experimental or under development.</li>
                <li>Services may be available only on selected routes, stations, or geographical areas.</li>
                <li>Product availability may depend on participating vendors and operational arrangements.</li>
                <li>Delivery estimates may change because of train delays, station conditions, or other operational factors.</li>
                <li>Features may be updated, temporarily suspended, or discontinued.</li>
              </ul>
              <p className="text-sm text-slate-600">
                We will make reasonable efforts to communicate material service changes where appropriate. Please also review our dedicated{" "}
                <Link href="/pilot-terms" className="text-amber-700 hover:underline font-semibold">
                  Pilot Program Terms
                </Link>
                .
              </p>
            </div>

            {/* 5. Orders, Products, and Deliveries */}
            <div id="section-5" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
                  <Layers className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">5. Orders, Products, and Deliveries</h2>
              </div>
              <p>
                RailQuick facilitates access to essential products through participating vendors and operational partners. Product availability, prices, delivery arrangements, and applicable conditions may vary by location, vendor, and service.
              </p>
              <p className="text-sm font-semibold text-slate-900">Delivery may be affected by circumstances including:</p>
              <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-600">
                {[
                  "Train delays or cancellations.",
                  "Platform or station changes.",
                  "Railway security and operational restrictions.",
                  "Vendor inventory or availability.",
                  "Weather conditions.",
                  "Network failures or technical issues.",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200/50 rounded-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-600">
                An order confirmation or estimated delivery time does not guarantee that delivery will be possible in every circumstance. Where an order cannot be fulfilled, any applicable cancellation, refund, or alternative arrangement will be handled in accordance with the relevant order terms and applicable law.
              </p>
            </div>

            {/* 6. Become a Vendor */}
            <div id="section-6" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
                  <Store className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">6. Become a Vendor</h2>
              </div>
              <p>
                RailQuick may allow eligible businesses, retailers, local sellers, and other prospective partners to submit applications to become vendors. Submitting an application does not automatically establish a vendor partnership or guarantee approval.
              </p>
              <p className="text-sm font-semibold text-slate-900">Applicants agree to:</p>
              <ul className="space-y-1.5 text-sm text-slate-600 list-disc pl-5">
                <li>Provide accurate business and contact information.</li>
                <li>Submit genuine documents requested for verification.</li>
                <li>Maintain all licences, registrations, and permissions required for their activities.</li>
                <li>Provide lawful, genuine, safe, and accurately described products.</li>
                <li>Ensure that product prices, availability, and business information are accurate.</li>
                <li>Comply with applicable laws, railway requirements, and RailQuick&apos;s operational policies.</li>
              </ul>
              <p className="text-sm text-slate-600">
                RailQuick may review applications and request additional information before making an onboarding decision. Subject to applicable law and any applicable agreement, RailQuick may reject an application, suspend vendor access, or terminate a vendor relationship where there are legitimate operational, compliance, safety, or fraud-related concerns.
              </p>
              <p className="text-sm text-slate-600">
                Vendor commissions, payment terms, fulfilment responsibilities, service standards, and other commercial conditions may be set out in a separate Vendor Agreement. Submitting a vendor application does not guarantee sales, revenue, customer demand, or a minimum number of orders.
              </p>
            </div>

            {/* 7. Intellectual Property */}
            <div id="section-7" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">7. Intellectual Property</h2>
              </div>
              <p>
                The RailQuick name, logo, branding, website design, software, original content, and other proprietary materials are owned by RailQuick Private Limited or used under applicable permissions.
              </p>
              <p className="text-sm text-slate-600">
                You may not reproduce, distribute, modify, commercially exploit, or otherwise use these materials without authorization, except where permitted by applicable law. Third-party names, trademarks, software, and services remain the property of their respective owners.
              </p>
            </div>

            {/* 8. Privacy and Personal Information */}
            <div id="section-8" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">8. Privacy and Personal Information</h2>
              </div>
              <p>
                Your use of RailQuick is also governed by our Privacy Policy:{" "}
                <Link href="/privacy" className="text-amber-700 hover:underline font-semibold">
                  https://www.railquick.in/privacy
                </Link>
              </p>
              <p className="text-sm text-slate-600">
                Depending on the services you use, RailQuick may process information such as:
              </p>
              <ul className="space-y-1.5 text-sm text-slate-600 list-disc pl-5">
                <li>PNR numbers and journey-related information submitted for a lookup.</li>
                <li>Contact and account information.</li>
                <li>Order and delivery details.</li>
                <li>Vendor application and business information.</li>
                <li>Technical information required to operate and secure the Platform.</li>
              </ul>
              <p className="text-sm text-slate-600">
                Information may be processed by relevant service providers where necessary to provide the requested functionality, subject to applicable privacy requirements and our Privacy Policy. Please review our Privacy Policy for details about information collection, use, sharing, retention, and applicable user rights.
              </p>
            </div>

            {/* 9. Third-Party Services */}
            <div id="section-9" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">9. Third-Party Services</h2>
              </div>
              <p>
                Certain Platform features depend on third-party providers, APIs, infrastructure, or external services. RailQuick does not control all aspects of these services and cannot guarantee their continuous availability, performance, or accuracy.
              </p>
              <p className="text-sm text-slate-600">
                Third-party services may be subject to their own terms, policies, and technical limitations. Our use of a third-party service does not imply that RailQuick owns, operates, or officially represents that service.
              </p>
            </div>

            {/* 10. Limitation of Liability */}
            <div id="section-10" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">10. Limitation of Liability</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                To the fullest extent permitted under applicable law, RailQuick shall not be liable for indirect, incidental, special, or consequential losses arising from the use of the Platform, including losses associated with:
              </p>
              <ul className="space-y-1.5 text-sm text-slate-600 list-disc pl-5">
                <li>Temporary service interruptions.</li>
                <li>Unavailable or inaccurate third-party railway information.</li>
                <li>Train delays, cancellations, or schedule changes.</li>
                <li>Vendor stock limitations or delivery difficulties.</li>
                <li>Third-party service failures.</li>
                <li>Unauthorised actions by third parties beyond our reasonable control.</li>
              </ul>
              <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl text-xs sm:text-sm text-slate-700">
                Nothing in these Terms excludes or limits any liability, consumer right, or remedy that cannot lawfully be excluded or limited. Any other limitation of liability shall apply only to the extent permitted by applicable law.
              </div>
            </div>

            {/* 11. Suspension and Termination */}
            <div id="section-11" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
                  <Scale className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">11. Suspension and Termination</h2>
              </div>
              <p className="text-sm text-slate-600">
                We may restrict or suspend access to specific features where necessary for security, maintenance, fraud prevention, legal compliance, or operational reasons. Where appropriate and legally required, we will provide notice or an opportunity to resolve the issue.
              </p>
              <p className="text-sm text-slate-600">
                Users may stop using the Platform at any time. Ending access to the Platform does not remove rights or obligations that have already arisen under applicable law or a separate agreement.
              </p>
            </div>

            {/* 12. Changes to the Platform and These Terms */}
            <div id="section-12" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">12. Changes to the Platform and These Terms</h2>
              </div>
              <p className="text-sm text-slate-600">
                RailQuick may update its services, features, and these Terms as the Platform develops.
              </p>
              <p className="text-sm text-slate-600">
                Revised Terms will be published on the Platform with an updated revision date. Where required by law, we will provide appropriate notice or obtain any necessary consent. Your continued use of the Platform after an update will constitute acceptance only where such acceptance is legally effective.
              </p>
            </div>

            {/* 13. Governing Law and Jurisdiction */}
            <div id="section-13" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
                  <Scale className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">13. Governing Law and Jurisdiction</h2>
              </div>
              <p className="text-sm text-slate-600">
                These Terms shall be governed by the laws of India.
              </p>
              <p className="text-sm text-slate-600">
                Subject to applicable law, disputes arising from these Terms shall be brought before the competent courts in New Delhi, India. Nothing in this section restricts any consumer&apos;s right to approach a forum or authority that has jurisdiction under applicable law.
              </p>
            </div>

            {/* 14. Contact Us */}
            <div id="section-14" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-amber-50 rounded-xl text-amber-700">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">14. Contact Us</h2>
              </div>
              <p className="text-sm text-slate-600">
                For questions, concerns, or requests regarding these Terms, please contact:
              </p>
              <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 space-y-2 text-sm text-slate-700">
                <p><strong>Company:</strong> RailQuick Private Limited</p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:support@railquick.in" className="text-amber-700 hover:underline font-semibold">
                    support@railquick.in
                  </a>
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a href="https://railquick.in/" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline font-semibold">
                    https://railquick.in/
                  </a>
                </p>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 pt-2 italic">
                Thank you for choosing RailQuick as we work towards making railway journeys more convenient for passengers across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
