import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check PNR Status & Live Train Tracking",
  description:
    "Check your 10-digit PNR status in real-time. View exact coach position, berth confirmation, live train running status, and station halt timings for on-seat essentials delivery.",
  keywords: [
    "check pnr status",
    "pnr status live",
    "train live tracking",
    "pnr coach berth position",
    "irctc pnr check",
    "railway pnr enquiry",
    "live train status",
    "ट्रेन PNR स्टेटस",
    "पीएनआर स्टेटस चेक",
    "pnr status kaise check karein",
    "train live running status",
  ],
  alternates: {
    canonical: "https://railquick.in/pnr",
  },
  openGraph: {
    title: "Check PNR Status & Live Train Tracking | RailQuick",
    description:
      "Enter your 10-digit PNR for instant coach, berth, and live train telemetry with on-seat essentials delivery points.",
    url: "https://railquick.in/pnr",
    type: "website",
  },
};

export default function PnrLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
