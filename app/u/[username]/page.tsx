export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = await createClient();
  const usernameParam = params?.username;

  if (!usernameParam) notFound();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .ilike("username", usernameParam);

  if (!profiles || profiles.length === 0) notFound();

  const profile = profiles[0];

  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, status, created_at")
    .eq("user_id", profile.id)
    .eq("visibility", "public")
    .order("created_at", { ascending: false });

  const commitmentIds = commitments?.map((c) => c.id) || [];

  const { data: updates } =
    commitmentIds.length > 0
      ? await supabase
          .from("commitment_updates")
          .select("*")
          .in("commitment_id", commitmentIds)
          .order("created_at", { ascending: false })
      : { data: [] };

  const avatarUrl =
    profile.avatar_url?.startsWith("http")
      ? profile.avatar_url
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          profile.display_name || profile.username || "User"
        )}&background=2563eb&color=fff`;

  return (
    <div>
      <h1>Profile Working</h1>
    </div>
  );
}
