export type Task = {
    id: string;
    title: string;
    description: string,
    status: 'pending' | 'in-progress' | 'completed';
    createdAt: Date;
}

// Simple in-memory store (resets on server restart)
let tasks: Task[] = [
    {
        id: '1',
        title: 'Welcome Task',
        description: 'Edit or delete this task',
        status: 'pending',
        createdAt: new Date(),
    }
]

export const getTasks = () => tasks;

export const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
        ...task,
        id: crypto.randomUUID(),
        createdAt: new Date(),
    };
    tasks.push(newTask);
    return newTask;
}

export const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...updates };
    return tasks[index];
}

export const deleteTask = (id: string) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
}
