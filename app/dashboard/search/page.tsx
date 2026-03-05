"use client";

import { useEffect, useState } from "react";

type Profile = {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string;
  account_type?: "individual" | "company";
};

type Commitment = {
  id: string;
  text: string;
  user_id: string;
};

export default function SearchPage() {

  const [query, setQuery] = useState("");

  const [people, setPeople] = useState<Profile[]>([]);
  const [companies, setCompanies] = useState<Profile[]>([]);
  const [commitments, setCommitments] = useState<Commitment[]>([]);

  const [loading, setLoading] = useState(false);

  async function searchAll(searchText: string) {

    if (!searchText.trim()) {
      setPeople([]);
      setCompanies([]);
      setCommitments([]);
      return;
    }

    setLoading(true);

    const res = await fetch(
      `/api/search?q=${encodeURIComponent(searchText)}`
    );

    const data = await res.json();

    setPeople(data.people || []);
    setCompanies(data.companies || []);
    setCommitments(data.commitments || []);

    setLoading(false);
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      searchAll(query);
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="max-w-xl mx-auto space-y-6">

      {/* SEARCH INPUT */}

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search people, companies or commitments..."
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

      {/* PEOPLE */}

      {people.length > 0 && (
        <div>
          <h2 className="font-semibold mb-2">People</h2>

          {people.map((p) => (
            <div key={p.id} className="bg-white p-3 rounded-lg shadow-sm mb-2">

              <div className="flex items-center gap-3">

                <img
                  src={
                    p.avatar_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      p.display_name
                    )}`
                  }
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

              </div>

            </div>
          ))}
        </div>
      )}

      {/* COMPANIES */}

      {companies.length > 0 && (
        <div>
          <h2 className="font-semibold mb-2">Companies</h2>

          {companies.map((c) => (
            <div key={c.id} className="bg-white p-3 rounded-lg shadow-sm mb-2">

              <div className="flex items-center gap-3">

                <img
                  src={
                    c.avatar_url ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      c.display_name
                    )}`
                  }
                  className="w-8 h-8 rounded-full"
                />

                <div>
                  <div className="font-medium">
                    {c.display_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    @{c.username}
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

      {/* COMMITMENTS */}

      {commitments.length > 0 && (
        <div>

          <h2 className="font-semibold mb-2">Commitments</h2>

          {commitments.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-xl shadow-sm mb-3"
            >
              {item.text}
            </div>
          ))}

        </div>
      )}

      {!loading &&
        query &&
        people.length === 0 &&
        companies.length === 0 &&
        commitments.length === 0 && (
          <div className="text-center text-gray-500">
            No results found.
          </div>
        )}
    </div>
  );
}
