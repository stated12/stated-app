export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getSafeAvatar } from "@/lib/avatar";

export default async function HomePage() {

  const supabase = await createClient();

  let commitments: any[] = [];
  let profilesMap: any = {};
  let companiesMap: any = {};

  try {
    const { data } = await supabase
      .from("commitments")
      .select("id, text, user_id, company_id, created_at")
      .eq("status", "active")
      .eq("visibility", "public")
      .order("created_at", { ascending: false })
      .limit(6);

    commitments = data || [];

    const userIds = commitments.map(c => c.user_id).filter(Boolean);
    const companyIds = commitments.map(c => c.company_id).filter(Boolean);

    if (userIds.length) {
      const { data } = await supabase
        .from("profiles")
        .select("id, username, display_name, avatar_url")
        .in("id", userIds);

      data?.forEach(p => profilesMap[p.id] = p);
    }

    if (companyIds.length) {
      const { data } = await supabase
        .from("companies")
        .select("id, username, name, logo_url")
        .in("id", companyIds);

      data?.forEach(c => companiesMap[c.id] = c);
    }

  } catch {
    commitments = [];
  }

  return (
    <div className="min-h-screen flex flex-col">

      {/* HERO */}
      <section className="relative text-white text-center px-6 pt-36 pb-32">

        <Image src="/hero-desktop.png" alt="" fill className="object-cover -z-20 hidden md:block"/>
        <Image src="/hero-mobile.png" alt="" fill className="object-cover -z-20 md:hidden"/>

        <div className="absolute inset-0 bg-black/40 -z-10" />

        <h1 className="text-4xl md:text-6xl font-bold">
          Say it publicly.<br />Do it publicly.
        </h1>

        <Link href="/signup" className="mt-10 inline-block bg-blue-600 px-10 py-4 rounded-xl">
          Start with 5 Free Commitments
        </Link>

      </section>

      {/* FEED */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-5xl mx-auto">

          <h2 className="text-3xl font-bold mb-10 text-center">
            Commitments from people & companies
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {commitments.map((c) => {

              const profile = profilesMap[c.user_id];
              const company = companiesMap[c.company_id];

              const name =
                company?.name ||
                profile?.display_name ||
                profile?.username ||
                "User";

              const avatar = getSafeAvatar({
                display_name: name,
                avatar_url: company?.logo_url || profile?.avatar_url,
              });

              return (
                <Link key={c.id} href={`/commitment/${c.id}`}>

                  <div className="bg-gray-50 p-6 rounded-xl">

                    <div className="flex gap-3">

                      <img
                        src={avatar}
                        className="w-12 h-12 rounded-full"
                      />

                      <div>
                        <div className="font-semibold">{name}</div>
                        <div>{c.text}</div>
                      </div>

                    </div>

                  </div>

                </Link>
              );
            })}

          </div>

          <div className="text-center mt-10">
            <Link href="/explore" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
              Explore commitments from people & companies
            </Link>
          </div>

        </div>
      </section>

      {/* WHY */}
      <section className="bg-gray-50 py-20 text-center">
        <h2 className="text-3xl font-bold">
          Most platforms reward <span className="text-orange-500 italic">performance.</span><br />
          We reward follow-through.
        </h2>
      </section>

      {/* FINAL */}
      <section className="bg-gray-950 text-white py-24 text-center">
        <Link href="/signup" className="bg-blue-600 px-8 py-4 rounded-xl">
          Commit publicly →
        </Link>

        <p className="mt-4 text-sm text-gray-400">
          Free to start. No credit card required.
        </p>
      </section>

    </div>
  );
}
