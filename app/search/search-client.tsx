"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import Image from "next/image";
import CommitmentFeed from "@/components/CommitmentFeed";

type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  account_type?: "individual" | "company";
};

export default function SearchClient() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryParam = searchParams.get("q") || "";

  const [query, setQuery] = useState(queryParam);
  const [people, setPeople] = useState<Profile[]>([]);
  const [companies, setCompanies] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(false);

  /* Search when URL changes */

  useEffect(() => {
    if (queryParam) {
      searchProfiles(queryParam);
    } else {
      setPeople([]);
      setCompanies([]);
    }
  }, [queryParam]);

  /* Debounced typing search */

  useEffect(() => {
    const delay = setTimeout(() => {
      const q = query.trim();

      if (!q) {
        router.push("/search");
        return;
      }

      router.push(`/search?q=${encodeURIComponent(q)}`);
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  /* Database search */

  async function searchProfiles(searchQuery: string) {
    const q = searchQuery.trim();

    if (!q) {
      setPeople([]);
      setCompanies([]);
      return;
    }

    setLoading(true);

    /* Search username */

    const { data: usernameResults } = await supabase
      .from("profiles")
      .select("id, username, display_name, avatar_url, account_type")
      .ilike("username", `%${q}%`)
      .limit(12);

    /* Search display name */

    const { data: nameResults } = await supabase
      .from("profiles")
      .select("id, username, display_name, avatar_url, account_type")
      .ilike("display_name", `%${q}%`)
      .limit(12);

    /* Merge results without duplicates */

    const combined = [...(usernameResults || []), ...(nameResults || [])];

    const uniqueProfiles = Array.from(
      new Map(combined.map((p) => [p.id, p])).values()
    );

    const individuals =
      uniqueProfiles.filter((p) => p.account_type !== "company") || [];

    const companyProfiles =
      uniqueProfiles.filter((p) => p.account_type === "company") || [];

    setPeople(individuals);
    setCompanies(companyProfiles);

    setLoading(false);
  }

  /* Manual submit search */

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    const q = query.trim();

    if (!q) return;

    router.push(`/search?q=${encodeURIComponent(q)}`);
  }

  /* Avatar helper */

  function avatar(profile: Profile) {
    if (profile?.avatar_url) return profile.avatar_url;

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile?.display_name || profile?.username || "User"
    )}&background=2563eb&color=fff`;
  }

  function profileLink(profile: Profile) {
    return profile.account_type === "company"
      ? `/c/${profile.username}`
      : `/u/${profile.username}`;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* SEARCH BAR */}

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search people, companies or commitments"
            className="flex-1 border rounded-lg px-4 py-2"
          />

          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Search
          </button>
        </form>

        {/* PEOPLE */}

        {queryParam && (
          <div>
            <h2 className="text-lg font-semibold mb-4">People</h2>

            {loading ? (
              <div className="text-gray-500">Searching...</div>
            ) : people.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {people.map((profile) => (
                  <Link
                    key={profile.id}
                    href={profileLink(profile)}
                    className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition"
                  >
                    <Image
                      src={avatar(profile)}
                      alt="avatar"
                      width={60}
                      height={60}
                      className="rounded-full mx-auto mb-2"
                    />

                    <div className="font-medium">
                      {profile.display_name || profile.username}
                    </div>

                    <div className="text-sm text-gray-500">
                      @{profile.username}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-gray-500">
                No people found for "{queryParam}"
              </div>
            )}
          </div>
        )}

        {/* COMPANIES */}

        {queryParam && companies.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4">Companies</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {companies.map((profile) => (
                <Link
                  key={profile.id}
                  href={profileLink(profile)}
                  className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition"
                >
                  <Image
                    src={avatar(profile)}
                    alt="avatar"
                    width={60}
                    height={60}
                    className="rounded-full mx-auto mb-2"
                  />

                  <div className="font-medium">
                    {profile.display_name || profile.username}
                  </div>

                  <div className="text-sm text-gray-500">
                    @{profile.username}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* COMMITMENTS */}

        <div>
          <h2 className="text-lg font-semibold mb-4">Commitments</h2>

          <CommitmentFeed
            endpoint={`/api/feed${queryParam ? `?search=${queryParam}` : ""}`}
            showFilters={false}
          />
        </div>

      </div>
    </div>
  );
}
