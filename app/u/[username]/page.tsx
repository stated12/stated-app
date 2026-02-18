import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";

type Props = {
  params: {
    username: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = createClient();

  const { data: account } = await supabase
    .from("accounts")
    .select("username, name, bio")
    .eq("username", params.username)
    .single();

  if (!account) {
    return {
      title: "Profile not found — Stated",
      description: "This profile does not exist on Stated.",
    };
  }

  const name = account.name || account.username;
  const bio =
    account.bio?.slice(0, 150) ||
    "View public commitments and accountability profile on Stated.";

  return {
    title: `${name} (@${account.username}) — Stated`,
    description: bio,
    openGraph: {
      title: `${name} (@${account.username}) — Stated`,
      description: bio,
      url: `https://stated.app/u/${account.username}`,
      type: "profile",
    },
  };
}

export default async function PublicProfile({ params }: Props) {
  const supabase = createClient();

  // Fetch account
  const { data: account } = await supabase
    .from("accounts")
    .select("*")
    .eq("username", params.username)
    .single();

  if (!account) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">User not found</h1>
          <p className="text-gray-500">
            This profile does not exist.
          </p>
        </div>
      </main>
    );
  }

  // Fetch commitments
  const { data: commitments } = await supabase
    .from("commitments")
    .select("*")
    .eq("account_id", account.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 flex justify-center">
      <div className="w-full max-w-2xl">

        {/* Logo */}
        <div className="text-center mb-6">
          <a href="/" className="text-2xl font-bold text-blue-600">
            Stated
          </a>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">

          <h1 className="text-2xl font-bold">
            {account.name || account.username}
          </h1>

          <p className="text-gray-500 mb-3">
            @{account.username}
          </p>

          {account.bio && (
            <p className="text-gray-700 mb-4">
              {account.bio}
            </p>
          )}

        </div>

        {/* Commitments */}
        <div className="bg-white rounded-xl shadow-sm border p-6">

          <h2 className="text-lg font-semibold mb-4">
            Commitments
          </h2>

          {!commitments || commitments.length === 0 ? (
            <p className="text-gray-500">
              No commitments yet.
            </p>
          ) : (
            <div className="space-y-3">
              {commitments.map((c) => (
                <div
                  key={c.id}
                  className="border rounded-lg p-4"
                >
                  <p className="font-medium">
                    {c.text}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {c.status || "Active"}
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
