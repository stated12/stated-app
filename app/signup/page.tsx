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

  async function handleSignup() {

    try {

      setLoading(true);
      setError("");

      if (!username || !email || !password) {
        setError("Please fill all fields");
        setLoading(false);
        return;
      }

      // Step 1 — Create auth user
      const { data: authData, error: authError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      const user = authData.user;

      if (!user) {
        setError("Signup failed");
        setLoading(false);
        return;
      }

      // Step 2 — Create profile
      const { error: profileError } =
        await supabase.from("profiles").insert({
          id: user.id,
          username: username.toLowerCase(),
          display_name: username,
          credits: 0,
        });

      if (profileError) {
        setError("Profile creation failed");
        setLoading(false);
        return;
      }

      // Step 3 — Redirect to dashboard
      router.push("/dashboard");

    } catch (err) {

      setError("Something went wrong");

    } finally {

      setLoading(false);

    }

  }

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <div style={styles.logo}>
          Stated
        </div>

        <div style={styles.subtitle}>
          Make commitments. Stay accountable.
          <br />
          Build trust publicly.
        </div>

        <input
          style={styles.input}
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <div style={styles.url}>
          stated.app/u/{username || "username"}
        </div>

        <input
          style={styles.input}
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <div style={styles.toggleRow}>

          <button
            style={
              accountType === "individual"
                ? styles.toggleActive
                : styles.toggle
            }
            onClick={() =>
              setAccountType("individual")
            }
          >
            Individual
          </button>

          <button
            style={
              accountType === "company"
                ? styles.toggleActive
                : styles.toggle
            }
            onClick={() =>
              setAccountType("company")
            }
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
          style={styles.button}
          onClick={handleSignup}
          disabled={loading}
        >
          {loading
            ? "Creating account..."
            : "Create account"}
        </button>

        <div style={styles.bottom}>
          Already have account?{" "}
          <span
            style={styles.link}
            onClick={() =>
              router.push("/login")
            }
          >
            Login
          </span>
        </div>

      </div>

    </div>
  );

}

const styles: any = {

  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8fafc",
  },

  card: {
    width: 380,
    padding: 28,
    borderRadius: 12,
    background: "#fff",
    border: "1px solid #e5e7eb",
  },

  logo: {
    fontSize: 28,
    fontWeight: 800,
    color: "#2563eb",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 20,
  },

  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    border: "1px solid #d1d5db",
    fontSize: 14,
  },

  url: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 10,
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
    border: "1px solid #d1d5db",
    background: "#f3f4f6",
    cursor: "pointer",
  },

  toggleActive: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #2563eb",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },

  button: {
    width: "100%",
    padding: 12,
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontWeight: 600,
    cursor: "pointer",
  },

  error: {
    color: "red",
    marginBottom: 10,
    fontSize: 14,
  },

  bottom: {
    textAlign: "center",
    marginTop: 14,
    fontSize: 14,
  },

  link: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: 600,
  },

};
