import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export const taskSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100),
    description: z.string().max(500).optional(),
    status: z.enum(['pending', 'in-progress', 'completed']),
});

export type taskInput = z.infer<typeof taskSchema>;
