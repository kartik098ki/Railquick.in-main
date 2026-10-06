import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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
        className="font-sans antialiased text-slate-900 bg-white"
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

