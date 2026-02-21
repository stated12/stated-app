"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {

  const router = useRouter();
  const supabase = createClient();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] =
    useState<"individual" | "company">("individual");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [usernameAvailable, setUsernameAvailable] =
    useState<boolean | null>(null);

  const [checkingUsername, setCheckingUsername] =
    useState(false);

  // Username validation
  function isValidUsername(value: string) {

    const regex = /^[a-z0-9_]{3,20}$/;

    return regex.test(value);

  }

  // Check username availability
  useEffect(() => {

    if (!username || !isValidUsername(username)) {
      setUsernameAvailable(null);
      return;
    }

    const check = async () => {

      setCheckingUsername(true);

      const { data } =
        await supabase
          .from("profiles")
          .select("id")
          .eq("username", username.toLowerCase())
          .maybeSingle();

      setUsernameAvailable(!data);

      setCheckingUsername(false);

    };

    const timeout = setTimeout(check, 400);

    return () => clearTimeout(timeout);

  }, [username]);



  async function handleSignup(e: React.FormEvent) {

    e.preventDefault();

    setError("");

    if (!isValidUsername(username)) {

      setError(
        "Username must be 3-20 characters, lowercase letters, numbers, or underscore"
      );

      return;

    }

    if (!usernameAvailable) {

      setError("Username already taken");

      return;

    }

    setLoading(true);

    try {

      const { error: authError } =
        await supabase.auth.signUp({

          email,

          password,

          options: {
            data: {
              username: username.toLowerCase(),
              display_name: username,
              account_type: accountType,
            },
          },

        });

      if (authError) {

        setError(authError.message);

        setLoading(false);

        return;

      }

      router.push("/dashboard");

    } catch {

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
          onChange={(e) =>
            setUsername(
              e.target.value
                .toLowerCase()
                .replace(/[^a-z0-9_]/g, "")
            )
          }
          style={styles.input}
        />

        <div style={styles.url}>

          stated.app/u/{username || "username"}

          {checkingUsername && (
            <span style={{ color: "#666", marginLeft: 8 }}>
              checking...
            </span>
          )}

          {usernameAvailable === true && (
            <span style={{ color: "green", marginLeft: 8 }}>
              ✓ available
            </span>
          )}

          {usernameAvailable === false && (
            <span style={{ color: "red", marginLeft: 8 }}>
              ✗ taken
            </span>
          )}

        </div>


        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={styles.input}
        />


        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={styles.input}
        />


        {/* Account Type */}
        <div style={styles.accountTypeContainer}>

          <button
            type="button"
            onClick={() =>
              setAccountType("individual")
            }
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
            onClick={() =>
              setAccountType("company")
            }
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
          disabled={
            loading ||
            checkingUsername ||
            usernameAvailable === false
          }
          style={styles.submit}
        >
          {loading
            ? "Creating..."
            : "Create account"}
        </button>


        {/* Login */}
        <div style={styles.login}>
          Already have account?{" "}
          <span
            onClick={() =>
              router.push("/login")
            }
            style={styles.loginLink}
          >
            Login
          </span>
        </div>

      </form>

    </div>
  );

}
