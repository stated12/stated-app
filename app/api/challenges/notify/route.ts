// app/api/challenges/notify/route.ts
// Called internally after key challenge events
// Uses Resend (transactional) — same as your existing email setup

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = "Stated <hello@stated.in>";
const BASE   = "https://app.stated.in";

// ── Email templates ───────────────────────────────────────────────────────────

function challengeCreatedEmail(params: {
  posterName:     string;
  posterEmail:    string;
  challengeTitle: string;
  challengeType:  string;
  challengeId:    string;
  plan:           string;
  expiresAt:      string;
}) {
  const { posterName, challengeTitle, challengeType, challengeId, plan, expiresAt } = params;
  const url = `${BASE}/challenges/${challengeId}`;
  const submissionsUrl = `${BASE}/challenges/${challengeId}/submissions`;
  const expiry = new Date(expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return {
    subject: `Your challenge is live on Stated: "${challengeTitle}"`,
    html: `
<!DOCTYPE html><html><body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f9fafb;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;max-width:580px;">
      <tr><td style="padding:24px 32px;border-bottom:1px solid #f3f4f6;">
        <div style="display:inline-flex;align-items:center;gap:8px;">
          <div style="width:28px;height:28px;background:#2563eb;border-radius:7px;display:inline-block;text-align:center;line-height:28px;color:white;font-weight:700;font-size:13px;">✓</div>
          <span style="font-size:16px;font-weight:700;color:#111827;margin-left:8px;">stated</span>
        </div>
      </td></tr>
      <tr><td style="padding:32px;">
        <div style="width:48px;height:48px;background:#dcfce7;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:16px;">🎯</div>
        <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#0f172a;">Your challenge is live!</h2>
        <p style="margin:0 0 20px;font-size:14px;color:#6b7280;line-height:1.6;">Hi ${posterName}, your challenge has been published on Stated and is now open for responses.</p>
        <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
          <div style="font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:4px;">${challengeType}</div>
          <div style="font-size:16px;font-weight:700;color:#0f172a;margin-bottom:8px;">${challengeTitle}</div>
          <div style="font-size:12px;color:#6b7280;">Plan: <strong>${plan.toUpperCase()}</strong> &nbsp;|&nbsp; Active until: <strong>${expiry}</strong></div>
        </div>
        <table width="100%"><tr><td align="center">
          <a href="${url}" style="display:inline-block;background:#2563eb;color:#fff;font-size:14px;font-weight:600;padding:13px 28px;border-radius:10px;text-decoration:none;margin-right:8px;">View public page</a>
          <a href="${submissionsUrl}" style="display:inline-block;background:#f8fafc;color:#374151;font-size:14px;font-weight:500;padding:13px 28px;border-radius:10px;text-decoration:none;border:1px solid #e5e7eb;">Submissions dashboard</a>
        </td></tr></table>
        <p style="font-size:12px;color:#9ca3af;margin-top:20px;line-height:1.6;">Share your challenge link to attract more responses. The more you share, the better the applicants.</p>
      </td></tr>
      <tr><td style="padding:16px 32px;background:#f8fafc;border-top:1px solid #f3f4f6;">
        <p style="margin:0;font-size:11px;color:#9ca3af;">You received this because you posted a challenge on Stated. <a href="${BASE}" style="color:#6b7280;">app.stated.in</a></p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
  };
}

function submissionReceivedEmail(params: {
  posterName:      string;
  posterEmail:     string;
  challengeTitle:  string;
  challengeId:     string;
  submitterName:   string;
  submissionCount: number;
}) {
  const { posterName, challengeTitle, challengeId, submitterName, submissionCount } = params;
  const url = `${BASE}/challenges/${challengeId}/submissions`;

  return {
    subject: `New submission on "${challengeTitle}" from ${submitterName}`,
    html: `
<!DOCTYPE html><html><body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f9fafb;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;max-width:580px;">
      <tr><td style="padding:24px 32px;border-bottom:1px solid #f3f4f6;">
        <div style="display:inline-flex;align-items:center;gap:8px;">
          <div style="width:28px;height:28px;background:#2563eb;border-radius:7px;display:inline-block;text-align:center;line-height:28px;color:white;font-weight:700;font-size:13px;">✓</div>
          <span style="font-size:16px;font-weight:700;color:#111827;margin-left:8px;">stated</span>
        </div>
      </td></tr>
      <tr><td style="padding:32px;">
        <div style="width:48px;height:48px;background:#eff6ff;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:16px;">📥</div>
        <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#0f172a;">New submission received</h2>
        <p style="margin:0 0 20px;font-size:14px;color:#6b7280;line-height:1.6;">Hi ${posterName}, <strong>${submitterName}</strong> just submitted a response to your challenge.</p>
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
          <div style="font-size:14px;font-weight:700;color:#0f172a;margin-bottom:4px;">${challengeTitle}</div>
          <div style="font-size:12px;color:#2563eb;font-weight:600;">${submissionCount} total submission${submissionCount !== 1 ? "s" : ""} so far</div>
        </div>
        <table width="100%"><tr><td align="center">
          <a href="${url}" style="display:inline-block;background:#2563eb;color:#fff;font-size:14px;font-weight:600;padding:13px 28px;border-radius:10px;text-decoration:none;">Review submission</a>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding:16px 32px;background:#f8fafc;border-top:1px solid #f3f4f6;">
        <p style="margin:0;font-size:11px;color:#9ca3af;">Stated Challenges notification. <a href="${BASE}" style="color:#6b7280;">app.stated.in</a></p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
  };
}

function expiryReminderEmail(params: {
  posterName:     string;
  posterEmail:    string;
  challengeTitle: string;
  challengeId:    string;
  daysLeft:       number;
  submissionCount:number;
}) {
  const { posterName, challengeTitle, challengeId, daysLeft, submissionCount } = params;
  const url = `${BASE}/challenges/${challengeId}/submissions`;
  const publicUrl = `${BASE}/challenges/${challengeId}`;

  return {
    subject: `Your challenge closes in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}: "${challengeTitle}"`,
    html: `
<!DOCTYPE html><html><body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f9fafb;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;max-width:580px;">
      <tr><td style="padding:24px 32px;border-bottom:1px solid #f3f4f6;">
        <div style="display:inline-flex;align-items:center;gap:8px;">
          <div style="width:28px;height:28px;background:#2563eb;border-radius:7px;display:inline-block;text-align:center;line-height:28px;color:white;font-weight:700;font-size:13px;">✓</div>
          <span style="font-size:16px;font-weight:700;color:#111827;margin-left:8px;">stated</span>
        </div>
      </td></tr>
      <tr><td style="padding:32px;">
        <div style="width:48px;height:48px;background:#fffbeb;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:16px;">⏰</div>
        <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#0f172a;">Your challenge closes in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}</h2>
        <p style="margin:0 0 20px;font-size:14px;color:#6b7280;line-height:1.6;">Hi ${posterName}, time is running out to receive more responses for your challenge.</p>
        <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
          <div style="font-size:14px;font-weight:700;color:#0f172a;margin-bottom:4px;">${challengeTitle}</div>
          <div style="font-size:12px;color:#d97706;font-weight:600;">${submissionCount} submission${submissionCount !== 1 ? "s" : ""} received &nbsp;|&nbsp; ${daysLeft} day${daysLeft !== 1 ? "s" : ""} remaining</div>
        </div>
        <p style="font-size:13px;color:#374151;margin:0 0 20px;line-height:1.6;">Share your challenge now to attract more responses before it closes.</p>
        <table width="100%"><tr><td align="center">
          <a href="${url}" style="display:inline-block;background:#2563eb;color:#fff;font-size:14px;font-weight:600;padding:13px 28px;border-radius:10px;text-decoration:none;margin-right:8px;">Review submissions</a>
          <a href="${publicUrl}" style="display:inline-block;background:#f8fafc;color:#374151;font-size:14px;font-weight:500;padding:13px 28px;border-radius:10px;text-decoration:none;border:1px solid #e5e7eb;">Share challenge</a>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding:16px 32px;background:#f8fafc;border-top:1px solid #f3f4f6;">
        <p style="margin:0;font-size:11px;color:#9ca3af;">Stated Challenges reminder. <a href="${BASE}" style="color:#6b7280;">app.stated.in</a></p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
  };
}

function submissionConfirmationEmail(params: {
  submitterName:  string;
  submitterEmail: string;
  challengeTitle: string;
  challengeId:    string;
  posterName:     string;
}) {
  const { submitterName, challengeTitle, challengeId, posterName } = params;
  const url = `${BASE}/challenges/${challengeId}`;

  return {
    subject: `Your response to "${challengeTitle}" has been received`,
    html: `
<!DOCTYPE html><html><body style="margin:0;padding:0;font-family:'Helvetica Neue',Arial,sans-serif;background:#f9fafb;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 0;">
  <tr><td align="center">
    <table width="580" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;max-width:580px;">
      <tr><td style="padding:24px 32px;border-bottom:1px solid #f3f4f6;">
        <div style="display:inline-flex;align-items:center;gap:8px;">
          <div style="width:28px;height:28px;background:#2563eb;border-radius:7px;display:inline-block;text-align:center;line-height:28px;color:white;font-weight:700;font-size:13px;">✓</div>
          <span style="font-size:16px;font-weight:700;color:#111827;margin-left:8px;">stated</span>
        </div>
      </td></tr>
      <tr><td style="padding:32px;">
        <div style="width:48px;height:48px;background:#dcfce7;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:16px;">✅</div>
        <h2 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#0f172a;">Response submitted successfully</h2>
        <p style="margin:0 0 20px;font-size:14px;color:#6b7280;line-height:1.6;">Hi ${submitterName}, your response has been received by <strong>${posterName}</strong>.</p>
        <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
          <div style="font-size:14px;font-weight:700;color:#0f172a;">${challengeTitle}</div>
          <div style="font-size:12px;color:#6b7280;margin-top:4px;">The poster will review all submissions and reach out to shortlisted candidates directly.</div>
        </div>
        <p style="font-size:13px;color:#374151;margin:0 0 20px;line-height:1.6;">In the meantime, keep building your public record on Stated. Every commitment you keep strengthens your credibility score.</p>
        <table width="100%"><tr><td align="center">
          <a href="${url}" style="display:inline-block;background:#2563eb;color:#fff;font-size:14px;font-weight:600;padding:13px 28px;border-radius:10px;text-decoration:none;">View the challenge</a>
        </td></tr></table>
      </td></tr>
      <tr><td style="padding:16px 32px;background:#f8fafc;border-top:1px solid #f3f4f6;">
        <p style="margin:0;font-size:11px;color:#9ca3af;">Stated Challenges confirmation. <a href="${BASE}" style="color:#6b7280;">app.stated.in</a></p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`,
  };
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event } = body;

    if (event === "challenge_created") {
      const { posterName, posterEmail, challengeTitle, challengeType, challengeId, plan, expiresAt } = body;
      const { subject, html } = challengeCreatedEmail({ posterName, posterEmail, challengeTitle, challengeType, challengeId, plan, expiresAt });
      await resend.emails.send({ from: FROM, to: posterEmail, subject, html });
      return NextResponse.json({ success: true });
    }

    if (event === "submission_received") {
      const { posterName, posterEmail, challengeTitle, challengeId, submitterName, submitterEmail, submissionCount } = body;
      // Notify poster
      const posterEmail_ = submissionReceivedEmail({ posterName, posterEmail, challengeTitle, challengeId, submitterName, submissionCount });
      await resend.emails.send({ from: FROM, to: posterEmail, subject: posterEmail_.subject, html: posterEmail_.html });
      // Confirm to submitter
      const confirmEmail = submissionConfirmationEmail({ submitterName, submitterEmail, challengeTitle, challengeId, posterName });
      await resend.emails.send({ from: FROM, to: submitterEmail, subject: confirmEmail.subject, html: confirmEmail.html });
      return NextResponse.json({ success: true });
    }

    if (event === "expiry_reminder") {
      const { posterName, posterEmail, challengeTitle, challengeId, daysLeft, submissionCount } = body;
      const { subject, html } = expiryReminderEmail({ posterName, posterEmail, challengeTitle, challengeId, daysLeft, submissionCount });
      await resend.emails.send({ from: FROM, to: posterEmail, subject, html });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown event" }, { status: 400 });

  } catch (err) {
    console.error("Notify error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
