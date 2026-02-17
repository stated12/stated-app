// production profile UI v1

import { createClient } from "../../../lib/supabase/client";

export default async function PublicProfile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, display_name, bio, avatar_url, website")
    .eq("username", username)
    .single();

  if (!profile) {
    return (
      <div style={{ padding: 40 }}>
        <h2>User not found</h2>
      </div>
    );
  }

  const avatar =
    profile.avatar_url ||
    `https://api.dicebear.com/7.x/initials/svg?seed=${profile.display_name}`;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8fafc, #eef2ff)",
        fontFamily: "system-ui, -apple-system",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "white",
          padding: "16px 24px",
          borderBottom: "1px solid #e5e7eb",
          fontWeight: 600,
        }}
      >
        ✓ Stated
      </div>

      {/* Profile Card */}
      <div
        style={{
          maxWidth: 680,
          margin: "40px auto",
          background: "white",
          borderRadius: 16,
          padding: 32,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* Avatar */}
        <img
          src={avatar}
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            marginBottom: 16,
          }}
        />

        {/* Name */}
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>
          {profile.display_name}
        </h1>

        {/* Bio */}
        <p style={{ color: "#6b7280", marginBottom: 16 }}>
          {profile.bio || "No bio yet."}
        </p>

        {/* Website */}
        {profile.website && (
          <a
            href={profile.website}
            target="_blank"
            style={{ color: "#2563eb" }}
          >
            {profile.website}
          </a>
        )}

        {/* Commitments section placeholder */}
        <div style={{ marginTop: 32 }}>
          <h3>Commitments</h3>

          <div
            style={{
              padding: 16,
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              marginTop: 12,
            }}
          >
            No commitments yet.
          </div>
        </div>
      </div>
    </div>
  );
}
