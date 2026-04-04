'use client';

import { useAuth } from '@clerk/nextjs';
import { PLANS, PlanType } from './subscription-constants';

export function useUserPlan(): PlanType {
  const { has } = useAuth();

  if (has?.({ plan: PLANS.PRO })) {
    return PLANS.PRO;
  }

  if (has?.({ plan: PLANS.STANDARD })) {
    return PLANS.STANDARD;
  }

  return PLANS.FREE;
}

export function usePlanAccess(requiredPlan: PlanType): boolean {
  const { has } = useAuth();

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
}
