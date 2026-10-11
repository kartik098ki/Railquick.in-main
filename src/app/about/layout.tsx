import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About RailQuick | Revolutionizing Train Travel Essentials in India",
  description:
    "Learn about RailQuick Private Limited, our founding story, operational team, and mission to deliver essential goods to 24 million Indian train passengers daily.",
  keywords: [
    "about railquick",
    "railquick founders",
    "kartik guleria",
    "harshit sinha",
    "avni porwal",
    "railquick story",
    "indian railways travel convenience",
    "train passenger platform",
  ],
  alternates: {
    canonical: "https://railquick.in/about",
  },
  openGraph: {
    title: "About RailQuick | Revolutionizing Train Travel Essentials in India",
    description:
      "The founding vision, operations network, and technological innovation behind RailQuick on-seat delivery.",
    url: "https://railquick.in/about",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
