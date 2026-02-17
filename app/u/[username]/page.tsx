import { createClient } from "@/lib/supabase/server";

export default async function PublicProfile(
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("username, display_name, bio")
    .eq("username", username)
    .maybeSingle();

  if (error || !profile) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>User not found</h1>
        <p>Username: {username}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>{profile.display_name}</h1>

      <p style={{ color: "#666" }}>
        @{profile.username}
      </p>

      <p style={{ marginTop: "10px" }}>
        {profile.bio || "No bio yet."}
      </p>
    </div>
  );
}
