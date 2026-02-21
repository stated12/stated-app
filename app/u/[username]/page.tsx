"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  id: string;
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

export default function UserPage() {

  const params = useParams();
  const supabase = createClient();

  const username = String(params.username);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadAll() {

      console.log("Fetching profile:", username);

      // STEP 1: fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (profileError || !profileData) {
        console.log("Profile error:", profileError);
        setLoading(false);
        return;
      }

      setProfile(profileData);

      console.log("Profile ID:", profileData.id);

      // STEP 2: fetch commitments using user_id
      const { data: commitmentsData, error: commitmentsError } = await supabase
        .from("commitments")
        .select("*")
        .eq("user_id", profileData.id)
        .eq("is_public", true)
        .order("created_at", { ascending: false });

      if (commitmentsError) {
        console.log("Commitments error:", commitmentsError);
      }

      if (commitmentsData) {
        setCommitments(commitmentsData);
      }

      setLoading(false);
    }

    if (username) {
      loadAll();
    }

  }, [username]);

  if (loading)
    return <div style={styles.center}>Loading profile...</div>;

  if (!profile)
    return <div style={styles.center}>Profile not found</div>;

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

      </div>

      {/* COMMITMENTS SECTION */}

      <div style={styles.section}>

        <h2>Commitments</h2>

        {commitments.length === 0 ? (

          <div style={styles.card}>
            No commitments yet.
          </div>

        ) : (

          commitments.map((c) => (
            <div key={c.id} style={styles.card}>
              <div style={styles.commitmentTitle}>
                {c.title}
              </div>

              <div style={styles.commitmentMeta}>
                {c.status}
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
  },

  bio: {
    marginTop: 12,
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

  commitmentTitle: {
    fontWeight: 600,
  },

  commitmentMeta: {
    opacity: 0.6,
    fontSize: 14,
    marginTop: 4,
  },

};
