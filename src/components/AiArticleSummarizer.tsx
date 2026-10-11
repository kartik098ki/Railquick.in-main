"use client";

import { useState } from "react";
import { Sparkles, Loader2, CheckCircle2, Copy, Check, ChevronDown, ChevronUp, AlertCircle, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AiArticleSummarizerProps {
  slug: string;
  articleTitle: string;
}

export default function AiArticleSummarizer({
  slug,
  articleTitle,
}: AiArticleSummarizerProps) {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [modelName, setModelName] = useState<string>("RailQuick AI Engine");

  const handleSummarize = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/blog/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to generate summary");
      }

      setSummary(data.summary);
      if (data.model) {
        setModelName(data.model);
      }
      setCollapsed(false);
    } catch (err: any) {
      console.error("AI Summarizer error:", err);
      setError(err.message || "Could not generate summary at this moment.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!summary || summary.length === 0) return;
    const textToCopy = `Key Takeaways — ${articleTitle}\n\n` + summary.map((s, idx) => `${idx + 1}. ${s}`).join("\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast({
      title: "Summary Copied!",
      description: "Bullet takeaways copied to your clipboard.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gradient-to-br from-amber-50/60 via-white to-amber-50/30 rounded-3xl border border-amber-200/80 p-5 sm:p-7 shadow-sm transition-all duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center border border-amber-500/20 shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
                Quick Summary
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase tracking-wider border border-amber-200">
                AI Powered
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              3–5 key travel takeaways extracted from this article
            </p>
          </div>
        </div>

        {/* Action Button (When not yet generated) */}
        {!summary && !loading && (
          <button
            onClick={handleSummarize}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold rounded-2xl text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>✨ Summarise with AI</span>
          </button>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="pt-2 pb-3 space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 animate-pulse">
            <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
            <span>Analyzing article content and generating 3–5 bullet summary...</span>
          </div>
          <div className="space-y-2.5 pt-1">
            <div className="h-4 bg-amber-100/60 rounded-lg w-full animate-pulse" />
            <div className="h-4 bg-amber-100/50 rounded-lg w-5/6 animate-pulse" />
            <div className="h-4 bg-amber-100/40 rounded-lg w-4/6 animate-pulse" />
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-red-800">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={handleSummarize}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-colors w-fit"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        </div>
      )}

      {/* Generated Summary State */}
      {summary && !loading && (
        <div className="space-y-4 pt-1">
          {!collapsed && (
            <ul className="space-y-2.5">
              {summary.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 sm:p-3.5 bg-white/90 rounded-2xl border border-amber-200/50 text-xs sm:text-sm text-slate-800 leading-relaxed shadow-2xs"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-amber-200">
                    {idx + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Bottom Bar: Engine badge & Copy & Collapse */}
          <div className="flex items-center justify-between pt-2 border-t border-amber-200/60 text-xs text-slate-500">
            <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
              Generated by <span className="font-bold text-slate-700">{modelName}</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 transition-colors cursor-pointer"
                title="Copy Summary"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>

              <button
                onClick={() => setCollapsed(!collapsed)}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 transition-colors cursor-pointer"
              >
                {collapsed ? (
                  <>
                    <span>Expand</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span>Collapse</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

              <button
                onClick={handleSummarize}
                className="p-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                title="Regenerate"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
