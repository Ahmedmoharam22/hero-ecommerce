import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // بنجيب الـ Token من الـ Cookies (أفضل طريقة في الـ Server Side)
  const token = request.cookies.get('auth-storage'); 
  const { pathname } = request.nextUrl;

  // الصفحات المحمية
  const protectedPaths = ['/profile', '/cart', '/wishlist', '/checkout'];
  
  const isProtected = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/cart/:path*', '/wishlist/:path*', '/checkout/:path*'],
};