import express from 'express';
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';
import auth from '../middlewares/auth.js';
import roleCheck from '../middlewares/roleCheck.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(auth);

// Apply role check middleware for admin access
router.use(roleCheck(['admin']));

// Course routes
router.route('/')
  .get(getCourses)
  .post(createCourse);

router.route('/:id')
  .get(getCourseById)
  .put(updateCourse)
  .delete(deleteCourse);

export default router;