'use client';

import { useState, useEffect } from 'react';
// import TaskList from '@/components/TaskList';
// import TaskForm from '@/components/TaskForm';
import { Task } from '@/lib/db';
import toast from 'react-hot-toast';

export default function TaskPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const res = await fetch('api/tasks');
            const data = await res.json();
            setTasks(data);
        } catch {
            toast.error('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleAddTask = async (newTask: { title: string; description: string; status: Task['status'] }) => {
        try {
            const res = await fetch('api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            });
            if (res.ok) {
                toast.success('Task added');
                fetchTasks();
            } else {
                toast.error('Failed to add task');
            }
        } catch {
            toast.error('Network error');
        }
    };

    const handleUpdateTask = async (id: string, updates: Partial<Task>) => {
        try {
            const res = await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
            if (res.ok) {
                toast.success('Task updated');
                fetchTasks();
            } else {
                toast.error('Update failed');
            }
        } catch {
            toast.error('Network error');
        }
    };

    const handleDeleteTask = async (id: string) => {
        try {
            const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Task deleted');
                fetchTasks();
            } else {
                toast.error('Delete failed');
            }
        } catch {
            toast.error('Network error');
        }
    }

    if (loading) return <div className="text-center">Loading tasks...</div>;

    return (
        <div className="space-y-8">
            <div className="text-3xl font-bold">Tasks</div>
            {/* <TaskForm onSubmit={handleAddTask} />
            <TaskList tasks={tasks} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} /> */}
        </div>
    );
}