import { createServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface Props {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const supabase = createServerClient();

  const { data } = await supabase
    .from("accounts")
    .select("username, name, bio")
    .eq("username", params.username)
    .maybeSingle();

  if (!data) {
    return {
      title: "Profile not found | Stated",
      description: "Public accountability profiles on Stated",
    };
  }

  const displayName = data.name || data.username;

  return {
    title: `${displayName} | Stated`,
    description:
      data.bio?.substring(0, 150) ||
      `${displayName}'s public accountability profile on Stated`,
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("accounts")
    .select(`
      username,
      name,
      bio,
      website_url,
      linkedin_url,
      twitter_url,
      logo_url,
      account_type
    `)
    .eq("username", params.username)
    .maybeSingle();

  if (error) {
    console.error(error);
  }

  if (!data) {
    notFound();
  }

  const displayName = data.name || data.username;

  return (
    <div className="min-h-screen bg-white">

      {/* Header */}
      <div className="border-b p-4">
        <div className="max-w-3xl mx-auto">
          <a href="/" className="text-2xl font-bold text-blue-600">
            Stated
          </a>
        </div>
      </div>

      {/* Profile */}
      <div className="max-w-3xl mx-auto p-6">

        {/* Name */}
        <h1 className="text-3xl font-bold mb-2">
          {displayName}
        </h1>

        {/* Username */}
        <div className="text-gray-500 mb-4">
          stated.app/u/{data.username}
        </div>

        {/* Bio */}
        {data.bio && (
          <p className="mb-6 text-gray-800 whitespace-pre-line">
            {data.bio}
          </p>
        )}

        {/* Links */}
        <div className="space-y-2">

          {data.website_url && (
            <div>
              <a
                href={data.website_url}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Website
              </a>
            </div>
          )}

          {data.linkedin_url && (
            <div>
              <a
                href={data.linkedin_url}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            </div>
          )}

          {data.twitter_url && (
            <div>
              <a
                href={data.twitter_url}
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Twitter
              </a>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
