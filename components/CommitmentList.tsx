"use client";

import Link from "next/link";

export default function CommitmentList({
  commitments,
}: {
  commitments: {
    id: string;
    text: string;
    status: string;
    created_at: string;
    completed_at?: string;
    end_date?: string;
    views: number;
    latest_update?: string | null;
  }[];
}) {

  function statusColor(status: string) {
    switch (status) {
      case "active":
        return "text-green-600";
      case "completed":
        return "text-blue-600";
      case "paused":
        return "text-yellow-600";
      case "withdrawn":
        return "text-gray-600";
      case "expired":
        return "text-red-700 font-semibold";
      default:
        return "text-gray-500";
    }
  }

  function getDateLabel(c: any) {

    if (c.status === "completed" && c.completed_at) {

      const completed = new Date(c.completed_at);
      const created = new Date(c.created_at);

      const days = Math.ceil(
        (completed.getTime() - created.getTime()) /
        (1000 * 60 * 60 * 24)
      );

      return `Completed ${completed.toLocaleDateString()} (${days} days)`;
    }

    return `Created ${new Date(c.created_at).toLocaleDateString()}`;
  }

  return (
    <div className="space-y-5">

      {commitments.map((c) => (

        <Link key={c.id} href={`/commitment/${c.id}`}>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition cursor-pointer border border-gray-100">

            {/* TEXT */}
            <div className="font-semibold text-lg text-gray-900 mb-2 leading-relaxed">
              {c.text}
            </div>

            {/* META */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span className={`capitalize ${statusColor(c.status)}`}>
                {c.status}
              </span>
              <span>{getDateLabel(c)}</span>
            </div>

            {/* 🔥 LATEST UPDATE (REFINED) */}
            {c.latest_update && (
              <div className="mt-4 bg-gray-50 rounded-lg p-3 text-sm text-gray-700">

                <div className="text-xs font-medium text-gray-500 mb-1">
                  Latest update
                </div>

                <div className="leading-relaxed">
                  {c.latest_update}
                </div>

              </div>
            )}

            {/* FOOTER */}
            <div className="text-xs text-gray-500 mt-4 flex items-center justify-between">

              <span>👁 {c.views || 0} views</span>

              {c.latest_update && (
                <span className="text-gray-500 font-medium">
                  Updated
                </span>
              )}

            </div>

          </div>

        </Link>

      ))}

    </div>
  );
}
