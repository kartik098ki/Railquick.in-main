"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckPnrModal from "@/components/CheckPnrModal";
import { BLOG_ARTICLES, BlogArticle } from "@/data/blogArticles";
import {
  Search,
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  Sparkles,
  Train,
  X,
  Compass,
  CheckCircle2,
  Flame,
  Lock,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type EditionFilter = "live" | "13-oct" | "15-oct" | "all";

export default function BlogPage() {
  const [isCheckPnrOpen, setIsCheckPnrOpen] = useState(false);
  const [activeEdition, setActiveEdition] = useState<EditionFilter>("live");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const handleUpcomingClick = (article: BlogArticle) => {
    toast({
      title: "Dispatch Locked 🔒",
      description: `"${article.title}" unlocks on ${article.date}. Only today's 3 live dispatches can be read right now!`,
    });
  };

  const categories = useMemo(() => {
    const set = new Set<string>();
    BLOG_ARTICLES.forEach((a) => set.add(a.category));
    return ["All", ...Array.from(set)];
  }, []);

  // Filter articles based on edition, category, and search query
  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      // Edition filter
      let matchesEdition = true;
      if (activeEdition === "live") {
        matchesEdition = article.id <= 3; // 3 blogs rn (11 Oct)
      } else if (activeEdition === "13-oct") {
        matchesEdition = article.id >= 4 && article.id <= 6; // 3 blogs 13 Oct
      } else if (activeEdition === "15-oct") {
        matchesEdition = article.id >= 7; // rest on 15 Oct
      } // "all" matches all

      // Category filter
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;

      // Search query
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.keywords.some((k) => k.toLowerCase().includes(query));

      return matchesEdition && matchesCategory && matchesSearch;
    });
  }, [activeEdition, selectedCategory, searchQuery]);

  // Featured story from filtered set (or first)
  const featuredArticle = filteredArticles[0] || BLOG_ARTICLES[0];
  const gridArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : filteredArticles;

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col justify-between selection:bg-amber-100 selection:text-slate-950 font-sans">
      <CheckPnrModal isOpen={isCheckPnrOpen} onClose={() => setIsCheckPnrOpen(false)} />
      <Navbar onOpenPnrModal={() => setIsCheckPnrOpen(true)} />

      <main className="flex-1 pt-32 sm:pt-36 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Magazine Masthead / Hero */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-black uppercase tracking-wider mb-5 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>RailQuick Travel Journal &bull; Indian Railways Edition</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.08] mb-4">
            Travel Dispatches
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Practical stories, verified checklists, and passenger insights to make every train journey more convenient.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles, checklists, travel hacks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-13 pl-12 pr-11 bg-white border border-slate-200 rounded-2xl text-sm sm:text-base text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Primary Edition Tabs (Live Now: 3 blogs, 13 Oct: 3 blogs, 15 Oct: rest) */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
          <button
            onClick={() => {
              setActiveEdition("live");
              setSelectedCategory("All");
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeEdition === "live"
                ? "bg-slate-950 text-amber-400 shadow-md shadow-slate-950/20 scale-102"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Live Today (3 Articles)</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px]">
              11 Oct
            </span>
          </button>

          <button
            onClick={() => {
              setActiveEdition("13-oct");
              setSelectedCategory("All");
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeEdition === "13-oct"
                ? "bg-slate-950 text-amber-400 shadow-md shadow-slate-950/20 scale-102"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Next Drop (3 Articles)</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">
              13 Oct
            </span>
          </button>

          <button
            onClick={() => {
              setActiveEdition("15-oct");
              setSelectedCategory("All");
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeEdition === "15-oct"
                ? "bg-slate-950 text-amber-400 shadow-md shadow-slate-950/20 scale-102"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span>Upcoming Edition (9 Articles)</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">
              15 Oct
            </span>
          </button>

          <button
            onClick={() => {
              setActiveEdition("all");
              setSelectedCategory("All");
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
              activeEdition === "all"
                ? "bg-slate-950 text-amber-400 shadow-md shadow-slate-950/20 scale-102"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <span>All Articles (15)</span>
          </button>
        </div>

        {/* Secondary Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start md:justify-center">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-amber-100 text-amber-950 border border-amber-300 font-bold"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Featured Big Spotlight Card (if present) */}
        {!searchQuery && featuredArticle && (
          <div className="mb-14">
            <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 hover:shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 group">
              <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[380px] lg:min-h-[440px] overflow-hidden bg-slate-100">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.imageAlt || featuredArticle.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-black text-xs uppercase px-3.5 py-1 rounded-full shadow-md flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{featuredArticle.edition || "Lead Story"}</span>
                </div>
                {!featuredArticle.isPublishedNow && (
                  <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] flex items-center justify-center p-4">
                    <div className="bg-slate-950/90 text-amber-300 font-bold text-sm px-4 py-2 rounded-full border border-amber-500/30 flex items-center gap-2 shadow-xl">
                      <Lock className="w-4 h-4 text-amber-400" />
                      <span>Locked &bull; Drops on {featuredArticle.date}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-xs font-bold text-slate-500 mb-3 flex-wrap">
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-900 rounded-lg border border-amber-200/70 font-black">
                      {featuredArticle.category}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> {featuredArticle.readTime}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1 font-bold text-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-amber-600" /> {featuredArticle.date}
                    </span>
                  </div>

                  {featuredArticle.isPublishedNow ? (
                    <Link href={`/blog/${featuredArticle.slug}`}>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 group-hover:text-amber-600 transition-colors tracking-tight leading-[1.15] mb-4">
                        {featuredArticle.title}
                      </h2>
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleUpcomingClick(featuredArticle)}
                      className="text-left w-full cursor-pointer"
                    >
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 hover:text-amber-600 transition-colors tracking-tight leading-[1.15] mb-4">
                        {featuredArticle.title}
                      </h2>
                    </button>
                  )}

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed line-clamp-3 mb-6">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-xs">
                    <div className="w-8 h-8 rounded-full bg-slate-950 text-amber-400 font-bold flex items-center justify-center text-xs">
                      {featuredArticle.authorAvatar || "RQ"}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-none">{featuredArticle.authorName || "RailQuick"}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{featuredArticle.authorRole || "Travel Desk"}</p>
                    </div>
                  </div>

                  {featuredArticle.isPublishedNow ? (
                    <Link
                      href={`/blog/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-amber-800 hover:text-amber-900 group/link"
                    >
                      <span>Read Story</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleUpcomingClick(featuredArticle)}
                      className="inline-flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-900 bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-xl border border-amber-300 transition-colors cursor-pointer"
                    >
                      <Lock className="w-4 h-4 text-amber-700" />
                      <span>Drops on {featuredArticle.date.replace(" 2026", "")}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : activeEdition === "live"
                ? "Live Today — 11 October 2026 Dispatches"
                : activeEdition === "13-oct"
                ? "Dropping 13 October 2026 Edition"
                : activeEdition === "15-oct"
                ? "Dropping 15 October 2026 Edition"
                : "All Journal Dispatches"}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? "story" : "stories"}
            </p>
          </div>
        </div>

        {/* Article Cards Grid */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-1">No articles found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
              We couldn&apos;t find any stories matching this filter. Try clearing your search or switching editions.
            </p>
            <button
              onClick={() => {
                setActiveEdition("live");
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Image */}
                  {article.isPublishedNow ? (
                    <Link href={`/blog/${article.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={article.image}
                        alt={article.imageAlt || article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-900 text-[11px] font-black px-2.5 py-1 rounded-lg border border-slate-100 shadow-2xs">
                        {article.category}
                      </div>
                      <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-xs text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                        {article.edition || "Edition"}
                      </div>
                    </Link>
                  ) : (
                    <div
                      onClick={() => handleUpcomingClick(article)}
                      className="block relative aspect-[16/10] overflow-hidden bg-slate-100 cursor-pointer"
                    >
                      <img
                        src={article.image}
                        alt={article.imageAlt || article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-slate-900 text-[11px] font-black px-2.5 py-1 rounded-lg border border-slate-100 shadow-2xs">
                        {article.category}
                      </div>
                      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[1px] flex items-center justify-center p-3">
                        <div className="bg-slate-950/90 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-500/30 flex items-center gap-1.5 shadow-lg">
                          <Lock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Unlocks {article.date.replace(" 2026", "")}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-5 sm:p-6">
                    {/* Meta: date & read time */}
                    <div className="flex items-center gap-3 text-[11px] sm:text-xs font-semibold text-slate-500 mb-3">
                      <span className="flex items-center gap-1 font-bold text-slate-700">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" /> {article.date}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5" /> {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    {article.isPublishedNow ? (
                      <Link href={`/blog/${article.slug}`}>
                        <h3 className="text-lg sm:text-xl font-black text-slate-950 group-hover:text-amber-600 transition-colors tracking-tight leading-snug line-clamp-2 mb-2.5">
                          {article.title}
                        </h3>
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleUpcomingClick(article)}
                        className="text-left w-full cursor-pointer"
                      >
                        <h3 className="text-lg sm:text-xl font-black text-slate-950 hover:text-amber-600 transition-colors tracking-tight leading-snug line-clamp-2 mb-2.5">
                          {article.title}
                        </h3>
                      </button>
                    )}

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Author + Link */}
                <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    By {article.authorName || "RailQuick Desk"}
                  </span>
                  {article.isPublishedNow ? (
                    <Link
                      href={`/blog/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-900 group/btn transition-colors pt-1"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleUpcomingClick(article)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-xl border border-amber-300 transition-colors cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5 text-amber-700" />
                      <span>Drops {article.date.replace(" 2026", "")}</span>
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom Banner - RailQuick Pilot CTA */}
        <div className="mt-16 sm:mt-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4 border border-amber-500/30">
              <Train className="w-3.5 h-3.5" /> Live Journey Convenience
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
              Travelling by train soon?
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Track your train live, check real-time PNR status, and experience next-station seat delivery for everyday essentials.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setIsCheckPnrOpen(true)}
              className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-102 cursor-pointer"
            >
              Check PNR Status
            </button>
            <Link
              href="/vendor"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-sm border border-white/20 transition-all text-center"
            >
              Become a Vendor
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
