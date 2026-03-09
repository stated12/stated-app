"use client";

import { useState,useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function InvitePage(){

const supabase = createClient()

const [email,setEmail] = useState("")
const [role,setRole] = useState("member")

const [loading,setLoading] = useState(false)
const [invites,setInvites] = useState<any[]>([])

/* LOAD PENDING INVITES */

useEffect(()=>{
loadInvites()
},[])

async function loadInvites(){

const {data:{user}} = await supabase.auth.getUser()

if(!user) return

/* FIND COMPANY */

const {data:company} = await supabase
.from("companies")
.select("id")
.eq("owner_user_id",user.id)
.maybeSingle()

if(!company) return

const {data} = await supabase
.from("company_invites")
.select("*")
.eq("company_id",company.id)
.eq("status","pending")
.order("created_at",{ascending:false})

setInvites(data || [])

}

/* SEND INVITE */

async function sendInvite(){

if(!email.trim()){
alert("Enter email")
return
}

setLoading(true)

try{

const res = await fetch("/api/company/invite",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
role
})
})

const data = await res.json()

if(!res.ok){
alert(data.error || "Failed to send invite")
setLoading(false)
return
}

alert("Invitation sent")

setEmail("")

await loadInvites()

}catch{

alert("Something went wrong")

}

setLoading(false)

}

/* PAGE */

return(

<div className="max-w-xl mx-auto space-y-8">

<h1 className="text-xl font-semibold">
Invite Member
</h1>


{/* FORM */}

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

<option value="admin">
Admin
</option>

<option value="member">
Member
</option>

<option value="viewer">
Viewer
</option>

</select>

<button
onClick={sendInvite}
disabled={loading}
className="bg-blue-600 text-white px-5 py-2 rounded"
>
{loading ? "Sending..." : "Send Invite"}
</button>

</div>


{/* PENDING INVITES */}

<div className="space-y-3">

<h2 className="font-medium">
Pending Invites
</h2>

{invites.length === 0 && (

<div className="text-sm text-gray-500">
No pending invites
</div>

)}

{invites.map((invite)=>(

<div
key={invite.id}
className="flex justify-between items-center border rounded px-4 py-3"
>

<div>

<div className="text-sm font-medium">
{invite.email}
</div>

<div className="text-xs text-gray-500">
{invite.role}
</div>

</div>

<div className="text-xs text-gray-400">
pending
</div>

</div>

))}

</div>

</div>

)

}
