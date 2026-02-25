import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const formData = await request.formData();
  const password = (formData.get("password") as string)?.trim();

  // ✅ Validation
  if (!password || password.length < 8) {
    return NextResponse.redirect(
      new URL("/account?error=Password must be at least 8 characters", request.url)
    );
  }

  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

  if (!strongRegex.test(password)) {
    return NextResponse.redirect(
      new URL(
        "/account?error=Password must include uppercase, lowercase and a number",
        request.url
      )
    );
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return NextResponse.redirect(
      new URL("/account?error=Unable to update password", request.url)
    );
  }

  return NextResponse.redirect(
    new URL("/account?success=Password updated successfully", request.url)
  );
}
