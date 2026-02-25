import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const formData = await request.formData();
  const password = String(formData.get("password") || "");
  const confirmPassword = String(formData.get("confirm_password") || "");

  // ✅ Match check
  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "Passwords do not match" },
      { status: 400 }
    );
  }

  // ✅ Minimum length
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }

  // ✅ Strength validation
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

  if (!strongRegex.test(password)) {
    return NextResponse.json(
      {
        error:
          "Password must include uppercase, lowercase and a number",
      },
      { status: 400 }
    );
  }

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return NextResponse.json(
      { error: "Password update failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: "Password updated successfully",
  });
}
