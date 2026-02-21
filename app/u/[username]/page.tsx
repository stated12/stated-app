"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  bio: string | null;
  website: string | null;
  avatar_url: string | null;
};

type Commitment = {
  id: string;
  text: string;
  status: string;
  created_at: string;
  completed_at: string | null;
};

export default function UserPage() {

  const params = useParams();
  const supabase = createClient();

  const username = String(params.username);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadProfileAndCommitments() {

      setLoading(true);

      // STEP 1: Load profile
      const { data: profileData, error: profileError } = await supabase
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
        .single();

      if (profileError || !profileData) {
        setProfile(null);
        setLoading(false);
        return;
      }

      setProfile(profileData);

      // STEP 2: Load commitments
      const { data: commitmentsData } = await supabase
        .from("commitments")
        .select(`
          id,
          text,
          status,
          created_at,
          completed_at
        `)
        .eq("user_id", profileData.id)
        .eq("is_public", true)
        .order("created_at", { ascending: false });

      setCommitments(commitmentsData || []);

      setLoading(false);
    }

    if (username) {
      loadProfileAndCommitments();
    }

  }, [username]);

  if (loading)
    return <div style={styles.center}>Loading profile...</div>;

  if (!profile)
    return <div style={styles.center}>Profile not found</div>;

  return (
    <div style={styles.container}>

      <div style={styles.brand}>Stated</div>

      {/* PROFILE HEADER */}
      <div style={styles.header}>

        <div style={styles.avatar}>
          {profile.avatar_url ? (
            <img src={profile.avatar_url} style={styles.avatarImg} />
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
          <p style={styles.bio}>{profile.bio}</p>
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

      {/* COMMITMENTS SECTION */}
      <div style={styles.section}>

        <h2 style={styles.sectionTitle}>
          Commitments
        </h2>

        {commitments.length === 0 ? (
          <div style={styles.emptyCard}>
            No commitments yet.
          </div>
        ) : (
          commitments.map((c) => (
            <div key={c.id} style={styles.card}>

              <div style={styles.commitmentText}>
                {c.text}
              </div>

              <div style={styles.metaRow}>

                <span style={{
                  ...styles.status,
                  ...(c.status === "completed"
                    ? styles.completed
                    : styles.active)
                }}>
                  {c.status}
                </span>

                <span style={styles.date}>
                  {new Date(c.created_at).toLocaleDateString()}
                </span>

              </div>

            </div>
          ))
        )}

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
    marginBottom: 10,
  },

  bio: {
    marginTop: 10,
  },

  link: {
    color: "#2563eb",
    display: "block",
    marginTop: 8,
  },

  section: {
    marginTop: 30,
  },

  sectionTitle: {
    fontSize: 20,
    marginBottom: 12,
  },

  emptyCard: {
    border: "1px solid #eee",
    padding: 16,
    borderRadius: 8,
    opacity: 0.7,
  },

  card: {
    border: "1px solid #eee",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },

  commitmentText: {
    fontSize: 16,
    marginBottom: 8,
  },

  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: 14,
  },

  status: {
    padding: "2px 8px",
    borderRadius: 6,
    fontSize: 12,
  },

  active: {
    background: "#e0f2fe",
    color: "#0369a1",
  },

  completed: {
    background: "#dcfce7",
    color: "#166534",
  },

  date: {
    opacity: 0.6,
  },

};
