"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import OpenAppModal from "@/components/OpenAppModal";

const team = [
  {
    name: 'Kartik Guleria',
    role: 'Founder & CEO',
    image: '/images/kartik.png',
    description: 'Visionary builder dedicated to solving real problems for millions of train travelers. Driving product strategy and rail logistics.',
    linkedin: 'https://www.linkedin.com/in/kartikguleria1/',
    gradient: 'from-blue-600 to-cyan-500',
  },
  {
    name: 'Harshit Sinha',
    role: 'Founder & Ops Head',
    image: '/images/harshit.png',
    description: 'Logistics mastermind ensuring every order meets its destination on time. Building efficient station delivery systems at scale.',
    linkedin: 'https://www.linkedin.com/in/harshit-sinha-3833172a1/',
    gradient: 'from-indigo-600 to-purple-500',
  },
  {
    name: 'Avni Porwal',
    role: 'Founder & CMO',
    image: '/images/avni_latest.jpg',
    description: 'Creating seamless and delightful user experiences for travelers. Bringing brand vision and empathy to every customer touchpoint.',
    linkedin: 'https://www.linkedin.com/in/avni-porwal-1974a5379/',
    gradient: 'from-orange-500 to-amber-400',
  },
  {
    isMoreCard: true,
    name: '+ 5 Team Members',
    role: 'OPERATIONS & TECH',
    image: '',
    description: 'Dedicated station runners, vendor managers, and software engineers working 24/7 to deliver your orders on time.',
    linkedin: '',
    gradient: 'from-slate-900 via-blue-900 to-slate-900',
  }
];

const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Real-Time Motion',
    description: 'We track trains live and coordinate with vendors to deliver directly to your seat without delay.',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: '100% Genuine',
    description: 'Only verified local brands and authentic items. No fake or overpriced platform products.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'On-Seat Guarantee',
    description: 'Direct coach & seat delivery so you never have to get off at crowded, busy platforms.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
];

const milestones = [
  {
    year: '2025',
    title: 'The Idea',
    description: 'Kartik faced a problem getting essential medicines during a train journey. The frustration sparked the vision for RailQuick Private Limited.',
  },
  {
    year: '2025',
    title: 'Team Formation',
    description: 'Harshit and Avni joined to build the solution. Together, we formed a passionate team with complementary skills.',
  },
  {
    year: '2025',
    title: 'Test Phase Completed',
    description: 'Conducted extensive testing with 200+ testers and 500+ interactions at Delhi stations to validate our model.',
  },
];

