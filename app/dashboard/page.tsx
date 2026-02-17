"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {

  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [userId, setUserId] = useState("");

  const [profile, setProfile] = useState<any>(null);

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [accountType, setAccountType] = useState("individual");

  const [commitments, setCommitments] = useState<any[]>([]);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {

    const { data: userData } = await supabase.auth.getUser();

    if (!userData?.user) {
      router.push("/login");
      return;
    }

    const uid = userData.user.id;
    setUserId(uid);

    // load profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", uid)
      .single();

    if (profileData) {

      setProfile(profileData);

      setFullName(profileData.full_name || "");
      setBio(profileData.bio || "");
      setAccountType(profileData.account_type || "individual");

    }

    // load credits
    const { data: creditData } = await supabase
      .from("credits")
      .select("credits_remaining")
      .eq("user_id", uid)
      .single();

    if (creditData) {
      setCredits(creditData.credits_remaining);
    }

    // load commitments
    const { data: commitmentData } = await supabase
      .from("commitments")
      .select("*")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });

    if (commitmentData) {
      setCommitments(commitmentData);
    }

    setLoading(false);
  }

  async function saveProfile() {

    if (!fullName) {
      alert("Enter full name");
      return;
    }

    setSaving(true);

    const username = fullName
      .toLowerCase()
      .replace(/\s+/g, "");

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        full_name: fullName,
        bio,
        account_type: accountType,
        username
      });

    if (error) {
      alert(error.message);
      setSaving(false);
      return;
    }

    alert("Profile saved");

    setSaving(false);

    loadDashboard();
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  function goCreate() {
    router.push("/dashboard/create");
  }

  if (loading) {
    return (
      <div style={{ padding: 40 }}>
        Loading dashboard...
      </div>
    );
  }

  const publicUrl =
    profile?.username
      ? `stated-app.vercel.app/u/${profile.username}`
      : "";

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 20,
        fontFamily: "system-ui"
      }}
    >

      {/* Identity */}

      <h1 style={{ fontSize: 28 }}>
        {fullName || "Your profile"}
      </h1>

      <p style={{ color: "#666" }}>
        This is your public commitment identity.
      </p>

      {publicUrl && (
        <div
          style={{
            marginTop: 10,
            marginBottom: 20,
            padding: 10,
            background: "#f4f4f4",
            borderRadius: 8
          }}
        >
          stated.app/{profile.username}
        </div>
      )}

      {/* Account Type */}

      <div style={{ marginTop: 20 }}>

        <label>Account type</label>

        <select
          value={accountType}
          onChange={(e) =>
            setAccountType(e.target.value)
          }
          style={{
            width: "100%",
            padding: 10,
            marginTop: 6
          }}
        >
          <option value="individual">
            Individual
          </option>

          <option value="company">
            Company
          </option>

        </select>

      </div>

      {/* Full Name */}

      <div style={{ marginTop: 20 }}>

        <label>Full name</label>

        <input
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
          style={{
            width: "100%",
            padding: 10,
            marginTop: 6
          }}
        />

      </div>

      {/* Bio */}

      <div style={{ marginTop: 20 }}>

        <label>Bio</label>

        <textarea
          value={bio}
          onChange={(e) =>
            setBio(e.target.value)
          }
          style={{
            width: "100%",
            padding: 10,
            marginTop: 6,
            height: 80
          }}
        />

      </div>

      {/* Save */}

      <button
        onClick={saveProfile}
        disabled={saving}
        style={{
          marginTop: 20,
          padding: 12,
          width: "100%",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: 8
        }}
      >
        {saving ? "Saving..." : "Save profile"}
      </button>

      {/* Commitments */}

      <h2 style={{ marginTop: 40 }}>
        Your commitments
      </h2>

      <div
        style={{
          marginTop: 20,
          marginBottom: 20,
          textAlign: "center"
        }}
      >

        <button
          onClick={goCreate}
          style={{
            padding: "14px 26px",
            borderRadius: 50,
            border: "none",
            background: "#2563eb",
            color: "white",
            fontSize: 16
          }}
        >
          Create commitment
        </button>

      </div>

      {commitments.map((c) => (

        <div
          key={c.id}
          style={{
            padding: 14,
            border: "1px solid #eee",
            borderRadius: 10,
            marginBottom: 10
          }}
        >

          <div>
            {c.text}
          </div>

          <div
            style={{
              fontSize: 12,
              color: "#666",
              marginTop: 6
            }}
          >
            {c.status}
          </div>

        </div>

      ))}

      {/* Credits */}

      <div style={{ marginTop: 30 }}>
        Credits remaining: {credits}
      </div>

      {/* Billing */}

      <button
        style={{
          marginTop: 10,
          padding: 10,
          width: "100%",
          borderRadius: 8,
          border: "1px solid #ddd"
        }}
      >
        Upgrade plan
      </button>

      {/* Logout */}

      <button
        onClick={logout}
        style={{
          marginTop: 10,
          padding: 10,
          width: "100%",
          borderRadius: 8,
          border: "1px solid #ddd"
        }}
      >
        Logout
      </button>

    </div>
  );
}
