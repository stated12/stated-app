import { createClient } from "@/lib/supabase/client";
import { notFound } from "next/navigation";

interface Props {
  params: {
    username: string;
  };
}

/* =========================
   SEO METADATA
========================= */

export async function generateMetadata({ params }: Props) {
  const supabase = createClient();

  const { data: account } = await supabase
    .from("accounts")
    .select("name, bio, username")
    .eq("username", params.username)
    .single();

  if (!account) {
    return {
      title: "Profile not found | Stated",
      description: "This profile does not exist on Stated.",
    };
  }

  const title = account.name
    ? `${account.name} (@${account.username}) | Stated`
    : `@${account.username} | Stated`;

  const description =
    account.bio?.slice(0, 150) ||
    `Public commitments and accountability profile of @${account.username} on Stated.`;

  return {
    title,
    description,
  };
}

/* =========================
   PAGE
========================= */

export default async function PublicProfilePage({ params }: Props) {
  const supabase = createClient();

  /* Fetch account */
  const { data: account } = await supabase
    .from("accounts")
    .select(`
      id,
      username,
      name,
      bio,
      logo_url,
      website_url,
      twitter_url,
      linkedin_url,
      account_type
    `)
    .eq("username", params.username)
    .single();

  if (!account) {
    notFound();
  }

  /* Fetch commitments */
  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, title, status, created_at")
    .eq("account_id", account.id)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-white">

      {/* =========================
          HEADER (Stated branding)
      ========================= */}

      <div className="border-b bg-white">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <a
            href="/"
            className="text-2xl font-bold text-blue-600"
          >
            Stated
          </a>
        </div>
      </div>

      {/* =========================
          PROFILE CONTENT
      ========================= */}

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Identity */}
        <div className="flex items-center gap-4 mb-6">

          {account.logo_url ? (
            <img
              src={account.logo_url}
              className="w-16 h-16 rounded-full object-cover"
              alt="logo"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl">
              {account.name?.charAt(0) || account.username.charAt(0)}
            </div>
          )}

          <div>
            <div className="text-xl font-semibold">
              {account.name || account.username}
            </div>

            <div className="text-gray-500">
              @{account.username}
            </div>

            <div className="text-sm text-gray-400 capitalize">
              {account.account_type}
            </div>
          </div>

        </div>

        {/* Bio */}
        {account.bio && (
          <div className="mb-6 text-gray-700">
            {account.bio}
          </div>
        )}

        {/* Links */}
        {(account.website_url ||
          account.linkedin_url ||
          account.twitter_url) && (
          <div className="mb-8 space-y-2">

            {account.website_url && (
              <a
                href={account.website_url}
                target="_blank"
                className="block text-blue-600 hover:underline"
              >
                Website
              </a>
            )}

            {account.linkedin_url && (
              <a
                href={account.linkedin_url}
                target="_blank"
                className="block text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            )}

            {account.twitter_url && (
              <a
                href={account.twitter_url}
                target="_blank"
                className="block text-blue-600 hover:underline"
              >
                Twitter
              </a>
            )}

          </div>
        )}

        {/* Commitments */}
        <div>

          <h2 className="text-lg font-semibold mb-4">
            Commitments
          </h2>

          {!commitments || commitments.length === 0 ? (
            <div className="text-gray-500">
              No commitments yet.
            </div>
          ) : (
            <div className="space-y-3">

              {commitments.map((c) => (
                <div
                  key={c.id}
                  className="border rounded-lg p-4"
                >

                  <div className="font-medium">
                    {c.title}
                  </div>

                  <div className="text-sm text-gray-500 mt-1">
                    {c.status}
                  </div>

                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(c.created_at).toLocaleDateString()}
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

        {/* Footer identity */}
        <div className="mt-12 text-sm text-gray-400">
          stated.app/u/{account.username}
        </div>

      </div>

    </div>
  );
}
