import type { Metadata } from "next";
import Link from "next/link";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { CHALLENGE_TYPES, type ChallengeType } from "@/lib/challenges-config";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Challenges — Stated",
  description:
    "Browse open hiring challenges, cofounder hunts, partner searches and more. Submit real work. The best executor wins.",
  metadataBase: new URL("https://app.stated.in"),
  openGraph: {
    title: "Stated Challenges — Hire, Partner and Build Based on Work",
    description: "Browse open challenges. Submit real work. The best executor wins.",
    url: "https://app.stated.in/challenges",
    siteName: "Stated",
  },
  alternates: { canonical: "https://app.stated.in/challenges" },
};

const TYPE_FILTERS = [
  { value: "all",            label: "All challenges" },
  { value: "hiring",         label: "Hiring"         },
  { value: "cofounder",      label: "Cofounder Hunt" },
  { value: "partner",        label: "Partner Hunt"   },
  { value: "consultant",     label: "Consultant"     },
  { value: "investor_signal",label: "Investor Signal"},
  { value: "collaborator",   label: "Collaborator"   },
  { value: "impact",         label: "Impact"         },
  { value: "grant",          label: "Grant"          },
];

const COLOR_MAP: Record<string, { border: string; badge: string; text: string }> = {
  blue:   { border: "border-blue-200",   badge: "bg-blue-50 text-blue-700",   text: "text-blue-600"   },
  violet: { border: "border-violet-200", badge: "bg-violet-50 text-violet-700",text: "text-violet-600" },
  green:  { border: "border-green-200",  badge: "bg-green-50 text-green-700", text: "text-green-600"  },
  teal:   { border: "border-teal-200",   badge: "bg-teal-50 text-teal-700",   text: "text-teal-600"   },
  amber:  { border: "border-amber-200",  badge: "bg-amber-50 text-amber-700", text: "text-amber-600"  },
  rose:   { border: "border-rose-200",   badge: "bg-rose-50 text-rose-700",   text: "text-rose-600"   },
  slate:  { border: "border-slate-200",  badge: "bg-slate-50 text-slate-700", text: "text-slate-600"  },
};

function daysLeft(expiresAt: string) {
  const diff = new Date(expiresAt).getTime() - Date.now();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Closing today";
  if (days === 1) return "1 day left";
  return `${days} days left`;
}

export default async function ChallengesPage({
  searchParams,
}: {
  searchParams: { type?: string; q?: string };
}) {
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
  const filterType = searchParams.type || "all";
  const searchQuery = searchParams.q || "";

  // Fetch active challenges
  let query = supabase
    .from("challenges")
    .select(`
      id, title, type, description, what_winner_gets,
      deadline, expires_at, submission_count, max_submissions,
      featured, plan, location, tags,
      posted_by_type, company_id,
      profiles!posted_by_user_id ( full_name, username, avatar_url ),
      companies ( name, slug, logo_url )
    `)
    .eq("status", "active")
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(50);

  if (filterType !== "all") {
    query = query.eq("type", filterType);
  }
  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data: challenges } = await query;

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* HERO */}
      <section className="bg-white border-b border-gray-200 px-6 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                <span className="w-5 h-0.5 bg-blue-600 inline-block rounded" />
                Stated Challenges
              </p>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight mb-3">
                Hire. Partner. Build.<br />
                <span className="text-blue-600">Based on work.</span>
              </h1>
              <p className="text-gray-500 text-base font-light max-w-lg leading-relaxed">
                Browse open challenges from companies, founders, and organisations.
                Submit real work. The best executor wins — no CVs, no cold pitches.
              </p>
            </div>
            <Link
              href="/challenges/new"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg whitespace-nowrap shrink-0"
            >
              Post a Challenge
            </Link>
          </div>

          {/* Search */}
          <form method="GET" action="/challenges" className="mt-8 flex max-w-xl bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
            <input
              type="text"
              name="q"
              defaultValue={searchQuery}
              placeholder="Search challenges..."
              className="flex-1 px-5 py-3 text-gray-900 text-sm outline-none placeholder-gray-400 bg-transparent"
            />
            {filterType !== "all" && (
              <input type="hidden" name="type" value={filterType} />
            )}
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 transition-colors shrink-0">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* FILTERS */}
      <div className="bg-white border-b border-gray-200 px-6 py-0 sticky top-16 z-40">
        <div className="max-w-5xl mx-auto flex gap-0 overflow-x-auto scrollbar-hide">
          {TYPE_FILTERS.map((f) => (
            <Link
              key={f.value}
              href={f.value === "all" ? "/challenges" : `/challenges?type=${f.value}`}
              className={`whitespace-nowrap text-xs font-semibold px-4 py-3.5 border-b-2 transition-all ${
                filterType === f.value
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      </div>

      {/* CHALLENGES GRID */}
      <section className="px-6 py-10">
        <div className="max-w-5xl mx-auto">

          {!challenges?.length ? (
            <div className="text-center py-20">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-display text-xl font-bold text-gray-700 mb-2">No challenges found</h3>
              <p className="text-gray-400 text-sm mb-6">
                {searchQuery ? `No results for "${searchQuery}"` : "No active challenges in this category yet."}
              </p>
              <Link href="/challenges/new" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg">
                Post the first one
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challenges.map((c: any) => {
                const typeConfig = CHALLENGE_TYPES[c.type as ChallengeType];
                const colors = COLOR_MAP[typeConfig?.color || "blue"];
                const cCompanies = (c as any).companies;
                const cProfiles = (c as any).profiles;
                const posterName = c.posted_by_type === "company"
                  ? cCompanies?.name
                  : cProfiles?.full_name || cProfiles?.username;

                return (
                  <Link
                    key={c.id}
                    href={`/challenges/${c.id}`}
                    className={`bg-white border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all no-underline ${colors.border}`}
                  >
                    {/* Top accent */}
                    <div className={`h-1 w-full bg-gradient-to-r from-blue-600 to-blue-400`} />

                    <div className="p-5">
                      {/* Type badge + featured */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.badge}`}>
                          {typeConfig?.icon} {typeConfig?.label}
                        </span>
                        {c.featured && (
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
                            Featured
                          </span>
                        )}
                        <span className="ml-auto text-xs text-gray-400 font-light">
                          {daysLeft(c.expires_at)}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-display text-lg font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
                        {c.title}
                      </h2>

                      {/* Description */}
                      <p className="text-xs text-gray-500 font-light leading-relaxed mb-4 line-clamp-2">
                        {c.description}
                      </p>

                      {/* What winner gets */}
                      <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 mb-4">
                        <span className="text-xs text-gray-400 font-light">What you get: </span>
                        <span className="text-xs text-gray-700 font-medium">{c.what_winner_gets}</span>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between flex-wrap gap-2 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold">
                            {posterName?.[0]?.toUpperCase() || "?"}
                          </div>
                          <span className="text-xs text-gray-500 font-medium">{posterName || "Anonymous"}</span>
                          {c.location && (
                            <span className="text-xs text-gray-400">&middot; {c.location}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-400">
                            {c.submission_count} submitted
                          </span>
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                            Respond
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* POST CTA */}
      <section className="px-6 py-14 border-t border-gray-200">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
            Looking to hire, partner, or find a cofounder?
          </h2>
          <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 max-w-md mx-auto">
            Post a challenge. Receive real work as applications. Find exactly who you need
            with execution as the filter — not credentials.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/challenges/new"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-7 py-3.5 rounded-xl transition-all shadow-md"
            >
              Post a Challenge
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-7 py-3.5 rounded-xl transition-all"
            >
              Sign up free
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
