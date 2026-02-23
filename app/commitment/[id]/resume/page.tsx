import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ResumeCommitment({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  await supabase
    .from("commitments")
    .update({ status: "active" })
    .eq("id", params.id);

  redirect("/dashboard");
}
