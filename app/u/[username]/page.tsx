"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Profile = {
  username: string;
  display_name: string;
  bio: string | null;
};

export default function UserPage({ params }: { params: { username: string } }) {

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const load = async () => {

      const supabase = createClient();

      const { data, error } = await supabase
        .from("profiles")
        .select("username, display_name, bio")
        .eq("username", params.username)
        .single();

      console.log("DATA:", data);
      console.log("ERROR:", error);

      setProfile(data);
      setLoading(false);
    };

    load();

  }, [params.username]);

  if (loading) return <div>Loading...</div>;

  if (!profile) return <div>Profile not found</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{profile.display_name}</h1>
      <p>@{profile.username}</p>
      <p>{profile.bio}</p>
    </div>
  );
}
