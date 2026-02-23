export const dynamic = "force-dynamic";

export default function UserPage(
  props: {
    params: { username: string };
  }
) {
  const username = props.params?.username;

  return (
    <div style={{ padding: 40 }}>
      <h1>Username param:</h1>
      <pre>{JSON.stringify(username)}</pre>
    </div>
  );
}
