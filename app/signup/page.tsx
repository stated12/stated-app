"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [username, setUsername] = useState("");
  const [usernameStatus, setUsernameStatus] =
    useState<"idle" | "checking" | "available" | "taken">("idle");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [accountType, setAccountType] =
    useState<"individual" | "company">("individual");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- USERNAME CHECK ---------------- */

  useEffect(() => {
    if (username.length < 3 || username.length > 20) {
      setUsernameStatus("idle");
      return;
    }

    const checkUsername = async () => {
      setUsernameStatus("checking");

      const lower = username.toLowerCase();

      const { data: profileMatch } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", lower)
        .maybeSingle();

      const { data: companyMatch } = await supabase
        .from("companies")
        .select("id")
        .eq("username", lower)
        .maybeSingle();

      if (profileMatch || companyMatch) {
        setUsernameStatus("taken");
      } else {
        setUsernameStatus("available");
      }
    };

    const timeout = setTimeout(checkUsername, 400);
    return () => clearTimeout(timeout);
  }, [username, supabase]);

  /* ---------------- SIGNUP ---------------- */

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setError("");

    if (usernameStatus !== "available") {
      setError("Username is not available");
      return;
    }

    if (username.length < 3 || username.length > 20) {
      setError("Username must be 3–20 characters");
      return;
    }

    setLoading(true);

    const lower = username.toLowerCase();

    try {
      // 1️⃣ Create Auth User
      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (authError) {
        setError(authError.message);
        return;
      }

      const user = authData?.user;
      if (!user) {
        setError("Signup failed");
        return;
      }

      // 2️⃣ Insert Profile
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          username: lower,
          display_name: username,
          account_type: accountType,
          credits: 2,
          plan_key: "free",
        });

      if (profileError) {
        await supabase.auth.signOut();
        setError("Could not create profile. Please try again.");
        return;
      }

      // 3️⃣ If Company
      if (accountType === "company") {
        const { data: company, error: companyError } =
          await supabase
            .from("companies")
            .insert({
              username: lower,
              name: username,
              plan_key: "free",
              credits: 2,
              member_limit: 2,
            })
            .select()
            .single();

        if (companyError || !company) {
          setError("Could not create company.");
          return;
        }

        await supabase.from("company_members").insert({
          company_id: company.id,
          user_id: user.id,
          role: "owner",
        });

        router.push("/dashboard/company");
        return;
      }

      router.push("/dashboard");
    } catch {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- UI ---------------- */

  return (
    <div style={styles.container}>
      <form onSubmit={handleSignup} style={styles.card}>
        <div style={styles.brand}>Stated</div>
        <div style={styles.tagline}>
          Make commitments. Stay accountable. Build trust publicly.
        </div>

        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          minLength={3}
          maxLength={20}
          onChange={(e) =>
            setUsername(
              e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "")
            )
          }
          style={styles.input}
        />

        <div style={styles.url}>
          app.stated.in/{accountType === "company" ? "c" : "u"}/
          {username || "username"}
        </div>

        <div style={{ fontSize: 12, marginBottom: 6, color: "#777" }}>
          This will be your permanent public profile URL and cannot be changed.
        </div>

        <div style={styles.usernameStatus}>
          {usernameStatus === "checking" && "Checking..."}
          {usernameStatus === "available" && (
            <span style={{ color: "green" }}>✓ Available</span>
          )}
          {usernameStatus === "taken" && (
            <span style={{ color: "red" }}>✗ Already taken</span>
          )}
        </div>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <div style={styles.accountTypeContainer}>
          <button
            type="button"
            onClick={() => setAccountType("individual")}
            style={{
              ...styles.accountTypeButton,
              background:
                accountType === "individual" ? "#2563eb" : "#eee",
              color:
                accountType === "individual" ? "#fff" : "#000",
            }}
          >
            Individual
          </button>

          <button
            type="button"
            onClick={() => setAccountType("company")}
            style={{
              ...styles.accountTypeButton,
              background:
                accountType === "company" ? "#2563eb" : "#eee",
              color:
                accountType === "company" ? "#fff" : "#000",
            }}
          >
            Company
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <button
          type="submit"
          disabled={loading || usernameStatus !== "available"}
          style={styles.submit}
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        <div style={styles.login}>
          Already have account?{" "}
          <span
            onClick={() => router.push("/login")}
            style={styles.loginLink}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles: any = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  card: {
    width: 400,
    background: "#fff",
    padding: 32,
    borderRadius: 12,
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  brand: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563eb",
    textAlign: "center",
    marginBottom: 8,
  },
  tagline: {
    textAlign: "center",
    marginBottom: 24,
    color: "#555",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
  },
  url: {
    fontSize: 12,
    marginBottom: 4,
    color: "#666",
  },
  usernameStatus: {
    fontSize: 12,
    marginBottom: 12,
  },
  accountTypeContainer: {
    display: "flex",
    gap: 12,
    marginBottom: 16,
  },
  accountTypeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
  submit: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    border: "none",
    background: "#2563eb",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: 12,
  },
  login: {
    textAlign: "center",
    marginTop: 16,
  },
  loginLink: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
