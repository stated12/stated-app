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
    latest_update?: string | null; // ✅ safe add
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
    <div className="space-y-8">

      {commitments.map((c) => (

        <Link key={c.id} href={`/commitment/${c.id}`}>

          <div className="bg-white border rounded-xl p-6 shadow-md hover:shadow-lg hover:bg-gray-50 transition cursor-pointer">

            {/* TEXT */}
            <div className="font-semibold text-lg text-gray-900 mb-2">
              {c.text}
            </div>

            {/* STATUS */}
            <div className={`text-sm capitalize ${statusColor(c.status)}`}>
              Status: {c.status}
            </div>

            {/* DATE */}
            <div className="text-xs text-gray-600 mt-2">
              {getDateLabel(c)}
            </div>

            {/* 🔥 LATEST UPDATE (NEW) */}
            {c.latest_update && (
              <div className="mt-3 bg-gray-50 rounded-lg p-3 text-sm text-gray-700">
                <span className="font-medium text-gray-900">
                  Latest update:
                </span>{" "}
                {c.latest_update}
              </div>
            )}

            {/* VIEWS */}
            <div className="text-xs text-gray-500 mt-4">
              👁 {c.views || 0} views
            </div>

          </div>

        </Link>

      ))}

    </div>
  );
}
