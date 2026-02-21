import { createClient } from "@/lib/supabase/server";

type Profile = {
  username: string;
  display_name: string;
  bio: string | null;
  website: string | null;
  avatar_url: string | null;
  credits: number;
};

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = await createClient();

  const cleanUsername = params.username.trim().toLowerCase();

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", cleanUsername)
    .single();

  console.log("PARAM:", params.username);
  console.log("CLEAN:", cleanUsername);
  console.log("RESULT:", profile);
  console.log("ERROR:", error);

  if (!profile) {
    return (
      <div style={styles.center}>
        Profile not found
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.brand}>Stated</div>

      <div style={styles.header}>
        <div style={styles.avatar}>
          {profile.avatar_url ? (
            <img src={profile.avatar_url} style={styles.avatarImg} />
          ) : (
            <span style={styles.avatarLetter}>
              {profile.display_name?.charAt(0)}
            </span>
          )}
        </div>

        <h1 style={styles.name}>{profile.display_name}</h1>

        <div style={styles.username}>
          @{profile.username}
        </div>

        {profile.bio && (
          <p style={styles.bio}>{profile.bio}</p>
        )}

        {profile.website && (
          <a href={profile.website} target="_blank" style={styles.link}>
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

const styles: any = {
  container: {
    maxWidth: 600,
    margin: "0 auto",
    padding: 24,
    fontFamily: "system-ui",
  },
  brand: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 24,
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
    fontFamily: "system-ui",
  },
  header: {
    textAlign: "center",
    marginBottom: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    objectFit: "cover",
  },
  avatarLetter: {
    fontSize: 32,
  },
  name: {
    fontSize: 24,
    margin: 0,
  },
  username: {
    opacity: 0.6,
    marginBottom: 12,
  },
  bio: {
    marginBottom: 12,
  },
  link: {
    color: "#2563eb",
  },
  section: {
    marginTop: 32,
  },
  card: {
    padding: 16,
    border: "1px solid #eee",
    borderRadius: 8,
    marginTop: 12,
  },
};
