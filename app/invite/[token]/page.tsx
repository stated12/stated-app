import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(){

const supabase = await createClient();

const { data:{ user } } = await supabase.auth.getUser();

if(!user){
return NextResponse.json({ invites:[] });
}

/* FIND COMPANY */

const { data:company } = await supabase
.from("companies")
.select("id")
.eq("owner_user_id",user.id)
.maybeSingle();

if(!company){
return NextResponse.json({ invites:[] });
}

/* GET INVITES */

const { data, error } = await supabase
.from("company_invites")
.select("*")
.eq("company_id",company.id)
.order("created_at",{ ascending:false });

if(error){
return NextResponse.json({ invites:[] });
}

return NextResponse.json({
invites: data || []
});

}
