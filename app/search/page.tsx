"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
};

type Commitment = {
  id: string;
  text: string;
  status: string;
  created_at: string;
  profiles: {
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  };
};

export default function SearchPage() {
  const supabase = createClient();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [commitments, setCommitments] = useState<Commitment[]>([]);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);

    try {
      // SEARCH PROFILES
      const { data: profileResults } = await supabase
        .from("profiles")
        .select("*")
        .or(
          `username.ilike.%${query}%,display_name.ilike.%${query}%,bio.ilike.%${query}%`
        )
        .limit(10);

      setProfiles(profileResults || []);

      // SEARCH COMMITMENTS
      const { data: commitmentResults } = await supabase
        .from("commitments")
        .select(
          `
            id,
            text,
            status,
            created_at,
            profiles (
              username,
              display_name,
              avatar_url
            )
          `
        )
        .ilike("text", `%${query}%`)
        .order("created_at", { ascending: false })
        .limit(10);

      setCommitments(commitmentResults || []);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-white border-b px-6 py-4">

        <div className="max-w-3xl mx-auto flex justify-between">

          <Link href="/" className="text-2xl font-bold text-blue-600">
            Stated
          </Link>

          <Link href="/dashboard" className="text-sm">
            Dashboard
          </Link>

        </div>

      </div>

      {/* SEARCH BOX */}
      <div className="max-w-3xl mx-auto px-4 py-8">

        <form onSubmit={handleSearch}>

          <input
            type="text"
            placeholder="Search people, companies, or commitments..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-4 border rounded-lg"
          />

        </form>

      </div>

      {/* RESULTS */}
      <div className="max-w-3xl mx-auto px-4 pb-12 space-y-8">

        {/* LOADING */}
        {loading && (
          <div className="text-gray-500">
            Searching...
          </div>
        )}

        {/* PEOPLE RESULTS */}
        {profiles.length > 0 && (
          <div>

            <div className="font-semibold mb-3">
              People & Companies
            </div>

            <div className="space-y-3">

              {profiles.map((profile) => {

                const avatar =
                  profile.avatar_url ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    profile.display_name || profile.username
                  )}&background=2563eb&color=fff`;

                return (
                  <Link
                    key={profile.id}
                    href={`/u/${profile.username}`}
                    className="block bg-white p-4 rounded-lg shadow hover:bg-gray-50"
                  >

                    <div className="flex items-center gap-3">

                      <img
                        src={avatar}
                        className="w-10 h-10 rounded-full"
                      />

                      <div>

                        <div className="font-medium">
                          {profile.display_name || profile.username}
                        </div>

                        <div className="text-sm text-gray-500">
                          @{profile.username}
                        </div>

                      </div>

                    </div>

                  </Link>
                );
              })}

            </div>

          </div>
        )}

        {/* COMMITMENT RESULTS */}
        {commitments.length > 0 && (
          <div>

            <div className="font-semibold mb-3">
              Commitments
            </div>

            <div className="space-y-3">

              {commitments.map((commitment) => {

                const profile = commitment.profiles;

                const avatar =
                  profile?.avatar_url ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    profile?.display_name || profile?.username || "User"
                  )}&background=2563eb&color=fff`;

                return (
                  <Link
                    key={commitment.id}
                    href={`/commitment/${commitment.id}`}
                    className="block bg-white p-4 rounded-lg shadow hover:bg-gray-50"
                  >

                    <div className="flex items-center gap-3 mb-2">

                      <img
                        src={avatar}
                        className="w-8 h-8 rounded-full"
                      />

                      <div className="text-sm text-gray-500">
                        @{profile?.username}
                      </div>

                    </div>

                    <div className="font-medium">
                      {commitment.text}
                    </div>

                    <div className="text-sm text-gray-400 mt-1 capitalize">
                      Status: {commitment.status}
                    </div>

                  </Link>
                );
              })}

            </div>

          </div>
        )}

        {/* EMPTY */}
        {!loading &&
          profiles.length === 0 &&
          commitments.length === 0 &&
          query && (
            <div className="text-gray-500">
              No results found
            </div>
          )}

      </div>

    </div>
  );
}
