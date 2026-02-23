"use client";

export default function ShareProfileButton({ username }: { username: string }) {
  const shareUrl = `https://app.stated.in/u/${username}`;

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `${username} on Stated`,
        url: shareUrl,
      });
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert("Profile link copied to clipboard");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Share Profile
    </button>
  );
}
