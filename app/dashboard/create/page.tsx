"use client";

import { useEffect,useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function CreateCommitmentPage(){

const supabase = createClient()
const router = useRouter()

const [text,setText] = useState("")
const [category,setCategory] = useState("")
const [deadline,setDeadline] = useState("")
const [customDate,setCustomDate] = useState("")
const [proofLink,setProofLink] = useState("")
const [proofImage,setProofImage] = useState<File | null>(null)

const [profile,setProfile] = useState<any>(null)
const [company,setCompany] = useState<any>(null)

const [loading,setLoading] = useState(false)

/* CATEGORIES */

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
"Announcement",
"Other"
]

const categories =
company
? companyCategories
: individualCategories

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

/* DEADLINE */

function calculateDeadline(){

if(deadline==="custom") return customDate

const date = new Date()

if(deadline==="1m") date.setMonth(date.getMonth()+1)
if(deadline==="3m") date.setMonth(date.getMonth()+3)
if(deadline==="6m") date.setMonth(date.getMonth()+6)
if(deadline==="1y") date.setFullYear(date.getFullYear()+1)

return date.toISOString()

}

/* IMAGE UPLOAD */

async function uploadImage(commitmentId:string){

if(!proofImage) return null

const filePath = `${commitmentId}/${Date.now()}_${proofImage.name}`

const {error} = await supabase.storage
.from("commitment-proofs")
.upload(filePath,proofImage)

if(error){
alert(error.message)
return null
}

const {data} = supabase.storage
.from("commitment-proofs")
.getPublicUrl(filePath)

return data.publicUrl

}

/* CREATE */

async function createCommitment(){

if(!text){
alert("Commitment text required")
return
}

setLoading(true)

const {data:{user}} = await supabase.auth.getUser()

const targetDate = calculateDeadline()

let insertData:any = {

text,
category,
target_date:targetDate,
status:"active",
proof_link:proofLink || null

}

/* COMPANY POST */

if(company){

insertData.company_id = company.id
insertData.created_by_user_id = user?.id

}

/* INDIVIDUAL POST */

else{

insertData.user_id = user?.id

}

const {data:commitment,error} = await supabase
.from("commitments")
.insert(insertData)
.select()
.single()

if(error || !commitment){
alert(error?.message || "Error creating commitment")
setLoading(false)
return
}

const imageUrl = await uploadImage(commitment.id)

if(imageUrl){

await supabase
.from("commitments")
.update({
proof_image_url:imageUrl
})
.eq("id",commitment.id)

}

setLoading(false)

/* REDIRECT */

router.push(
company
? "/dashboard/company"
: "/dashboard/my"
)

}

return(

<div className="max-w-xl mx-auto py-10 space-y-6">

<h1 className="text-2xl font-bold">
Create Commitment
</h1>

<textarea
placeholder="State your commitment..."
value={text}
onChange={(e)=>setText(e.target.value)}
className="w-full border rounded-lg px-4 py-3"
/>

<select
value={category}
onChange={(e)=>setCategory(e.target.value)}
className="w-full border rounded-lg px-4 py-2"
>

<option value="">
Select category
</option>

{categories.map((c)=>(
<option key={c} value={c}>
{c}
</option>
))}

</select>

<div className="space-y-2">

<div className="text-sm text-gray-500">
Deadline
</div>

<select
value={deadline}
onChange={(e)=>setDeadline(e.target.value)}
className="w-full border rounded-lg px-4 py-2"
>

<option value="">Select timeframe</option>
<option value="1m">1 Month</option>
<option value="3m">3 Months</option>
<option value="6m">6 Months</option>
<option value="1y">1 Year</option>
<option value="custom">Custom date</option>

</select>

{deadline==="custom" && (

<input
type="date"
value={customDate}
onChange={(e)=>setCustomDate(e.target.value)}
className="w-full border rounded-lg px-4 py-2"
/>

)}

</div>

<input
type="text"
placeholder="Proof link (optional)"
value={proofLink}
onChange={(e)=>setProofLink(e.target.value)}
className="w-full border rounded-lg px-4 py-2"
/>

<input
type="file"
accept="image/*"
onChange={(e)=>setProofImage(e.target.files?.[0] || null)}
className="w-full"
/>

<div className="text-xs text-gray-500">
Adding proof improves credibility
</div>

<button
onClick={createCommitment}
disabled={loading}
className="bg-blue-600 text-white px-6 py-2 rounded-lg"
>

{loading ? "Publishing..." : "Publish Commitment"}

</button>

</div>

)

}
