"use client";

export const dynamic = "force-dynamic";

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

export default function SearchPage() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryParam = searchParams.get("q") || "";
  const [query, setQuery] = useState(queryParam);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);

  useEffect(() => {
    if (queryParam) {
      searchProfiles(queryParam);
    }
  }, [queryParam]);

  async function searchProfiles(searchQuery: string) {
    setLoadingProfiles(true);

    const { data } = await supabase
      .from("profiles")
      .select("id, username, display_name, avatar_url, account_type")
      .or(
        `username.ilike.%${searchQuery}%,display_name.ilike.%${searchQuery}%`
      )
      .limit(8);

    setProfiles(data || []);
    setLoadingProfiles(false);
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${query.trim()}`);
  }

  function avatar(profile: Profile) {
    if (profile?.avatar_url) return profile.avatar_url;

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile?.display_name || profile?.username || "User"
    )}&background=2563eb&color=fff`;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* SEARCH BAR */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search people, companies or commitments"
            className="flex-1 border rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Search
          </button>
        </form>

        {/* PROFILES */}
        {queryParam && (
          <>
            <h2 className="text-lg font-semibold">
              Profiles
            </h2>

            {loadingProfiles ? (
              <div>Loading profiles...</div>
            ) : profiles.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {profiles.map((profile) => {
                  const link =
                    profile.account_type === "company"
                      ? `/c/${profile.username}`
                      : `/u/${profile.username}`;

                  return (
                    <Link
                      key={profile.id}
                      href={link}
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
                  );
                })}
              </div>
            ) : (
              <div className="text-gray-500">
                No profiles found.
              </div>
            )}
          </>
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
