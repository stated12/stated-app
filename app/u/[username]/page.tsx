import { createClient } from "@/lib/supabase/server";

export default async function PublicProfile(
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, name, bio")
    .eq("username", username)
    .single();

  if (!profile) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>User not found</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>{profile.name || profile.username}</h1>
      <p>{profile.bio}</p>
    </div>
  );
}
