"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  username: string;
  display_name: string;
  bio: string | null;
  website: string | null;
  avatar_url: string | null;
  credits: number;
};

export default function UserPage() {

  const params = useParams();
  const supabase = createClient();

  const username = String(params.username);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadProfile() {

      if (!username) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      if (error) {
        console.log("Supabase error:", error);
      }

      if (data) {
        setProfile(data);
      }

      setLoading(false);
    }

    loadProfile();

  }, [username]);

  if (loading)
    return (
      <div style={styles.center}>
        Loading profile...
      </div>
    );

  if (!profile)
    return (
      <div style={styles.center}>
        Profile not found
      </div>
    );

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

      </div>

      {/* SAFE commitments placeholder */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>
          Commitments
        </h2>

        <div style={styles.card}>
          No commitments yet.
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
  },

  header: {
    textAlign: "center",
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
    marginTop: 40,
  },

  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
  },

  card: {
    padding: 16,
    border: "1px solid #eee",
    borderRadius: 8,
  },

};
