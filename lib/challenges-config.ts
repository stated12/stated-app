// lib/challenges-config.ts
// Central config for all challenge types, plans, and pricing
// Import this wherever you need challenge data

export type ChallengeType =
  | "hiring"
  | "cofounder"
  | "partner"
  | "consultant"
  | "investor_signal"
  | "collaborator"
  | "impact"
  | "grant";

export type ChallengePlan = "basic" | "pro" | "scale";

export type SubmissionFieldConfig = "required" | "optional" | "disabled";

// ── CHALLENGE TYPE DEFINITIONS ────────────────────────────────────────────────
export const CHALLENGE_TYPES: Record<
  ChallengeType,
  {
    label:       string;
    icon:        string;
    for:         string;
    tagline:     string;
    description: string;
    color:       string;
    bgColor:     string;
    // Default submission field config for this type
    defaults: {
      require_text:  SubmissionFieldConfig;
      require_link:  SubmissionFieldConfig;
      require_file:  SubmissionFieldConfig;
      require_video: SubmissionFieldConfig;
    };
  }
> = {
  hiring: {
    label:       "Hiring Challenge",
    icon:        "💼",
    for:         "Companies & Individuals",
    tagline:     "Hire the best executor, not the best CV writer",
    description: "Post a real task. Receive actual work as applications. The best execution wins the role.",
    color:       "blue",
    bgColor:     "bg-blue-50",
    defaults:    { require_text: "required", require_link: "optional", require_file: "optional", require_video: "disabled" },
  },
  cofounder: {
    label:       "Cofounder Hunt",
    icon:        "🤝",
    for:         "Founders & Individuals",
    tagline:     "Find who actually builds with you before committing",
    description: "Post a scoped task. See who executes before you partner. Real proof over promises.",
    color:       "violet",
    bgColor:     "bg-violet-50",
    defaults:    { require_text: "required", require_link: "optional", require_file: "disabled", require_video: "optional" },
  },
  partner: {
    label:       "Partner Hunt",
    icon:        "🔗",
    for:         "Companies & Founders",
    tagline:     "Evaluate real intent through a proposal, not a pitch",
    description: "Find integration partners, resellers, or distribution allies through real proposals.",
    color:       "green",
    bgColor:     "bg-green-50",
    defaults:    { require_text: "required", require_link: "required", require_file: "optional", require_video: "disabled" },
  },
  consultant: {
    label:       "Consultant Hunt",
    icon:        "🧠",
    for:         "Companies & Anyone",
    tagline:     "Hire the expert who already showed you what they can do",
    description: "Post the problem. Get a solution as the application. Hire on demonstrated expertise.",
    color:       "teal",
    bgColor:     "bg-teal-50",
    defaults:    { require_text: "required", require_link: "optional", require_file: "optional", require_video: "disabled" },
  },
  investor_signal: {
    label:       "Investor Signal",
    icon:        "📡",
    for:         "Founders & Companies",
    tagline:     "Let investors evaluate your execution history, not your deck",
    description: "Post your traction challenge publicly. Let investors evaluate real proof over polished decks.",
    color:       "amber",
    bgColor:     "bg-amber-50",
    defaults:    { require_text: "required", require_link: "required", require_file: "optional", require_video: "optional" },
  },
  collaborator: {
    label:       "Collaborator Hunt",
    icon:        "⚡",
    for:         "Individuals & Creators",
    tagline:     "Find collaborators who prove value before joining",
    description: "No more co-creators who disappear after week one. Find people who show up by showing work.",
    color:       "rose",
    bgColor:     "bg-rose-50",
    defaults:    { require_text: "required", require_link: "optional", require_file: "optional", require_video: "optional" },
  },
  impact: {
    label:       "Impact Challenge",
    icon:        "🌱",
    for:         "NGOs & Govt. Initiatives",
    tagline:     "Every outcome is on public record",
    description: "Post public accountability commitments and open challenges for volunteers or partners.",
    color:       "slate",
    bgColor:     "bg-slate-50",
    defaults:    { require_text: "required", require_link: "optional", require_file: "optional", require_video: "disabled" },
  },
  grant: {
    label:       "Grant & Fellowship",
    icon:        "🎓",
    for:         "Institutions & Accelerators",
    tagline:     "The best execution wins the seat, not the best essay",
    description: "Post selection challenges. Applicants submit real work. Evaluate fairly at scale.",
    color:       "violet",
    bgColor:     "bg-violet-50",
    defaults:    { require_text: "required", require_link: "optional", require_file: "required", require_video: "disabled" },
  },
};

