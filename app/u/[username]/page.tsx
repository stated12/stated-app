export const dynamic = "force-dynamic";

import { createPublicClient } from "@/lib/supabase/public";

export default async function UserPage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createPublicClient();

  const cleanUsername = params.username?.trim().toLowerCase();

  const { data, error } = await supabase
    .from("profiles")
    .select("*");

  return (
    <div style={{ padding: 40 }}>
      <h1>DEBUG MODE</h1>
      <p>Username param: {cleanUsername}</p>
      <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </div>
  );
}
