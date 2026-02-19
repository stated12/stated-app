import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = await createClient();

  // Normalize username
  const username = params.username.trim().toLowerCase();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, bio, credits")
    .ilike("username", username)
    .maybeSingle();

  if (!profile) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Debug Info</h1>
        <p>Searched username: {username}</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{profile.display_name}</h1>
      <p>@{profile.username}</p>
      <p>{profile.bio ?? "No bio yet"}</p>
      <p>Credits: {profile.credits}</p>
    </div>
  );
}
