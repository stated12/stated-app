"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const PAGE_SIZE = 10;

export default function PeoplePage() {

  const supabase = createClient();

  const [people,setPeople] = useState<any[]>([]);
  const [page,setPage] = useState(0);
  const [loading,setLoading] = useState(true);
  const [loadingMore,setLoadingMore] = useState(false);

  useEffect(()=>{
    loadPeople();
  },[]);

  async function loadPeople(){

    const {data,error} = await supabase
      .from("explore_people_metrics")
      .select("*")
      .order("commitments",{ascending:false})
      .range(0,PAGE_SIZE-1);

    if(error){
      console.error(error);
      setLoading(false);
      return;
    }

    setPeople(data || []);
    setPage(1);
    setLoading(false);

  }

  async function loadMore(){

    setLoadingMore(true);

    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE - 1;

    const {data} = await supabase
      .from("explore_people_metrics")
      .select("*")
      .order("commitments",{ascending:false})
      .range(start,end);

    if(data && data.length>0){

      setPeople(prev=>[...prev,...data]);
      setPage(prev=>prev+1);

    }

    setLoadingMore(false);

  }

  function avatar(p:any){

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

        {people.map(p=>(

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
                {p.commitments} commitments • {p.views} views • {p.shares} shares
              </div>

            </div>

          </Link>

        ))}

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
