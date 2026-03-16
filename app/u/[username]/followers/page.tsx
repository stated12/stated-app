import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function FollowersPage({
  params,
}: {
  params: { username: string };
}) {

  const supabase = await createClient();

  /* GET USER BY USERNAME */

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, display_name")
    .eq("username", params.username)
    .single();

  if (!profile) {
    return <div className="p-10">User not found</div>;
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
    <div className="max-w-2xl mx-auto py-10">

      <h1 className="text-2xl font-bold mb-6">
        Followers
      </h1>

      {(!followers || followers.length === 0) && (
        <div className="text-gray-500">
          No followers yet
        </div>
      )}

      <div className="space-y-4">

        {followers?.map((f: any) => {

          const user = f.profiles;

          return (
            <Link
              key={f.follower_user_id}
              href={`/u/${user.username}`}
              className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
            >

              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">

                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="font-bold">
                    {user.display_name?.charAt(0)}
                  </span>
                )}

              </div>

              <div>

                <div className="font-semibold">
                  {user.display_name}
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
  );
}
