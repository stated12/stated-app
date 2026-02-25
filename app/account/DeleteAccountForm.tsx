"use client";

import { useState } from "react";

export default function DeleteAccountForm() {
  const [confirmText, setConfirmText] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValid = confirmText === "DELETE";

  async function handleDelete() {
    if (!isValid) return;

    setLoading(true);

    await fetch("/account/delete", {
      method: "POST",
    });

    window.location.href = "/";
  }

  return (
    <div className="bg-white rounded-xl shadow p-5 border border-red-200">
      <div className="font-semibold text-red-600 mb-2">
        Delete Account
      </div>

      <div className="text-sm text-gray-600 mb-4">
        This action permanently deletes your profile, commitments, and data.
        This cannot be undone.
      </div>

      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
        >
          Delete Account Permanently
        </button>
      ) : (
        <div className="space-y-4">
          <div className="text-sm">
            Type <strong>DELETE</strong> to confirm.
          </div>

          <input
            type="text"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />

          <div className="flex gap-3">
            <button
              disabled={!isValid || loading}
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Confirm Delete"}
            </button>

            <button
              onClick={() => {
                setShowConfirm(false);
                setConfirmText("");
              }}
              className="border px-4 py-2 rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
