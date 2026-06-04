'use client';

import { useState } from 'react';

interface TaskFormProps {
    onSubmit: (task: { title: string; description: string; status: 'pending' | 'in-progress' | 'completed' }) => Promise<void>;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed'>('pending');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        await onSubmit({ title, description, status });
        setTitle('');
        setDescription('');
        setStatus('pending');
        setSubmitting(false);
    };

    return (
        <form onSubmit={handleSubmit} className="rounded-lg bg-white p-4 shadow">
            <h2 className="text-xl forn-semibold mb-3">Add New Task</h2>
            <div className="grid gap-3 md:grid-cols-2">
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="border rounded p-2" required />
                <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="border rounded p-2">
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
                <textarea placeholder="Description (optional)" value={description} onChange={(e) => setDescription(e.target.value)} className="border rounded p-2 md:col-span-2" rows={2} />
                <button type="submit" disabled={submitting} className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    {submitting ? 'Adding...' : 'Add Task'}
                </button>
            </div>
        </form>
    );
}