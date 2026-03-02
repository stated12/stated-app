"use client";

import { useEffect } from "react";

export default function ViewTracker({
  type,
  entityId,
}: {
  type: "profile" | "commitment";
  entityId: string;
}) {
  useEffect(() => {
    fetch("/api/track-view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        entityId,
      }),
    });
  }, [type, entityId]);

  return null;
}
