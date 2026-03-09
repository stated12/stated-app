"use client";

import { useState,useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname,useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import NotificationBell from "@/components/NotificationBell";

export default function DashboardLayout({
children,
}:{children:React.ReactNode}){

const [open,setOpen] = useState(false)
const [profile,setProfile] = useState<any>(null)
const [company,setCompany] = useState<any>(null)
const [loading,setLoading] = useState(true)

const pathname = usePathname()
const router = useRouter()

useEffect(()=>{

let mounted = true

async function load(){

const supabase = createClient()

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

if(mounted){
setProfile(profileData)
}

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

if(mounted){
setCompany(companyData)
}

}

setLoading(false)

}

load()

return ()=>{mounted=false}

},[router])

useEffect(()=>{
setOpen(false)
},[pathname])

if(loading) return null

/* DETECT COMPANY */

const isCompanyUser = !!company

/* ROUTES */

const createLink = "/dashboard/create"

const homeLink =
isCompanyUser
? "/dashboard/company"
: "/dashboard/my"

/* ACTIVE STYLE */

const linkClass = (href:string)=>{

const active =
pathname === href ||
pathname.startsWith(href + "/")

return `flex items-center gap-3 px-5 py-3 rounded-lg font-bold ${
active
? "bg-blue-100 text-blue-700"
: "text-gray-900 hover:bg-gray-100"
}`

}

/* PROFILE */

const avatar =
isCompanyUser
? company?.logo_url
: profile?.avatar_url

const displayName =
isCompanyUser
? company?.name
: profile?.display_name || profile?.username

const username =
isCompanyUser
? company?.username
: profile?.username

return(

<div className="min-h-screen flex bg-gray-50">

<aside className="w-72 bg-white border-r">

<div className="p-6 border-b">

<div className="font-semibold">
{displayName}
</div>

<div className="text-xs text-gray-500">
@{username}
</div>

</div>

<nav className="p-4 space-y-2">

{isCompanyUser ? (

<>
<Link href="/dashboard/company" className={linkClass("/dashboard/company")}>
Company Commitments
</Link>

<Link href="/dashboard/company/insights" className={linkClass("/dashboard/company/insights")}>
Insights
</Link>

<Link href="/dashboard/company/invite" className={linkClass("/dashboard/company/invite")}>
Invite Members
</Link>

<Link href="/dashboard/company/settings" className={linkClass("/dashboard/company/settings")}>
Company Settings
</Link>
</>

) : (

<>
<Link href="/dashboard/my" className={linkClass("/dashboard/my")}>
My Commitments
</Link>

<Link href="/dashboard/insights" className={linkClass("/dashboard/insights")}>
Insights
</Link>

</>

)}

<Link href="/dashboard/support" className={linkClass("/dashboard/support")}>
Support
</Link>

</nav>

</aside>

<main className="flex-1">

<div className="border-b p-4 flex justify-between">

<Link href={homeLink} className="flex items-center gap-2">
<Image src="/logo.png" alt="" width={36} height={36}/>
<span className="font-bold text-blue-600">
Stated
</span>
</Link>

<NotificationBell/>

</div>

<div className="p-6">
{children}
</div>

</main>

</div>

)

}
