import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact RailQuick | Customer Support & Railway Partnerships",
  description:
    "Get in touch with RailQuick customer support, request an emergency essential item for your train journey, or connect with our railway vendor partnerships team.",
  keywords: [
    "contact railquick",
    "railquick support",
    "railquick helpline",
    "train essentials emergency request",
    "railway vendor partnership",
    "railquick email",
  ],
  alternates: {
    canonical: "https://railquick.in/contact",
  },
  openGraph: {
    title: "Contact RailQuick | Customer Support & Railway Partnerships",
    description:
      "Reach our 24/7 dedicated support team for emergency train journey inquiries or partnership opportunities.",
    url: "https://railquick.in/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
