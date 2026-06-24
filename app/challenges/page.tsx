"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { CHALLENGE_TYPES, CHALLENGE_PRICES, PLANS, type ChallengeType } from "@/lib/challenges-config";

const FILTERS = [
  { v: "all", l: "All" }, { v: "hiring", l: "Hiring" },
  { v: "cofounder", l: "Cofounder" }, { v: "partner", l: "Partner" },
  { v: "consultant", l: "Consultant" }, { v: "investor_signal", l: "Investor Signal" },
  { v: "collaborator", l: "Collaborator" }, { v: "impact", l: "Impact" },
  { v: "grant", l: "Grant" },
];

const AC: Record<string, string[]> = {
  hiring:          ["border-blue-200",   "bg-blue-50 text-blue-700",    "text-blue-600",   "from-blue-600 to-blue-400"    ],
  cofounder:       ["border-violet-200", "bg-violet-50 text-violet-700","text-violet-600", "from-violet-600 to-violet-400"],
  partner:         ["border-green-200",  "bg-green-50 text-green-700",  "text-green-600",  "from-green-600 to-green-400"  ],
  consultant:      ["border-teal-200",   "bg-teal-50 text-teal-700",    "text-teal-600",   "from-teal-600 to-teal-400"    ],
  investor_signal: ["border-amber-200",  "bg-amber-50 text-amber-700",  "text-amber-600",  "from-amber-600 to-amber-400"  ],
  collaborator:    ["border-rose-200",   "bg-rose-50 text-rose-700",    "text-rose-600",   "from-rose-600 to-rose-400"    ],
  impact:          ["border-slate-200",  "bg-slate-50 text-slate-700",  "text-slate-600",  "from-slate-500 to-slate-400"  ],
  grant:           ["border-violet-200", "bg-violet-50 text-violet-700","text-violet-600", "from-violet-600 to-amber-400" ],
};

function dl(exp: string) {
  const d = Math.ceil((new Date(exp).getTime() - Date.now()) / 86400000);
  return d <= 0 ? "Closing today" : d + " days left";
}

