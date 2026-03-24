"use client";

import { Suspense, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

// ─── Plan limits ─────────────────────────────────────────────────────────────
const PLAN_NAMES: Record<string, string> = {
  free: "Free",
  ind_499: "Starter",
  ind_899: "Growth",
  ind_1299: "Pro Creator",
  comp_1999: "Team",
  comp_2999: "Growth",
  comp_4999: "Scale",
};

// ─── Categories ─────────────────────────────────────────────────────────────
const INDIVIDUAL_CATEGORIES = [
  { label: "Fitness", emoji: "💪" },
  { label: "Learning", emoji: "📚" },
  { label: "Writing", emoji: "✍️" },
  { label: "Health", emoji: "🫀" },
  { label: "Finance", emoji: "💰" },
  { label: "Business", emoji: "🚀" },
  { label: "Career / Leadership", emoji: "🏆" },
  { label: "Mental Health / Wellbeing", emoji: "🧠" },
  { label: "Relationships / Community", emoji: "🤝" },
  { label: "Sustainability / Environment", emoji: "🌱" },
];

const COMPANY_CATEGORIES = [
  { label: "Marketing", emoji: "📣" },
  { label: "Sales", emoji: "📈" },
  { label: "Operations", emoji: "⚙️" },
  { label: "Product", emoji: "📦" },
  { label: "Strategic", emoji: "♟️" },
  { label: "Announcements", emoji: "📢" },
  { label: "Innovation & R&D", emoji: "🔬" },
  { label: "Culture & People", emoji: "🫂" },
  { label: "ESG / Sustainability", emoji: "🌍" },
  { label: "Community & CSR", emoji: "💚" },
  { label: "Finance", emoji: "💰" },
  { label: "Legal & Compliance", emoji: "⚖️" },
  { label: "Customer Success", emoji: "⭐" },
];

// ─── Timeline ───────────────────────────────────────────────────────────────
const DEADLINE_OPTIONS = [
  { value: "1w", label: "1 Week" },
  { value: "2w", label: "2 Weeks" },
  { value: "3w", label: "3 Weeks" },
  { value: "1m", label: "1 Month" },
  { value: "3m", label: "3 Months" },
  { value: "6m", label: "6 Months" },
  { value: "1y", label: "1 Year" },
  { value: "custom", label: "Custom" },
];

function calculateDeadlineDate(deadline: string, customDate: string): string {
  if (deadline === "custom") return customDate;
  const d = new Date();
  if (deadline === "1w") d.setDate(d.getDate() + 7);
  if (deadline === "2w") d.setDate(d.getDate() + 14);
  if (deadline === "3w") d.setDate(d.getDate() + 21);
  if (deadline === "1m") d.setMonth(d.getMonth() + 1);
  if (deadline === "3m") d.setMonth(d.getMonth() + 3);
  if (deadline === "6m") d.setMonth(d.getMonth() + 6);
  if (deadline === "1y") d.setFullYear(d.getFullYear() + 1);
  return d.toISOString().split("T")[0];
}

// ─── Main Form ───────────────────────────────────────────────────────────────
function CreateCommitmentForm() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");
  const [customDate, setCustomDate] = useState("");

  const [profile, setProfile] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const isCompanyWS =
    pathname.startsWith("/dashboard/company") ||
    searchParams.get("workspace") === "company";

  const categories = isCompanyWS ? COMPANY_CATEGORIES : INDIVIDUAL_CATEGORIES;
  const accentColor = isCompanyWS ? "#0891b2" : "#4338ca";

  useEffect(() => { loadUser(); }, []);

  async function loadUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { data: profileData } = await supabase
      .from("profiles").select("*").eq("id", user.id).single();
    setProfile(profileData);

    setInitialLoading(false);
  }

  async function handleSubmit() {
    if (!text.trim()) return alert("Write commitment");
    if (!category) return alert("Select category");
    if (!deadline) return alert("Select deadline");

    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("commitments").insert({
      text,
      category,
      target_date: calculateDeadlineDate(deadline, customDate),
      user_id: user.id,
      status: "active",
    });

    setLoading(false);
    router.push("/dashboard");
  }

  if (initialLoading) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>

      {/* TEXT */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* CATEGORY */}
      <div>
        {categories.map((c) => (
          <button key={c.label} onClick={() => setCategory(c.label)}>
            {c.label}
          </button>
        ))}
      </div>

      {/* DEADLINE */}
      <div>
        {DEADLINE_OPTIONS.map((d) => {
          const selected = deadline === d.value;
          return (
            <button
              key={d.value}
              onClick={() => setDeadline(d.value)}
              style={{
                background: selected ? accentColor : "#eee",
              }}
            >
              {d.label}
            </button>
          );
        })}
      </div>

      {/* CUSTOM DATE */}
      {deadline === "custom" && (
        <input
          type="date"
          value={customDate}
          onChange={(e) => setCustomDate(e.target.value)}
        />
      )}

      {/* SUBMIT */}
      <button onClick={handleSubmit}>
        {loading ? "Creating..." : "Create"}
      </button>

    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <CreateCommitmentForm />
    </Suspense>
  );
}
