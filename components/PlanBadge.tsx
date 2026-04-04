'use client';

import { useUserPlan } from '@/lib/subscription.client';
import { PLANS, PLAN_LIMITS } from '@/lib/subscription-constants';
import { Crown, Sparkles } from 'lucide-react';

export function PlanBadge() {
  const plan = useUserPlan();

  const planConfig = {
    [PLANS.FREE]: {
      label: 'Free',
      icon: null,
      className: 'bg-gray-100 text-gray-700',
    },
    [PLANS.STANDARD]: {
      label: 'Standard',
      icon: Sparkles,
      className: 'bg-blue-100 text-blue-700',
    },
    [PLANS.PRO]: {
      label: 'Pro',
      icon: Crown,
      className: 'bg-purple-100 text-purple-700',
    },
  };

  const config = planConfig[plan];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${config.className}`}>
      {Icon && <Icon className="w-4 h-4" />}
      <span>{config.label}</span>
    </div>
  );
}

export function PlanLimitsDisplay() {
  const plan = useUserPlan();
  const limits = PLAN_LIMITS[plan];

  return (
    <div className="bg-white rounded-lg p-4 border border-[var(--border-subtle)]">
      <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
        <PlanBadge />
        <span>Plan Limits</span>
      </h3>
      <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
        <li className="flex justify-between">
          <span>Books:</span>
          <span className="font-medium text-[var(--text-primary)]">{limits.maxBooks}</span>
        </li>
        <li className="flex justify-between">
          <span>Sessions per month:</span>
          <span className="font-medium text-[var(--text-primary)]">
            {limits.maxSessionsPerMonth === Infinity ? 'Unlimited' : limits.maxSessionsPerMonth}
          </span>
        </li>
        <li className="flex justify-between">
          <span>Session duration:</span>
          <span className="font-medium text-[var(--text-primary)]">{limits.maxDurationPerSession} min</span>
        </li>
        <li className="flex justify-between">
          <span>Session history:</span>
          <span className="font-medium text-[var(--text-primary)]">
            {limits.hasSessionHistory ? 'Yes' : 'No'}
          </span>
        </li>
      </ul>
    </div>
  );
}
