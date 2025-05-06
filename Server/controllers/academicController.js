import models from '../Models/index.js';
import mongoose from "mongoose"
// import Faculty from "../Models/Faculty.js";
import AcademicSession from "../Models/AcademicSession.js";
import CourseOffering from "../Models/CourseOffering.js";


import Department from "../Models/Department.js";

const Faculty = models.Faculty;

// ========== Academic Sessions ==========
export const getAcademicSessions = async (req, res) => {
  try {
    const sessions = await AcademicSession.find();
    res.status(200).json(sessions);
  } catch (err) {
    console.error("Error fetching academic sessions:", err);
    res.status(500).json({ error: "Failed to fetch academic sessions" });
  }
};

export const createAcademicSession = async (req, res) => {
  try {
    const session = new AcademicSession(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    console.error("Error creating academic session:", err);
    res.status(500).json({ error: "Failed to create academic session" });
  }
};

export const deleteAcademicSession = async (req, res) => {
  try {
    const { id } = req.params;
    await AcademicSession.findByIdAndDelete(id);
    res.status(200).json({ message: "Academic session deleted successfully" });
  } catch (err) {
    console.error("Error deleting academic session:", err);
    res.status(500).json({ error: "Failed to delete academic session" });
  }
};

export const toggleAcademicSessionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const session = await AcademicSession.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );
    res.status(200).json(session);
  } catch (err) {
    console.error("Error updating academic session status:", err);
    res.status(500).json({ error: "Failed to update session status" });
  }
};

// ========== Course Offerings ==========
export const getCourseOfferings = async (req, res) => {
  try {
    console.log('Available models:', Object.keys(mongoose.models));
    const offerings = await CourseOffering.find()
      
      .populate("course")
      .populate("academicSession")
      .populate({
        path: "faculty",
        model: "faculty"
      });
      
    res.status(200).json(offerings);
  } catch (err) {
    console.error("Error fetching course offerings:", err);
    res.status(500).json({ error: "Failed to fetch course offerings" });
  }
};

export const createCourseOffering = async (req, res) => {
  try {
    const offering = new CourseOffering(req.body);
    await offering.save();
    res.status(201).json(offering);
  } catch (err) {
    console.error("Error creating course offering:", err);
    res.status(500).json({ error: "Failed to create course offering" });
  }
};

export const deleteCourseOffering = async (req, res) => {
  try {
    const { id } = req.params;
    await CourseOffering.findByIdAndDelete(id);
    res.status(200).json({ message: "Course offering deleted successfully" });
  } catch (err) {
    console.error("Error deleting course offering:", err);
    res.status(500).json({ error: "Failed to delete course offering" });
  }
};

// ========== Classrooms ==========
// export const getClassrooms = async (req, res) => {
//   try {
//     const classrooms = await Classroom.find();
//     res.status(200).json(classrooms);
//   } catch (err) {
//     console.error("Error fetching classrooms:", err);
//     res.status(500).json({ error: "Failed to fetch classrooms" });
//   }
// };

// export const createClassroom = async (req, res) => {
//   try {
//     const classroom = new Classroom(req.body);
//     await classroom.save();
//     res.status(201).json(classroom);
//   } catch (err) {
//     console.error("Error creating classroom:", err);
//     res.status(500).json({ error: "Failed to create classroom" });
//   }
// };

// export const deleteClassroom = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Classroom.findByIdAndDelete(id);
//     res.status(200).json({ message: "Classroom deleted successfully" });
//   } catch (err) {
//     console.error("Error deleting classroom:", err);
//     res.status(500).json({ error: "Failed to delete classroom" });
//   }
// };

// export const toggleClassroomAvailability = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { isAvailable } = req.body;
//     const classroom = await Classroom.findByIdAndUpdate(
//       id,
//       { isAvailable },
//       { new: true }
//     );
//     res.status(200).json(classroom);
//   } catch (err) {
//     console.error("Error updating classroom availability:", err);
//     res.status(500).json({ error: "Failed to update classroom availability" });
//   }
// };

// ========== Supporting Data ==========
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    console.error("Error fetching departments:", err);
    res.status(500).json({ error: "Failed to fetch departments" });
  }
};

export const getFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find().populate("department");
    res.status(200).json(faculty);
  } catch (err) {
    console.error("Error fetching faculty:", err);
    res.status(500).json({ error: "Failed to fetch faculty" });
  }
};