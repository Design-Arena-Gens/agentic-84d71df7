import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AffiliMate AI ? Fast Affiliate Content Tools",
  description:
    "Generate short video scripts, captions, hashtags, and a sharable bio link for Instagram & YouTube Shorts.",
  metadataBase: new URL("https://agentic-84d71df7.vercel.app"),
  openGraph: {
    title: "AffiliMate AI ? Fast Affiliate Content Tools",
    description:
      "Generate short video scripts, captions, hashtags, and a sharable bio link for Instagram & YouTube Shorts.",
    url: "https://agentic-84d71df7.vercel.app",
    siteName: "AffiliMate AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AffiliMate AI ? Fast Affiliate Content Tools",
    description:
      "Generate short video scripts, captions, hashtags, and a sharable bio link for Instagram & YouTube Shorts.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50`}>
        <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              AffiliMate <span className="text-zinc-500">AI</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link className="hover:text-black text-zinc-600" href="/tools/script">Scripts</Link>
              <Link className="hover:text-black text-zinc-600" href="/tools/captions">Captions</Link>
              <Link className="hover:text-black text-zinc-600" href="/builder">Bio Link</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto min-h-[calc(100vh-64px)] max-w-6xl px-4 py-10">{children}</main>
        <footer className="border-t border-zinc-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-zinc-500">
            ? {new Date().getFullYear()} AffiliMate AI. Built for Instagram & YouTube Shorts.
          </div>
        </footer>
      </body>
    </html>
  );
}
