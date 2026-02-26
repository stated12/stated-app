import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const COMPANY_LIMITS: Record<string, number> = {
  comp_starter_10: 10,
  comp_growth_15: 15,
  comp_scale_25: 25,
};

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { action, memberId, role } = body;

  const { data: company } = await supabase
    .from("companies")
    .select("*")
    .eq("owner_id", user.id)
    .single();

  if (!company) {
    return NextResponse.json({ error: "Not owner" }, { status: 403 });
  }

  if (action === "remove") {
    await supabase
      .from("company_members")
      .delete()
      .eq("id", memberId);

    return NextResponse.json({ success: true });
  }

  if (action === "role") {
    if (!["admin", "member"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    await supabase
      .from("company_members")
      .update({ role })
      .eq("id", memberId);

    return NextResponse.json({ success: true });
  }

  if (action === "invite_check") {
    const limit = COMPANY_LIMITS[company.plan_key] ?? 10;

    const { count } = await supabase
      .from("company_members")
      .select("*", { count: "exact", head: true })
      .eq("company_id", company.id);

    if ((count ?? 0) >= limit) {
      return NextResponse.json(
        { error: "Member limit reached for your plan" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
