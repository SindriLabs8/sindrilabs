import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";
import IntroLoader from "@/components/intro-loader";
import RouteFeedback from "@/components/route-feedback";

export const metadata: Metadata = {
  metadataBase: new URL("https://sindrilabs.xyz"),
  title: "Triputra Harza — Full Stack Engineer",
  description:
    "Triputra Harza is a full stack developer building thoughtful web products with React, Node.js, Laravel, and modern web technologies.",
  icons: { icon: "/icon.jpg" },
  openGraph: {
    title: "Triputra Harza — Full Stack Engineer",
    description: "Software, given intent.",
    images: [
      {
        url: "/icon.jpg",
        width: 512,
        height: 512,
        alt: "Triputra Harza monogram",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <IntroLoader />
        <RouteFeedback />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
