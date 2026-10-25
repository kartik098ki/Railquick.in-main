import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Phase 2 & 3: Live Running Train Delivery Pilot",
  description:
    "Explore RailQuick's validated test phases. Validated through a 2-day real-world delivery test phase inside running trains like Shalimar Malani Express, 500+ urgent passenger requests, and Phase 3 priority waitlist access.",
  keywords: [
    "railquick test phase",
    "train delivery pilot",
    "running train delivery india",
    "on-seat delivery validation",
    "500+ passenger inquiries",
    "railquick live testing",
    "train quick commerce pilot",
    "delhi ncr train pilot",
  ],
  alternates: {
    canonical: "https://railquick.in/test-phase",
  },
  openGraph: {
    title: "Test Phase 2 & 3: Live Running Train Delivery Pilot | RailQuick",
    description:
      "Real trains, real passengers, real deliveries. Validated through a 2-day test phase on running trains, 500+ urgent calls logged, and upcoming Phase 3 rollout.",
    url: "https://railquick.in/test-phase",
    type: "website",
  },
};

export default function TestPhaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
