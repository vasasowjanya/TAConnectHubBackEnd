import { authServices } from '../services/auth.services.js';
import status from 'http-status';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import env from '../config/environmentVariables.js';

const signup = async (req, res, next) => {
    try {
        const { user_data, ta_applicant_data } = req.body;

        user_data.password = await bcrypt.hash(
            user_data.password,
            +env.bcrypt.saltRounds,
        );

        const response = await authServices.signup(
            user_data,
            user_data.type,
            ta_applicant_data ? ta_applicant_data : {},
        );

        res.status(status.OK).json({
            success: true,
            message: 'User created successfully',
            data: response,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const credentials = req.body;
        const response = await authServices.login(credentials);

        const token = jwt.sign(
            {
                id: response.id,
                email: response.email,
                type: response.type,
            },
            env.jwt.secret,
            { expiresIn: '1d' },
        );

        res.status(status.OK).json({
            success: true,
            message: 'Login successful',
            data: {
                token,
                user: response,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const authController = { login, signup };
