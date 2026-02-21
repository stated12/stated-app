import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";

export default async function ExplorePage() {

  const supabase = await createClient();

  // TRENDING COMMITMENTS (most viewed)
  const { data: trending } = await supabase
    .from("commitments")
    .select("*")
    .eq("status", "active")
    .order("view_count", { ascending: false })
    .limit(6);

  // RECENT COMMITMENTS
  const { data: recent } = await supabase
    .from("commitments")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(6);

  // FEATURED PEOPLE
  const { data: people } = await supabase
    .from("profiles")
    .select("*")
    .eq("account_type", "individual")
    .limit(4);

  // FEATURED COMPANIES
  const { data: companies } = await supabase
    .from("profiles")
    .select("*")
    .eq("account_type", "company")
    .limit(4);

  return (

    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

        {/* HEADER */}
        <div className="flex justify-between items-center">

          <h1 className="text-3xl font-bold">
            Explore
          </h1>

          <Link
            href="/"
            className="text-blue-600"
          >
            Home
          </Link>

        </div>


        {/* TRENDING */}
        <section>

          <h2 className="text-xl font-semibold mb-4">
            Trending commitments
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {trending?.map((c) => (

              <Link
                key={c.id}
                href={`/u/${c.username}`}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
              >

                <div className="font-medium">
                  {c.text}
                </div>

                <div className="text-sm text-gray-500 mt-1">
                  {c.category}
                </div>

              </Link>

            ))}

          </div>

        </section>


        {/* RECENT */}
        <section>

          <h2 className="text-xl font-semibold mb-4">
            Recent commitments
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {recent?.map((c) => (

              <Link
                key={c.id}
                href={`/u/${c.username}`}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
              >

                <div className="font-medium">
                  {c.text}
                </div>

                <div className="text-sm text-gray-500 mt-1">
                  {c.category}
                </div>

              </Link>

            ))}

          </div>

        </section>


        {/* FEATURED PEOPLE */}
        <section>

          <h2 className="text-xl font-semibold mb-4">
            Featured people
          </h2>

          <div className="grid md:grid-cols-4 gap-4">

            {people?.map((p) => {

              const avatar =
                p.avatar_url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  p.display_name || p.username
                )}`;

              return (

                <Link
                  key={p.id}
                  href={`/u/${p.username}`}
                  className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition"
                >

                  <Image
                    src={avatar}
                    width={60}
                    height={60}
                    alt="avatar"
                    className="rounded-full mx-auto"
                  />

                  <div className="mt-2 font-medium">
                    {p.display_name || p.username}
                  </div>

                </Link>

              );

            })}

          </div>

        </section>


        {/* FEATURED COMPANIES */}
        <section>

          <h2 className="text-xl font-semibold mb-4">
            Featured companies
          </h2>

          <div className="grid md:grid-cols-4 gap-4">

            {companies?.map((p) => {

              const avatar =
                p.avatar_url ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  p.display_name || p.username
                )}`;

              return (

                <Link
                  key={p.id}
                  href={`/u/${p.username}`}
                  className="bg-white p-4 rounded-xl shadow text-center hover:shadow-md transition"
                >

                  <Image
                    src={avatar}
                    width={60}
                    height={60}
                    alt="avatar"
                    className="rounded-full mx-auto"
                  />

                  <div className="mt-2 font-medium">
                    {p.display_name || p.username}
                  </div>

                </Link>

              );

            })}

          </div>

        </section>


      </div>

    </div>

  );

}
