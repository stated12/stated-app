"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CompanySettingsPage() {

  const supabase = createClient();

  const [company, setCompany] = useState<any>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- LOAD COMPANY ---------------- */

  useEffect(() => {
    loadCompany();
  }, []);

  async function loadCompany() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data: membership } = await supabase
      .from("company_members")
      .select("company_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!membership) return;

    setCompanyId(membership.company_id);

    const { data } = await supabase
      .from("companies")
      .select("*")
      .eq("id", membership.company_id)
      .single();

    setCompany(data);
  }

  /* ---------------- UPDATE COMPANY ---------------- */

  async function updateCompany() {

    if (!companyId) return;

    setLoading(true);

    await supabase
      .from("companies")
      .update({
        name: company.name,
        username: company.username,
        description: company.description,
      })
      .eq("id", companyId);

    setLoading(false);

    alert("Company updated");
  }

  /* ---------------- DELETE COMPANY ---------------- */

  async function deleteCompany() {

    if (!companyId) return;

    const confirmDelete = prompt("Type DELETE to confirm");

    if (confirmDelete !== "DELETE") return;

    await supabase
      .from("companies")
      .delete()
      .eq("id", companyId);

    alert("Company deleted");

    window.location.href = "/dashboard";
  }

  if (!company) return null;

  return (
    <div className="max-w-2xl mx-auto py-10 space-y-8">

      <h1 className="text-2xl font-bold">
        Company Settings
      </h1>

      {/* COMPANY INFO */}

      <div className="space-y-4">

        <input
          value={company.name}
          onChange={(e) =>
            setCompany({
              ...company,
              name: e.target.value,
            })
          }
          placeholder="Company Name"
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          value={company.username}
          onChange={(e) =>
            setCompany({
              ...company,
              username: e.target.value,
            })
          }
          placeholder="Username"
          className="w-full border rounded-lg px-4 py-2"
        />

        <textarea
          value={company.description || ""}
          onChange={(e) =>
            setCompany({
              ...company,
              description: e.target.value,
            })
          }
          placeholder="Company Description"
          className="w-full border rounded-lg px-4 py-2"
        />

        <button
          onClick={updateCompany}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>

      {/* DELETE COMPANY */}

      <div className="border-t pt-6">

        <button
          onClick={deleteCompany}
          className="text-red-600 font-medium"
        >
          Delete Company
        </button>

      </div>

    </div>
  );
}
