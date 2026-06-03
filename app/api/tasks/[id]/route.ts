import { NextResponse } from 'next/server';
import { updateTask, deleteTask } from '@/lib/db';
import { taskSchema } from '@/lib/validation';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const body = await request.json();
        const validated = taskSchema.partial().parse(body); // Allow partial updates
        const updated = updateTask(params.id, validated);
        if (!updated) {
            return NextResponse.json({ error: 'Task not found' }, { status: 404 });
        }
        return NextResponse.json(updated);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid update' }, { status: 400 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const deleted = deleteTask(params.id);
    if (!deleted) {
        return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
}
