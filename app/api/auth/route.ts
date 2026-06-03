import { NextResponse } from 'next/server';
import { loginSchema } from '@/lib/validation';
import { verifyPassword, generateToken } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = loginSchema.parse(body);

        // Accept only our mock user (for demo)
        if (email !== 'amit@teachyleaf.in' || !verifyPassword(password)) {
            return NextResponse.json({ error: 'Invalid credentials'}, { status: 401 });
        }

        const token = generateToken(email);
        const response = NextResponse.json({ success: true });
        response.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 60 * 60 * 24 }); // 1 day
        return response;
    } catch (error) {
        return NextResponse.json({ error: 'Validation error' }, { status: 400 });
    }
}
