import { z } from 'zod';

const signup = z.object({
    body: z.strictObject({
        user_data: z.strictObject({
            name: z.string({ required_error: 'Name is required' }),
            email: z
                .string({ required_error: 'Email is required' })
                .email({ message: 'Invalid email address' })
                .toLowerCase(),
            password: z
                .string({ required_error: 'Password is required' })
                .min(8, { message: 'Password must be at least 8 characters' }) // Minimum length of 8 characters
                .regex(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
                ), // Regex for alphanumeric and special characters
            phone: z.string({ required_error: 'Phone number is required' }),
            type: z.string(),
        }),
        ta_applicant_data: z
            .strictObject({
                z_id: z
                    .string()
                    .startsWith('Z', { message: 'Invalid Z ID' })
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

const updateProfile = z.object({
    body: z.strictObject({
        name: z.string().optional(),
        phone: z.string().optional(),
        password: z.string().optional(),
        new_password: z
            .string({ required_error: 'Password is required' })
            .min(8, { message: 'Password must be at least 8 characters' }) // Minimum length of 8 characters
            .regex(
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.',
            )
            .optional(), // Regex for alphanumeric and special characters
    }),
});

export const authValidators = { login, signup, updateProfile };
