"use client";

import ViewTracker from "./ViewTracker";

export default function CommitmentList({
  commitments,
}: {
  commitments: {
    id: string;
    text: string;
    status: string;
    created_at: string;
    views: number;
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

  return (
    <div className="space-y-8">
      {commitments.map((c) => (
        <div
          key={c.id}
          className="bg-white border rounded-xl p-6 shadow-md hover:shadow-lg transition"
        >
          <ViewTracker type="commitment" entityId={c.id} />

          <div className="font-semibold text-lg text-gray-900 mb-2">
            {c.text}
          </div>

          <div className={`text-sm capitalize ${statusColor(c.status)}`}>
            Status: {c.status}
          </div>

          <div className="text-xs text-gray-600 mt-2">
            Created {new Date(c.created_at).toLocaleDateString()}
          </div>

          <div className="text-xs text-gray-500 mt-4">
            👁 {c.views || 0} views
          </div>
        </div>
      ))}
    </div>
  );
}
