export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function CompanyDashboardPage() {
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

  if (!company) redirect("/dashboard");

  const { data: members } = await supabase
    .from("company_members")
    .select(`
      id,
      role,
      profiles (
        id,
        username,
        display_name,
        avatar_url
      )
    `)
    .eq("company_id", company.id);

  return (
    <div className="max-w-4xl mx-auto space-y-10">

      <div>
        <h1 className="text-2xl font-bold">{company.name}</h1>
        <div className="text-sm text-gray-500">@{company.username}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href={`/c/${company.username}`}
          className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
        >
          Public Page
        </Link>

        <Link
          href="/dashboard/company/insights"
          className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
        >
          Company Analytics
        </Link>

        <Link
          href="/dashboard/company/settings"
          className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
        >
          Company Settings
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Members</h2>

        <Link
          href="/dashboard/company/invite"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Invite Member
        </Link>
      </div>

      <div className="space-y-4">
        {members?.map((m) => {
          const avatar =
            m.profiles.avatar_url?.trim()
              ? m.profiles.avatar_url.trim()
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  m.profiles.display_name || m.profiles.username
                )}&background=2563eb&color=fff`;

          return (
            <div
              key={m.id}
              className="bg-white rounded-xl shadow p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <img
                  src={avatar}
                  className="w-10 h-10 rounded-full"
                />

                <div>
                  <div className="font-medium">
                    {m.profiles.display_name ||
                      m.profiles.username}
                  </div>
                  <div className="text-xs text-gray-500">
                    @{m.profiles.username}
                  </div>
                </div>
              </div>

              <div className="text-sm bg-gray-200 px-3 py-1 rounded">
                {m.role}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
