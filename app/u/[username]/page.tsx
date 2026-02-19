import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface Props {
  params: {
    username: string;
  };
}

export default async function UserProfilePage({ params }: Props) {
  const supabase = createClient();

  const username = params.username;

  // Fetch profile safely
  const { data: profile, error } = await supabase
    .from("profiles")
    .select(`
      id,
      username,
      display_name,
      credits,
      created_at
    `)
    .eq("username", username)
    .single();

  if (error || !profile) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-white flex items-start justify-center pt-16 px-4">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            Stated
          </h1>

          <h2 className="text-xl font-semibold">
            {profile.display_name || profile.username}
          </h2>

          <p className="text-gray-500">
            @{profile.username}
          </p>
        </div>

        {/* Credits Card */}
        <div className="border rounded-xl p-6 shadow-sm">
          <p className="text-gray-600 mb-2">
            Credits
          </p>

          <p className="text-2xl font-bold">
            {profile.credits}
          </p>
        </div>

      </div>
    </main>
  );
}
