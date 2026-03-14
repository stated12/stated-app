"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const PAGE_SIZE = 10;

export default function CompaniesPage() {

  const supabase = createClient();

  const [companies,setCompanies] = useState<any[]>([]);
  const [page,setPage] = useState(0);
  const [loading,setLoading] = useState(true);
  const [loadingMore,setLoadingMore] = useState(false);

  useEffect(()=>{
    loadCompanies();
  },[]);

  async function loadCompanies(){

    const {data,error} = await supabase
      .from("explore_companies_metrics")
      .select("*")
      .order("commitments",{ascending:false})
      .range(0,PAGE_SIZE-1);

    if(error){
      console.error("Companies load error:",error);
      setLoading(false);
      return;
    }

    setCompanies(data || []);
    setPage(1);
    setLoading(false);

  }

  async function loadMore(){

    setLoadingMore(true);

    const start = page * PAGE_SIZE;
    const end = start + PAGE_SIZE - 1;

    const {data,error} = await supabase
      .from("explore_companies_metrics")
      .select("*")
      .order("commitments",{ascending:false})
      .range(start,end);

    if(error){
      console.error("Load more error:",error);
      setLoadingMore(false);
      return;
    }

    if(data && data.length>0){
      setCompanies(prev => [...prev,...data]);
      setPage(prev => prev+1);
    }

    setLoadingMore(false);

  }

  function avatar(company:any){

    if(company.logo_url) return company.logo_url;

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      company.name || company.username
    )}&background=2563eb&color=fff`;

  }

  if(loading){

    return(
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          Loading companies...
        </div>
      </div>
    );

  }

  return(

    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="max-w-3xl mx-auto space-y-4">

        <h1 className="text-2xl font-bold">
          Companies
        </h1>

        {companies.map(company => (

          <Link
            key={company.id}
            href={`/c/${company.username}`}
            className="bg-white rounded-xl shadow p-4 flex gap-4 hover:shadow-md transition"
          >

            <img
              src={avatar(company)}
              className="w-12 h-12 rounded-full object-cover"
            />

            <div className="flex-1">

              <div className="font-medium">
                {company.name || company.username}
              </div>

              <div className="text-sm text-gray-500">
                @{company.username}
              </div>

              <div className="text-sm text-gray-600 mt-1 line-clamp-2">
                {company.bio ? company.bio : "No bio yet"}
              </div>

              <div className="text-xs text-gray-400 mt-2">
                {company.commitments} commitments • {company.views} views • {company.shares} shares
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
