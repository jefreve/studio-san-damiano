'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LangSwitcher({ currentLang }: { currentLang: string }) {
  const pathname = usePathname();

  // Create redirect URL by replacing current locale in pathname
  const redirectUrl = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale; // 0 is empty string, 1 is locale
    return segments.join('/');
  };

  return (
    <div className="flex items-center gap-2 text-sm font-light tracking-widest uppercase">
      <Link
        href={redirectUrl('it')}
        className={`${
          currentLang === 'it' ? 'font-medium text-brand-dark' : 'text-brand-dark/40 hover:text-brand-dark transition-colors'
        }`}
      >
        ITA
      </Link>
      <span className="text-brand-dark/20 text-[10px]">|</span>
      <Link
        href={redirectUrl('en')}
        className={`${
          currentLang === 'en' ? 'font-medium text-brand-dark' : 'text-brand-dark/40 hover:text-brand-dark transition-colors'
        }`}
      >
        ENG
      </Link>
    </div>
  );
}
