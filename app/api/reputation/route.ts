import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const companyId = searchParams.get("companyId");

  const supabase = await createClient();

  let query = supabase
    .from("commitments")
    .select("status");

  if (companyId) {
    query = query.eq("company_id", companyId);
  } else if (userId) {
    query = query.eq("user_id", userId);
  } else {
    return NextResponse.json(null);
  }

  const { data } = await query;

  const completed =
    data?.filter((c: any) => c.status === "completed").length ?? 0;

  const active =
    data?.filter((c: any) => c.status === "active").length ?? 0;

  const withdrawn =
    data?.filter((c: any) => c.status === "withdrawn").length ?? 0;

  const total = completed + active + withdrawn;

  const completionRate =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  let bonus = 0;

  if (completionRate >= 80) bonus = 10;
  else if (completionRate >= 60) bonus = 5;

  const score =
    completed * 10 +
    active * 2 -
    withdrawn * 3 +
    bonus;

  let badge = "Beginner";

  if (score >= 200) badge = "Trusted";
  else if (score >= 100) badge = "Leader";
  else if (score >= 50) badge = "Operator";
  else if (score >= 20) badge = "Builder";

  return NextResponse.json({
    score,
    badge,
    completionRate,
    completed,
    active,
    withdrawn,
  });
}
