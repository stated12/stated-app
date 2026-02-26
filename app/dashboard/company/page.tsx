export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CompanyDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: company } = await supabase
    .from("companies")
    .select("*")
    .eq("owner_id", user.id)
    .single();

  if (!company) {
    redirect("/dashboard/company/new");
  }

  const { data: commitments } = await supabase
    .from("commitments")
    .select("*")
    .eq("company_id", company.id)
    .order("created_at", { ascending: false });

  const { data: members } = await supabase
    .from("company_members")
    .select("role, profiles(username, display_name, avatar_url)")
    .eq("company_id", company.id);

  const total = commitments?.length ?? 0;
  const active =
    commitments?.filter((c) => c.status === "active").length ?? 0;
  const completed =
    commitments?.filter((c) => c.status === "completed").length ?? 0;

  const avatar =
    company.avatar_url?.trim()
      ? company.avatar_url.trim()
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          company.name
        )}&background=2563eb&color=fff`;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="flex items-center gap-4">
          <Image
            src={avatar}
            alt="company"
            width={72}
            height={72}
            className="rounded-full"
          />
          <div>
            <div className="text-2xl font-bold">
              {company.name}
              <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">
                COMPANY
              </span>
            </div>
            <div className="text-gray-500">
              @{company.username}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {company.description}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-sm bg-white rounded-xl shadow p-5">
          <div>Total: {total}</div>
          <div>Active: {active}</div>
          <div>Completed: {completed}</div>
        </div>

        <div className="bg-white rounded-xl shadow p-5 space-y-4">
          <div className="flex justify-between items-center">
            <div className="font-semibold">Members</div>
          </div>

          {members?.length === 0 && (
            <div className="text-sm text-gray-500">
              No members yet.
            </div>
          )}

          {members?.map((m: any, i: number) => {
            const profile = m.profiles;
            const memberAvatar =
              profile.avatar_url?.trim()
                ? profile.avatar_url.trim()
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    profile.display_name || profile.username
                  )}&background=2563eb&color=fff`;

            return (
              <div key={i} className="flex items-center gap-3">
                <Image
                  src={memberAvatar}
                  alt="member"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <div>
                  <div className="text-sm font-medium">
                    {profile.display_name || profile.username}
                  </div>
                  <div className="text-xs text-gray-500">
                    {m.role}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-xl shadow p-5 space-y-4">
          <div className="font-semibold">Company Commitments</div>

          {commitments?.length === 0 && (
            <div className="text-sm text-gray-500">
              No commitments yet.
            </div>
          )}

          {commitments?.map((c) => (
            <div
              key={c.id}
              className="border rounded-lg p-3 text-sm"
            >
              <div>{c.text}</div>
              <div className="text-gray-500 capitalize mt-1">
                {c.status}
              </div>
            </div>
          ))}
        </div>

        <div>
          <Link
            href="/dashboard/company/settings"
            className="text-blue-600 text-sm"
          >
            Company Settings
          </Link>
        </div>

      </div>
    </div>
  );
}
