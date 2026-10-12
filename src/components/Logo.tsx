"use client";

import Link from "next/link";

export default function Logo({ className = "h-8 sm:h-11 w-auto", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <Link href="/" className="inline-flex items-center gap-2 shrink-0 group">
      <img
        src="/images/logo-full.png"
        alt="RailQuick"
        width={1024}
        height={341}
        className={`${className} object-contain transition-all duration-300 group-hover:opacity-90`}
        style={style}
      />
    </Link>
  );
}
