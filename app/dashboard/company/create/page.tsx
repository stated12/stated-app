"use client";

import { useEffect,useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateCompanyCommitmentPage(){

const supabase = createClient()
const router = useRouter()

const [text,setText] = useState("")
const [category,setCategory] = useState("")
const [duration,setDuration] = useState("1 week")

const [company,setCompany] = useState<any>(null)

const [loading,setLoading] = useState(false)

/* COMPANY CATEGORIES */

const categories = [
"Marketing",
"Sales",
"Operations",
"Product",
"Strategic",
"Announcement",
]

/* LOAD COMPANY */

useEffect(()=>{
loadCompany()
},[])

async function loadCompany(){

const {data:{user}} = await supabase.auth.getUser()

if(!user){
router.push("/login")
return
}

const {data:membership} = await supabase
.from("company_members")
.select("company_id")
.eq("user_id",user.id)
.maybeSingle()

if(!membership){
router.push("/dashboard")
return
}

const {data:companyData} = await supabase
.from("companies")
.select("id,name,username")
.eq("id",membership.company_id)
.single()

setCompany(companyData)

}

/* CREATE COMMITMENT */

async function createCommitment(){

if(!text.trim() || !category){
alert("Please fill all required fields")
return
}

setLoading(true)

const {data:{user}} = await supabase.auth.getUser()

if(!user){
router.push("/login")
return
}

const {error} = await supabase
.from("commitments")
.insert({
text,
category,
duration,
company_id: company.id,
user_id: null,
created_by_user_id: user.id,
status: "active",
})

if(error){
alert(error.message)
setLoading(false)
return
}

router.push("/dashboard/company")

}

if(!company) return null

return(

<div className="max-w-xl mx-auto py-10 space-y-6">

<h1 className="text-2xl font-bold">
Create Company Commitment
</h1>

<div className="text-sm text-gray-500">
Posting as <span className="font-semibold">
{company.name} (@{company.username})
</span>
</div>

{/* TEXT */}

<textarea
placeholder="Enter your company commitment..."
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

{/* CREATE */}

<button
onClick={createCommitment}
disabled={loading}
className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full"
>

{loading ? "Creating..." : "Create Commitment"}

</button>

</div>

)

            }
