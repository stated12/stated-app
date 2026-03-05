"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function GlobalFooter() {
  const pathname = usePathname();

  // Hide footer inside dashboard
  if (pathname.startsWith("/dashboard")) return null;

  return (
    <footer className="border-t py-6 text-center text-sm text-gray-500 bg-white">
      
      {/* Navigation + Legal Links */}
      <div className="flex justify-center flex-wrap gap-4">

        <Link
          href="/"
          className="hover:underline"
        >
          Home
        </Link>

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

      {/* Copyright */}
      <div className="mt-3">
        © {new Date().getFullYear()} Stated
      </div>

    </footer>
  );
}
