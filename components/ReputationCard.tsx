"use client";

import { useEffect, useState } from "react";

export default function ReputationCard({
  userId,
  companyId,
}: {
  userId?: string;
  companyId?: string;
}) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams();

    if (userId) params.append("userId", userId);
    if (companyId) params.append("companyId", companyId);

    fetch(`/api/reputation?${params.toString()}`)
      .then((res) => res.json())
      .then((res) => setData(res));
  }, [userId, companyId]);

  if (!data) return null;

  return (
    <div className="bg-white rounded-xl shadow p-5 mt-6">
      <div className="flex justify-between items-center mb-3">
        <div className="font-semibold text-lg">
          Reputation
        </div>
        <div className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded">
          {data.badge}
        </div>
      </div>

      <div className="text-3xl font-bold mb-2">
        {data.score}
      </div>

      <div className="text-sm text-gray-600 mb-4">
        Completion Rate: {data.completionRate}%
      </div>

      <div className="text-sm text-gray-500">
        {data.completed} completed · {data.active} active · {data.withdrawn} withdrawn
      </div>
    </div>
  );
}
