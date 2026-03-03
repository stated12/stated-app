"use client";

import { useEffect, useState } from "react";

type FeedItem = {
  id: string;
  text: string;
  category: string;
  created_at: string;
  views: number;
  identity: {
    username: string;
    display_name: string;
    avatar_url: string;
    type: "user" | "company";
    badge: string;
  };
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(false);

  async function searchFeed(searchText: string) {
    if (!searchText.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    const res = await fetch(
      `/api/feed?q=${encodeURIComponent(searchText)}`
    );

    const data = await res.json();
    setResults(data);
    setLoading(false);
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      searchFeed(query);
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="max-w-xl mx-auto space-y-6">

      {/* Search Input */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search commitments..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Results */}
      {loading && (
        <div className="text-center text-gray-500">
          Searching...
        </div>
      )}

      {!loading && results.length === 0 && query && (
        <div className="text-center text-gray-500">
          No results found.
        </div>
      )}

      <div className="space-y-4">
        {results.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-3 mb-2">
              <img
                src={
                  item.identity.avatar_url ||
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    item.identity.display_name
                  )}`
                }
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium">
                  {item.identity.display_name}
                </div>
                <div className="text-xs text-gray-500">
                  @{item.identity.username}
                </div>
              </div>
            </div>

            <div className="text-gray-800 mb-2">
              {item.text}
            </div>

            <div className="text-xs text-gray-500">
              👁 {item.views} views
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
