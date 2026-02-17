"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type Commitment = {
  id: string;
  text: string;
  status: "active" | "paused" | "withdrawn" | "completed";
  created_at: string;
  completed_at?: string;
  proof_url?: string;
};

export default function DashboardPage() {
  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState({
    account_type: "individual",
    full_name: "",
    bio: "",
    username: "",
  });

  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [bioCount, setBioCount] = useState(0);
  const BIO_LIMIT = 300;

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setUser(user);

    loadProfile(user.id);
    loadCommitments(user.id);
  }

  async function loadProfile(userId: string) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (data) {
      setProfile(data);
      setBioCount(data.bio?.length || 0);
    }
  }

  async function loadCommitments(userId: string) {
    const { data } = await supabase
      .from("commitments")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data) setCommitments(data);
  }

  async function saveProfile() {
    await supabase.from("profiles").update(profile).eq("id", user.id);
    alert("Profile saved");
  }

  async function updateStatus(id: string, status: string) {
    const updateData: any = { status };

    if (status === "completed") {
      updateData.completed_at = new Date().toISOString();
    }

    await supabase
      .from("commitments")
      .update(updateData)
      .eq("id", id);

    loadCommitments(user.id);
  }

  async function saveProof(id: string, proof_url: string) {
    await supabase
      .from("commitments")
      .update({ proof_url })
      .eq("id", id);

    loadCommitments(user.id);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  return (
    <div className="max-w-xl mx-auto p-4">

      {/* Header */}
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Stated
      </h1>

      {/* Profile Card */}
      <div className="border rounded-xl p-4 mb-6">

        <label className="block text-sm mb-1">Account type</label>

        <select
          className="border rounded-lg p-2 w-full mb-4"
          value={profile.account_type}
          onChange={(e) =>
            setProfile({ ...profile, account_type: e.target.value })
          }
        >
          <option value="individual">Individual</option>
          <option value="company">Company</option>
        </select>

        <label className="block text-sm mb-1">Full name</label>

        <input
          className="border rounded-lg p-2 w-full mb-4"
          value={profile.full_name}
          onChange={(e) =>
            setProfile({ ...profile, full_name: e.target.value })
          }
        />

        <label className="block text-sm mb-1">
          Bio ({bioCount}/{BIO_LIMIT})
        </label>

        <textarea
          className="border rounded-lg p-2 w-full mb-2"
          maxLength={BIO_LIMIT}
          value={profile.bio}
          onChange={(e) => {
            setProfile({ ...profile, bio: e.target.value });
            setBioCount(e.target.value.length);
          }}
        />

        <div className="text-sm text-gray-500 mb-4">
          Public URL:
          <br />
          <strong>
            stated.app/u/{profile.username || "username"}
          </strong>
        </div>

        <button
          onClick={saveProfile}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Save profile
        </button>

      </div>

      {/* Create Commitment */}
      <button
        onClick={() => router.push("/dashboard/create")}
        className="w-full bg-blue-600 text-white py-3 rounded-full mb-6"
      >
        Create Commitment
      </button>

      {/* Commitments */}
      <h2 className="text-xl mb-4">Your commitments</h2>

      {commitments.map((c) => (

        <div
          key={c.id}
          className={`border rounded-xl p-4 mb-4 ${
            c.status === "completed"
              ? "border-green-500 bg-green-50"
              : ""
          }`}
        >

          <div className="font-medium mb-2">
            {c.text}
          </div>

          {/* Status badge */}
          {c.status === "completed" ? (
            <div className="text-green-600 font-semibold mb-2">
              COMPLETED ✓
            </div>
          ) : (
            <div className="text-gray-600 mb-2">
              Status: {c.status}
            </div>
          )}

          {/* Completion date */}
          {c.completed_at && (
            <div className="text-sm text-gray-500 mb-2">
              Completed on: {formatDate(c.completed_at)}
            </div>
          )}

          {/* Status selector */}
          {c.status !== "completed" && (
            <select
              value={c.status}
              onChange={(e) =>
                updateStatus(c.id, e.target.value)
              }
              className="border rounded-lg p-2 mb-2"
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="withdrawn">Withdrawn</option>
              <option value="completed">Completed</option>
            </select>
          )}

          {/* Proof section */}
          {c.status === "completed" && (
            <ProofSection
              commitment={c}
              saveProof={saveProof}
            />
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


/* Proof upload component */

function ProofSection({
  commitment,
  saveProof,
}: {
  commitment: Commitment;
  saveProof: any;
}) {
  const [proof, setProof] = useState(
    commitment.proof_url || ""
  );

  return (
    <div className="mt-3">

      <div className="text-sm mb-1">
        Add proof (optional)
      </div>

      <input
        type="text"
        placeholder="Paste proof URL"
        className="border rounded-lg p-2 w-full mb-2"
        value={proof}
        onChange={(e) => setProof(e.target.value)}
      />

      <button
        onClick={() =>
          saveProof(commitment.id, proof)
        }
        className="bg-green-600 text-white px-3 py-1 rounded-lg"
      >
        Save proof
      </button>

      {commitment.proof_url && (
        <div className="text-sm mt-2 text-blue-600">
          Proof saved ✓
        </div>
      )}

    </div>
  );
}
