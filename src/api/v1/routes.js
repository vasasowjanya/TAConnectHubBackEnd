import express from 'express';
import authRouter from '../auth.routes.js';
import courseRouter from '../course.routes.js';
import applicationRouter from '../application.routes.js';

const router = express.Router();

const routes = [
  { path: '/auth', route: authRouter },
  { path: '/courses', route: courseRouter },
  { path: '/applications', route: applicationRouter },
];

routes.forEach((route) => router.use(route.path, route.route));

export default router;
