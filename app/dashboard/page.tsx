"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Commitment = {
  id: string;
  text: string;
  category: string;
  created_at: string;
  creator_name?: string;
};

export default function CompanyDashboardPage() {

  const supabase = createClient();

  const [company,setCompany] = useState<any>(null);
  const [commitments,setCommitments] = useState<Commitment[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    loadData();
  },[]);

  async function loadData(){

    const {data:{user}} = await supabase.auth.getUser();

    if(!user) return;

    const {data:membership} = await supabase
    .from("company_members")
    .select("company_id")
    .eq("user_id",user.id)
    .maybeSingle();

    if(!membership) return;

    const {data:companyData} = await supabase
    .from("companies")
    .select("*")
    .eq("id",membership.company_id)
    .single();

    setCompany(companyData);

    const {data:commitmentsData} = await supabase
    .from("commitments")
    .select(`
      id,
      text,
      category,
      created_at,
      created_by_user_id,
      profiles!commitments_created_by_user_id_fkey (
        display_name,
        username
      )
    `)
    .eq("company_id",companyData.id)
    .order("created_at",{ascending:false});

    const formatted =
    (commitmentsData ?? []).map((c:any)=>({

      id:c.id,
      text:c.text,
      category:c.category,
      created_at:c.created_at,
      creator_name:
        c.profiles?.display_name ||
        c.profiles?.username ||
        "Member"

    }));

    setCommitments(formatted);
    setLoading(false);

  }

  if(!company) return null;

  return(

  <div className="max-w-xl mx-auto py-8 space-y-6">

  {/* HEADER */}

  <div>

  <h1 className="text-2xl font-bold">
  {company.name}
  </h1>

  <div className="text-sm text-gray-500">
  @{company.username}
  </div>

  </div>

  {/* CREATE BUTTON */}

  <Link
  href="/dashboard/company/create"
  className="block text-center bg-blue-600 text-white py-3 rounded-lg font-medium"
  >
  + Create Commitment
  </Link>

  {/* COMMITMENTS */}

  <div className="space-y-4">

  {loading && (
  <div className="text-center text-gray-500">
  Loading...
  </div>
  )}

  {!loading && commitments.length === 0 && (
  <div className="bg-white rounded-xl shadow p-5 text-center text-gray-500">
  No company commitments yet
  </div>
  )}

  {commitments.map((c)=>(
  <div
  key={c.id}
  className="bg-white rounded-xl shadow p-5"
  >

  <div className="text-xs text-gray-500 mb-1">
  {c.category}
  </div>

  <div className="text-gray-900 text-base mb-3">
  {c.text}
  </div>

  <div className="text-xs text-gray-500">
  Created by {c.creator_name}
  </div>

  </div>
  ))}

  </div>

  </div>

  )

}
