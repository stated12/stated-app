"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function CompleteCommitmentPage() {

  const supabase = createClient();
  const router = useRouter();
  const params = useParams();

  const commitmentId = params.id as string;

  const [commitment, setCommitment] = useState<any>(null);
  const [note, setNote] = useState("");
  const [proofText, setProofText] = useState("");
  const [proofLink, setProofLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCommitment();
  }, []);

  async function loadCommitment() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("commitments")
      .select("*")
      .eq("id", commitmentId)
      .eq("user_id", user.id)
      .single();

    if (error || !data) {
      setError("Commitment not found");
      return;
    }

    if (data.status !== "active" && data.status !== "paused") {
      setError("This commitment cannot be completed");
      return;
    }

    setCommitment(data);
  }

  async function uploadProofImage(userId: string) {

    if (!imageFile) return null;

    const fileExt = imageFile.name.split(".").pop();
    const filePath = `${userId}/${commitmentId}_${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage
      .from("commitment_proofs")
      .upload(filePath, imageFile);

    if (error) throw error;

    const { data } = supabase.storage
      .from("commitment_proofs")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  async function handleComplete() {

    setError("");
    setLoading(true);

    try {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      let imageUrl = null;

      if (imageFile) {
        imageUrl = await uploadProofImage(user.id);
      }

      const proofParts = [];

      if (note.trim()) proofParts.push(note);
      if (proofText.trim()) proofParts.push(`Proof: ${proofText}`);
      if (proofLink.trim()) proofParts.push(`Link: ${proofLink}`);
      if (imageUrl) proofParts.push(`Image: ${imageUrl}`);

      const completionText =
        proofParts.length > 0
          ? `Commitment completed — ${proofParts.join(" | ")}`
          : "Commitment completed";

      const { error: updateError } = await supabase
        .from("commitments")
        .update({
          status: "completed",
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", commitmentId)
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      const { error: logError } = await supabase
        .from("commitment_updates")
        .insert({
          commitment_id: commitmentId,
          user_id: user.id,
          content: completionText,
        });

      if (logError) throw logError;

      await supabase.from("notifications").insert({
        user_id: user.id,
        type: "completion",
        title: "🎉 Commitment Completed",
        message: "You successfully completed your commitment.",
        link: "/dashboard/my",
        read: false,
      });

      router.push("/dashboard");

    } catch (err: any) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  }

  if (error && !commitment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!commitment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">

      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">

        <Link href="/dashboard">
          <div className="text-2xl font-bold text-blue-600 mb-4">
            Stated
          </div>
        </Link>

        <h1 className="text-xl font-semibold mb-2">
          Complete Commitment
        </h1>

        <div className="text-gray-600 mb-4">
          {commitment.text}
        </div>

        {/* Completion Note */}

        <textarea
          placeholder="Optional completion note..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        {/* Proof Section */}

        <div className="border rounded-lg p-4 mb-4 bg-gray-50">

          <div className="font-medium mb-2">
            Add Proof (Optional)
          </div>

          <div className="text-sm text-gray-500 mb-3">
            Adding proof increases credibility.
          </div>

          {/* Image Upload */}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full mb-3"
          />

          {/* Link */}

          <input
            type="text"
            placeholder="Proof link (optional)"
            value={proofLink}
            onChange={(e) => setProofLink(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 mb-3"
          />

          {/* Proof Text */}

          <textarea
            placeholder="Describe proof (optional)"
            value={proofText}
            onChange={(e) => setProofText(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />

        </div>

        {error && (
          <div className="text-red-500 text-sm mb-3">
            {error}
          </div>
        )}

        <button
          onClick={handleComplete}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
        >
          {loading ? "Completing..." : "Mark as Completed"}
        </button>

      </div>

    </div>

  );
      }
