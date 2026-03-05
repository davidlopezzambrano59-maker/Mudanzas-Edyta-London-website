import { NextResponse } from 'next/server';

// next-intl middleware disabled to avoid VAR_ORIGINAL_PATHNAME / template variable errors.
// Root routes (/, /quote) and locale routes (/en, /en/quote, /es, etc.) work without it.
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip static files and Next.js internals
    '/((?!_next|_vercel|favicon|.*\\.).*)',
  ],
};