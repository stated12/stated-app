import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {

const supabase = await createClient();

const { data: { user } } = await supabase.auth.getUser();

if (!user) {
return NextResponse.json({ invites: [] });
}

/* FIND COMPANY */

const { data: company } = await supabase
.from("companies")
.select("id")
.eq("owner_id", user.id)
.maybeSingle();

if (!company) {
return NextResponse.json({ invites: [] });
}

/* LOAD PENDING INVITES */

const { data: invites } = await supabase
.from("company_invites")
.select("*")
.eq("company_id", company.id)
.eq("status", "pending")
.order("created_at", { ascending: false });

return NextResponse.json({
invites: invites || []
});

}
