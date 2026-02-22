"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Enter your email");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset email sent. Check your inbox.");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

        <Link href="/">
          <div className="text-3xl font-bold text-blue-600 mb-2 cursor-pointer">
            Stated
          </div>
        </Link>

        <div className="text-gray-600 mb-4">
          Enter your email to reset password
        </div>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-3"
        />

        {error && (
          <div className="text-red-500 text-sm mb-3">{error}</div>
        )}

        {message && (
          <div className="text-green-600 text-sm mb-3">{message}</div>
        )}

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <div className="mt-4 text-sm text-center">
          <Link href="/login" className="text-blue-600">
            Back to login
          </Link>
        </div>

      </div>
    </div>
  );
}
