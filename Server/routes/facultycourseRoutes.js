import express from 'express';
import { getFacultyDetails, getFacultyCourses, getCourseAssignments, getCourseMaterials, createAssignment, uploadMaterial, updateGradingCriteria, editAssignment, deleteAssignment, getAllAssessmentsByFaculty } from '../controllers/facultycourseController.js';
import auth from '../middlewares/auth.js';
import roleCheck from '../middlewares/roleCheck.js';


const router = express.Router();

// Middleware to check authentication and role
router.use(auth);
router.use(roleCheck(['faculty']));

// Routes
router.get('/:facultyId', getFacultyDetails); // Get faculty details
router.get('/:facultyId/courses', getFacultyCourses); // Get courses assigned to faculty
router.get('/courses/:courseId/assessments', getCourseAssignments); // Get assignments for a course
router.get('/courses/:courseId/materials', getCourseMaterials); // Get materials for a course
router.post('/assessments', createAssignment); // Create a new assignment
router.post('/course-materials',  uploadMaterial); // Upload course material
router.post('/courses/:courseId/grading-criteria', updateGradingCriteria); // Update grading criteria

router.delete('/assessments/:assignmentId', deleteAssignment); // Delete an assignment
router.put('/assessments/:assignmentId', editAssignment); // Edit an assignment

router.get('/:facultyId/assessments', getAllAssessmentsByFaculty); // Get all assessments by a faculty

export default router;