import AuthForm from '@/components/auth/AuthForm';
import H1 from '@/components/H1';

import Link from 'next/link';

export default function SignInPage() {
  return (
    <main>
      <H1 className="mb-5 text-center">Log In</H1>

      <AuthForm type="sign-in" />

      <p className="mt-3 text-center text-sm text-zinc-500">
        No account yet?{' '}
        <Link href="/sign-up" className="font-medium">
          Sign up
        </Link>
      </p>
    </main>
  );
}
