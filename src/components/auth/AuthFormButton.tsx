'use client';

import React from 'react';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';

type AuthFormButtonProps = {
  type: 'sign-in' | 'sign-up';
};

export default function AuthFormButton({ type }: AuthFormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} className="w-full">
      {type === 'sign-in' ? 'Log In' : 'Sign Up'}
    </Button>
  );
}
