"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewCommitmentPage() {

  const supabase = createClient();
  const router = useRouter();

  const [text, setText] = useState("");
  const [category, setCategory] = useState("General");
  const [duration, setDuration] = useState("1 week");

  const [userId, setUserId] = useState<string | null>(null);
  const [credits, setCredits] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  // LOAD USER + PROFILE
  useEffect(() => {
    loadProfile();
  }, []);


  async function loadProfile() {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setUserId(user.id);

    const { data: profile } = await supabase
      .from("profiles")
      .select("credits")
      .eq("id", user.id)
      .single();

    if (profile) {
      setCredits(profile.credits ?? 0);
    }

  }



  // CALCULATE END DATE
  function calculateEndDate() {

    const start = new Date();

    switch (duration) {

      case "1 week":
        start.setDate(start.getDate() + 7);
        break;

      case "2 weeks":
        start.setDate(start.getDate() + 14);
        break;

      case "3 weeks":
        start.setDate(start.getDate() + 21);
        break;

      case "1 month":
        start.setMonth(start.getMonth() + 1);
        break;

      case "3 months":
        start.setMonth(start.getMonth() + 3);
        break;

      case "6 months":
        start.setMonth(start.getMonth() + 6);
        break;

      case "1 year":
        start.setFullYear(start.getFullYear() + 1);
        break;

    }

    return start.toISOString();

  }



  // CREATE COMMITMENT
  async function createCommitment() {

    setError("");

    if (!userId) {
      setError("User not loaded");
      return;
    }

    if (!text.trim()) {
      setError("Enter your commitment");
      return;
    }

    if (credits <= 0) {
      setError("No credits remaining");
      return;
    }

    setLoading(true);

    try {

      const endDate = calculateEndDate();


      // INSERT COMMITMENT
      const { error: insertError } =
        await supabase
          .from("commitments")
          .insert({

            user_id: userId,
            text: text.trim(),
            category,
            duration,
            status: "active",
            created_at: new Date().toISOString(),
            end_date: endDate,
            view_count: 0

          });


      if (insertError) {
        throw insertError;
      }



      // DEDUCT CREDIT
      const { error: creditError } =
        await supabase
          .from("profiles")
          .update({
            credits: credits - 1
          })
          .eq("id", userId);

      if (creditError) {
        throw creditError;
      }


      router.push("/dashboard");
      router.refresh();

    }
    catch (err: any) {

      setError(err.message);

    }

    setLoading(false);

  }



  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

        {/* HEADER */}
        <Link href="/dashboard">

          <div className="text-3xl font-bold text-blue-600 mb-2">
            Stated
          </div>

        </Link>

        <div className="text-gray-500 mb-4">
          Create a public commitment
        </div>



        {/* CREDITS */}
        <div className="mb-4 text-sm">

          Credits remaining:
          <span className="font-semibold ml-1">
            {credits}
          </span>

        </div>



        {/* TEXT */}
        <textarea

          placeholder="Example: I will publish my book in 90 days"

          value={text}

          onChange={(e) =>
            setText(e.target.value)
          }

          className="w-full border rounded-lg px-3 py-2 mb-3"

        />



        {/* CATEGORY */}
        <select

          value={category}

          onChange={(e) =>
            setCategory(e.target.value)
          }

          className="w-full border rounded-lg px-3 py-2 mb-3"

        >

          <option>General</option>
          <option>Fitness</option>
          <option>Career</option>
          <option>Learning</option>
          <option>Health</option>
          <option>Business</option>

        </select>



        {/* DURATION */}
        <select

          value={duration}

          onChange={(e) =>
            setDuration(e.target.value)
          }

          className="w-full border rounded-lg px-3 py-2 mb-3"

        >

          <option>1 week</option>
          <option>2 weeks</option>
          <option>3 weeks</option>
          <option>1 month</option>
          <option>3 months</option>
          <option>6 months</option>
          <option>1 year</option>

        </select>



        {/* ERROR */}
        {error &&

          <div className="text-red-500 text-sm mb-3">
            {error}
          </div>

        }



        {/* BUTTON */}
        <button

          onClick={createCommitment}

          disabled={loading || credits <= 0}

          className={`w-full py-3 rounded-lg text-white font-medium ${
            credits <= 0
              ? "bg-gray-400"
              : "bg-blue-600 hover:bg-blue-700"
          }`}

        >

          {loading
            ? "Creating..."
            : credits <= 0
            ? "No credits remaining"
            : "Create Commitment"}

        </button>


      </div>

    </div>

  );

}
