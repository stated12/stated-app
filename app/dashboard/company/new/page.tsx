"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateCompanyPage() {
  const supabase = createClient();
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    checkAccess();
  }, []);

  async function checkAccess() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("plan_key")
      .eq("id", user.id)
      .single();

    if (!profile?.plan_key) {
      setAllowed(false);
      return;
    }

    const { data: existing } = await supabase
      .from("companies")
      .select("id")
      .eq("owner_id", user.id)
      .single();

    if (existing) {
      router.push("/dashboard/company");
      return;
    }

    setAllowed(true);
  }

  async function createCompany() {
    if (!name.trim() || !username.trim()) {
      alert("Name and username required");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase.from("companies").insert({
      name: name.trim(),
      username: username.trim().toLowerCase(),
      description: description.trim(),
      owner_id: user?.id,
    });

    setLoading(false);

    if (error) {
      alert("Username may already exist");
      return;
    }

    router.push("/dashboard/company");
  }

  if (allowed === null) return null;

  if (!allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Only Pro users can create a company.</p>
          <button
            onClick={() => router.push("/upgrade")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 space-y-6">
        <h1 className="text-2xl font-bold">Create Company</h1>

        <input
          type="text"
          placeholder="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />

        <input
          type="text"
          placeholder="Company Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
        />

        <textarea
          placeholder="Company Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-lg px-3 py-2"
          rows={4}
        />

        <button
          onClick={createCompany}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          {loading ? "Creating..." : "Create Company"}
        </button>
      </div>
    </div>
  );
}
