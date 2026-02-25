"use client";

import { useState } from "react";

export default function PasswordForm() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    const form = e.target as HTMLFormElement;

    const res = await fetch("/account/password", {
      method: "POST",
      body: new FormData(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setSuccess(data.success);
    setPassword("");
    setConfirm("");
  }

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <div className="font-semibold mb-4">Change Password</div>

      {error && (
        <div className="bg-red-100 text-red-700 text-sm p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 text-green-700 text-sm p-3 rounded-lg mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          name="password"
          required
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <input
          type="password"
          name="confirm_password"
          required
          placeholder="Confirm new password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <div className="text-xs text-gray-400">
          Password must be at least 8 characters and include uppercase,
          lowercase and a number.
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}
