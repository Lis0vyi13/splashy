import * as z from 'zod';

export const updateEmailSchema = z.object({
  email: z
    .email({ message: 'Invalid email address' })
    .min(5, { message: 'Email must be at least 5 characters' })
    .max(100, { message: 'Email must be at most 100 characters' }),
});

export type UpdateEmailData = z.infer<typeof updateEmailSchema>;
