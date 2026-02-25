import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const { error } = await supabase
    .from("commitments")
    .update({
      status: "active",
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Resume error:", error);
  }

  await supabase.from("commitment_updates").insert({
    commitment_id: params.id,
    user_id: user.id,
    content: "Commitment resumed",
  });

  return NextResponse.redirect(new URL("/dashboard", request.url));
}
