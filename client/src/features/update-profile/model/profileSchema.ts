import * as z from 'zod';

export const profileSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100),
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(30),
  bio: z.string().max(160, { message: 'Max length is 160 symbols' }).optional(),
  dateOfBirth: z.date().nullable().optional(),
});

export type ProfileData = z.infer<typeof profileSchema>;
