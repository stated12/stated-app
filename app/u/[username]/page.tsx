                                                                                                        }, [username]);
import { notFound } from "next/navigation";

export default async function PublicProfile({ params }) {
  const { username } = params;

  // Temporary mock (replace later with DB)
  if (!username) return notFound();

  return (
    <div style={{ padding: 20 }}>
      <h1>{username}'s commitments</h1>

      <div style={{ marginTop: 20 }}>
        <div style={{
          border: "1px solid #ddd",
          padding: 15,
          borderRadius: 8
        }}>
          Run 5 kms daily
        </div>
      </div>
    </div>
  );
}
                                                                                                          if (error) {
                                                                                                              return (
                                                                                                                    <div style={{ padding: 24 }}>
                                                                                                                            <h1>Database Error</h1>
                                                                                                                                    <pre>{JSON.stringify(error, null, 2)}</pre>
                                                                                                                                          </div>
                                                                                                                                              );
                                                                                                                                                }

                                                                                                                                                  if (!profile) {
                                                                                                                                                      return (
                                                                                                                                                            <div style={{ padding: 24 }}>
                                                                                                                                                                    <h1>User not found</h1>
                                                                                                                                                                            <p>Searching for: {username}</p>
                                                                                                                                                                                  </div>
                                                                                                                                                                                      );
                                                                                                                                                                                        }

                                                                                                                                                                                          return (
                                                                                                                                                                                              <div style={{ padding: 24 }}>
                                                                                                                                                                                                    <h1>Public Profile</h1>
                                                                                                                                                                                                          <p><strong>Username:</strong> {profile.username}</p>
                                                                                                                                                                                                                <p><strong>Display Name:</strong> {profile.display_name}</p>
                                                                                                                                                                                                                      <p><strong>Created At:</strong> {profile.created_at}</p>
                                                                                                                                                                                                                          </div>
                                                                                                                                                                                                                            );
                                                                                                                                                                                                                            }
