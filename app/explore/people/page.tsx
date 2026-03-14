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

const PAGE_SIZE = 10;

export default function PeoplePage() {

  const supabase = createClient();

  const [people,setPeople] = useState<Person[]>([]);
  const [metrics,setMetrics] = useState<any>({});
  const [page,setPage] = useState(0);
  const [loading,setLoading] = useState(true);
  const [loadingMore,setLoadingMore] = useState(false);

  useEffect(()=>{
    loadPeople();
  },[]);

  async function loadPeople(){

    setLoading(true);

    const {data:profiles,error} = await supabase
      .from("profiles")
      .select("id,username,display_name,avatar_url,bio")
      .order("created_at",{ascending:false})
      .range(0,PAGE_SIZE-1);

    if(error){
      console.error(error);
      setLoading(false);
      return;
    }

    setPeople(profiles || []);
    await loadMetrics(profiles || []);

    setPage(1);
    setLoading(false);

  }

  async function loadMore(){

    setLoadingMore(true);

    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE - 1;

    const {data:profiles} = await supabase
      .from("profiles")
      .select("id,username,display_name,avatar_url,bio")
      .order("created_at",{ascending:false})
      .range(start,end);

    if(profiles && profiles.length>0){

      setPeople(prev=>[...prev,...profiles]);
      await loadMetrics(profiles);

      setPage(prev=>prev+1);

    }

    setLoadingMore(false);

  }

  async function loadMetrics(profiles:Person[]){

    const stats:any = {...metrics};

    for(const p of profiles){

      const {count:commitments} = await supabase
      .from("commitments")
      .select("*",{count:"exact",head:true})
      .eq("user_id",p.id);

      const {data:ids} = await supabase
      .from("commitments")
      .select("id")
      .eq("user_id",p.id);

      let views = 0;
      let shares = 0;

      if(ids && ids.length>0){

        const commitmentIds = ids.map(c=>c.id);

        const {count:viewCount} = await supabase
        .from("commitment_views")
        .select("*",{count:"exact",head:true})
        .in("commitment_id",commitmentIds);

        const {count:shareCount} = await supabase
        .from("commitment_shares")
        .select("*",{count:"exact",head:true})
        .in("commitment_id",commitmentIds);

        views = viewCount || 0;
        shares = shareCount || 0;

      }

      stats[p.id] = {
        commitments: commitments || 0,
        views,
        shares
      };

    }

    setMetrics(stats);

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

                <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {p.bio ? p.bio : "No bio yet"}
                </div>

                <div className="text-xs text-gray-400 mt-2">
                  {m.commitments || 0} commitments • {m.views || 0} views • {m.shares || 0} shares
                </div>

              </div>

            </Link>

          )

        })}

        {/* LOAD MORE */}

        <div className="text-center pt-4">

          <button
            onClick={loadMore}
            disabled={loadingMore}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            {loadingMore ? "Loading..." : "Load more"}
          </button>

        </div>

      </div>

    </div>

  );

}
