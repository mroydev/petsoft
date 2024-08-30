import AuthForm from '@/components/auth/AuthForm';
import H1 from '@/components/H1';

import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <H1 className="mb-5 text-center">Sign Up</H1>

      <AuthForm type="sign-up" />

      <p className="mt-6 text-sm text-zinc-500">
        Already have an account?{' '}
        <Link href="/sign-in" className="font-medium">
          Log in
        </Link>
      </p>
    </main>
  );
}
