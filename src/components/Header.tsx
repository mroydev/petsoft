'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logo from './Logo';

const navLinks = [
  {
    label: 'Dashboard',
    path: '/dashboard',
  },
  {
    label: 'Account',
    path: '/account',
  },
];

export default function Header() {
  const activePathname = usePathname();

  return (
    <header className="flex items-center justify-between border-b border-white/10 py-2">
      <Logo />

      <nav className="flex gap-2 text-xs">
        {navLinks.map((navLink) => (
          <Link
            key={navLink.path}
            href={navLink.path}
            className={cn(
              'text-white/70 rounded-sm px-2 py-1 hover:text-white focus:text-white transition',
              {
                'bg-black/10 text-white': navLink.path === activePathname,
              }
            )}
          >
            {navLink.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
