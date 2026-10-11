import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The RailQuick Dispatch | Train Travel Magazine & Guides",
  description:
    "Expert travel guides, packing checklists, night travel security tips, and railway tech insights for long-distance Indian Railways travelers.",
  keywords: [
    "indian railways travel blog",
    "train journey packing checklist",
    "what to carry in train",
    "train travel essentials india",
    "overnight train journey tips",
    "railway hacks india",
    "vande bharat travel guide",
  ],
  alternates: {
    canonical: "https://railquick.in/blog",
  },
  openGraph: {
    title: "The RailQuick Dispatch | Train Travel Magazine & Guides",
    description:
      "Expert travel guides, packing checklists, night travel security tips, and railway tech insights for Indian Railways passengers.",
    url: "https://railquick.in/blog",
    type: "website",
    images: [
      {
        url: "/images/blog/blog-1.jpg",
        width: 1200,
        height: 630,
        alt: "The RailQuick Dispatch Travel Magazine",
      },
    ],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
