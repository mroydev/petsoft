import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PetSoft || Pet Daycare',
  description: "Take Care of people's pets responsively with PetSoft",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${inter.className} min-h-screen bg-[#E5E8EC] text-sm text-zinc-900`}
        >
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
