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

  console.log("User ID:", user.id);
  console.log("Commitment ID:", params.id);

  const { data, error } = await supabase
    .from("commitments")
    .update({ status: "active" })
    .eq("id", params.id)
    .eq("user_id", user.id)
    .select();

  console.log("Update result:", data);
  console.log("Update error:", error);

  redirect("/dashboard");
}
