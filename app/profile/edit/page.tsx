"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function EditProfilePage() {

  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {

    async function loadProfile() {

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("display_name, bio, website")
        .eq("id", user.id)
        .single();

      if (data) {
        setDisplayName(data.display_name || "");
        setBio(data.bio || "");
        setWebsite(data.website || "");
      }

      setLoading(false);
    }

    loadProfile();

  }, []);

  async function handleSave(e: React.FormEvent) {

    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Not authenticated");
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName,
        bio: bio,
        website: website,
        updated_at: new Date().toISOString()
      })
      .eq("id", user.id);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setSuccess("Profile saved");

    setTimeout(() => {
      router.push("/dashboard");
    }, 800);

  }

  if (loading)
    return (
      <div style={styles.center}>
        Loading...
      </div>
    );

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h1 style={styles.logo}>Stated</h1>

        <p style={styles.subtitle}>
          Edit your profile
        </p>

        <form onSubmit={handleSave}>

          <label style={styles.label}>Display name</label>

          <input
            style={styles.input}
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <label style={styles.label}>Bio</label>

          <textarea
            style={styles.textarea}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <label style={styles.label}>Website</label>

          <input
            style={styles.input}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          {error && (
            <div style={styles.error}>{error}</div>
          )}

          {success && (
            <div style={styles.success}>{success}</div>
          )}

          <button
            style={styles.button}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save profile"}
          </button>

        </form>

      </div>

    </div>
  );
}

const styles: any = {

  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8fafc",
    padding: "16px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    padding: "28px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  },

  logo: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#2563eb",
    textAlign: "center",
    marginBottom: "8px",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: "24px",
    color: "#64748b",
  },

  label: {
    display: "block",
    marginBottom: "6px",
    marginTop: "14px",
  },

  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
  },

  textarea: {
    width: "100%",
    padding: "12px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    minHeight: "80px",
  },

  button: {
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
  },

  error: {
    color: "#dc2626",
    marginTop: "10px",
  },

  success: {
    color: "#16a34a",
    marginTop: "10px",
  },

  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

};
