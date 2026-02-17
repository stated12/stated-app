// production profile UI v1
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default async function PublicProfile(
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

  const supabase = createClient();

  /* ================= CURRENT USER ================= */

  const {
    data: { user }
  } = await supabase.auth.getUser();

  /* ================= PROFILE ================= */

  const { data: profile } = await supabase
    .from("profiles")
    .select(`
      id,
      username,
      display_name,
      bio,
      website,
      avatar_url
    `)
    .eq("username", username)
    .maybeSingle();

  if (!profile) {
    return (
      <div style={styles.center}>
        User not found
      </div>
    );
  }

  const isOwner = user?.id === profile.id;

  /* ================= COMMITMENTS ================= */

  const { data: commitments } = await supabase
    .from("commitments")
    .select(`
      id,
      text,
      status,
      created_at
    `)
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false });

  /* ================= AVATAR ================= */

  const avatarLetter =
    profile.display_name?.charAt(0)?.toUpperCase() || "?";

  /* ================= UI ================= */

  return (
    <div style={styles.page}>

      {/* HEADER */}
      <div style={styles.header}>

        <Link href="/" style={styles.logo}>
          ✔ Stated
        </Link>

        {isOwner && (
          <Link href="/profile/edit">
            <button style={styles.editButton}>
              Edit profile
            </button>
          </Link>
        )}

      </div>

      {/* PROFILE CARD */}
      <div style={styles.profileCard}>

        {/* Avatar */}
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            style={styles.avatar}
          />
        ) : (
          <div style={styles.avatarFallback}>
            {avatarLetter}
          </div>
        )}

        {/* Name */}
        <div style={styles.name}>
          {profile.display_name}
        </div>

        {/* Username subtle */}
        <div style={styles.username}>
          @{profile.username}
        </div>

        {/* Bio */}
        {profile.bio && (
          <div style={styles.bio}>
            {profile.bio}
          </div>
        )}

        {/* Website */}
        {profile.website && (
          <a
            href={profile.website}
            target="_blank"
            style={styles.website}
          >
            {profile.website}
          </a>
        )}

        {/* Buttons */}
        <div style={styles.buttonRow}>

          {!isOwner && (
            <button style={styles.followButton}>
              Follow
            </button>
          )}

          {isOwner && (
            <Link href="/commitments/new">
              <button style={styles.primaryButton}>
                New commitment
              </button>
            </Link>
          )}

        </div>

      </div>

      {/* COMMITMENTS */}

      <div style={styles.section}>

        <div style={styles.sectionTitle}>
          Commitments
        </div>

        {!commitments || commitments.length === 0 ? (

          <div style={styles.emptyState}>
            No commitments yet.
          </div>

        ) : (

          commitments.map((c) => (

            <div key={c.id} style={styles.card}>

              <div style={styles.cardText}>
                {c.text}
              </div>

              <div style={{
                ...styles.status,
                color:
                  c.status === "active"
                    ? "#16a34a"
                    : c.status === "completed"
                    ? "#2563eb"
                    : "#6b7280"
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


/* ================= STYLES ================= */

const styles = {

  page: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Inter, sans-serif",
    maxWidth: "720px",
    margin: "0 auto",
    padding: "20px"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px"
  },

  logo: {
    fontSize: "22px",
    fontWeight: "700",
    textDecoration: "none",
    color: "#000"
  },

  editButton: {
    border: "1px solid #ddd",
    background: "#fff",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer"
  },

  profileCard: {
    marginBottom: "32px"
  },

  avatar: {
    width: "88px",
    height: "88px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "14px"
  },

  avatarFallback: {
    width: "88px",
    height: "88px",
    borderRadius: "50%",
    background: "#111",
    color: "#fff",
    fontSize: "34px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "14px"
  },

  name: {
    fontSize: "28px",
    fontWeight: "700"
  },

  username: {
    fontSize: "15px",
    color: "#666",
    marginTop: "2px"
  },

  bio: {
    marginTop: "10px",
    fontSize: "16px",
    color: "#444"
  },

  website: {
    display: "block",
    marginTop: "8px",
    color: "#2563eb",
    textDecoration: "none"
  },

  buttonRow: {
    marginTop: "14px",
    display: "flex",
    gap: "10px"
  },

  followButton: {
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    cursor: "pointer"
  },

  primaryButton: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    cursor: "pointer"
  },

  section: {},

  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "14px"
  },

  card: {
    border: "1px solid #e5e7eb",
    borderRadius: "14px",
    padding: "16px",
    marginBottom: "12px",
    background: "#fafafa"
  },

  cardText: {
    fontSize: "16px"
  },

  status: {
    marginTop: "6px",
    fontSize: "13px"
  },

  emptyState: {
    color: "#777"
  },

  center: {
    padding: "40px",
    fontSize: "18px"
  }

};
