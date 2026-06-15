"use client";

import { useState } from "react";

const STATUS_OPTIONS = [
  { value: "submitted",    label: "Submitted",    color: "bg-blue-50 text-blue-600 border-blue-200"     },
  { value: "under_review", label: "Under Review", color: "bg-amber-50 text-amber-700 border-amber-200"  },
  { value: "shortlisted",  label: "Shortlisted",  color: "bg-green-50 text-green-700 border-green-200"  },
  { value: "rejected",     label: "Not selected", color: "bg-gray-100 text-gray-400 border-gray-200"    },
  { value: "winner",       label: "Selected",     color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
];

export default function SubmissionActions({
  submissionId,
  currentStatus,
  currentNotes,
}: {
  submissionId:  string;
  currentStatus: string;
  currentNotes:  string;
}) {
  const [status, setStatus]   = useState(currentStatus);
  const [notes, setNotes]     = useState(currentNotes);
  const [open, setOpen]       = useState(false);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  async function save() {
    setSaving(true);
    try {
      const res = await fetch(`/api/challenges/update-submission`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submission_id: submissionId, status, notes }),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        setOpen(false);
      }
    } finally {
      setSaving(false);
    }
  }

  const currentOption = STATUS_OPTIONS.find((s) => s.value === status);

  return (
    <div>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setOpen(!open)}
          className="text-xs font-medium text-gray-600 border border-gray-200 hover:border-blue-400 hover:text-blue-600 px-3 py-1.5 rounded-lg transition-all"
        >
          Update status
        </button>
        {saved && (
          <span className="text-xs text-green-600 font-medium">Saved</span>
        )}
      </div>

      {open && (
        <div className="mt-3 bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
          <div>
            <div className="text-xs font-semibold text-gray-500 mb-2">Status</div>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStatus(opt.value)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                    status === opt.value
                      ? opt.color
                      : "bg-white text-gray-400 border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 mb-1.5">Private note (optional)</div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a private note about this submission..."
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 outline-none focus:border-blue-400 resize-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={save}
              disabled={saving}
              className="text-xs font-semibold bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="text-xs font-medium text-gray-400 hover:text-gray-700 px-3 py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
