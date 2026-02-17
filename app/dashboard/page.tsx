"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState<any>(null);
  const [credits, setCredits] = useState(0);
  const [commitments, setCommitments] = useState<any[]>([]);

  const [editingProfile, setEditingProfile] = useState(false);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [accountType, setAccountType] = useState("individual");

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {

    const { data } = await supabase.auth.getUser();

    if (!data?.user) {
      router.push("/login");
      return;
    }

    const userId = data.user.id;

    // Load profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (profileData) {
      setProfile(profileData);
      setFullName(profileData.full_name || "");
      setBio(profileData.bio || "");
      setAccountType(profileData.account_type || "individual");
    }

    // Load credits
    const { data: creditsData } = await supabase
      .from("credits")
      .select("credits_remaining")
      .eq("user_id", userId)
      .single();

    if (creditsData) {
      setCredits(creditsData.credits_remaining);
    }

    // Load commitments
    const { data: commitmentsData } = await supabase
      .from("commitments")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (commitmentsData) {
      setCommitments(commitmentsData);
    }

    setLoading(false);
  }

  async function saveProfile() {

    setSaving(true);
    setMessage("");

    const { data } = await supabase.auth.getUser();

    if (!data?.user) return;

    const userId = data.user.id;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        bio: bio,
        account_type: accountType
      })
      .eq("id", userId);

    if (error) {
      setMessage("Failed to save profile");
    } else {
      setMessage("Profile saved");
      setEditingProfile(false);
      loadDashboard();
    }

    setSaving(false);
  }

  async function updateStatus(commitmentId: string, status: string) {

    await supabase
      .from("commitments")
      .update({
        status,
        completed_at: status === "completed" ? new Date() : null
      })
      .eq("id", commitmentId);

    loadDashboard();
  }

  async function logout() {

    await supabase.auth.signOut();

    router.push("/login");
  }

  function goToCreate() {

    router.push("/dashboard/create");
  }

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        Loading...
      </div>
    );
  }

  return (

    <div style={{
      maxWidth: 700,
      margin: "0 auto",
      padding: 20
    }}>

      {/* LOGO HEADER */}

      <h1 style={{
        fontSize: 28,
        fontWeight: 700,
        color: "#2563eb",
        marginBottom: 20
      }}>
        Stated
      </h1>

      {/* PROFILE CARD */}

      <div style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        padding: 16,
        marginBottom: 20
      }}>

        {!editingProfile && profile && (

          <div>

            <div style={{ marginBottom: 6 }}>
              <strong>
                {profile.full_name || "No name set"}
              </strong>
            </div>

            <div style={{
              fontSize: 14,
              color: "#6b7280",
              marginBottom: 10
            }}>
              {profile.bio || "No bio added"}
            </div>

            <div style={{
              fontSize: 14,
              marginBottom: 10
            }}>
              Public URL:
              <br />
              <strong>
                stated.app/u/{profile.username}
              </strong>
            </div>

            <button
              onClick={() => setEditingProfile(true)}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid #2563eb",
                background: "white",
                color: "#2563eb",
                cursor: "pointer"
              }}
            >
              Edit profile
            </button>

          </div>
        )}

        {editingProfile && (

          <div>

            <div style={{ marginBottom: 10 }}>

              <label>Account type</label>

              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                style={{ width: "100%", padding: 8 }}
              >
                <option value="individual">Individual</option>
                <option value="company">Company</option>
              </select>

            </div>

            <div style={{ marginBottom: 10 }}>

              <label>Full name</label>

              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                maxLength={60}
                style={{ width: "100%", padding: 8 }}
              />

            </div>

            <div style={{ marginBottom: 10 }}>

              <label>Bio (max 300 characters)</label>

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={300}
                style={{ width: "100%", padding: 8 }}
              />

            </div>

            <button
              onClick={saveProfile}
              disabled={saving}
              style={{
                padding: "8px 14px",
                background: "#2563eb",
                color: "white",
                borderRadius: 6,
                border: "none",
                cursor: "pointer"
              }}
            >
              Save
            </button>

            {message && (
              <div style={{ marginTop: 10 }}>
                {message}
              </div>
            )}

          </div>

        )}

      </div>

      {/* CREDITS */}

      <div style={{ marginBottom: 20 }}>

        Credits remaining: <strong>{credits}</strong>

      </div>

      {/* CREATE BUTTON */}

      <button
        onClick={goToCreate}
        style={{
          width: "100%",
          padding: 12,
          background: "#2563eb",
          color: "white",
          borderRadius: 999,
          border: "none",
          fontSize: 16,
          marginBottom: 30,
          cursor: "pointer"
        }}
      >
        Create Commitment
      </button>

      {/* COMMITMENTS */}

      <h2 style={{ marginBottom: 10 }}>
        Your commitments
      </h2>

      {commitments.map((c) => (

        <div key={c.id}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 12,
            marginBottom: 12
          }}
        >

          <div style={{ marginBottom: 8 }}>
            {c.text}
          </div>

          <div style={{
            fontSize: 14,
            marginBottom: 10
          }}>
            Status: <strong>{c.status}</strong>
          </div>

          {c.status !== "completed" && c.status !== "withdrawn" && (

            <select
              value={c.status}
              onChange={(e) =>
                updateStatus(c.id, e.target.value)
              }
              style={{ padding: 6 }}
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
              <option value="withdrawn">Withdrawn</option>
            </select>

          )}

        </div>

      ))}

      {/* LOGOUT */}

      <button
        onClick={logout}
        style={{
          marginTop: 30,
          padding: 10,
          background: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: 6,
          cursor: "pointer"
        }}
      >
        Logout
      </button>

    </div>

  );

              }
