"use client";

import Link from "next/link";
import FollowButton from "@/components/social/FollowButton";
import CheerButton from "@/components/CheerButton";

type Commitment = {
  id: string;
  title: string;
  status: string;
  start_date: string;
  end_date: string;
  completed_at?: string;

  creatorName: string;
  creatorUsername: string;
  creatorAvatar?: string | null; // ✅ added for avatar display
  creatorId: string;
  creatorType: "user" | "company";

  currentUserId?: string | null;
  cheers?: number; // ✅ added for CheerButton
};

export default function CommitmentCard({
  commitment,
}: {
  commitment: Commitment;
}) {

  const start = new Date(commitment.start_date);
  const end = new Date(commitment.end_date);

  const startFormatted = start.toLocaleDateString();
  const endFormatted = end.toLocaleDateString();

  const isOwner =
    commitment.currentUserId &&
    commitment.creatorType === "user" &&
    commitment.currentUserId === commitment.creatorId;

  const profileLink =
    commitment.creatorType === "company"
      ? `/c/${commitment.creatorUsername}`
      : `/u/${commitment.creatorUsername}`;

  // Fallback avatar via ui-avatars
  const avatar = commitment.creatorAvatar?.trim()
    ? commitment.creatorAvatar.trim()
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(
        commitment.creatorName || commitment.creatorUsername || "User"
      )}&background=4338ca&color=fff`;

  let completedText = null;

  if (commitment.status === "completed" && commitment.completed_at) {
    const completed = new Date(commitment.completed_at);
    const daysTaken = Math.ceil(
      (completed.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    completedText = (
      <p className="text-sm text-green-600 mt-1">
        Completed in {daysTaken} days
      </p>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 w-full max-w-md mx-auto hover:shadow-md transition">

      {/* Creator row — avatar + name + follow */}
      <div className="flex justify-between items-center mb-3">

        {/* ✅ Avatar + name both link to profile */}
        <Link href={profileLink} className="flex items-center gap-2 group">
          <img
            src={avatar}
            alt={commitment.creatorName}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
          <span className="font-medium text-gray-900 group-hover:underline">
            {commitment.creatorName}
          </span>
        </Link>

        {/* Follow Button */}
        {!isOwner && commitment.currentUserId && (
          <FollowButton
            currentUserId={commitment.currentUserId}
            targetUserId={
              commitment.creatorType === "user"
                ? commitment.creatorId
                : undefined
            }
            targetCompanyId={
              commitment.creatorType === "company"
                ? commitment.creatorId
                : undefined
            }
          />
        )}

      </div>

      {/* Title */}
      <Link href={`/commitment/${commitment.id}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:underline">
          {commitment.title}
        </h3>
      </Link>

      {/* Status */}
      <div className="flex justify-between items-center mb-2">
        <span
          className={`text-sm px-3 py-1 rounded-full ${
            commitment.status === "active"
              ? "bg-green-100 text-green-700"
              : commitment.status === "completed"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {commitment.status}
        </span>
      </div>

      {/* Dates */}
      <p className="text-sm text-gray-500">
        {startFormatted} → {endFormatted}
      </p>

      {/* Completed info */}
      {completedText}

      {/* ✅ CheerButton footer */}
      <div className="flex justify-end mt-3 pt-3 border-t border-gray-100">
        <CheerButton
          commitmentId={commitment.id}
          initialCount={commitment.cheers ?? 0}
          size="small"
        />
      </div>

    </div>
  );
}
