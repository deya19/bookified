import { PricingTable } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function SubscriptionsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-lg text-muted-foreground">
            Unlock more books, sessions, and features with our flexible pricing
          </p>
        </div>

        <PricingTable />

        <div className="mt-16 grid md:grid-cols-3 gap-8 text-sm">
          <div className="text-center">
            <h3 className="font-semibold mb-2">Free Tier</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>1 book upload</li>
              <li>5 sessions per month</li>
              <li>5 minutes per session</li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="font-semibold mb-2">Standard Plan</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>10 book uploads</li>
              <li>100 sessions per month</li>
              <li>15 minutes per session</li>
            </ul>
          </div>

          <div className="text-center">
            <h3 className="font-semibold mb-2">Pro Plan</h3>
            <ul className="space-y-1 text-muted-foreground">
              <li>100 book uploads</li>
              <li>Unlimited sessions</li>
              <li>60 minutes per session</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
