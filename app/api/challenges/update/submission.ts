// app/api/challenges/update-submission/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll() {},
        },
      }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const { submission_id, status, notes } = await req.json();

    if (!submission_id) {
      return NextResponse.json({ error: "Missing submission_id" }, { status: 400 });
    }

    const validStatuses = ["submitted", "under_review", "shortlisted", "rejected", "winner"];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Verify the current user owns the challenge this submission belongs to
    const { data: submission, error: fetchError } = await supabase
      .from("challenge_submissions")
      .select("id, challenge_id, challenges!inner(posted_by_user_id)")
      .eq("id", submission_id)
      .single();

    if (fetchError || !submission) {
      return NextResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    const challenge = (submission as any).challenges;
    if (challenge.posted_by_user_id !== session.user.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 403 });
    }

    // Update the submission
    const updateData: Record<string, string> = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.poster_notes = notes;

    const { error: updateError } = await supabase
      .from("challenge_submissions")
      .update(updateData)
      .eq("id", submission_id);

    if (updateError) {
      return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Update submission error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
