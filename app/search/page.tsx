"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type Commitment = {
  id: string;
  text: string;
  status: string;
  created_at: string;
  end_date: string | null;
  profiles: {
    username: string;
    display_name: string;
    avatar_url: string | null;
  };
};

type Profile = {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
};

export default function SearchPage() {
  const supabase = createClient();

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    if (query.length < 2) {
      setCommitments([]);
      setProfiles([]);
      return;
    }

    search();
  }, [query]);

  async function search() {
    setLoading(true);

    // SEARCH COMMITMENTS
    const { data: commitmentsData } = await supabase
      .from("commitments")
      .select(`
        id,
        text,
        status,
        created_at,
        end_date,
        profiles (
          username,
          display_name,
          avatar_url
        )
      `)
      .ilike("text", `%${query}%`)
      .eq("visibility", "public")
      .limit(10);

    // SEARCH PROFILES
    const { data: profilesData } = await supabase
      .from("profiles")
      .select("*")
      .or(
        `username.ilike.%${query}%,display_name.ilike.%${query}%`
      )
      .limit(10);

    setCommitments(commitmentsData || []);
    setProfiles(profilesData || []);

    setLoading(false);
  }

  function getAvatar(profile: any) {
    if (profile?.avatar_url) return profile.avatar_url;

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile?.display_name || "User"
    )}&background=2563eb&color=fff`;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/nature-bg.jpg')",
      }}
    >
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <Link href="/" className="flex items-center gap-3">

            <Image
              src="/logo.png"
              width={40}
              height={40}
              alt="logo"
            />

            <span className="text-white font-bold text-xl">
              Stated
            </span>

          </Link>

          <Link
            href="/dashboard"
            className="text-white text-sm border px-4 py-2 rounded-lg"
          >
            Dashboard
          </Link>

        </div>

        {/* SEARCH BOX */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commitments, people, companies..."
            className="w-full outline-none text-lg"
          />

        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-white">
            Searching...
          </div>
        )}

        {/* PROFILES */}
        {profiles.length > 0 && (

          <div className="mb-8">

            <div className="text-white font-semibold mb-3">
              People
            </div>

            <div className="space-y-3">

              {profiles.map((profile) => (

                <Link
                  key={profile.id}
                  href={`/u/${profile.username}`}
                  className="block bg-white rounded-xl p-4 shadow hover:shadow-md"
                >

                  <div className="flex items-center gap-4">

                    <Image
                      src={getAvatar(profile)}
                      width={40}
                      height={40}
                      alt="avatar"
                      className="rounded-full"
                    />

                    <div>

                      <div className="font-medium">
                        {profile.display_name}
                      </div>

                      <div className="text-sm text-gray-500">
                        @{profile.username}
                      </div>

                    </div>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        )}

        {/* COMMITMENTS */}
        {commitments.length > 0 && (

          <div>

            <div className="text-white font-semibold mb-3">
              Commitments
            </div>

            <div className="space-y-3">

              {commitments.map((c) => {

                const endDate = c.end_date
                  ? new Date(c.end_date)
                  : null;

                const today = new Date();

                const daysLeft = endDate
                  ? Math.ceil(
                      (endDate.getTime() -
                        today.getTime()) /
                        (1000 * 60 * 60 * 24)
                    )
                  : null;

                return (

                  <Link
                    key={c.id}
                    href={`/u/${c.profiles.username}`}
                    className="block bg-white rounded-xl p-4 shadow hover:shadow-md"
                  >

                    <div className="flex items-center gap-4">

                      <Image
                        src={getAvatar(c.profiles)}
                        width={40}
                        height={40}
                        alt="avatar"
                        className="rounded-full"
                      />

                      <div className="flex-1">

                        <div className="font-medium">
                          {c.text}
                        </div>

                        <div className="text-sm text-gray-500">
                          @{c.profiles.username}
                        </div>

                        {c.status === "active" &&
                          daysLeft !== null && (
                            <div className="text-sm text-green-600">
                              {daysLeft > 0
                                ? `${daysLeft} days remaining`
                                : "Expired"}
                            </div>
                          )}

                      </div>

                      <div className="text-sm capitalize text-gray-500">
                        {c.status}
                      </div>

                    </div>

                  </Link>

                );

              })}

            </div>

          </div>

        )}

        {/* EMPTY */}
        {query.length > 2 &&
          commitments.length === 0 &&
          profiles.length === 0 &&
          !loading && (

            <div className="text-white">
              No results found
            </div>

          )}

      </div>
    </div>
  );
}
