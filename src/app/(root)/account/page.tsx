import { auth } from '@/auth';
import ContentBlock from '@/components/ContentBlock';
import H1 from '@/components/H1';
import SignOutBtn from '@/components/auth/SignOutButton';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();

  // Additional safeguard: redirect to sign-in page if user is not authenticated,
  // ensuring protection even if the middleware is bypassed
  if (!session) {
    redirect('/');
  }

  return (
    <main>
      <H1 className="my-8 text-white">Your Account</H1>

      <ContentBlock className="flex h-[500px] flex-col items-center justify-center gap-3">
        <p>Logged in as {session?.user?.email} </p>
        <SignOutBtn />
      </ContentBlock>
    </main>
  );
}
