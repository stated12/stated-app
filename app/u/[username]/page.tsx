export const dynamic = "force-dynamic";

export default async function UserPage(
  { params }: { params: Promise<{ username: string }> }
) {
  const resolvedParams = await params;

  return (
    <div style={{ padding: 40 }}>
      <h1>Username param:</h1>
      <pre>{JSON.stringify(resolvedParams)}</pre>
    </div>
  );
}
