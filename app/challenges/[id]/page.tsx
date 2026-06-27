import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { CHALLENGE_TYPES, type ChallengeType } from "@/lib/challenges-config";
import ChallengeSubmitForm from "./ChallengeSubmitForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
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
  const { data } = await supabase
    .from("challenges")
    .select("title, description, type")
    .eq("id", params.id)
    .single();

  if (!data) return { title: "Challenge not found | Stated" };

  return {
    title: `${data.title} | Stated Challenges`,
    description: data.description?.slice(0, 160),
    openGraph: {
      title: data.title,
      description: data.description?.slice(0, 160),
      url: `https://app.stated.in/challenges/${params.id}`,
      siteName: "Stated",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description?.slice(0, 160),
    },
    alternates: { canonical: `https://app.stated.in/challenges/${params.id}` },
  };
}

function daysLeft(expiresAt: string) {
  const diff = new Date(expiresAt).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Closing today";
  if (days === 1) return "1 day left";
  return `${days} days left`;
}

export default async function ChallengePage({ params }: { params: { id: string } }) {
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

  // Get current user
  const { data: { session } } = await supabase.auth.getSession();

  // Fetch challenge
  const { data: challenge } = await supabase
    .from("challenges")
    .select(`
      id, title, type, description, what_we_need,
      evaluation_criteria, what_winner_gets,
      deadline, expires_at, status,
      submission_count, max_submissions,
      require_text, require_link, require_file, require_video,
      featured, plan, location, tags,
      posted_by_type, posted_by_user_id, company_id,
      view_count,
      profiles!posted_by_user_id ( full_name, username, avatar_url ),
      companies ( name, slug, logo_url )
    `)
    .eq("id", params.id)
    .single();

  if (!challenge || !["active", "closed"].includes(challenge.status)) {
    notFound();
  }

  // Increment view count (fire and forget)
  supabase.rpc("increment_challenge_views", { challenge_uuid: params.id });

  // Check if current user already submitted
  let alreadySubmitted = false;
  if (session?.user) {
    const { data: existing } = await supabase
      .from("challenge_submissions")
      .select("id")
      .eq("challenge_id", params.id)
      .eq("submitted_by", session.user.id)
      .single();
    alreadySubmitted = !!existing;
  }

  const isOwner = session?.user?.id === challenge.posted_by_user_id;
  const typeConfig = CHALLENGE_TYPES[challenge.type as ChallengeType];
  const companies = challenge.companies as any;
  const profiles = challenge.profiles as any;
  const posterName = challenge.posted_by_type === "company"
    ? companies?.name
    : profiles?.full_name || profiles?.username;
  const posterSlug = challenge.posted_by_type === "company"
    ? `/company/${companies?.slug}`
    : `/profile/${profiles?.username}`;

  const submissionFields = [
    { key: "require_text",  label: "Text response", icon: "📝" },
    { key: "require_link",  label: "Link",           icon: "🔗" },
    { key: "require_file",  label: "File upload",    icon: "📎" },
    { key: "require_video", label: "Video link",     icon: "🎬" },
  ].filter((f) => (challenge as any)[f.key] !== "disabled");

  const shareUrl = `https://app.stated.in/challenges/${params.id}`;
  const shareText = `"${challenge.title}" — a challenge on Stated. Submit real work to respond.`;

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link href="/challenges" className="hover:text-gray-700 transition-colors">Challenges</Link>
          <span>/</span>
          <span className="text-gray-600 truncate max-w-xs">{challenge.title}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-[1fr_320px] gap-6 items-start">

          {/* LEFT — main content */}
          <div className="flex flex-col gap-5">

            {/* Header card */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400" />
              <div className="p-7">

                {/* Type + status badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
                    {typeConfig?.icon} {typeConfig?.label}
                  </span>
                  {challenge.featured && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
                      Featured
                    </span>
                  )}
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    challenge.status === "active"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}>
                    {challenge.status === "active" ? "Active" : "Closed"}
                  </span>
                  {challenge.status === "active" && (
                    <span className="ml-auto text-xs text-gray-400">{daysLeft(challenge.expires_at)}</span>
                  )}
                </div>

                <h1 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                  {challenge.title}
                </h1>

                {/* Poster */}
                <Link href={posterSlug} className="inline-flex items-center gap-2.5 mb-5 no-underline group">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-sm font-bold">
                    {posterName?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {posterName}
                    </div>
                    <div className="text-xs text-gray-400 capitalize">
                      {challenge.posted_by_type} &middot; {challenge.location || "India"}
                    </div>
                  </div>
                </Link>

                <p className="text-sm text-gray-600 font-light leading-relaxed">{challenge.description}</p>

              </div>
            </div>

            {/* What we need */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="font-display text-lg font-bold text-gray-900 mb-3">What we need</h2>
              <p className="text-sm text-gray-600 font-light leading-relaxed whitespace-pre-line">
                {challenge.what_we_need}
              </p>
            </div>

            {/* Evaluation criteria */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="font-display text-lg font-bold text-gray-900 mb-3">How we evaluate</h2>
              <p className="text-sm text-gray-600 font-light leading-relaxed whitespace-pre-line">
                {challenge.evaluation_criteria}
              </p>
            </div>

            {/* What you get */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold text-blue-900 mb-2">What you get</h2>
              <p className="text-sm text-blue-800 font-light leading-relaxed">{challenge.what_winner_gets}</p>
            </div>

            {/* Submission format */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="font-display text-lg font-bold text-gray-900 mb-4">How to respond</h2>
              <div className="flex flex-col gap-2">
                {submissionFields.map((f) => {
                  const val = (challenge as any)[f.key];
                  return (
                    <div key={f.key} className="flex items-center gap-3">
                      <span className="text-base">{f.icon}</span>
                      <span className="text-sm text-gray-700">{f.label}</span>
                      <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full ${
                        val === "required"
                          ? "bg-red-50 text-red-600"
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        {val === "required" ? "Required" : "Optional"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tags */}
            {challenge.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {challenge.tags.map((tag: string) => (
                  <span key={tag} className="text-xs text-gray-500 bg-gray-100 border border-gray-200 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

          </div>

          {/* RIGHT — sticky sidebar */}
          <div className="flex flex-col gap-4 md:sticky md:top-24">

            {/* Stats card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="grid grid-cols-3 gap-0 divide-x divide-gray-100 mb-5">
                {[
                  { val: challenge.submission_count,                       label: "Submitted" },
                  { val: daysLeft(challenge.expires_at),                   label: "Deadline" },
                  { val: challenge.view_count,                             label: "Views" },
                ].map(({ val, label }) => (
                  <div key={label} className="text-center px-3">
                    <div className="font-display text-xl font-bold text-gray-900 leading-none mb-1">{val}</div>
                    <div className="text-xs text-gray-400">{label}</div>
                  </div>
                ))}
              </div>

              {/* Submit button / state */}
              {isOwner ? (
                <Link
                  href={`/challenges/${challenge.id}/submissions`}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-all"
                >
                  View Submissions ({challenge.submission_count})
                </Link>
              ) : challenge.status !== "active" ? (
                <div className="w-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm font-medium py-3.5 rounded-xl">
                  Challenge closed
                </div>
              ) : alreadySubmitted ? (
                <div className="w-full flex items-center justify-center bg-green-50 text-green-700 text-sm font-semibold py-3.5 rounded-xl border border-green-200">
                  ✓ You have submitted
                </div>
              ) : !session ? (
                <Link
                  href={`/login?redirect=/challenges/${challenge.id}`}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3.5 rounded-xl transition-all no-underline"
                >
                  Sign in to respond
                </Link>
              ) : null}
            </div>

            {/* Share */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Share this challenge</div>
              <div className="flex flex-col gap-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-medium text-gray-600 border border-gray-200 hover:border-blue-500 hover:text-blue-600 bg-white px-3 py-2.5 rounded-lg transition-all no-underline"
                >
                  <span>🔗</span> Share on LinkedIn
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-medium text-gray-600 border border-gray-200 hover:border-gray-900 hover:text-gray-900 bg-white px-3 py-2.5 rounded-lg transition-all no-underline"
                >
                  <span>𝕏</span> Share on Twitter
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-medium text-gray-600 border border-gray-200 hover:border-green-500 hover:text-green-600 bg-white px-3 py-2.5 rounded-lg transition-all no-underline"
                >
                  <span>💬</span> Share on WhatsApp
                </a>
              </div>
            </div>

            {/* Poster profile link */}
            <Link
              href={posterSlug}
              className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex items-center gap-3 hover:border-blue-200 transition-all no-underline"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                {posterName?.[0]?.toUpperCase() || "?"}
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">{posterName}</div>
                <div className="text-xs text-gray-400">View all commitments and challenges</div>
              </div>
            </Link>

          </div>
        </div>

        {/* SUBMIT FORM — only show if logged in, not owner, not already submitted, challenge active */}
        {session && !isOwner && !alreadySubmitted && challenge.status === "active" && (
          <div className="mt-8" id="submit">
            <ChallengeSubmitForm
              challengeId={challenge.id}
              requireText={challenge.require_text}
              requireLink={challenge.require_link}
              requireFile={challenge.require_file}
              requireVideo={challenge.require_video}
            />
          </div>
        )}

      </div>
    </div>
  );
      }
