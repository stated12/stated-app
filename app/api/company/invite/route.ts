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
.select("id,member_limit")
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

await supabase
.from("company_invites")
.insert({
company_id:company.id,
email,
role,
invited_by_user_id:user.id,
status:"pending"
});


return NextResponse.json({
success:true,
message:"Invitation created"
});

  }
