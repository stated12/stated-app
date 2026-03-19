"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Props = {
  displayName: string;
  avatarUrl: string;
  username: string;
  activeCount: number;
  reputationScore: number;
};

export default function DashboardGreeting({
  displayName,
  avatarUrl,
  username,
  activeCount,
  reputationScore,
}: Props) {
  const [greeting, setGreeting] = useState("Good morning,");
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting("Good morning,");
    else if (h < 17) setGreeting("Good afternoon,");
    else setGreeting("Good evening,");
  }, []);

  return (
    <>
      {/* GREETING BAND */}
      <div
        style={{
          background: "#fff",
          padding: "14px 16px 12px",
          borderBottom: "1px solid #f0f1f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: "#9ca3af", fontWeight: 400 }}>
            {greeting}
          </div>
          <div
            style={{
              fontSize: 17,
              fontWeight: 800,
              color: "#0f0c29",
              margin: "2px 0",
            }}
          >
            {displayName}
          </div>
          <div style={{ fontSize: 10, color: "#6b7280" }}>
            {activeCount} active {activeCount === 1 ? "commitment" : "commitments"} · {reputationScore} reputation
          </div>
        </div>

        {/* Avatar — tapping opens sheet */}
        <button
          onClick={() => setSheetOpen(true)}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#4338ca,#7c3aed,#ec4899)",
              padding: 2.5,
              boxShadow: "0 2px 10px rgba(67,56,202,0.35)",
            }}
          >
            <img
              src={avatarUrl}
              alt={displayName}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #fff",
              }}
            />
          </div>
        </button>
      </div>

      {/* BOTTOM SHEET OVERLAY */}
      {sheetOpen && (
        <div
          onClick={() => setSheetOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 100,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: "20px 20px 0 0",
              width: "100%",
              paddingBottom: 32,
            }}
          >
            {/* Handle */}
            <div style={{ textAlign: "center", padding: "12px 0 4px" }}>
              <div
                style={{
                  width: 36,
                  height: 4,
                  background: "#e5e7eb",
                  borderRadius: 2,
                  display: "inline-block",
                }}
              />
            </div>

            {/* User info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 20px 14px",
                borderBottom: "1px solid #f3f4f8",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#4338ca,#7c3aed,#ec4899)",
                  padding: 2.5,
                }}
              >
                <img
                  src={avatarUrl}
                  alt={displayName}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #fff",
                  }}
                />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#0f0c29" }}>
                  {displayName}
                </div>
                <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 1 }}>
                  @{username}
                </div>
              </div>
            </div>

            {/* View profile */}
            <Link
              href={`/u/${username}`}
              onClick={() => setSheetOpen(false)}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 20px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "#eef2ff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <circle cx="9" cy="7" r="3.5" stroke="#4338ca" strokeWidth="1.4"/>
                    <path d="M2 17c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="#4338ca" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0f0c29" }}>
                    View profile
                  </div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>
                    See your public profile
                  </div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>

            <div style={{ height: 1, background: "#f3f4f8", margin: "0 20px" }} />

            {/* Edit profile */}
            <Link
              href="/profile/edit"
              onClick={() => setSheetOpen(false)}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 20px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M13 2l3 3-9 9H4v-3l9-9z" stroke="#374151" strokeWidth="1.4" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#0f0c29" }}>
                    Edit profile
                  </div>
                  <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>
                    Update your info & links
                  </div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 3l4 4-4 4" stroke="#9ca3af" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>

            {/* Cancel */}
            <button
              onClick={() => setSheetOpen(false)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                padding: "14px 20px 0",
                fontSize: 13,
                fontWeight: 600,
                color: "#9ca3af",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
