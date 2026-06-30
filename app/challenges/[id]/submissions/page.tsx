import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { CHALLENGE_TYPES, SUBMISSION_STATUS_LABELS, type ChallengeType } from "@/lib/challenges-config";
import SubmissionActions from "./SubmissionActions";

export const dynamic = "force-dynamic";

export default async function SubmissionsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll(); },
        setAll() {},
      },
    }
  );
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) redirect(`/login?redirect=/challenges/${id}/submissions`);

  // Fetch challenge — must be owner
  const { data: challenge } = await supabase
    .from("challenges")
    .select("id, title, type, status, submission_count, max_submissions, posted_by_user_id, expires_at, invites_sent, invites_remaining")
    .eq("id", id)
    .single();

  if (!challenge) notFound();
  if (challenge.posted_by_user_id !== session.user.id) notFound();

  // Fetch all submissions with submitter profile
  const { data: submissions } = await supabase
    .from("challenge_submissions")
    .select(`
      id, created_at, status, poster_notes,
      text_response, link_url, file_url, file_name, video_url,
      profiles!submitted_by ( full_name, username, avatar_url )
    `)
    .eq("challenge_id", id)
    .order("created_at", { ascending: false });

  const typeConfig = CHALLENGE_TYPES[challenge.type as ChallengeType];

  const statusCounts = {
    submitted:    submissions?.filter((s) => s.status === "submitted").length    || 0,
    under_review: submissions?.filter((s) => s.status === "under_review").length || 0,
    shortlisted:  submissions?.filter((s) => s.status === "shortlisted").length  || 0,
    rejected:     submissions?.filter((s) => s.status === "rejected").length     || 0,
    winner:       submissions?.filter((s) => s.status === "winner").length       || 0,
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <Link href="/challenges" className="hover:text-gray-700">Challenges</Link>
                <span>/</span>
                <Link href={`/challenges/${challenge.id}`} className="hover:text-gray-700 truncate max-w-xs">
                  {challenge.title}
                </Link>
                <span>/</span>
                <span className="text-gray-600">Submissions</span>
              </div>
              <h1 className="font-display text-2xl font-bold text-gray-900 mb-1">{challenge.title}</h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                  {typeConfig?.icon} {typeConfig?.label}
                </span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  challenge.status === "active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"
                }`}>
                  {challenge.status}
                </span>
              </div>
            </div>
            <Link
              href={`/challenges/${challenge.id}`}
              className="text-xs font-medium text-gray-500 border border-gray-200 hover:border-gray-400 px-4 py-2 rounded-lg transition-all"
            >
              View public page
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          {Object.entries(statusCounts).map(([status, count]) => {
            const label = SUBMISSION_STATUS_LABELS[status];
            return (
              <div key={status} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
                <div className="font-display text-2xl font-bold text-gray-900 leading-none mb-1">{count}</div>
                <div className="text-xs text-gray-400">{label.label}</div>
              </div>
            );
          })}
        </div>

        {/* INVITES REMAINING */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-6 flex items-center justify-between flex-wrap gap-3">
          <div className="text-sm text-blue-800">
            <strong>{challenge.invites_remaining}</strong> email invites remaining
            &nbsp;&middot;&nbsp;
            <strong>{challenge.invites_sent}</strong> sent so far
          </div>
          <Link
            href={`/challenges/${challenge.id}/invite`}
            className="text-xs font-semibold text-blue-600 border border-blue-300 bg-white px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
          >
            Send invites
          </Link>
        </div>

        {/* SUBMISSIONS LIST */}
        {!submissions?.length ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
            <div className="text-4xl mb-4">📭</div>
            <h3 className="font-display text-xl font-bold text-gray-700 mb-2">No submissions yet</h3>
            <p className="text-gray-400 text-sm mb-5">Share your challenge to attract responses.</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://app.stated.in/challenges/" + challenge.id)}`}
                target="_blank" rel="noopener noreferrer"
                className="text-xs font-medium text-gray-600 border border-gray-200 hover:border-blue-500 hover:text-blue-600 px-4 py-2 rounded-lg transition-all"
              >
                Share on LinkedIn
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent("We posted a challenge on Stated: https://app.stated.in/challenges/" + challenge.id)}`}
                target="_blank" rel="noopener noreferrer"
                className="text-xs font-medium text-gray-600 border border-gray-200 hover:border-green-500 hover:text-green-600 px-4 py-2 rounded-lg transition-all"
              >
                Share on WhatsApp
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {submissions.map((sub: any) => {
              const statusLabel = SUBMISSION_STATUS_LABELS[sub.status];
              const subProfiles = (sub as any).profiles;
              const submitterName = subProfiles?.full_name || subProfiles?.username || "Anonymous";

              return (
                <div key={sub.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="p-5">

                    {/* Submitter + status */}
                    <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                      <Link
                        href={`/profile/${(sub as any).profiles?.username}`}
                        className="flex items-center gap-2.5 no-underline group"
                      >
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold shrink-0">
                          {submitterName[0]?.toUpperCase()}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {submitterName}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(sub.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </div>
                        </div>
                      </Link>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        sub.status === "shortlisted" ? "bg-green-50 text-green-700" :
                        sub.status === "winner"      ? "bg-emerald-50 text-emerald-700" :
                        sub.status === "rejected"    ? "bg-gray-100 text-gray-400" :
                        sub.status === "under_review"? "bg-amber-50 text-amber-700" :
                        "bg-blue-50 text-blue-600"
                      }`}>
                        {statusLabel.label}
                      </span>
                    </div>

                    {/* Submission content */}
                    {sub.text_response && (
                      <div className="mb-3">
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Response</div>
                        <p className="text-sm text-gray-700 font-light leading-relaxed whitespace-pre-line line-clamp-4">
                          {sub.text_response}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {sub.link_url && (
                        <a href={sub.link_url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium text-blue-600 border border-blue-200 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-600 hover:text-white transition-all no-underline">
                          🔗 View link
                        </a>
                      )}
                      {sub.file_url && (
                        <a href={sub.file_url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium text-gray-600 border border-gray-200 bg-gray-50 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-all no-underline">
                          📎 {sub.file_name || "View file"}
                        </a>
                      )}
                      {sub.video_url && (
                        <a href={sub.video_url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-medium text-rose-600 border border-rose-200 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-600 hover:text-white transition-all no-underline">
                          🎬 Watch video
                        </a>
                      )}
                    </div>

                    {/* Poster notes */}
                    {sub.poster_notes && (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-3">
                        <div className="text-xs font-semibold text-amber-700 mb-1">Your note</div>
                        <p className="text-xs text-amber-800 font-light">{sub.poster_notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <SubmissionActions
                      submissionId={sub.id}
                      currentStatus={sub.status}
                      currentNotes={sub.poster_notes || ""}
                    />

                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
