import { NextResponse } from 'next/server';
import { getTasks, addTask } from '@/lib/db';
import { taskSchema } from '@/lib/validation';

export async function GET() {
    const tasks = getTasks();
    return NextResponse.json(tasks);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const validated = taskSchema.parse(body);
        const newTask = addTask({ ...validated, description: validated.description || '' });
        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid task data' }, { status: 400 });
    }
}