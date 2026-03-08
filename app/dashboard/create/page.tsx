"use client";

import { useEffect,useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateCommitmentPage(){

const supabase = createClient()
const router = useRouter()

const [text,setText] = useState("")
const [category,setCategory] = useState("")
const [duration,setDuration] = useState("1 week")

const [profile,setProfile] = useState<any>(null)
const [company,setCompany] = useState<any>(null)

const [postAs,setPostAs] = useState("user")

const [loading,setLoading] = useState(false)

/* CATEGORIES */

const userCategories = [
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

const categories =
postAs === "company"
? companyCategories
: userCategories

/* LOAD USER */

useEffect(()=>{
loadUser()
},[])

async function loadUser(){

const {data:{user}} = await supabase.auth.getUser()

if(!user){
router.push("/login")
return
}

/* PROFILE */

const {data:profileData} = await supabase
.from("profiles")
.select("*")
.eq("id",user.id)
.single()

setProfile(profileData)

/* COMPANY */

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

}

/* CREATE */

async function createCommitment(){

if(!text.trim() || !category){
alert("Please fill all fields")
return
}

setLoading(true)

const {data:{user}} = await supabase.auth.getUser()

let insertData:any = {
text,
category,
duration,
status:"active"
}

if(postAs==="company" && company){

insertData.company_id = company.id
insertData.created_by_user_id = user?.id

}else{

insertData.user_id = user?.id

}

const {error} = await supabase
.from("commitments")
.insert(insertData)

if(error){
alert(error.message)
setLoading(false)
return
}

router.push(
postAs==="company"
? "/dashboard/company"
: "/dashboard/my"
)

}

return(

<div className="max-w-xl mx-auto py-10 space-y-6">

<h1 className="text-2xl font-bold">
Create Commitment
</h1>

{/* POST AS */}

{company && (

<div>

<label className="font-medium">
Post As
</label>

<select
value={postAs}
onChange={(e)=>setPostAs(e.target.value)}
className="w-full border rounded-lg px-4 py-2"
>

<option value="user">
Myself
</option>

<option value="company">
{company.name}
</option>

</select>

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

{/* BUTTON */}

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
