export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function InvitePage({
  params,
}:{
  params:{ token:string }
}){

const supabase = await createClient();

const token = params.token;


/* ---------- FIND INVITE ---------- */

const { data:invite } = await supabase
.from("company_invites")
.select("*")
.eq("token",token)
.maybeSingle();

if(!invite){

return(
<div className="max-w-lg mx-auto py-20 text-center">

<h1 className="text-xl font-semibold mb-4">
Invalid Invitation
</h1>

<p className="text-gray-500">
This invitation link is not valid.
</p>

</div>
);

}


/* ---------- EXPIRED CHECK ---------- */

if(invite.expires_at && new Date(invite.expires_at) < new Date()){

return(
<div className="max-w-lg mx-auto py-20 text-center">

<h1 className="text-xl font-semibold mb-4">
Invite Expired
</h1>

<p className="text-gray-500">
This invitation has expired. Ask the company to send a new invite.
</p>

</div>
);

}


/* ---------- STATUS CHECK ---------- */

if(invite.status === "accepted"){

return(
<div className="max-w-lg mx-auto py-20 text-center">

<h1 className="text-xl font-semibold mb-4">
Invite Already Used
</h1>

<p className="text-gray-500">
This invitation was already accepted.
</p>

</div>
);

}


/* ---------- GET COMPANY ---------- */

const { data:company } = await supabase
.from("companies")
.select("name")
.eq("id",invite.company_id)
.single();


/* ---------- CHECK LOGIN ---------- */

const { data:{ user } } = await supabase.auth.getUser();

if(!user){

redirect(`/login?invite=${token}`);

}


/* ---------- CHECK MEMBER ---------- */

const { data:existing } = await supabase
.from("company_members")
.select("id")
.eq("company_id",invite.company_id)
.eq("user_id",user.id)
.maybeSingle();

if(!existing){

await supabase
.from("company_members")
.insert({
company_id:invite.company_id,
user_id:user.id,
role:invite.role
});

}


/* ---------- MARK INVITE ACCEPTED ---------- */

await supabase
.from("company_invites")
.update({
status:"accepted",
accepted_at:new Date().toISOString()
})
.eq("id",invite.id);


/* ---------- REDIRECT ---------- */

redirect("/dashboard/company");

}
