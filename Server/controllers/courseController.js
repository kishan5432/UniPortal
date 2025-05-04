import Course from '../Models/Course.js';
import Department from '../Models/Department.js';
import mongoose from 'mongoose';

// @desc    Get all courses
// @route   GET /api/courses
// @access  Admin
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('department', 'name code')
      .populate('prerequisites', 'courseCode title');
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching courses'
    });
  }
};

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Admin
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('department', 'name code')
      .populate('prerequisites', 'courseCode title');
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching course'
    });
  }
};

// @desc    Create new course
// @route   POST /api/courses
// @access  Admin
export const createCourse = async (req, res) => {
  try {
    const { 
      courseCode, 
      title, 
      department, 
      description, 
      credits, 
      syllabus, 
      prerequisites,
      isElective 
    } = req.body;
    
    // Check if course code already exists
    const existingCourse = await Course.findOne({ courseCode });
    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: 'Course with this code already exists'
      });
    }
    
    // Check if department exists
    const departmentExists = await Department.findById(department);
    if (!departmentExists) {
      return res.status(400).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    // Validate prerequisites if provided
    if (prerequisites && prerequisites.length > 0) {
      // Check if all prerequisites are valid course IDs
      const prereqIds = prerequisites.map(id => mongoose.Types.ObjectId.isValid(id) ? id : null);
      const invalidIds = prereqIds.filter(id => id === null);
      
      if (invalidIds.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid prerequisite course ID(s)'
        });
      }
      
      // Check if all prerequisites exist
      const prereqCount = await Course.countDocuments({
        _id: { $in: prereqIds }
      });
      
      if (prereqCount !== prereqIds.length) {
        return res.status(400).json({
          success: false,
          message: 'One or more prerequisite courses not found'
        });
      }
    }
    
    // Create course
    const course = await Course.create({
      courseCode,
      title,
      department,
      description,
      credits,
      syllabus,
      prerequisites: prerequisites || [],
      isElective: isElective || false
    });
    
    // Populate department and prerequisites for response
    const populatedCourse = await Course.findById(course._id)
      .populate('department', 'name code')
      .populate('prerequisites', 'courseCode title');
    
    res.status(201).json({
      success: true,
      data: populatedCourse
    });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating course'
    });
  }
};

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Admin
export const updateCourse = async (req, res) => {
  try {
    const { 
      courseCode, 
      title, 
      department, 
      description, 
      credits, 
      syllabus, 
      prerequisites,
      isElective,
      isActive 
    } = req.body;
    
    // Find course to update
    let course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Check if course code is unique when updating
    if (courseCode && courseCode !== course.courseCode) {
      const existingCourse = await Course.findOne({ 
        courseCode, 
        _id: { $ne: req.params.id } 
      });
      
      if (existingCourse) {
        return res.status(400).json({
          success: false,
          message: 'Course with this code already exists'
        });
      }
    }
    
    // Check if department exists if updating
    if (department) {
      const departmentExists = await Department.findById(department);
      if (!departmentExists) {
        return res.status(400).json({
          success: false,
          message: 'Department not found'
        });
      }
    }
    
    // Validate prerequisites if updating
    if (prerequisites) {
      // Check if all prerequisites are valid course IDs
      const prereqIds = prerequisites.map(id => mongoose.Types.ObjectId.isValid(id) ? id : null);
      const invalidIds = prereqIds.filter(id => id === null);
      
      if (invalidIds.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid prerequisite course ID(s)'
        });
      }
      
      // Check if all prerequisites exist
      const prereqCount = await Course.countDocuments({
        _id: { $in: prereqIds }
      });
      
      if (prereqCount !== prereqIds.length) {
        return res.status(400).json({
          success: false,
          message: 'One or more prerequisite courses not found'
        });
      }
      
      // Check if setting itself as a prerequisite
      if (prereqIds.includes(req.params.id)) {
        return res.status(400).json({
          success: false,
          message: 'A course cannot be a prerequisite for itself'
        });
      }
    }
    
    // Update course
    course.courseCode = courseCode || course.courseCode;
    course.title = title || course.title;
    course.department = department || course.department;
    course.description = description !== undefined ? description : course.description;
    course.credits = credits || course.credits;
    course.syllabus = syllabus !== undefined ? syllabus : course.syllabus;
    course.prerequisites = prerequisites || course.prerequisites;
    course.isElective = isElective !== undefined ? isElective : course.isElective;
    course.isActive = isActive !== undefined ? isActive : course.isActive;
    course.updatedAt = Date.now();
    
    await course.save();
    
    // Populate department and prerequisites for response
    const updatedCourse = await Course.findById(course._id)
      .populate('department', 'name code')
      .populate('prerequisites', 'courseCode title');
    
    res.status(200).json({
      success: true,
      data: updatedCourse
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating course'
    });
  }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Admin
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Check if this course is a prerequisite for other courses
    const prerequisiteFor = await Course.find({ prerequisites: req.params.id });
    
    if (prerequisiteFor.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete course that is a prerequisite for other courses',
        prerequisiteFor: prerequisiteFor.map(c => ({ id: c._id, courseCode: c.courseCode, title: c.title }))
      });
    }
    
    await course.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting course'
    });
  }
};

// @desc    Get courses by department
// @route   GET /api/departments/:id/courses
// @access  Admin
export const getDepartmentCourses = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    const courses = await Course.find({ department: req.params.id })
      .populate('prerequisites', 'courseCode title');
    
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } catch (error) {
    console.error('Error fetching department courses:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching department courses'
    });
  }
};