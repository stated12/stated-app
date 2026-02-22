"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  account_type?: "individual" | "company";
};

type Commitment = {
  id: string;
  text: string;
  status: string;
  created_at: string;
  user_id: string;
  profiles: Profile | null; // ✅ FIXED (nullable)
};

export default function ExplorePage() {
  const supabase = createClient();

  const [people, setPeople] = useState<Profile[]>([]);
  const [companies, setCompanies] = useState<Profile[]>([]);
  const [trending, setTrending] = useState<Commitment[]>([]);
  const [recent, setRecent] = useState<Commitment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExplore();
  }, []);

  async function loadExplore() {
    try {
      /* FEATURED PEOPLE */
      const { data: peopleData } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url, account_type")
        .eq("account_type", "individual")
        .limit(4);

      setPeople((peopleData ?? []) as Profile[]);

      /* FEATURED COMPANIES */
      const { data: companyData } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url, account_type")
        .eq("account_type", "company")
        .limit(4);

      setCompanies((companyData ?? []) as Profile[]);

      /* TRENDING */
      const { data: trendingData } = await supabase
        .from("commitments")
        .select(`
          id,
          text,
          status,
          created_at,
          user_id,
          profiles (
            id,
            username,
            display_name,
            avatar_url
          )
        `)
        .eq("status", "active")
        .limit(6);

      setTrending((trendingData ?? []) as Commitment[]);

      /* RECENT */
      const { data: recentData } = await supabase
        .from("commitments")
        .select(`
          id,
          text,
          status,
          created_at,
          user_id,
          profiles (
            id,
            username,
            display_name,
            avatar_url
          )
        `)
        .order("created_at", { ascending: false })
        .limit(6);

      setRecent((recentData ?? []) as Commitment[]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  function avatar(profile: Profile | null) {
    if (profile?.avatar_url) return profile.avatar_url;

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile?.display_name || profile?.username || "User"
    )}&background=2563eb&color=fff`;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading explore...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* HEADER */}
        <Link href="/">
          <div className="text-2xl font-bold text-blue-600 cursor-pointer">
            Stated
          </div>
        </Link>

        {/* FEATURED PEOPLE */}
        <section>
          <div className="text-lg font-semibold mb-4">
            Featured people
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {people.map((person) => (
              <Link
                key={person.id}
                href={`/u/${person.username}`}
                className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition"
              >
                <img
                  src={avatar(person)}
                  className="w-14 h-14 rounded-full mx-auto mb-2 object-cover"
                  alt=""
                />
                <div className="font-medium">
                  {person.display_name || person.username}
                </div>
                <div className="text-sm text-gray-500">
                  @{person.username}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FEATURED COMPANIES */}
        <section>
          <div className="text-lg font-semibold mb-4">
            Featured companies
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {companies.map((company) => (
              <Link
                key={company.id}
                href={`/u/${company.username}`}
                className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition"
              >
                <img
                  src={avatar(company)}
                  className="w-14 h-14 rounded-full mx-auto mb-2 object-cover"
                  alt=""
                />
                <div className="font-medium">
                  {company.display_name || company.username}
                </div>
                <div className="text-sm text-gray-500">
                  @{company.username}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* TRENDING */}
        <section>
          <div className="text-lg font-semibold mb-4">
            Trending commitments
          </div>

          <div className="space-y-4">
            {trending.map((commitment) => {
              const profile = commitment.profiles;

              return (
                <Link
                  key={commitment.id}
                  href={`/commitment/${commitment.id}`}
                  className="block bg-white p-5 rounded-xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={avatar(profile)}
                      className="w-8 h-8 rounded-full object-cover"
                      alt=""
                    />
                    <div className="text-sm font-medium">
                      {profile?.display_name || profile?.username}
                    </div>
                    <div className="text-xs text-gray-500">
                      @{profile?.username}
                    </div>
                  </div>

                  <div className="font-medium">
                    {commitment.text}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* RECENT */}
        <section>
          <div className="text-lg font-semibold mb-4">
            Recent commitments
          </div>

          <div className="space-y-4">
            {recent.map((commitment) => {
              const profile = commitment.profiles;

              return (
                <Link
                  key={commitment.id}
                  href={`/commitment/${commitment.id}`}
                  className="block bg-white p-5 rounded-xl shadow hover:shadow-md transition"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={avatar(profile)}
                      className="w-8 h-8 rounded-full object-cover"
                      alt=""
                    />
                    <div className="text-sm font-medium">
                      {profile?.display_name || profile?.username}
                    </div>
                    <div className="text-xs text-gray-500">
                      @{profile?.username}
                    </div>
                  </div>

                  <div className="font-medium">
                    {commitment.text}
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

      </div>
    </div>
  );
}
