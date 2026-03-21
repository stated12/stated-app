"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function EditProfilePage() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const [profile, setProfile] = useState({
    display_name: "",
    bio: "",
    website: "",
    linkedin: "",
    twitter: "",
    github: "",
    youtube: "",
    avatar_url: "",
  });

  function isValidUrl(url: string) {
    if (!url) return true;
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch { return false; }
  }

  function validateAvatar(file: File) {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) return "Only JPG, PNG, WEBP allowed";
    if (file.size > 2 * 1024 * 1024) return "Image must be less than 2MB";
    return null;
  }

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUserId(user.id);

      const { data } = await supabase
        .from("profiles").select("*").eq("id", user.id).single();

      if (data) {
        setProfile({
          display_name: data.display_name || "",
          bio: data.bio || "",
          website: data.website || "",
          linkedin: data.linkedin || "",
          twitter: data.twitter || "",
          github: data.github || "",
          youtube: data.youtube || "",
          avatar_url: data.avatar_url || "",
        });
        setPreview(data.avatar_url || "");
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const err = validateAvatar(file);
    if (err) { setError(err); return; }
    setError("");
    setAvatarFile(file);
    setPreview(URL.createObjectURL(file));
  }

  async function uploadAvatar() {
    if (!avatarFile || !userId) return profile.avatar_url;
    const fileExt = avatarFile.name.split(".").pop();
    const filePath = `${userId}/avatar.${fileExt}`;
    const { error } = await supabase.storage
      .from("avatars").upload(filePath, avatarFile, { upsert: true });
    if (error) throw new Error(error.message);
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    return data.publicUrl;
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (
        !isValidUrl(profile.website) ||
        !isValidUrl(profile.linkedin) ||
        !isValidUrl(profile.twitter) ||
        !isValidUrl(profile.github) ||
        !isValidUrl(profile.youtube)
      ) {
        throw new Error("All URLs must start with https://");
      }

      const avatar_url = await uploadAvatar();

      const { error } = await supabase
        .from("profiles")
        .update({ ...profile, avatar_url })
        .eq("id", userId);

      if (error) throw new Error(error.message);

      setSaved(true);
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 800);
    } catch (err: any) {
      setError(err.message);
    }

    setSaving(false);
  }

  const inputStyle = {
    width: "100%",
    border: "1px solid #e8eaf2",
    borderRadius: 10,
    padding: "11px 14px",
    fontSize: 14,
    color: "#0f0c29",
    outline: "none",
    fontFamily: "inherit",
    background: "#f8f9fc",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    display: "block" as const,
    fontSize: 12,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f2f3f7" }}>
      <div style={{ fontSize: 13, color: "#9ca3af" }}>Loading profile...</div>
    </div>
  );

  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.display_name || "U")}&background=4338ca&color=fff&size=128`;

  return (
    <div style={{ margin: "-32px -24px", background: "#f2f3f7", minHeight: "100vh", paddingBottom: 40 }}>

      {/* Header */}
      <div style={{ background: "#fff", padding: "16px 16px 14px", borderBottom: "1px solid #f0f1f6" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#0f0c29" }}>Edit Profile</div>
        <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>Update your public profile</div>
      </div>

      <form onSubmit={handleSave}>
        <div style={{ padding: 16 }}>

          {/* Avatar */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "20px 16px", border: "1px solid #f0f1f6", marginBottom: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#4338ca,#7c3aed,#ec4899)", padding: 2.5 }}>
                <img
                  src={preview || avatarFallback}
                  style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", border: "2px solid #fff" }}
                />
              </div>
            </div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#4338ca", background: "#eef2ff", padding: "7px 18px", borderRadius: 20, cursor: "pointer" }}>
              Change Photo
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
            </label>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>JPG, PNG, WEBP · Max 2MB</div>
          </div>

          {/* Basic info */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "16px", border: "1px solid #f0f1f6", marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 16 }}>Basic Info</div>

            <div style={{ marginBottom: 14 }}>
              <label style={labelStyle}>Display Name</label>
              <input
                style={inputStyle}
                value={profile.display_name}
                onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
                placeholder="Your name"
              />
            </div>

            <div style={{ marginBottom: 0 }}>
              <label style={labelStyle}>Bio</label>
              <textarea
                style={{ ...inputStyle, minHeight: 80, resize: "vertical" as const }}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                placeholder="Tell people about yourself"
              />
            </div>
          </div>

          {/* Links */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "16px", border: "1px solid #f0f1f6", marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", letterSpacing: 2, textTransform: "uppercase" as const, marginBottom: 16 }}>Links</div>

            {[
              { label: "Website",    key: "website",  placeholder: "https://yoursite.com" },
              { label: "LinkedIn",   key: "linkedin", placeholder: "https://linkedin.com/in/you" },
              { label: "Twitter / X", key: "twitter", placeholder: "https://x.com/you" },
              { label: "GitHub",     key: "github",   placeholder: "https://github.com/you" },
              { label: "YouTube",    key: "youtube",  placeholder: "https://youtube.com/@you" },
            ].map((field, i) => (
              <div key={field.key} style={{ marginBottom: i < 4 ? 14 : 0 }}>
                <label style={labelStyle}>{field.label}</label>
                <input
                  style={inputStyle}
                  value={(profile as any)[field.key]}
                  onChange={(e) => setProfile({ ...profile, [field.key]: e.target.value })}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>

          {error && (
            <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 12, color: "#dc2626", fontWeight: 500 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            style={{ width: "100%", padding: "13px", background: saved ? "linear-gradient(135deg,#10b981,#34d399)" : saving ? "#9ca3af" : "linear-gradient(135deg,#4338ca,#6366f1)", border: "none", borderRadius: 12, color: "#fff", fontSize: 14, fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: saving ? "none" : "0 3px 12px rgba(67,56,202,0.3)" }}
          >
            {saved ? "✓ Saved!" : saving ? "Saving..." : "Save Profile"}
          </button>

        </div>
      </form>
    </div>
  );
}
