import { z } from 'zod';

export const signupSchema = z.object({
    name: z.string({
        required_error: 'Name is required',
        invalid_type_error: 'Name must be a string',
    }).min(1).max(255),
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }).email({ // validate email format
        message: 'Email is invalid',
    }),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    }).min(6).max(255)
})


export const signinSchema = z.object({
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
    }).email({
        message: 'Email is invalid',
    }),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    }).min(6, {
        message: 'Password must be at least 6 characters',
    }).max(255, {
        message: 'Password must be at most 255 characters',
    })
})