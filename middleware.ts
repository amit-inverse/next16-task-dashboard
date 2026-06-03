import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { verifyToken } from './lib/auth';

const publicRoutes = ['/api/auth'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const { pathname } = request.nextUrl;

    // Allow public routes
    if (pathname === '/' || publicRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // Protect everything else
    // if (!token || !verifyToken(token)) {
    //     const url = new URL('/', request.url);
    //     url.searchParams.set('error', 'Unauthorized');
    //     return NextResponse.redirect(url);
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
