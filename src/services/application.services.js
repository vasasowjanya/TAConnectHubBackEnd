import calculatePagination from '../utils/calculatePagination.js';
import prisma from '../config/prisma.js';
import { courseServices } from './course.services.js';
import { application } from 'express';

const createApplication = async (data) => {
    return await prisma.application.create({ data });
};

const getApplicationById = async (id) => {
    return await prisma.application.findUnique({
        where: { id },
        include: {
            course: true,
            ta_applicant: { include: { ta_applicant: true } },
        },
    });
};

const getPaginatedApplicaitons = async (filters, options) => {
    const { limit, skip, page, sortBy, sortOrder } =
        calculatePagination(options);
    const { search, get_all, ...filterData } = filters;

    const conditions = [];
    if (search) {
        conditions.push({
            OR: ['major'].map((field) => ({
                [field]: {
                    contains: search,
                },
            })),
        });
    }

    if (Object.keys(filterData).length > 0) {
        conditions.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    equals: filterData[key],
                },
            })),
        });
    }

    const whereConditions = conditions.length > 0 ? { AND: conditions } : {};

    const result = await prisma.application.findMany({
        where: whereConditions,
        orderBy: { [sortBy]: sortOrder },
        include: {
            course: true,
            ta_applicant: { include: { ta_applicant: true } },
        },
        skip: get_all == 'true' ? 0 : skip,
        take: get_all == 'true' ? undefined : limit,
    });
    const agg = await prisma.application.aggregate({
        where: whereConditions,
        _count: true,
    });

    return {
        meta: { total: agg._count, page, limit },
        data: result,
    };
};

const updateApplication = async (id, data) => {
    const app = await prisma.application.findUnique({
        where: { id },
        include: { course: true },
    });

    if (app.course.assigned_to_id)
        throw new Error('Application already accepted, beter luck next time');

    return prisma.$transaction(async (tx) => {
        const updatedApplication = await prisma.application.update({
            where: { id },
            include: { ta_applicant: { include: { accepted_courses: true } } },
            data,
        });

        if (data.accepted === 'accepted') {
            if (updatedApplication.ta_applicant.accepted_courses.length)
                throw new Error('You already selected one course');
            await tx.course.update({
                where: { id: updatedApplication.course_id },
                data: { assigned_to_id: updatedApplication.ta_applicant_id },
            });
        }

        return updatedApplication;
    });
};

const deleteApplication = async (id) => {
    return await prisma.application.delete({ where: { id } });
};

export const applicationServices = {
    createApplication,
    getApplicationById,
    getPaginatedApplicaitons,
    updateApplication,
    deleteApplication,
};
