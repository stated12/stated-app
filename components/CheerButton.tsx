"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CheerButton({
  commitmentId,
  initialCount = 0,
  size = "default",
}: {
  commitmentId: string;
  initialCount?: number;
  size?: "default" | "small";
}) {
  const supabase = createClient();
  const router = useRouter();

  const [count, setCount] = useState(initialCount);
  const [cheered, setCheered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserId(user.id);
      const { data } = await supabase
        .from("commitment_cheers")
        .select("id")
        .eq("commitment_id", commitmentId)
        .eq("user_id", user.id)
        .maybeSingle();
      setCheered(!!data);
    }
    init();
  }, [commitmentId]);

  async function handleCheer(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!userId) {
      router.push(`/signup?next=/commitment/${commitmentId}`);
      return;
    }
    if (loading) return;
    setLoading(true);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 600);
    if (cheered) {
      await supabase.from("commitment_cheers").delete()
        .eq("commitment_id", commitmentId).eq("user_id", userId);
      setCheered(false);
      setCount((c) => Math.max(0, c - 1));
    } else {
      await supabase.from("commitment_cheers")
        .insert({ commitment_id: commitmentId, user_id: userId });
      setCheered(true);
      setCount((c) => c + 1);
    }
    setLoading(false);
  }

  const isSmall = size === "small";

  return (
    <button
      onClick={handleCheer}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: isSmall ? 4 : 6,
        background: cheered ? "#fff7ed" : "#fff",
        border: `1.5px solid ${cheered ? "#f97316" : "#e8eaf2"}`,
        borderRadius: 20,
        padding: isSmall ? "4px 10px" : "7px 14px",
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.15s",
        transform: animating ? "scale(1.12)" : "scale(1)",
        boxShadow: cheered ? "0 2px 8px rgba(249,115,22,0.2)" : "none",
      }}
    >
      <svg
        width={isSmall ? 12 : 15}
        height={isSmall ? 12 : 15}
        viewBox="0 0 16 16"
        fill="none"
        style={{
          transform: animating ? "rotate(-12deg)" : "rotate(0deg)",
          transition: "transform 0.2s",
          flexShrink: 0,
        }}
      >
        {/* Speaker body */}
        <path
          d="M2 6v4a.5.5 0 00.5.5H4L6.5 13V3L4 5.5H2.5A.5.5 0 002 6z"
          fill={cheered ? "#f97316" : "none"}
          stroke={cheered ? "#f97316" : "#6b7280"}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Megaphone cone */}
        <path
          d="M6.5 3.5L12 1.5v13l-5.5-2"
          fill={cheered ? "#fed7aa" : "none"}
          stroke={cheered ? "#f97316" : "#6b7280"}
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
        {/* Sound wave 1 */}
        <path
          d="M13.2 5.5c.6.6.8 1.5.8 2.5s-.2 1.9-.8 2.5"
          stroke={cheered ? "#f97316" : "#9ca3af"}
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        {/* Sound wave 2 — only when cheered */}
        {cheered && (
          <path
            d="M14.5 4c1 1 1.5 2.5 1.5 4s-.5 3-1.5 4"
            stroke="#f97316"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.5"
          />
        )}
      </svg>

      <span
        style={{
          fontSize: isSmall ? 10 : 12,
          fontWeight: 700,
          color: cheered ? "#f97316" : "#6b7280",
          transition: "color 0.15s",
          whiteSpace: "nowrap",
        }}
      >
        {count > 0 ? `${count} ${count === 1 ? "Cheer" : "Cheers"}` : "Cheer"}
      </span>
    </button>
  );
}
