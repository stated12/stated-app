"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import CommitmentFeed from "@/components/CommitmentFeed";

type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  account_type?: "individual" | "company";
};

export default function ExplorePage() {
  const supabase = createClient();

  const [people, setPeople] = useState<Profile[]>([]);
  const [companies, setCompanies] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExplore();
  }, []);

  async function loadExplore() {
    try {
      const { data: peopleData } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url, account_type")
        .eq("account_type", "individual")
        .limit(4);

      if (peopleData) setPeople(peopleData);

      const { data: companyData } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url, account_type")
        .eq("account_type", "company")
        .limit(4);

      if (companyData) setCompanies(companyData);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  function avatar(profile: Profile) {
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
                href={`/c/${company.username}`}
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

        {/* UNIFIED FEED */}
        <section>
          <div className="text-lg font-semibold mb-4">
            Explore commitments
          </div>

          <CommitmentFeed
            endpoint="/api/feed"
            showFilters={false}
          />
        </section>

      </div>
    </div>
  );
}
