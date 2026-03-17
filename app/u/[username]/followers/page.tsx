export const dynamic = "force-dynamic";

import Link from "next/link";
import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";

export default async function FollowersPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {

  const { username } = await params;

  const supabase = createPublicClient();
  const supabaseAuth = await createClient();

  const {
    data: { user: currentUser },
  } = await supabaseAuth.auth.getUser();

  const cleanUsername = decodeURIComponent(username)
    .trim()
    .toLowerCase();

  /* =========================
     PROFILE
  ========================= */

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, display_name")
    .ilike("username", cleanUsername)
    .single();

  if (!profile) {
    return <div className="p-10 text-center">User not found</div>;
  }

  /* =========================
     FOLLOWERS
  ========================= */

  const { data: followers } = await supabase
    .from("follows")
    .select(`
      follower_user_id,
      profiles!follows_follower_user_id_fkey (
        id,
        username,
        display_name,
        avatar_url
      )
    `)
    .eq("following_user_id", profile.id);

  /* =========================
     WHO CURRENT USER FOLLOWS
  ========================= */

  let followingSet = new Set<string>();

  if (currentUser) {
    const { data: myFollowing } = await supabase
      .from("follows")
      .select("following_user_id")
      .eq("follower_user_id", currentUser.id);

    followingSet = new Set(
      myFollowing?.map((f) => f.following_user_id) || []
    );
  }

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

            const isFollowing = followingSet.has(user.id);

            return (

              <div
                key={f.follower_user_id}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:bg-gray-50 transition"
              >

                {/* LEFT */}
                <Link
                  href={`/u/${user.username}`}
                  className="flex items-center gap-4"
                >

                  <img
                    src={avatar}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>

                    <div className="font-semibold text-gray-900">
                      {user.display_name || user.username}
                    </div>

                    <div className="text-sm text-gray-500">
                      @{user.username}
                    </div>

                  </div>

                </Link>

                {/* RIGHT */}
                {currentUser && currentUser.id !== user.id && (

                  isFollowing ? (

                    <button
                      disabled
                      className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full"
                    >
                      Following
                    </button>

                  ) : (

                    <form action="/api/follow" method="POST">

                      <input
                        type="hidden"
                        name="targetUserId"
                        value={user.id}
                      />

                      <button
                        type="submit"
                        className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition"
                      >
                        Follow Back
                      </button>

                    </form>

                  )

                )}

              </div>

            );

          })}

        </div>

      </div>

    </div>

  );

}
