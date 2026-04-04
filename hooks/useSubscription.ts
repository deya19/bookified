'use client';

import { useAuth } from '@clerk/nextjs';
import { PLANS, PLAN_LIMITS, PlanType, PlanLimits } from '@/lib/subscription-constants';

export interface SubscriptionInfo {
  plan: PlanType;
  limits: PlanLimits;
  isPro: boolean;
  isStandard: boolean;
  isFree: boolean;
  hasAccess: (requiredPlan: PlanType) => boolean;
}

export function useSubscription(): SubscriptionInfo {
  const { has } = useAuth();

  let plan: PlanType = PLANS.FREE;

  if (has?.({ plan: PLANS.PRO })) {
    plan = PLANS.PRO;
  } else if (has?.({ plan: PLANS.STANDARD })) {
    plan = PLANS.STANDARD;
  }

  const limits = PLAN_LIMITS[plan];

  const hasAccess = (requiredPlan: PlanType): boolean => {
    if (requiredPlan === PLANS.FREE) {
      return true;
    }

    if (requiredPlan === PLANS.STANDARD) {
      return has?.({ plan: PLANS.STANDARD }) || has?.({ plan: PLANS.PRO }) || false;
    }

    if (requiredPlan === PLANS.PRO) {
      return has?.({ plan: PLANS.PRO }) || false;
    }

    return false;
  };

  return {
    plan,
    limits,
    isPro: plan === PLANS.PRO,
    isStandard: plan === PLANS.STANDARD,
    isFree: plan === PLANS.FREE,
    hasAccess,
  };
}
