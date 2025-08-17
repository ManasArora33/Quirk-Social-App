import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    displayName: z
      .string()
      .min(2, { message: 'Display name must be at least 2 characters long' }),
    
    username: z
      .string()
      .min(3, { message: 'Username must be at least 3 characters long' })
      .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username can only contain letters, numbers, and underscores' }),

    email: z
      .email({ message: 'Invalid email address' }),
    
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' }),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .email({ message: 'Invalid email address' }),
    
    password: z
      .string()
      .min(1, { message: 'Password is required' }),
  }),
});