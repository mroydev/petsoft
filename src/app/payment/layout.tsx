import React from 'react';

import Logo from '@/components/Logo';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-5">
      <Logo />
      {children}
    </div>
  );
}
