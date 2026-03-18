"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LiveFeed({ initialData }: { initialData: any[] }) {

  const [items, setItems] = useState(initialData);
  const [newItems, setNewItems] = useState<any[]>([]);
  const [hasNew, setHasNew] = useState(false);

  const intervalRef = useRef<any>(null);

  async function fetchLatest() {
    try {
      const res = await fetch("/api/feed?type=latest");
      if (!res.ok) return;

      const data = await res.json();

      if (!Array.isArray(data)) return;

      const existingIds = new Set(items.map(i => i.id));

      const fresh = data.filter(i => !existingIds.has(i.id));

      if (fresh.length > 0) {
        setNewItems(fresh);
        setHasNew(true);
      }

    } catch (e) {}
  }

  useEffect(() => {
    intervalRef.current = setInterval(fetchLatest, 20000);
    return () => clearInterval(intervalRef.current);
  }, [items]);

  function mergeNew() {
    setItems(prev => [...newItems, ...prev]);
    setNewItems([]);
    setHasNew(false);
  }

  return (
    <div className="space-y-6">

      {/* NEW ITEMS BAR */}
      {hasNew && (
        <div className="text-center">
          <button
            onClick={mergeNew}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition"
          >
            ✨ {newItems.length} new update{newItems.length > 1 ? "s" : ""} — click to refresh
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">

        {items.map((c: any, index) => {

          let avatar = c.identity?.avatar_url;

          if (
            !avatar ||
            avatar === "" ||
            avatar.includes("undefined") ||
            avatar.includes("avatar") ||
            !avatar.startsWith("http")
          ) {
            avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              c.identity?.display_name || "User"
            )}&background=2563eb&color=fff`;
          }

          const isUpdate = c.type === "update";

          const link =
            isUpdate && c.parent_commitment_id
              ? `/commitment/${c.parent_commitment_id}`
              : `/commitment/${c.id}`;

          const isNew = newItems.some(n => n.id === c.id);

          return (

            <Link
              key={c.id}
              href={link}
              className={`block rounded-2xl p-6 transition duration-300 ease-out hover:-translate-y-[3px]
              ${isNew ? "ring-2 ring-blue-300 bg-blue-50" : ""}
              ${
                isUpdate
                  ? "bg-white border border-gray-200 shadow-sm hover:shadow-lg"
                  : "bg-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-md"
              }`}
            >

              {isUpdate && (
                <div className="text-xs text-blue-600 mb-2 flex items-center gap-1">
                  🔄 Update
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                </div>
              )}

              <div className="flex items-start gap-5">

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

                  <div className="text-gray-800 mb-3 leading-relaxed text-[15px]">
                    {c.text}
                  </div>

                  <div className="text-xs text-gray-500 flex gap-4">
                    <span>👁 {c.views ?? 0}</span>
                    {!isUpdate && <span>🔁 {c.shares ?? 0}</span>}
                  </div>

                </div>

              </div>

            </Link>

          );

        })}

      </div>

    </div>
  );
}
