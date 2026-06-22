"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { CHALLENGE_TYPES, CHALLENGE_PRICES, PLANS, type ChallengeType } from "@/lib/challenges-config";

const TYPE_FILTERS = [
  { value: "all",             label: "All"             },
  { value: "hiring",          label: "Hiring"          },
  { value: "cofounder",       label: "Cofounder"       },
  { value: "partner",         label: "Partner"         },
  { value: "consultant",      label: "Consultant"      },
  { value: "investor_signal", label: "Investor Signal" },
  { value: "collaborator",    label: "Collaborator"    },
  { value: "impact",          label: "Impact"          },
  { value: "grant",           label: "Grant"           },
];

const ACCENT: Record<string, string[]> = {
  hiring:          ["border-blue-200",   "bg-blue-50 text-blue-700",    "text-blue-600",   "from-blue-600 to-blue-400"    ],
  cofounder:       ["border-violet-200", "bg-violet-50 text-violet-700","text-violet-600", "from-violet-600 to-violet-400"],
  partner:         ["border-green-200",  "bg-green-50 text-green-700",  "text-green-600",  "from-green-600 to-green-400"  ],
  consultant:      ["border-teal-200",   "bg-teal-50 text-teal-700",    "text-teal-600",   "from-teal-600 to-teal-400"    ],
  investor_signal: ["border-amber-200",  "bg-amber-50 text-amber-700",  "text-amber-600",  "from-amber-600 to-amber-400"  ],
  collaborator:    ["border-rose-200",   "bg-rose-50 text-rose-700",    "text-rose-600",   "from-rose-600 to-rose-400"    ],
  impact:          ["border-slate-200",  "bg-slate-50 text-slate-700",  "text-slate-600",  "from-slate-500 to-slate-400"  ],
  grant:           ["border-violet-200", "bg-violet-50 text-violet-700","text-violet-600", "from-violet-600 to-amber-400" ],
};

