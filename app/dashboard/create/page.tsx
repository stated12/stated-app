"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateCommitmentPage() {

  const supabase = createClient();
  const router = useRouter();

  const [text,setText] = useState("");
  const [duration,setDuration] = useState("1 week");
  const [category,setCategory] = useState("");

  const [companies,setCompanies] = useState<any[]>([]);
  const [selectedCompanyId,setSelectedCompanyId] = useState<string | null>(null);

  const [loading,setLoading] = useState(false);

  /* ---------------- INDIVIDUAL CATEGORIES ---------------- */

  const individualCategories = [
    "Fitness",
    "Learning",
    "Writing",
    "Health",
    "Finance",
    "Business",
  ];

  /* ---------------- COMPANY CATEGORIES ---------------- */

  const companyCategories = [
    "Marketing",
    "Sales",
    "Operations",
    "Product",
    "Strategic",
    "Announcement",
  ];

  /* ---------------- LOAD USER COMPANIES ---------------- */

  useEffect(()=>{
    loadCompanies()
  },[])

  async function loadCompanies(){

    const {data:{user}} = await supabase.auth.getUser()

    if(!user) return

    const {data:memberships} = await supabase
    .from("company_members")
    .select("company_id,companies(*)")
    .eq("user_id",user.id)

    if(!memberships) return

    const list = memberships.map((m:any)=>m.companies)

    setCompanies(list)

  }

  /* ---------------- CREATE COMMITMENT ---------------- */

  async function createCommitment(){

    if(!text.trim() || !category){
      alert("Please fill all required fields")
      return
    }

    const {data:{user}} = await supabase.auth.getUser()

    if(!user){
      router.push("/login")
      return
    }

    setLoading(true)

    const {error} = await supabase
    .from("commitments")
    .insert({
      text,
      category,
      duration,
      user_id: selectedCompanyId ? null : user.id,
      company_id: selectedCompanyId || null,
      created_by_user_id: selectedCompanyId ? user.id : null,
      status:"active"
    })

    if(error){
      alert(error.message)
      setLoading(false)
      return
    }

    setLoading(false)

    router.push("/dashboard")

  }

  /* ---------------- CATEGORY SWITCH ---------------- */

  const categories =
  selectedCompanyId
  ? companyCategories
  : individualCategories

  return(

  <div className="max-w-xl mx-auto py-10 space-y-6">

  <h1 className="text-2xl font-bold">
  Create Commitment
  </h1>

  {/* POST AS */}

  <div>

  <label className="font-medium">
  Post As
  </label>

  <select
  value={selectedCompanyId || "self"}
  onChange={(e)=>{

  const value =
  e.target.value === "self"
  ? null
  : e.target.value

  setSelectedCompanyId(value)
  setCategory("")

  }}
  className="w-full border rounded-lg px-4 py-2"
  >

  <option value="self">
  Myself
  </option>

  {companies.map((company)=>(
  <option
  key={company.id}
  value={company.id}
  >
  {company.name} (@{company.username})
  </option>
  ))}

  </select>

  </div>

  {/* TEXT */}

  <textarea
  placeholder="Enter your commitment..."
  value={text}
  onChange={(e)=>setText(e.target.value)}
  className="w-full border rounded-lg px-4 py-3"
  />

  {/* CATEGORY */}

  <div>

  <label className="font-medium">
  Category
  </label>

  <select
  value={category}
  onChange={(e)=>setCategory(e.target.value)}
  className="w-full border rounded-lg px-4 py-2"
  >

  <option value="">
  Select category
  </option>

  {categories.map((cat)=>(
  <option key={cat} value={cat}>
  {cat}
  </option>
  ))}

  </select>

  </div>

  {/* DURATION */}

  <select
  value={duration}
  onChange={(e)=>setDuration(e.target.value)}
  className="w-full border rounded-lg px-4 py-2"
  >

  <option>1 week</option>
  <option>2 weeks</option>
  <option>1 month</option>
  <option>3 months</option>
  <option>6 months</option>
  <option>1 year</option>

  </select>

  {/* CREATE BUTTON */}

  <button
  onClick={createCommitment}
  disabled={loading}
  className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full"
  >

  {loading
  ? "Creating..."
  : "Create Commitment"}

  </button>

  </div>

  )

}