// ── PLAN DEFINITIONS ─────────────────────────────────────────────────────────
export const PLANS: Record<
  ChallengePlan,
  {
    label:           string;
    durationDays:    number;
    maxSubmissions:  number;
    emailInvites:    number;
    csvImport:       boolean;
    featured:        boolean;
    prioritySupport: boolean;
    badge:           string | null;
  }
> = {
  basic: {
    label:           "Basic",
    durationDays:    30,
    maxSubmissions:  100,
    emailInvites:    50,
    csvImport:       false,
    featured:        false,
    prioritySupport: false,
    badge:           null,
  },
  pro: {
    label:           "Pro",
    durationDays:    60,
    maxSubmissions:  500,
    emailInvites:    200,
    csvImport:       true,
    featured:        true,
    prioritySupport: false,
    badge:           "Most popular",
  },
  scale: {
    label:           "Scale",
    durationDays:    90,
    maxSubmissions:  999999,
    emailInvites:    500,
    csvImport:       true,
    featured:        true,
    prioritySupport: true,
    badge:           "Best value",
  },
};

// ── PRICING (in paise — multiply by 100 for Razorpay) ────────────────────────
// Format: { [challengeType]: { basic, pro, scale } } all in INR
export const CHALLENGE_PRICES: Record<ChallengeType, Record<ChallengePlan, number>> = {
  hiring:           { basic: 799,  pro: 1999, scale: 4499  },
  cofounder:        { basic: 399,  pro: 999,  scale: 2499  },
  partner:          { basic: 599,  pro: 1499, scale: 3499  },
  consultant:       { basic: 799,  pro: 1999, scale: 4499  },
  investor_signal:  { basic: 799,  pro: 1999, scale: 4499  },
  collaborator:     { basic: 249,  pro: 699,  scale: 1799  },
  impact:           { basic: 399,  pro: 999,  scale: 2499  },
  grant:            { basic: 999,  pro: 2499, scale: 0     }, // scale = contact
};

// ── EMAIL ADD-ON PACKS (INR) ──────────────────────────────────────────────────
export const EMAIL_ADDON_PACKS: Array<{
  contacts: number;
  price:    number;  // INR
  label:    string;
}> = [
  { contacts: 25,  price: 149,  label: "25 contacts"  },
  { contacts: 50,  price: 249,  label: "50 contacts"  },
  { contacts: 100, price: 449,  label: "100 contacts" },
  { contacts: 250, price: 899,  label: "250 contacts" },
  { contacts: 500, price: 1599, label: "500 contacts" },
];

// ── SUBMISSION STATUS LABELS ──────────────────────────────────────────────────
export const SUBMISSION_STATUS_LABELS: Record<string, { label: string; color: string }> = {
  submitted:    { label: "Submitted",    color: "blue"   },
  under_review: { label: "Under Review", color: "amber"  },
  shortlisted:  { label: "Shortlisted",  color: "green"  },
  rejected:     { label: "Not selected", color: "gray"   },
  winner:       { label: "Selected",     color: "emerald"},
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
export function getPriceInPaise(type: ChallengeType, plan: ChallengePlan): number {
  return CHALLENGE_PRICES[type][plan] * 100;
}

export function getPriceDisplay(type: ChallengeType, plan: ChallengePlan): string {
  const price = CHALLENGE_PRICES[type][plan];
  if (price === 0) return "Contact us";
  return `Rs.${price.toLocaleString("en-IN")}`;
}

export function getChallengePlanFeatures(plan: ChallengePlan) {
  return PLANS[plan];
}
