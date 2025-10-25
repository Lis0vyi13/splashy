import * as z from 'zod';

export const signUpSchema = z
  .object({
    email: z.email({ message: 'Invalid email' }),
    name: z
      .string({ message: 'Name is required' })
      .min(1, { message: 'Name is required' })
      .max(40, { message: 'Name must be at most 40 characters' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
    rememberMe: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
