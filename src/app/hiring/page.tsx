"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
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

const HIRING_API = '/api/hiring';

async function submitToSheetDB(data: Record<string, string>) {
  const response = await fetch(HIRING_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
  return response.ok;
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

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans selection:bg-blue-100 selection:text-blue-900">
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
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${item.href === '/hiring'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                    }`}
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
                <Button className="bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200/50 rounded-full px-3.5 h-8 text-[11px] font-bold shadow-sm active:scale-95 transition-all">
                  Test Now
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
                  className={`flex-1 text-center py-2.5 px-1 rounded-full text-[11px] font-extrabold tracking-tight transition-all duration-300 ${item.href === '/hiring'
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
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tight px-4 leading-[1.1]">
                Join the <span className="text-blue-600">RailQuick</span> Team
              </h1>
              <p className="text-lg text-slate-600">Find the role that fits your skills and join our mission.</p>
            </div>
            <Link href="mailto:contact@railquick.in" className="text-blue-600 font-semibold hover:text-blue-700 flex items-center gap-2 group">
              Don't see your role? Email us <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Spotlight Card: We Test at 100 km/h (Styled for light theme) */}
          <div className="mb-12 bg-gradient-to-br from-indigo-900 via-indigo-950 to-blue-950 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold border border-white/20">
                  <Flame className="w-4 h-4 text-orange-400" /> Built & Tested in Motion
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">We Test at 100 km/h</h2>
                <p className="text-indigo-100 text-base sm:text-lg max-w-xl leading-relaxed">
                  Our developers and operators don't just sit behind desks. We validate our code and logistics in the real world — directly on running trains. If you love building systems that survive the ultimate pressure test, you belong here.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/15 rounded-2xl p-6 max-w-md w-full shadow-inner">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" /> What we look for:
                </h4>
                <ul className="space-y-2.5 text-sm text-indigo-100">
                  <li className="flex gap-2"><strong>01</strong> <span><strong>Relentless Execution:</strong> You prefer building and testing in the field.</span></li>
                  <li className="flex gap-2"><strong>02</strong> <span><strong>Extreme Curiosity:</strong> Ready to solve problems outside your comfort zone.</span></li>
                  <li className="flex gap-2"><strong>03</strong> <span><strong>Empathy:</strong> You care deeply about helping train passengers.</span></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {openRoles.map((role, index) => (
              <div
                key={index}
                onClick={() => handleRoleClick(role.title)}
                className="group relative bg-white/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] hover:border-blue-500/30 transition-all duration-500 cursor-pointer overflow-hidden"
              >
                <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="flex items-center gap-1 text-sm font-semibold text-blue-600">
                    Apply Now <ChevronRight className="w-4 h-4" />
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">{role.title}</h3>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-505">
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-md">
                    <Briefcase className="w-4 h-4" />
                    <span>{role.type}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-md">
                    <MapPin className="w-4 h-4" />
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
