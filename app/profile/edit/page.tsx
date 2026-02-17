"use client";

import Link from "next/link";
import { useState } from "react";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    // For now just simulate save
    setTimeout(() => {
      alert("Profile saved (database connection next step)");
      setSaving(false);
    }, 500);
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "sans-serif"
      }}
    >
      {/* Back link */}
      <Link
        href="/dashboard"
        style={{
          display: "inline-block",
          marginBottom: "20px",
          color: "#2563eb",
          textDecoration: "none"
        }}
      >
        ← Back to Dashboard
      </Link>

      {/* Heading */}
      <h1 style={{ marginBottom: "20px" }}>Edit Profile</h1>

      {/* Name input */}
      <label style={{ display: "block", marginBottom: "5px" }}>
        Name
      </label>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      {/* Bio input */}
      <label style={{ display: "block", marginBottom: "5px" }}>
        Bio
      </label>

      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Your bio"
        rows={4}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          width: "100%",
          background: saving ? "#9ca3af" : "#2563eb",
          color: "white",
          padding: "12px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px"
        }}
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>

      {/* Public profile link */}
      <Link
        href="/u/avi"
        style={{
          display: "block",
          marginTop: "20px",
          textAlign: "center",
          color: "#16a34a",
          textDecoration: "none"
        }}
      >
        View Public Profile →
      </Link>
    </div>
  );
}
