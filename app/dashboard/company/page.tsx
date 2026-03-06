export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

/* ---------------- TYPES ---------------- */

type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
};

type Company = {
  id: string;
  name: string;
  username: string;
  owner_id: string;
};

type Member = {
  id: string;
  role: string;
  user_id: string;
  profiles: Profile | null;
};

type Commitment = {
  id: string;
  text: string;
  category: string | null;
  views: number | null;
  created_at: string;
  created_by_user_id: string | null;
  commitment_updates: {
    text: string | null;
    created_at: string;
  }[];
};

/* ---------------- PAGE ---------------- */

export default async function CompanyDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  /* ---------------- COMPANY MEMBERSHIP ---------------- */

  const { data: membership } = await supabase
    .from("company_members")
    .select("company_id, role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!membership) redirect("/dashboard");

  const { data: companyData } = await supabase
    .from("companies")
    .select("*")
    .eq("id", membership.company_id)
    .single();

  if (!companyData) redirect("/dashboard");

  const company: Company = {
    id: String(companyData.id),
    name: String(companyData.name),
    username: String(companyData.username),
    owner_id: String(companyData.owner_id),
  };

  /* ---------------- MEMBERS ---------------- */

  const { data: membersData } = await supabase
    .from("company_members")
    .select(`
      id,
      role,
      user_id,
      profiles (
        id,
        username,
        display_name,
        avatar_url
      )
    `)
    .eq("company_id", company.id);

  const members: Member[] =
    (membersData ?? []).map((m: any) => ({
      id: String(m.id),
      role: String(m.role),
      user_id: String(m.user_id),
      profiles: m.profiles
        ? {
            id: String(m.profiles.id),
            username: String(m.profiles.username),
            display_name: m.profiles.display_name ?? null,
            avatar_url: m.profiles.avatar_url ?? null,
          }
        : null,
    }));

  /* ---------------- COMMITMENTS ---------------- */

  const { data: commitmentsData } = await supabase
    .from("commitments")
    .select(`
      id,
      text,
      category,
      views,
      created_at,
      created_by_user_id,
      commitment_updates (
        text,
        created_at
      )
    `)
    .eq("company_id", company.id)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(10);

  const commitments: Commitment[] =
    (commitmentsData ?? []) as Commitment[];

  /* ---------------- PAGE ---------------- */

  return (
    <div className="max-w-4xl mx-auto space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">{company.name}</h1>
        <div className="text-sm text-gray-500">@{company.username}</div>
      </div>

      {/* QUICK LINKS */}
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

      {/* COMPANY COMMITMENTS */}
      <div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Company Commitments</h2>
        </div>

        <div className="space-y-4">

          {commitments.map((c) => {

            const latestUpdate =
              c.commitment_updates?.[0] || null;

            return (

              <div
                key={c.id}
                className="bg-white rounded-xl shadow p-5"
              >

                <div className="font-medium mb-1">
                  {c.text}
                </div>

                {c.category && (
                  <div className="text-xs text-gray-500 mb-2">
                    {c.category}
                  </div>
                )}

                {latestUpdate ? (
                  <div className="text-sm text-gray-600">
                    Latest update: {latestUpdate.text}
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">
                    No updates yet
                  </div>
                )}

                <div className="text-xs text-gray-400 mt-2">
                  👁 {c.views ?? 0} views
                </div>

              </div>

            );
          })}

          {commitments.length === 0 && (
            <div className="text-sm text-gray-500">
              No commitments yet.
            </div>
          )}

        </div>

        <div className="mt-4 flex gap-4">

          <Link
            href="/dashboard/create"
            className="text-blue-600 text-sm hover:underline"
          >
            + Create Commitment
          </Link>

          <Link
            href={`/c/${company.username}`}
            className="text-gray-600 text-sm hover:underline"
          >
            View More
          </Link>

        </div>

      </div>

      {/* MEMBERS */}
      <div>

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-lg font-semibold">Members</h2>

          {(membership.role === "owner" || membership.role === "admin") && (
            <Link
              href="/dashboard/company/invite"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Invite Member
            </Link>
          )}

        </div>

        <div className="space-y-4">

          {members.map((m) => (
            <MemberRow
              key={m.id}
              member={m}
              isOwner={m.user_id === company.owner_id}
              isSelf={m.user_id === user.id}
              canManage={
                membership.role === "owner" ||
                membership.role === "admin"
              }
            />
          ))}

          {members.length === 0 && (
            <div className="text-sm text-gray-500">
              No members yet.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

/* ---------------- MEMBER ROW ---------------- */

function MemberRow({
  member,
  isOwner,
  isSelf,
  canManage,
}: {
  member: Member;
  isOwner: boolean;
  isSelf: boolean;
  canManage: boolean;
}) {

  const avatar =
    member.profiles?.avatar_url?.trim()
      ? member.profiles.avatar_url.trim()
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          member.profiles?.display_name ||
          member.profiles?.username ||
          "User"
        )}&background=2563eb&color=fff`;

  return (

    <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">

      <div className="flex items-center gap-3">

        <img
          src={avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />

        <div>
          <div className="font-medium">
            {member.profiles?.display_name ||
             member.profiles?.username}
          </div>

          <div className="text-xs text-gray-500">
            @{member.profiles?.username}
          </div>
        </div>

      </div>

      <div className="flex items-center gap-3">

        {isOwner ? (

          <div className="text-sm bg-black text-white px-3 py-1 rounded">
            owner
          </div>

        ) : canManage ? (

          <>
            <RoleSelector
              memberId={member.id}
              currentRole={member.role}
              disabled={isSelf}
            />

            <RemoveButton
              memberId={member.id}
              disabled={isSelf}
            />
          </>

        ) : (

          <div className="text-xs text-gray-500">
            {member.role}
          </div>

        )}

      </div>

    </div>

  );
}

/* ---------------- ROLE SELECTOR ---------------- */

function RoleSelector({
  memberId,
  currentRole,
  disabled,
}: {
  memberId: string;
  currentRole: string;
  disabled: boolean;
}) {

  async function changeRole(role: string) {

    await fetch("/api/company/member", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "role",
        memberId,
        role,
      }),
    });

    window.location.reload();
  }

  return (

    <select
      disabled={disabled}
      defaultValue={currentRole}
      onChange={(e) => changeRole(e.target.value)}
      className="border rounded px-2 py-1 text-sm"
    >
      <option value="viewer">viewer</option>
      <option value="member">member</option>
      <option value="admin">admin</option>
    </select>

  );
}

/* ---------------- REMOVE BUTTON ---------------- */

function RemoveButton({
  memberId,
  disabled,
}: {
  memberId: string;
  disabled: boolean;
}) {

  async function remove() {

    if (!confirm("Remove this member?")) return;

    await fetch("/api/company/member", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "remove",
        memberId,
      }),
    });

    window.location.reload();
  }

  return (
    <button
      disabled={disabled}
      onClick={remove}
      className="text-red-600 text-sm"
    >
      Remove
    </button>
  );
}
