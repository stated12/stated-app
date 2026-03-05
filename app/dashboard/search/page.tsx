"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Profile = {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  account_type?: "individual" | "company";
};

type Commitment = {
  id: string;
  text: string;
  user_id: string;
};

type SearchResults = {
  top: Profile[];
  people: Profile[];
  companies: Profile[];
  commitments: Commitment[];
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults>({
    top: [],
    people: [],
    companies: [],
    commitments: [],
  });

  const [loading, setLoading] = useState(false);

  async function searchAll(q: string) {
    if (!q.trim()) {
      setResults({
        top: [],
        people: [],
        companies: [],
        commitments: [],
      });
      return;
    }

    setLoading(true);

    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();

    setResults(data);
    setLoading(false);
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      searchAll(query);
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  function avatar(profile: Profile) {
    if (profile.avatar_url) return profile.avatar_url;

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile.display_name || profile.username
    )}`;
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">

      {/* SEARCH INPUT */}

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search people, companies, commitments..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading && (
        <div className="text-center text-gray-500">
          Searching...
        </div>
      )}

      {!loading && query && results.top.length === 0 &&
        results.people.length === 0 &&
        results.companies.length === 0 &&
        results.commitments.length === 0 && (
        <div className="text-center text-gray-500">
          No results found.
        </div>
      )}

      {/* TOP RESULT */}

      {results.top.length > 0 && (
        <div>
          <div className="text-sm font-semibold text-gray-500 mb-2">
            Top Result
          </div>

          {results.top.map((p) => (
            <Link
              key={p.id}
              href={p.account_type === "company"
                ? `/c/${p.username}`
                : `/u/${p.username}`}
              className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm"
            >
              <img
                src={avatar(p)}
                className="w-10 h-10 rounded-full"
              />

              <div>
                <div className="font-medium">
                  {p.display_name}
                </div>

                <div className="text-sm text-gray-500">
                  @{p.username}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* PEOPLE */}

      {results.people.length > 0 && (
        <div>
          <div className="text-sm font-semibold text-gray-500 mb-2">
            People
          </div>

          <div className="space-y-2">
            {results.people.map((p) => (
              <Link
                key={p.id}
                href={`/u/${p.username}`}
                className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"
              >
                <img
                  src={avatar(p)}
                  className="w-8 h-8 rounded-full"
                />

                <div>
                  <div className="font-medium">
                    {p.display_name}
                  </div>

                  <div className="text-xs text-gray-500">
                    @{p.username}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* COMPANIES */}

      {results.companies.length > 0 && (
        <div>
          <div className="text-sm font-semibold text-gray-500 mb-2">
            Companies
          </div>

          <div className="space-y-2">
            {results.companies.map((p) => (
              <Link
                key={p.id}
                href={`/c/${p.username}`}
                className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm"
              >
                <img
                  src={avatar(p)}
                  className="w-8 h-8 rounded-full"
                />

                <div>
                  <div className="font-medium">
                    {p.display_name}
                  </div>

                  <div className="text-xs text-gray-500">
                    @{p.username}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* COMMITMENTS */}

      {results.commitments.length > 0 && (
        <div>
          <div className="text-sm font-semibold text-gray-500 mb-2">
            Commitments
          </div>

          <div className="space-y-2">
            {results.commitments.map((c) => (
              <div
                key={c.id}
                className="bg-white p-3 rounded-xl shadow-sm"
              >
                {c.text}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
