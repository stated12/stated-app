export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function CompanySettingsPage({
  searchParams,
}: {
  searchParams?: { success?: string };
}) {
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

  if (!company) redirect("/dashboard/company/new");

  async function updateCompany(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const description = formData.get("description") as string;
    const avatar_url = formData.get("avatar_url") as string;

    const supabase = await createClient();

    await supabase
      .from("companies")
      .update({
        name: name.trim(),
        username: username.trim().toLowerCase(),
        description: description.trim(),
        avatar_url: avatar_url?.trim() || null,
      })
      .eq("id", company.id);

    redirect("/dashboard/company/settings?success=Updated");
  }

  async function deleteCompany() {
    "use server";

    const supabase = await createClient();

    await supabase
      .from("company_members")
      .delete()
      .eq("company_id", company.id);

    await supabase
      .from("companies")
      .delete()
      .eq("id", company.id);

    redirect("/dashboard");
  }

  const logo =
    company.avatar_url?.trim()
      ? company.avatar_url.trim()
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          company.name
        )}&background=2563eb&color=fff`;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-xl mx-auto space-y-8">

        <h1 className="text-2xl font-bold">Company Settings</h1>

        {searchParams?.success && (
          <div className="bg-green-100 text-green-700 text-sm p-3 rounded-lg">
            Company updated successfully
          </div>
        )}

        <div className="flex justify-center">
          <Image
            src={logo}
            alt="company logo"
            width={96}
            height={96}
            className="rounded-full"
          />
        </div>

        <form action={updateCompany} className="bg-white rounded-xl shadow p-6 space-y-4">

          <input
            type="text"
            name="name"
            defaultValue={company.name}
            placeholder="Company Name"
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <input
            type="text"
            name="username"
            defaultValue={company.username}
            placeholder="Company Username"
            className="w-full border rounded-lg px-3 py-2"
            required
          />

          <textarea
            name="description"
            defaultValue={company.description}
            placeholder="Company Description"
            rows={4}
            className="w-full border rounded-lg px-3 py-2"
          />

          <input
            type="text"
            name="avatar_url"
            defaultValue={company.avatar_url || ""}
            placeholder="Logo Image URL"
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Save Changes
          </button>
        </form>

        <form action={deleteCompany}>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg"
          >
            Delete Company
          </button>
        </form>

        <Link href="/dashboard/company" className="text-sm text-blue-600">
          ← Back to Company Dashboard
        </Link>

      </div>
    </div>
  );
}
