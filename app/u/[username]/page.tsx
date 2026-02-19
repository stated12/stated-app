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
    .select("username, display_name, credits")
    .eq("username", params.username)
    .maybeSingle();

  if (!profile) {
    notFound();
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{profile.display_name}</h1>
      <p>@{profile.username}</p>
      <p>Credits: {profile.credits}</p>
    </div>
  );
}
