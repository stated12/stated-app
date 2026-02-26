import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { text, category, postAs } = body;

  if (!text) {
    return NextResponse.json({ error: "Text required" }, { status: 400 });
  }

  // Posting as Individual
  if (postAs === "individual") {
    const { data: profile } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single();

    if (!profile || profile.credits <= 0) {
      return NextResponse.json(
        { error: "No credits remaining" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("commitments").insert({
      text,
      category,
      user_id: user.id,
      identity_type: "user",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    await supabase
      .from("profiles")
      .update({ credits: profile.credits - 1 })
      .eq("id", user.id);

    return NextResponse.json({ success: true });
  }

  // Posting as Company
  if (postAs === "company") {
    const { data: membership } = await supabase
      .from("company_members")
      .select("company_id")
      .eq("user_id", user.id)
      .single();

    if (!membership) {
      return NextResponse.json(
        { error: "Not part of company" },
        { status: 403 }
      );
    }

    const { data: company } = await supabase
      .from("companies")
      .select("credits")
      .eq("id", membership.company_id)
      .single();

    if (!company || company.credits <= 0) {
      return NextResponse.json(
        { error: "Company has no credits remaining" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("commitments").insert({
      text,
      category,
      company_id: membership.company_id,
      identity_type: "company",
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    await supabase
      .from("companies")
      .update({ credits: company.credits - 1 })
      .eq("id", membership.company_id);

    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid post type" }, { status: 400 });
}
