import { createClient } from "@/lib/supabase/server";
import CommitmentClient from "./view";

export default async function Page({
  params,
}: {
  params: { id: string };
}) {

  const supabase = await createClient();

  const { data } = await supabase
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
    .eq("id", params.id)
    .maybeSingle();

  return (
    <CommitmentClient
      commitment={data}
      commitmentId={params.id}
    />
  );
}
