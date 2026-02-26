export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function CompanyDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: company } = await supabase
    .from("companies")
    .select("*")
    .eq("owner_id", user.id)
    .single();

  if (!company) {
    redirect("/dashboard");
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      <div>
        <h1 className="text-2xl font-bold">
          {company.name}
        </h1>
        <div className="text-sm text-gray-500">
          @{company.username}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Link
          href={`/c/${company.username}`}
          className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
        >
          <div className="font-medium mb-1">
            Public Page
          </div>
          <div className="text-sm text-gray-500">
            View your company profile
          </div>
        </Link>

        <Link
          href="/dashboard/company/insights"
          className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
        >
          <div className="font-medium mb-1">
            Company Analytics
          </div>
          <div className="text-sm text-gray-500">
            View performance and engagement
          </div>
        </Link>

        <Link
          href="/dashboard/company/settings"
          className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
        >
          <div className="font-medium mb-1">
            Company Settings
          </div>
          <div className="text-sm text-gray-500">
            Edit details and manage identity
          </div>
        </Link>

      </div>

    </div>
  );
}
