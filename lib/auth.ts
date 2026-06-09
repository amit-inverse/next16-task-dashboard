import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const SECRET = process.env.JWT_SECRET!;

// Mock user (in real app you'd query a DB)
const MOCK_USER = {
    email: 'amit@teachyleaf.in',
    passwordHash: bcrypt.hashSync('12345678', 10), // pwd: 12345678
};

export const verifyPassword = (password: string) => {
    return bcrypt.compareSync(password, MOCK_USER.passwordHash);
};

export const generateToken = (email: string) => {
    return jwt.sign({ email }, SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
    try {
        jwt.verify(token, SECRET);
        return true;
    } catch {
        return false;
    }
};

export const getUserFromToken = (token: string) => {
    try {
        return jwt.verify(token, SECRET) as { email: string };
    } catch {
        return null;
    }
};

// Server-side helper to get current user
export const getServerUser = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return null;
    return getUserFromToken(token);
}
