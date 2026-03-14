import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ExploreCompaniesPage(){

const supabase = await createClient();

const { data:companies } =
await supabase
.from("companies")
.select("username,name,logo_url")
.order("created_at",{ascending:false})
.limit(50);

return(

<div className="max-w-4xl mx-auto py-10 px-4">

<h1 className="text-2xl font-bold mb-6">
Companies
</h1>

<div className="grid md:grid-cols-2 gap-6">

{companies?.map((c)=>{

const logo =
c.logo_url ||
`https://ui-avatars.com/api/?name=${encodeURIComponent(
c.name
)}&background=2563eb&color=fff`;

return(

<Link
key={c.username}
href={`/c/${c.username}`}
className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition"
>

<img
src={logo}
className="w-10 h-10 rounded-full"
/>

<div>

<div className="font-semibold">
{c.name}
</div>

<div className="text-sm text-gray-500">
@{c.username}
</div>

</div>

</Link>

)

})}

</div>

</div>

)

}
