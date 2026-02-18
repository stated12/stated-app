import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createClient();

  const { data: account, error } = await supabase
    .from("accounts")
    .select(`
      username,
      name,
      bio,
      website_url,
      twitter_url,
      linkedin_url,
      logo_url,
      account_type,
      created_at
    `)
    .eq("username", params.username)
    .maybeSingle();

  if (!account || error) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10">
      {/* Stated branding */}
      <div className="max-w-2xl mx-auto">

        <div className="mb-6">
          <a
            href="/"
            className="text-2xl font-bold text-blue-600"
          >
            Stated
          </a>
        </div>

        {/* Profile Card */}
        <div className="border rounded-xl p-6 shadow-sm">

          {/* Logo */}
          {account.logo_url && (
            <img
              src={account.logo_url}
              alt="Logo"
              className="w-16 h-16 rounded-lg mb-4"
            />
          )}

          {/* Name */}
          <h1 className="text-2xl font-semibold">
            {account.name || account.username}
          </h1>

          {/* Username */}
          <p className="text-gray-500 mb-3">
            @{account.username}
          </p>

          {/* Bio */}
          {account.bio && (
            <p className="mb-4 text-gray-800">
              {account.bio}
            </p>
          )}

          {/* Links */}
          <div className="flex flex-col gap-2">

            {account.website_url && (
              <a
                href={account.website_url}
                target="_blank"
                className="text-blue-600"
              >
                Website
              </a>
            )}

            {account.linkedin_url && (
              <a
                href={account.linkedin_url}
                target="_blank"
                className="text-blue-600"
              >
                LinkedIn
              </a>
            )}

            {account.twitter_url && (
              <a
                href={account.twitter_url}
                target="_blank"
                className="text-blue-600"
              >
                Twitter
              </a>
            )}

          </div>

        </div>

      </div>
    </main>
  );
}
