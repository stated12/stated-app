"use client";

import { useEffect, useState } from "react";

export default function ReputationCard({
  userId,
  companyId,
}: {
  userId?: string;
  companyId?: string;
}) {

  const [data, setData] = useState<any>(null);

  useEffect(() => {

    const params = new URLSearchParams();

    if (userId) params.append("userId", userId);
    if (companyId) params.append("companyId", companyId);

    fetch(`/api/reputation?${params.toString()}`)
      .then((res) => res.json())
      .then((res) => setData(res));

  }, [userId, companyId]);

  if (!data) return null;

  const milestones = [
    { label: "Beginner",  score: 0   },
    { label: "Builder",   score: 25  },
    { label: "Credible",  score: 50  },
    { label: "Trusted",   score: 75  },
    { label: "Authority", score: 100 },
  ];

  const nextLevel =
    milestones.find((m) => m.score > data.score) ||
    milestones[milestones.length - 1];

  const progress =
    nextLevel.score > 0
      ? Math.min((data.score / nextLevel.score) * 100, 100)
      : 100;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
    >

      {/* ── Dark gradient header ── */}
      <div
        style={{
          background: "linear-gradient(135deg,#1e1b4b 0%,#4338ca 50%,#7c3aed 100%)",
          padding: "18px 18px 16px",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "inherit",
              fontSize: 44,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1,
            }}
          >
            {data.score}
          </div>
          <div
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.55)",
              marginTop: 4,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            Reputation score
          </div>
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: 20,
            padding: "6px 16px",
            fontSize: 11,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          ⚡ {data.badge}
        </div>
      </div>

      {/* ── Body ── */}
      <div
        style={{
          background: "#fff",
          padding: "14px 18px 16px",
        }}
      >

        {/* Completion rate */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 12, color: "#6b7280" }}>Completion rate</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#4338ca" }}>
            {data.completionRate}%
          </span>
        </div>

        {/* Progress bar */}
        <div
          style={{
            background: "#f0f1f8",
            borderRadius: 99,
            height: 7,
            marginBottom: 5,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg,#4338ca,#7c3aed,#a855f7)",
              borderRadius: 99,
            }}
          />
        </div>

        {/* Progress label */}
        <div style={{ fontSize: 10, color: "#9ca3af", marginBottom: 14 }}>
          {data.score} / {nextLevel.score} pts — Next level: {nextLevel.label}
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            borderTop: "1px solid #f3f4f8",
            paddingTop: 12,
          }}
        >
          {[
            { num: data.completed, label: "Completed", danger: false },
            { num: data.active,    label: "Active",    danger: false },
            { num: data.withdrawn, label: "Withdrawn", danger: false },
            { num: data.expired,   label: "Expired",   danger: true  },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                borderLeft: i > 0 ? "1px solid #f3f4f8" : "none",
                padding: "0 4px",
              }}
            >
              <div
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: s.danger ? "#ef4444" : "#0f0c29",
                }}
              >
                {s.num}
              </div>
              <div style={{ fontSize: 9, color: "#9ca3af", marginTop: 2 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Info box */}
        <div
          style={{
            background: "#f5f3ff",
            borderLeft: "3px solid #7c3aed",
            borderRadius: "0 10px 10px 0",
            padding: "10px 12px",
            marginTop: 12,
          }}
        >
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#5b21b6",
              marginBottom: 4,
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="4" stroke="#7c3aed" strokeWidth="1" />
              <path d="M5 4.5v3M5 3v.5" stroke="#7c3aed" strokeWidth="1" strokeLinecap="round" />
            </svg>
            How reputation is calculated
          </div>
          <p style={{ fontSize: 10, color: "#6b7280", lineHeight: 1.6, margin: 0 }}>
            Reputation reflects how consistently you follow through on commitments.
            Completing commitments, maintaining a strong completion rate, and
            generating engagement through views and shares improve your score.
            Withdrawn or expired commitments may reduce credibility.
          </p>
        </div>

      </div>
    </div>
  );
}
