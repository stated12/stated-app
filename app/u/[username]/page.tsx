export const dynamic = "force-dynamic";

export default function TestPage({
  params,
}: {
  params: { username: string };
}) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Username param:</h1>
      <pre>{JSON.stringify(params)}</pre>
    </div>
  );
}
