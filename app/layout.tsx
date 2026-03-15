import InstallPrompt from "@/components/InstallPrompt";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import GlobalFooter from "@/components/GlobalFooter";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
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
  title: "Stated",
  description: "Make commitments. Stay accountable. Build trust publicly.",
  manifest: "/manifest.json",
  themeColor: "#1E4ED8",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/icon-180.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-white`}>
        <main className="flex-1">
          {children}
        </main>

        <ServiceWorkerRegister />
        <InstallPrompt />

        <GlobalFooter />

        <Analytics />
      </body>
    </html>
  );
}
