import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";

interface Props {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: Props) {
  const supabase = await createClient();

  const username = params.username;

  // -------------------------
  // GET PROFILE
  // -------------------------
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(`
      id,
      username,
      full_name,
      bio,
      avatar_url,
      website,
      twitter,
      linkedin,
      github,
      created_at
    `)
    .eq("username", username)
    .single();

  if (profileError || !profile) {
    notFound();
  }

  // -------------------------
  // GET COMMITMENTS
  // -------------------------
  const { data: commitments } = await supabase
    .from("commitments")
    .select(`
      id,
      title,
      description,
      status,
      created_at
    `)
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  // -------------------------
  // UI
  // -------------------------
  return (
    <main className="min-h-screen bg-white">

      {/* HEADER */}
      <div className="border-b">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center gap-4">

          {profile.avatar_url ? (
            <Image
              src={profile.avatar_url}
              alt="avatar"
              width={64}
              height={64}
              className="rounded-full"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200" />
          )}

          <div>
            <h1 className="text-2xl font-semibold">
              {profile.full_name || profile.username}
            </h1>

            <p className="text-gray-500">@{profile.username}</p>

            {profile.bio && (
              <p className="mt-2 text-gray-700">{profile.bio}</p>
            )}

            {/* SOCIALS */}
            <div className="flex gap-4 mt-3 text-sm text-blue-600">

              {profile.website && (
                <a href={profile.website} target="_blank">
                  Website
                </a>
              )}

              {profile.twitter && (
                <a href={profile.twitter} target="_blank">
                  Twitter
                </a>
              )}

              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank">
                  LinkedIn
                </a>
              )}

              {profile.github && (
                <a href={profile.github} target="_blank">
                  GitHub
                </a>
              )}

            </div>

          </div>
        </div>
      </div>

      {/* COMMITMENTS */}
      <div className="max-w-3xl mx-auto px-6 py-8">

        <h2 className="text-lg font-semibold mb-6">
          Commitments
        </h2>

        {commitments && commitments.length > 0 ? (
          <div className="space-y-4">

            {commitments.map((commitment) => (
              <div
                key={commitment.id}
                className="border rounded-lg p-4"
              >

                <div className="flex justify-between items-center">

                  <h3 className="font-medium">
                    {commitment.title}
                  </h3>

                  <span className="text-sm text-gray-500 capitalize">
                    {commitment.status}
                  </span>

                </div>

                {commitment.description && (
                  <p className="text-gray-600 mt-2">
                    {commitment.description}
                  </p>
                )}

                <p className="text-xs text-gray-400 mt-2">
                  {new Date(commitment.created_at).toLocaleDateString()}
                </p>

              </div>
            ))}

          </div>

        ) : (

          <p className="text-gray-500">
            No commitments yet.
          </p>

        )}

      </div>

    </main>
  );
}
