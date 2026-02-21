"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {

  const router = useRouter();
  const supabase = createClient();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<"individual" | "company">("individual");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent) {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

      // 1. Create auth user
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
        setError("User creation failed");
        setLoading(false);
        return;
      }

      // Ensure session exists
      await supabase.auth.getSession();

      // 2. Create profile row
      const { error: profileError } =
        await supabase
          .from("profiles")
          .insert({
            id: user.id,
            username: username.toLowerCase(),
            display_name: username,
            account_type: accountType,
            credits: 0,
          });

      if (profileError) {
        setError(profileError.message);
        setLoading(false);
        return;
      }

      // 3. Redirect to dashboard
      router.push("/dashboard");

    } catch (err: any) {

      setError("Something went wrong");

    } finally {

      setLoading(false);

    }

  }

  return (
    <div style={styles.container}>

      <form onSubmit={handleSignup} style={styles.card}>

        <div style={styles.brand}>
          Stated
        </div>

        <div style={styles.tagline}>
          Make commitments. Stay accountable. Build trust publicly.
        </div>


        {/* Username */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <div style={styles.url}>
          stated.app/u/{username || "username"}
        </div>


        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />


        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />


        {/* Account Type */}
        <div style={styles.accountTypeContainer}>

          <button
            type="button"
            onClick={() => setAccountType("individual")}
            style={{
              ...styles.accountTypeButton,
              background:
                accountType === "individual"
                  ? "#2563eb"
                  : "#eee",
              color:
                accountType === "individual"
                  ? "#fff"
                  : "#000",
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
                accountType === "company"
                  ? "#2563eb"
                  : "#eee",
              color:
                accountType === "company"
                  ? "#fff"
                  : "#000",
            }}
          >
            Company
          </button>

        </div>


        {/* Error */}
        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}


        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={styles.submit}
        >
          {loading ? "Creating..." : "Create account"}
        </button>


        {/* Login Link */}
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
    marginBottom: 12,
    color: "#666",
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
