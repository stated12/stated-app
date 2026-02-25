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
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirm_password") || "");

  // ✅ 1. Check match
  if (password !== confirmPassword) {
    return NextResponse.redirect(
      new URL(
        "/account?error=Passwords do not match",
        request.url
      )
    );
  }

  // ✅ 2. Length check
  if (password.length < 8) {
    return NextResponse.redirect(
      new URL(
        "/account?error=Password must be at least 8 characters",
        request.url
      )
    );
  }

  // ✅ 3. Strength check
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

  // ✅ 4. Update password
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return NextResponse.redirect(
      new URL(
        "/account?error=Password update failed",
        request.url
      )
    );
  }

  return NextResponse.redirect(
    new URL(
      "/account?success=Password updated successfully",
      request.url
    )
  );
}
