export const dynamic = "force-dynamic";

export default function Page({
  params,
}: {
  params: { id: string };
}) {

  const id = params?.id;

  return (
    <div style={{ padding: 40 }}>
      <h1>Commitment Page Debug</h1>

      <p>ID from URL:</p>

      <pre>{id}</pre>
    </div>
  );
}
