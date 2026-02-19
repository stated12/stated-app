import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface Props {
  params: {
    username: string;
  };
}

export default async function ProfilePage({ params }: Props) {
  const supabase = createClient();

  const username = params.username;

  // Fetch profile by username
  const { data: profile, error } = await supabase
    .from("profiles")
    .select(`
      id,
      username,
      display_name,
      bio,
      avatar_url,
      created_at,
      credits
    `)
    .eq("username", username)
    .single();

  if (error || !profile) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-12">

        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-blue-600">
            Stated
          </h1>
        </div>

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">

          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-semibold">
            {profile.display_name?.charAt(0) || profile.username.charAt(0)}
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              {profile.display_name || profile.username}
            </h2>

            <p className="text-gray-500">
              @{profile.username}
            </p>
          </div>

        </div>

        {/* Bio */}
        {profile.bio && (
          <p className="text-gray-700 mb-6">
            {profile.bio}
          </p>
        )}

        {/* Credits */}
        <div className="text-sm text-gray-500">
          Credits: {profile.credits}
        </div>

      </div>
    </main>
  );
}
