import { z } from 'zod';

const createCourse = z.object({
    body: z
        .object({
            subject: z.string(),
            crn_number: z.number(),
            course_number: z.number(),
            title: z.string(),
            term: z.string(),
            created_by_id: z.string(),
        })
        .strict(),
});

const updateCourse = z.object({
    body: z
        .object({
            subject: z.string().optional(),
            crn_number: z.number().optional(),
            course_number: z.number().optional(),
            title: z.string().optional(),
            term: z.string().optional(),
            feedback: z.string().optional(),
        })
        .strict(),
});

export const courseValidator = {
    createCourse,
    updateCourse,
};
