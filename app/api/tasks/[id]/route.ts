import { NextResponse } from 'next/server';
import { updateTask, deleteTask } from '@/lib/db';
import { taskSchema } from '@/lib/validation';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await request.json();
        const validated = taskSchema.partial().parse(body); // Allow partial updates
        const updated = updateTask(id, validated);
        if (!updated) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid update' }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const deleted = deleteTask(id);
    if (!deleted) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
}
