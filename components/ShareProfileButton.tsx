"use client";

export default function ShareProfileButton({
  username,
  profileType = "individual",
  className,
  style,
}: {
  username: string;
  profileType?: "individual" | "company";
  className?: string;
  style?: React.CSSProperties;
}) {
  const path = profileType === "company" ? "/c/" : "/u/";
  const shareUrl = "https://app.stated.in" + path + username;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: username + " on Stated", url: shareUrl });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Profile link copied to clipboard");
    }
  };

  return (
    <button
      onClick={handleShare}
      className={className ?? "mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"}
      style={style}
    >
      Share Profile
    </button>
  );
}
