"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateCommitmentPage() {

  const supabase = createClient();
  const router = useRouter();

  const [text, setText] = useState("");
  const [duration, setDuration] = useState("1 week");
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState<any>(null);
  const [postAs, setPostAs] = useState("user");

  useEffect(() => {
    async function fetchCompany() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("companies")
        .select("*")
        .eq("owner_id", user.id)
        .maybeSingle();

      if (data) setCompany(data);
    }

    fetchCompany();
  }, []);

  async function createCommitment() {

    if (!text.trim()) {
      alert("Enter commitment");
      return;
    }

    setLoading(true);

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    let owner_id = user.id;
    let owner_type = "user";

    if (postAs === "company" && company) {
      owner_id = company.id;
      owner_type = "company";
    }

    const { error } = await supabase
      .from("commitments")
      .insert({
        text,
        duration,
        owner_id,
        owner_type,
        status: "active"
      });

    if (error) {
      alert("Error creating commitment");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      <h1 className="text-2xl font-bold">Create Commitment</h1>

      {company && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Post As</label>
          <select
            value={postAs}
            onChange={(e) => setPostAs(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          >
            <option value="user">Myself</option>
            <option value="company">{company.name}</option>
          </select>
        </div>
      )}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="State your commitment..."
        rows={4}
        className="w-full border rounded-lg px-3 py-2"
      />

      <select
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="w-full border rounded-lg px-3 py-2"
      >
        <option>1 week</option>
        <option>30 days</option>
        <option>90 days</option>
        <option>6 months</option>
      </select>

      <button
        onClick={createCommitment}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        {loading ? "Publishing..." : "Publish Commitment"}
      </button>

    </div>
  );
}
