"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function UserPage({ params }: { params: { username: string } }) {

  const [profiles, setProfiles] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function load() {

      const supabase = createClient();

      const { data, error } = await supabase
        .from("profiles")
        .select("*");

      console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log("DATA:", data);
      console.log("ERROR:", error);

      setProfiles(data || []);
      setLoading(false);
    }

    load();

  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Debug Profiles</h1>

      {profiles.length === 0 && <div>NO PROFILES FOUND</div>}

      {profiles.map((p: any) => (
        <div key={p.username}>
          {p.username} — {p.display_name}
        </div>
      ))}
    </div>
  );
}
