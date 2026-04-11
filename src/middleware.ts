import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const defaultLocale = 'it';
const locales = ['it', 'en'];

function getLocale(request: NextRequest): string {
  // Simple check: first check URL, then browser headers
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return ''; // Already handled

  // If no locale in URL, we could check headers, but let's default to 'it'
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip public assets and api
  if (
    pathname.startsWith('/san-damiano-assets') ||
    pathname.includes('.') ||
    pathname.startsWith('/api')
  ) {
    return;
  }

  const locale = getLocale(request);
  if (locale) {
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
