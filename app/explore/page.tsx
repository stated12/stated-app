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
};

type Company = {
  id: string;
  username: string;
  name: string | null;
  logo_url: string | null;
};

export default function ExplorePage() {
  const supabase = createClient();

  const [people, setPeople] = useState<Profile[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExplore();
  }, []);

  async function loadExplore() {
    try {

      const { data: peopleData } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url")
        .limit(4);

      const { data: companyData } = await supabase
        .from("companies")
        .select("id, username, name, logo_url")
        .limit(4);

      if (peopleData) setPeople(peopleData);
      if (companyData) setCompanies(companyData);

    } catch (error) {
      console.error("Explore load error:", error);
    }

    setLoading(false);
  }

  function personAvatar(profile: Profile) {
    if (profile?.avatar_url) return profile.avatar_url;

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile?.display_name || profile?.username || "User"
    )}&background=2563eb&color=fff`;
  }

  function companyAvatar(company: Company) {
    if (company?.logo_url) return company.logo_url;

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      company?.name || company?.username || "Company"
    )}&background=2563eb&color=fff`;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow animate-pulse h-24"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto space-y-12">

        {/* LOGO */}

        <Link href="/">
          <div className="text-2xl font-bold text-blue-600 cursor-pointer">
            Stated
          </div>
        </Link>

        {/* EXPLORE COMMITMENTS */}

        <section>
          <div className="text-lg font-semibold mb-4">
            Explore commitments
          </div>

          <CommitmentFeed endpoint="/api/feed" showFilters={false} />
        </section>

        {/* FEATURED PEOPLE */}

        {people.length > 0 && (
          <section>

            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">
                Featured people
              </div>

              <Link
                href="/people"
                className="text-sm text-blue-600 hover:underline"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {people.map((person) => (
                <Link
                  key={person.id}
                  href={`/u/${person.username}`}
                  className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition"
                >
                  <img
                    src={personAvatar(person)}
                    alt={person.username}
                    className="w-14 h-14 rounded-full mx-auto mb-2 object-cover"
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
        )}

        {/* FEATURED COMPANIES */}

        {companies.length > 0 && (
          <section>

            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">
                Featured companies
              </div>

              <Link
                href="/companies"
                className="text-sm text-blue-600 hover:underline"
              >
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {companies.map((company) => (
                <Link
                  key={company.id}
                  href={`/c/${company.username}`}
                  className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition"
                >
                  <img
                    src={companyAvatar(company)}
                    alt={company.username}
                    className="w-14 h-14 rounded-full mx-auto mb-2 object-cover"
                  />

                  <div className="font-medium">
                    {company.name || company.username}
                  </div>

                  <div className="text-sm text-gray-500">
                    @{company.username}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
