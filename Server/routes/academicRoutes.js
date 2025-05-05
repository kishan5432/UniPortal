import express from "express";
import {
  getAcademicSessions,
  createAcademicSession,
  deleteAcademicSession,
  toggleAcademicSessionStatus,
  getCourseOfferings,
  createCourseOffering,
  deleteCourseOffering,
  getDepartments,
  getFaculty,
} from "../controllers/academicController.js";

const router = express.Router();

// Academic Sessions
router.get("/academic-sessions", getAcademicSessions);
router.post("/academic-sessions", createAcademicSession);
router.delete("/academic-sessions/:id", deleteAcademicSession);
router.patch("/academic-sessions/:id", toggleAcademicSessionStatus);

// Course Offerings
router.get("/course-offerings", getCourseOfferings);
router.post("/course-offerings", createCourseOffering);
router.delete("/course-offerings/:id", deleteCourseOffering);

// Classrooms
// router.get("/classrooms", getClassrooms);
// router.post("/classrooms", createClassroom);
// router.delete("/classrooms/:id", deleteClassroom);
// router.patch("/classrooms/:id", toggleClassroomAvailability);

// Supporting Data
router.get("/departments", getDepartments);
router.get("/faculty", getFaculty);

export default router;