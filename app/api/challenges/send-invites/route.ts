// app/api/challenges/send-invites/route.ts
// Sends challenge invite emails via Resend (already configured on Stated)
// No SES required — Resend works immediately with no sandbox restrictions

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = "Stated Challenges <hello@stated.in>";
const BASE   = "https://app.stated.in";

const TYPE_LABELS: Record<string, string> = {
  hiring: "Hiring Challenge", cofounder: "Cofounder Hunt",
  partner: "Partner Hunt", consultant: "Consultant Hunt",
  investor_signal: "Investor Signal", collaborator: "Collaborator Hunt",
  impact: "Impact Challenge", grant: "Grant & Fellowship",
};

function buildInviteHtml(params: {
  recipientName:  string;
  challengeTitle: string;
  challengeType:  string;
  posterName:     string;
  challengeUrl:   string;
  deadline:       string;
}) {
  const { recipientName, challengeTitle, challengeType, posterName, challengeUrl, deadline } = params;
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f9fafb;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
  <tr><td align="center">
    <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;max-width:560px;">
      <tr><td style="padding:20px 28px;border-bottom:1px solid #f3f4f6;">
        <div style="display:inline-flex;align-items:center;">
          <div style="width:26px;height:26px;background:#2563eb;border-radius:7px;display:inline-block;text-align:center;line-height:26px;color:white;font-weight:700;font-size:12px;margin-right:8px;">&#10003;</div>
          <span style="font-size:15px;font-weight:700;color:#111827;">stated</span>
        </div>
      </td></tr>
      <tr><td style="padding:28px;">
        <p style="margin:0 0 6px;font-size:13px;color:#6b7280;">Hi ${recipientName || "there"},</p>
        <h2 style="margin:0 0 18px;font-size:20px;font-weight:700;color:#0f172a;line-height:1.3;">You have been invited to respond to a challenge</h2>
        <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;padding:16px 20px;margin-bottom:20px;">
          <div style="font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:5px;">${challengeType}</div>
          <div style="font-size:18px;font-weight:700;color:#0f172a;margin-bottom:4px;">${challengeTitle}</div>
          <div style="font-size:12px;color:#6b7280;">Posted by <strong style="color:#374151;">${posterName}</strong></div>
          <div style="font-size:12px;color:#9ca3af;margin-top:8px;">Deadline: <strong style="color:#374151;">${deadline}</strong></div>
        </div>
        <p style="margin:0 0 22px;font-size:13px;color:#374151;line-height:1.6;">On Stated, challenges are different. You do not send a CV — you submit real work. The best execution wins.</p>
        <table width="100%"><tr><td align="center">
          <a href="${challengeUrl}" style="display:inline-block;background:#2563eb;color:#fff;font-size:14px;font-weight:600;padding:13px 28px;border-radius:10px;text-decoration:none;">View challenge and respond</a>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding:16px 28px;background:#f8fafc;border-top:1px solid #f3f4f6;">
        <p style="margin:0;font-size:11px;color:#9ca3af;line-height:1.6;">You received this because ${posterName} invited you via Stated Challenges. You can safely ignore this if it was not expected. &nbsp;&middot;&nbsp; <a href="${BASE}" style="color:#6b7280;text-decoration:none;">app.stated.in</a></p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { getAll() { return cookieStore.getAll(); }, setAll() {} } }
    );

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
    }

    const { challenge_id, contacts } = await req.json() as {
      challenge_id: string;
      contacts: Array<{ email: string; full_name?: string; company?: string }>;
    };

    if (!challenge_id || !contacts?.length) {
      return NextResponse.json({ error: "Missing challenge_id or contacts" }, { status: 400 });
    }

    // Fetch challenge and verify ownership
    const { data: challenge } = await supabase
      .from("challenges")
      .select("id, title, type, status, deadline, invites_remaining, invites_sent, posted_by_user_id, plan")
      .eq("id", challenge_id)
      .single();

    if (!challenge) return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    if (challenge.posted_by_user_id !== session.user.id) return NextResponse.json({ error: "Unauthorised" }, { status: 403 });
    if (challenge.status !== "active") return NextResponse.json({ error: "Challenge must be active to send invites" }, { status: 400 });

    const remaining = challenge.invites_remaining ?? 0;
    if (contacts.length > remaining) {
      return NextResponse.json({
        error: `You have ${remaining} invite${remaining !== 1 ? "s" : ""} remaining. You are trying to send ${contacts.length}.`,
      }, { status: 400 });
    }

    // Get poster name
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, username")
      .eq("id", session.user.id)
      .single();
    const posterName = (profile as any)?.full_name || (profile as any)?.username || "Someone on Stated";

    const challengeUrl  = `${BASE}/challenges/${challenge_id}`;
    const deadlineFormatted = new Date(challenge.deadline).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });
    const typeLabel = TYPE_LABELS[challenge.type] || challenge.type;

    // Insert contacts into imports table
    const importRows = contacts.map(c => ({
      challenge_id,
      uploaded_by:   session.user.id,
      email:         c.email.trim().toLowerCase(),
      full_name:     c.full_name?.trim() || null,
      company:       c.company?.trim()   || null,
      invite_status: "queued",
    }));

    await supabase.from("challenge_imports").insert(importRows);

    // Send emails via Resend
    let sent   = 0;
    let failed = 0;

    for (const contact of contacts) {
      try {
        const html = buildInviteHtml({
          recipientName:  contact.full_name || "",
          challengeTitle: challenge.title,
          challengeType:  typeLabel,
          posterName,
          challengeUrl,
          deadline:       deadlineFormatted,
        });

        await resend.emails.send({
          from:    FROM,
          to:      contact.email.trim().toLowerCase(),
          subject: `${posterName} invited you to a challenge on Stated: "${challenge.title}"`,
          html,
        });

        // Mark as sent in imports
        await supabase
          .from("challenge_imports")
          .update({ invite_status: "sent", invited_at: new Date().toISOString() })
          .eq("challenge_id", challenge_id)
          .eq("email", contact.email.trim().toLowerCase());

        sent++;
      } catch (emailErr) {
        console.error("Resend error for", contact.email, emailErr);
        await supabase
          .from("challenge_imports")
          .update({ invite_status: "failed" })
          .eq("challenge_id", challenge_id)
          .eq("email", contact.email.trim().toLowerCase());
        failed++;
      }
    }

    // Update invites_sent count
    await supabase
      .from("challenges")
      .update({ invites_sent: (challenge.invites_sent || 0) + sent })
      .eq("id", challenge_id);

    return NextResponse.json({ success: true, sent, failed });

  } catch (err) {
    console.error("Send invites error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
