"use client";

import { usePathname } from "next/navigation";

export default function GlobalFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) return null;

  return (
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
  );
}
