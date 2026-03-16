"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import ViewTracker from "@/components/ViewTracker";
import FollowButton from "@/components/social/FollowButton";

export default function CommitmentClient({
commitmentId
}:{commitmentId:string}){

const router = useRouter();
const supabase = createClient();

const [commitment,setCommitment] = useState<any>(null);
const [profile,setProfile] = useState<any>(null);
const [company,setCompany] = useState<any>(null);
const [updates,setUpdates] = useState<any[]>([]);
const [viewCount,setViewCount] = useState<number>(0);
const [shareCount,setShareCount] = useState<number>(0);
const [currentUser,setCurrentUser] = useState<any>(null);
const [loading,setLoading] = useState(true);

useEffect(()=>{
loadCommitment();
loadUpdates();
loadViews();
loadShares();
loadUser();
},[]);

async function loadUser(){
const {data} = await supabase.auth.getUser();
setCurrentUser(data?.user || null);
}

async function loadCommitment(){

const {data} =
await supabase
.from("commitments")
.select("*")
.eq("id",commitmentId)
.maybeSingle();

if(!data){
setLoading(false);
return;
}

setCommitment(data);

if(data.user_id){

const {data:profileData} =
await supabase
.from("profiles")
.select("id,username,display_name,avatar_url")
.eq("id",data.user_id)
.maybeSingle();

setProfile(profileData || null);

}

if(data.company_id){

const {data:companyData} =
await supabase
.from("companies")
.select("id,username,name,logo_url")
.eq("id",data.company_id)
.maybeSingle();

setCompany(companyData || null);

}

setLoading(false);

}

async function loadUpdates(){

const {data} =
await supabase
.from("commitment_updates")
.select("*")
.eq("commitment_id",commitmentId)
.order("created_at",{ascending:false});

setUpdates(data || []);

}

async function loadViews(){

const {count} =
await supabase
.from("commitment_views")
.select("*",{count:"exact",head:true})
.eq("commitment_id",commitmentId);

setViewCount(count || 0);

}

async function loadShares(){

const {count} =
await supabase
.from("commitment_shares")
.select("*",{count:"exact",head:true})
.eq("commitment_id",commitmentId);

setShareCount(count || 0);

}

function avatar(){

if(commitment?.company_id && company?.logo_url)
return company.logo_url;

if(profile?.avatar_url)
return profile.avatar_url;

return `https://ui-avatars.com/api/?name=${encodeURIComponent(
profile?.display_name ||
company?.name ||
"User"
)}&background=2563eb&color=fff`;

}

async function share(){

const url =
`${window.location.origin}/commitment/${commitmentId}`;

const text =
`Public commitment on Stated:

"${commitment?.text}"

Track progress:
${url}`;

try{

await supabase
.from("commitment_shares")
.insert({commitment_id:commitmentId});

await supabase.rpc("increment_commitment_shares",{
commitment_id_input:commitmentId
});

setShareCount((s)=>s+1);

}catch(e){

console.log("share tracking error",e);

}

if(navigator.share){

await navigator.share({
title:"Public Commitment on Stated",
text,
url
});

}else{

await navigator.clipboard.writeText(url);
alert("Commitment link copied");

}

}

function statusBadge(){

const status = commitment?.status;

if(status==="active") return "🟢 ACTIVE";
if(status==="paused") return "🟡 PAUSED";
if(status==="completed") return "✅ COMPLETED";
if(status==="withdrawn") return "🔴 WITHDRAWN";

return status;

}

if(loading)
return(
<div className="min-h-screen flex items-center justify-center">
Loading commitment...
</div>
);

if(!commitment)
return(
<div className="min-h-screen flex items-center justify-center">
Commitment not found
</div>
);

const identity =
commitment.company_id ? company : profile;

const identityType =
commitment.company_id ? "company" : "user";

const isOwner =
(identityType==="user" && currentUser?.id === identity?.id);

return(

<div className="min-h-screen bg-gray-50 px-4 py-8">

<ViewTracker type="commitment" entityId={commitmentId} />

<div className="max-w-2xl mx-auto space-y-6">

{/* HEADER */}

<div className="flex justify-between items-center">

<button
onClick={()=>{
if(window.history.length > 1){
router.back();
}else{
router.push("/");
}
}}
className="text-sm text-gray-500"
>
← Back
</button>

<Link
href="/"
className="text-xl font-bold text-blue-600"
>
Stated
</Link>

</div>

{/* CREATOR */}

<div className="flex items-center justify-between gap-3">

<Link
href={
identityType==="company"
? `/c/${identity?.username}`
: `/u/${identity?.username}`
}
className="flex items-center gap-3"
>

<img
src={avatar()}
className="w-10 h-10 rounded-full object-cover"
/>

<div>

<div className="font-medium">
{identity?.display_name || identity?.name}
</div>

<div className="text-sm text-gray-500">
@{identity?.username}
</div>

</div>

</Link>

{/* FOLLOW BUTTON */}

{!isOwner && (

<FollowButton
currentUserId={currentUser?.id}
targetUserId={
identityType==="user" ? identity?.id : undefined
}
targetCompanyId={
identityType==="company" ? identity?.id : undefined
}
/>

)}

</div>

{/* COMMITMENT */}

<div className="bg-white rounded-xl shadow p-6 space-y-3">

<div className="text-lg font-medium">
{commitment.text}
</div>

<div className="text-sm font-medium">
{statusBadge()}
</div>

<div className="text-xs text-gray-400">
Created {new Date(commitment.created_at).toLocaleDateString()}
</div>

<div className="text-xs text-gray-400">
👁 {viewCount} views · 🔁 {shareCount} shares
</div>

<button
onClick={share}
className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
>
Share commitment
</button>

</div>

{/* PROGRESS */}

<div>

<div className="font-semibold mb-3">
Progress updates
</div>

{updates.length===0 &&(
<div className="text-gray-500">
No updates yet
</div>
)}

<div className="space-y-3">

{updates.map(update=>(
<div key={update.id} className="bg-white rounded-xl shadow p-4">

<div className="text-sm">
{update.content}
</div>

<div className="text-xs text-gray-400 mt-1">
{new Date(update.created_at).toLocaleDateString()}
</div>

</div>
))}

</div>

</div>

{/* CREATE COMMITMENT CTA */}

{!isOwner && (

<div className="bg-white rounded-xl shadow p-6 text-center space-y-4">

<div className="text-lg font-semibold">
Make your own public commitment
</div>

<div className="text-sm text-gray-500">
Start with <b>5 free commitments</b>. Build credibility publicly.
</div>

<Link
href="/dashboard/create"
className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
>
Create your commitment
</Link>

</div>

)}

</div>

</div>

);

  }
