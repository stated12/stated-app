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
  linkedin?: string | null;
  twitter?: string | null;
  github?: string | null;
  youtube?: string | null;
  instagram?: string | null;
};

type Commitment = {
  id: string;
  text: string;
  status: string;
  created_at: string;
};

export default function UserPage() {
  const params = useParams();
  const supabase = createClient();

  const username =
    typeof params?.username === "string"
      ? params.username
      : Array.isArray(params?.username)
      ? params.username[0]
      : null;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;

    async function load() {
      setLoading(true);

      const { data: profiles } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .limit(1);

      const profileData = profiles?.[0] ?? null;

      if (!profileData) {
        setProfile(null);
        setLoading(false);
        return;
      }

      setProfile(profileData);

      const { data: commitmentsData } = await supabase
        .from("commitments")
        .select("id, text, status, created_at")
        .eq("user_id", profileData.id)
        .eq("is_public", true)
        .order("created_at", { ascending: false });

      setCommitments(commitmentsData || []);
      setLoading(false);
    }

    load();
  }, [username]);

  if (loading)
    return <div style={styles.center}>Loading profile...</div>;

  if (!profile)
    return <div style={styles.center}>Profile not found</div>;

  function socialLink(label: string, value?: string | null) {
    if (!value) return null;

    const url =
      value.startsWith("http")
        ? value
        : `https://${value}`;

    return (
      <a
        key={label}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={styles.socialLink}
      >
        {label}
      </a>
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
              {(profile.display_name || profile.username).charAt(0)}
            </span>
          )}
        </div>

        <h1 style={styles.name}>
          {profile.display_name || profile.username}
          <span style={styles.star}> ★</span>
        </h1>

        <div style={styles.username}>
          @{profile.username}
        </div>

        {profile.bio && (
          <p style={styles.bio}>{profile.bio}</p>
        )}

        {profile.website && (
          <a
            href={
              profile.website.startsWith("http")
                ? profile.website
                : `https://${profile.website}`
            }
            target="_blank"
            rel="noopener noreferrer"
            style={styles.website}
          >
            {profile.website}
          </a>
        )}

        <div style={styles.socialContainer}>
          {socialLink("LinkedIn", profile.linkedin)}
          {socialLink("Twitter", profile.twitter)}
          {socialLink("GitHub", profile.github)}
          {socialLink("YouTube", profile.youtube)}
          {socialLink("Instagram", profile.instagram)}
        </div>
      </div>

      <div style={styles.section}>
        <h2>Commitments</h2>

        {commitments.length === 0 ? (
          <div style={styles.card}>
            No commitments yet.
          </div>
        ) : (
          commitments.map((c) => (
            <div key={c.id} style={styles.card}>
              <div style={{ fontSize: 16 }}>
                {c.text}
              </div>
              <div style={{ opacity: 0.6, fontSize: 14 }}>
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
    width: 90,
    height: 90,
    borderRadius: 45,
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
    fontSize: 36,
  },

  name: {
    fontSize: 24,
    margin: 0,
  },

  star: {
    color: "#2563eb",
    fontSize: 18,
  },

  username: {
    opacity: 0.6,
  },

  bio: {
    marginTop: 12,
  },

  website: {
    display: "block",
    marginTop: 10,
    color: "#2563eb",
    textDecoration: "none",
  },

  socialContainer: {
    marginTop: 12,
    display: "flex",
    justifyContent: "center",
    gap: 12,
    flexWrap: "wrap",
  },

  socialLink: {
    fontSize: 14,
    color: "#2563eb",
    textDecoration: "none",
  },

  section: {
    marginTop: 30,
  },

  card: {
    border: "1px solid #eee",
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
};
