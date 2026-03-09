import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

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

const { data:company, error:companyError } = await supabase
.from("companies")
.select("id,member_limit")
.eq("owner_user_id",user.id)
.maybeSingle();

if(companyError){
return NextResponse.json(
{ error:companyError.message },
{ status:400 }
);
}

if(!company){
return NextResponse.json(
{ error:"Only company owner can invite members" },
{ status:403 }
);
}


/* ---------------- MEMBER LIMIT ---------------- */

const { count, error:countError } = await supabase
.from("company_members")
.select("*",{ count:"exact",head:true })
.eq("company_id",company.id);

if(countError){
return NextResponse.json(
{ error:countError.message },
{ status:400 }
);
}

if((count ?? 0) >= (company.member_limit ?? 10)){
return NextResponse.json(
{ error:"Member limit reached. Upgrade plan to add more members." },
{ status:400 }
);
}


/* ---------------- DUPLICATE CHECK ---------------- */

const { data:existingInvite, error:inviteCheckError } = await supabase
.from("company_invites")
.select("id")
.eq("company_id",company.id)
.eq("email",email)
.eq("status","pending")
.maybeSingle();

if(inviteCheckError){
return NextResponse.json(
{ error:inviteCheckError.message },
{ status:400 }
);
}

if(existingInvite){
return NextResponse.json(
{ error:"Invite already sent to this email" },
{ status:400 }
);
}


/* ---------------- CREATE INVITE ---------------- */

const { error:insertError } = await supabase
.from("company_invites")
.insert({
company_id:company.id,
email,
role,
invited_by_user_id:user.id,
status:"pending"
});

if(insertError){
return NextResponse.json(
{ error:insertError.message },
{ status:400 }
);
}


/* ---------------- SUCCESS ---------------- */

return NextResponse.json({
success:true,
message:"Invitation sent"
});

}
