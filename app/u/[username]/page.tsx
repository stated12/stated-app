import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {

  // FIX: await is REQUIRED
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, credits")
    .eq("username", params.username)
    .single();

  if (error || !profile) {
    notFound();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-white">

      <div className="border rounded-xl p-8 shadow-sm w-full max-w-md">

        <h1 className="text-center text-2xl font-bold text-blue-600 mb-6">
          Stated
        </h1>

        <div className="text-center space-y-2">

          <p className="text-xl font-semibold">
            {profile.display_name}
          </p>

          <p className="text-gray-500">
            @{profile.username}
          </p>

          <p className="text-gray-700 mt-4">
            Credits: {profile.credits}
          </p>

        </div>

      </div>

    </main>
  );

}
