export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AcceptInvitePage({
  params,
}: {
  params: { token: string };
}) {
  const supabase = await createClient();
  const token = params.token;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?next=/invite/${token}`);
  }

  const { data: invite } = await supabase
    .from("company_invites")
    .select("*")
    .eq("token", token)
    .eq("status", "pending")
    .single();

  if (!invite) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <h1 className="text-xl font-semibold mb-4">
          Invite not valid or already used
        </h1>
        <Link href="/dashboard" className="text-blue-600 underline">
          Go to dashboard
        </Link>
      </div>
    );
  }

  if (invite.email !== user.email) {
    return (
      <div className="max-w-md mx-auto mt-20 text-center">
        <h1 className="text-xl font-semibold mb-4">
          This invite was sent to another email
        </h1>
        <Link href="/dashboard" className="text-blue-600 underline">
          Go to dashboard
        </Link>
      </div>
    );
  }

  const { data: existing } = await supabase
    .from("company_members")
    .select("*")
    .eq("company_id", invite.company_id)
    .eq("user_id", user.id)
    .single();

  if (!existing) {
    await supabase.from("company_members").insert({
      company_id: invite.company_id,
      user_id: user.id,
      role: invite.role,
    });
  }

  await supabase
    .from("company_invites")
    .update({ status: "accepted" })
    .eq("id", invite.id);

  redirect("/dashboard/company");
}
