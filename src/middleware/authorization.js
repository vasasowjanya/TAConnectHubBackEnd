import env from '../config/environmentVariables.js';
import jwt from 'jsonwebtoken';
import ApiError from '../errors/apiError.js';
import status from 'http-status';
import prisma from '../config/prisma.js';

const auth = (...requiredRoles) => {
    requiredRoles.push('SuperAdmin');

    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiError(
                    status.UNAUTHORIZED,
                    'JWT Error: No Token Provided',
                );
            }

            const jwtToken = token.split(' ')[1];

            let verifiedUser = null;

            verifiedUser = jwt.verify(jwtToken, env.jwt.secret);

            if (!verifiedUser) {
                throw new ApiError(status.BAD_REQUEST, 'JWT Error: Bad Token');
            }

            const jwtUser = await prisma.user.findUnique({
                where: { id: verifiedUser.id },
            });

            req.jwtUser = jwtUser;

            if (requiredRoles.length && !requiredRoles.includes(jwtUser.type)) {
                throw new ApiError(status.FORBIDDEN, 'JWT Error: Forbidden');
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default auth;
