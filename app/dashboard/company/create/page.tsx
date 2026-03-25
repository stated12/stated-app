"use client";

// Route: /dashboard/company/create
// Because this path starts with /dashboard/company, the layout
// automatically shows the company nav -- no query params needed.
// The CreateCommitmentForm detects company context via pathname too.

export const dynamic = "force-dynamic";

export { default } from "@/app/dashboard/create/page";
