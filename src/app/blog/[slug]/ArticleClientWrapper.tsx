"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckPnrModal from "@/components/CheckPnrModal";
import AiArticleSummarizer from "@/components/AiArticleSummarizer";
import { BlogArticle, getAllArticles } from "@/data/blogArticles";
import {
  Clock,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Share2,
  ChevronDown,
  Sparkles,
  Train,
  Bookmark,
  Volume2,
  Check,
  Compass,
  Quote,
  Lightbulb,
  User,
  ShieldCheck,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ArticleClientWrapperProps {
  article: BlogArticle;
  relatedArticles: BlogArticle[];
}

export default function ArticleClientWrapper({
  article,
  relatedArticles,
}: ArticleClientWrapperProps) {
  const [isCheckPnrOpen, setIsCheckPnrOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Track scroll progress for magazine reading bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url,
        });
      } catch {
        // user dismissed
      }
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Article Link Copied",
        description: "Direct link has been copied to your clipboard.",
      });
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Removed from Reading List" : "Saved to Reading List",
      description: isBookmarked
        ? "Article removed from your saved list."
        : "Article bookmarked for offline reading reference.",
    });
  };

  const getAnchorId = (heading: string) => {
    return heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Find previous and next articles
  const allArticles = getAllArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  // Split first intro paragraph for drop-cap
  const firstIntroPara = article.introduction[0] || "";
  const firstLetter = firstIntroPara.charAt(0);
  const remainingFirstPara = firstIntroPara.slice(1);

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col justify-between selection:bg-amber-100 selection:text-slate-950 font-sans">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 z-[100] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <CheckPnrModal isOpen={isCheckPnrOpen} onClose={() => setIsCheckPnrOpen(false)} />
      <Navbar onOpenPnrModal={() => setIsCheckPnrOpen(true)} />

      <main className="flex-1 pt-36 sm:pt-40 pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Top Magazine Breadcrumb & Kicker */}
          <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 flex-wrap text-xs font-bold uppercase tracking-wider">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/80 hover:bg-amber-200/80 text-amber-950 border border-amber-300 transition-all shadow-2xs group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-amber-800" />
                <span>RailQuick Journal</span>
              </Link>
              <span className="text-slate-300 font-normal">/</span>
              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-black text-[11px] tracking-wide border border-slate-200/80">
                {article.category}
              </span>
            </nav>
            <div className="flex items-center gap-2 text-slate-500 text-[11px] font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{article.edition || "Editorial Dispatch"}</span>
            </div>
          </div>

          {/* Article Header */}
          <header className="mb-10">
            {/* Category & Status Pill */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3.5 py-1 bg-amber-100/90 text-amber-950 border border-amber-300/80 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs">
                {article.category}
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">
                {article.edition || "Verified Guide"}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12] mb-5">
              {article.title}
            </h1>

            {/* Deck / Excerpt Subheading */}
            <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed mb-8 border-l-3 border-amber-500 pl-4 py-1">
              {article.excerpt}
            </p>

            {/* Editorial Byline & Utility Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-y border-slate-200/90 text-xs sm:text-sm">
              {/* Author Info */}
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-800 text-amber-400 font-black flex items-center justify-center text-sm shadow-md border border-slate-700">
                  {article.authorAvatar || "RQ"}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-black text-slate-950 text-sm">{article.authorName || "RailQuick Travel Desk"}</p>
                    <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded border border-emerald-200">
                      Verified
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs">
                    {article.authorRole || "Indian Railways Travel Desk"} &bull; <span className="font-semibold text-slate-700">{article.date}</span>
                  </p>
                </div>
              </div>

              {/* Toolbar: Read time, Audio mockup, Share, Bookmark */}
              <div className="flex items-center gap-2.5 shrink-0">
                <span className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {article.readTime}
                </span>

                <button
                  onClick={handleBookmark}
                  className={`p-2 sm:px-3 sm:py-2 border rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isBookmarked
                      ? "bg-amber-50 text-amber-900 border-amber-300 shadow-2xs"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                  title="Bookmark story"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-amber-600 text-amber-600" : ""}`} />
                  <span className="hidden sm:inline">{isBookmarked ? "Saved" : "Save"}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Share Story</span>
                </button>
              </div>
            </div>
          </header>

          {/* Full-width Magazine Hero Photograph */}
          <div className="mb-10 sm:mb-12">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50 aspect-[16/9] sm:aspect-[21/10] bg-slate-100 relative group">
              <img
                src={article.image}
                alt={article.imageAlt || article.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white/90 text-xs">
                <span className="font-semibold drop-shadow-sm truncate max-w-md">
                  {article.imageAlt || "Field dispatch on Indian Railways"}
                </span>
                <span className="text-[10px] bg-slate-950/60 backdrop-blur-xs px-2 py-0.5 rounded-md shrink-0">
                  RailQuick Field Photography
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 italic text-center mt-2.5">
              Visual dispatch illustrating on-track passenger experience and train journey convenience in India.
            </p>
          </div>

          {/* Interactive AI Quick Summary (Executive Takeaways) */}
          <div className="mb-12">
            <AiArticleSummarizer slug={article.slug} articleTitle={article.title} />
          </div>

          {/* Main Editorial Reading Experience */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Story Content Column */}
            <article className="lg:col-span-8 text-slate-800 leading-[1.8] text-[17px] sm:text-[18px]">
              {/* Introduction with Magazine Drop Cap */}
              <div className="mb-10 space-y-5">
                {article.introduction.map((para, idx) => {
                  if (idx === 0) {
                    return (
                      <p key={idx} className="text-lg sm:text-xl text-slate-800 leading-relaxed font-serif">
                        <span className="float-left text-5xl sm:text-6xl font-black font-sans text-amber-600 leading-none pr-3 pt-1 uppercase">
                          {firstLetter}
                        </span>
                        {remainingFirstPara}
                      </p>
                    );
                  }
                  return (
                    <p key={idx} className="text-slate-700 leading-relaxed">
                      {para}
                    </p>
                  );
                })}
              </div>

              {/* Mobile Table of Contents */}
              {article.sections.length > 3 && (
                <div className="lg:hidden p-5 my-8 bg-amber-50/50 rounded-2xl border border-amber-200/70">
                  <p className="font-black text-xs uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-700" /> In This Story
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {article.sections.map((sec, idx) => (
                      <li key={idx}>
                        <a
                          href={`#${getAnchorId(sec.heading)}`}
                          className="hover:text-amber-800 transition-colors block py-0.5 font-medium"
                        >
                          &bull; {sec.heading}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Main Body Sections with Magazine Styling */}
              <div className="space-y-10 pt-2">
                {article.sections.map((sec, idx) => {
                  const anchorId = getAnchorId(sec.heading);
                  const isNumbered = /^\d+\./.test(sec.heading);

                  return (
                    <section
                      key={idx}
                      id={anchorId}
                      className="scroll-mt-28 space-y-4"
                    >
                      {/* Section Heading */}
                      <div className="pb-2 border-b border-slate-200/70">
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight flex items-baseline gap-3">
                          {isNumbered && (
                            <span className="text-amber-600 font-mono text-xl sm:text-2xl font-black">
                              {sec.heading.split(".")[0]}.
                            </span>
                          )}
                          <span>{isNumbered ? sec.heading.replace(/^\d+\.\s*/, "") : sec.heading}</span>
                        </h2>
                      </div>

                      {/* Section Paragraphs */}
                      {sec.paragraphs.map((para, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-slate-700 leading-relaxed text-[16px] sm:text-[18px]"
                        >
                          {para}
                        </p>
                      ))}

                      {/* Occasional Editorial Highlight / Field Note on specific sections */}
                      {idx === 1 && (
                        <div className="p-5 my-6 bg-slate-50 border-l-4 border-amber-500 rounded-r-2xl space-y-1.5 text-sm text-slate-700">
                          <p className="font-bold text-slate-900 flex items-center gap-2 text-xs uppercase tracking-wider text-amber-800">
                            <Lightbulb className="w-4 h-4 text-amber-600" /> RailQuick Field Note
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            Always keep travel chargers and primary medications inside your small personal daypack. In running trains, accessing large suitcases stored under the berth is difficult and disruptive during late night halts.
                          </p>
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>

              {/* Elegant Pull Quote Divider */}
              <div className="my-12 py-8 border-y border-slate-200 text-center space-y-3">
                <Quote className="w-8 h-8 text-amber-500 mx-auto opacity-70" />
                <blockquote className="font-serif italic text-xl sm:text-2xl text-slate-900 max-w-xl mx-auto leading-relaxed">
                  &ldquo;A forgotten essential on a moving train isn&apos;t an emergency, but it steals the joy of travel. Convenience is about removing friction.&rdquo;
                </blockquote>
                <p className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  RailQuick Travel Journal
                </p>
              </div>

              {/* FAQs Section */}
              {article.faqs.length > 0 && (
                <div id="faqs" className="mt-14 pt-8 border-t border-slate-200 scroll-mt-28">
                  <div className="mb-6">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-700">
                      Frequently Asked Questions
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1 mb-2">
                      Answers for Train Travelers
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Direct guidance verified by RailQuick operations.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {article.faqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div
                          key={idx}
                          className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs transition-all"
                        >
                          <button
                            onClick={() => toggleFaq(idx)}
                            className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 flex items-center justify-between gap-4 hover:text-amber-700 transition-colors cursor-pointer"
                          >
                            <span>{faq.question}</span>
                            <ChevronDown
                              className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                                isOpen ? "rotate-180 text-amber-600" : ""
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Author Bio Box */}
              <div className="mt-14 p-6 sm:p-7 bg-white rounded-3xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-slate-950 text-amber-400 font-black flex items-center justify-center text-lg shrink-0 shadow-md">
                  {article.authorAvatar || "RQ"}
                </div>
                <div>
                  <h4 className="font-black text-base text-slate-900">{article.authorName || "RailQuick Travel Desk"}</h4>
                  <p className="text-xs text-amber-800 font-bold mb-2">{article.authorRole || "Senior Rail Travel Editor"}</p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Dedicated to making Indian Railways travel more comfortable, reliable, and convenient. Our travel desk covers practical passenger guides, station logistics, and on-seat essentials.
                  </p>
                </div>
              </div>

              {/* RailQuick CTA Card */}
              <div className="mt-10 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-slate-950 shadow-xl shadow-amber-500/20">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/15 text-slate-950 text-xs font-bold uppercase tracking-wider mb-3">
                  <Train className="w-3.5 h-3.5" /> RailQuick Travel Partner
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight mb-2 text-slate-950">
                  Make your next train journey hassle-free
                </h3>
                <p className="text-sm sm:text-base text-slate-900/90 leading-relaxed mb-6 font-medium">
                  {article.cta ||
                    "Explore RailQuick and follow our journey at railquick.in. Join the journey as we work to make train travel more convenient."}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsCheckPnrOpen(true)}
                    className="px-5 py-3 bg-slate-950 hover:bg-slate-900 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    Check PNR Status Live
                  </button>
                  <Link
                    href="/"
                    className="px-5 py-3 bg-white hover:bg-amber-50 text-slate-950 font-bold rounded-2xl text-xs sm:text-sm border border-slate-900/20 transition-all"
                  >
                    Explore RailQuick Home
                  </Link>
                </div>
              </div>

              {/* Article Keywords */}
              {article.keywords.length > 0 && (
                <div className="pt-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    Topics &amp; Keywords
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {article.keywords.map((kw, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs font-medium transition-colors"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Previous / Next Story Navigation */}
              <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevArticle ? (
                  <Link
                    href={`/blog/${prevArticle.slug}`}
                    className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all group flex flex-col justify-between"
                  >
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      &larr; Previous Story
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                      {prevArticle.title}
                    </span>
                  </Link>
                ) : <div />}

                {nextArticle ? (
                  <Link
                    href={`/blog/${nextArticle.slug}`}
                    className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 transition-all group flex flex-col justify-between text-right"
                  >
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Next Story &rarr;
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2">
                      {nextArticle.title}
                    </span>
                  </Link>
                ) : <div />}
              </div>
            </article>

            {/* Desktop Sticky Editorial Sidebar */}
            <aside className="hidden lg:block lg:col-span-4 space-y-6">
              <div className="sticky top-28 space-y-6">
                {/* Table of Contents */}
                {article.sections.length > 0 && (
                  <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900 mb-4 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-amber-600" />
                      Table of Contents
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {article.sections.map((sec, idx) => (
                        <li key={idx}>
                          <a
                            href={`#${getAnchorId(sec.heading)}`}
                            className="hover:text-amber-700 transition-colors line-clamp-1 block py-0.5"
                          >
                            &bull; {sec.heading}
                          </a>
                        </li>
                      ))}
                      {article.faqs.length > 0 && (
                        <li>
                          <a
                            href="#faqs"
                            className="hover:text-amber-700 font-semibold text-slate-800 transition-colors block py-0.5"
                          >
                            &bull; Frequently Asked Questions
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Quick PNR Tracker Card */}
                <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-lg">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold uppercase tracking-wider mb-3">
                    Fast &amp; Accurate
                  </div>
                  <h4 className="font-bold text-base mb-1.5">Checking your train?</h4>
                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    Check your 10-digit PNR for verified coach, seat, and live running updates via RailKit.
                  </p>
                  <button
                    onClick={() => setIsCheckPnrOpen(true)}
                    className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-md cursor-pointer"
                  >
                    Open PNR Tracker
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Stories Grid */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 sm:mt-20 pt-12 border-t border-slate-200">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-700">More From Journal</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mt-1">
                    Related Dispatches
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="text-xs sm:text-sm font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                >
                  <span>All Stories</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((rel) => (
                  <article
                    key={rel.id}
                    className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <Link href={`/blog/${rel.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100">
                        <img
                          src={rel.image}
                          alt={rel.imageAlt || rel.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-white/95 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-100 shadow-2xs">
                          {rel.category}
                        </div>
                      </Link>

                      <div className="p-4 sm:p-5">
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium mb-2">
                          <span>{rel.readTime}</span>
                          <span>&bull;</span>
                          <span>{rel.date}</span>
                        </div>
                        <Link href={`/blog/${rel.slug}`}>
                          <h3 className="font-bold text-sm sm:text-base text-slate-950 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                            {rel.title}
                          </h3>
                        </Link>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 pt-0">
                      <Link
                        href={`/blog/${rel.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 pt-2"
                      >
                        <span>Read Story</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* Back to Blog Button */}
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold rounded-2xl text-sm shadow-2xs transition-all hover:scale-102"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all RailQuick Journal dispatches</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
