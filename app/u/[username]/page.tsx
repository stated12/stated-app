import { createClient } from "@/lib/supabase/server";

export default async function PublicProfile({ params }: { params: { username: string } }) {
  const supabase = await createClient();

  const username = params.username;

  // Fetch user profile
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("username, name, bio")
    .eq("username", username)
    .single();

  if (error || !profile) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>User not found</h1>
        <p>Searching for: {username}</p>
      </div>
    );
  }

  // Fetch commitments
  const { data: commitments } = await supabase
    .from("commitments")
    .select("text, status")
    .eq("username", username);

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "auto" }}>
      <h1>{profile.name || profile.username}</h1>

      {profile.bio && (
        <p style={{ marginBottom: "20px", color: "#666" }}>
          {profile.bio}
        </p>
      )}

      <h2>Commitments</h2>

      {commitments && commitments.length > 0 ? (
        commitments.map((c, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "10px"
            }}
          >
            {c.text}
          </div>
        ))
      ) : (
        <p>No commitments yet.</p>
      )}
    </div>
  );
}
