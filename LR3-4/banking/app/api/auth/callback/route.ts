import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    // Create a cookie-based user session from the code
    await supabase.auth.exchangeCodeForSession(code);
  }
  // Redirect the user to the base URL after authentication
  return NextResponse.redirect(requestUrl.origin);
}
