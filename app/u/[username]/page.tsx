"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("profiles")
        .select("username, display_name, bio, credits")
        .eq("username", params.username)
        .maybeSingle();

      if (error) {
        setError(error);
      } else {
        setProfile(data);
      }
    }

    loadProfile();
  }, [params.username]);

  if (error) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Error loading profile</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  if (!profile) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>{profile.display_name || profile.username}</h1>
      <p>@{profile.username}</p>
      <p>{profile.bio || "No bio yet"}</p>
      <p>Credits: {profile.credits}</p>
    </div>
  );
}
