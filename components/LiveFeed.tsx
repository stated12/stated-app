"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getSafeAvatar } from "@/lib/avatar";

export default function LiveFeed({ initialData }: { initialData: any[] }) {

  const [feed, setFeed] = useState(initialData);
  const [newItems, setNewItems] = useState<any[]>([]);
  const [showNew, setShowNew] = useState(false);

  // 🔥 AUTO FETCH NEW ITEMS
  useEffect(() => {

    const interval = setInterval(async () => {

      try {
        const res = await fetch("/api/feed?type=latest");

        if (!res.ok) return;

        const data = await res.json();

        const existingIds = new Set(feed.map((f) => f.id));

        const fresh = data.filter((d: any) => !existingIds.has(d.id));

        if (fresh.length > 0) {
          setNewItems(fresh);
          setShowNew(true);
        }

      } catch (e) {}

    }, 8000); // every 8 sec

    return () => clearInterval(interval);

  }, [feed]);

  // 🔥 CLICK → ADD NEW ITEMS (PREPEND)
  function handleLoadNew() {
    setFeed((prev) => [...newItems, ...prev]);
    setNewItems([]);
    setShowNew(false);
  }

  return (

    <div className="space-y-6">

      {/* NEW UPDATES BANNER */}
      {showNew && (
        <div
          onClick={handleLoadNew}
          className="cursor-pointer text-center bg-blue-100 text-blue-700 py-2 px-4 rounded-full text-sm font-medium hover:bg-blue-200 transition"
        >
          ✨ {newItems.length} new updates — click to refresh
        </div>
      )}

      {feed.map((c) => {

        const avatar = getSafeAvatar(c.identity);

        const isUpdate = c.type === "update";

        const link =
          isUpdate && c.parent_commitment_id
            ? `/commitment/${c.parent_commitment_id}`
            : `/commitment/${c.id}`;

        return (

          <Link
            key={c.id}
            href={link}
            className={`block rounded-2xl p-6 transition duration-200 hover:-translate-y-[2px] ${
              isUpdate
                ? "bg-white border border-gray-200 shadow-sm hover:shadow-md"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >

            {isUpdate && (
              <div className="text-xs text-blue-600 mb-2">
                🔄 Update
              </div>
            )}

            <div className="flex items-start gap-4">

              <Image
                src={avatar}
                alt="avatar"
                width={50}
                height={50}
                className="rounded-full"
              />

              <div className="flex-1">

                <div className="flex items-center gap-2 font-semibold text-gray-900 mb-1">

                  {c.identity?.display_name}

                  {c.identity?.type === "company" && (
                    <span className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                      COMPANY
                    </span>
                  )}

                </div>

                {isUpdate && (
                  <div className="text-xs text-gray-500 mb-1">
                    updated a commitment
                  </div>
                )}

                <div className="text-gray-800 mb-3 leading-relaxed">
                  {c.text}
                </div>

                <div className="text-xs text-gray-500 flex gap-4">
                  <span>👁 {c.views ?? 0}</span>

                  {!isUpdate && (
                    <span>🔁 {c.shares ?? 0}</span>
                  )}
                </div>

              </div>

            </div>

          </Link>

        );

      })}

    </div>

  );
}
