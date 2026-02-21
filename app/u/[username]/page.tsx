import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

type Profile = {
  username: string;
  display_name: string | null;
  bio: string | null;
  website: string | null;
  avatar_url: string | null;
  credits: number | null;
};

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {

  // FIX: must use await
  const supabase = await createClient();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(`
      username,
      display_name,
      bio,
      website,
      avatar_url,
      credits
    `)
    .eq("username", params.username)
    .single();

  if (error || !profile) {
    notFound();
  }

  return (
    <div style={styles.container}>

      <div style={styles.brand}>
        Stated
      </div>

      <div style={styles.header}>

        <div style={styles.avatar}>
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              style={styles.avatarImg}
              alt="avatar"
            />
          ) : (
            <span style={styles.avatarLetter}>
              {(profile.display_name || profile.username).charAt(0)}
            </span>
          )}
        </div>

        <h1 style={styles.name}>
          {profile.display_name || profile.username}
        </h1>

        <div style={styles.username}>
          @{profile.username}
        </div>

        {profile.bio && (
          <p style={styles.bio}>
            {profile.bio}
          </p>
        )}

        {profile.website && (
          <a
            href={profile.website}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >
            {profile.website}
          </a>
        )}

      </div>

      <div style={styles.section}>
        <h2>Commitments</h2>

        <div style={styles.card}>
          Commitments will appear here.
        </div>

      </div>

    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "24px",
    fontFamily: "system-ui",
  },

  brand: {
    fontSize: "20px",
    fontWeight: 600,
    marginBottom: "24px",
  },

  header: {
    textAlign: "center" as const,
    marginBottom: "40px",
  },

  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "40px",
    background: "#111",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px auto",
    overflow: "hidden",
  },

  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },

  avatarLetter: {
    fontSize: "32px",
  },

  name: {
    fontSize: "24px",
    margin: "0",
  },

  username: {
    opacity: 0.6,
    marginBottom: "12px",
  },

  bio: {
    marginBottom: "12px",
  },

  link: {
    color: "#2563eb",
  },

  section: {
    marginTop: "32px",
  },

  card: {
    padding: "16px",
    border: "1px solid #eee",
    borderRadius: "8px",
    marginTop: "12px",
  },
};
