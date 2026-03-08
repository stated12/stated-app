"use client";

import { useEffect,useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter,usePathname } from "next/navigation";

export default function CreateCommitmentPage(){

const supabase = createClient()
const router = useRouter()
const pathname = usePathname()

const [user,setUser] = useState<any>(null)
const [company,setCompany] = useState<any>(null)

const [postAs,setPostAs] = useState<"myself"|"company">("myself")

const [text,setText] = useState("")
const [category,setCategory] = useState("")
const [duration,setDuration] = useState("1 week")

const [loading,setLoading] = useState(false)

/* CATEGORY LISTS */

const individualCategories = [
"Fitness",
"Learning",
"Writing",
"Health",
"Finance",
"Business"
]

const companyCategories = [
"Marketing",
"Sales",
"Operations",
"Product",
"Strategic",
"Announcement"
]

/* LOAD USER + COMPANY */

useEffect(()=>{
load()
},[])

async function load(){

const {data:{user}} = await supabase.auth.getUser()

if(!user){
router.push("/login")
return
}

setUser(user)

/* COMPANY MEMBERSHIP */

const {data:membership} = await supabase
.from("company_members")
.select("company_id")
.eq("user_id",user.id)
.maybeSingle()

if(membership){

const {data:companyData} = await supabase
.from("companies")
.select("*")
.eq("id",membership.company_id)
.single()

setCompany(companyData)

}

/* COMPANY DASHBOARD AUTO MODE */

if(pathname.startsWith("/dashboard/company")){
setPostAs("company")
}

}

/* CURRENT CATEGORY LIST */

const categories =
postAs === "company"
? companyCategories
: individualCategories

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

/* COMPANY COMMITMENT */

if(postAs==="company" && company){

const {error} = await supabase
.from("commitments")
.insert({
text,
category,
duration,
company_id: company.id,
user_id: null,
created_by_user_id: user.id,
status: "active"
})

if(error){
alert(error.message)
setLoading(false)
return
}

router.push("/dashboard/company")
return
}

/* INDIVIDUAL COMMITMENT */

const {error} = await supabase
.from("commitments")
.insert({
text,
category,
duration,
user_id: user.id,
company_id: null,
status: "active"
})

if(error){
alert(error.message)
setLoading(false)
return
}

router.push("/dashboard/my")

}

if(!user) return null

return(

<div className="max-w-xl mx-auto py-10 space-y-6">

<h1 className="text-2xl font-bold">
Create Commitment
</h1>

{/* POST AS */}

{!pathname.startsWith("/dashboard/company") && company && (

<div>

<label className="font-medium">
Post as
</label>

<select
value={postAs}
onChange={(e)=>setPostAs(e.target.value as any)}
className="w-full border rounded-lg px-4 py-2"
>

<option value="myself">
Myself
</option>

<option value="company">
{company.name}
</option>

</select>

</div>

)}

{/* LOCKED COMPANY MODE */}

{pathname.startsWith("/dashboard/company") && company && (

<div className="text-sm text-gray-500">
Posting as <span className="font-semibold">
{company.name}
</span>
</div>

)}

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
