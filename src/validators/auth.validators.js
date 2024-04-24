import { z } from 'zod';

const signup = z.object({
  body: z.strictObject({
    user_data: z.strictObject({
      name: z.string({ required_error: 'Name is required' }),
      email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email address' })
        .toLowerCase(),
      password: z.string({ required_error: 'Password is required' }),
      phone: z.string({ required_error: 'Phone number is required' }),
      type: z.string(),
    }),
    ta_applicant_data: z
      .strictObject({
        z_id: z
          .string()
          .startsWith('z-', { message: 'Invalid Z-ID' })
          .min(5),
        department: z.string(),
        level: z.string(),
      })
      .optional(),
  }),
});

const login = z.object({
  body: z
    .object({
      email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Invalid email address' })
        .toLowerCase(),
      password: z.string({ required_error: 'Password is required' }),
    })
    .strict(),
});

export const authValidators = { login, signup };
