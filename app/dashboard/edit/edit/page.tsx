"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function EditCommitmentPage() {

  const supabase = createClient();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCommitment();
  }, []);

  const loadCommitment = async () => {

    const { data, error } = await supabase
      .from("commitments")
      .select("*")
      .limit(1)
      .single();

    if (data) {
      setTitle(data.title);
    }

  };

  const saveCommitment = async () => {

    setLoading(true);

    await supabase
      .from("commitments")
      .update({
        title: title
      })
      .eq("title", title);

    router.push("/dashboard");

  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Edit Commitment</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "10px", marginTop: "10px" }}
      />

      <button
        onClick={saveCommitment}
        disabled={loading}
        style={{ marginLeft: "10px", padding: "10px" }}
      >
        Save
      </button>

    </div>
  );

}
