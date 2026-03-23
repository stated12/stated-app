export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import PasswordForm from "./PasswordForm";
import DeleteAccountForm from "./DeleteAccountForm";

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <div style={{ minHeight: "100vh", background: "#f2f3f7", padding: "24px 16px 60px" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#4338ca,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke="#fff" strokeWidth="1.5"/><path d="M9 2v2M9 14v2M2 9h2M14 9h2M4.1 4.1l1.4 1.4M12.5 12.5l1.4 1.4M4.1 13.9l1.4-1.4M12.5 5.5l1.4-1.4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/></svg>
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f0c29", margin: 0 }}>Account Settings</h1>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Email card */}
          <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #f0f1f6", boxShadow: "0 1px 8px rgba(0,0,0,0.04)", overflow: "hidden" }}>
            <div style={{ height: 3, background: "linear-gradient(90deg,#4338ca,#818cf8)" }} />
            <div style={{ padding: "16px 20px" }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Email Address</div>
              <div style={{ fontSize: 14, color: "#0f0c29", fontWeight: 500, background: "#f8f9fc", borderRadius: 10, padding: "10px 12px", border: "1px solid #f0f1f6" }}>
                {user.email}
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 6 }}>To change your email, contact support.</div>
            </div>
          </div>

          {/* Password form */}
          <PasswordForm />

          {/* Delete account form */}
          <DeleteAccountForm />

        </div>

        <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 20, fontSize: 13, color: "#4338ca", textDecoration: "none", fontWeight: 600 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          Back to dashboard
        </Link>

      </div>
    </div>
  );
}
