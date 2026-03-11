export default function Page({
  params,
}: {
  params: { id: string };
}) {

  return (
    <div style={{padding:40}}>
      <h1>Commitment Page Debug</h1>

      <p>ID from URL:</p>

      <pre>{params.id}</pre>

    </div>
  );
}
