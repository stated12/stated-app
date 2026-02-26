import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const now = new Date();
  const threeDaysFromNow = new Date(now);
  threeDaysFromNow.setDate(now.getDate() + 3);

  const oneDayFromNow = new Date(now);
  oneDayFromNow.setDate(now.getDate() + 1);

  // 1️⃣ GET ACTIVE COMMITMENTS
  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, user_id, text, end_date, status")
    .eq("status", "active");

  if (!commitments || commitments.length === 0) {
    return NextResponse.json({ message: "No active commitments" });
  }

  for (const c of commitments) {
    const endDate = new Date(c.end_date);

    // ===============================
    // 🔔 3 DAY REMINDER
    // ===============================
    if (
      endDate <= threeDaysFromNow &&
      endDate > oneDayFromNow
    ) {
      await createNotificationIfNotExists(
        supabase,
        c,
        "expiry_3_day",
        "Your commitment is ending soon",
        "Only 3 days remaining to complete it."
      );
    }

    // ===============================
    // 🔔 1 DAY REMINDER
    // ===============================
    if (
      endDate <= oneDayFromNow &&
      endDate > now
    ) {
      await createNotificationIfNotExists(
        supabase,
        c,
        "expiry_1_day",
        "Final reminder",
        "Only 1 day left before deadline."
      );
    }

    // ===============================
    // ⛔ EXPIRED
    // ===============================
    if (endDate <= now) {
      // Update status to expired
      await supabase
        .from("commitments")
        .update({
          status: "expired",
          updated_at: now.toISOString(),
        })
        .eq("id", c.id)
        .eq("status", "active");

      await createNotificationIfNotExists(
        supabase,
        c,
        "expired",
        "Commitment expired",
        "This commitment has passed its deadline."
      );
    }
  }

  return NextResponse.json({ message: "Expiry job executed" });
}

// =====================================
// HELPER: PREVENT DUPLICATE NOTIFICATIONS
// =====================================
async function createNotificationIfNotExists(
  supabase: any,
  commitment: any,
  type: string,
  title: string,
  message: string
) {
  const { data: existing } = await supabase
    .from("notifications")
    .select("id")
    .eq("commitment_id", commitment.id)
    .eq("notification_type", type)
    .limit(1);

  if (existing && existing.length > 0) {
    return;
  }

  await supabase.from("notifications").insert({
    user_id: commitment.user_id,
    title,
    message,
    link: `/commitment/${commitment.id}`,
    is_read: false,
    notification_type: type,
    commitment_id: commitment.id,
  });
}
