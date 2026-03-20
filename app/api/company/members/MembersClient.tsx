"use client";

import { useState } from "react";

type Member = {
  id: string;
  role: string;
  user_id: string;
  created_at: string;
  isOwner: boolean;
  isSelf: boolean;
  profile: {
    id: string;
    username: string;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
};

export default function MembersClient({
  members,
  canManage,
  currentUserId,
}: {
  members: Member[];
  canManage: boolean;
  currentUserId: string;
}) {
  const [list, setList] = useState(members);

  async function changeRole(memberId: string, role: string) {
    await fetch("/api/company/member", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "role", memberId, role }),
    });
    setList((prev) => prev.map((m) => m.id === memberId ? { ...m, role } : m));
  }

  async function removeMember(memberId: string) {
    if (!confirm("Remove this member?")) return;
    await fetch("/api/company/member", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "remove", memberId }),
    });
    setList((prev) => prev.filter((m) => m.id !== memberId));
  }

  if (list.length === 0) {
    return (
      <div style={{ background: "#fff", borderRadius: 14, padding: "24px", textAlign: "center", border: "1px solid #f0f1f6" }}>
        <div style={{ fontSize: 13, color: "#9ca3af" }}>No members yet — invite someone to get started</div>
      </div>
    );
  }

  return (
    <>
      {list.map((m) => {
        const avatarUrl = m.profile?.avatar_url?.trim()
          ? m.profile.avatar_url.trim()
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(m.profile?.display_name || m.profile?.username || "U")}&background=0891b2&color=fff`;

        const roleBadgeStyle = (role: string) => {
          if (role === "admin") return { background: "#fef3c7", color: "#92400e" };
          if (role === "member") return { background: "#dcfce7", color: "#15803d" };
          return { background: "#f3f4f6", color: "#6b7280" };
        };

        return (
          <div
            key={m.id}
            style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", marginBottom: 8, border: "1px solid #f0f1f6", display: "flex", alignItems: "center", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", flexShrink: 0 }}>
                <img src={avatarUrl} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f0c29" }}>
                  {m.profile?.display_name || m.profile?.username}
                  {m.isSelf && <span style={{ fontSize: 9, fontWeight: 600, color: "#9ca3af", background: "#f3f4f6", padding: "1px 6px", borderRadius: 10, marginLeft: 6 }}>You</span>}
                </div>
                <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>@{m.profile?.username}</div>
                <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 1 }}>
                  Joined {new Date(m.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {canManage && !m.isSelf ? (
                <>
                  <select
                    value={m.role}
                    onChange={(e) => changeRole(m.id, e.target.value)}
                    style={{ fontSize: 11, fontWeight: 600, border: "1px solid #e8eaf2", borderRadius: 8, padding: "4px 8px", color: "#0f0c29", background: "#f8f9fc", fontFamily: "inherit" }}
                  >
                    <option value="viewer">Viewer</option>
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={() => removeMember(m.id)}
                    style={{ fontSize: 11, fontWeight: 600, color: "#ef4444", background: "#fff5f5", border: "none", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontFamily: "inherit" }}
                  >
                    Remove
                  </button>
                </>
              ) : (
                <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, ...roleBadgeStyle(m.role), textTransform: "capitalize" }}>
                  {m.role}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
