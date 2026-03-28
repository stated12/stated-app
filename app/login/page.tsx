"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const supabase     = createClient();
  const router       = useRouter();
  const searchParams = useSearchParams();

  const inviteToken = searchParams.get("invite");
  const errorParam  = searchParams.get("error");

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(
    errorParam === "verification_failed"
      ? "Verification failed. Please try again."
      : errorParam === "missing_code"
      ? "Invalid verification link."
      : ""
  );

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    // If came from invite link -- go back to complete acceptance
    if (inviteToken) {
      router.push("/invite/" + inviteToken);
      router.refresh();
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // Company OWNERS always go to company dashboard
      const { data: ownedCompany } = await supabase
        .from("companies")
        .select("id")
        .eq("owner_user_id", user.id)
        .maybeSingle();

      if (ownedCompany) {
        router.push("/dashboard/company");
        router.refresh();
        return;
      }

      // Invited MEMBERS go to individual dashboard (layout shows company switcher)
      // They have their own individual account + access to company via switcher
      const { data: membership } = await supabase
        .from("company_members")
        .select("company_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (membership) {
        router.push("/dashboard");
        router.refresh();
        return;
      }
    }

    // Pure individual
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div style={{ background: "#fff", borderRadius: 24, padding: "40px 32px", width: "100%", maxWidth: 400, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid #f0f1f6" }}>

      <div style={{ textAlign: "center" as const, marginBottom: 28 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#4338ca", marginBottom: 6 }}>Stated</div>
        <div style={{ fontSize: 13, color: "#9ca3af" }}>
          {inviteToken ? "Login to accept your invitation" : "Login to your accountability profile"}
        </div>
      </div>

      {inviteToken && (
        <div style={{ background: "#e0f2fe", border: "1px solid #bae6fd", borderRadius: 12, padding: "10px 14px", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 8h12M8 2l6 6-6 6" stroke="#0891b2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#0e7490" }}>You have a pending company invitation</span>
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email</label>
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            style={{ width: "100%", border: "1px solid #e8eaf2", borderRadius: 10, padding: "11px 14px", fontSize: 14, color: "#0f0c29", outline: "none", fontFamily: "inherit", background: "#f8f9fc", boxSizing: "border-box" as const }}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Password</label>
          <input
            type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            style={{ width: "100%", border: "1px solid #e8eaf2", borderRadius: 10, padding: "11px 14px", fontSize: 14, color: "#0f0c29", outline: "none", fontFamily: "inherit", background: "#f8f9fc", boxSizing: "border-box" as const }}
          />
        </div>

        <div style={{ textAlign: "right" as const, marginBottom: 20 }}>
          <Link href="/forgot-password" style={{ fontSize: 12, fontWeight: 600, color: "#4338ca", textDecoration: "none" }}>
            Forgot password?
          </Link>
        </div>

        {error && (
          <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#dc2626", fontWeight: 500 }}>
            {error}
          </div>
        )}

        <button
          type="submit" disabled={loading}
          style={{ width: "100%", padding: "13px", background: loading ? "#9ca3af" : "linear-gradient(135deg,#4338ca,#6366f1)", border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: loading ? "none" : "0 3px 12px rgba(67,56,202,0.3)" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p style={{ textAlign: "center" as const, fontSize: 13, color: "#9ca3af", marginTop: 20 }}>
        Don't have an account?{" "}
        <Link href="/signup" style={{ color: "#4338ca", fontWeight: 600, textDecoration: "none" }}>
          Create account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7", padding: "0 16px" }}>
      <Suspense fallback={
        <div style={{ background: "#fff", borderRadius: 24, padding: "40px 32px", width: "100%", maxWidth: 400, textAlign: "center" as const, color: "#9ca3af", fontSize: 14 }}>
          Loading...
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}
