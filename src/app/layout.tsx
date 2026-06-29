import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { GlassBackground } from "@/components/GlassBackground";
import { Preloader } from "@/components/Preloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Execution Labs. Agents and software that save companies time and money.",
  description:
    "Execution Labs builds AI agents and software that save companies time and money. From internal tools to full product systems, we move fast and the work holds up.",
  metadataBase: new URL("https://executionlabs.com"),
  openGraph: {
    title: "Execution Labs",
    description:
      "We build agents and software that save companies time and money.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Execution Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Execution Labs",
    description:
      "We build agents and software that save companies time and money.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-ink">
        <GlassBackground />
        <Preloader />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
