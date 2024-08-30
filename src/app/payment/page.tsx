'use client';

import { createCheckoutSession } from '@/actions/stripe.actions';

import H1 from '@/components/H1';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [isPending, startTransition] = useTransition();
  const { update } = useSession();
  const router = useRouter();

  return (
    <main className="flex flex-col items-center space-y-10">
      {searchParams.success && (
        <>
          <p className="text-lg font-semibold text-green-600">
            Payment successful! You now have lifetime access to PetSoft.
          </p>
          {searchParams.success && (
            <Button
              onClick={async () => {
                startTransition(async () => {
                  await update(true);
                  router.push('/dashboard');
                });
              }}
              disabled={isPending}
            >
              Access PetSoft
            </Button>
          )}
        </>
      )}

      {!searchParams.success && (
        <>
          <H1>PetSoft access requires payment</H1>

          <Button
            disabled={isPending}
            onClick={async () => {
              startTransition(async () => {
                await createCheckoutSession();
              });
            }}
          >
            Buy lifetime access for ₹299
          </Button>
          <div className="mt-6 rounded-lg border border-yellow-300 bg-yellow-100 px-8 py-4 text-sm text-yellow-800 shadow-md">
            <p className="mb-2 font-bold">Please Note:</p>
            <p>
              This is a simulation for testing purposes only. To complete a
              dummy payment, use the test card number{' '}
              <code className="rounded bg-gray-200 px-2 py-1">
                4242 4242 4242 4242
              </code>
              , along with any random expiration date and CVV code. Rest
              assured, no real transaction will occur, and no actual charges
              will be made.
            </p>
          </div>
        </>
      )}

      {searchParams.cancelled && (
        <p className="text-sm text-red-700">
          Payment cancelled. You can try again.
        </p>
      )}
    </main>
  );
}
