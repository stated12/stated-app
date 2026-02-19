import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface Props {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: Props) {
  const supabase = await createClient();

  const username = params.username;

  // Fetch profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .select(`
      id,
      username,
      display_name,
      bio,
      credits,
      created_at
    `)
    .eq("username", username)
    .single();

  if (error || !profile) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      
      {/* Header */}
      <div className="border-b px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-semibold text-blue-600">
          Stated
        </div>

        <div className="text-sm text-gray-500">
          @{profile.username}
        </div>
      </div>


      {/* Profile Section */}
      <div className="max-w-2xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold">
          {profile.display_name || profile.username}
        </h1>

        <p className="text-gray-500 mt-2">
          @{profile.username}
        </p>

        {profile.bio && (
          <p className="mt-4 text-gray-700">
            {profile.bio}
          </p>
        )}

        <div className="mt-6 text-sm text-gray-500">
          Credits: {profile.credits ?? 0}
        </div>

      </div>

    </main>
  );
}
