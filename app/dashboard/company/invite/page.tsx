"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function InvitePage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [loading, setLoading] = useState(false);

  async function sendInvite() {
    if (!email) return alert("Enter email");

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: company } = await supabase
      .from("companies")
      .select("*")
      .eq("owner_id", user.id)
      .single();

    if (!company) {
      alert("No company found");
      setLoading(false);
      return;
    }

    const token = uuidv4();

    const { error } = await supabase.from("company_invites").insert({
      company_id: company.id,
      email,
      role,
      token,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Invite created. Share this link manually for now:");
      alert(`${window.location.origin}/invite/${token}`);
      setEmail("");
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
