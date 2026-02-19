import { createClient } from "@/lib/supabase/server";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, bio, credits")
    .eq("username", params.username)
    .single();

  // DEBUG VIEW (never show 404 automatically)
  if (error || !profile) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Profile lookup debug</h1>
        <p>Username searched: {params.username}</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{profile.display_name}</h1>
      <p>@{profile.username}</p>
      <p>Credits: {profile.credits}</p>
      <p>{profile.bio || "No bio yet"}</p>
    </div>
  );
}
