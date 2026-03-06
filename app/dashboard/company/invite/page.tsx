"use client";

import { useState } from "react";

export default function InvitePage() {

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [loading, setLoading] = useState(false);

  async function sendInvite() {

    if (!email.trim()) {
      alert("Enter email");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch("/api/company/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to create invite");
        return;
      }

      alert(data.inviteUrl);

      setEmail("");

    } catch {
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">

      <h1 className="text-xl font-semibold">
        Invite Member
      </h1>

      <input
        type="email"
        placeholder="Member email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border rounded px-3 py-2"
      >
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>

      <button
        onClick={sendInvite}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Sending..." : "Create Invite"}
      </button>

    </div>
  );
}
