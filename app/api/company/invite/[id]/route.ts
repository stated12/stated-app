import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* ---------------- CANCEL INVITE ---------------- */

export async function DELETE(
request: Request,
context: { params: Promise<{ id: string }> }
) {

const supabase = await createClient();

const { id } = await context.params;

await supabase
.from("company_invites")
.delete()
.eq("id", id);

return NextResponse.json({
success: true
});

}


/* ---------------- RESEND INVITE ---------------- */

export async function POST(
request: Request,
context: { params: Promise<{ id: string }> }
) {

const supabase = await createClient();

const { id } = await context.params;

/* GET INVITE */

const { data: invite } = await supabase
.from("company_invites")
.select(`
id,
email,
role,
token,
companies(name)
`)
.eq("id", id)
.single();

if (!invite) {

return NextResponse.json(
{ error: "Invite not found" },
{ status: 404 }
);

}

/* INVITE LINK */

const inviteUrl =
`${process.env.NEXT_PUBLIC_SITE_URL}/invite/${invite.token}`;

/* SEND EMAIL */

await resend.emails.send({

from: "Stated <hello@stated.in>",

to: invite.email,

subject: `${invite.companies?.name || "Company"} invited you to manage their profile on Stated`,

html: `
<h2>You’ve been invited</h2>

<p>
<strong>${invite.companies?.name || "A company"}</strong>
invited you to help manage their profile on <strong>Stated</strong>.
</p>

<p>Your role: <b>${invite.role}</b></p>

<p>
<a href="${inviteUrl}" style="background:#2563eb;color:white;padding:10px 18px;border-radius:6px;text-decoration:none;">
Accept Invitation
</a>
</p>

<p>If the button doesn't work:</p>

<p>${inviteUrl}</p>
`

});

return NextResponse.json({
success: true
});

}
