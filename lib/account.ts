export type AccountType = "individual" | "company";

export interface AccountPlan {
  name: string;
  credits: number;
}

export const PLANS = {
  free: {
    name: "Free",
    credits: 2,
  },

  individual: {
    name: "Individual",
    credits: 20,
    price: 499,
  },

  company_standard: {
    name: "Company Standard",
    credits: 25,
    price: 1999,
  },

  company_growth: {
    name: "Company Growth",
    credits: 50,
    price: 2999,
  },

  company_scale: {
    name: "Company Scale",
    credits: 75,
    price: 4999,
  },
};

export function getAccountTypeLabel(type: AccountType) {
  if (type === "company") return "Company";
  return "Individual";
}

export function getPlanCredits(planKey: string): number {
  const plan = (PLANS as any)[planKey];
  if (!plan) return 0;
  return plan.credits;
}
