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

type Commitment = {
  id: string;
  title: string;
  status: string;
  created_at: string;
};

export default function UserPage() {

  const supabase = createClient();

  // Correct way to read username
  const params = useParams();
  const username = params?.username as string;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (!username) return;

    async function loadData() {

      console.log("USERNAME:", username);

      // Load profile
      const { data: profileData, error: profileError } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("username", username)
          .single();

      console.log("PROFILE RESULT:", profileData, profileError);

      setProfile(profileData);

      // Load commitments
      const { data: commitmentsData } =
        await supabase
          .from("commitments")
          .select("*")
          .eq("username", username)
          .order("created_at", { ascending: false });

      setCommitments(commitmentsData || []);

      setLoading(false);
    }

    loadData();

  }, [username]);



  if (loading)
    return (
      <div style={styles.center}>
        Loading...
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
          {profile.display_name?.charAt(0)}
        </div>

        <h1 style={styles.name}>
          {profile.display_name}
        </h1>

        <div style={styles.username}>
          @{profile.username}
        </div>

        {profile.bio && (
          <p>{profile.bio}</p>
        )}

      </div>



      <div style={styles.section}>

        <h2>Commitments</h2>

        {commitments.length === 0 && (
          <div>No commitments yet</div>
        )}

        {commitments.map((c) => (
          <div key={c.id} style={styles.card}>
            {c.title}
          </div>
        ))}

      </div>

    </div>
  );
}



const styles = {

  container: {
    maxWidth: 600,
    margin: "0 auto",
    padding: 24,
  },

  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "60vh",
  },

  brand: {
    fontWeight: 600,
    marginBottom: 24,
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
    fontSize: 32,
  },

  name: {
    margin: 0,
  },

  username: {
    opacity: 0.6,
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
