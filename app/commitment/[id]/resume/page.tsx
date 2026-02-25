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

  const { error, count } = await supabase
    .from("commitments")
    .update({
      status: "active",
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.id)
    .eq("user_id", user.id)
    .eq("status", "paused")
    .select("*", { count: "exact" });

  if (error || count === 0) {
    console.error("Resume failed:", error);
  }

  redirect("/dashboard");
}
