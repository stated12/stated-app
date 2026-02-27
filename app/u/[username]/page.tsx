export const dynamic = "force-dynamic";

import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ShareProfileButton from "@/components/ShareProfileButton";
import ReputationCard from "@/components/ReputationCard";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = await createClient();

  // 🔎 DEBUG VERSION (NO .single())
  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.username);

  console.log("USERNAME PARAM:", params.username);
  console.log("PROFILES RESULT:", profiles);
  console.log("ERROR RESULT:", error);

  // If nothing returned
  if (!profiles || profiles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">
            No profile found (debug mode)
          </h1>
          <p>Check Vercel logs for details.</p>
        </div>
      </div>
    );
  }

  if (profiles.length > 1) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">
            Duplicate usernames detected
          </h1>
          <p>Profiles count: {profiles.length}</p>
        </div>
      </div>
    );
  }

  const profile = profiles[0];

  await supabase.from("profile_views").insert({
    profile_id: profile.id,
  });

  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, status, created_at")
    .eq("user_id", profile.id)
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  const avatarUrl =
    profile.avatar_url && profile.avatar_url.startsWith("http")
      ? profile.avatar_url
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile.display_name || profile.username || "User"
        )}&background=2563eb&color=fff`;

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
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-10">

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">
            {profile.display_name || profile.username}
          </h1>
          <p className="text-gray-600">@{profile.username}</p>
        </div>

        <ReputationCard userId={profile.id} />

        <div className="mt-10">
          <h2 className="text-xl font-bold mb-6 text-center">
            Public Commitments
          </h2>

          {commitments && commitments.length > 0 ? (
            <div className="space-y-6">
              {commitments.map((c) => (
                <div
                  key={c.id}
                  className="border rounded-xl p-6 shadow-sm"
                >
                  <div className="font-semibold text-lg mb-2">
                    {c.text}
                  </div>
                  <div className={`text-sm capitalize ${statusColor(c.status)}`}>
                    Status: {c.status}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              No public commitments.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
