"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CreateCommitmentPage() {

  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("1 month");
  const [loading, setLoading] = useState(false);

  const durationOptions = [
    "1 week",
    "2 weeks",
    "3 weeks",
    "1 month",
    "3 months",
    "6 months",
    "1 year",
  ];

  function calculateEndDate(duration: string) {

    const start = new Date();
    const end = new Date(start);

    switch (duration) {
      case "1 week":
        end.setDate(start.getDate() + 7);
        break;

      case "2 weeks":
        end.setDate(start.getDate() + 14);
        break;

      case "3 weeks":
        end.setDate(start.getDate() + 21);
        break;

      case "1 month":
        end.setMonth(start.getMonth() + 1);
        break;

      case "3 months":
        end.setMonth(start.getMonth() + 3);
        break;

      case "6 months":
        end.setMonth(start.getMonth() + 6);
        break;

      case "1 year":
        end.setFullYear(start.getFullYear() + 1);
        break;
    }

    return end.toISOString();
  }

  async function handleCreate() {

    if (!title.trim()) {
      alert("Please enter your commitment");
      return;
    }

    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Not logged in");
      return;
    }

    const startDate = new Date().toISOString();
    const endDate = calculateEndDate(duration);

    const { error } = await supabase.from("commitments").insert({
      user_id: user.id,
      title,
      duration,
      start_date: startDate,
      end_date: endDate,
      status: "active",
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">

      <div className="max-w-md mx-auto">

        <h1 className="text-xl font-semibold mb-6 text-center">
          Create commitment
        </h1>

        {/* Title */}
        <input
          type="text"
          placeholder="I will..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-4 text-base"
        />

        {/* Duration */}
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 mb-6 text-base bg-white"
        >
          {durationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {/* Centered Rounded Button */}
        <div className="flex justify-center">

          <button
            onClick={handleCreate}
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition"
          >
            {loading ? "Creating..." : "Create commitment"}
          </button>

        </div>

      </div>

    </div>
  );
}
