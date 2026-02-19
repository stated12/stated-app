import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

type Props = {
  params: {
    username: string;
  };
};

export default async function UserPage({ params }: Props) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name, bio, credits")
    .eq("username", params.username)
    .maybeSingle();

  if (!profile) {
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
