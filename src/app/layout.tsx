import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RailQuick - India's First Train On-Seat Delivery Service",
  description: "RailQuick revolutionizes train travel by delivering food, beverages, and essentials directly to your seat. Your journey, our priority.",
  keywords: ["RailQuick", "Train Delivery", "Food Delivery", "Indian Railways", "On-Seat Delivery", "Train Food", "Travel Essentials"],
  authors: [{ name: "RailQuick Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "RailQuick - India's First Train On-Seat Delivery Service",
    description: "Revolutionizing train travel with on-seat delivery of food, beverages, and essentials.",
    url: "https://railquick.in",
    siteName: "RailQuick",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RailQuick - India's First Train On-Seat Delivery Service",
    description: "Revolutionizing train travel with on-seat delivery of food, beverages, and essentials.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
