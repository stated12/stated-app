"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function ExplorePage() {

  const supabase = createClient();

  const [people, setPeople] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [commitments, setCommitments] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExplore();
  }, []);

  async function loadExplore() {

    try {

      // FEATURED PEOPLE
      const { data: peopleData } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("account_type", "individual")
          .order("created_at", { ascending: false })
          .limit(4);

      setPeople(peopleData || []);


      // FEATURED COMPANIES
      const { data: companyData } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("account_type", "company")
          .order("created_at", { ascending: false })
          .limit(4);

      setCompanies(companyData || []);


      // TRENDING COMMITMENTS
      const { data: commitmentsData } =
        await supabase
          .from("commitments")
          .select(`
            *,
            profiles (
              username,
              display_name,
              avatar_url
            )
          `)
          .eq("status", "active")
          .order("created_at", { ascending: false })
          .limit(10);

      setCommitments(commitmentsData || []);

    } catch {}

    setLoading(false);

  }


  function avatar(profile: any) {

    if (profile?.avatar_url)
      return profile.avatar_url;

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile?.display_name || "User"
    )}&background=2563eb&color=fff`;

  }


  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading explore...
      </div>
    );


  return (

    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="max-w-5xl mx-auto space-y-10">


        {/* HEADER */}
        <Link href="/">
          <div className="text-2xl font-bold text-blue-600">
            Stated
          </div>
        </Link>


        {/* FEATURED PEOPLE */}
        <div>

          <div className="text-lg font-semibold mb-4">
            Featured people
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {people.map((person) => (

              <Link
                key={person.id}
                href={`/u/${person.username}`}
                className="bg-white p-4 rounded-xl shadow text-center"
              >

                <img
                  src={avatar(person)}
                  className="w-14 h-14 rounded-full mx-auto mb-2"
                />

                <div className="font-medium">
                  {person.display_name}
                </div>

                <div className="text-sm text-gray-500">
                  @{person.username}
                </div>

              </Link>

            ))}

          </div>

        </div>


        {/* FEATURED COMPANIES */}
        <div>

          <div className="text-lg font-semibold mb-4">
            Featured companies
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {companies.map((company) => (

              <Link
                key={company.id}
                href={`/u/${company.username}`}
                className="bg-white p-4 rounded-xl shadow text-center"
              >

                <img
                  src={avatar(company)}
                  className="w-14 h-14 rounded-full mx-auto mb-2"
                />

                <div className="font-medium">
                  {company.display_name}
                </div>

                <div className="text-sm text-gray-500">
                  @{company.username}
                </div>

              </Link>

            ))}

          </div>

        </div>


        {/* TRENDING COMMITMENTS */}
        <div>

          <div className="text-lg font-semibold mb-4">
            Trending commitments
          </div>

          <div className="space-y-4">

            {commitments.map((commitment) => {

              const profile = commitment.profiles;

              return (

                <Link
                  key={commitment.id}
                  href={`/commitment/${commitment.id}`}
                  className="block bg-white p-5 rounded-xl shadow"
                >

                  <div className="flex items-center gap-3 mb-2">

                    <img
                      src={avatar(profile)}
                      className="w-8 h-8 rounded-full"
                    />

                    <div className="text-sm font-medium">
                      {profile?.display_name}
                    </div>

                    <div className="text-xs text-gray-500">
                      @{profile?.username}
                    </div>

                  </div>

                  <div className="font-medium">
                    {commitment.text}
                  </div>

                  <div className="text-sm text-gray-500 mt-1 capitalize">
                    Status: {commitment.status}
                  </div>

                </Link>

              );

            })}

          </div>

        </div>


      </div>

    </div>

  );

}
