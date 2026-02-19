import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = await createClient(); // ✅ MUST await

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, bio, credits")
    .eq("username", params.username)
    .maybeSingle();

  if (error || !profile) {
    notFound();
  }

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>{profile.display_name || profile.username}</h1>

      {profile.bio && <p>{profile.bio}</p>}

      <p>@{profile.username}</p>

      <p>Credits: {profile.credits}</p>
    </div>
  );
}
