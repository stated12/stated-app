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

const isCompanyUser = !!company

const homeLink =
isCompanyUser
? "/dashboard/company"
: "/dashboard/my"

const createLink = "/dashboard/create"

/* NAV STYLE */

const linkClass = (href:string)=>{

const active =
pathname === href ||
pathname.startsWith(href)

return `flex items-center gap-3 px-5 py-3 rounded-xl text-[18px] font-bold transition ${
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

async function logout(){

const supabase = createClient()

await supabase.auth.signOut()

router.push("/")

}

return(

<div className="min-h-screen flex bg-gray-50">

{/* MOBILE OVERLAY */}

{open && (
<div
className="fixed inset-0 bg-black/40 z-40 md:hidden"
onClick={()=>setOpen(false)}
/>
)}

{/* SIDEBAR */}

<aside
className={`fixed md:static top-0 left-0 h-[100dvh] w-72 bg-white border-r flex flex-col z-50 transform transition-transform duration-300 ${
open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
}`}
>

{/* PROFILE */}

<div className="px-6 pt-8 pb-5 border-b">

<div className="flex items-center gap-3">

<div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">

{avatar ? (
<img src={avatar} className="w-full h-full object-cover"/>
) : (
<span className="font-bold text-gray-700">
{displayName?.charAt(0)}
</span>
)}

</div>

<div>

<div className="font-bold text-lg">
{displayName}
</div>

<div className="text-xs text-gray-500">
@{username}
</div>

</div>

</div>

<Link
href={isCompanyUser ? `/c/${username}` : `/u/${username}`}
className="block mt-3 text-sm text-blue-600 font-semibold"
>
View Profile
</Link>

</div>

{/* NAVIGATION */}

<nav className="px-4 py-6 space-y-2 flex-1">

{isCompanyUser ? (

<>
<Link href="/dashboard/company" className={linkClass("/dashboard/company")}>
📌 Company Commitments
</Link>

<Link href="/dashboard/company/insights" className={linkClass("/dashboard/company/insights")}>
📊 Insights
</Link>

<Link href="/dashboard/company/invite" className={linkClass("/dashboard/company/invite")}>
👥 Invite Members
</Link>

<Link href="/dashboard/company/settings" className={linkClass("/dashboard/company/settings")}>
⚙️ Company Settings
</Link>
</>

) : (

<>
<Link href="/dashboard/my" className={linkClass("/dashboard/my")}>
📌 My Commitments
</Link>

<Link href="/dashboard/insights" className={linkClass("/dashboard/insights")}>
📊 Insights
</Link>

<Link href="/billing" className={linkClass("/billing")}>
💳 Billing
</Link>

<Link href="/account" className={linkClass("/account")}>
⚙️ Account Settings
</Link>

<Link href="/upgrade" className={linkClass("/upgrade")}>
🚀 Upgrade
</Link>
</>

)}

<Link href="/dashboard/support" className={linkClass("/dashboard/support")}>
🛟 Support
</Link>

</nav>

{/* LOGOUT */}

<div className="px-5 pb-6">

<button
onClick={logout}
className="flex items-center gap-3 text-red-600 font-bold"
>
🚪 Logout
</button>

</div>

</aside>

{/* MAIN */}

<main className="flex-1 flex flex-col pb-24">

{/* MOBILE HEADER */}

<div className="bg-white border-b px-4 py-3 flex items-center justify-between md:hidden">

<button onClick={()=>setOpen(!open)}>
☰
</button>

<Link href={homeLink} className="flex items-center gap-2">

<Image src="/logo.png" alt="" width={40} height={40}/>

<span className="font-bold text-blue-600 text-lg">
Stated
</span>

</Link>

<NotificationBell/>

</div>

{/* DESKTOP HEADER */}

<div className="hidden md:flex justify-between items-center bg-white border-b px-8 py-4">

<Link href={homeLink} className="flex items-center gap-2">

<Image src="/logo.png" alt="" width={40} height={40}/>

<span className="font-bold text-blue-600 text-xl">
Stated
</span>

</Link>

<NotificationBell/>

</div>

{/* PAGE CONTENT */}

<div className="px-6 py-8 max-w-4xl mx-auto w-full">
{children}
</div>

{/* MOBILE NAV */}

<div className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden flex justify-around py-3">

<Link href={homeLink}>
🏠
</Link>

<Link href="/dashboard/search">
🔍
</Link>

<Link
href={createLink}
className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold"
>
+ Create
</Link>

</div>

</main>

</div>

)

}
