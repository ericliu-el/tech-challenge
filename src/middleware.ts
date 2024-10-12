import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Use Middleware to protect the pages(eg. /info-page) that need authentication
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    if (cookies().get('loggedIn')) {
        if (pathname === '/login') {
            return NextResponse.redirect(new URL('/info-page', request.url));
        }
    } else {
        if (pathname === '/info-page') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
}

export const config = {
    matcher: ['/info-page', '/login'],
}