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

  const milestones = [
    { label: "Beginner", score: 0 },
    { label: "Builder", score: 25 },
    { label: "Credible", score: 50 },
    { label: "Trusted", score: 75 },
    { label: "Authority", score: 100 },
  ];

  const nextLevel =
    milestones.find((m) => m.score > data.score) || milestones[milestones.length - 1];

  const progress =
    nextLevel.score > 0
      ? Math.min((data.score / nextLevel.score) * 100, 100)
      : 0;

  return (
    <div className="bg-white rounded-xl shadow p-5 mt-6 space-y-4">

      <div className="flex justify-between items-center">
        <div className="font-semibold text-lg">
          Reputation
        </div>

        <div className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded">
          {data.badge}
        </div>
      </div>

      <div className="text-3xl font-bold">
        {data.score}
      </div>

      <div className="text-sm text-gray-600">
        Completion Rate: {data.completionRate}%
      </div>

      {/* Progress */}
      <div>

        <div className="text-xs text-gray-500 mb-1">
          Next level: {nextLevel.label} at {nextLevel.score}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

      <div className="text-sm text-gray-500 space-x-2">
        <span>{data.completed} completed</span> ·
        <span>{data.active} active</span> ·
        <span>{data.withdrawn} withdrawn</span> ·
        <span className="text-red-600 font-medium">
          {data.expired} expired
        </span>
      </div>

      {/* Explanation */}

      <div className="text-xs text-gray-500 border-t pt-3">

        <div className="font-medium text-gray-700 mb-1">
          ℹ How Reputation is Calculated
        </div>

        <p>
          Reputation reflects how consistently you follow through on commitments.
          Completing commitments, maintaining a strong completion rate, and
          generating engagement through views and shares improve your score.
          Withdrawn or expired commitments may reduce credibility.
        </p>

      </div>

    </div>
  );
}
