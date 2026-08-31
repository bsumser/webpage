import type { Metadata } from "next";
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
  metadataBase: new URL('https://bsumser.dev'),
  title: {
    default: 'Thomas Sumser',
    template: '%s | Thomas Sumser',
  },
  description: 'Personal website, software engineering projects, and photography.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Thomas Sumser',
    title: 'Thomas Sumser',
    description: 'Personal website, software engineering projects, and photography.',
    images: [
      {
        url: '/assets/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Thomas Sumser Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thomas Sumser',
    description: 'Personal website, software engineering projects, and photography.',
    images: ['/assets/hero.webp'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}