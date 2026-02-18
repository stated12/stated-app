import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface Props {
  params: {
    username: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const supabase = createClient();

  const { data } = await supabase
    .from("accounts")
    .select("name, bio, username")
    .eq("username", params.username)
    .single();

  if (!data) {
    return {
      title: "Profile not found | Stated",
    };
  }

  const title = `${data.name || data.username} (@${data.username}) | Stated`;

  const description =
    data.bio?.substring(0, 150) ||
    "View public commitments and accountability profile on Stated.";

  return {
    title,
    description,
  };
}

export default async function PublicProfile({ params }: Props) {
  const supabase = createClient();

  const { data: account, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("username", params.username)
    .single();

  if (error || !account) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10 max-w-2xl mx-auto">

      {/* Logo */}
      <div className="text-2xl font-bold mb-8">
        Stated
      </div>

      {/* Profile card */}
      <div className="border rounded-xl p-6">

        <h1 className="text-2xl font-semibold">
          {account.name || account.username}
        </h1>

        <p className="text-gray-500 mb-4">
          @{account.username}
        </p>

        {account.bio && (
          <p className="mb-6">
            {account.bio}
          </p>
        )}

        {/* Website */}
        {account.website && (
          <a
            href={account.website}
            target="_blank"
            className="text-blue-600 block mb-2"
          >
            Website
          </a>
        )}

        {/* Social links */}
        {account.twitter && (
          <a
            href={account.twitter}
            target="_blank"
            className="text-blue-600 block"
          >
            Twitter
          </a>
        )}

      </div>

    </div>
  );
}
