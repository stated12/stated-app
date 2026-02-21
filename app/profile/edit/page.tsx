"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function EditProfilePage() {
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Load profile
  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        setError("Failed to load profile");
      } else if (data) {
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
      }

      setLoading(false);
    }

    loadProfile();
  }, [router, supabase]);

  // Upload avatar
  async function uploadAvatar(userId: string) {
    if (!avatarFile) return profile.avatar_url;

    const fileExt = avatarFile.name.split(".").pop();
    const filePath = `${userId}-${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, {
        upsert: true,
      });

    if (error) {
      throw new Error("Avatar upload failed");
    }

    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  // Save profile
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Not authenticated");
      setSaving(false);
      return;
    }

    try {
      const avatar_url = await uploadAvatar(user.id);

      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: profile.display_name,
          bio: profile.bio,
          website: profile.website,
          linkedin: profile.linkedin,
          twitter: profile.twitter,
          github: profile.github,
          youtube: profile.youtube,
          avatar_url,
        })
        .eq("id", user.id);

      if (error) {
        throw error;
      }

      setSuccess("Profile saved successfully");

      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 800);
    } catch (err: any) {
      setError(err.message);
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center">
          Stated
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Edit your profile
        </p>

        <form onSubmit={handleSave} className="space-y-4">

          {/* Avatar */}
          <div className="flex flex-col items-center">
            {profile.avatar_url && (
              <img
                src={profile.avatar_url}
                className="w-20 h-20 rounded-full mb-2 object-cover"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setAvatarFile(e.target.files?.[0] || null)
              }
              className="text-sm"
            />
          </div>

          {/* Display name */}
          <input
            type="text"
            placeholder="Display name"
            value={profile.display_name}
            onChange={(e) =>
              setProfile({
                ...profile,
                display_name: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* Bio */}
          <textarea
            placeholder="Bio"
            value={profile.bio}
            onChange={(e) =>
              setProfile({
                ...profile,
                bio: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* Website */}
          <input
            type="text"
            placeholder="Website"
            value={profile.website}
            onChange={(e) =>
              setProfile({
                ...profile,
                website: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* LinkedIn */}
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={profile.linkedin}
            onChange={(e) =>
              setProfile({
                ...profile,
                linkedin: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* Twitter */}
          <input
            type="text"
            placeholder="Twitter/X URL"
            value={profile.twitter}
            onChange={(e) =>
              setProfile({
                ...profile,
                twitter: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* GitHub */}
          <input
            type="text"
            placeholder="GitHub URL"
            value={profile.github}
            onChange={(e) =>
              setProfile({
                ...profile,
                github: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* YouTube */}
          <input
            type="text"
            placeholder="YouTube URL"
            value={profile.youtube}
            onChange={(e) =>
              setProfile({
                ...profile,
                youtube: e.target.value,
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          {/* Success */}
          {success && (
            <p className="text-green-600 text-sm">{success}</p>
          )}

          {/* Save button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            {saving ? "Saving..." : "Save profile"}
          </button>

        </form>
      </div>
    </div>
  );
}
