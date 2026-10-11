"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Rocket,
  ArrowLeft,
  AlertCircle,
  Clock,
  Package,
  Store,
  MessageSquare,
  ShieldAlert,
  Lock,
  CheckCircle2,
  Mail,
  FileText,
} from "lucide-react";

const pilotPoints = [
  {
    num: "01",
    title: "Development and Testing",
    desc: "RailQuick is continuously developing and improving its Platform. Certain features, services, interfaces, and operational processes may be under development, testing, or validation.",
  },
  {
    num: "02",
    title: "Service Availability",
    desc: "Pilot services may be available only on selected routes, stations, locations, or time periods. Availability may vary depending on operational capacity, participating vendors, railway conditions, and other factors.",
  },
  {
    num: "03",
    title: "Features and Pricing",
    desc: "Features, pricing, product availability, delivery processes, service areas, and operational procedures may be modified, introduced, restricted, or discontinued as RailQuick evaluates and improves the service.",
  },
  {
    num: "04",
    title: "PNR and Train Information",
    desc: "RailQuick may provide PNR checking, train search, and related railway information during the pilot. Such information may be obtained through third-party railway data services, including the RailKit API, and may occasionally be delayed, unavailable, incomplete, or subject to changes in underlying railway data. Users should verify important journey information through official railway channels before travelling.",
  },
  {
    num: "05",
    title: "Delivery Timelines",
    desc: "Delivery timelines provided during the pilot are estimates and are not guaranteed. Deliveries may be affected by train delays or cancellations, platform or station changes, railway operational or security restrictions, vendor availability, product availability, weather conditions, network issues, or other circumstances outside RailQuick's reasonable control.",
  },
  {
    num: "06",
    title: "Product Availability",
    desc: "Products displayed during the pilot may not always be available. Inventory, pricing, product selection, and participating vendors may vary by location and journey.",
  },
  {
    num: "07",
    title: "Vendor Participation",
    desc: "RailQuick may work with verified or participating vendors during the pilot. Vendor participation may change during the pilot based on operational requirements, availability, verification, performance, or other legitimate considerations.",
  },
  {
    num: "08",
    title: "Feedback and Testing",
    desc: "Participants may be invited to provide feedback, reviews, suggestions, or other information regarding their experience. By providing feedback, you agree that RailQuick may use that feedback to evaluate and improve its products, services, technology, customer experience, and operational processes, subject to our Privacy Policy.",
  },
  {
    num: "09",
    title: "No Guarantee of Future Availability",
    desc: "Participation in the pilot does not guarantee continued access to RailQuick services, future product availability, specific delivery routes, pricing, vendor availability, or any future commercial offering.",
  },
  {
    num: "10",
    title: "Changes to the Pilot",
    desc: "RailQuick Private Limited reserves the right to suspend, modify, expand, restrict, pause, or terminate the pilot program, or any part of it, at any time, subject to applicable law. Where reasonably possible, RailQuick may communicate significant changes affecting active participants.",
  },
  {
    num: "11",
    title: "Privacy",
    desc: "Information collected during participation in the pilot will be handled in accordance with the RailQuick Privacy Policy (https://www.railquick.in/privacy). Depending on the service used, information may include contact details, journey information, PNR information, order information, delivery details, feedback, and technical information.",
  },
  {
    num: "12",
    title: "Acceptance",
    desc: "By participating in a RailQuick pilot service, placing a pilot order, submitting information through the Platform, or otherwise using a pilot feature, you acknowledge that you have read and agreed to these Pilot Program Terms. For general use of the RailQuick Platform, please also refer to our Terms & Conditions (https://www.railquick.in/terms).",
  },
];

export default function PilotTermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-100 selection:text-slate-900">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 sm:pt-40 pb-12 sm:pb-16 relative overflow-hidden bg-gradient-to-b from-blue-50/40 via-slate-50/50 to-white text-slate-900 border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.06),transparent_50%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 transition-colors text-sm font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 text-blue-700 rounded-2xl border border-blue-200/60 mb-5 shadow-2xs">
            <Rocket className="w-7 h-7" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-slate-900 mb-3">
            Pilot Program Terms
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto font-medium">
            RailQuick Private Limited &bull; <span className="text-slate-900 font-semibold">Validation &amp; Pilot Phase</span>
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 sm:py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40 p-6 sm:p-10 lg:p-12 space-y-10 text-slate-700 leading-relaxed">
            {/* Important Notice */}
            <div className="p-5 sm:p-6 bg-blue-50/70 border border-blue-200/80 rounded-2xl space-y-3">
              <div className="flex items-center gap-2.5 text-blue-900 font-bold text-base sm:text-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0" />
                <span>Important Notice</span>
              </div>
              <p className="text-sm sm:text-base text-blue-950/90 leading-relaxed">
                RailQuick Private Limited is currently operating certain services under a pilot and validation program.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                The purpose of this pilot is to evaluate customer demand, operational feasibility, vendor coordination, delivery workflows, railway information services, technology performance, and the overall customer experience before expanding services to additional routes, stations, and users.
              </p>
              <p className="text-xs sm:text-sm text-slate-500 italic">
                During this phase, some services may have limited availability and may be available only in selected locations, routes, or journeys.
              </p>
            </div>

            {/* Participant Terms Header */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Participant Terms</h2>
              <p className="text-sm text-slate-600">
                By participating in the RailQuick Private Limited Pilot Program, you acknowledge and agree to the following terms:
              </p>
            </div>

            {/* 12 Points Grid / List */}
            <div className="space-y-4">
              {pilotPoints.map((point) => (
                <div
                  key={point.num}
                  className="p-5 bg-slate-50/70 border border-slate-200/70 rounded-2xl transition-all hover:bg-white hover:border-slate-300 hover:shadow-sm"
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-mono text-xs font-black px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg">
                      {point.num}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                      {point.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 pl-0 sm:pl-11 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>

            <hr className="border-slate-100" />

            {/* Contact & Footer notice */}
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-5 space-y-2 text-sm text-slate-700">
                <p className="font-bold text-slate-900">RailQuick Private Limited</p>
                <p>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:contact@railquick.in" className="text-blue-700 hover:underline font-semibold">
                    contact@railquick.in
                  </a>
                </p>
                <p>
                  <strong>Website:</strong>{" "}
                  <a href="https://railquick.in/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline font-semibold">
                    https://railquick.in/
                  </a>
                </p>
                <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
                  <Link href="/terms" className="hover:text-blue-700 transition-colors underline">
                    Terms &amp; Conditions
                  </Link>
                  <Link href="/privacy" className="hover:text-blue-700 transition-colors underline">
                    Privacy Policy
                  </Link>
                  <Link href="/test-phase" className="hover:text-blue-700 transition-colors underline">
                    Test Phase Journey
                  </Link>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 italic">
                RailQuick is currently validating and improving its services with the objective of building a reliable railway convenience platform for passengers across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