export default function ChallengesPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [busy, setBusy] = useState(true);
  const [ft, setFt]     = useState("all");
  const [q, setQ]       = useState("");

  useEffect(() => {
    setBusy(true);
    const sb = createClient();
    let qry = sb
      .from("challenges")
      .select("id,title,type,description,what_winner_gets,expires_at,submission_count,featured,location,posted_by_type")
      .eq("status", "active")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(50);
    if (ft !== "all") qry = qry.eq("type", ft);
    if (q.trim()) qry = qry.ilike("title", "%" + q.trim() + "%");
    qry.then(({ data }) => { setRows(data || []); setBusy(false); });
  }, [ft, q]);

  return (
    <div className="min-h-screen bg-white">

      <section style={{ background: "linear-gradient(180deg,#eef5ff 0%,#fff 100%)" }} className="px-6 pt-16 pb-12 border-b border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
            Hire. Partner. Build.<br /><span className="text-blue-600">Based on work.</span>
          </h1>
          <p className="text-gray-500 text-lg font-light max-w-2xl mx-auto mb-8">
            Post a challenge. Receive real work. Find who you need with execution as the filter.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <Link href="/challenges/new" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-7 py-3.5 rounded-xl shadow-md transition-all">Post a Challenge</Link>
            <a href="#browse" className="bg-white border border-gray-300 hover:border-blue-400 text-gray-700 text-sm font-medium px-7 py-3.5 rounded-xl transition-all">Browse open challenges</a>
          </div>
          <div className="flex flex-wrap gap-8 justify-center">
            <div className="text-center"><div className="font-display text-2xl font-extrabold text-gray-900">8</div><div className="text-xs text-gray-500">Challenge types</div></div>
            <div className="text-center"><div className="font-display text-2xl font-extrabold text-gray-900">3</div><div className="text-xs text-gray-500">Plans from Rs.249</div></div>
            <div className="text-center"><div className="font-display text-2xl font-extrabold text-gray-900">100%</div><div className="text-xs text-gray-500">Public by default</div></div>
            <div className="text-center"><div className="font-display text-2xl font-extrabold text-gray-900">Free</div><div className="text-xs text-gray-500">To browse and apply</div></div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">8 challenge types</p>
            <h2 className="font-display text-3xl font-extrabold text-gray-900">What can you post?</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.entries(CHALLENGE_TYPES) as [ChallengeType, any][]).map(([key, cfg]) => (
              <button key={key}
                onClick={() => { setFt(key); document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" }); }}
                className={"text-left border " + (AC[key]||AC["hiring"])[0] + " rounded-2xl overflow-hidden hover:shadow-lg transition-all bg-white cursor-pointer w-full"}>
                <div className={"h-1 w-full bg-gradient-to-r " + (AC[key]||AC["hiring"])[3]} />
                <div className="p-4">
                  <div className="text-2xl mb-2">{cfg.icon}</div>
                  <div className="text-sm font-bold text-gray-900 mb-1">{cfg.label}</div>
                  <div className="text-xs text-gray-400 mb-2">{cfg.for}</div>
                  <span className="text-xs text-gray-400">From </span>
                  <span className={"text-xs font-bold " + (AC[key]||AC["hiring"])[2]}>Rs.{CHALLENGE_PRICES[key].basic}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 px-6 py-16 border-b border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">What you get</p>
            <h2 className="font-display text-3xl font-extrabold text-gray-900">Built for real hiring and partnerships</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"><div className="text-2xl mb-3">🎯</div><h3 className="font-bold text-gray-900 mb-2">Work-based applications</h3><p className="text-sm text-gray-500">Applicants submit real work — not a CV. Evaluate execution.</p></div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"><div className="text-2xl mb-3">📊</div><h3 className="font-bold text-gray-900 mb-2">Submissions dashboard</h3><p className="text-sm text-gray-500">Review all applications. Shortlist, reject, mark winners.</p></div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"><div className="text-2xl mb-3">📧</div><h3 className="font-bold text-gray-900 mb-2">Email invites included</h3><p className="text-sm text-gray-500">Import CSV or paste emails. Send branded invites from Stated.</p></div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"><div className="text-2xl mb-3">🌐</div><h3 className="font-bold text-gray-900 mb-2">Public challenge page</h3><p className="text-sm text-gray-500">Shareable URL. Anyone can view and apply without signup.</p></div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"><div className="text-2xl mb-3">⭐</div><h3 className="font-bold text-gray-900 mb-2">Featured placement</h3><p className="text-sm text-gray-500">Pro and Scale plans get featured on the browse page.</p></div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"><div className="text-2xl mb-3">🔔</div><h3 className="font-bold text-gray-900 mb-2">Instant notifications</h3><p className="text-sm text-gray-500">Email alert on every submission. Submitter gets a confirmation.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16 border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Pricing</p>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 mb-3">One payment. Challenge goes live.</h2>
            <p className="text-gray-500 text-sm">Prices shown for Hiring Challenge. All types from Rs.249.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="border-2 border-gray-200 rounded-2xl p-7">
              <div className="text-3xl font-extrabold font-display text-gray-900 mb-1">Rs.799</div>
              <div className="text-sm font-bold text-gray-600 mb-4">Basic</div>
              <div className="text-sm text-gray-500 mb-1">30 days active</div>
              <div className="text-sm text-gray-500 mb-1">100 submissions</div>
              <div className="text-sm text-gray-500 mb-6">50 email invites</div>
              <Link href="/challenges/new" className="block text-center text-sm font-semibold py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 no-underline">Post Basic</Link>
            </div>
            <div className="border-2 border-blue-600 rounded-2xl p-7 bg-blue-50 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">Most popular</div>
              <div className="text-3xl font-extrabold font-display text-blue-700 mb-1">Rs.1,999</div>
              <div className="text-sm font-bold text-gray-600 mb-4">Pro</div>
              <div className="text-sm text-gray-500 mb-1">60 days active</div>
              <div className="text-sm text-gray-500 mb-1">500 submissions</div>
              <div className="text-sm text-gray-500 mb-1">200 email invites</div>
              <div className="text-sm text-gray-500 mb-6">Featured on Stated</div>
              <Link href="/challenges/new" className="block text-center text-sm font-semibold py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white no-underline">Post Pro</Link>
            </div>
            <div className="border-2 border-gray-200 rounded-2xl p-7">
              <div className="text-3xl font-extrabold font-display text-gray-900 mb-1">Rs.4,499</div>
              <div className="text-sm font-bold text-gray-600 mb-4">Scale</div>
              <div className="text-sm text-gray-500 mb-1">90 days active</div>
              <div className="text-sm text-gray-500 mb-1">Unlimited submissions</div>
              <div className="text-sm text-gray-500 mb-1">500 email invites</div>
              <div className="text-sm text-gray-500 mb-6">CSV import + Featured</div>
              <Link href="/challenges/new" className="block text-center text-sm font-semibold py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 no-underline">Post Scale</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="browse" className="bg-gray-50 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-6">
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Open challenges</p>
              <h2 className="font-display text-2xl font-extrabold text-gray-900">Browse and apply</h2>
            </div>
            <div className="flex gap-3">
              <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." className="border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none w-40" />
              <Link href="/challenges/new" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all whitespace-nowrap">Post a Challenge</Link>
            </div>
          </div>
          <div className="flex overflow-x-auto border-b border-gray-200 mb-8">
            {FILTERS.map(f => (
              <button key={f.v} onClick={() => setFt(f.v)} className={"whitespace-nowrap text-xs font-semibold px-4 py-3 border-b-2 transition-all " + (ft === f.v ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-700")}>{f.l}</button>
            ))}
          </div>
          {busy ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
            </div>
          ) : rows.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-display text-xl font-bold text-gray-700 mb-2">No challenges yet</h3>
              <p className="text-gray-400 text-sm mb-6">Be the first to post a challenge.</p>
              <Link href="/challenges/new" className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg">Post the first one</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rows.map((c: any) => {
                const cfg = CHALLENGE_TYPES[c.type as ChallengeType];
                const ac = AC[c.type] || AC["hiring"];
                return (
                  <Link key={c.id} href={"/challenges/" + c.id} className={"bg-white border " + ac[0] + " rounded-2xl overflow-hidden hover:shadow-lg transition-all no-underline"}>
                    <div className={"h-1 w-full bg-gradient-to-r " + ac[3]} />
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className={"text-xs font-semibold px-2.5 py-1 rounded-full " + ac[1]}>{cfg?.icon} {cfg?.label}</span>
                        {c.featured && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">Featured</span>}
                        <span className="ml-auto text-xs text-gray-400">{c.expires_at ? dl(c.expires_at) : ""}</span>
                      </div>
                      <h3 className="font-display text-base font-bold text-gray-900 mb-2">{c.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{c.description}</p>
                      <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2 mb-4">
                        <span className="text-xs text-gray-400">What you get: </span>
                        <span className="text-xs text-gray-700 font-medium">{c.what_winner_gets}</span>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-400 capitalize">{c.posted_by_type}{c.location ? " · " + c.location : ""}</span>
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
          <p className="text-gray-400 text-base leading-relaxed mb-8">Post a challenge. Receive real work. Stop interviewing people who look good on paper.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/challenges/new" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-8 py-4 rounded-xl shadow-lg transition-all">Post a Challenge from Rs.249</Link>
            <Link href="/signup" className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-8 py-4 rounded-xl border border-white/20 transition-all">Create free account</Link>
          </div>
          <p className="text-xs text-gray-500 mt-5">Free to browse and apply. No signup needed.</p>
        </div>
      </section>

    </div>
  );
}
