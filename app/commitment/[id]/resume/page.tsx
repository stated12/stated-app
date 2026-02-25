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
    .update({ status: "active" })
    .eq("id", params.id)
    .eq("user_id", user.id); // 🔥 critical

  if (error) {
    console.error(error);
  }

  redirect("/dashboard");
}
