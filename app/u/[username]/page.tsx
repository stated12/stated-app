import { createClient } from "@/lib/supabase/server";

export default async function PublicProfile(
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const supabase = await createClient();

  // Get profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, display_name, bio, website")
    .eq("username", username)
    .maybeSingle();

  if (!profile) {
    return (
      <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
        User not found
      </div>
    );
  }

  // Get commitments
  const { data: commitments } = await supabase
    .from("commitments")
    .select("id, text, status")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  return (
    <div style={{
      fontFamily: "sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px"
    }}>

      {/* Logo */}
      <div style={{
        fontWeight: "600",
        fontSize: "20px",
        marginBottom: "30px"
      }}>
        ✔ Stated
      </div>

      {/* Profile Info */}
      <div style={{ marginBottom: "30px" }}>

        <div style={{
          fontSize: "28px",
          fontWeight: "600"
        }}>
          {profile.display_name}
        </div>

        {profile.bio && (
          <div style={{
            marginTop: "10px",
            color: "#555",
            fontSize: "16px"
          }}>
            {profile.bio}
          </div>
        )}

        {profile.website && (
          <a
            href={profile.website}
            target="_blank"
            style={{
              display: "block",
              marginTop: "10px",
              color: "#2563eb",
              textDecoration: "none"
            }}
          >
            {profile.website}
          </a>
        )}

      </div>

      {/* Commitments */}
      <div>

        <div style={{
          fontWeight: "600",
          marginBottom: "10px"
        }}>
          Commitments
        </div>

        {!commitments || commitments.length === 0 ? (
          <div style={{ color: "#777" }}>
            No commitments yet.
          </div>
        ) : (
          commitments.map((c) => (
            <div
              key={c.id}
              style={{
                padding: "14px",
                border: "1px solid #e5e5e5",
                borderRadius: "8px",
                marginBottom: "10px",
                background: "#fff"
              }}
            >
              <div style={{ fontSize: "16px" }}>
                {c.text}
              </div>

              <div style={{
                fontSize: "12px",
                color: c.status === "active" ? "#16a34a" : "#666",
                marginTop: "4px"
              }}>
                {c.status}
              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}
