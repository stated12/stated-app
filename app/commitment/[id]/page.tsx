import { createClient } from "@/lib/supabase/server";
import CommitmentClient from "./view";

export default async function Page({
  params,
}: {
  params: { id: string };
}) {

  const supabase = await createClient();

  const { data: commitment } = await supabase
    .from("commitments")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  return (
    <CommitmentClient
      commitment={commitment}
      commitmentId={params.id}
    />
  );
}
