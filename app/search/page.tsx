"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

function normalizeProfile(profileData: any) {
  if (!profileData) return null;
  if (Array.isArray(profileData)) return profileData[0] ?? null;
  return profileData;
}

export default function SearchPage() {

  const supabase = createClient();

  const [commitments, setCommitments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommitments();
  }, []);

  async function loadCommitments() {
    try {

      const { data } = await supabase
        .from("commitments")
        .select(`
          id,
          text,
          status,
          created_at,
          profiles (
            username,
            display_name,
            avatar_url
          )
        `)
        .eq("visibility", "public")
        .order("created_at", { ascending: false })
        .limit(10);

      setCommitments(data || []);

    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading search...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="max-w-4xl mx-auto space-y-6">

        <Link href="/">
          <div className="text-2xl font-bold text-blue-600 cursor-pointer">
            Stated
          </div>
        </Link>

        <div className="text-xl font-semibold">
          Search Results
        </div>

        <div className="space-y-4">

          {commitments.map((c) => {

            const profile = normalizeProfile(c.profiles);

            const avatar =
              profile?.avatar_url ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                profile?.display_name || profile?.username || "User"
              )}&background=2563eb&color=fff`;

            return (
              <Link
                key={c.id}
                href={`/commitment/${c.id}`}
                className="block bg-white p-5 rounded-xl shadow hover:shadow-md transition"
              >

                <div className="flex items-center gap-3 mb-2">

                  <img
                    src={avatar}
                    className="w-8 h-8 rounded-full object-cover"
                  />

                  <div className="text-sm font-medium">
                    {profile?.display_name || profile?.username}
                  </div>

                </div>

                <div className="font-medium">
                  {c.text}
                </div>

              </Link>
            );
          })}

        </div>

      </div>

    </div>
  );
}
