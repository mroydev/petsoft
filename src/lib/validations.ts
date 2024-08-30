import { z } from 'zod';
import { DEFAULT_PET_IMAGE } from './constants';

export const petIdSchema = z.string().cuid();

export const petFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Name is required' }).max(100),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: 'Owner name is required' })
      .max(100),
    imageUrl: z.union([
      z.literal(''),
      z.string().trim().url({ message: 'Image url must be a valid url' }),
    ]),
    age: z.coerce.number().int().positive().max(99999),
    notes: z.union([z.literal(''), z.string().trim().max(1000)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export const authFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .max(100, { message: 'Email cannot exceed 100 characters' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8}$/, {
      message:
        'Password must be 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one special character',
    }),
});
