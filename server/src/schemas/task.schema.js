import { z } from 'zod';

export const createTaskSchema = z.object({
    title: z
        .string({
            required_error: 'Title is required',
            invalid_type_error: 'Title must be a string and cannot be empty', // when the type is not a string (number, boolean, etc)
        })
        .min(1)
        .max(255),
    description: z
        .string({
            required_error: 'Description is required',
            invalid_type_error: 'Description must be a string',
        })
        .min(1)
        .max(255)
        .optional(),
});

export const updateTaskSchema = z.object({
    title: z
        .string({
            required_error: 'Title is required',
            invalid_type_error: 'Title must be a string and cannot be empty', // when the type is not a string (number, boolean, etc)
        })
        .min(1)
        .max(255).optional(),
    description: z
        .string({
            required_error: 'Description is required',
            invalid_type_error: 'Description must be a string',
        })
        .min(1)
        .max(255)
        .optional(),
});
