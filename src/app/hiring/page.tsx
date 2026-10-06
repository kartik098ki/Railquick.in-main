"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  TrendingUp, 
  HeartHandshake, 
  Briefcase, 
  MapPin, 
  CheckCircle2, 
  ChevronRight,
  Flame,
  Sparkles
} from "lucide-react";

import OpenAppModal from "@/components/OpenAppModal";
import CheckPnrModal from "@/components/CheckPnrModal";
import TicketPnrButton from "@/components/TicketPnrButton";
import Navbar from "@/components/Navbar";

const HIRING_API = '/api/hiring';

async function submitToSheetDB(data: Record<string, string>) {
  const response = await fetch(HIRING_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) return false;
  const resData = await response.json().catch(() => ({}));
  return resData.success === true;
}

const perks = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'High Impact',
    description: 'Work on problems that solve real daily struggles for millions of Indians.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Rapid Growth',
    description: 'Join at the ground floor of a fast-moving logistics startup.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    title: 'Open Culture',
    description: 'We value ideas over hierarchy. If you have a better way, we listen.',
    color: 'bg-purple-50 text-purple-600',
  },
];

const openRoles = [
  { title: 'Operations Manager', type: 'Full-time', location: 'Delhi' },
  { title: 'Developer', type: 'Full-time', location: 'Remote' },
  { title: 'Social Media', type: 'Full-time', location: 'Remote' },
  { title: 'Others', type: 'Part-time', location: 'Delhi' },
];

