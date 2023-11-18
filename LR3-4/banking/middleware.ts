import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

const PROTECTED_ROUTES = ['/account'];
const OPPOSITE_TO_PROTECTED_ROUTES = ['/login', '/signUp'];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  console.log(req.url);

  if (req.nextUrl.pathname !== '/signOut') {
    const data = await supabase.auth.getSession();
    //console.log(data)
    console.log(req.nextUrl.pathname, data.data.session);
    if (!data.data.session && PROTECTED_ROUTES.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    if (data.data.session && OPPOSITE_TO_PROTECTED_ROUTES.includes(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
  return res;
}

export const config = {
  matcher: ['/', '/account']
};
