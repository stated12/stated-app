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

  /* ---------------- UPDATE LIMITS ---------------- */

  const UPDATE_LIMITS: Record<string, number> = {
    free: 2,
    ind_499: 5,
    ind_899: 10,
    ind_1299: 15,
    comp_1999: 5,
    comp_2999: 10,
    comp_4999: 15,
  };

  useEffect(() => {
    verifyOwnership();
  }, []);

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
      .select("text, user_id, company_id")
      .eq("id", commitmentId)
      .single();

    if (error || !data) {
      setError("Commitment not found");
      setChecking(false);
      return;
    }

    /* OWNER CHECK */

    if (data.user_id !== user.id && !data.company_id) {
      setError("You do not have permission");
      setChecking(false);
      return;
    }

    setCommitmentText(data.text);
    setChecking(false);
  }

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

    /* ---------------- GET COMMITMENT ---------------- */

    const { data: commitment } = await supabase
      .from("commitments")
      .select("company_id")
      .eq("id", commitmentId)
      .single();

    let planKey = "free";

    /* ---------------- CHECK COMPANY PLAN ---------------- */

    if (commitment?.company_id) {

      const { data: company } = await supabase
        .from("companies")
        .select("plan_key")
        .eq("id", commitment.company_id)
        .single();

      planKey = company?.plan_key || "free";

    }

    /* ---------------- INDIVIDUAL PLAN ---------------- */

    else {

      const { data: profile } = await supabase
        .from("profiles")
        .select("plan_key")
        .eq("id", user.id)
        .single();

      planKey = profile?.plan_key || "free";

    }

    const limit = UPDATE_LIMITS[planKey] ?? 2;

    /* ---------------- COUNT EXISTING UPDATES ---------------- */

    const { count } = await supabase
      .from("commitment_updates")
      .select("*", { count: "exact", head: true })
      .eq("commitment_id", commitmentId);

    if ((count ?? 0) >= limit) {

      setError(
        `Update limit reached (${limit}). Upgrade your plan to add more updates.`
      );

      setLoading(false);
      return;
    }

    /* ---------------- INSERT UPDATE ---------------- */

    const { error: insertError } = await supabase
      .from("commitment_updates")
      .insert({
        commitment_id: commitmentId,
        user_id: user.id,
        content: content.trim(),
      });

    if (insertError) {

      setError(insertError.message);
      setLoading(false);
      return;

    }

    /* ---------------- NOTIFICATION ---------------- */

    await supabase
      .from("notifications")
      .insert({
        user_id: user.id,
        type: "update",
        title: "📈 Progress Updated",
        message: "You added a new progress update.",
        link: "/dashboard/my",
        read: false,
      });

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
