import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import validateRequest from '../middleware/validateRequest.js';
import { authValidators } from '../validators/auth.validators.js';
import auth from '../middleware/authorization.js';
const authRouter = express.Router();

authRouter
    .route('/signup')
    .post(validateRequest(authValidators.signup), authController.signup);
authRouter
    .route('/login')
    .post(validateRequest(authValidators.login), authController.login);
authRouter
    .route('/update/:id')
    .patch(
        auth(
            'ta_applicant',
            'department_staff',
            'ta_committee_member',
            'instructor',
        ),
        validateRequest(authValidators.updateProfile),
        authController.updateProfile,
    );

export default authRouter;
