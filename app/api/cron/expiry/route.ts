import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const now = new Date();
  const threeDaysAhead = new Date(now);
  threeDaysAhead.setDate(now.getDate() + 3);

  const oneDayAhead = new Date(now);
  oneDayAhead.setDate(now.getDate() + 1);

  // Get only ACTIVE commitments with end_date
  const { data: commitments, error } = await supabase
    .from("commitments")
    .select("id, user_id, company_id, text, end_date, status")
    .eq("status", "active")
    .not("end_date", "is", null);

  if (error || !commitments) {
    return NextResponse.json({ message: "No commitments found" });
  }

  for (const commitment of commitments) {
    const endDate = new Date(commitment.end_date);

    if (isNaN(endDate.getTime())) continue;

    const ownerUserId = commitment.user_id;

    // ==============================
    // 3 DAY REMINDER
    // ==============================
    if (
      endDate <= threeDaysAhead &&
      endDate > oneDayAhead
    ) {
      await createNotificationIfNotExists(
        supabase,
        commitment,
        ownerUserId,
        "expiry_3_day",
        "Deadline approaching",
        "Only 3 days left to complete your commitment."
      );
    }

    // ==============================
    // 1 DAY REMINDER
    // ==============================
    if (
      endDate <= oneDayAhead &&
      endDate > now
    ) {
      await createNotificationIfNotExists(
        supabase,
        commitment,
        ownerUserId,
        "expiry_1_day",
        "Final reminder",
        "Only 1 day left before your deadline."
      );
    }

    // ==============================
    // EXPIRED
    // ==============================
    if (endDate <= now) {
      // Update status only if still active
      await supabase
        .from("commitments")
        .update({
          status: "expired",
          updated_at: now.toISOString(),
        })
        .eq("id", commitment.id)
        .eq("status", "active");

      await createNotificationIfNotExists(
        supabase,
        commitment,
        ownerUserId,
        "expired",
        "Commitment expired",
        "Your commitment has passed its deadline."
      );
    }
  }

  return NextResponse.json({ success: true });
}

// =====================================
// PREVENT DUPLICATE NOTIFICATIONS
// =====================================
async function createNotificationIfNotExists(
  supabase: any,
  commitment: any,
  userId: string,
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

  if (existing && existing.length > 0) return;

  await supabase.from("notifications").insert({
    user_id: userId,
    title,
    message,
    link: `/commitment/${commitment.id}`,
    is_read: false,
    notification_type: type,
    commitment_id: commitment.id,
  });
}
