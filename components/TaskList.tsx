'use client';

import { Task } from '@/lib/db';
import Link from 'next/link';

interface TaskListProps {
    tasks: Task[];
    onUpdate: (id: string, updates: Partial<Task>) => void;
    onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {
    if (tasks.length === 0) {
        return <div className="text-center text-gray-500 py-8">No tasks yet. Create one above!</div>;
    }

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <div key={task.id} className="flex items-start justify-between rounded-lg border p-4 bg-white shadow-sm">
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg">{task.title}</h3>
                        <p className="text-gray-600 text-sm">{task.description || 'No description'}</p>
                        <p className="text-xs text-gray-400 mt-1">
                            Status: <span className="capitalize">{task.status}</span> &nbsp;|&nbsp; Created: {new Date(task.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                        <select value={task.status} onChange={(e) => onUpdate(task.id, { status: e.target.value as Task['status'] })} className="border rounded p-1 text-sm">
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <Link href={`/tasks/${task.id}`} className="text-blue-600 hover:underline text-sm">Edit</Link>
                        <button onClick={() => onDelete(task.id)} className="text-red-600 hover:underline text-sm">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}