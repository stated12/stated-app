export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import PasswordForm from "./PasswordForm";
import DeleteAccountForm from "./DeleteAccountForm";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-xl mx-auto space-y-8">

        <h1 className="text-2xl font-bold">Account Settings</h1>

        {/* EMAIL */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="font-semibold mb-2">Email</div>
          <div className="text-sm text-gray-600">{user.email}</div>
        </div>

        {/* CHANGE PASSWORD */}
        <PasswordForm />

        {/* SAFE DELETE ACCOUNT */}
        <DeleteAccountForm />

        <Link href="/dashboard" className="text-sm text-blue-600">
          ← Back to dashboard
        </Link>

      </div>
    </div>
  );
}
