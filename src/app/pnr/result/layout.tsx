import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live PNR Journey & Train Radar Results",
  description:
    "View your confirmed coach, seat, berth allocation, and live train GPS radar with upcoming station halts and on-seat essentials delivery options.",
  robots: {
    index: false, // Prevent indexing individual passenger PNR result URLs to protect passenger privacy
    follow: true,
  },
};

export default function PnrResultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
