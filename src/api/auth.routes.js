import express from 'express';
import { authController } from '../controllers/auth.controller.js';
import validateRequest from '../middleware/validateRequest.js';
import { authValidators } from '../validators/auth.validators.js';
const authRouter = express.Router();

authRouter
  .route('/signup')
  .post(validateRequest(authValidators.signup), authController.signup);
authRouter
  .route('/login')
  .post(validateRequest(authValidators.login), authController.login);

export default authRouter;
