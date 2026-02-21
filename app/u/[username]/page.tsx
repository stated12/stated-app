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

      console.log("Fetching username:", username);

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (data) {
        setProfile(data);
      }

      setLoading(false);
    }

    if (username) {
      loadProfile();
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
  },

  avatarImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%",
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

};
