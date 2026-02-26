"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function InvitePage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [loading, setLoading] = useState(false);

  async function sendInvite() {
    if (!email) return alert("Enter email");

    setLoading(true);

    try {
      // ✅ Check member limit first
      const check = await fetch("/api/company/member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "invite_check" }),
      });

      if (!check.ok) {
        const data = await check.json();
        alert(data.error || "Invite limit reached");
        setLoading(false);
        return;
      }

      // ✅ Get logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // ✅ Get company owned by user
      const { data: company, error: companyError } = await supabase
        .from("companies")
        .select("*")
        .eq("owner_id", user.id)
        .single();

      if (companyError || !company) {
        alert("Company not found");
        setLoading(false);
        return;
      }

      // ✅ Generate token (NO uuid package needed)
      const token = crypto.randomUUID();

      // ✅ Insert invite
      const { error: insertError } = await supabase
        .from("company_invites")
        .insert({
          company_id: company.id,
          email,
          role,
          token,
        });

      if (insertError) {
        alert("Failed to create invite");
        setLoading(false);
        return;
      }

      alert(`${window.location.origin}/invite/${token}`);
      setEmail("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-xl font-semibold">Invite Member</h1>

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
