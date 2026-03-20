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

    if (!viewerId && !sessionId) {
      return NextResponse.json({ error: "Session required" }, { status: 400 });
    }

    const sessionKey = viewerId ? null : sessionId;

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

    /* INSERT VIEW — using dedup function (one DB call instead of two) */
    if (type === "commitment") {

      const { data: inserted } = await supabase.rpc("insert_commitment_view", {
        p_commitment_id: entityId,
        p_viewer_id: viewerId,
        p_session_key: sessionKey,
      });

      // If false — already viewed in last 24hrs, skip everything
      if (!inserted) {
        return NextResponse.json({ success: true });
      }

      /* INCREMENT CACHED VIEW COUNTER */
      const { error: viewIncrementError } = await supabase.rpc(
        "increment_commitment_views",
        { commitment_id_input: entityId }
      );

      if (viewIncrementError) {
        console.error("View counter increment failed:", viewIncrementError);
      }

      /* ENGAGEMENT MILESTONE NOTIFICATIONS */
      const { count } = await supabase
        .from("commitment_views")
        .select("*", { count: "exact", head: true })
        .eq("commitment_id", entityId);

      const views = count ?? 0;
      const milestones = [50, 100, 500, 1000];

      if (milestones.includes(views)) {

        const { data: commitment } = await supabase
          .from("commitments")
          .select("id, text, user_id, company_id")
          .eq("id", entityId)
          .maybeSingle();

        if (commitment) {

          let ownerUserId = commitment.user_id;

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

    } else {

      /* PROFILE VIEW — using dedup function */
      const { data: inserted } = await supabase.rpc("insert_profile_view", {
        p_profile_id: entityId,
        p_viewer_id: viewerId,
        p_session_key: sessionKey,
      });

      if (!inserted) {
        return NextResponse.json({ success: true });
      }

    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Tracking failed:", err);
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 });
  }
}
