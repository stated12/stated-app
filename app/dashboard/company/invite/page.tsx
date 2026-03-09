"use client";

import { useEffect, useState } from "react";

export default function InvitePage() {

const [email,setEmail] = useState("");
const [role,setRole] = useState("member");
const [loading,setLoading] = useState(false);
const [invites,setInvites] = useState<any[]>([]);

useEffect(()=>{
loadInvites();
},[]);


async function loadInvites(){

const res = await fetch("/api/company/invites");

const data = await res.json();

setInvites(data.invites || []);

}


/* SEND INVITE */

async function sendInvite(){

if(!email.trim()){
alert("Enter email");
return;
}

setLoading(true);

const res = await fetch("/api/company/invite",{
method:"POST",
headers:{ "Content-Type":"application/json" },
body:JSON.stringify({ email,role })
});

const data = await res.json();

if(!res.ok){
alert(data.error);
setLoading(false);
return;
}

alert("Invitation sent");

setEmail("");

loadInvites();

setLoading(false);

}


/* CANCEL INVITE */

async function cancelInvite(id:string){

if(!confirm("Cancel this invite?")) return;

await fetch(`/api/company/invite/${id}`,{
method:"DELETE"
});

loadInvites();

}


/* RESEND INVITE */

async function resendInvite(id:string){

await fetch(`/api/company/invite/${id}`,{
method:"POST"
});

alert("Invite resent");

}


return(

<div className="max-w-xl mx-auto space-y-8">

<h1 className="text-xl font-semibold">
Invite Member
</h1>


{/* CREATE INVITE */}

<div className="space-y-4">

<input
type="email"
placeholder="Member email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full border rounded px-3 py-2"
/>

<select
value={role}
onChange={(e)=>setRole(e.target.value)}
className="w-full border rounded px-3 py-2"
>
<option value="member">Member</option>
<option value="admin">Admin</option>
</select>

<button
onClick={sendInvite}
disabled={loading}
className="bg-blue-600 text-white px-4 py-2 rounded"
>
{loading ? "Sending..." : "Send Invite"}
</button>

</div>


{/* PENDING INVITES */}

<div>

<h2 className="font-semibold mb-3">
Pending Invites
</h2>

<div className="space-y-3">

{invites.length === 0 && (
<div className="text-sm text-gray-500">
No pending invites
</div>
)}

{invites.map((invite)=>{

const expired =
new Date(invite.expires_at) < new Date();

return(

<div
key={invite.id}
className="border rounded-lg p-3 flex justify-between items-center"
>

<div>

<div className="font-medium">
{invite.email}
</div>

<div className="text-xs text-gray-500">
Role: {invite.role}
</div>

<div className="text-xs text-gray-400">
{expired ? "Expired" : "Pending"}
</div>

</div>

<div className="flex gap-2">

<button
onClick={()=>resendInvite(invite.id)}
className="text-sm text-blue-600"
>
Resend
</button>

<button
onClick={()=>cancelInvite(invite.id)}
className="text-sm text-red-600"
>
Cancel
</button>

</div>

</div>

)

})}

</div>

</div>

</div>

)

}
