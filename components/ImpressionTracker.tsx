"use client";

import { useEffect } from "react";

export default function ImpressionTracker({
  commitmentIds,
}: {
  commitmentIds: string[];
}) {
  useEffect(() => {
    if (!commitmentIds || commitmentIds.length === 0) return;

    const sessionKey = "viewed_" + commitmentIds.join("_");

    if (sessionStorage.getItem(sessionKey)) return;

    fetch("/api/impression", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commitmentIds }),
    });

    sessionStorage.setItem(sessionKey, "true");
  }, [commitmentIds]);

  return null;
}
