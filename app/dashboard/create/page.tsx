"use client";

import { Suspense, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function CreateCommitmentForm() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");
  const [customDate, setCustomDate] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [company, setCompany] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const individualCategories = ["Fitness","Learning","Writing","Health","Finance","Business"];
  const companyCategories = ["Marketing","Sales","Operations","Product","Strategic","Announcement","Other"];

  const searchParams = useSearchParams();
  const isCompanyWorkspace = pathname.startsWith("/dashboard/company") || searchParams.get("workspace") === "company";
  const categories = isCompanyWorkspace ? companyCategories : individualCategories;

  useEffect(() => { loadUser(); }, []);

  async function loadUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }

    const { data: profileData } = await supabase
      .from("profiles").select("*").eq("id", user.id).single();
    setProfile(profileData);

    if (isCompanyWorkspace) {
      const { data: membership } = await supabase
        .from("company_members").select("company_id")
        .eq("user_id", user.id).maybeSingle();

      if (membership) {
        const { data: companyData } = await supabase
          .from("companies").select("*").eq("id", membership.company_id).single();
        setCompany(companyData);
      } else {
        // Check ownership
        const { data: ownedCompany } = await supabase
          .from("companies").select("*").eq("owner_user_id", user.id).maybeSingle();
        if (ownedCompany) setCompany(ownedCompany);
      }
    }
    setInitialLoading(false);
  }

  function calculateDeadline() {
    if (deadline === "custom") return customDate;
    const date = new Date();
    if (deadline === "1m") date.setMonth(date.getMonth() + 1);
    if (deadline === "3m") date.setMonth(date.getMonth() + 3);
    if (deadline === "6m") date.setMonth(date.getMonth() + 6);
    if (deadline === "1y") date.setFullYear(date.getFullYear() + 1);
    return date.toISOString().split("T")[0];
  }

  async function createCommitment() {
    if (!text.trim())  { alert("Commitment text required"); return; }
    if (!category)     { alert("Please select a category"); return; }
    if (!deadline)     { alert("Please select a deadline"); return; }
    if (deadline === "custom" && !customDate) { alert("Please select custom date"); return; }

    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    const targetDate = calculateDeadline();

    let insertData: any = {
      text: text.trim(),
      category,
      target_date: targetDate,
      status: "active",
    };

    if (company) {
      insertData.company_id = company.id;
      insertData.created_by_user_id = user?.id;
    } else {
      insertData.user_id = user?.id;
    }

    const { error } = await supabase.from("commitments").insert(insertData);

    if (error) { alert(error.message); setLoading(false); return; }

    setLoading(false);
    // ← FIXED: redirect to correct workspace
    router.push(company ? "/dashboard/company" : "/dashboard");
  }

  if (initialLoading) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 13, color: "#9ca3af" }}>Loading...</div>
    </div>
  );

  const accentColor = company ? "#0891b2" : "#4338ca";
  const accentGradient = company
    ? "linear-gradient(135deg,#0891b2,#0e7490)"
    : "linear-gradient(135deg,#4338ca,#6366f1)";

  const deadlineOptions = [
    { value: "1m", label: "1 Month" },
    { value: "3m", label: "3 Months" },
    { value: "6m", label: "6 Months" },
    { value: "1y", label: "1 Year" },
    { value: "custom", label: "Custom date" },
  ];

  return (
    <div style={{ margin: "-32px -24px", background: "#f2f3f7", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "#fff", padding: "16px 16px 14px", borderBottom: "1px solid #f0f1f6" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#0f0c29" }}>
          {company ? `Create for ${company.name}` : "Create Commitment"}
        </div>
        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>
          {company ? "This will appear on your company profile" : "This will appear on your public profile"}
        </div>
      </div>

      <div style={{ padding: 16 }}>

        {/* Workspace indicator */}
        {company && (
          <div style={{ background: "#e0f2fe", border: "1px solid #bae6fd", borderRadius: 12, padding: "10px 14px", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: accentGradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
              {company.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0e7490" }}>Posting as {company.name}</div>
              <div style={{ fontSize: 10, color: "#0891b2" }}>Company commitment</div>
            </div>
          </div>
        )}

        {/* Commitment text */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #f0f1f6" }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 8, letterSpacing: 0.3 }}>
            Your commitment
          </label>
          <textarea
            placeholder="I commit to..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            style={{ width: "100%", border: "1.5px solid #e8eaf2", borderRadius: 10, padding: "12px 14px", fontSize: 14, color: "#0f0c29", outline: "none", fontFamily: "inherit", background: "#f8f9fc", resize: "none", lineHeight: 1.6, boxSizing: "border-box" }}
          />
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 6, textAlign: "right" }}>
            {text.length} / 280
          </div>
        </div>

        {/* Category */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, border: "1px solid #f0f1f6" }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 10, letterSpacing: 0.3 }}>
            Category
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                style={{
                  padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                  border: `1.5px solid ${category === c ? accentColor : "#e8eaf2"}`,
                  background: category === c ? accentColor : "#fff",
                  color: category === c ? "#fff" : "#6b7280",
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Deadline */}
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, marginBottom: 20, border: "1px solid #f0f1f6" }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 10, letterSpacing: 0.3 }}>
            Deadline
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {deadlineOptions.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => setDeadline(d.value)}
                style={{
                  padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                  border: `1.5px solid ${deadline === d.value ? accentColor : "#e8eaf2"}`,
                  background: deadline === d.value ? accentColor : "#fff",
                  color: deadline === d.value ? "#fff" : "#6b7280",
                  cursor: "pointer", fontFamily: "inherit",
                }}
              >
                {d.label}
              </button>
            ))}
          </div>

          {deadline === "custom" && (
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              style={{ marginTop: 12, width: "100%", border: "1px solid #e8eaf2", borderRadius: 10, padding: "10px 14px", fontSize: 14, color: "#0f0c29", outline: "none", fontFamily: "inherit", background: "#f8f9fc", boxSizing: "border-box" }}
            />
          )}
        </div>

        {/* Submit */}
        <button
          onClick={createCommitment}
          disabled={loading}
          style={{
            width: "100%", padding: "14px",
            background: loading ? "#9ca3af" : accentGradient,
            border: "none", borderRadius: 14, color: "#fff", fontSize: 14, fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
            boxShadow: loading ? "none" : `0 4px 14px rgba(${company ? "8,145,178" : "67,56,202"},0.3)`,
          }}
        >
          {loading ? "Publishing..." : "Publish Commitment →"}
        </button>

      </div>
    </div>
  );
}

export default function CreateCommitmentPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 13, color: "#9ca3af" }}>Loading...</div>
      </div>
    }>
      <CreateCommitmentForm />
    </Suspense>
  );
}
