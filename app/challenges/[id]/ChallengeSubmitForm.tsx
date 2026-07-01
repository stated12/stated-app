"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

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
  const [uploading, setUploading]         = useState(false);
  const [uploadError, setUploadError]     = useState("");
  const [submitting, setSubmitting]       = useState(false);
  const [error, setError]                 = useState("");
  const [success, setSuccess]             = useState(false);

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File must be under 10MB.");
      return;
    }

    setUploadError("");
    setUploading(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setUploadError("You must be logged in to upload."); setUploading(false); return; }

      const ext = file.name.split(".").pop();
      const path = `${challengeId}/${user.id}-${Date.now()}.${ext}`;

      const { error: uploadErr } = await supabase.storage
        .from("challenge-submissions")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadErr) {
        setUploadError("Upload failed: " + uploadErr.message);
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("challenge-submissions")
        .getPublicUrl(path);

      setFileUrl(urlData.publicUrl);
      setFileName(file.name);
    } catch {
      setUploadError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function removeFile() {
    setFileUrl("");
    setFileName("");
  }

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

          {/* File upload — real upload via Supabase Storage */}
          {requireFile !== "disabled" && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-1.5">
                File
                {requireFile === "required" && <span className="text-red-500 ml-1">*</span>}
                {requireFile === "optional" && <span className="text-gray-400 text-xs font-normal ml-1">(optional)</span>}
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Upload directly — PDF, DOC, images. Max 10MB.
              </p>

              {!fileUrl ? (
                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl px-4 py-8 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all">
                  <input
                    type="file"
                    onChange={handleFileSelect}
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
                    className="hidden"
                    disabled={uploading}
                  />
                  {uploading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
                      <span className="text-sm text-gray-500">Uploading...</span>
                    </>
                  ) : (
                    <>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                        <path d="M12 4v12m0-12l-4 4m4-4l4 4M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm text-gray-600 font-medium">Click to upload a file</span>
                      <span className="text-xs text-gray-400">PDF, DOC, or image up to 10MB</span>
                    </>
                  )}
                </label>
              ) : (
                <div className="flex items-center justify-between border border-green-200 bg-green-50 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-lg">📎</span>
                    <span className="text-sm text-gray-700 font-medium truncate">{fileName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-xs font-semibold text-red-600 hover:text-red-700 flex-shrink-0 ml-2"
                  >
                    Remove
                  </button>
                </div>
              )}

              {uploadError && (
                <div className="text-xs text-red-600 mt-2">{uploadError}</div>
              )}
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
            disabled={submitting || uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold py-4 rounded-xl transition-all"
          >
            {submitting ? "Submitting..." : "Submit response"}
          </button>

        </form>
      </div>
    </div>
  );
}
