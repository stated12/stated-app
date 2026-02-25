export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AccountPage({
  searchParams,
}: {
  searchParams?: { success?: string; error?: string };
}) {
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

        {/* SUCCESS MESSAGE */}
        {searchParams?.success && (
          <div className="bg-green-100 text-green-700 text-sm p-3 rounded-lg">
            {searchParams.success}
          </div>
        )}

        {/* ERROR MESSAGE */}
        {searchParams?.error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded-lg">
            {searchParams.error}
          </div>
        )}

        {/* EMAIL */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="font-semibold mb-2">Email</div>
          <div className="text-sm text-gray-600">{user.email}</div>
        </div>

        {/* CHANGE PASSWORD */}
        <div className="bg-white rounded-xl shadow p-5">
          <div className="font-semibold mb-4">Change Password</div>

          <form action="/account/password" method="POST" className="space-y-4">
            <input
              type="password"
              name="password"
              required
              minLength={8}
              placeholder="New password"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            <input
              type="password"
              name="confirm_password"
              required
              minLength={8}
              placeholder="Confirm new password"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />

            <div className="text-xs text-gray-400">
              Password must be at least 8 characters and include uppercase,
              lowercase and a number.
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* DELETE ACCOUNT */}
        <div className="bg-white rounded-xl shadow p-5 border border-red-200">
          <div className="font-semibold text-red-600 mb-2">
            Delete Account
          </div>

          <div className="text-sm text-gray-600 mb-4">
            This action permanently deletes your profile, commitments, and data.
          </div>

          <form action="/account/delete" method="POST">
            <button
              type="submit"
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
            >
              Delete Account Permanently
            </button>
          </form>
        </div>

        <Link href="/dashboard" className="text-sm text-blue-600">
          ← Back to dashboard
        </Link>

      </div>
    </div>
  );
}
