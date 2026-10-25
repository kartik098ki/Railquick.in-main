"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CheckPnrModal from "@/components/CheckPnrModal";
import { BLOG_ARTICLES } from "@/data/blogArticles";
import {
  Search,
  BookOpen,
  Clock,
  ArrowRight,
  Train,
  X,
  Flame,
} from "lucide-react";

export default function BlogPage() {
  const [isCheckPnrOpen, setIsCheckPnrOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    BLOG_ARTICLES.forEach((a) => set.add(a.category));
    return ["All", ...Array.from(set)];
  }, []);

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return BLOG_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.keywords.some((k) => k.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = filteredArticles[0] || BLOG_ARTICLES[0];

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col justify-between selection:bg-amber-100 selection:text-slate-950 font-sans">
      <CheckPnrModal isOpen={isCheckPnrOpen} onClose={() => setIsCheckPnrOpen(false)} />
      <Navbar onOpenPnrModal={() => setIsCheckPnrOpen(true)} />

      <main className="flex-1 pt-34 sm:pt-38 pb-20 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        {/* Clean Blog Hero (Removed RAILQUICK TRAVEL JOURNAL • INDIAN RAILWAYS EDITION badge) */}
        <div className="text-center max-w-3xl mx-auto mb-9 sm:mb-12">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-950 tracking-tight leading-[1.08] mb-4">
            Train Travel Guides &amp; Stories
          </h1>

          <p className="text-base sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Practical stories, verified checklists, and passenger insights to make every train journey more convenient.
          </p>

          {/* Search Bar */}
          <div className="mt-7 max-w-xl mx-auto relative">
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

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start md:justify-center">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Featured Big Spotlight Card */}
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
                  <span>Featured Story</span>
                </div>
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
                  </div>

                  <Link href={`/blog/${featuredArticle.slug}`}>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 group-hover:text-amber-600 transition-colors tracking-tight leading-[1.15] mb-4">
                      {featuredArticle.title}
                    </h2>
                  </Link>

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

                  <Link
                    href={`/blog/${featuredArticle.slug}`}
                    className="inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm text-amber-800 hover:text-amber-900 group/link"
                  >
                    <span>Read Story</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section Heading */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
              {searchQuery ? `Search Results for "${searchQuery}"` : "All Travel Guides & Stories"}
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
              We couldn&apos;t find any stories matching this filter. Try clearing your search or selecting another category.
            </p>
            <button
              onClick={() => {
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
                  {/* Thumbnail Image (Clean — No "Coming 13 Oct" / "Coming 15 Oct" badges) */}
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
                  </Link>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6">
                    {/* Meta: read time */}
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-500 mb-2.5">
                      <span className="flex items-center gap-1 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-amber-600" /> {article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <Link href={`/blog/${article.slug}`}>
                      <h3 className="text-lg sm:text-xl font-black text-slate-950 group-hover:text-amber-600 transition-colors tracking-tight leading-snug line-clamp-2 mb-2.5">
                        {article.title}
                      </h3>
                    </Link>

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
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-800 hover:text-amber-900 group/btn transition-colors pt-1"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom Banner - RailQuick Pilot CTA */}
        <div className="mt-16 sm:mt-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 sm:p-12 text-white border border-blue-500/30 relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl shadow-blue-900/10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-amber-200 text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
              <Train className="w-3.5 h-3.5" /> Live Journey Convenience
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">
              Travelling by train soon?
            </h3>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Track your train live, check real-time PNR status, and experience next-station seat delivery for everyday essentials.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setIsCheckPnrOpen(true)}
              className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-102 cursor-pointer"
            >
              Check PNR Status
            </button>
            <Link
              href="/vendor"
              className="px-6 py-3.5 bg-white/15 hover:bg-white/25 text-white font-bold rounded-2xl text-sm border border-white/25 transition-all text-center"
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
