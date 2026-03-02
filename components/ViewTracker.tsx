"use client";

import { useEffect, useRef, useState } from "react";

function getOrCreateSessionId() {
  const existing = document.cookie
    .split("; ")
    .find((row) => row.startsWith("stated_sid="))
    ?.split("=")[1];

  if (existing) return existing;

  const newId = crypto.randomUUID();

  document.cookie = `stated_sid=${newId}; path=/; max-age=${
    60 * 60 * 24 * 365
  }; SameSite=Lax`;

  return newId;
}

export default function ViewTracker({
  type,
  entityId,
}: {
  type: "profile" | "commitment";
  entityId: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasTracked, setHasTracked] = useState(false);

  useEffect(() => {
    if (!ref.current || hasTracked) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const sessionId = getOrCreateSessionId();

          fetch("/api/track-view", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              type,
              entityId,
              sessionId,
            }),
          });

          setHasTracked(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [type, entityId, hasTracked]);

  return <div ref={ref} />;
}
