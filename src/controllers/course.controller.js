import status from 'http-status';
import pick from '../utils/pick.js';
import { courseServices } from '../services/course.services.js';

const createCourse = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await courseServices.createCourse(data);

        res.status(status.OK).json({
            success: true,
            message: 'Course created successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getPaginatedCourses = async (req, res, next) => {
    try {
        const filters = pick(req.query, ['search', 'get_all', 'term']);
        const options = pick(req.query, [
            'sortBy',
            'sortOrder',
            'limit',
            'page',
        ]);

        const result = await courseServices.getPaginatedCourses(
            filters,
            options,
        );

        res.status(status.OK).json({
            success: true,
            message: 'Course fetched successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getCourseById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await courseServices.getCourseById(id);

        res.status(status.OK).json({
            success: true,
            message: 'Course fetched successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await courseServices.deleteCourse(id);

        res.status(status.OK).json({
            success: true,
            message: 'Course deleted successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const response = await courseServices.updateCourse(id, data);

        res.status(status.OK).json({
            success: true,
            message: 'Course data updated',
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

export const courseControllers = {
    createCourse,
    getPaginatedCourses,
    getCourseById,
    deleteCourse,
    updateCourse,
};
