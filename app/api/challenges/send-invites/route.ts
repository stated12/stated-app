// app/api/challenges/send-invites/route.ts
// Handles both CSV import storage AND sending SES invite emails

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandInput,
} from "@aws-sdk/client-ses";

const ses = new SESClient({
  region: process.env.AWS_SES_REGION || "ap-south-1",
  credentials: {
    accessKeyId:     process.env.AWS_SES_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY!,
  },
});

const FROM_EMAIL = "challenges@mail.stated.in";
const FROM_NAME  = "Stated Challenges";

function buildInviteEmail(params: {
  recipientName:  string;
  challengeTitle: string;
  challengeType:  string;
  posterName:     string;
  challengeUrl:   string;
  deadline:       string;
}) {
  const { recipientName, challengeTitle, challengeType, posterName, challengeUrl, deadline } = params;

  const subject = `${posterName} invited you to a challenge on Stated: "${challengeTitle}"`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;max-width:600px;">

        <!-- Header -->
        <tr>
          <td style="padding:24px 32px;border-bottom:1px solid #f3f4f6;">
            <table width="100%"><tr>
              <td>
                <div style="display:inline-flex;align-items:center;gap:8px;">
                  <div style="width:28px;height:28px;background:#1d4ed8;border-radius:7px;display:inline-block;text-align:center;line-height:28px;color:white;font-weight:700;font-size:13px;">✓</div>
                  <span style="font-size:16px;font-weight:700;color:#111827;letter-spacing:-0.02em;">stated</span>
                </div>
              </td>
              <td align="right">
                <span style="font-size:11px;color:#9ca3af;font-family:monospace;letter-spacing:0.1em;text-transform:uppercase;">Challenge Invite</span>
              </td>
            </tr></table>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:36px 32px;">
            <p style="margin:0 0 8px;font-size:14px;color:#6b7280;">Hi ${recipientName || "there"},</p>
            <h1 style="margin:0 0 20px;font-size:22px;font-weight:700;color:#111827;line-height:1.3;">
              You have been invited to respond to a challenge
            </h1>
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:20px 24px;margin-bottom:24px;">
              <div style="font-size:10px;font-family:monospace;letter-spacing:0.14em;text-transform:uppercase;color:#9ca3af;margin-bottom:6px;">${challengeType}</div>
              <div style="font-size:20px;font-weight:700;color:#111827;margin-bottom:4px;">${challengeTitle}</div>
              <div style="font-size:13px;color:#6b7280;">Posted by <strong style="color:#374151;">${posterName}</strong></div>
              <div style="margin-top:12px;font-size:12px;color:#9ca3af;">Deadline: <strong style="color:#374151;">${deadline}</strong></div>
            </div>
            <p style="margin:0 0 24px;font-size:14px;color:#374151;line-height:1.6;">
              On Stated, challenges are different. You don't send a CV or a proposal — you submit real work. The best execution wins.
            </p>
            <table width="100%"><tr><td align="center">
              <a href="${challengeUrl}" style="display:inline-block;background:#1d4ed8;color:#ffffff;font-size:14px;font-weight:600;padding:14px 32px;border-radius:10px;text-decoration:none;letter-spacing:-0.01em;">
                View the challenge and respond
              </a>
            </td></tr></table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border-top:1px solid #f3f4f6;background:#f9fafb;">
            <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
              You received this because ${posterName} invited you via Stated Challenges.
              If you did not expect this, you can safely ignore it.
              &nbsp;&middot;&nbsp;
              <a href="https://app.stated.in" style="color:#6b7280;text-decoration:none;">app.stated.in</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `Hi ${recipientName || "there"},

${posterName} invited you to respond to a challenge on Stated.

Challenge: ${challengeTitle}
Type: ${challengeType}
Deadline: ${deadline}

On Stated, you don't send a CV. You submit real work. The best execution wins.

View the challenge: ${challengeUrl}

--
app.stated.in
You received this because ${posterName} invited you via Stated Challenges.`;

  return { subject, html, text };
}

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

    const { challenge_id, contacts } = await req.json() as {
      challenge_id: string;
      contacts: Array<{ email: string; full_name?: string; company?: string; phone?: string }>;
    };

    if (!challenge_id || !contacts?.length) {
      return NextResponse.json({ error: "Missing challenge_id or contacts" }, { status: 400 });
    }

    // Verify challenge ownership and get details
    const { data: challenge, error: fetchError } = await supabase
      .from("challenges")
      .select(`
        id, title, type, status, deadline,
        invites_remaining, posted_by_user_id,
        profiles!posted_by_user_id ( full_name, username )
      `)
      .eq("id", challenge_id)
      .single();

    if (fetchError || !challenge) {
      return NextResponse.json({ error: "Challenge not found" }, { status: 404 });
    }

    if (challenge.posted_by_user_id !== session.user.id) {
      return NextResponse.json({ error: "Unauthorised" }, { status: 403 });
    }

    if (challenge.status !== "active") {
      return NextResponse.json({ error: "Challenge must be active to send invites" }, { status: 400 });
    }

    if (contacts.length > challenge.invites_remaining) {
      return NextResponse.json({
        error: `You have ${challenge.invites_remaining} invites remaining. Purchase more to continue.`,
      }, { status: 400 });
    }

    const challengeUrl = `https://app.stated.in/challenges/${challenge_id}`;
    const posterName = (challenge as any).profiles?.full_name || "Someone on Stated";
    const deadlineFormatted = new Date(challenge.deadline).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });

    const typeLabels: Record<string, string> = {
      hiring: "Hiring Challenge", cofounder: "Cofounder Hunt",
      partner: "Partner Hunt", consultant: "Consultant Hunt",
      investor_signal: "Investor Signal", collaborator: "Collaborator Hunt",
      impact: "Impact Challenge", grant: "Grant & Fellowship",
    };

    // Insert contacts into imports table first
    const importRows = contacts.map((c) => ({
      challenge_id,
      uploaded_by:   session.user.id,
      email:         c.email,
      full_name:     c.full_name || null,
      company:       c.company || null,
      phone:         c.phone || null,
      invite_status: "queued",
    }));

    const { data: imported, error: importError } = await supabase
      .from("challenge_imports")
      .insert(importRows)
      .select("id, email, full_name");

    if (importError) {
      console.error("Import insert error:", importError);
      return NextResponse.json({ error: "Failed to save contacts" }, { status: 500 });
    }

    // Send emails via SES
    let sent = 0;
    let failed = 0;
    const results: Array<{ email: string; status: string; messageId?: string }> = [];

    for (const contact of imported || []) {
      try {
        const { subject, html, text } = buildInviteEmail({
          recipientName:  contact.full_name || "",
          challengeTitle: challenge.title,
          challengeType:  typeLabels[challenge.type] || challenge.type,
          posterName,
          challengeUrl,
          deadline:       deadlineFormatted,
        });

        const params: SendEmailCommandInput = {
          Source:      `${FROM_NAME} <${FROM_EMAIL}>`,
          Destination: { ToAddresses: [contact.email] },
          Message: {
            Subject: { Data: subject, Charset: "UTF-8" },
            Body: {
              Html: { Data: html, Charset: "UTF-8" },
              Text: { Data: text, Charset: "UTF-8" },
            },
          },
          Tags: [
            { Name: "challenge_id", Value: challenge_id },
            { Name: "type",         Value: "challenge_invite" },
          ],
        };

        const command = new SendEmailCommand(params);
        const response = await ses.send(command);

        // Update import row with sent status
        await supabase
          .from("challenge_imports")
          .update({
            invite_status:  "sent",
            invited_at:     new Date().toISOString(),
            ses_message_id: response.MessageId,
          })
          .eq("challenge_id", challenge_id)
          .eq("email", contact.email);

        results.push({ email: contact.email, status: "sent", messageId: response.MessageId });
        sent++;

      } catch (sesError) {
        console.error(`SES error for ${contact.email}:`, sesError);
        await supabase
          .from("challenge_imports")
          .update({ invite_status: "failed" })
          .eq("challenge_id", challenge_id)
          .eq("email", contact.email);

        results.push({ email: contact.email, status: "failed" });
        failed++;
      }
    }

    // Update invites_sent count on challenge
    await supabase
      .from("challenges")
      .update({ invites_sent: supabase.rpc("invites_sent", {}) })
      .eq("id", challenge_id);

    // Simple increment approach
    await supabase.rpc("increment_invites_sent", {
      challenge_uuid: challenge_id,
      count: sent,
    }).catch(() => {
      // Fallback: raw update
      supabase.from("challenges")
        .update({ invites_sent: (challenge as any).invites_sent + sent })
        .eq("id", challenge_id);
    });

    return NextResponse.json({
      success: true,
      sent,
      failed,
      results,
    });

  } catch (err) {
    console.error("Send invites error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
