import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Train, Home, Search, BookOpen, Rocket, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6">
        <div className="max-w-2xl w-full text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-black uppercase tracking-wider mb-6">
            <Train className="w-3.5 h-3.5" />
            <span>Page Not Found • स्टेशन नहीं मिला</span>
          </div>

          <h1 className="text-6xl sm:text-8xl font-black text-slate-900 tracking-tight mb-4">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-3">
            Looks like this train missed its platform.
          </h2>

          <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-10 max-w-lg mx-auto">
            The page you are looking for may have moved or doesn&apos;t exist. You can track your PNR, explore travel essentials, or return to the homepage.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-10 text-left">
            <Link
              href="/"
              className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                <Home className="w-5 h-5 text-slate-700 group-hover:text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Homepage</div>
                <div className="text-xs text-slate-500">Train Essentials &amp; Waitlist</div>
              </div>
            </Link>

            <Link
              href="/pnr"
              className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                <Search className="w-5 h-5 text-slate-700 group-hover:text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Check PNR Status</div>
                <div className="text-xs text-slate-500">Live Berth &amp; Train Radar</div>
              </div>
            </Link>

            <Link
              href="/blog"
              className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                <BookOpen className="w-5 h-5 text-slate-700 group-hover:text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Travel Blog</div>
                <div className="text-xs text-slate-500">Guides, Checklists &amp; FAQs</div>
              </div>
            </Link>

            <Link
              href="/test-phase"
              className="p-4 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors">
                <Rocket className="w-5 h-5 text-slate-700 group-hover:text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Test Phase</div>
                <div className="text-xs text-slate-500">Live Delivery Pilot &amp; Results</div>
              </div>
            </Link>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 hover:bg-blue-600 text-white font-bold text-sm shadow-md transition-all"
          >
            <span>Back to Home</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
