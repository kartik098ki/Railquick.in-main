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
  metadataBase: new URL("https://railquick.in"),
  title: {
    default: "RailQuick - India's Train Delivery App",
    template: "%s | RailQuick - India's Train Delivery App",
  },
  description:
    "Get essential items delivered directly to your train seat across Indian Railways. Sealed drinking water, fast phone chargers, emergency OTC medicines, hygiene products, baby-care essentials, and travel security locks delivered during station halts at printed retail MRP.",
  keywords: [
    // English Primary Intent
    "train essentials delivery",
    "train delivery service",
    "train seat delivery",
    "essentials delivered to train seat",
    "train journey essentials",
    "railway essentials delivery",
    "train passenger delivery",
    "delivery inside train",
    "train travel delivery",
    "order essentials in train",
    "order products in train",
    "train shopping delivery",
    "train seat shopping",
    "train journey shopping",
    "essentials during train journey",
    "emergency items in train",
    "travel essentials delivery",
    "train delivery app India",
    "train seat delivery India",
    "delivery to train coach",
    "water bottle in train",
    "charger in train",
    "phone charger in train",
    "medicine delivery in train",
    "hygiene products in train",
    "baby products in train",
    "locks in train",
    "travel pillow train",
    // Hindi Search Intent
    "ट्रेन में सामान डिलीवरी",
    "ट्रेन में सामान कैसे मंगाएं",
    "ट्रेन की सीट पर सामान डिलीवरी",
    "ट्रेन में जरूरी सामान कैसे मंगाएं",
    "ट्रेन में डिलीवरी सेवा",
    "ट्रेन में दवा कैसे मंगाएं",
    "ट्रेन में पानी कैसे मंगाएं",
    "ट्रेन में चार्जर कैसे मंगाएं",
    "ट्रेन में बच्चों का सामान",
    "ट्रेन में हाइजीन प्रोडक्ट",
    "ट्रेन में इमरजेंसी सामान",
    "ट्रेन यात्रा में जरूरी चीजें",
    "ट्रेन में भूल गया सामान कैसे मंगाएं",
    "ट्रेन में बैठे-बैठे सामान मंगाएं",
    // Hinglish Search Intent
    "train me saman kaise mangaye",
    "train me medicine kaise mangaye",
    "train me water kaise mangaye",
    "train me charger kaise mangaye",
    "train me snacks kaise mangaye",
    "train me seat par delivery",
    "train me seat tak saman",
    "train mein saman delivery",
    "train mein charger chahiye",
    "train mein paani chahiye",
    "train mein medicine chahiye",
    "train journey essentials",
    "train me baby products",
    "train me hygiene products",
    "train me travel essentials",
    "train me kuch bhool gaya",
    "train mein saman order karna",
    "train seat delivery India",
    "train me delivery kaha milegi",
  ],
  authors: [{ name: "RailQuick Private Limited" }],
  creator: "RailQuick Private Limited",
  publisher: "RailQuick Private Limited",
  alternates: {
    canonical: "https://railquick.in",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "RailQuick - India's Train Delivery App",
    description:
      "Delivering drinking water, phone chargers, emergency OTC medicines, baby care & hygiene essentials directly to your train coach or seat across Indian Railways.",
    url: "https://railquick.in",
    siteName: "RailQuick",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/blog/blog-1.jpg",
        width: 1200,
        height: 630,
        alt: "RailQuick Train On-Seat Essentials Delivery Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RailQuick - India's Train Delivery App",
    description:
      "Delivering drinking water, phone chargers, OTC medicines, baby care & hygiene essentials to your train seat.",
    images: ["/images/blog/blog-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global Schema: Organization + WebSite
  const organizationSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://railquick.in/#organization",
        name: "RailQuick Private Limited",
        alternateName: ["RailQuick", "RailQuick India"],
        url: "https://railquick.in",
        logo: {
          "@type": "ImageObject",
          url: "https://railquick.in/logo.svg",
          caption: "RailQuick Logo",
        },
        description:
          "RailQuick Private Limited connects Indian Railways passengers with essential products — including sealed drinking water, mobile chargers, emergency OTC medicines, hygiene kits, baby care, and travel comfort accessories — delivered directly to their coach and seat during scheduled train halts.",
        sameAs: [
          "https://www.instagram.com/railquick/",
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "Customer Support",
            email: "support@railquick.in",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://railquick.in/#website",
        url: "https://railquick.in",
        name: "RailQuick",
        description: "India's First Train Journey Essentials On-Seat Delivery Platform",
        publisher: {
          "@id": "https://railquick.in/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://railquick.in/pnr?pnr={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Service",
        "@id": "https://railquick.in/#service",
        name: "Train Seat Essentials Delivery",
        serviceType: "Railway Passenger Quick-Commerce",
        provider: {
          "@id": "https://railquick.in/#organization",
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        description:
          "On-seat delivery of travel essentials including packaged drinking water, mobile phone chargers, emergency OTC health supplies, hygiene products, baby care items, and travel comfort goods to train passengers across Indian Railways.",
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-sans antialiased text-slate-900 bg-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
