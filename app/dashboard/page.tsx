           "use client";

import { useEffect, useState } from "react";
import { createClient } from "../../lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [commitments, setCommitments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {

    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      router.push("/login");
      return;
    }

    setUser(data.user);

    const { data: commitmentsData } = await supabase
      .from("commitments")
      .select("*")
      .eq("user_id", data.user.id)
      .order("created_at", { ascending: false });

    setCommitments(commitmentsData || []);
    setLoading(false);
  }

  function goCreate() {
    router.push("/dashboard/create");
  }

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>

      <h1>Dashboard</h1>

      <p>
        Logged in as: {user?.email}
      </p>

      <br />

      <button
        onClick={goCreate}
        style={{
          padding: "10px 16px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        Create Commitment
      </button>

      <br /><br />

      <h2>Your Commitments</h2>

      {commitments.length === 0 && (
        <p>No commitments yet</p>
      )}

      {commitments.map((c) => (
        <div key={c.id} style={{
          border: "1px solid #ddd",
          padding: 10,
          marginBottom: 10,
          borderRadius: 6
        }}>
          <p>{c.text}</p>
          <small>Status: {c.status}</small>
        </div>
      ))}

    </div>
  );
}                                                                                                                                                                           if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

                                                                                                                                                                                        return (
                                                                                                                                                                                            <div style={{ padding: 20 }}>

                                                                                                                                                                                                  <h1>Dashboard</h1>

                                                                                                                                                                                                        <p>Credits: <b>{credits}</b></p>

                                                                                                                                                                                                              <button onClick={goToCreate}>
                                                                                                                                                                                                                      Create Commitment
                                                                                                                                                                                                                            </button>

                                                                                                                                                                                                                                  <h2>Your Commitments</h2>

                                                                                                                                                                                                                                        {commitments.map((c) => (
                                                                                                                                                                                                                                                <div key={c.id}>
                                                                                                                                                                                                                                                          <p>{c.text}</p>
                                                                                                                                                                                                                                                                    <p>{c.duration_type}</p>
                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                  ))}

                                                                                                                                                                                                                                                                                      </div>
                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                        }
