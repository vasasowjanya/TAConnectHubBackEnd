import validateRequest from '../middleware/validateRequest.js';
import { courseValidator } from '../validators/course.validator.js';
import { courseControllers } from '../controllers/course.controller.js';
import { Router } from 'express';
import auth from '../middleware/authorization.js';

const courseRouter = Router();

courseRouter
    .route('/')
    .post(
        auth('department_staff'),
        validateRequest(courseValidator.createCourse),
        courseControllers.createCourse,
    )
    .get(courseControllers.getPaginatedCourses);

courseRouter
    .route('/:id')
    .get(courseControllers.getCourseById)
    .delete(auth('department_staff'), courseControllers.deleteCourse)
    .patch(
        auth('department_staff', 'instructor'),
        validateRequest(courseValidator.updateCourse),
        courseControllers.updateCourse,
    );

export default courseRouter;
