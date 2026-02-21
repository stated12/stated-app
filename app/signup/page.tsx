"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {

  const supabase = createClient();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("individual");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function validateUsername(name: string) {
    return /^[a-z0-9_]{3,20}$/.test(name);
  }

  async function handleSignup(e: React.FormEvent) {

    e.preventDefault();

    setError("");

    const cleanUsername = username.trim().toLowerCase();

    if (!validateUsername(cleanUsername)) {
      setError("Username must be 3-20 lowercase letters, numbers, or underscores");
      return;
    }

    setLoading(true);

    // Check username availability
    const { data: existing } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", cleanUsername)
      .maybeSingle();

    if (existing) {
      setError("Username already taken");
      setLoading(false);
      return;
    }

    // Create auth user
    const { data: authData, error: authError } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (authError || !authData.user) {
      setError(authError?.message || "Signup failed");
      setLoading(false);
      return;
    }

    // Create profile row
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: authData.user.id,
        username: cleanUsername,
        display_name: cleanUsername,
        account_type: accountType,
      });

    if (profileError) {
      setError("Profile creation failed");
      setLoading(false);
      return;
    }

    // Redirect
    router.push("/dashboard");
  }

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.logo}>Stated</h1>

        <p style={styles.tagline}>
          Make commitments. Stay accountable. Build trust publicly.
        </p>

        <form onSubmit={handleSignup}>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />

          <div style={styles.preview}>
            stated.app/u/{username || "username"}
          </div>

          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <div style={styles.toggleRow}>

            <button
              type="button"
              onClick={() => setAccountType("individual")}
              style={{
                ...styles.toggle,
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
                ...styles.toggle,
                background:
                  accountType === "company" ? "#2563eb" : "#eee",
                color:
                  accountType === "company" ? "#fff" : "#000",
              }}
            >
              Company
            </button>

          </div>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <button
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

        </form>

        <div style={styles.footer}>
          Already have account?{" "}
          <a href="/login">Login</a>
        </div>

      </div>

    </div>
  );
}

const styles: any = {

  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    padding: 16,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    padding: 24,
    borderRadius: 16,
    border: "1px solid #eee",
  },

  logo: {
    textAlign: "center",
    marginBottom: 8,
  },

  tagline: {
    textAlign: "center",
    marginBottom: 24,
    opacity: 0.7,
  },

  input: {
    width: "100%",
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    border: "1px solid #ddd",
  },

  preview: {
    marginBottom: 12,
    fontSize: 14,
    opacity: 0.6,
  },

  toggleRow: {
    display: "flex",
    gap: 8,
    marginBottom: 12,
  },

  toggle: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "none",
  },

  button: {
    width: "100%",
    padding: 14,
    borderRadius: 8,
    background: "#2563eb",
    color: "#fff",
    border: "none",
  },

  error: {
    color: "red",
    marginBottom: 12,
  },

  footer: {
    marginTop: 16,
    textAlign: "center",
  },
};
