"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateCommitmentPage() {
  const supabase = createClient();
  const router = useRouter();

  const [text, setText] = useState("");
  const [duration, setDuration] = useState("1 week");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const individualCategories = [
    "Fitness",
    "Learning",
    "Writing",
    "Health",
    "Finance",
    "Business",
    "Other",
  ];

  const companyCategories = [
    "Product",
    "Growth",
    "Hiring",
    "Marketing",
    "Operations",
    "Revenue",
    "Other",
  ];

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("company_members")
      .select("company_id, companies(*)")
      .eq("user_id", user.id);

    if (data) {
      const mapped = data.map((item: any) => item.companies);
      setCompanies(mapped);
    }
  }

  async function createCommitment() {
    if (!text.trim() || !category) {
      alert("Fill all required fields");
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

    if (selectedCompanyId) {
      const { data: membership } = await supabase
        .from("company_members")
        .select("*")
        .eq("company_id", selectedCompanyId)
        .eq("user_id", user.id)
        .single();

      if (!membership) {
        alert("Not allowed to post for this company");
        setLoading(false);
        return;
      }
    }

    const finalCategory =
      category === "Other" ? customCategory : category;

    const { error } = await supabase
      .from("commitments")
      .insert({
        text,
        duration,
        category: finalCategory,
        user_id: selectedCompanyId ? null : user.id,
        company_id: selectedCompanyId || null,
        status: "active",
      });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/dashboard");
  }

  const currentCategories = selectedCompanyId
    ? companyCategories
    : individualCategories;

  return (
    <div className="max-w-xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Create Commitment</h1>

      <div>
        <label className="font-medium">Post As</label>
        <select
          value={selectedCompanyId || "self"}
          onChange={(e) => {
            setSelectedCompanyId(
              e.target.value === "self" ? null : e.target.value
            );
            setCategory("");
            setCustomCategory("");
          }}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="self">Myself</option>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name} (@{company.username})
            </option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="Enter your commitment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border rounded-lg px-4 py-3"
      />

      <div>
        <label className="font-medium">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="">Select category</option>
          {currentCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {category === "Other" && (
        <input
          type="text"
          placeholder="Enter custom category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />
      )}

      <select
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="w-full border rounded-lg px-4 py-2"
      >
        <option>1 week</option>
        <option>2 weeks</option>
        <option>1 month</option>
        <option>3 months</option>
      </select>

      <button
        onClick={createCommitment}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full"
      >
        {loading ? "Creating..." : "Create Commitment"}
      </button>
    </div>
  );
}
