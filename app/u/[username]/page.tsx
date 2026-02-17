export default async function PublicProfile(
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params;

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

      <p>Dynamic route is now working correctly.</p>
    </div>
  );
}
