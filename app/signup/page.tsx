"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<"individual" | "company">("individual");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const latestCheck = useRef("");

  const reservedUsernames = ["admin","login","signup","dashboard","api","support","billing","settings","company","commitments"];

  function isValidPassword(p: string) {
    return p.length >= 8 && /[0-9!@#$%^&*(),.?":{}|<>]/.test(p);
  }

  useEffect(() => {
    const lower = username.toLowerCase();
    if (lower.length < 3 || lower.length > 20 || reservedUsernames.includes(lower) || !/^[a-z][a-z0-9_]{2,19}$/.test(lower)) {
      setUsernameStatus("idle");
      return;
    }
    latestCheck.current = lower;
    const checkUsername = async () => {
      setUsernameStatus("checking");
      const { data: profileMatch } = await supabase.from("profiles").select("id").eq("username", lower).maybeSingle();
      const { data: companyMatch } = await supabase.from("companies").select("id").eq("username", lower).maybeSingle();
      if (latestCheck.current !== lower) return;
      setUsernameStatus(profileMatch || companyMatch ? "taken" : "available");
    };
    const timeout = setTimeout(checkUsername, 400);
    return () => clearTimeout(timeout);
  }, [username]);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setError("");

    if (!username) { setError("Please enter a username"); return; }
    if (usernameStatus === "checking") { setError("Please wait - checking username availability"); return; }
    if (usernameStatus === "taken") { setError("That username is already taken. Please choose another."); return; }
    if (usernameStatus !== "available") { setError("Please enter a valid username (min 3 chars, letters/numbers only)"); return; }
    if (!email) { setError("Please enter your email address"); return; }
    if (!password) { setError("Please enter a password"); return; }
    if (!isValidPassword(password)) { setError("Password must be at least 8 characters and include a number or special character."); return; }

    setLoading(true);
    const lower = username.toLowerCase();

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // Store everything needed to create the profile/company after confirmation
          data: {
            username: lower,
            account_type: accountType,
          },
          // Callback lands on /auth/callback which handles profile creation
          emailRedirectTo: window.location.origin + "/auth/callback",
        },
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      // Show check-your-email screen - do NOT create profile/company yet
      setSubmitted(true);

    } catch {
      setError("Unexpected error. Please try again.");
    }

    setLoading(false);
  }

  const isCompany = accountType === "company";
  const profileUrl = `app.stated.in/${isCompany ? "c" : "u"}/${username || "username"}`;

  // -- Check your email screen -----------------------------------------------
  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7", padding: "24px 16px" }}>
        <div style={{ background: "#fff", borderRadius: 24, padding: "40px 32px", width: "100%", maxWidth: 400, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid #f0f1f6", textAlign: "center" as const }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#4338ca,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "0 4px 16px rgba(67,56,202,0.3)" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M3 8l9 6 9-6M3 8v10a1 1 0 001 1h16a1 1 0 001-1V8M3 8a1 1 0 011-1h16a1 1 0 011 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#0f0c29", marginBottom: 8 }}>Check your email</div>
          <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, marginBottom: 24 }}>
            We sent a confirmation link to
            <br />
            <strong style={{ color: "#0f0c29" }}>{email}</strong>
            <br />
            Click the link to activate your{" "}
            <strong>{isCompany ? "company" : "individual"}</strong> account.
          </div>
          <div style={{ background: "#f8f9fc", borderRadius: 12, padding: "12px 16px", marginBottom: 20, fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>
            Didn't receive it? Check your spam folder or{" "}
            <span
              onClick={() => setSubmitted(false)}
              style={{ color: "#4338ca", fontWeight: 600, cursor: "pointer" }}
            >
              try again
            </span>
            .
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af" }}>
            Already confirmed?{" "}
            <span onClick={() => router.push("/login")} style={{ color: "#4338ca", fontWeight: 600, cursor: "pointer" }}>
              Login
            </span>
          </div>
        </div>
      </div>
    );
  }

  // -- Signup form -----------------------------------------------------------
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7", padding: "24px 16px" }}>
      <form onSubmit={handleSignup} style={{ background: "#fff", borderRadius: 24, padding: "40px 32px", width: "100%", maxWidth: 400, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", border: "1px solid #f0f1f6" }}>

        <div style={{ textAlign: "center" as const, marginBottom: 28 }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: "#4338ca", marginBottom: 6 }}>Stated</div>
          <div style={{ fontSize: 13, color: "#9ca3af" }}>Make commitments. Stay accountable. Build trust publicly.</div>
        </div>

        {/* Account type toggle */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20, background: "#f2f3f7", borderRadius: 12, padding: 4 }}>
          {(["individual", "company"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setAccountType(type)}
              style={{ flex: 1, padding: "9px", borderRadius: 9, border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 700, background: accountType === type ? "#fff" : "transparent", color: accountType === type ? "#4338ca" : "#9ca3af", boxShadow: accountType === type ? "0 1px 6px rgba(0,0,0,0.08)" : "none", transition: "all 0.15s", textTransform: "capitalize" as const }}
            >
              {type === "individual" ? "Individual" : "Company"}
            </button>
          ))}
        </div>

        {isCompany && (
          <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 10, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: "#0369a1", lineHeight: 1.5 }}>
            Company account - you can invite team members after signup.
          </div>
        )}

        {/* Username */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>
            {isCompany ? "Company Username" : "Username"}
          </label>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder={isCompany ? "companyname" : "yourname"}
              value={username}
              required
              minLength={3}
              maxLength={20}
              onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
              style={{ width: "100%", border: `1.5px solid ${usernameStatus === "available" ? "#10b981" : usernameStatus === "taken" ? "#ef4444" : "#e8eaf2"}`, borderRadius: 10, padding: "11px 40px 11px 14px", fontSize: 14, color: "#0f0c29", outline: "none", fontFamily: "inherit", background: "#f8f9fc", boxSizing: "border-box" as const }}
            />
            <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>
              {usernameStatus === "checking" && <span style={{ color: "#9ca3af" }}>...</span>}
              {usernameStatus === "available" && <span style={{ color: "#10b981" }}>OK</span>}
              {usernameStatus === "taken" && <span style={{ color: "#ef4444" }}>X</span>}
            </div>
          </div>
          <div style={{ marginTop: 6, padding: "7px 12px", background: usernameStatus === "available" ? "#f0fdf4" : "#f8f9fc", borderRadius: 8, border: `1px solid ${usernameStatus === "available" ? "#bbf7d0" : "#f0f1f6"}` }}>
            <span style={{ fontSize: 11, color: usernameStatus === "available" ? "#15803d" : "#9ca3af", fontWeight: 500 }}>{profileUrl}</span>
          </div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Permanent - cannot be changed after signup</div>
        </div>

        {/* Email */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email</label>
          <input
            type="email" placeholder="you@email.com" required value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", border: "1px solid #e8eaf2", borderRadius: 10, padding: "11px 14px", fontSize: 14, color: "#0f0c29", outline: "none", fontFamily: "inherit", background: "#f8f9fc", boxSizing: "border-box" as const }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Password</label>
          <input
            type="password" placeholder="Min 8 chars + number or symbol" required minLength={8}
            value={password} onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", border: "1px solid #e8eaf2", borderRadius: 10, padding: "11px 14px", fontSize: 14, color: "#0f0c29", outline: "none", fontFamily: "inherit", background: "#f8f9fc", boxSizing: "border-box" as const }}
          />
        </div>

        <div style={{ background: "#eef2ff", borderRadius: 10, padding: "10px 14px", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#4338ca" }}>
            {isCompany ? "Start with 5 free company credits - no credit card needed" : "Start with 5 free commitments - no credit card needed"}
          </span>
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
          {loading ? "Creating account..." : `Create ${isCompany ? "Company" : ""} Account`}
        </button>

        <p style={{ textAlign: "center" as const, fontSize: 13, color: "#9ca3af", marginTop: 20 }}>
          Already have an account?{" "}
          <span onClick={() => router.push("/login")} style={{ color: "#4338ca", fontWeight: 600, cursor: "pointer" }}>Login</span>
        </p>

      </form>
    </div>
  );
}
