import express from 'express';
import validateRequest from '../middleware/validateRequest.js';
import { applicationControllers } from '../controllers/application.controllers.js';
import { applicationValidators } from '../validators/application.validators.js';
import auth from '../middleware/authorization.js';

const applicationRouter = express.Router();

applicationRouter
    .route('/')
    .post(
        auth('ta_applicant'),
        validateRequest(applicationValidators.createApplication),
        applicationControllers.createApplication,
    )
    .get(applicationControllers.getPaginatedApplications);

applicationRouter
    .route('/:id')
    .get(applicationControllers.getApplicationById)
    .patch(
        auth('ta_applicant', 'ta_committee_member', 'department_staff'),
        validateRequest(applicationValidators.updateApplication),
        applicationControllers.updateApplication,
    )
    .delete(auth('ta_applicant'), applicationControllers.deleteApplication);

export default applicationRouter;
