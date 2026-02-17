"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Dashboard() {

  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);

  const [profile, setProfile] = useState({
    full_name: "",
    bio: "",
    username: "",
    account_type: "individual",
    credits: 1
  });

  const [commitments, setCommitments] = useState<any[]>([]);

  const BIO_LIMIT = 300;

  useEffect(() => {
    load();
  }, []);

  async function load() {

    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/login");
      return;
    }

    setUser(data.user);

    loadProfile(data.user.id);
    loadCommitments(data.user.id);

  }

  async function loadProfile(id:string) {

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();

    if (data) setProfile(data);

  }

  async function loadCommitments(id:string) {

    const { data } = await supabase
      .from("commitments")
      .select("*")
      .eq("user_id", id)
      .order("created_at", { ascending:false });

    if (data) setCommitments(data);

  }

  async function saveProfile() {

    await supabase
      .from("profiles")
      .update(profile)
      .eq("id", user.id);

    alert("Saved");

  }

  async function updateStatus(id:string, status:string) {

    let update:any = { status };

    if (status === "completed")
      update.completed_at = new Date();

    await supabase
      .from("commitments")
      .update(update)
      .eq("id", id);

    loadCommitments(user.id);

  }

  async function logout() {

    await supabase.auth.signOut();
    router.push("/");

  }

  return (

    <div className="max-w-xl mx-auto p-4">

      {/* Logo */}
      <div className="text-3xl font-bold text-blue-600 mb-6">
        Stated
      </div>

      {/* Profile Card */}
      <div className="border rounded-xl p-4 mb-6">

        <div className="font-semibold text-lg mb-2">
          {profile.full_name || "No name set"}
        </div>

        <div className="text-gray-600 mb-3">
          {profile.bio || "No bio added"}
        </div>

        <div className="text-sm mb-3">
          Public URL:
          <br />
          <span className="font-semibold">
            stated.app/u/{profile.username}
          </span>
        </div>

        <div className="flex gap-2 flex-wrap">

          <button
            onClick={()=>router.push("/dashboard/profile")}
            className="border px-3 py-1 rounded-lg"
          >
            Edit profile
          </button>

          <button
            onClick={()=>router.push(`/u/${profile.username}`)}
            className="border px-3 py-1 rounded-lg"
          >
            Public profile
          </button>

          <button
            onClick={()=>router.push("/upgrade")}
            className="border px-3 py-1 rounded-lg"
          >
            Upgrade
          </button>

        </div>

      </div>

      {/* Credits */}
      <div className="mb-4">
        Credits remaining: {profile.credits || 1}
      </div>

      {/* Create */}
      <button
        onClick={()=>router.push("/dashboard/create")}
        className="w-full bg-blue-600 text-white py-3 rounded-full mb-6"
      >
        Create Commitment
      </button>

      {/* Commitments */}
      <div className="text-lg mb-4">
        Your commitments
      </div>

      {commitments.map(c=>(

        <div key={c.id} className="border rounded-xl p-4 mb-4">

          <div className="font-medium mb-2">
            {c.text}
          </div>

          {c.status === "completed" ? (

            <div className="text-green-600 font-semibold mb-2">
              Completed ✓
            </div>

          ) : (

            <select
              value={c.status}
              onChange={e=>updateStatus(c.id, e.target.value)}
              className="border p-2 rounded-lg"
            >

              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="withdrawn">Withdrawn</option>
              <option value="completed">Completed</option>

            </select>

          )}

          {c.completed_at && (

            <div className="text-sm text-gray-500 mt-2">
              Completed on {new Date(c.completed_at).toLocaleDateString()}
            </div>

          )}

        </div>

      ))}

      {/* Logout */}
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>

  );

}
