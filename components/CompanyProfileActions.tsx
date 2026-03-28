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

export default function CompanyProfileActions({
  companyId,
  username,
  currentUserId,
  isOwner,
}: Props) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      {!isOwner && (
        <FollowButton
          currentUserId={currentUserId ?? undefined}
          targetCompanyId={companyId}
          style={{
            flex: 1, padding: "9px 0",
            background: "linear-gradient(135deg,#0891b2,#0e7490)",
            border: "none", borderRadius: 22,
            fontSize: 13, fontWeight: 700, color: "#fff",
            cursor: "pointer", fontFamily: "inherit",
            boxShadow: "0 2px 8px rgba(8,145,178,0.3)",
          }}
        />
      )}
      <ShareProfileButton
        username={username}
        profileType="company"
        style={{
          flex: 1, padding: "9px 0",
          background: "#f0f9ff", border: "1.5px solid #bae6fd",
          borderRadius: 22, fontSize: 13, fontWeight: 700,
          color: "#0891b2", cursor: "pointer", fontFamily: "inherit",
        }}
      />
    </div>
  );
}
