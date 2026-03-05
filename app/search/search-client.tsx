"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryParam = searchParams.get("q") || "";

  const [query, setQuery] = useState(queryParam);

  const [top, setTop] = useState<Profile[]>([]);
  const [people, setPeople] = useState<Profile[]>([]);
  const [companies, setCompanies] = useState<Profile[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (queryParam) {
      search(queryParam);
    }
  }, [queryParam]);

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

  async function search(q: string) {
    setLoading(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();

      setTop(data.top || []);
      setPeople(data.people || []);
      setCompanies(data.companies || []);
    } catch (err) {
      console.error("Search error:", err);
    }

    setLoading(false);
  }

  function avatar(profile: Profile) {
    if (profile?.avatar_url) return profile.avatar_url;

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile.display_name || profile.username
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

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search people, companies or commitments"
          className="w-full border rounded-lg px-4 py-3"
        />

        {/* TOP RESULTS */}

        {queryParam && top.length > 0 && (
          <div>

            <h2 className="text-lg font-semibold mb-4">
              Top Results
            </h2>

            <div className="space-y-3">

              {top.map((profile) => (
                <Link
                  key={profile.id}
                  href={profileLink(profile)}
                  className="flex items-center gap-3 bg-white p-3 rounded-lg shadow"
                >

                  <Image
                    src={avatar(profile)}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />

                  <div>
                    <div className="font-medium">
                      {profile.display_name || profile.username}
                    </div>

                    <div className="text-sm text-gray-500">
                      @{profile.username}
                    </div>
                  </div>

                </Link>
              ))}

            </div>

          </div>
        )}

        {/* PEOPLE */}

        {queryParam && people.length > 0 && (
          <div>

            <h2 className="text-lg font-semibold mb-4">
              People
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {people.map((profile) => (
                <Link
                  key={profile.id}
                  href={profileLink(profile)}
                  className="bg-white p-4 rounded-xl shadow text-center"
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

        {/* COMPANIES */}

        {queryParam && companies.length > 0 && (
          <div>

            <h2 className="text-lg font-semibold mb-4">
              Companies
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {companies.map((profile) => (
                <Link
                  key={profile.id}
                  href={profileLink(profile)}
                  className="bg-white p-4 rounded-xl shadow text-center"
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

          <h2 className="text-lg font-semibold mb-4">
            Commitments
          </h2>

          <CommitmentFeed
            endpoint={`/api/feed${queryParam ? `?search=${queryParam}` : ""}`}
            showFilters={false}
          />

        </div>

      </div>

    </div>
  );
}
