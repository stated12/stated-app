import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface Props {
  params: {
    username: string;
  };
}

export default async function ProfilePage({ params }: Props) {
  const supabase = createClient();

  const username = params.username?.toLowerCase().trim();

  if (!username) {
    notFound();
  }

  const { data: account, error } = await supabase
    .from("accounts")
    .select(`
      username,
      name,
      bio,
      logo_url,
      website_url,
      twitter_url,
      linkedin_url,
      credits_remaining,
      account_type,
      created_at
    `)
    .ilike("username", username)
    .single();

  if (error || !account) {
    console.log("Profile fetch error:", error);
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* STATED BRAND HEADER */}
      <header className="border-b px-6 py-4">
        <a href="/" className="text-xl font-bold text-blue-600">
          Stated
        </a>
      </header>

      {/* PROFILE CONTENT */}
      <section className="max-w-2xl mx-auto px-6 py-10">

        {/* LOGO */}
        {account.logo_url && (
          <img
            src={account.logo_url}
            alt={account.username}
            className="w-24 h-24 rounded-full mb-4 object-cover"
          />
        )}

        {/* NAME */}
        <h1 className="text-2xl font-bold">
          {account.name || account.username}
        </h1>

        {/* USERNAME */}
        <p className="text-gray-500 mb-4">
          stated.app/u/{account.username}
        </p>

        {/* BIO */}
        {account.bio && (
          <p className="mb-6 text-gray-800 whitespace-pre-wrap">
            {account.bio}
          </p>
        )}

        {/* LINKS */}
        <div className="flex flex-wrap gap-4 mb-8">

          {account.website_url && (
            <a
              href={account.website_url}
              target="_blank"
              className="text-blue-600 underline"
            >
              Website
            </a>
          )}

          {account.twitter_url && (
            <a
              href={account.twitter_url}
              target="_blank"
              className="text-blue-600 underline"
            >
              Twitter
            </a>
          )}

          {account.linkedin_url && (
            <a
              href={account.linkedin_url}
              target="_blank"
              className="text-blue-600 underline"
            >
              LinkedIn
            </a>
          )}

        </div>

        {/* META */}
        <div className="text-sm text-gray-400 space-y-1">

          <p>
            Account type: {account.account_type || "individual"}
          </p>

          <p>
            Credits remaining: {account.credits_remaining ?? 0}
          </p>

          {account.created_at && (
            <p>
              Joined {new Date(account.created_at).toLocaleDateString()}
            </p>
          )}

        </div>

      </section>

    </main>
  );
}
