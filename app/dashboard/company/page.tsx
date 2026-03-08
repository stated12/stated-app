export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

/* ---------------- TYPES ---------------- */

type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
};

type Company = {
  id: string;
  name: string;
  username: string;
  owner_id: string;
};

type Member = {
  id: string;
  role: string;
  user_id: string;
  profiles: Profile | null;
};

type Commitment = {
  id: string;
  text: string;
  category: string | null;
  views: number | null;
  created_at: string;
  created_by_user_id: string | null;
  profiles?: {
    display_name: string | null;
    username: string | null;
  } | null;
  commitment_updates: {
    text: string | null;
    created_at: string;
  }[];
};

/* ---------------- PAGE ---------------- */

export default async function CompanyDashboardPage() {

  const supabase = await createClient();

  const { data:{user} } = await supabase.auth.getUser();

  if(!user){
    redirect("/login");
  }

  /* ---------------- COMPANY MEMBERSHIP ---------------- */

  const { data:membership } = await supabase
  .from("company_members")
  .select("company_id,role")
  .eq("user_id",user.id)
  .maybeSingle();

  if(!membership){
    redirect("/dashboard");
  }

  /* ---------------- COMPANY ---------------- */

  const { data:companyData } = await supabase
  .from("companies")
  .select("*")
  .eq("id",membership.company_id)
  .single();

  if(!companyData){
    redirect("/dashboard");
  }

  const company:Company = {
    id:String(companyData.id),
    name:String(companyData.name),
    username:String(companyData.username),
    owner_id:String(companyData.owner_id)
  };

  /* ---------------- MEMBERS ---------------- */

  const { data:membersData } = await supabase
  .from("company_members")
  .select(`
    id,
    role,
    user_id,
    profiles(
      id,
      username,
      display_name,
      avatar_url
    )
  `)
  .eq("company_id",company.id);

  const members:Member[] =
  (membersData ?? []).map((m:any)=>({
    id:String(m.id),
    role:String(m.role),
    user_id:String(m.user_id),
    profiles:m.profiles ? {
      id:String(m.profiles.id),
      username:String(m.profiles.username),
      display_name:m.profiles.display_name ?? null,
      avatar_url:m.profiles.avatar_url ?? null
    } : null
  }));

  /* ---------------- COMMITMENTS ---------------- */

  const { data:commitmentsData } = await supabase
  .from("commitments")
  .select(`
    id,
    text,
    category,
    views,
    created_at,
    created_by_user_id,
    profiles:profiles!commitments_created_by_user_id_fkey(
      display_name,
      username
    ),
    commitment_updates(
      text,
      created_at
    )
  `)
  .eq("company_id",company.id)
  .eq("status","active")
  .order("created_at",{ascending:false})
  .limit(10);

  const commitments:Commitment[] =
  (commitmentsData ?? []) as Commitment[];

  /* ---------------- PAGE ---------------- */

  return(

  <div className="max-w-4xl mx-auto space-y-10">

  {/* HEADER */}

  <div>

  <h1 className="text-2xl font-bold">
  Company Commitments
  </h1>

  <div className="text-sm text-gray-500">
  {company.name} (@{company.username})
  </div>

  </div>

  {/* QUICK LINKS */}

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

  <Link
  href={`/c/${company.username}`}
  className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
  >
  Public Page
  </Link>

  <Link
  href="/dashboard/company/insights"
  className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
  >
  Company Analytics
  </Link>

  <Link
  href="/dashboard/company/settings"
  className="bg-white rounded-xl shadow p-5 hover:shadow-md transition"
  >
  Company Settings
  </Link>

  </div>

  {/* COMPANY COMMITMENTS */}

  <div>

  <div className="flex justify-between items-center mb-4">

  <h2 className="text-lg font-semibold">
  Company Commitments
  </h2>

  <Link
  href="/dashboard/company/create"
  className="text-sm bg-blue-600 text-white px-3 py-1 rounded"
  >
  + Create
  </Link>

  </div>

  <div className="space-y-4">

  {commitments.map((c)=>{

  const latestUpdate = c.commitment_updates?.[0] || null;

  const creator =
  c.created_by_user_id === company.owner_id
  ? company.name
  : c.profiles?.display_name ||
    c.profiles?.username ||
    "Member";

  return(

  <div
  key={c.id}
  className="bg-white rounded-xl shadow p-5"
  >

  <div className="font-medium mb-1">
  {c.text}
  </div>

  {c.category && (
  <div className="text-xs text-gray-500 mb-2">
  {c.category}
  </div>
  )}

  <div className="text-xs text-gray-500 mb-2">
  Posted by {creator}
  </div>

  {latestUpdate ? (

  <div className="text-sm text-gray-600">
  Latest update: {latestUpdate.text}
  </div>

  ) : (

  <div className="text-sm text-gray-400">
  No updates yet
  </div>

  )}

  <div className="text-xs text-gray-400 mt-2">
  👁 {c.views ?? 0} views
  </div>

  </div>

  );

  })}

  {commitments.length === 0 && (
  <div className="text-sm text-gray-500">
  No commitments yet.
  </div>
  )}

  </div>

  </div>

  {/* MEMBERS */}

  <div>

  <div className="flex justify-between items-center mb-4">

  <h2 className="text-lg font-semibold">
  Members
  </h2>

  {(membership.role==="owner" || membership.role==="admin") && (

  <Link
  href="/dashboard/company/invite"
  className="bg-blue-600 text-white px-4 py-2 rounded"
  >
  Invite Member
  </Link>

  )}

  </div>

  <div className="space-y-4">

  {members.map((m)=>(
  <MemberRow
  key={m.id}
  member={m}
  isOwner={m.user_id === company.owner_id}
  isSelf={m.user_id === user.id}
  canManage={
  membership.role==="owner" ||
  membership.role==="admin"
  }
  />
  ))}

  </div>

  </div>

  </div>

  );

}
