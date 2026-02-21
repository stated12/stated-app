"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  username: string;
  display_name: string;
  bio: string | null;
  website: string | null;
  avatar_url: string | null;
  credits: number;
};

type Commitment = {
  id: string;
  title: string;
  status: string;
  created_at: string;
};

export default function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createClient();

  const username = params.username;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      // Load profile
      const { data: profileData, error: profileError } =
        await supabase
          .from("profiles")
          .select(
            `
            username,
            display_name,
            bio,
            website,
            avatar_url,
            credits
            `
          )
          .eq("username", username)
          .maybeSingle();

      if (profileError) {
        console.error("PROFILE ERROR:", profileError);
      }

      setProfile(profileData);

      // Load commitments
      const { data: commitmentsData, error: commitmentsError } =
        await supabase
          .from("commitments")
          .select("*")
          .eq("username", username)
          .order("created_at", { ascending: false });

      if (commitmentsError) {
        console.error("COMMITMENTS ERROR:", commitmentsError);
      }

      setCommitments(commitmentsData || []);

      // Set page metadata
      if (profileData) {
        document.title = `${profileData.display_name} | Stated`;

        const meta = document.querySelector(
          "meta[name='description']"
        );

        if (meta) {
          meta.setAttribute(
            "content",
            profileData.bio ||
              "Public commitments and outcomes on Stated"
          );
        }
      }

      setLoading(false);
    }

    loadData();
  }, [username, supabase]);

  // Loading state
  if (loading)
    return (
      <div style={styles.center}>
        Loading profile...
      </div>
    );

  // Not found state
  if (!profile)
    return (
      <div style={styles.center}>
        Profile not found
      </div>
    );

  return (
    <div style={styles.container}>

      {/* Branding */}
      <div style={styles.brand}>
        Stated
      </div>

      {/* Profile Header */}
      <div style={styles.header}>

        <div style={styles.avatar}>
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              style={styles.avatarImg}
            />
          ) : (
            <span style={styles.avatarLetter}>
              {profile.display_name?.charAt(0)}
            </span>
          )}
        </div>

        <h1 style={styles.name}>
          {profile.display_name}
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
            style={styles.link}
          >
            {profile.website}
          </a>
        )}

      </div>

      {/* Commitments Section */}
      <div style={styles.section}>

        <h2>Commitments</h2>

        {commitments.length === 0 && (
          <div style={styles.empty}>
            No commitments yet.
          </div>
        )}

        {commitments.map((c) => (
          <div key={c.id} style={styles.card}>

            <div style={styles.cardTitle}>
              {c.title}
            </div>

            <div style={styles.cardStatus}>
              {c.status}
            </div>

          </div>
        ))}

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

  empty: {
    opacity: 0.6,
    marginTop: 12,
  },

  card: {
    padding: 16,
    border: "1px solid #eee",
    borderRadius: 8,
    marginTop: 12,
  },

  cardTitle: {
    fontWeight: 600,
  },

  cardStatus: {
    opacity: 0.6,
    marginTop: 4,
  },

};