function daysLeft(expiresAt: string) {
  const d = Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 86400000);
  if (d <= 0) return "Closing today";
  if (d === 1) return "1 day left";
  return d + " days left";
}

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [loading, setLoading]       = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [search, setSearch]         = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const supabase = createClient();
      let q = supabase
        .from("challenges")
        .select("id,title,type,description,what_winner_gets,expires_at,submission_count,featured,location,posted_by_type")
        .eq("status", "active")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(50);
      if (filterType !== "all") q = q.eq("type", filterType);
      if (search.trim()) q = q.ilike("title", "%" + search.trim() + "%");
      const { data } = await q;
      setChallenges(data || []);
      setLoading(false);
    }
    load();
  }, [filterType, search]);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      <section style={{ background: "linear-gradient(180deg,#eef5ff 0%,#ffffff 100%)" }} className="px-6 pt-16 pb-12 border-b border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-blue-200 text-blue-700 text-xs font-semibold px-4 py-2 rounded-full mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Live now
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
            Hire. Partner. Build.<br />
            <span className="text-blue-600">Based on work.</span>
          </h1>
          <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto leading-relaxed mb-8">
            Post a challenge. Receive real work as applications. Find exactly who you need with execution as the filter.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <Link href="/challenges/new" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-7 py-3.5 rounded-xl transition-all shadow-md">
              Post a Challenge
            </Link>
            <a href="#browse" className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:border-blue-400 text-gray-700 text-sm font-medium px-7 py-3.5 rounded-xl transition-all">
              Browse open challenges
            </a>
          </div>
          <div className="flex flex-wrap gap-8 justify-center mb-12">
            {[["8","Challenge types"],["3","Plans from Rs.249"],["100%","Public by default"],["Free","To browse and apply"]].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="font-display text-2xl font-extrabold text-gray-900">{val}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n:"1", icon:"📋", title:"Post",     desc:"Choose type, fill details, pay to go live"        },
              { n:"2", icon:"📥", title:"Receive",  desc:"Real work submitted — text, links, files, video"  },
              { n:"3", icon:"🔍", title:"Evaluate", desc:"Review and shortlist from your dashboard"          },
              { n:"4", icon:"🤝", title:"Connect",  desc:"Reach out to winners — hire, partner, or build"   },
            ].map(({ n, icon, title, desc }) => (
              <div key={n} className="bg-white border border-gray-200 rounded-2xl p-5 text-center shadow-sm">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mx-auto mb-3">{n}</div>
                <div className="text-xl mb-2">{icon}</div>
                <div className="text-sm font-bold text-gray-900 mb-1">{title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">8 challenge types</p>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 mb-3">What can you post?</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.entries(CHALLENGE_TYPES) as [ChallengeType, any][]).map(([key, cfg]) => {
              const ac = ACCENT[key] || ACCENT["hiring"];
              return (
                <button key={key}
                  onClick={() => { setFilterType(key); document.getElementById("browse")?.scrollIntoView({ behavior:"smooth" }); }}
                  className={"text-left border " + ac[0] + " rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all bg-white cursor-pointer w-full"}>
                  <div className={"h-1 w-full bg-gradient-to-r " + ac[3]} />
                  <div className="p-4">
                    <div className="text-2xl mb-2">{cfg.icon}</div>
                    <div className="text-sm font-bold text-gray-900 mb-1">{cfg.label}</div>
                    <div className="text-xs text-gray-400 mb-2">{cfg.for}</div>
                    <span className="text-xs text-gray-400">From </span>
                    <span className={"text-xs font-bold " + ac[2]}>Rs.{CHALLENGE_PRICES[key].basic}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">What you get</p>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 mb-3">Built for real hiring and partnerships</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon:"🎯", title:"Work-based applications", body:"Applicants submit real work — not a CV. You evaluate execution, not credentials."   },
              { icon:"📊", title:"Submissions dashboard",   body:"Review every application in one place. Shortlist, reject, and mark winners."         },
              { icon:"📧", title:"Email invites included",  body:"Import contacts via CSV or paste emails. Send branded invites direct from Stated."   },
              { icon:"🌐", title:"Public challenge page",   body:"Every challenge gets a public shareable URL. Anyone can view and apply without signup."},
              { icon:"⭐", title:"Featured placement",      body:"Pro and Scale plans get featured on the browse page for more visibility."             },
              { icon:"🔔", title:"Instant notifications",  body:"Email alert the moment someone submits. Submitter gets a confirmation too."            },
            ].map(({ icon, title, body }) => (
              <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:border-blue-200 transition-all">
                <div className="text-2xl mb-3">{icon}</div>
                <h3 className="font-display font-bold text-gray-900 text-base mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 mb-3">One payment. Challenge goes live.</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">Prices shown for Hiring Challenge. All types from Rs.249.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            {(["basic","pro","scale"] as const).map(p => {
              const pl    = PLANS[p];
              const price = CHALLENGE_PRICES["hiring"][p];
              return (
                <div key={p} className={"border-2 rounded-2xl p-7 relative " + (p === "pro" ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white")}>
                  {pl.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">{pl.badge}</div>
                  )}
                  <div className={"text-3xl font-extrabold font-display mb-1 " + (p === "pro" ? "text-blue-700" : "text-gray-900")}>Rs.{price.toLocaleString("en-IN")}</div>
                  <div className="text-sm font-bold text-gray-600 mb-6">{pl.label}</div>
                  <div className="flex flex-col gap-3 mb-6">
                    {[
                      ["Active duration",    pl.durationDays + " days"],
                      ["Max submissions",    pl.maxSubmissions >= 999999 ? "Unlimited" : String(pl.maxSubmissions)],
                      ["Email invites",      pl.emailInvites + " included"],
                      ["CSV import",         pl.csvImport ? "Yes" : "No"],
                      ["Featured on Stated", pl.featured ? "Yes" : "No"],
                    ].map(([label, val]) => (
                      <div key={label} className="flex justify-between text-sm">
                        <span className="text-gray-500">{label}</span>
                        <span className={"font-semibold " + (val === "Yes" ? "text-green-600" : val === "No" ? "text-gray-300" : "text-gray-900")}>{val}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/challenges/new" className={"block text-center text-sm font-semibold py-3 rounded-xl transition-all no-underline " + (p === "pro" ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-gray-100 hover:bg-gray-200 text-gray-700")}>
                    Post with {pl.label}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
            <div className="text-sm font-bold text-gray-900 mb-4">Need more email invites? Add on anytime.</div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {[[25,149],[50,249],[100,449],[250,899],[500,1599]].map(([c,p]) => (
                <div key={c} className="bg-white border border-gray-200 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-gray-900">{c}</div>
                  <div className="text-xs text-gray-400 mb-1">contacts</div>
                  <div className="text-sm font-bold text-blue-600">Rs.{p}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="browse" className="bg-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-6">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Open challenges</p>
              <h2 className="font-display text-2xl font-extrabold text-gray-900">Browse and apply</h2>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search challenges..."
                className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none text-gray-900 placeholder-gray-400 w-44"
              />
              <Link href="/challenges/new" className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all whitespace-nowrap">
                Post a Challenge
              </Link>
            </div>
          </div>
          <div className="flex gap-0 overflow-x-auto border-b border-gray-200 mb-8">
            {TYPE_FILTERS.map(f => (
              <button key={f.value} onClick={() => setFilterType(f.value)}
                className={"whitespace-nowrap text-xs font-semibold px-4 py-3 border-b-2 transition-all " + (filterType === f.value ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-700")}>
                {f.label}
              </button>
            ))}
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
          ) : !challenges.length ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-display text-xl font-bold text-gray-700 mb-2">No challenges yet</h3>
              <p className="text-gray-400 text-sm mb-6">Be the first to post a challenge.</p>
              <Link href="/challenges/new" className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg">
                Post the first one
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {challenges.map((c: any) => {
                const cfg = CHALLENGE_TYPES[c.type as ChallengeType];
                const ac  = ACCENT[c.type] || ACCENT["hiring"];
                return (
                  <Link key={c.id} href={"/challenges/" + c.id}
                    className={"bg-white border " + ac[0] + " rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all no-underline"}>
                    <div className={"h-1 w-full bg-gradient-to-r " + ac[3]} />
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className={"text-xs font-semibold px-2.5 py-1 rounded-full " + ac[1]}>
                          {cfg?.icon} {cfg?.label}
                        </span>
                        {c.featured && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">Featured</span>}
                        <span className="ml-auto text-xs text-gray-400">{c.expires_at ? daysLeft(c.expires_at) : ""}</span>
                      </div>
                      <h3 className="font-display text-base font-bold text-gray-900 leading-snug mb-2">{c.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{c.description}</p>
                      <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 mb-4">
                        <span className="text-xs text-gray-400">What you get: </span>
                        <span className="text-xs text-gray-700 font-medium">{c.what_winner_gets}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-gray-400 capitalize">{c.posted_by_type}</span>
                          {c.location && <span className="text-xs text-gray-400">&middot; {c.location}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">{c.submission_count} applied</span>
                          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">Respond</span>
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

      <section className="bg-gray-900 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4">Ready to find who you need?</h2>
          <p className="text-gray-400 text-base font-light leading-relaxed mb-8 max-w-lg mx-auto">
            Post a challenge. Receive real work. Stop interviewing people who look good on paper.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/challenges/new" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-8 py-4 rounded-xl transition-all shadow-lg">
              Post a Challenge from Rs.249
            </Link>
            <Link href="/signup" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-8 py-4 rounded-xl transition-all border border-white/20">
              Create free account
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-5">Free to browse and apply. No signup needed to view challenges.</p>
        </div>
      </section>

    </div>
    </div>
    </div>
    </div>
  );
}
