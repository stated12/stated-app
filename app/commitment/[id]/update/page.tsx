"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function CommitmentUpdatePage() {

  const supabase = createClient();
  const router = useRouter();
  const params = useParams();

  const commitmentId = params.id as string;

  const [content, setContent] = useState("");
  const [commitmentText, setCommitmentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState("");

  // VERIFY USER OWNS COMMITMENT
  useEffect(() => {

    async function verifyOwnership() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("commitments")
        .select("text")
        .eq("id", commitmentId)
        .eq("user_id", user.id)
        .single();

      if (error || !data) {
        setError("Commitment not found");
        setChecking(false);
        return;
      }

      setCommitmentText(data.text);
      setChecking(false);
    }

    verifyOwnership();

  }, [commitmentId, router, supabase]);



  async function submitUpdate() {

    if (!content.trim()) {
      setError("Write your progress update");
      return;
    }

    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("commitment_updates")
      .insert({
        commitment_id: commitmentId,
        user_id: user.id,
        content: content.trim(),
      });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }



  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }



  if (error === "Commitment not found") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }



  return (

    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

        <Link href="/dashboard">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            Stated
          </div>
        </Link>

        <div className="text-gray-500 mb-4">
          Add progress update
        </div>


        <div className="text-sm bg-gray-100 p-3 rounded mb-4">
          {commitmentText}
        </div>


        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Example: Completed chapter 2 today"
          className="w-full border rounded-lg px-3 py-2 mb-4"
          rows={4}
        />


        {error && (
          <div className="text-red-500 text-sm mb-3">
            {error}
          </div>
        )}


        <button
          onClick={submitUpdate}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Add Update"}
        </button>

      </div>

    </div>

  );

}
