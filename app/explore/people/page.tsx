"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

type Person = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
};

export default function PeoplePage() {

  const supabase = createClient();

  const [people,setPeople] = useState<Person[]>([]);
  const [metrics,setMetrics] = useState<any>({});
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    loadPeople();
  },[]);

  async function loadPeople(){

    const {data:profiles} = await supabase
      .from("profiles")
      .select("id,username,display_name,avatar_url,bio")
      .order("created_at",{ascending:false})
      .limit(30);

    if(!profiles){
      setLoading(false);
      return;
    }

    setPeople(profiles);

    /* LOAD METRICS */

    const stats:any = {};

    for(const p of profiles){

      /* commitments */

      const {count:commitmentsCount} =
      await supabase
      .from("commitments")
      .select("*",{count:"exact",head:true})
      .eq("user_id",p.id);

      /* views */

      const {data:commitmentIds} =
      await supabase
      .from("commitments")
      .select("id")
      .eq("user_id",p.id);

      let views = 0;
      let shares = 0;

      if(commitmentIds && commitmentIds.length > 0){

        const ids = commitmentIds.map(c=>c.id);

        const {count:viewCount} =
        await supabase
        .from("commitment_views")
        .select("*",{count:"exact",head:true})
        .in("commitment_id",ids);

        const {count:shareCount} =
        await supabase
        .from("commitment_shares")
        .select("*",{count:"exact",head:true})
        .in("commitment_id",ids);

        views = viewCount || 0;
        shares = shareCount || 0;

      }

      stats[p.id] = {
        commitments:commitmentsCount || 0,
        views,
        shares
      };

    }

    setMetrics(stats);
    setLoading(false);

  }

  function avatar(p:Person){

    if(p.avatar_url) return p.avatar_url;

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      p.display_name || p.username
    )}&background=2563eb&color=fff`;

  }

  if(loading){

    return(
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          Loading people...
        </div>
      </div>
    );

  }

  return(

    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="max-w-3xl mx-auto space-y-4">

        <h1 className="text-2xl font-bold">
          People
        </h1>

        {people.map(p=>{

          const m = metrics[p.id] || {};

          return(

            <Link
              key={p.id}
              href={`/u/${p.username}`}
              className="bg-white rounded-xl shadow p-4 flex gap-4 hover:shadow-md transition"
            >

              <img
                src={avatar(p)}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex-1">

                <div className="font-medium">
                  {p.display_name || p.username}
                </div>

                <div className="text-sm text-gray-500">
                  @{p.username}
                </div>

                {/* BIO */}

                <div className="text-sm text-gray-600 mt-1 line-clamp-2">

                  {p.bio
                    ? p.bio
                    : "No bio yet"}

                </div>

                {/* METRICS */}

                <div className="text-xs text-gray-400 mt-2">

                  {m.commitments || 0} commitments •
                  {" "}
                  {m.views || 0} views •
                  {" "}
                  {m.shares || 0} shares

                </div>

              </div>

            </Link>

          )

        })}

      </div>

    </div>

  );

}
