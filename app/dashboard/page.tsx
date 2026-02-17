"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {

  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function getUser() {

      const { data } = await supabase.auth.getUser();

      setUser(data.user);
      setLoading(false);
    }

    getUser();

  }, []);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  if (!user) {
    return <div style={{ padding: 40 }}>Not logged in</div>;
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard</h1>

      <p>Welcome!</p>

      <p>Email: {user.email}</p>

    </div>
  );

}
