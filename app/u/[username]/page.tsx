import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, bio, credits")
    .eq("username", params.username)
    .maybeSingle();

  if (!profile || error) {
    notFound();
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>{profile.display_name}</h1>
      <p>@{profile.username}</p>
      <p>Credits: {profile.credits}</p>
    </div>
  );
}
