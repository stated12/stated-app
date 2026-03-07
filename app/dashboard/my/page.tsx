import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
};

type Commitment = {
  id: string;
  text: string;
  status: "active" | "paused" | "completed" | "withdrawn" | "expired";
  created_at: string;
};

type CommitmentUpdate = {
  id: string;
  commitment_id: string;
  content: string;
  created_at: string;
};

export default async function MyCommitmentsPage() {

  const supabase = await createClient();

  const { data:{user} } = await supabase.auth.getUser();

  if(!user){
    redirect("/login");
  }

  /* ---------------- PROFILE ---------------- */

  const { data:profileData } = await supabase
  .from("profiles")
  .select("*")
  .eq("id",user.id)
  .single();

  const profile = profileData as Profile | null;

  /* ---------------- COMMITMENTS ---------------- */

  const { data:commitmentsData } = await supabase
  .from("commitments")
  .select("*")
  .eq("user_id",user.id)
  .order("created_at",{ascending:false});

  const commitments = (commitmentsData ?? []) as Commitment[];

  const commitmentIds = commitments.map((c)=>c.id);

  const { data:updatesData } =
  commitmentIds.length > 0
  ? await supabase
    .from("commitment_updates")
    .select("*")
    .in("commitment_id",commitmentIds)
    .order("created_at",{ascending:false})
  : {data:[]};

  const updates = (updatesData ?? []) as CommitmentUpdate[];

  /* ---------------- AVATAR ---------------- */

  const avatar =
  profile?.avatar_url?.trim()
  ? profile.avatar_url.trim()
  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
    profile?.display_name || profile?.username || "User"
  )}&background=2563eb&color=fff`;

  return (

  <div className="max-w-3xl mx-auto space-y-6">

  {/* PROFILE */}

  <div className="bg-white rounded-xl shadow p-5">

  <div className="flex items-center gap-4">

  <Image
  src={avatar}
  alt="avatar"
  width={72}
  height={72}
  className="rounded-full"
  />

  <div>

  <div className="text-lg font-semibold">
  {profile?.display_name || profile?.username}
  </div>

  <div className="text-sm text-gray-500">
  @{profile?.username}
  </div>

  </div>

  </div>

  </div>

  {/* CREATE BUTTON */}

  <Link
  href="/dashboard/create"
  className="block text-center py-3 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700"
  >
  Create Commitment
  </Link>

  {/* COMMITMENTS */}

  <div className="space-y-4">

  {commitments.length === 0 && (
  <div className="text-sm text-gray-500">
  No commitments yet.
  </div>
  )}

  {commitments.map((c)=>{

  const commitmentUpdates = updates.filter(
  (u)=>u.commitment_id === c.id
  );

  return (

  <div key={c.id} className="bg-white rounded-xl shadow p-4">

  <div className="font-medium text-base">
  {c.text}
  </div>

  <div className="text-sm text-gray-500 mt-1 capitalize">
  Status: <span className="font-medium">{c.status}</span>
  </div>

  {commitmentUpdates.length > 0 && (

  <div className="mt-4 space-y-3 border-t pt-4">

  {commitmentUpdates.map((u)=>(
  <div key={u.id} className="bg-gray-50 rounded-lg p-3">

  <div className="text-sm">
  {u.content}
  </div>

  <div className="text-xs text-gray-400 mt-1">
  {new Date(u.created_at).toLocaleDateString()}
  </div>

  </div>
  ))}

  </div>

  )}

  {c.status === "active" && (

  <div className="flex gap-2 mt-4 flex-wrap">

  <Link
  href={`/commitment/${c.id}/update`}
  className="text-sm border px-3 py-1 rounded"
  >
  Add update
  </Link>

  <Link
  href={`/commitment/${c.id}/complete`}
  className="text-sm border px-3 py-1 rounded"
  >
  Complete
  </Link>

  <Link
  href={`/commitment/${c.id}/pause`}
  className="text-sm border px-3 py-1 rounded"
  >
  Pause
  </Link>

  <Link
  href={`/commitment/${c.id}/withdraw`}
  className="text-sm border px-3 py-1 rounded"
  >
  Withdraw
  </Link>

  </div>

  )}

  {c.status === "paused" && (

  <div className="flex gap-2 mt-4 flex-wrap">

  <form action={`/commitment/${c.id}/resume`} method="POST">

  <button
  type="submit"
  className="text-sm border px-3 py-1 rounded"
  >
  Resume
  </button>

  </form>

  <Link
  href={`/commitment/${c.id}/withdraw`}
  className="text-sm border px-3 py-1 rounded"
  >
  Withdraw
  </Link>

  </div>

  )}

  </div>

  );

  })}

  </div>

  </div>

  );

}
