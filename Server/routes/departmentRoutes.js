import express from 'express';
import {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  setDepartmentHead,
  getDepartmentFaculty,
  assignFacultyToDepartment
} from '../controllers/departmentController.js';
import { getDepartmentCourses } from '../controllers/courseController.js';
import auth from '../middlewares/auth.js';
import roleCheck from '../middlewares/roleCheck.js';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(auth);

// Apply role check middleware for admin access
router.use(roleCheck(['admin']));

// Department routes
router.route('/')
  .get(getDepartments)
  .post(createDepartment);

router.route('/:id')
  .get(getDepartmentById)
  .put(updateDepartment)
  .delete(deleteDepartment);

// Department head routes
router.route('/:id/head')
  .put(setDepartmentHead);

// Department faculty routes
router.route('/:id/faculty')
  .get(getDepartmentFaculty)
  .post(assignFacultyToDepartment);

// Department courses routes
router.route('/:id/courses')
  .get(getDepartmentCourses);

export default router;