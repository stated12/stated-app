import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function FollowingPage({
params,
}:{
params:{username:string}
}){

const supabase = await createClient();

/* GET USER */

const { data: profile } = await supabase
.from("profiles")
.select("id, username, display_name")
.eq("username", params.username)
.maybeSingle();

if(!profile){
return <div className="p-8">User not found</div>;
}

/* GET FOLLOWING */

const { data: following } = await supabase
.from("follows")
.select(`
following_user_id,
profiles!follows_following_user_id_fkey (
username,
display_name,
avatar_url
)
`)
.eq("follower_user_id", profile.id);

return(

<div className="max-w-2xl mx-auto p-6">

<h1 className="text-2xl font-bold mb-6">
Following
</h1>

<div className="space-y-4">

{following?.map((f:any)=>{

const user = f.profiles;

return(

<Link
key={user.username}
href={`/u/${user.username}`}
className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50"
>

<img
src={
user.avatar_url ||
`https://ui-avatars.com/api/?name=${encodeURIComponent(user.display_name || user.username)}`
}
className="w-10 h-10 rounded-full"
/>

<div>
<div className="font-medium">
{user.display_name || user.username}
</div>
<div className="text-sm text-gray-500">
@{user.username}
</div>
</div>

</Link>

);

})}

{following?.length === 0 && (
<div className="text-gray-500">
Not following anyone yet
</div>
)}

</div>

</div>

);

}
