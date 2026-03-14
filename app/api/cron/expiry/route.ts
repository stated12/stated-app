import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {

  // =====================================
  // CRON SECURITY
  // =====================================
  const auth = req.headers.get("authorization");

  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();

  const now = new Date();
  const nowTs = now.getTime();

  const threeDaysAhead = new Date(now);
  threeDaysAhead.setDate(now.getDate() + 3);

  const oneDayAhead = new Date(now);
  oneDayAhead.setDate(now.getDate() + 1);

  const threeDaysTs = threeDaysAhead.getTime();
  const oneDayTs = oneDayAhead.getTime();

  // =====================================
  // FETCH ONLY COMMITMENTS EXPIRING SOON
  // =====================================
  const { data: commitments, error } = await supabase
    .from("commitments")
    .select("id, user_id, company_id, text, end_date, status")
    .eq("status", "active")
    .not("end_date", "is", null)
    .lte("end_date", threeDaysAhead.toISOString());

  if (error || !commitments) {
    return NextResponse.json({ message: "No commitments found" });
  }

  for (const commitment of commitments) {

    const endDate = new Date(commitment.end_date).getTime();

    if (isNaN(endDate)) continue;

    // =====================================
    // DETERMINE OWNER (USER OR COMPANY)
    // =====================================

    let ownerUserIds: string[] = [];

    if (commitment.user_id) {
      ownerUserIds.push(commitment.user_id);
    }

    if (commitment.company_id) {

      const { data: company } = await supabase
        .from("companies")
        .select("owner_user_id")
        .eq("id", commitment.company_id)
        .maybeSingle();

      if (company?.owner_user_id) {
        ownerUserIds.push(company.owner_user_id);
      }
    }

    if (ownerUserIds.length === 0) continue;

    // =====================================
    // 3 DAY REMINDER
    // =====================================

    if (endDate <= threeDaysTs && endDate > oneDayTs) {

      for (const userId of ownerUserIds) {

        await createNotificationIfNotExists(
          supabase,
          commitment,
          userId,
          "expiry_3_day",
          "Deadline approaching",
          "Only 3 days left to complete your commitment."
        );

      }

    }

    // =====================================
    // 1 DAY REMINDER
    // =====================================

    if (endDate <= oneDayTs && endDate > nowTs) {

      for (const userId of ownerUserIds) {

        await createNotificationIfNotExists(
          supabase,
          commitment,
          userId,
          "expiry_1_day",
          "Final reminder",
          "Only 1 day left before your deadline."
        );

      }

    }

    // =====================================
    // EXPIRED
    // =====================================

    if (endDate <= nowTs) {

      await supabase
        .from("commitments")
        .update({
          status: "expired",
          updated_at: new Date().toISOString(),
        })
        .eq("id", commitment.id)
        .eq("status", "active");

      for (const userId of ownerUserIds) {

        await createNotificationIfNotExists(
          supabase,
          commitment,
          userId,
          "expired",
          "Commitment expired",
          "Your commitment has passed its deadline."
        );

      }

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
    .eq("user_id", userId)
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
