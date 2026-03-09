import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import crypto from "crypto";
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

const { email,role } = await request.json();

if(!email || !role){
return NextResponse.json(
{ error:"Email and role required" },
{ status:400 }
);
}


/* ---------------- FIND COMPANY ---------------- */

const { data:company } = await supabase
.from("companies")
.select("id,name,member_limit")
.eq("owner_id",user.id)
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


/* ---------------- CREATE TOKEN ---------------- */

const token = crypto.randomUUID();


/* ---------------- EXPIRE AFTER 7 DAYS ---------------- */

const expiresAt = new Date();
expiresAt.setDate(expiresAt.getDate() + 7);


/* ---------------- CREATE INVITE ---------------- */

const { error:insertError } = await supabase
.from("company_invites")
.insert({
company_id:company.id,
email,
role,
token,
invited_by_user_id:user.id,
status:"pending",
expires_at:expiresAt
});

if(insertError){
return NextResponse.json(
{ error:insertError.message },
{ status:500 }
);
}


/* ---------------- INVITE LINK ---------------- */

const inviteUrl =
`${process.env.NEXT_PUBLIC_SITE_URL}/invite/${token}`;


/* ---------------- SEND EMAIL ---------------- */

await resend.emails.send({

from:"Stated <hello@stated.in>",

to:email,

subject:`${company.name} invited you to manage their profile on Stated`,

html:`

<h2>You’ve been invited</h2>

<p>
<strong>${company.name}</strong>
invited you to help manage their profile on <strong>Stated</strong>.
</p>

<p>Your role: <b>${role}</b></p>

<p>
<a href="${inviteUrl}" style="background:#2563eb;color:white;padding:10px 18px;border-radius:6px;text-decoration:none;">
Accept Invitation
</a>
</p>

<p>If the button does not work:</p>

<p>${inviteUrl}</p>

`

});


return NextResponse.json({
success:true,
message:"Invitation created"
});

   }
