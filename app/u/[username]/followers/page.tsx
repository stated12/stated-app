export const dynamic = "force-dynamic";

import Link from "next/link";
import { createPublicClient } from "@/lib/supabase/public";

export default async function FollowersPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {

  const { username } = await params;

  const supabase = createPublicClient();

  const cleanUsername = decodeURIComponent(username)
    .trim()
    .toLowerCase();

  /* GET PROFILE */

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, display_name")
    .ilike("username", cleanUsername)
    .single();

  if (!profile) {
    return <div className="p-10 text-center">User not found</div>;
  }

  /* GET FOLLOWERS */

  const { data: followers } = await supabase
    .from("follows")
    .select(`
      follower_user_id,
      profiles!follows_follower_user_id_fkey (
        username,
        display_name,
        avatar_url
      )
    `)
    .eq("following_user_id", profile.id);

  return (

    <div className="min-h-screen bg-gray-50 px-6 py-12">

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-8">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Followers
        </h1>

        {(!followers || followers.length === 0) && (
          <div className="text-gray-500 text-center">
            No followers yet
          </div>
        )}

        <div className="space-y-4">

          {followers?.map((f: any) => {

            const user = f.profiles;

            if (!user) return null;

            const avatar =
              user.avatar_url?.trim()
                ? user.avatar_url
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.display_name ||
                    user.username ||
                    "User"
                  )}&background=2563eb&color=fff`;

            return (

              <Link
                key={f.follower_user_id}
                href={`/u/${user.username}`}
                className="flex items-center gap-3 p-3 border rounded-xl hover:bg-gray-50 transition"
              >

                <img
                  src={avatar}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>

                  <div className="font-semibold">
                    {user.display_name || user.username}
                  </div>

                  <div className="text-sm text-gray-500">
                    @{user.username}
                  </div>

                </div>

              </Link>

            );

          })}

        </div>

      </div>

    </div>

  );

}
