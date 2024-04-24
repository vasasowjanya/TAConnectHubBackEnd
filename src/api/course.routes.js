import validateRequest from '../middleware/validateRequest.js';
import { courseValidator } from '../validators/course.validator.js';
import { courseControllers } from '../controllers/course.controller.js';
import { Router } from 'express';

const courseRouter = Router();

courseRouter
    .route('/')
    .post(
        validateRequest(courseValidator.createCourse),
        courseControllers.createCourse,
    )
    .get(courseControllers.getPaginatedCourses);

courseRouter
    .route('/:id')
    .get(courseControllers.getCourseById)
    .delete(courseControllers.deleteCourse)
    .patch(
        validateRequest(courseValidator.updateCourse),
        courseControllers.updateCourse,
    );

export default courseRouter;
