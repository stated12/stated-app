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

  const [avatarFile, setAvatarFile] = useState<File | null>(null);

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

  // =============================
  // VALIDATORS
  // =============================

  function isValidUrl(url: string) {

    if (!url) return true;

    try {
      const parsed = new URL(url);

      return (
        parsed.protocol === "http:" ||
        parsed.protocol === "https:"
      );

    } catch {

      return false;

    }
  }

  function validateAvatar(file: File) {

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      return "Only JPG, PNG, WEBP allowed";
    }

    if (file.size > maxSize) {
      return "Image must be less than 2MB";
    }

    return null;
  }


  // =============================
  // LOAD PROFILE
  // =============================

  useEffect(() => {

    async function loadProfile() {

      const { data: { user } } =
        await supabase.auth.getUser();

      if (!user) {

        router.push("/login");
        return;

      }

      const { data, error } =
        await supabase
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


  // =============================
  // UPLOAD AVATAR
  // =============================

  async function uploadAvatar(userId: string) {

    if (!avatarFile)
      return profile.avatar_url;

    const validationError =
      validateAvatar(avatarFile);

    if (validationError)
      throw new Error(validationError);

    const fileExt =
      avatarFile.name.split(".").pop();

    const filePath =
      `${userId}/avatar.${fileExt}`;

    const { error } =
      await supabase.storage
        .from("avatars")
        .upload(filePath, avatarFile, {
          upsert: true,
        });

    if (error)
      throw new Error(error.message);

    const { data } =
      supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

    return data.publicUrl;

  }


  // =============================
  // SAVE PROFILE
  // =============================

  async function handleSave(
    e: React.FormEvent
  ) {

    e.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {

      const { data: { user } } =
        await supabase.auth.getUser();

      if (!user)
        throw new Error("Not logged in");


      // URL validation

      if (
        !isValidUrl(profile.website) ||
        !isValidUrl(profile.linkedin) ||
        !isValidUrl(profile.twitter) ||
        !isValidUrl(profile.github) ||
        !isValidUrl(profile.youtube)
      ) {
        throw new Error(
          "All URLs must start with https://"
        );
      }


      const avatar_url =
        await uploadAvatar(user.id);


      const { error } =
        await supabase
          .from("profiles")
          .update({
            display_name:
              profile.display_name.trim(),

            bio:
              profile.bio.trim(),

            website:
              profile.website.trim(),

            linkedin:
              profile.linkedin.trim(),

            twitter:
              profile.twitter.trim(),

            github:
              profile.github.trim(),

            youtube:
              profile.youtube.trim(),

            avatar_url,

          })
          .eq("id", user.id);


      if (error)
        throw new Error(error.message);


      setSuccess("Profile saved");

      setTimeout(() => {

        router.push("/dashboard");

        router.refresh();

      }, 800);


    } catch (err: any) {

      setError(err.message);

    }

    setSaving(false);

  }


  // =============================
  // UI
  // =============================

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );


  return (

    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white shadow rounded-xl p-6">


        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
          Edit Profile
        </h1>


        <form
          onSubmit={handleSave}
          className="space-y-4"
        >


          {/* Avatar */}

          <div className="flex flex-col items-center">

            <img
              src={
                profile.avatar_url ||
                "/default-avatar.png"
              }
              className="w-20 h-20 rounded-full object-cover mb-2"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setAvatarFile(
                  e.target.files?.[0] || null
                )
              }
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
                display_name:
                  e.target.value,
              })
            }
            className="w-full border px-3 py-2 rounded"
          />


          {/* Bio */}

          <textarea
            placeholder="Bio"
            value={profile.bio}
            onChange={(e) =>
              setProfile({
                ...profile,
                bio:
                  e.target.value,
              })
            }
            className="w-full border px-3 py-2 rounded"
          />


          {/* Website */}

          <input
            type="text"
            placeholder="Website https://"
            value={profile.website}
            onChange={(e) =>
              setProfile({
                ...profile,
                website:
                  e.target.value,
              })
            }
            className="w-full border px-3 py-2 rounded"
          />


          {/* LinkedIn */}

          <input
            type="text"
            placeholder="LinkedIn https://"
            value={profile.linkedin}
            onChange={(e) =>
              setProfile({
                ...profile,
                linkedin:
                  e.target.value,
              })
            }
            className="w-full border px-3 py-2 rounded"
          />


          {/* Twitter */}

          <input
            type="text"
            placeholder="Twitter/X https://"
            value={profile.twitter}
            onChange={(e) =>
              setProfile({
                ...profile,
                twitter:
                  e.target.value,
              })
            }
            className="w-full border px-3 py-2 rounded"
          />


          {/* GitHub */}

          <input
            type="text"
            placeholder="GitHub https://"
            value={profile.github}
            onChange={(e) =>
              setProfile({
                ...profile,
                github:
                  e.target.value,
              })
            }
            className="w-full border px-3 py-2 rounded"
          />


          {/* YouTube */}

          <input
            type="text"
            placeholder="YouTube https://"
            value={profile.youtube}
            onChange={(e) =>
              setProfile({
                ...profile,
                youtube:
                  e.target.value,
              })
            }
            className="w-full border px-3 py-2 rounded"
          />


          {/* Error */}

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}


          {/* Success */}

          {success && (
            <p className="text-green-600 text-sm">
              {success}
            </p>
          )}


          {/* Submit */}

          <button
            disabled={saving}
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
          >
            {saving
              ? "Saving..."
              : "Save Profile"}
          </button>


        </form>

      </div>

    </div>

  );

}
