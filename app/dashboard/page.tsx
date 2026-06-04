import { getServerUser } from '@/lib/auth';
import { getTasks } from '@/lib/db';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const user = await getServerUser();
    if (!user) redirect('/');

    const tasks = getTasks();
    const stats = {
        total: tasks.length,
        pending: tasks.filter(t => t.status === 'pending').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length,
    };

    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-lg bg-white p-6 shadow">
                    <h3 className="text-lg font-medium">Totals Tasks</h3>
                    <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow">
                    <h3 className="text-lg font-medium">Pending</h3>
                    <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow">
                    <h3 className="text-lg font-medium">In Progress</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
                </div>
                <div className="rounded-lg bg-white p-6 shadow">
                    <h3 className="text-lg font-medium">Completed</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
            </div>
        </div>
    );
}