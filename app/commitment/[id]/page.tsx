import { createClient } from "@/lib/supabase/server";
import CommitmentClient from "./view";

export default async function Page({
  params,
}: {
  params: { id: string };
}) {

  const commitmentId = params.id;

  const supabase = await createClient();

  const { data: commitment } = await supabase
    .from("commitments")
    .select(`
      *,
      profiles:user_id (
        username,
        display_name,
        avatar_url
      ),
      companies:company_id (
        username,
        name,
        logo_url
      )
    `)
    .eq("id", commitmentId)
    .single();

  return (
    <CommitmentClient
      commitment={commitment}
      commitmentId={commitmentId}
    />
  );
}