export default function AboutPage() {
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [showOpenAppModal, setShowOpenAppModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHeaderScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <OpenAppModal isOpen={showOpenAppModal} onClose={() => setShowOpenAppModal(false)} />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerScrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <Logo className="h-8 sm:h-12 w-auto" />

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
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${item.href === '/about'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              <Button
                onClick={() => setShowOpenAppModal(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 h-11 shadow-lg shadow-slate-900/20 transition-all hover:shadow-xl hover:-translate-y-0.5 font-bold"
              >
                Open App
              </Button>
            </div>
            
            <div className="md:hidden">
              <Button
                onClick={() => setShowOpenAppModal(true)}
                className="bg-blue-50/80 hover:bg-blue-100 text-blue-600 border border-blue-200/60 rounded-full px-3.5 h-8 text-[11px] font-extrabold shadow-2xs active:scale-95 transition-all"
              >
                Open App
              </Button>
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
                  className={`flex-1 text-center py-2.5 px-1 rounded-full text-[11px] font-extrabold tracking-tight transition-all duration-300 ${item.href === '/about'
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
      <section className="pt-32 pb-20 lg:pt-56 lg:pb-40 relative overflow-hidden bg-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm mb-8 lg:mb-12 hover:shadow-md transition-shadow cursor-default lg:px-6 lg:py-2"
          >
            <span className="text-sm lg:text-base font-semibold text-slate-700">Our Story</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl lg:leading-[1.1] font-black text-slate-900 mb-6 lg:mb-10 tracking-tight px-4 lg:px-0 max-w-5xl mx-auto"
          >
            The passion behind
            <br />
            <span className="text-blue-600">RailQuick</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-slate-600 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed"
          >
            A journey that started with a personal struggle on a moving train.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                  The idea that changed a journey
                </h2>
                <div className="space-y-4 text-lg text-slate-600 leading-relaxed">
                  <p>
                    Kartik Guleria was traveling to Shirdi when he realized how difficult it was to get essential medicines or snacks on a train. Unlike the quick delivery services in cities, train travelers were left with limited and often low-quality options.
                  </p>
                  <p className="font-medium text-slate-900">
                    This frustration sparked an idea: <span className="text-blue-600 font-bold">RailQuick Private Limited</span>. Today, alongside Harshit Sinha, we are building India&apos;s first on-seat essential delivery service.
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/test-phase">
                  <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 h-12 font-medium shadow-xl transition-all hover:-translate-y-0.5 w-full sm:w-auto">
                    View Our Journey
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-full px-8 h-12 font-medium border-2 hover:bg-slate-50 w-full sm:w-auto">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-slate-100 to-white rounded-[2.5rem] p-8 lg:p-14 border border-slate-100 shadow-2xl shadow-slate-200/50 lg:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] lg:hover:-translate-y-1 transition-all duration-300">
                    <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">1000+</div>
                    <div className="text-sm lg:text-base font-medium text-slate-500 uppercase tracking-wide">Early Testers</div>
                  </div>
                  <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] lg:hover:-translate-y-1 transition-all duration-300">
                    <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">5000+</div>
                    <div className="text-sm lg:text-base font-medium text-slate-500 uppercase tracking-wide">Waitlist Users</div>
                  </div>
                  <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] lg:hover:-translate-y-1 transition-all duration-300">
                    <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">10000+</div>
                    <div className="text-sm lg:text-base font-medium text-slate-500 uppercase tracking-wide">Interactions</div>
                  </div>
                  <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] lg:hover:-translate-y-1 transition-all duration-300">
                    <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">2+</div>
                    <div className="text-sm lg:text-base font-medium text-slate-500 uppercase tracking-wide">Cities Covered</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <p className="text-xs sm:text-sm font-bold text-blue-600 uppercase tracking-widest mb-3">Our Core Principles</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">What drives us</h2>
            <p className="text-base sm:text-lg text-slate-600">The values that guide every line of code and operational decision.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 hover:-translate-y-1 transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 border border-blue-100">
                  {value.icon}
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600 leading-relaxed text-base lg:text-lg">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section (Redesigned Laptop & Mobile Showcase) */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <p className="text-xs sm:text-sm font-black text-blue-600 uppercase tracking-widest mb-3">Our Team</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 tracking-tight">Meet the Builders</h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium">The passionate leaders and operational force driving train delivery innovation.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group text-center bg-slate-50/70 rounded-3xl p-6 lg:p-8 border border-slate-200/70 hover:bg-white hover:shadow-2xl hover:border-blue-300 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
              >
                {member.isMoreCard ? (
                  <div className="flex flex-col items-center justify-center h-full py-4">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col items-center justify-center mb-6 shadow-xl shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300 border-2 border-blue-400/30">
                      <span className="text-3xl font-black">+5</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100">Team</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-1">{member.name}</h3>
                    <p className="text-xs font-black uppercase tracking-wider text-blue-600 mb-3">{member.role}</p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{member.description}</p>
                  </div>
                ) : (
                  <div>
                    <div className="relative mb-6 inline-block">
                      <div className={`w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-2xl bg-gradient-to-br ${member.gradient} p-0.5 transform group-hover:scale-[1.03] transition-all duration-500 shadow-md`}>
                        <div className="w-full h-full bg-white rounded-[0.9rem] flex items-center justify-center overflow-hidden relative">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      </div>
                      <div className={`absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-2xl bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-lg -z-10`} />
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-1">{member.name}</h3>
                    <p className="text-xs font-black uppercase tracking-wider text-blue-600 mb-3">{member.role}</p>
                    
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-600 hover:text-white hover:bg-blue-600 hover:border-blue-600 transition-all mb-4 text-xs font-bold shadow-2xs"
                      >
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                        LinkedIn
                      </a>
                    )}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">{member.description}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-40 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-slate-900 mb-8 lg:mb-12 tracking-tight">Join us on this journey</h2>
          <p className="text-xl lg:text-2xl text-slate-600 mb-12 lg:mb-16 max-w-2xl lg:max-w-3xl mx-auto">
            Be part of India&apos;s first train on-seat delivery revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <Link href="/">
              <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-10 h-16 lg:h-20 lg:px-14 lg:text-xl text-lg font-bold shadow-xl shadow-slate-900/20 transition-all hover:shadow-2xl hover:shadow-slate-900/30 hover:-translate-y-1 w-full sm:w-auto">
                Join Waitlist
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="h-16 lg:h-20 px-10 lg:px-14 lg:text-xl text-lg font-bold rounded-full border-2 hover:bg-slate-50 w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
