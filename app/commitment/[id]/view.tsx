"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import ViewTracker from "@/components/ViewTracker";

export default function CommitmentClient({ commitmentId }: any) {

const supabase = createClient();

const [commitment,setCommitment] = useState<any>(null);
const [updates,setUpdates] = useState<any[]>([]);
const [identity,setIdentity] = useState<any>(null);
const [identityType,setIdentityType] = useState<"user"|"company">("user");
const [viewCount,setViewCount] = useState<number>(0);

const [currentUser,setCurrentUser] = useState<any>(null);
const [loading,setLoading] = useState(true);

useEffect(()=>{

if(!commitmentId) return;

loadCommitment();
loadCurrentUser();

},[commitmentId]);

async function loadCurrentUser(){

try{

const {data} = await supabase.auth.getUser();
setCurrentUser(data?.user || null);

}catch(e){
console.error(e);
}

}

async function loadCommitment(){

try{

const {data:commitmentData,error} =
await supabase
.from("commitments")
.select("*")
.eq("id",commitmentId)
.single();

if(error || !commitmentData){
setLoading(false);
return;
}

setCommitment(commitmentData);

if(commitmentData.user_id){

const {data} =
await supabase
.from("profiles")
.select("*")
.eq("id",commitmentData.user_id)
.single();

setIdentity(data);
setIdentityType("user");

}

if(commitmentData.company_id){

const {data} =
await supabase
.from("companies")
.select("*")
.eq("id",commitmentData.company_id)
.single();

setIdentity(data);
setIdentityType("company");

}

const {data:updatesData} =
await supabase
.from("commitment_updates")
.select("*")
.eq("commitment_id",commitmentId)
.order("created_at",{ascending:false});

setUpdates(updatesData || []);

const {count} =
await supabase
.from("commitment_views")
.select("*",{count:"exact",head:true})
.eq("commitment_id",commitmentId);

setViewCount(count || 0);

}catch(err){

console.error(err);

}

setLoading(false);

}

function avatar(){

if(identityType==="company" && identity?.logo_url)
return identity.logo_url;

if(identity?.avatar_url)
return identity.avatar_url;

return `https://ui-avatars.com/api/?name=${encodeURIComponent(
identity?.display_name ||
identity?.name ||
identity?.username ||
"User"
)}&background=2563eb&color=fff`;

}

async function share(){

try{

const url =
`${window.location.origin}/commitment/${commitmentId}`;

const text =
`I made a public commitment on Stated:

"${commitment?.text}"

Track progress:
${url}`;

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

}catch(err){

console.error(err);

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

const isOwner =
currentUser?.id === commitment.user_id;

return(

<div className="min-h-screen bg-gray-50 px-4 py-8">

<ViewTracker type="commitment" entityId={commitmentId} />

<div className="max-w-2xl mx-auto space-y-6">

<div className="flex justify-between items-center">

<Link
href="/"
className="text-sm text-gray-500"
>
← Back
</Link>

<Link
href="/"
className="text-xl font-bold text-blue-600"
>
Stated
</Link>

</div>

{identity && (

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

)}

<div className="bg-white rounded-xl shadow p-6 space-y-3">

<div className="text-lg font-medium">
{commitment.text}
</div>

<div className="text-sm font-medium">
{statusBadge()}
</div>

<div className="text-xs text-gray-400">
Created{" "}
{new Date(commitment.created_at)
.toLocaleDateString()}
</div>

<div className="text-xs text-gray-400">
👁 {viewCount} views
</div>

<button
onClick={share}
className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
>
Share commitment
</button>

</div>

{isOwner &&(

<div className="flex flex-wrap gap-2">

<Link
href={`/commitment/${commitmentId}/update`}
className="bg-gray-200 px-3 py-2 rounded text-sm"
>
Add update
</Link>

<Link
href={`/commitment/${commitmentId}/pause`}
className="bg-gray-200 px-3 py-2 rounded text-sm"
>
Pause
</Link>

<Link
href={`/commitment/${commitmentId}/resume`}
className="bg-gray-200 px-3 py-2 rounded text-sm"
>
Resume
</Link>

<Link
href={`/commitment/${commitmentId}/complete`}
className="bg-gray-200 px-3 py-2 rounded text-sm"
>
Complete
</Link>

<Link
href={`/commitment/${commitmentId}/withdraw`}
className="bg-gray-200 px-3 py-2 rounded text-sm"
>
Withdraw
</Link>

</div>

)}

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
<div
key={update.id}
className="bg-white rounded-xl shadow p-4"
>

<div className="text-sm">
{update.content}
</div>

<div className="text-xs text-gray-400 mt-1">
{new Date(update.created_at)
.toLocaleDateString()}
</div>

</div>
))}

</div>

</div>

</div>

</div>

);

  }
