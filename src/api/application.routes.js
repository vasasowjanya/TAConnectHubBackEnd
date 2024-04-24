import express from 'express';
import validateRequest from '../middleware/validateRequest.js';
import { applicationControllers } from '../controllers/application.controllers.js';
import { applicationValidators } from '../validators/application.validators.js';

const applicationRouter = express.Router();

applicationRouter
    .route('/')
    .post(
        validateRequest(applicationValidators.createApplication),
        applicationControllers.createApplication,
    )
    .get(applicationControllers.getPaginatedApplications);

applicationRouter
    .route('/:id')
    .get(applicationControllers.getApplicationById)
    .patch(
        validateRequest(applicationValidators.updateApplication),
        applicationControllers.updateApplication,
    )
    .delete(applicationControllers.deleteApplication);

export default applicationRouter;
