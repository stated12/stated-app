import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const supabase = await createClient();
  const query = searchParams.q?.trim();

  let commitments = [];
  let profiles = [];

  if (query) {
    const { data: c } = await supabase
      .from("commitments")
      .select(
        `
        id,
        text,
        profiles (
          username,
          display_name,
          avatar_url
        )
      `
      )
      .ilike("text", `%${query}%`)
      .eq("visibility", "public");

    commitments = c || [];

    const { data: p } = await supabase
      .from("profiles")
      .select("username, display_name, avatar_url")
      .or(
        `username.ilike.%${query}%,display_name.ilike.%${query}%`
      );

    profiles = p || [];
  } else {
    const { data: c } = await supabase
      .from("commitments")
      .select(
        `
        id,
        text,
        profiles (
          username,
          display_name,
          avatar_url
        )
      `
      )
      .eq("visibility", "public")
      .order("created_at", { ascending: false })
      .limit(8);

    commitments = c || [];
  }

  return (
    <div className="min-h-screen bg-white text-black px-6 py-10">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl font-semibold mb-6">
          {query ? `Results for "${query}"` : "Explore"}
        </h1>

        {/* PROFILES */}
        {profiles.length > 0 && (
          <>
            <h2 className="font-semibold mb-3">People & Companies</h2>
            <div className="space-y-4 mb-8">
              {profiles.map((p: any) => (
                <Link
                  key={p.username}
                  href={`/u/${p.username}`}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <Image
                    src={
                      p.avatar_url ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        p.display_name || "User"
                      )}`
                    }
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>{p.display_name}</div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* COMMITMENTS */}
        <h2 className="font-semibold mb-3">Commitments</h2>
        <div className="space-y-4">
          {commitments.map((c: any) => (
            <Link
              key={c.id}
              href={`/u/${c.profiles?.username}`}
              className="block p-4 bg-gray-50 rounded-lg"
            >
              <div className="font-medium">
                {c.profiles?.display_name}
              </div>
              <div className="text-gray-700">{c.text}</div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
