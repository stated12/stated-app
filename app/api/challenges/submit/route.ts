// app/api/challenges/submit/route.ts

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
      return NextResponse.json({ error: "Sign in to submit" }, { status: 401 });
    }

    const {
      challenge_id,
      text_response,
      link_url,
      file_url,
      file_name,
      file_size,
      video_url,
    } = await req.json();

    if (!challenge_id) {
      return NextResponse.json({ error: "Missing challenge_id" }, { status: 400 });
    }

    // ── Fetch challenge with poster profile for notification ───────────────
    const { data: challenge, error: fetchError } = await supabase
      .from("challenges")
      .select(`
        id, title, status,
        require_text, require_link, require_file, require_video,
        submission_count, max_submissions, posted_by_user_id,
        profiles!posted_by_user_id ( full_name, username )
      `)
      .eq("id", challenge_id)
      .single();

    if (fetchError || !challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    if (challenge.status !== "active") {
      return NextResponse.json({ error: "This challenge is not accepting submissions" }, { status: 400 });
    }

    if (challenge.posted_by_user_id === session.user.id) {
      return NextResponse.json({ error: "You cannot submit to your own challenge" }, { status: 400 });
    }

    if (challenge.submission_count >= challenge.max_submissions) {
      return NextResponse.json({ error: "This challenge has reached its submission limit" }, { status: 400 });
    }

    // ── Validate required fields ───────────────────────────────────────────
    if (challenge.require_text === "required" && !text_response?.trim()) {
      return NextResponse.json({ error: "Text response is required for this challenge" }, { status: 400 });
    }
    if (challenge.require_link === "required" && !link_url?.trim()) {
      return NextResponse.json({ error: "A link is required for this challenge" }, { status: 400 });
    }
    if (challenge.require_file === "required" && !file_url?.trim()) {
      return NextResponse.json({ error: "A file upload is required for this challenge" }, { status: 400 });
    }
    if (challenge.require_video === "required" && !video_url?.trim()) {
      return NextResponse.json({ error: "A video link is required for this challenge" }, { status: 400 });
    }

    // ── Fetch submitter profile for notification ───────────────────────────
    const { data: submitterProfile } = await supabase
      .from("profiles")
      .select("full_name, username")
      .eq("id", session.user.id)
      .single();

    // ── Insert submission ──────────────────────────────────────────────────
    const { data: submission, error: insertError } = await supabase
      .from("challenge_submissions")
      .insert({
        challenge_id,
        submitted_by:  session.user.id,
        text_response: text_response?.trim() || null,
        link_url:      link_url?.trim()      || null,
        file_url:      file_url?.trim()      || null,
        file_name:     file_name             || null,
        file_size:     file_size             || null,
        video_url:     video_url?.trim()     || null,
        status:        "submitted",
      })
      .select("id")
      .single();

    if (insertError) {
      if (insertError.code === "23505") {
        return NextResponse.json({ error: "You have already submitted to this challenge" }, { status: 409 });
      }
      console.error("Submission insert error:", insertError);
      return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
    }

    // ── Send notifications — fire and forget ───────────────────────────────
    const posterProfile  = (challenge as any).profiles;
    const posterName     = posterProfile?.full_name || posterProfile?.username || "there";
    const submitterName  = submitterProfile?.full_name || submitterProfile?.username || "Someone";
    const submitterEmail = session.user.email || "";
    const newCount       = (challenge.submission_count || 0) + 1;

    // Fetch poster email from auth (only available server-side via service role)
    // We use the submitter email for confirmation and poster gets notified via their
    // registered email stored in profiles or auth — fetch from supabase admin if available
    // For now poster email comes from auth lookup using posted_by_user_id
    const { data: posterAuthData } = await supabase
      .from("profiles")
      .select("email")
      .eq("id", challenge.posted_by_user_id)
      .maybeSingle();

    const posterEmail = (posterAuthData as any)?.email || "";

    fetch(
      `${process.env.NEXT_PUBLIC_APP_URL || "https://app.stated.in"}/api/challenges/notify`,
      {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event:           "submission_received",
          posterName,
          posterEmail,
          challengeTitle:  challenge.title,
          challengeId:     challenge_id,
          submitterName,
          submitterEmail,
          submissionCount: newCount,
        }),
      }
    ).catch(err => console.error("Notify email error:", err));

    return NextResponse.json({ success: true, submission_id: submission.id });

  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
