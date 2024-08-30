import { auth } from '@/auth';
import BackgroundPattern from '@/components/BackgroundPattern';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';
import PetContextProvider from '@/contexts/PetContextProvider';
import SearchContextProvider from '@/contexts/SearchContextProvider';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated
  const session = await auth();
  if (!session?.user) redirect('/sign-in');

  const pets = await prisma.petsoftPet.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return (
    <>
      <BackgroundPattern />
      <div className="mx-auto flex min-h-screen max-w-[1050px] flex-col px-4">
        <Header />
        <SearchContextProvider>
          <PetContextProvider data={pets}>{children}</PetContextProvider>
        </SearchContextProvider>

        <Footer />
        <Toaster position="bottom-left" />
      </div>
    </>
  );
}
