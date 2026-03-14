import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {

try {

const { type, entityId, sessionId } = await req.json();

if (!type || !entityId) {
return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}

const supabase = await createClient();

const {
data: { user },
} = await supabase.auth.getUser();

const viewerId = user?.id ?? null;

/* REQUIRE SESSION FOR ANONYMOUS */

if (!viewerId && !sessionId) {
return NextResponse.json({ error: "Session required" }, { status: 400 });
}

const sessionKey = viewerId ? null : sessionId;

const table =
type === "profile" ? "profile_views" : "commitment_views";

const column =
type === "profile" ? "profile_id" : "commitment_id";

/* PREVENT SELF PROFILE VIEW */

if (viewerId && type === "profile" && viewerId === entityId) {
return NextResponse.json({ success: true });
}

/* PREVENT SELF COMMITMENT VIEW */

if (viewerId && type === "commitment") {

const { data: commitment } = await supabase
.from("commitments")
.select("user_id, company_id, created_by_user_id")
.eq("id", entityId)
.maybeSingle();

if (
commitment &&
(commitment.user_id === viewerId ||
commitment.created_by_user_id === viewerId)
) {
return NextResponse.json({ success: true });
}

}

/* CHECK EXISTING VIEW (24h) */

const { data: existing } = await supabase
.from(table)
.select("id")
.eq(column, entityId)
.eq(viewerId ? "viewer_id" : "session_key", viewerId ?? sessionKey)
.gte(
"created_at",
new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
)
.maybeSingle();

if (existing) {
return NextResponse.json({ success: true });
}

/* INSERT VIEW */

await supabase
.from(table)
.insert({
[column]: entityId,
viewer_id: viewerId,
session_key: sessionKey,
})
.throwOnError();

/* ============================= */
/* ENGAGEMENT MILESTONE LOGIC */
/* ============================= */

if (type === "commitment") {

const { count } = await supabase
.from("commitment_views")
.select("*", { count: "exact", head: true })
.eq("commitment_id", entityId);

const views = count ?? 0;

/* VIEW MILESTONES */

const milestones = [50, 100, 500, 1000];

if (milestones.includes(views)) {

const { data: commitment } = await supabase
.from("commitments")
.select("id, text, user_id, company_id")
.eq("id", entityId)
.maybeSingle();

if (!commitment) {
return NextResponse.json({ success: true });
}

let ownerUserId = commitment.user_id;

/* COMPANY OWNER */

if (commitment.company_id) {

const { data: company } = await supabase
.from("companies")
.select("owner_user_id")
.eq("id", commitment.company_id)
.maybeSingle();

ownerUserId = company?.owner_user_id;

}

if (ownerUserId) {

const typeKey = `views_${views}`;

const { data: existingNotification } = await supabase
.from("notifications")
.select("id")
.eq("commitment_id", entityId)
.eq("notification_type", typeKey)
.limit(1);

if (!existingNotification || existingNotification.length === 0) {

await supabase.from("notifications").insert({
user_id: ownerUserId,
title: "👀 Your commitment is gaining attention",
message: `Your commitment reached ${views} views.`,
link: `/commitment/${entityId}`,
is_read: false,
notification_type: typeKey,
commitment_id: entityId,
});

}

}

}

}

return NextResponse.json({ success: true });

} catch (err) {

console.error("Tracking failed:", err);

return NextResponse.json(
{ error: "Tracking failed" },
{ status: 500 }
);

}

  }
