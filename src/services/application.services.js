import calculatePagination from '../utils/calculatePagination.js';
import prisma from '../config/prisma.js';
import { courseServices } from './course.services.js';

const createApplication = async (data) => {
    return await prisma.application.create({ data });
};

const getApplicationById = async (id) => {
    return await prisma.application.findUnique({
        where: { id },
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
    return prisma.$transaction(async (tx) => {
        const application = await prisma.application.update({
            where: { id },
            data,
        });

        if (data.accepted === 'accepted') {
            await tx.course.update({
                where: { id: application.course_id },
                data: { assigned_to_id: application.ta_applicant_id },
            });
        }

        return application;
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
