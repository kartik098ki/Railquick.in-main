"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Instagram, Linkedin, Mail } from "lucide-react";

import OpenAppModal from "@/components/OpenAppModal";
import CheckPnrModal from "@/components/CheckPnrModal";
import TicketPnrButton from "@/components/TicketPnrButton";
import Navbar from "@/components/Navbar";

const CONTACT_API = '/api/contact';

async function submitToSheetDB(data: Record<string, string>) {
  const response = await fetch(CONTACT_API, {
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

const contactMethods = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'General Support',
    value: 'contact@railquick.in',
    href: 'mailto:contact@railquick.in',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Location',
    value: 'Delhi, India',
    href: '#',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
];

const founders = [
  {
    name: 'Kartik Guleria',
    image: '/images/kartik.png',
    email: 'kartik@railquick.in',
    linkedin: 'https://www.linkedin.com/in/kartikguleria1/',
    gradient: 'from-blue-600 to-indigo-500',
  },
  {
    name: 'Harshit Sinha',
    image: '/images/harshit.png',
    email: 'sinhah166@gmail.com',
    linkedin: 'https://www.linkedin.com/in/harshit-sinha-3833172a1/',
    gradient: 'from-purple-500 to-pink-400',
  },
  {
    name: 'Avni Porwal',
    image: '/images/avni_latest.jpg',
    email: 'avni@railquick.in',
    linkedin: 'https://www.linkedin.com/in/avni-porwal-1974a5379/',
    gradient: 'from-orange-500 to-amber-400',
  },
];

export default function ContactPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', inquiry: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [showOpenAppModal, setShowOpenAppModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const success = await submitToSheetDB(formData);
      if (success) {
        setFormData({ name: '', email: '', inquiry: '' });
        setShowSuccessOverlay(true);
      } else {
        toast({ title: 'Error', description: 'Failed to send message.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Error', description: 'Something went wrong.', variant: 'destructive' });
    }
    setIsSubmitting(false);
  };

  const [showCheckPnrModal, setShowCheckPnrModal] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <OpenAppModal isOpen={showOpenAppModal} onClose={() => setShowOpenAppModal(false)} />
      <CheckPnrModal isOpen={showCheckPnrModal} onClose={() => setShowCheckPnrModal(false)} />

      {/* Unified Navigation */}
      <Navbar onOpenPnrModal={() => setShowCheckPnrModal(true)} />

      {/* Hero */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 relative overflow-hidden">
        {/* Abstract Backgrounds */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-blue-100/40 to-indigo-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none md:scale-125 md:opacity-70 transition-all duration-1000" />
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-purple-100/30 to-pink-100/20 rounded-full blur-3xl -translate-x-1/3 pointer-events-none md:scale-150 md:opacity-50 transition-all duration-1000" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm mb-8 hover:shadow-md transition-shadow cursor-default md:px-6 md:py-2 md:shadow-md md:border-blue-100/50"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm font-semibold text-slate-700 md:text-base md:text-slate-800 md:font-bold tracking-wide">We&apos;re here to help</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-8xl font-black text-slate-900 mb-6 tracking-tight px-4 md:mb-10"
          >
            Contact
            <br />
            <span className="text-blue-600">RailQuick</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Have a question, feedback, or want to partner with us? We&apos;d love to hear from you. Reach out directly or drop us a message below.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24 lg:pb-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            {/* Left Column: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-10"
            >
              <div className="space-y-6 md:space-y-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Get in touch</h3>
                <div className="grid gap-4 md:gap-6">
                  {contactMethods.map((method, index) => (
                    <a
                      key={index}
                      href={method.href}
                      className="group flex items-start gap-4 p-5 md:p-8 bg-white rounded-2xl md:rounded-[2rem] border border-slate-100 shadow-sm md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] md:hover:-translate-y-2 hover:border-blue-200/60 transition-all duration-500"
                    >
                      <div className={`p-3 md:p-5 rounded-xl md:rounded-2xl ${method.bg} ${method.color} group-hover:scale-110 md:group-hover:rotate-3 transition-transform duration-500`}>
                        {method.icon}
                      </div>
                      <div className="md:mt-1">
                        <p className="text-sm md:text-base font-medium text-slate-500 mb-0.5 md:mb-2">{method.title}</p>
                        <p className="text-lg md:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{method.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-4 md:pt-8">
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 md:mb-8 tracking-tight">Direct Founders Access</h3>
                <div className="grid gap-4 md:gap-6">
                  {founders.map((founder, index) => (
                    <div
                      key={index}
                      className="group relative overflow-hidden flex items-center gap-5 p-5 md:p-6 bg-white rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] md:shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] md:hover:-translate-y-2 transition-all duration-500"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${founder.gradient} opacity-0 md:group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none`} />
                      <div className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${founder.gradient} rounded-2xl md:rounded-3xl flex items-center justify-center overflow-hidden shadow-lg group-hover:shadow-xl md:group-hover:scale-110 transition-all duration-500 p-0.5 md:p-1`}>
                        <div className="w-full h-full bg-white rounded-[0.9rem] md:rounded-[1.3rem] overflow-hidden">
                          <img
                            src={founder.image}
                            alt={founder.name}
                            className="w-full h-full object-cover transform md:group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 md:pl-2">
                        <p className="font-bold text-slate-900 md:text-xl truncate">{founder.name}</p>
                        <div className="flex gap-3 md:gap-5 mt-1 md:mt-2">
                          {founder.email && (
                            <a href={`mailto:${founder.email}`} className="text-sm md:text-base font-medium text-slate-500 hover:text-blue-600 transition-colors truncate flex items-center gap-1 md:gap-2">
                              <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />
                              Email
                            </a>
                          )}
                          {founder.linkedin && (
                            <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm md:text-base font-medium text-slate-500 hover:text-blue-600 transition-colors truncate flex items-center gap-1 md:gap-2">
                              <Linkedin className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#0077b5]" strokeWidth={2.5} />
                              LinkedIn
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    {
                      href: 'https://www.linkedin.com/company/railquick/?viewAsMember=true', icon: (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                      )
                    },
                    {
                      href: 'https://www.instagram.com/railquick/', icon: <Instagram className="w-5 h-5" />
                    },
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column (lg:col-span-7): Send us a message form + Partnership Box */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">

              {/* Send us a message form card */}
              <div className="bg-gradient-to-br from-white via-slate-50/60 to-white rounded-[2.5rem] border border-slate-200/90 shadow-[0_12px_40px_-10px_rgba(15,23,42,0.06)] p-6 sm:p-8 lg:p-10 pb-6 sm:pb-6 lg:pb-8 relative overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200/80 rounded-full text-[11px] font-black text-slate-800 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Direct Team Inbox
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">Send us a message</h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mb-6">Our founders and team read every message and respond promptly.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5 pl-1">Your Name</label>
                      <Input
                        type="text"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full h-13 px-4 text-sm font-semibold bg-white border-slate-200/90 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 rounded-2xl transition-all shadow-2xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5 pl-1">Email Address</label>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full h-13 px-4 text-sm font-semibold bg-white border-slate-200/90 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 rounded-2xl transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-1.5 pl-1">Message</label>
                    <Textarea
                      placeholder="How can we help you?"
                      value={formData.inquiry}
                      onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-4 py-3 text-sm font-semibold bg-white border-slate-200/90 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 rounded-2xl resize-none transition-all shadow-2xs"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-13 mt-2 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-base shadow-xl shadow-slate-900/15 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? 'Sending Message...' : (
                      <>
                        Send Message <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </>
                    )}
                  </Button>
                </form>
              </div>

              {/* Become a Vendor CTA Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 sm:p-10 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col items-center">
                  <span className="inline-block py-1 px-3.5 rounded-full bg-white/10 border border-white/15 text-emerald-300 font-bold text-xs mb-3 tracking-widest uppercase">Vendor Network</span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">Sell with RailQuick</h3>
                  <p className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg mx-auto font-medium leading-relaxed">
                    Join our network of verified vendors and reach thousands of train travelers directly at platforms and running trains.
                  </p>
                  <Link href="/vendor" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-white text-slate-900 hover:bg-slate-100 h-13 px-8 text-sm rounded-2xl font-black shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2">
                      Become a Vendor →
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      {/* Success Overlay */}
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
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-100/60">
                <CheckCircle2 className="w-7 h-7" strokeWidth={2.5} />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Message Sent</h2>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Thank you for reaching out. We have received your message and will respond as soon as possible.
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
    </div >
  );
}
