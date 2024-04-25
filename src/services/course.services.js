import prisma from '../config/prisma.js';
import calculatePagination from '../utils/calculatePagination.js';

const createCourse = async (data) => {
    return prisma.course.create({ data: data });
};

const getPaginatedCourses = async (filters, options) => {
    const { limit, skip, page, sortBy, sortOrder } =
        calculatePagination(options);
    const { search, get_all, ...filterData } = filters;

    const conditions = [];
    if (search) {
        conditions.push({
            OR: ['subject', 'title', 'term'].map((field) => ({
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

    const result = await prisma.course.findMany({
        where: whereConditions,
        orderBy: { [sortBy]: sortOrder },
        include: {
            applications: {
                include: {
                    ta_applicant: {
                        include: {
                            ta_applicant: true,
                        },
                    },
                },
            },
            assgined_to: true,
        },
        skip: get_all == 'true' ? 0 : skip,
        take: get_all == 'true' ? undefined : limit,
    });
    const agg = await prisma.course.aggregate({
        where: whereConditions,
        _count: true,
    });

    return {
        meta: { total: agg._count, page, limit },
        data: result,
    };
};

const getCourseById = async (id) => {
    return prisma.course.findUnique({
        where: { id },
        include: { applications: true, assgined_to: true },
    });
};

const deleteCourse = async (id) => {
    return prisma.course.delete({ where: { id } });
};

const updateCourse = async (id, data) => {
    return await prisma.course.update({ where: { id }, data: data });
};

export const courseServices = {
    createCourse,
    getPaginatedCourses,
    getCourseById,
    deleteCourse,
    updateCourse,
};
