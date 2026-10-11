import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BLOG_ARTICLES, getArticleBySlug, getAllArticles } from "@/data/blogArticles";
import ArticleClientWrapper from "./ArticleClientWrapper";
import { Lock, Calendar, Clock, ArrowRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | RailQuick Blog",
    };
  }

  const canonicalUrl = `https://railquick.in/blog/${article.slug}`;

  return {
    title: article.seoTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.seoTitle,
      description: article.metaDescription,
      url: canonicalUrl,
      siteName: "RailQuick",
      type: "article",
      publishedTime: article.date,
      images: [
        {
          url: article.image.startsWith("http")
            ? article.image
            : `https://railquick.in${article.image}`,
          width: 1200,
          height: 630,
          alt: article.imageAlt || article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.metaDescription,
      images: [article.image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // If article is not published yet, show locked preview screen
  if (!article.isPublishedNow) {
    const allArticles = getAllArticles();
    const liveStories = allArticles.filter((a) => a.isPublishedNow);

    return (
      <div className="min-h-screen bg-[#fafafa] text-slate-900 flex flex-col justify-between font-sans selection:bg-amber-100 selection:text-slate-950">
        <Navbar />

        <main className="flex-1 pt-36 sm:pt-40 pb-20 px-4 sm:px-6 max-w-4xl mx-auto w-full">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-slate-800 truncate">{article.category}</span>
          </nav>

          {/* Locked Dispatch Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 shadow-xl mb-12 text-center relative overflow-hidden">
            {/* Ambient gold glow */}
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600" />

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-black uppercase tracking-wider mb-6 shadow-2xs">
              <Lock className="w-3.5 h-3.5 text-amber-600" />
              <span>Scheduled Release &bull; Unlocks on {article.date}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight mb-4 max-w-2xl mx-auto">
              {article.title}
            </h1>

            <div className="flex items-center justify-center gap-3 text-xs font-bold text-slate-500 mb-6 flex-wrap">
              <span className="px-2.5 py-1 bg-amber-50 text-amber-900 rounded-md border border-amber-200">
                {article.category}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" /> Drops {article.date}
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {article.readTime}
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
              {article.excerpt}
            </p>

            {/* Lock Notice Box */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 sm:p-6 max-w-lg mx-auto text-left mb-8 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-900 flex items-center justify-center shrink-0 font-bold">
                🔒
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">
                  This Dispatch Drops on {article.date}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  RailQuick dispatches are published on a staggered release schedule. This article will automatically unlock on its release date. In the meantime, explore our 3 currently live stories below!
                </p>
              </div>
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-950 hover:bg-slate-800 text-white rounded-full font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <span>← Back to Journal Dispatches</span>
            </Link>
          </div>

          {/* Currently Live Stories (3 Stories) */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Available to Read Right Now (Live Today)
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Enjoy these 3 full dispatches released on 11 October 2026
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {liveStories.map((live) => (
                <Link
                  key={live.id}
                  href={`/blog/${live.slug}`}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-amber-400 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={live.image}
                        alt={live.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-white/95 text-[10px] font-black px-2 py-0.5 rounded shadow-2xs">
                        {live.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-black text-slate-950 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug mb-1.5">
                        {live.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {live.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="p-4 pt-0 flex items-center justify-between text-xs font-bold text-amber-800">
                    <span>Read Story</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Related articles
  const allArticles = getAllArticles();
  const relatedArticles = article.relatedSlugs
    .map((s) => allArticles.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => !!a);

  // Fallback if less than 3
  if (relatedArticles.length < 3) {
    const additional = allArticles
      .filter((a) => a.slug !== article.slug && !relatedArticles.some((r) => r.slug === a.slug))
      .slice(0, 3 - relatedArticles.length);
    relatedArticles.push(...additional);
  }

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://railquick.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://railquick.in/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://railquick.in/blog/${article.slug}`,
      },
    ],
  };

  // Structured Data Schema (Article + FAQPage)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription,
    image: [
      article.image.startsWith("http")
        ? article.image
        : `https://railquick.in${article.image}`,
    ],
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: article.authorName || "RailQuick Editorial Team",
      jobTitle: article.authorRole || "Travel Operations Contributor",
    },
    publisher: {
      "@type": "Organization",
      name: "RailQuick Private Limited",
      logo: {
        "@type": "ImageObject",
        url: "https://railquick.in/logo.svg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://railquick.in/blog/${article.slug}`,
    },
  };

  const faqSchema =
    article.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: article.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <ArticleClientWrapper article={article} relatedArticles={relatedArticles} />
    </>
  );
}
