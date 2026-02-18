"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState<"individual" | "company">(
    "individual"
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState<
    boolean | null
  >(null);

  // Check username availability
  async function checkUsername(value: string) {
    setUsername(value);
    setUsernameAvailable(null);

    if (value.length < 3) return;

    const { data } = await supabase
      .from("accounts")
      .select("username")
      .eq("username", value)
      .maybeSingle();

    setUsernameAvailable(!data);
  }

  async function handleSignup() {
    setError("");

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (usernameAvailable === false) {
      setError("Username is already taken");
      return;
    }

    setLoading(true);

    try {
      // 1. Create auth user
      const { data, error: signupError } =
        await supabase.auth.signUp({
          email,
          password,
        });

      if (signupError) {
        setError(signupError.message);
        setLoading(false);
        return;
      }

      const user = data.user;

      if (!user) {
        setError("Signup failed");
        setLoading(false);
        return;
      }

      // 2. Create account row
      await supabase.from("accounts").insert({
        id: user.id,
        username: username,
        account_type: accountType,
        credits_remaining: 2,
      });

      // 3. Create profile row
      await supabase.from("profiles").insert({
        id: user.id,
        username: username,
      });

      // 4. Redirect to dashboard
      router.push("/dashboard");
    } catch (e) {
      setError("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border p-6 sm:p-8">

        {/* Logo */}
        <div className="mb-6 text-center">
          <div className="text-2xl font-bold text-blue-600">
            Stated
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Create your public accountability profile
          </div>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            Username
          </label>

          <input
            value={username}
            onChange={(e) =>
              checkUsername(
                e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9_]/g, "")
              )
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="avi"
          />

          <div className="text-xs text-gray-500 mt-1">
            stated.app/u/{username || "username"}
          </div>

          {usernameAvailable === true && (
            <div className="text-xs text-green-600">
              ✓ Username available
            </div>
          )}

          {usernameAvailable === false && (
            <div className="text-xs text-red-600">
              Username already taken
            </div>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            Email
          </label>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="you@email.com"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-lg px-3 py-2 mt-1"
            placeholder="••••••••"
          />
        </div>

        {/* Account type */}
        <div className="mb-6">
          <label className="text-sm font-medium">
            Account type
          </label>

          <div className="flex gap-4 mt-2">

            <button
              onClick={() =>
                setAccountType("individual")
              }
              className={`flex-1 border rounded-lg py-2 ${
                accountType === "individual"
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : ""
              }`}
            >
              Individual
            </button>

            <button
              onClick={() =>
                setAccountType("company")
              }
              className={`flex-1 border rounded-lg py-2 ${
                accountType === "company"
                  ? "border-blue-600 bg-blue-50 text-blue-600"
                  : ""
              }`}
            >
              Company
            </button>

          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="text-red-600 text-sm mb-4">
            {error}
          </div>
        )}

        {/* Signup button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        {/* Login link */}
        <div className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() =>
              router.push("/login")
            }
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </div>

      </div>
    </div>
  );
}
