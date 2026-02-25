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
  const confirmPassword = (formData.get("confirm_password") as string)?.trim();

  // ✅ Check empty
  if (!password || !confirmPassword) {
    return NextResponse.redirect(
      new URL("/account?error=All fields are required", request.url)
    );
  }

  // ✅ Check match
  if (password !== confirmPassword) {
    return NextResponse.redirect(
      new URL("/account?error=Passwords do not match", request.url)
    );
  }

  // ✅ Minimum length
  if (password.length < 8) {
    return NextResponse.redirect(
      new URL("/account?error=Password must be at least 8 characters", request.url)
    );
  }

  // ✅ Strength check
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

  if (!strongRegex.test(password)) {
    return NextResponse.redirect(
      new URL(
        "/account?error=Password must include uppercase, lowercase and a number",
        request.url
      )
    );
  }

  // 🔥 Update password
  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    console.error("Password update error:", error);
    return NextResponse.redirect(
      new URL("/account?error=Unable to update password", request.url)
    );
  }

  return NextResponse.redirect(
    new URL("/account?success=Password updated successfully", request.url)
  );
}
