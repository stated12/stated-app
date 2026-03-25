// Route: /dashboard/company/billing
// Pathname keeps company nav active in layout.
// Passes workspace=company to billing page via searchParams.
export const dynamic = "force-dynamic";

import BillingPage from "@/app/billing/page";

export default function CompanyBillingPage() {
  return BillingPage({ searchParams: { workspace: "company" } });
}
