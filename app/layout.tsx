import InstallPrompt from "@/components/InstallPrompt";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-white`}
      >
        <main className="flex-1">
          {children}
        </main>

        {/* PWA */}
        <ServiceWorkerRegister />
        <InstallPrompt />

        {/* Global Footer */}
        <footer className="border-t py-6 text-center text-sm text-gray-500 bg-white">
          <div className="space-x-4">
            <a
              href="https://stated.in/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Privacy Policy
            </a>

            <a
              href="https://stated.in/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Terms of Service
            </a>

            <a
              href="https://stated.in/refund"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Refund Policy
            </a>
          </div>

          <div className="mt-2">
            © {new Date().getFullYear()} Stated
          </div>
        </footer>
      </body>
    </html>
  );
}
