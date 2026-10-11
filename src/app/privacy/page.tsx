"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShieldCheck,
  ArrowLeft,
  Database,
  Lock,
  Cookie,
  ExternalLink,
  Mail,
  UserCheck,
  Eye,
  Building,
  KeyRound,
  FileQuestion,
  RefreshCw,
  AlertCircle,
  FileText,
  Compass,
} from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-100 selection:text-slate-900">
      <Navbar />

      {/* Header / Hero */}
      <section className="pt-36 sm:pt-40 pb-12 sm:pb-16 relative overflow-hidden bg-gradient-to-b from-emerald-50/40 via-slate-50/50 to-white text-slate-900 border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.06),transparent_50%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-800 transition-colors text-sm font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="inline-flex items-center justify-center p-3 bg-emerald-50 text-emerald-700 rounded-2xl border border-emerald-200/60 mb-5 shadow-2xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-slate-900 mb-3">
            Privacy Policy
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
                RailQuick Private Limited (&quot;RailQuick&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting the privacy of individuals who access or use our website, web application, PNR and train information services, vendor registration facilities, pilot programs, and related services (collectively, the &quot;Platform&quot;).
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                This Privacy Policy explains what information we may collect, why we collect it, how it may be used, how it may be shared, and the measures we take to protect it.
              </p>
              <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-sm text-emerald-950 font-medium">
                By using RailQuick, you acknowledge that you have read and understood this Privacy Policy.
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Quick jump menu */}
            <div className="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-5">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Table of Contents</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                <a href="#sec-1" className="hover:text-emerald-700 transition-colors">1. Information We Collect</a>
                <a href="#sec-2" className="hover:text-emerald-700 transition-colors">2. PNR and Train Information</a>
                <a href="#sec-3" className="hover:text-emerald-700 transition-colors">3. Vendor Registration Information</a>
                <a href="#sec-4" className="hover:text-emerald-700 transition-colors">4. How We Use Information</a>
                <a href="#sec-5" className="hover:text-emerald-700 transition-colors">5. Information Sharing</a>
                <a href="#sec-6" className="hover:text-emerald-700 transition-colors">6. Third-Party Services and APIs</a>
                <a href="#sec-7" className="hover:text-emerald-700 transition-colors">7. Data Security</a>
                <a href="#sec-8" className="hover:text-emerald-700 transition-colors">8. Data Retention</a>
                <a href="#sec-9" className="hover:text-emerald-700 transition-colors">9. Cookies &amp; Similar Tech</a>
                <a href="#sec-10" className="hover:text-emerald-700 transition-colors">10. Children&apos;s Privacy</a>
                <a href="#sec-11" className="hover:text-emerald-700 transition-colors">11. User Responsibility</a>
                <a href="#sec-12" className="hover:text-emerald-700 transition-colors">12. Links to Third-Party Websites</a>
                <a href="#sec-13" className="hover:text-emerald-700 transition-colors">13. Data Breaches &amp; Security</a>
                <a href="#sec-14" className="hover:text-emerald-700 transition-colors">14. Privacy Choices &amp; Rights</a>
                <a href="#sec-15" className="hover:text-emerald-700 transition-colors">15. Changes to This Privacy Policy</a>
                <a href="#sec-16" className="hover:text-emerald-700 transition-colors">16. Contact Us</a>
              </div>
            </div>

            {/* 1. Information We Collect */}
            <div id="sec-1" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <Database className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">1. Information We Collect</h2>
              </div>
              <p>Depending on how you use RailQuick, we may collect different types of information.</p>

              <div className="space-y-3 pt-2">
                <h3 className="font-bold text-slate-900 text-base">1.1 Information You Provide</h3>
                <p className="text-sm text-slate-600">You may voluntarily provide information such as:</p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
                  {[
                    "Full Name",
                    "Mobile Number",
                    "Email Address",
                    "PNR Number",
                    "Train Number or Train Details",
                    "Coach and Seat Information",
                    "Boarding Station and Destination",
                    "Journey Date",
                    "Delivery Address or Delivery Location",
                    "Order Details",
                    "Feedback and Support Requests",
                    "Vendor or Business Information",
                    "Information submitted through \"Become a Vendor\" application",
                    "Documents provided during vendor verification, where applicable",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200/60 rounded-xl">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 italic">You should only provide information that you are authorized to provide.</p>
              </div>

              <div className="space-y-3 pt-4">
                <h3 className="font-bold text-slate-900 text-base">1.2 Information Collected Automatically</h3>
                <p className="text-sm text-slate-600">When you access the Platform, certain technical information may automatically be collected, including:</p>
                <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
                  {[
                    "IP Address",
                    "Browser Type and Version",
                    "Device Type",
                    "Operating System",
                    "Approximate location derived from technical data",
                    "Website usage information",
                    "Pages or features accessed",
                    "Referral information",
                    "Cookies and similar technologies",
                    "Diagnostic, security, and performance information",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200/60 rounded-xl">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. PNR and Train Information */}
            <div id="sec-2" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <Compass className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">2. PNR and Train Information</h2>
              </div>
              <p className="text-sm text-slate-600">
                RailQuick provides features that allow users to check PNR status, search for trains, and access available train-related information. When you use these features, you may provide information such as your:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700 list-none pl-0">
                {["PNR Number", "Train Number", "Journey Date", "Boarding or Destination Station", "Search parameters"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-2">
                <h3 className="font-bold text-slate-900 text-base">Third-Party Railway Data Provider</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  RailQuick uses <strong>RailKit (railkit.in)</strong> as a third-party API service for certain railway information functionality, including PNR-related information and train search/data services.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  When a user requests information through a feature that uses the RailKit API, relevant information may be transmitted to or processed through RailKit or its underlying systems to fulfil that request.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  RailKit is an independent third-party service provider. RailQuick does not operate or control RailKit&apos;s systems. RailQuick&apos;s use of RailKit does not mean that RailQuick is officially affiliated with, endorsed by, or operated by Indian Railways or IRCTC.
                </p>
                <p className="text-xs text-slate-500">
                  For information about how RailKit handles data, users should also review the applicable terms and privacy practices of the relevant third-party service.
                </p>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-1.5 text-xs sm:text-sm text-emerald-950 font-medium">
                <p className="font-bold">Important Privacy Notice regarding PNR Data:</p>
                <p>
                  RailQuick does not use PNR information for purposes unrelated to providing or improving the requested railway information service, except where necessary for security, legal compliance, fraud prevention, or other purposes described in this Privacy Policy.
                </p>
                <p>
                  Where technically feasible and appropriate, RailQuick may minimize the amount of personal information retained after a requested lookup has been completed.
                </p>
              </div>
            </div>

            {/* 3. Information Collected Through Vendor Registration */}
            <div id="sec-3" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <Building className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">3. Information Collected Through Vendor Registration</h2>
              </div>
              <p className="text-sm text-slate-600">
                If you choose to apply to become a RailQuick vendor, we may collect information required to evaluate and manage your application, including:
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700 list-none pl-0">
                {[
                  "Name",
                  "Mobile Number",
                  "Email Address",
                  "Business or shop name",
                  "Business address",
                  "Station or service location",
                  "Product or service information",
                  "Bank or payment information where required for commercial relationship",
                  "Business registration or verification information",
                  "Documents submitted for verification",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-slate-600">
                Vendor information may be used to verify eligibility, communicate regarding the application, establish a vendor relationship, manage operations, process payments where applicable, prevent fraud, and comply with legal requirements. Submitting a vendor application does not guarantee approval.
              </p>
            </div>

            {/* 4. How We Use Information */}
            <div id="sec-4" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <Eye className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">4. How We Use Information</h2>
              </div>
              <p className="text-sm text-slate-600">RailQuick may use collected information for purposes including:</p>
              <div className="grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
                {[
                  "Providing PNR and train information requested by users.",
                  "Providing train search and related railway information.",
                  "Processing and coordinating orders and deliveries.",
                  "Managing pilot and beta testing programs.",
                  "Processing vendor applications and onboarding.",
                  "Communicating with users, vendors, and partners.",
                  "Providing customer support.",
                  "Sending important service-related notifications.",
                  "Improving Platform functionality and user experience.",
                  "Understanding Platform usage and performance.",
                  "Detecting and preventing fraud, abuse, and security incidents.",
                  "Maintaining and securing our systems.",
                  "Complying with applicable laws, regulations, and legal requests.",
                  "Protecting the rights, property, and safety of RailQuick and users.",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 bg-slate-50 border border-slate-200/60 rounded-xl">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 italic">
                Where required by applicable law, we will rely on an appropriate legal basis for processing personal information.
              </p>
            </div>

            {/* 5. Information Sharing */}
            <div id="sec-5" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">5. Information Sharing</h2>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl font-semibold text-slate-900 text-sm">
                RailQuick does not sell, rent, or trade personal information for monetary consideration.
              </div>
              <p className="text-sm text-slate-600">We may share information where reasonably necessary with:</p>

              <div className="space-y-3">
                <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">Service Providers and Technology Partners</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We may use third-party providers for services such as railway data and API services, cloud hosting, databases, analytics, email/SMS communication, authentication, security, payment processing, customer support, and delivery operations. These providers process information on our behalf to provide the relevant service.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">Delivery and Operational Partners</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Where necessary to fulfil an order or delivery, relevant information may be shared with vendors, delivery personnel, station partners, or operational partners. Only information reasonably required for the relevant service should be shared.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-200/70 rounded-2xl space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-sm">Legal and Regulatory Authorities</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We may disclose information where required by applicable law, court order, governmental request, regulatory requirement, or where reasonably necessary to protect our legal rights, users, or the security of the Platform.
                  </p>
                </div>
              </div>
            </div>

            {/* 6. Third-Party Services and APIs */}
            <div id="sec-6" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">6. Third-Party Services and APIs</h2>
              </div>
              <p className="text-sm text-slate-600">
                RailQuick relies on certain third-party services to operate parts of the Platform. These may include railway information APIs, hosting providers, analytics services, communication providers, authentication services, payment providers, and other technology providers.
              </p>
              <p className="text-sm text-slate-600">
                For example, RailQuick uses <strong>RailKit</strong> for certain railway information and PNR/train-related API functionality.
              </p>
              <p className="text-sm text-slate-600">
                Because these services are operated by independent third parties, their availability, processing practices, and security measures may be subject to their own terms and policies. RailQuick takes reasonable steps to select and use appropriate service providers but cannot guarantee the policies, availability, or security of third-party services outside our direct control.
              </p>
            </div>

            {/* 7. Data Security */}
            <div id="sec-7" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">7. Data Security</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                RailQuick implements reasonable administrative, technical, and organizational safeguards designed to protect personal information against unauthorized access, loss, misuse, alteration, or disclosure. Depending on the service, safeguards may include access controls, authentication mechanisms, secure communications, restricted system access, monitoring, and other appropriate security measures.
              </p>
              <p className="text-xs text-slate-500 italic">
                Please note: No internet-based service, website, API, database, or electronic transmission can be guaranteed to be completely secure. Therefore, while we take reasonable measures to protect information, we cannot guarantee absolute security.
              </p>
            </div>

            {/* 8. Data Retention */}
            <div id="sec-8" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">8. Data Retention</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                RailQuick retains information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including providing requested services, operating and improving the Platform, managing orders and vendor relationships, maintaining business records, preventing fraud, resolving disputes, and complying with legal obligations.
              </p>
              <p className="text-sm text-slate-600">
                Where information is no longer reasonably required, we may delete, anonymize, or securely dispose of it, subject to applicable legal and operational requirements.
              </p>
            </div>

            {/* 9. Cookies and Similar Technologies */}
            <div id="sec-9" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <Cookie className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">9. Cookies and Similar Technologies</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                RailQuick may use cookies, local storage, analytics tools, and similar technologies to keep the Platform functioning properly, remember preferences, understand user interactions, monitor performance, and improve user experience.
              </p>
              <p className="text-xs text-slate-500">
                Users may control certain cookies through their browser or device settings. Disabling some cookies may affect Platform functionality.
              </p>
            </div>

            {/* 10. Children's Privacy */}
            <div id="sec-10" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">10. Children&apos;s Privacy</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                RailQuick&apos;s Platform is not intentionally designed to collect personal information from children without appropriate authorization. If you believe that a child has provided personal information to RailQuick without appropriate consent, please contact us so that we can review and take appropriate action.
              </p>
            </div>

            {/* 11. User Responsibility */}
            <div id="sec-11" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">11. User Responsibility</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                Users are responsible for ensuring that information submitted to RailQuick is accurate and that they have the appropriate authority to provide information relating to another person (for example, another passenger&apos;s PNR). Users should avoid sharing unnecessary personal information through feedback forms or support free-text fields.
              </p>
            </div>

            {/* 12. Links to Third-Party Websites */}
            <div id="sec-12" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">12. Links to Third-Party Websites</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                The Platform may contain links to third-party websites, applications, or services. RailQuick does not control the privacy practices, content, security, or policies of those third parties. Users should review their privacy policies before providing them with personal information.
              </p>
            </div>

            {/* 13. Data Breaches and Security Incidents */}
            <div id="sec-13" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">13. Data Breaches and Security Incidents</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                If RailQuick becomes aware of a security incident involving personal information, we will assess the incident and take appropriate steps in accordance with applicable law and our security procedures. Where notification is legally required, RailQuick will provide appropriate notification to the relevant individuals, authorities, or other parties.
              </p>
            </div>

            {/* 14. Your Privacy Choices and Rights */}
            <div id="sec-14" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <FileQuestion className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">14. Your Privacy Choices and Rights</h2>
              </div>
              <p className="text-sm text-slate-600">
                Subject to applicable law, individuals may have rights relating to their personal information, including rights to:
              </p>
              <ul className="space-y-1.5 text-sm text-slate-600 list-disc pl-5">
                <li>Request information about personal data processed by us.</li>
                <li>Request correction of inaccurate information.</li>
                <li>Request deletion of information where legally applicable.</li>
                <li>Withdraw consent where processing is based on consent.</li>
                <li>Raise a privacy-related concern or complaint.</li>
              </ul>
              <p className="text-xs text-slate-500">
                Certain information may need to be retained where required by law or reasonably necessary for legitimate business, security, dispute-resolution, or compliance purposes.
              </p>
            </div>

            {/* 15. Changes to This Privacy Policy */}
            <div id="sec-15" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">15. Changes to This Privacy Policy</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                RailQuick may update this Privacy Policy from time to time as our Platform, services, technology, or legal requirements develop. When changes are made, we will update the &quot;Last Updated&quot; date at the beginning of this Privacy Policy. Where appropriate, material changes may also be communicated through the Platform.
              </p>
            </div>

            {/* 16. Contact Us */}
            <div id="sec-16" className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-700">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">16. Contact Us</h2>
              </div>
              <p className="text-sm text-slate-600">
                For privacy-related questions, requests, or concerns, please contact:
              </p>
              <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 space-y-2 text-sm text-slate-700">
                <p><strong>Company:</strong> RailQuick Private Limited</p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:contact@railquick.in" className="text-emerald-700 hover:underline font-semibold">
                    contact@railquick.in
                  </a>
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a href="https://railquick.in/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline font-semibold">
                    https://railquick.in/
                  </a>
                </p>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 pt-2 italic">
                By using RailQuick, you acknowledge that you have read and understood this Privacy Policy and that your information may be processed as described above, subject to applicable law.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
