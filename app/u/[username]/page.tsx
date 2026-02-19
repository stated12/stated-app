import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: PageProps) {
  const supabase = createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id, username, display_name, credits")
    .eq("username", params.username)
    .maybeSingle();

  if (!profile || error) {
    notFound();
  }

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>@{profile.username}</h1>
      <p>Name: {profile.display_name}</p>
      <p>Credits: {profile.credits}</p>
    </div>
  );
}
