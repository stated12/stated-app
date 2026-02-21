"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CommitmentViewPage() {

  const supabase = createClient();
  const params = useParams();

  const commitmentId = String(params.id);

  const [commitment, setCommitment] = useState<any>(null);
  const [updates, setUpdates] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCommitment();
    trackView();
  }, [commitmentId]);


  async function loadCommitment() {

    try {

      // LOAD COMMITMENT
      const { data: commitmentData } =
        await supabase
          .from("commitments")
          .select("*")
          .eq("id", commitmentId)
          .single();

      if (!commitmentData) {
        setLoading(false);
        return;
      }

      setCommitment(commitmentData);

      // LOAD PROFILE
      const { data: profileData } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("id", commitmentData.user_id)
          .single();

      setProfile(profileData);


      // LOAD UPDATES
      const { data: updatesData } =
        await supabase
          .from("commitment_updates")
          .select("*")
          .eq("commitment_id", commitmentId)
          .order("created_at", { ascending: false });

      setUpdates(updatesData || []);

    } catch {}

    setLoading(false);

  }


  async function trackView() {

    try {

      await supabase
        .from("commitment_views")
        .insert({
          commitment_id: commitmentId
        });

    } catch {}

  }


  function avatar() {

    if (profile?.avatar_url)
      return profile.avatar_url;

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile?.display_name || "User"
    )}&background=2563eb&color=fff`;

  }


  function daysRemaining() {

    if (!commitment?.end_date)
      return null;

    const end = new Date(commitment.end_date);
    const today = new Date();

    const days =
      Math.ceil(
        (end.getTime() - today.getTime())
        /
        (1000 * 60 * 60 * 24)
      );

    return days;

  }


  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading commitment...
      </div>
    );


  if (!commitment)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Commitment not found
      </div>
    );


  const daysLeft = daysRemaining();


  return (

    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="max-w-2xl mx-auto space-y-6">


        {/* HEADER */}

        <Link href="/">
          <div className="text-2xl font-bold text-blue-600">
            Stated
          </div>
        </Link>


        {/* PROFILE */}

        <Link
          href={`/u/${profile?.username}`}
          className="flex items-center gap-3"
        >

          <img
            src={avatar()}
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

        </Link>


        {/* COMMITMENT CARD */}

        <div className="bg-white rounded-xl shadow p-6">

          <div className="text-lg font-medium mb-2">
            {commitment.text}
          </div>


          <div className="text-sm text-gray-500 capitalize">

            Status:
            <span className="ml-1 font-medium">
              {commitment.status}
            </span>

          </div>


          {commitment.status === "active" && daysLeft !== null && (

            <div className="text-sm text-gray-500 mt-1">

              {daysLeft > 0
                ? `${daysLeft} days remaining`
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

            <div className="text-gray-500">
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
                  {update.text}
                </div>

                <div className="text-xs text-gray-400 mt-1">

                  {new Date(
                    update.created_at
                  ).toLocaleDateString()}

                </div>

              </div>

            ))}

          </div>

        </div>


      </div>

    </div>

  );

}
