export function getSafeAvatar(identity: any) {
  let avatar = identity?.avatar_url;

  if (
    !avatar ||
    avatar === "" ||
    avatar.includes("undefined") ||
    avatar.includes("avatar") ||
    !avatar.startsWith("http")
  ) {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      identity?.display_name || "User"
    )}&background=2563eb&color=fff`;
  }

  return avatar;
}
