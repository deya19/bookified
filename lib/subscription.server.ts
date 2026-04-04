'use server';

import { auth } from '@clerk/nextjs/server';
import { PLANS, PlanType } from './subscription-constants';

export async function getUserPlan(): Promise<PlanType> {
  const { has } = await auth();

  if (has({ plan: PLANS.PRO })) {
    return PLANS.PRO;
  }

  if (has({ plan: PLANS.STANDARD })) {
    return PLANS.STANDARD;
  }

  return PLANS.FREE;
}

export async function checkPlanAccess(requiredPlan: PlanType): Promise<boolean> {
  const { has } = await auth();

  if (requiredPlan === PLANS.FREE) {
    return true;
  }

  if (requiredPlan === PLANS.STANDARD) {
    return has({ plan: PLANS.STANDARD }) || has({ plan: PLANS.PRO });
  }

  if (requiredPlan === PLANS.PRO) {
    return has({ plan: PLANS.PRO });
  }

  return false;
}
