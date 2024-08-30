import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-[#5DC9A8] lg:flex-row">
      <Image
        src="https://bytegrad.com/course-assets/react-nextjs/petsoft-preview.png"
        alt="Preview of PetSoft"
        width={518}
        height={472}
        className="h-[472px] w-[519px]"
      />

      <div>
        <Logo />
        <h1 className="my-6 max-w-[500px] text-5xl font-semibold">
          Manage your <span className="font-extrabold">pet daycare</span> with
          ease
        </h1>
        <p className="max-w-[600px] text-2xl font-medium">
          Use PetSoft to easily keep track of pets under your care. Get lifetime
          access for ₹299.
        </p>
        <div className="mt-10 space-x-3">
          <Button asChild>
            <Link href="/sign-up">Get started</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/sign-in">Log in</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
