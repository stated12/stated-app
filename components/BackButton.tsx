"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ fallback = "/dashboard" }: { fallback?: string }) {
  const router = useRouter();
  function handleBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  }
  return (
    <button
      type="button"
      onClick={handleBack}
      className="flex items-center gap-1 text-xs font-medium"
      style={{ color: "#0891b2", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M9 2L4 7l5 5" stroke="#0891b2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Back
    </button>
  );
}
