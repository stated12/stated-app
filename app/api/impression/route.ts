import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { commitmentIds } = await request.json();

  if (!commitmentIds || !Array.isArray(commitmentIds)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const viewerId = user?.id ?? null;

  const rows = commitmentIds.map((id: string) => ({
    commitment_id: id,
    viewer_id: viewerId,
  }));

  await supabase.from("commitment_views").insert(rows);

  return NextResponse.json({ success: true });
}
