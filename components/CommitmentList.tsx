"use client";

import Link from "next/link";
import CheerButton from "@/components/CheerButton";

export default function CommitmentList({
  commitments,
}: {
  commitments: {
    id: string;
    text: string;
    status: string;
    created_at: string;
    completed_at?: string;
    end_date?: string;
    views: number;
    cheers?: number; // ✅ added for CheerButton
    update_count?: number;
    shares_count?: number;
    latest_update?: string | null;
  }[];
}) {

  function getAccentColor(status: string) {
    switch (status) {
      case "active":    return "linear-gradient(180deg,#4338ca,#818cf8)";
      case "completed": return "linear-gradient(180deg,#10b981,#34d399)";
      case "withdrawn": return "linear-gradient(180deg,#9ca3af,#d1d5db)";
      case "expired":   return "linear-gradient(180deg,#ef4444,#fca5a5)";
      case "paused":    return "linear-gradient(180deg,#f59e0b,#fcd34d)";
      default:          return "linear-gradient(180deg,#9ca3af,#d1d5db)";
    }
  }

  function getBadgeStyle(status: string): React.CSSProperties {
    switch (status) {
      case "active":    return { background: "#dcfce7", color: "#15803d" };
      case "completed": return { background: "#dbeafe", color: "#1d4ed8" };
      case "withdrawn": return { background: "#f3f4f6", color: "#6b7280" };
      case "expired":   return { background: "#fee2e2", color: "#b91c1c" };
      case "paused":    return { background: "#fef3c7", color: "#92400e" };
      default:          return { background: "#f3f4f6", color: "#6b7280" };
    }
  }

  function getDateLabel(c: any) {
    if (c.status === "completed" && c.completed_at) {
      const completed = new Date(c.completed_at);
      const created = new Date(c.created_at);
      const days = Math.ceil(
        (completed.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
      );
      return `Completed ${completed.toLocaleDateString()} (${days} days)`;
    }
    return `Created ${new Date(c.created_at).toLocaleDateString()}`;
  }

  function formatViews(n: number) {
    return n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {commitments.map((c) => (
        <Link key={c.id} href={`/commitment/${c.id}`} style={{ textDecoration: "none" }}>
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              border: "1px solid #f0f1f6",
              cursor: "pointer",
            }}
          >
            {/* Accent bar */}
            <div style={{ height: 3, background: getAccentColor(c.status) }} />

            <div style={{ padding: "18px 20px 16px" }}>

              {/* Title */}
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#0f0c29",
                  lineHeight: 1.5,
                  marginBottom: 12,
                }}
              >
                {c.text}
              </div>

              {/* Status + date */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: c.latest_update ? 10 : 0,
                }}
              >
                <span
                  style={{
                    ...getBadgeStyle(c.status),
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 20,
                  }}
                >
                  {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                </span>
                <span style={{ fontSize: 11, color: "#9ca3af" }}>
                  {getDateLabel(c)}
                </span>
              </div>

              {/* Latest update box */}
              {c.latest_update && (
                <div
                  style={{
                    background: "#f8f9fc",
                    borderRadius: 10,
                    padding: "10px 12px",
                    marginTop: 10,
                    marginBottom: 12,
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", marginBottom: 3 }}>
                    Latest update
                  </div>
                  <div style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.5 }}>
                    {c.latest_update}
                  </div>
                </div>
              )}

              {/* Footer — views · updates · shares · CheerButton */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 10,
                  borderTop: "1px solid #f3f4f8",
                  marginTop: 10,
                }}
              >
                {/* Left side — views */}
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#9ca3af" }}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <ellipse cx="6.5" cy="6.5" rx="5.5" ry="3.8" stroke="#9ca3af" strokeWidth="1.1"/>
                    <circle cx="6.5" cy="6.5" r="1.8" stroke="#9ca3af" strokeWidth="1.1"/>
                  </svg>
                  {formatViews(c.views || 0)} views
                </div>

                {/* Right side — updates + shares + CheerButton */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  {(c.update_count ?? 0) > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#6366f1", fontWeight: 500 }}>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M2 9.5V4.5a1 1 0 011-1h7a1 1 0 011 1v4a1 1 0 01-1 1H4.5L2 9.5z" stroke="#6366f1" strokeWidth="1.1" strokeLinejoin="round"/>
                        <path d="M4.5 6.5h4M4.5 8h2" stroke="#6366f1" strokeWidth="1.1" strokeLinecap="round"/>
                      </svg>
                      {c.update_count} {c.update_count === 1 ? "update" : "updates"}
                    </div>
                  )}
                  {(c.shares_count ?? 0) > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#f97316", fontWeight: 500 }}>
                      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <path d="M9 1.5l2.5 2.5L9 6.5" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.5 4H5a3 3 0 00-3 3v1" stroke="#f97316" strokeWidth="1.2" strokeLinecap="round"/>
                      </svg>
                      {c.shares_count} {c.shares_count === 1 ? "share" : "shares"}
                    </div>
                  )}

                  {/* ✅ CheerButton — stopPropagation prevents card nav */}
                  <div onClick={(e) => e.stopPropagation()}>
                    <CheerButton
                      commitmentId={c.id}
                      initialCount={c.cheers ?? 0}
                      size="small"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
