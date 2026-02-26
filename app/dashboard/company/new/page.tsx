"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateCompanyPage() {
  const supabase = createClient();
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function createCompany() {
    if (!name || !username) {
      alert("Name and username required");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: company, error } = await supabase
      .from("companies")
      .insert({
        name,
        username,
        description,
        owner_id: user.id,
      })
      .select()
      .single();

    if (error || !company) {
      alert(error?.message || "Error creating company");
      setLoading(false);
      return;
    }

    await supabase.from("company_members").insert({
      company_id: company.id,
      user_id: user.id,
      role: "owner",
    });

    setLoading(false);
    router.push(`/dashboard/company/settings?company=${company.id}`);
  }

  return (
    <div className="max-w-xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Create Company</h1>

      <input
        type="text"
        placeholder="Company Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded-lg px-4 py-2"
      />

      <input
        type="text"
        placeholder="Username (unique)"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border rounded-lg px-4 py-2"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded-lg px-4 py-2"
      />

      <button
        onClick={createCompany}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        {loading ? "Creating..." : "Create Company"}
      </button>
    </div>
  );
}
