export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ResumeCommitment({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { error } = await supabase
    .from("commitments")
    .update({
      status: "active",
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Resume error:", error);
  }

  await supabase.from("commitment_updates").insert({
    commitment_id: params.id,
    user_id: user.id,
    content: "Commitment resumed",
  });

  redirect("/dashboard");
}
