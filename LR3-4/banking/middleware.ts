import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

const PROTECTED_ROUTES = ['/account', '/payments', '/account/moneyAccounts', '/account/moneyAccounts/create'];
const OPPOSITE_TO_PROTECTED_ROUTES = ['/login', '/signUp'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res }, {});

  if (req.nextUrl.pathname !== '/signOut') {
    const data = await supabase.auth.getSession();

    if (
      !data.data.session &&
      (PROTECTED_ROUTES.includes(req.nextUrl.pathname) || PROTECTED_ROUTES.some((r) => req.nextUrl.pathname.includes(r)))
    ) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    if (data.data.session && OPPOSITE_TO_PROTECTED_ROUTES.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
  return res;
}
