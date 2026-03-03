import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type") || "latest";
    const category = searchParams.get("category");
    const cursor = searchParams.get("cursor");
    const searchQuery = searchParams.get("q");

    const supabase = getSupabase();

    let query = supabase
      .from("commitments")
      .select("*")
      .eq("status", "active")
      .eq("visibility", "public")
      .limit(25);

    if (type === "trending") {
      query = query.order("views", { ascending: false });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    if (category) {
      query = query.eq("category", category);
    }

    if (cursor) {
      query = query.lt("created_at", cursor);
    }

    if (searchQuery) {
      query = query.ilike("text", `%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ success: false, error });
    }

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      message: err.message,
    });
  }
}
