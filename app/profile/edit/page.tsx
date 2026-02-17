"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function EditProfile() {
  const supabase = createClient();

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("username, name, bio")
      .eq("id", user.id)
      .single();

    if (data) {
      setUsername(data.username || "");
      setName(data.name || "");
      setBio(data.bio || "");
    }
  }

  async function saveProfile() {
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("profiles").upsert({
      id: user.id,
      username,
      name,
      bio,
    });

    alert("Profile saved!");
    setSaving(false);
  }

  return (
    <div style={{ padding: "40px", maxWidth: "500px" }}>
      <h1>Edit Profile</h1>

      <label>Username</label>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "8px", width: "100%" }}
      />

      <label>Name</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "8px", width: "100%" }}
      />

      <label>Bio</label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        style={{ display: "block", marginBottom: "10px", padding: "8px", width: "100%" }}
      />

      <button
        onClick={saveProfile}
        disabled={saving}
        style={{
          background: "#2563eb",
          color: "white",
          padding: "10px",
          borderRadius: "6px",
          border: "none",
        }}
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}
