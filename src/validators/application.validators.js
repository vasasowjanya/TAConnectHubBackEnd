import { z } from 'zod';

const createApplication = z.object({
    body: z
        .object({
            ta_applicant_id: z.string(),
            has_served_before: z.boolean(),
            previous_service_details: z.string().optional(),
            cv_link: z.string().url(),
            credit_completed: z.number(),
            credit_registered: z.number(),
            major: z.string(),
            course_id: z.string(),
        })
        .strict(),
});

const updateApplication = z.object({
    body: z
        .object({
            has_served_before: z.boolean().optional(),
            previous_service_details: z.string().optional(),
            cv_link: z.string().url().optional(),
            credit_completed: z.number().optional(),
            credit_registered: z.number().optional(),
            major: z.string().optional(),
            recommended: z.boolean().optional(),
            offered: z.string().optional(),
            accepted: z.string().optional(),
        })
        .strict(),
});

export const applicationValidators = { createApplication, updateApplication };
