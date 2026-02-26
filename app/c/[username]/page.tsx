export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import ImpressionTracker from "@/components/ImpressionTracker";
import ReputationCard from "@/components/ReputationCard";

export default async function CompanyPublicPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = await createClient();

  const { data: company } = await supabase
    .from("companies")
    .select("*")
    .eq("username", params.username)
    .single();

  if (!company) return notFound();

  const { data: commitments } = await supabase
    .from("commitments")
    .select("*")
    .eq("company_id", company.id)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  const commitmentIds = commitments?.map((c) => c.id) || [];

  const logo =
    company.logo_url?.trim()
      ? company.logo_url.trim()
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          company.name
        )}&background=2563eb&color=fff`;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-8">

        <ImpressionTracker commitmentIds={commitmentIds} />

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center gap-4">
            <Image
              src={logo}
              alt="company"
              width={80}
              height={80}
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

              {company.description && (
                <div className="text-sm text-gray-600 mt-2">
                  {company.description}
                </div>
              )}
            </div>
          </div>
        </div>

        <ReputationCard companyId={company.id} />

        <div className="space-y-4">
          {commitments?.length === 0 && (
            <div className="text-sm text-gray-500">
              No active commitments.
            </div>
          )}

          {commitments?.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl shadow p-5"
            >
              <div className="text-base mb-3">
                {c.text}
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <div>
                  {new Date(c.created_at).toLocaleDateString()}
                </div>
                <div>
                  {c.views || 0} views
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
