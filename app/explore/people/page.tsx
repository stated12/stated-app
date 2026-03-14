import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ExplorePeoplePage(){

const supabase = await createClient();

const { data:people } =
await supabase
.from("profiles")
.select("username,display_name,avatar_url")
.order("created_at",{ascending:false})
.limit(50);

return(

<div className="max-w-4xl mx-auto py-10 px-4">

<h1 className="text-2xl font-bold mb-6">
People
</h1>

<div className="grid md:grid-cols-2 gap-6">

{people?.map((p)=>{

const avatar =
p.avatar_url ||
`https://ui-avatars.com/api/?name=${encodeURIComponent(
p.display_name || p.username
)}&background=2563eb&color=fff`;

return(

<Link
key={p.username}
href={`/u/${p.username}`}
className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition"
>

<img
src={avatar}
className="w-10 h-10 rounded-full"
/>

<div>

<div className="font-semibold">
{p.display_name}
</div>

<div className="text-sm text-gray-500">
@{p.username}
</div>

</div>

</Link>

)

})}

</div>

</div>

)

}
