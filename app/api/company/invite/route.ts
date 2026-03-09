import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {

const supabase = await createClient();

const { data:{ user } } = await supabase.auth.getUser();

if(!user){
return NextResponse.json(
{ error:"Unauthorized" },
{ status:401 }
);
}

const body = await request.json();

const email = body.email?.trim().toLowerCase();
const role = body.role;

if(!email || !role){
return NextResponse.json(
{ error:"Email and role required" },
{ status:400 }
);
}


/* ---------------- FIND COMPANY ---------------- */

const { data:company } = await supabase
.from("companies")
.select("id,name,username,member_limit")
.eq("owner_user_id",user.id)
.maybeSingle();

if(!company){
return NextResponse.json(
{ error:"Only company owner can invite members" },
{ status:403 }
);
}


/* ---------------- MEMBER LIMIT ---------------- */

const { count } = await supabase
.from("company_members")
.select("*",{ count:"exact",head:true })
.eq("company_id",company.id);

if((count ?? 0) >= (company.member_limit ?? 10)){
return NextResponse.json(
{ error:"Member limit reached" },
{ status:400 }
);
}


/* ---------------- DUPLICATE CHECK ---------------- */

const { data:existingInvite } = await supabase
.from("company_invites")
.select("id")
.eq("company_id",company.id)
.eq("email",email)
.eq("status","pending")
.maybeSingle();

if(existingInvite){
return NextResponse.json(
{ error:"Invite already sent to this email" },
{ status:400 }
);
}


/* ---------------- CREATE INVITE ---------------- */

const { data:invite, error:insertError } = await supabase
.from("company_invites")
.insert({
company_id:company.id,
email,
role,
invited_by_user_id:user.id,
status:"pending"
})
.select()
.single();

if(insertError){
return NextResponse.json(
{ error:insertError.message },
{ status:400 }
);
}


/* ---------------- INVITE LINK ---------------- */

const inviteLink =
`${process.env.NEXT_PUBLIC_SITE_URL}/invite/${invite.id}`;


/* ---------------- EMAIL CONTENT ---------------- */

const subject =
`You're invited to manage ${company.name} on Stated`;

const html = `
<div style="font-family:Arial,sans-serif;line-height:1.6">

<h2>You're invited to manage ${company.name} on Stated</h2>

<p>Hello,</p>

<p>
<b>${company.name}</b> has invited you to help manage their company profile on <b>Stated</b>.
</p>

<p>
Stated is a platform where organizations make public commitments and build credibility through transparent progress.
</p>

<p>
<b>Your role:</b> ${role}
</p>

<p>
Click below to accept the invitation:
</p>

<p>
<a href="${inviteLink}"
style="
background:#2563eb;
color:#ffffff;
padding:12px 20px;
text-decoration:none;
border-radius:6px;
display:inline-block;
font-weight:600;
">
Accept Invitation
</a>
</p>

<p>
If you were not expecting this invitation, you can safely ignore this email.
</p>

<br/>

<p>
— Team Stated<br/>
https://stated.in
</p>

</div>
`;


/* ---------------- SEND EMAIL ---------------- */

await resend.emails.send({
from: "Stated <hello@stated.in>",
to: email,
subject,
html
});


/* ---------------- SUCCESS ---------------- */

return NextResponse.json({
success:true,
message:"Invitation sent"
});

}
