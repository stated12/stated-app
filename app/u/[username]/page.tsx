import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

interface PageProps {
  params: {
    username: string;
  };
}

export default async function UserPage({ params }: PageProps) {
  const supabase = await createClient();

  const username = params?.username;

  console.log("PARAM USERNAME:", username);

  if (!username) {
    return <div>Username missing</div>;
  }

  // FETCH ALL PROFILES (DEBUG)
  const { data: allProfiles, error: allError } = await supabase
    .from("profiles")
    .select("id, username");

  console.log("ALL PROFILES:", allProfiles);
  console.log("ALL ERROR:", allError);

  // FETCH TARGET PROFILE
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .limit(1);

  console.log("TARGET PROFILE:", profile);
  console.log("TARGET ERROR:", error);

  if (!profile || profile.length === 0) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Profile not found (runtime)</h1>
        <p>Username param: {username}</p>
        <p>Check Vercel logs.</p>
      </div>
    );
  }

  const user = profile[0];

  const avatarUrl =
    user.avatar_url && user.avatar_url.startsWith("http")
      ? user.avatar_url
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.display_name || user.username
        )}&background=0D8ABC&color=fff`;

  return (
    <div style={{ padding: 40 }}>
      <h1>PROFILE FOUND</h1>
      <p>Username: {user.username}</p>
      <Image src={avatarUrl} alt="avatar" width={100} height={100} />
    </div>
  );
}
