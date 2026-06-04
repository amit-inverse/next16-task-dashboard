'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Task } from '@/lib/db';
import toast from 'react-hot-toast';

export default function EditTaskPage() {
    const { id } = useParams();
    const router = useRouter();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                const found = data.find((t: Task) => t.id === id);
                setTask(found || null);
                setLoading(false);
            })
            .catch(() => toast.error('Failed to load task'));
    }, [id]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!task) return;
        setUpdating(true);
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: task.title, description: task.description, status: task.status }),
            });
            if (res.ok) {
                toast.success('Task updated');
                router.push('/tasks');
            } else {
                toast.error('Failed to update task');
            }
        } catch {
            toast.error('Network error');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!task) return <div>Task not found</div>;

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Title</label>
                    <input type="text" value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value })} className="w-full border rounded p-2" required />
                </div>
                <div>
                    <label className="block font-medium">Description</label>
                    <textarea value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value })} className="w-full border rounded p-2" rows={3} />
                </div>
                <div>
                    <label className="block font-medium">Status</label>
                    <select value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value as Task['status'] })} className="w-full border rounded p-2">
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div className="flex gap-2">
                    <button type="submit" disabled={updating} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        {updating ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button type="button" onClick={() => router.push('/tasks')} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}