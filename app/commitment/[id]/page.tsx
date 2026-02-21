"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CommitmentViewPage() {

  const supabase = createClient();
  const params = useParams();

  const commitmentId = params.id as string;

  const [commitment, setCommitment] = useState<any>(null);
  const [updates, setUpdates] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCommitment();
    trackView();
  }, []);

  async function loadCommitment() {

    try {

      // GET COMMITMENT
      const { data: commitmentData, error: commitmentError } =
        await supabase
          .from("commitments")
          .select("*")
          .eq("id", commitmentId)
          .single();

      if (commitmentError || !commitmentData) {
        setError("Commitment not found");
        setLoading(false);
        return;
      }

      setCommitment(commitmentData);

      // GET PROFILE
      const { data: profileData } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", commitmentData.user_id)
          .single();

      setProfile(profileData);

      // GET UPDATES
      const { data: updatesData } =
        await supabase
          .from("commitment_updates")
          .select("*")
          .eq("commitment_id", commitmentId)
          .order("created_at", { ascending: false });

      setUpdates(updatesData || []);

    } catch (err) {

      setError("Failed to load commitment");

    }

    setLoading(false);

  }

  async function trackView() {

    try {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      await supabase
        .from("commitment_views")
        .insert({
          commitment_id: commitmentId,
          viewer_id: user?.id || null,
        });

    } catch {}

  }

  function getDaysRemaining() {

    if (!commitment?.end_date) return null;

    const today = new Date();
    const end = new Date(commitment.end_date);

    const diff =
      Math.ceil(
        (end.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
      );

    return diff;

  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );

  const daysRemaining = getDaysRemaining();

  const avatar =
    profile?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile?.display_name || "User"
    )}&background=2563eb&color=fff`;

  return (

    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="max-w-2xl mx-auto space-y-6">

        {/* BRAND */}
        <Link href="/">
          <div className="text-2xl font-bold text-blue-600">
            Stated
          </div>
        </Link>

        {/* PROFILE */}
        <Link href={`/u/${profile?.username}`}>
          <div className="flex items-center gap-3 cursor-pointer">

            <img
              src={avatar}
              className="w-10 h-10 rounded-full"
            />

            <div>

              <div className="font-medium">
                {profile?.display_name}
              </div>

              <div className="text-sm text-gray-500">
                @{profile?.username}
              </div>

            </div>

          </div>
        </Link>

        {/* COMMITMENT CARD */}
        <div className="bg-white rounded-xl shadow p-5">

          <div className="text-lg font-semibold">
            {commitment.text}
          </div>

          <div className="text-sm text-gray-500 mt-2">

            Status:
            <span className="ml-1 capitalize font-medium">
              {commitment.status}
            </span>

          </div>

          {commitment.status === "active" && daysRemaining !== null && (

            <div className="text-sm text-gray-500 mt-1">

              {daysRemaining > 0
                ? `${daysRemaining} days remaining`
                : "Expired"}

            </div>

          )}

          <div className="text-xs text-gray-400 mt-2">

            Created:
            {" "}
            {new Date(
              commitment.created_at
            ).toLocaleDateString()}

          </div>

        </div>

        {/* UPDATES */}
        <div>

          <div className="font-semibold mb-3">
            Progress updates
          </div>

          {updates.length === 0 && (

            <div className="text-gray-500 text-sm">
              No updates yet
            </div>

          )}

          <div className="space-y-3">

            {updates.map((update) => (

              <div
                key={update.id}
                className="bg-white rounded-xl shadow p-4"
              >

                <div className="text-sm">
                  {update.content}
                </div>

                <div className="text-xs text-gray-400 mt-2">
                  {new Date(
                    update.created_at
                  ).toLocaleString()}
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

}
