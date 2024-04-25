import status from 'http-status';
import pick from '../utils/pick.js';
import { applicationServices } from '../services/application.services.js';

const createApplication = async (req, res, next) => {
    try {
        const data = req.body;
        const response = await applicationServices.createApplication(data);

        res.status(status.CREATED).json({
            success: true,
            message: 'Application created successfully',
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

const getApplicationById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const response = await applicationServices.getApplicationById(id);

        res.status(status.OK).json({
            success: true,
            message: 'Application fetched successfully',
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

const getPaginatedApplications = async (req, res, next) => {
    try {
        const filters = pick(req.query, [
            'search',
            'get_all',
            'ta_applicant_id',
            'offered',
        ]);
        const options = pick(req.query, [
            'sortBy',
            'sortOrder',
            'limit',
            'page',
        ]);

        const result = await applicationServices.getPaginatedApplicaitons(
            filters,
            options,
        );

        res.status(status.OK).json({
            success: true,
            message: 'Application fetched successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateApplication = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const result = await applicationServices.updateApplication(id, data);

        res.status(status.OK).json({
            success: true,
            message: 'Application updated successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const deleteApplication = async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await applicationServices.deleteApplication(id);

        res.status(status.OK).json({
            success: true,
            message: 'Application deleted successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const applicationControllers = {
    createApplication,
    getApplicationById,
    getPaginatedApplications,
    updateApplication,
    deleteApplication,
};
