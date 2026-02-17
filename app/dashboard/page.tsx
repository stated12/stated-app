"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import CommitmentCard from "@/components/CommitmentCard";
import Link from "next/link";

export default function DashboardPage() {

  const supabase = createClient();

  const [commitments, setCommitments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommitments();
  }, []);

  async function fetchCommitments() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from("commitments")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCommitments(data);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">

      {/* Header */}
      <div className="max-w-md mx-auto flex justify-between items-center mb-6">

        <h1 className="text-xl font-semibold">
          Your commitments
        </h1>

      </div>

      {/* Create Button */}
      <div className="flex justify-center mb-6">

        <Link href="/dashboard/create">

          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow hover:bg-blue-700 transition">
            Create commitment
          </button>

        </Link>

      </div>

      {/* List */}
      <div className="space-y-4">

        {loading && (
          <p className="text-center text-gray-500">
            Loading...
          </p>
        )}

        {!loading && commitments.length === 0 && (
          <p className="text-center text-gray-500">
            No commitments yet
          </p>
        )}

        {commitments.map((c) => (
          <CommitmentCard key={c.id} commitment={c} />
        ))}

      </div>

    </div>
  );
}
