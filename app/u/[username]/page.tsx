import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name, bio, credits")
    .eq("username", params.username)
    .limit(1)
    .maybeSingle();

  if (!profile) {
    notFound();
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>{profile.display_name}</h1>
      <p>@{profile.username}</p>
      <p>{profile.bio ?? "No bio yet"}</p>
      <p>Credits: {profile.credits}</p>
    </div>
  );
}
