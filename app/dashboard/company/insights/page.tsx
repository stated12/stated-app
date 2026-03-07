export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function CompanyInsightsPage() {

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

  /* ---------------- COMPANY ---------------- */

  const { data: company } = await supabase
    .from("companies")
    .select("id, name, username")
    .eq("id", membership.company_id)
    .single();

  if (!company) redirect("/dashboard");

  /* ---------------- COMMITMENTS ---------------- */

  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, status, views")
    .eq("company_id", company.id);

  const total = commitments?.length ?? 0;

  const active =
    commitments?.filter(
      (c) => c.status === "active"
    ).length ?? 0;

  const completed =
    commitments?.filter(
      (c) => c.status === "completed"
    ).length ?? 0;

  const paused =
    commitments?.filter(
      (c) =>
        c.status === "paused" ||
        c.status === "withdrawn"
    ).length ?? 0;

  const totalViews =
    commitments?.reduce(
      (sum, c) => sum + (c.views ?? 0),
      0
    ) ?? 0;

  const topCommitment =
    commitments
      ?.sort(
        (a, b) =>
          (b.views ?? 0) - (a.views ?? 0)
      )[0] ?? null;

  /* ---------------- PAGE ---------------- */

  return (

    <div className="max-w-4xl mx-auto space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-2xl font-bold">
          {company.name} Insights
        </h1>

        <div className="text-sm text-gray-500">
          @{company.username}
        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <StatCard
          title="Total Commitments"
          value={total}
        />

        <StatCard
          title="Active"
          value={active}
        />

        <StatCard
          title="Completed"
          value={completed}
        />

        <StatCard
          title="Paused / Withdrawn"
          value={paused}
        />

      </div>

      {/* TOTAL VIEWS */}

      <div className="bg-white rounded-xl shadow p-5">

        <div className="text-sm text-gray-500 mb-2">
          Total Views
        </div>

        <div className="text-2xl font-bold">
          {totalViews}
        </div>

      </div>

      {/* TOP COMMITMENT */}

      {topCommitment && (

        <div className="bg-white rounded-xl shadow p-5">

          <div className="text-sm text-gray-500 mb-2">
            Top Commitment
          </div>

          <div className="font-medium mb-1">
            {topCommitment.text}
          </div>

          <div className="text-sm text-gray-500">
            {topCommitment.views ?? 0} views
          </div>

        </div>

      )}

      {/* PUBLIC PAGE */}

      <Link
        href={`/c/${company.username}`}
        className="text-blue-600 text-sm hover:underline"
      >
        View Public Company Page →
      </Link>

    </div>

  );
}

/* ---------------- STAT CARD ---------------- */

function StatCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {

  return (

    <div className="bg-white rounded-xl shadow p-4">

      <div className="text-sm text-gray-500">
        {title}
      </div>

      <div className="text-xl font-semibold">
        {value}
      </div>

    </div>

  );
}
