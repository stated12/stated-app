export default function PublicProfile(
  { params }: { params: { username: string } }
) {
  const username = params?.username;

  if (!username) {
    return (
      <div style={{ padding: "40px" }}>
        <h1>User not found</h1>
        <p>No username provided.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Public Profile</h1>

      <p>
        <strong>Username:</strong> {username}
      </p>

      <p>Public profile route is working correctly.</p>
    </div>
  );
}
