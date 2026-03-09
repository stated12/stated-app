import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(
request:Request,
{ params }:{ params:{ id:string } }
){

const supabase = await createClient();

await supabase
.from("company_invites")
.delete()
.eq("id",params.id);

return NextResponse.json({ success:true });

}
