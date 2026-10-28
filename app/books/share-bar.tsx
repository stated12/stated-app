"use client";

import { useState } from "react";

export default function ShareBar({ path, title, slug }: { path: string; title: string; slug?: string }) {
  const [msg, setMsg] = useState("");

  async function copy(text: string, ok: string) {
    try {
      await navigator.clipboard.writeText(text);
      setMsg(ok);
    } catch {
      setMsg("Copy not available. Please copy the address from the browser.");
    }
    setTimeout(() => setMsg(""), 3000);
  }
  const url = () => window.location.origin + path;
  const inviteUrl = () => window.location.origin + "/books/" + slug + "?review=1#write-review";

  const btn =
    "text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 rounded-lg transition-all";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" className={btn} onClick={() => copy(url(), "Link copied")}>
        Copy link
      </button>
      <button
        type="button"
        className={btn}
        onClick={async () => {
          if (navigator.share) {
            try {
              await navigator.share({ title, url: url() });
              return;
            } catch {
              /* cancelled */
            }
          }
          copy(url(), "Link copied");
        }}
      >
        Share
      </button>
      {slug ? (
        <button
          type="button"
          className={btn}
          onClick={() =>
            copy(
              `Have you read ${title}? Share your honest review and help other readers discover it.\n${inviteUrl()}`,
              "Review invitation copied"
            )
          }
        >
          Copy review invitation
        </button>
      ) : null}
      <span role="status" className="text-xs text-gray-500">{msg}</span>
    </div>
  );
}
