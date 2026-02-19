import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: Props) {
  const supabase = createClient();

  // PROFILE
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
    .eq("username", params.username)
    .single();

  if (!profile || profileError) {
    notFound();
  }

  // COMMITMENTS
  const { data: commitments } = await supabase
    .from("commitments")
    .select(`
      id,
      title,
      description,
      status,
      proof_url,
      target_date,
      completed_at,
      created_at
    `)
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  // STATS
  const total = commitments?.length || 0;
  const completed =
    commitments?.filter((c) => c.status === "completed").length || 0;
  const active =
    commitments?.filter((c) => c.status === "active").length || 0;
  const failed =
    commitments?.filter((c) => c.status === "failed").length || 0;

  return (
    <main className="min-h-screen bg-white">

      {/* STATED HEADER */}
      <div className="border-b bg-white">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">

          <Link href="/" className="text-xl font-semibold text-blue-600">
            Stated
          </Link>

          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-black"
          >
            Login
          </Link>

        </div>
      </div>


      {/* PROFILE */}
      <div className="max-w-2xl mx-auto px-4 py-8">

        <div className="text-center">

          {profile.avatar_url && (
            <img
              src={profile.avatar_url}
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
          )}

          <h1 className="text-2xl font-bold">
            @{profile.username}
          </h1>

          {profile.full_name && (
            <p className="text-gray-600 mt-1">
              {profile.full_name}
            </p>
          )}

          {profile.bio && (
            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              {profile.bio}
            </p>
          )}

          {/* SOCIAL LINKS */}
          <div className="flex justify-center gap-4 mt-4 text-sm">

            {profile.website && (
              <a
                href={profile.website}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Website
              </a>
            )}

            {profile.twitter && (
              <a
                href={`https://twitter.com/${profile.twitter}`}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Twitter
              </a>
            )}

            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            )}

            {profile.github && (
              <a
                href={`https://github.com/${profile.github}`}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
            )}

          </div>


          <p className="text-xs text-gray-400 mt-4">
            On Stated since{" "}
            {new Date(profile.created_at).toLocaleDateString()}
          </p>

        </div>


        {/* STATS */}
        <div className="grid grid-cols-4 text-center mt-8 border rounded-lg overflow-hidden">

          <div className="p-3">
            <div className="font-bold">{total}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>

          <div className="p-3 border-l">
            <div className="font-bold text-blue-600">{active}</div>
            <div className="text-xs text-gray-500">Active</div>
          </div>

          <div className="p-3 border-l">
            <div className="font-bold text-green-600">{completed}</div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>

          <div className="p-3 border-l">
            <div className="font-bold text-red-600">{failed}</div>
            <div className="text-xs text-gray-500">Failed</div>
          </div>

        </div>


        {/* COMMITMENTS */}
        <div className="mt-10">

          <h2 className="font-semibold mb-4">
            Commitment Record
          </h2>

          {commitments?.length === 0 && (
            <p className="text-gray-500 text-sm">
              No commitments yet.
            </p>
          )}

          <div className="space-y-4">

            {commitments?.map((c) => (

              <div
                key={c.id}
                className="border rounded-lg p-4 bg-gray-50"
              >

                <div className="flex justify-between">

                  <div className="font-medium">
                    {c.title}
                  </div>

                  <div
                    className={`text-xs px-2 py-1 rounded ${
                      c.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : c.status === "failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {c.status}
                  </div>

                </div>

                {c.description && (
                  <div className="text-sm text-gray-600 mt-1">
                    {c.description}
                  </div>
                )}

                {c.target_date && (
                  <div className="text-xs text-gray-400 mt-2">
                    Target:{" "}
                    {new Date(c.target_date).toLocaleDateString()}
                  </div>
                )}

                {c.completed_at && (
                  <div className="text-xs text-green-600">
                    Completed:{" "}
                    {new Date(c.completed_at).toLocaleDateString()}
                  </div>
                )}

                {c.proof_url && (
                  <a
                    href={c.proof_url}
                    target="_blank"
                    className="text-xs text-blue-600 hover:underline mt-1 block"
                  >
                    View proof
                  </a>
                )}

              </div>

            ))}

          </div>

        </div>


        {/* FOOTER */}
        <div className="text-center text-xs text-gray-400 mt-12">
          Built in India for the world
        </div>


      </div>

    </main>
  );
}
