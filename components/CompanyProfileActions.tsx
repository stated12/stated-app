"use client";

import FollowButton from "@/components/social/FollowButton";
import ShareProfileButton from "@/components/ShareProfileButton";

type Props = {
  companyId: string;
  companyName: string;
  username: string;
  currentUserId: string | null;
  isOwner: boolean;
};

export default function CompanyProfileActions({ companyId, username, currentUserId, isOwner }: Props) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      {!isOwner && (
        <FollowButton
          currentUserId={currentUserId ?? undefined}
          targetCompanyId={companyId}
          style={{
            padding: "8px 20px",
            background: "linear-gradient(135deg,#0891b2,#0e7490)",
            border: "none", borderRadius: 22,
            fontSize: 13, fontWeight: 700, color: "#fff",
            cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 2px 8px rgba(8,145,178,0.3)",
            minWidth: 100,
          }}
        />
      )}
      <ShareProfileButton
        username={username}
        profileType="company"
        style={{
          padding: "8px 20px",
          background: "#f0f9ff", border: "1.5px solid #bae6fd",
          borderRadius: 22, fontSize: 13, fontWeight: 700,
          color: "#0891b2", cursor: "pointer", fontFamily: "inherit",
          minWidth: 120,
        }}
      />
    </div>
  );
}
