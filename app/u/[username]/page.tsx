"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  username: string;
  display_name: string | null;
  bio: string | null;
  website: string | null;
  avatar_url: string | null;
  credits: number | null;
};

export default function UserPage({ params }: { params: { username: string } }) {

  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      console.log("Loading username:", params.username);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", params.username)
        .single();

      console.log("Supabase result:", data, error);

      if (data) {
        setProfile(data);
      }

      setLoading(false);
    }

    load();

  }, [params.username]);

  if (loading) {
    return (
      <div style={styles.center}>
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={styles.center}>
        Profile not found
      </div>
    );
  }

  return (
    <div style={styles.container}>

      <div style={styles.brand}>
        Stated
      </div>

      <div style={styles.header}>

        <div style={styles.avatar}>
          {(profile.display_name || profile.username).charAt(0)}
        </div>

        <h1 style={styles.name}>
          {profile.display_name || profile.username}
        </h1>

        <div style={styles.username}>
          @{profile.username}
        </div>

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
    fontWeight: "600",
    marginBottom: "24px",
  },

  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
  },

  header: {
    textAlign: "center" as const,
    marginBottom: "40px",
  },

  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#111",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px auto",
    fontSize: "32px",
  },

  name: {
    fontSize: "24px",
    margin: 0,
  },

  username: {
    opacity: 0.6,
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
