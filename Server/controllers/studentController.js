import {
  User,
  Student,
  Department,
  CourseOffering,
  Assessment,
  StudentAssessment,
  Attendance,
  StudentFee,
  Course,
  AcademicSession
} from '../models/model.js';
import mongoose from 'mongoose';

/**
 * Get student profile information
 * @route GET /api/students/:id
 * @desc Get detailed student information
 */
export const getStudentProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    // Find student and populate department details
    const student = await Student.findById(id)
      .populate('department')
      .select('-password');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get student academic records
 * @route GET /api/students/:id/academics
 * @desc Get student academic records including GPA, credits, and enrolled courses
 */
export const getStudentAcademics = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    const student = await Student.findById(id)
      .populate({
        path: 'academicRecord.academicSession',
        model: 'AcademicSession'
      })
      .populate({
        path: 'enrolledCourses.courseOffering',
        model: 'CourseOffering',
        populate: [
          {
            path: 'course',
            model: 'Course'
          },
          {
            path: 'faculty',
            model: 'User',
            select: 'firstName lastName'
          }
        ]
      });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Sort academic records by semester (ascending)
    const sortedAcademicRecord = student.academicRecord.sort((a, b) => a.semester - b.semester);

    // Calculate CGPA
    const totalGPAPoints = sortedAcademicRecord.reduce((sum, record) => sum + (record.gpa * record.totalCredits), 0);
    const totalCredits = sortedAcademicRecord.reduce((sum, record) => sum + record.totalCredits, 0);
    const cgpa = totalCredits > 0 ? totalGPAPoints / totalCredits : 0;

    // Get active courses
    const activeCourses = student.enrolledCourses.filter(course => course.status === 'active');

    const academicData = {
      studentId: student.studentId,
      program: student.program,
      batch: student.batch,
      department: student.department,
      currentSemester: student.currentSemester,
      academicRecord: sortedAcademicRecord,
      enrolledCourses: activeCourses,
      cgpa: cgpa.toFixed(2)
    };

    res.status(200).json(academicData);
  } catch (error) {
    console.error('Error fetching academic records:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get student's upcoming assignments
 * @route GET /api/students/:id/assignments
 * @desc Get student's pending and upcoming assignments
 */
export const getStudentAssignments = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, limit = 10 } = req.query;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    // Find the student to get enrolled courses
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Get IDs of courses the student is enrolled in
    const enrolledCourseIds = student.enrolledCourses
      .filter(course => course.status === 'active')
      .map(course => course.courseOffering);

    // Find assessments for enrolled courses with due date after startDate
    const dateFilter = startDate ? { dueDate: { $gte: new Date(startDate) } } : {};
    
    // Find all assessments for the enrolled courses
    const assessments = await Assessment.find({
      courseOffering: { $in: enrolledCourseIds },
      ...dateFilter
    })
    .populate({
      path: 'courseOffering',
      populate: [
        {
          path: 'course',
          select: 'name code'
        },
        {
          path: 'faculty',
          select: 'firstName lastName'
        }
      ]
    })
    .sort({ dueDate: 1 })
    .limit(parseInt(limit));

    // Find student's assessment submissions
    const studentAssessments = await StudentAssessment.find({
      student: id,
      assessment: { $in: assessments.map(a => a._id) }
    });

    // Combine assessment info with submission status
    const assignmentsWithStatus = assessments.map(assessment => {
      const submission = studentAssessments.find(
        submission => submission.assessment.toString() === assessment._id.toString()
      );

      return {
        assessment,
        status: submission ? submission.status : 'pending',
        submissionDate: submission ? submission.submissionDate : null,
        marks: submission ? submission.marks : null
      };
    });

    res.status(200).json(assignmentsWithStatus);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get student's daily schedule
 * @route GET /api/students/:id/schedule
 * @desc Get student's schedule for a specific day
 */
export const getStudentSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    // Get the requested date or use today
    const requestedDate = date ? new Date(date) : new Date();
    const dayOfWeek = requestedDate.toLocaleDateString('en-US', { weekday: 'lowercase' });
    
    // Find the student to get enrolled courses
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Get IDs of courses the student is enrolled in
    const enrolledCourseIds = student.enrolledCourses
      .filter(course => course.status === 'active')
      .map(course => course.courseOffering);

    // Find course offerings with schedule for the requested day
    const courseOfferings = await CourseOffering.find({
      _id: { $in: enrolledCourseIds },
      'schedule.day': dayOfWeek
    })
    .populate({
      path: 'course',
      select: 'name code'
    })
    .populate({
      path: 'faculty',
      select: 'firstName lastName'
    });

    // Extract schedule details for the day
    const schedule = [];
    courseOfferings.forEach(offering => {
      const daySchedules = offering.schedule.filter(s => s.day === dayOfWeek);
      
      daySchedules.forEach(daySchedule => {
        schedule.push({
          courseOffering: offering,
          startTime: daySchedule.startTime,
          endTime: daySchedule.endTime,
          room: daySchedule.room,
          // Assign different colors to different subjects
          color: ['blue', 'green', 'purple', 'amber', 'pink', 'indigo'][schedule.length % 6]
        });
      });
    });

    // Sort schedule by start time
    schedule.sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.startTime}`);
      const timeB = new Date(`1970-01-01T${b.startTime}`);
      return timeA - timeB;
    });

    res.status(200).json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get student's current fee information
 * @route GET /api/students/:id/fees/current
 * @desc Get student's latest fee record
 */
export const getStudentCurrentFee = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    // Find current academic session
    const currentSession = await AcademicSession.findOne({ isActive: true });
    if (!currentSession) {
      return res.status(404).json({ message: 'No active academic session found' });
    }

    // Find fee record for current session
    const feeRecord = await StudentFee.findOne({
      student: id,
      academicSession: currentSession._id
    })
    .populate('feeStructure')
    .sort({ createdAt: -1 });

    if (!feeRecord) {
      return res.status(404).json({ message: 'No fee record found for current session' });
    }

    res.status(200).json(feeRecord);
  } catch (error) {
    console.error('Error fetching fee information:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

/**
 * Get student attendance records
 * @route GET /api/students/:id/attendance
 * @desc Get attendance records for a student
 */
export const getStudentAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { courseId } = req.query;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    // Find the student to get enrolled courses
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Filter for specific course if courseId is provided
    const courseFilter = courseId ? { courseOffering: courseId } : {};

    // Find attendance records where the student is included
    const attendanceRecords = await Attendance.find({
      'attendanceRecords.student': id,
      ...courseFilter
    })
    .populate({
      path: 'courseOffering',
      populate: {
        path: 'course',
        select: 'name code'
      }
    })
    .sort({ date: -1 });

    // Calculate attendance percentage for each course
    const courses = {};
    
    attendanceRecords.forEach(record => {
      const courseId = record.courseOffering._id.toString();
      const studentRecord = record.attendanceRecords.find(
        r => r.student.toString() === id
      );
      
      if (!courses[courseId]) {
        courses[courseId] = {
          courseOffering: record.courseOffering,
          present: 0,
          absent: 0,
          total: 0
        };
      }
      
      if (studentRecord) {
        if (studentRecord.status === 'present' || studentRecord.status === 'excused') {
          courses[courseId].present += 1;
        } else {
          courses[courseId].absent += 1;
        }
        courses[courseId].total += 1;
      }
    });

    // Convert to array and calculate percentages
    const attendanceSummary = Object.values(courses).map(course => {
      return {
        ...course,
        percentage: course.total > 0 ? Math.round((course.present / course.total) * 100) : 0
      };
    });

    res.status(200).json({
      attendanceRecords,
      attendanceSummary
    });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};