'use client';

import { useTransition } from 'react';
import { Button } from '../ui/button';
import { signOutUser } from '@/actions/user.actions';

export default function SignOutBtn() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      onClick={async () => {
        startTransition(async () => {
          await signOutUser();
        });
      }}
    >
      Sign out
    </Button>
  );
}
