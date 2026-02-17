export default function PublicProfile({ params }: { params: { username: string } }) {
  const username = params.username;

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h1>Public Profile</h1>

      <p>Username: {username}</p>

      <p>This confirms the public profile route is working.</p>
    </div>
  );
}
