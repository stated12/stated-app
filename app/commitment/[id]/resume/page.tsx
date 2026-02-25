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

  // First check commitment exists and belongs to user
  const { data: commitment, error: fetchError } = await supabase
    .from("commitments")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (fetchError || !commitment) {
    redirect("/dashboard");
  }

  // Only resume if currently paused
  if (commitment.status !== "paused") {
    redirect("/dashboard");
  }

  // Update status
  const { error: updateError } = await supabase
    .from("commitments")
    .update({
      status: "active",
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.id)
    .eq("user_id", user.id);

  if (updateError) {
    console.error("Resume error:", updateError);
    redirect("/dashboard");
  }

  // Log update
  await supabase.from("commitment_updates").insert({
    commitment_id: params.id,
    user_id: user.id,
    content: "Commitment resumed",
  });

  redirect("/dashboard");
}
