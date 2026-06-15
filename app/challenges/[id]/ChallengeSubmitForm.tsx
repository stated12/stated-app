"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  challengeId:  string;
  requireText:  string;
  requireLink:  string;
  requireFile:  string;
  requireVideo: string;
}

export default function ChallengeSubmitForm({
  challengeId,
  requireText,
  requireLink,
  requireFile,
  requireVideo,
}: Props) {
  const router = useRouter();
  const [textResponse, setTextResponse]   = useState("");
  const [linkUrl, setLinkUrl]             = useState("");
  const [videoUrl, setVideoUrl]           = useState("");
  const [fileUrl, setFileUrl]             = useState("");
  const [fileName, setFileName]           = useState("");
  const [submitting, setSubmitting]       = useState(false);
  const [error, setError]                 = useState("");
  const [success, setSuccess]             = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/challenges/submit", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challenge_id:  challengeId,
          text_response: textResponse || null,
          link_url:      linkUrl      || null,
          file_url:      fileUrl      || null,
          file_name:     fileName     || null,
          video_url:     videoUrl     || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSuccess(true);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="font-display text-xl font-bold text-green-900 mb-2">
          Submission received
        </h3>
        <p className="text-sm text-green-700 font-light leading-relaxed max-w-sm mx-auto">
          Your response has been submitted. The poster will review all submissions and reach out to shortlisted candidates.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400" />
      <div className="p-7">
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-1">
          Submit your response
        </h2>
        <p className="text-sm text-gray-500 font-light mb-6">
          Your submission is public and visible to the challenge poster. Make it count.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Text response */}
          {requireText !== "disabled" && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                Text response
                {requireText === "required" && <span className="text-red-500 ml-1">*</span>}
                {requireText === "optional" && <span className="text-gray-400 text-xs font-normal ml-1">(optional)</span>}
              </label>
              <textarea
                value={textResponse}
                onChange={(e) => setTextResponse(e.target.value)}
                placeholder="Describe your approach, experience, or response to this challenge..."
                rows={6}
                maxLength={5000}
                required={requireText === "required"}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
              />
              <div className="text-xs text-gray-400 mt-1 text-right">{textResponse.length}/5000</div>
            </div>
          )}

          {/* Link */}
          {requireLink !== "disabled" && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                Link
                {requireLink === "required" && <span className="text-red-500 ml-1">*</span>}
                {requireLink === "optional" && <span className="text-gray-400 text-xs font-normal ml-1">(optional)</span>}
              </label>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://yourwork.com or GitHub, portfolio, live demo..."
                required={requireLink === "required"}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          )}

          {/* Video */}
          {requireVideo !== "disabled" && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                Video link
                {requireVideo === "required" && <span className="text-red-500 ml-1">*</span>}
                {requireVideo === "optional" && <span className="text-gray-400 text-xs font-normal ml-1">(optional)</span>}
              </label>
              <input
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="YouTube, Loom, Google Drive video link..."
                required={requireVideo === "required"}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          )}

          {/* File upload */}
          {requireFile !== "disabled" && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                File
                {requireFile === "required" && <span className="text-red-500 ml-1">*</span>}
                {requireFile === "optional" && <span className="text-gray-400 text-xs font-normal ml-1">(optional)</span>}
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Upload to Google Drive, Dropbox, or any cloud storage and paste the link below.
                Max 10MB. PDF, DOC, images accepted.
              </p>
              <input
                type="url"
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
                placeholder="Paste a shareable link to your file..."
                required={requireFile === "required"}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="File name (optional, e.g. MyProposal.pdf)"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-400 transition-all mt-2"
              />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Note */}
          <p className="text-xs text-gray-400 font-light leading-relaxed">
            By submitting you agree that your response will be visible to the challenge poster.
            Stated does not guarantee any outcome from your submission.
          </p>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-4 rounded-xl transition-all"
          >
            {submitting ? "Submitting..." : "Submit response"}
          </button>

        </form>
      </div>
    </div>
  );
}