export default function HiringPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: '', reason: '', linkedin: '', journey: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [showOpenAppModal, setShowOpenAppModal] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRoleClick = (roleTitle: string) => {
    setFormData(prev => ({ ...prev, role: roleTitle }));
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const success = await submitToSheetDB(formData);
      if (success) {
        setFormData({ name: '', email: '', phone: '', role: '', reason: '', linkedin: '', journey: '' });
        setShowSuccessOverlay(true);
      } else {
        toast({ title: 'Error', description: 'Failed to submit application. Please try again.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Something went wrong.', variant: 'destructive' });
    }
    setIsSubmitting(false);
  };

  const [showCheckPnrModal, setShowCheckPnrModal] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans selection:bg-blue-100 selection:text-blue-900">
      <OpenAppModal isOpen={showOpenAppModal} onClose={() => setShowOpenAppModal(false)} />
      <CheckPnrModal isOpen={showCheckPnrModal} onClose={() => setShowCheckPnrModal(false)} />

      {/* Unified Navigation */}
      <Navbar onOpenPnrModal={() => setShowCheckPnrModal(true)} />

      {/* Hero */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-50 to-purple-50 rounded-[100%] blur-3xl opacity-60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold text-slate-700">We are hiring!</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-900 mb-6 sm:mb-8 leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
            Work at <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">RailQuick</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
            We're building the future of train travel in India. It's meaningful work that impacts millions of daily commuters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
            <Button
              onClick={() => formRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto h-12 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium shadow-lg shadow-slate-900/10 transition-all hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-0.5"
            >
              View Open Roles
            </Button>
            <Link href="/about" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full h-12 px-8 rounded-full border-slate-200 hover:bg-slate-50 hover:text-slate-900 font-medium">
                Learn about us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 sm:py-24 bg-white/50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {perks.map((perk, index) => (
              <div key={index} className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className={`w-12 h-12 ${perk.color} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  {perk.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{perk.title}</h3>
                <p className="text-slate-600 leading-relaxed">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles & We Test at 100 km/h Spotlight Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-3 tracking-tight">
                Join the <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">RailQuick</span> Team
              </h2>
              <p className="text-base sm:text-lg text-slate-600 font-medium">Find the role that fits your skills and join our mission.</p>
            </div>
            <Link href="mailto:contact@railquick.in" className="text-slate-900 font-bold hover:text-blue-600 flex items-center gap-2 group transition-colors">
              Don't see your role? Email us <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Spotlight Card: We Test at 100 km/h (Sleek Dark Slate Laptop Box) */}
          <div className="mb-12 bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-bold border border-white/15 text-white">
                  <Flame className="w-4 h-4 text-amber-400" /> Built & Tested in Motion
                </div>
                <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white">We Test at 100 km/h</h3>
                <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed font-medium">
                  Our developers and operators don't just sit behind desks. We validate our code and logistics in the real world — directly on running trains. If you love building systems that survive the ultimate pressure test, you belong here.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-inner">
                <h4 className="text-base font-bold text-white flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" /> What we look for:
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <li className="flex gap-2.5"><strong className="text-cyan-400">01</strong> <span><strong>Relentless Execution:</strong> You prefer building and testing in the field.</span></li>
                  <li className="flex gap-2.5"><strong className="text-cyan-400">02</strong> <span><strong>Extreme Curiosity:</strong> Ready to solve problems outside your comfort zone.</span></li>
                  <li className="flex gap-2.5"><strong className="text-cyan-400">03</strong> <span><strong>Empathy:</strong> You care deeply about helping train passengers.</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {openRoles.map((role, index) => (
              <div
                key={index}
                onClick={() => handleRoleClick(role.title)}
                className="group relative bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-400 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center gap-1 text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                    Apply Now <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{role.title}</h3>

                <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-600">
                  <div className="flex items-center gap-1.5 bg-slate-100/80 border border-slate-200/60 px-3 py-1.5 rounded-xl">
                    <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                    <span>{role.type}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-100/80 border border-slate-200/60 px-3 py-1.5 rounded-xl">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{role.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section ref={formRef} className="py-20 sm:py-32 bg-gradient-to-b from-white to-slate-50 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 border border-slate-200/60 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/40 backdrop-blur-md">
            <div className="text-center mb-10">
              <span className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest mb-3 inline-block">Join the Team</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight">Ready to join?</h2>
              <p className="text-base sm:text-lg text-slate-500 max-w-md mx-auto leading-relaxed">Tell us a bit about yourself. We read every single application.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block pl-1">Full Name</label>
                  <Input
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-13 bg-slate-50/50 border-slate-200/80 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block pl-1">Email Address</label>
                  <Input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-13 bg-slate-50/50 border-slate-200/80 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block pl-1">Phone Number</label>
                  <Input
                    required
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-13 bg-slate-50/50 border-slate-200/80 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block pl-1">Role Applying For</label>
                  <Input
                    required
                    placeholder="Select a role above"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="h-13 bg-slate-50/50 border-slate-200/80 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all shadow-sm font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block pl-1">LinkedIn Profile / Portfolio</label>
                <Input
                  required
                  type="url"
                  placeholder="https://linkedin.com/in/johndoe"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="h-13 bg-slate-50/50 border-slate-200/80 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block pl-1">Why RailQuick?</label>
                <Textarea
                  required
                  placeholder="What excites you about our mission?"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="min-h-[100px] bg-slate-50/50 border-slate-200/80 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all resize-none p-4 shadow-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block pl-1">Tell us about your journey</label>
                <Textarea
                  required
                  placeholder="What have you built or achieved that you're proud of?"
                  value={formData.journey}
                  onChange={(e) => setFormData({ ...formData, journey: e.target.value })}
                  className="min-h-[100px] bg-slate-50/50 border-slate-200/80 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all resize-none p-4 shadow-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-500/15 transition-all hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting Application...
                  </span>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Success Overlay Modal */}
      <AnimatePresence>
        {showSuccessOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-8 sm:p-10 max-w-sm w-full text-center relative overflow-hidden border border-slate-100 shadow-2xl"
            >
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100/60">
                <CheckCircle2 className="w-7 h-7" strokeWidth={2.5} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Application Submitted</h2>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Thank you for applying. We have received your application and will review it shortly.
              </p>

              <Button
                onClick={() => setShowSuccessOverlay(false)}
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold text-sm shadow-sm transition-all active:scale-[0.97]"
              >
                Awesome
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
