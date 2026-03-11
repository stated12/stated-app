"use client";

import { useParams } from "next/navigation";

export default function Page() {

  const params = useParams();
  const id = params?.id;

  return (
    <div style={{ padding: 40 }}>
      <h1>Commitment Page Debug</h1>

      <p>ID from URL:</p>

      <pre>{String(id)}</pre>
    </div>
  );
}
