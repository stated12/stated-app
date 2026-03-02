"use client";

import { useEffect, useRef, useState } from "react";

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

        // Track only if 50% visible
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
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
