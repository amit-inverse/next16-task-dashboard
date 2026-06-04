'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        document.cookie = 'token=; Max-Age=0; path=/';
        toast.success('Logged out');
        router.push('/');
    };

    // Don't show nav on login page
    if (pathname === '/') return null;

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex space-x-4">
                    <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>
                    <Link href="/tasks" className="hover:text-gray-300">Tasks</Link>
                </div>
                <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">Logout</button>
            </div>
        </nav>
    )
}
