"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";

export default function CompanySettingsPage() {
  const supabase = createClient();
  const params = useSearchParams();
  const companyId = params.get("company");

  const [company, setCompany] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!companyId) return;
    loadCompany();
  }, [companyId]);

  async function loadCompany() {
    const { data } = await supabase
      .from("companies")
      .select("*")
      .eq("id", companyId)
      .single();

    setCompany(data);
  }

  async function updateCompany() {
    await supabase
      .from("companies")
      .update({
        name: company.name,
        username: company.username,
        description: company.description,
      })
      .eq("id", companyId);

    alert("Updated");
  }

  async function deleteCompany() {
    const confirmDelete = prompt("Type DELETE to confirm");
    if (confirmDelete !== "DELETE") return;

    await supabase.from("companies").delete().eq("id", companyId);
    alert("Company deleted");
  }

  async function inviteMember() {
    setLoading(true);

    const res = await fetch("/api/company/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyId,
        email,
        role,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Error inviting user");
      return;
    }

    alert("Member added");
    setEmail("");
  }

  if (!company) return null;

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-8">

      <h1 className="text-2xl font-bold">Company Settings</h1>

      <div className="space-y-4">
        <input
          value={company.name}
          onChange={(e) =>
            setCompany({ ...company, name: e.target.value })
          }
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          value={company.username}
          onChange={(e) =>
            setCompany({ ...company, username: e.target.value })
          }
          className="w-full border rounded-lg px-4 py-2"
        />

        <textarea
          value={company.description || ""}
          onChange={(e) =>
            setCompany({ ...company, description: e.target.value })
          }
          className="w-full border rounded-lg px-4 py-2"
        />

        <button
          onClick={updateCompany}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Save Changes
        </button>
      </div>

      <div className="border-t pt-6 space-y-4">
        <h2 className="font-semibold">Invite Member</h2>

        <input
          type="email"
          placeholder="User email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={inviteMember}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          {loading ? "Inviting..." : "Invite"}
        </button>
      </div>

      <div className="border-t pt-6">
        <button
          onClick={deleteCompany}
          className="text-red-600"
        >
          Delete Company
        </button>
      </div>

    </div>
  );
}
