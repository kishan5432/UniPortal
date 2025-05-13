
import Faculty from '../Models/Faculty.js';
import CourseOffering from '../Models/CourseOffering.js';
import Assessment from "../Models/Assessment.js"
import Student from '../Models/Student.js';
import Material from "../Models/Material.js"

// Get faculty details
export const getFacultyDetails = async (req, res) => {
  try {
    const { facultyId } = req.params;
    console.log(facultyId);
    
    const faculty = await Faculty.findById(facultyId).populate('department');
    if (!faculty) {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    res.status(200).json(faculty);
  } catch (error) {
    console.error('Error fetching faculty details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get courses assigned to a faculty
export const getFacultyCourses = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const courses = await CourseOffering.find({ faculty: facultyId })
      .populate('course')
      .populate('academicSession')
      // .populate('department');
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error fetching faculty courses:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get assignments for a course
export const getCourseAssignments = async (req, res) => {
  try {
    const { courseId } = req.params;
    const assignments = await Assessment.find({ courseOffering: courseId });
    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error fetching course assignments:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get materials for a course
export const getCourseMaterials = async (req, res) => {
  try {
    const { courseId } = req.params;
    const materials = await Material.find({ courseOffering: courseId });
    res.status(200).json(materials);
  } catch (error) {
    console.error('Error fetching course materials:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new assignment
export const createAssignment = async (req, res) => {
  try {
    const { title, type, totalMarks, weightage, dueDate, instructions, courseOffering } = req.body;
    console.log(req.body)

    const newAssignment = new Assessment({
      title,
      type,
      totalMarks,
      weightage,
      dueDate,
      instructions,
      courseOffering,
      createdBy: req.user._id,
    });

    await newAssignment.save();
    res.status(201).json(newAssignment);
    
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Upload course material
export const uploadMaterial = async (req, res) => {
  try {
    const { title, description, courseOffering } = req.body;
    const file = req.file; // Assuming file upload middleware is used

    const newMaterial = new Material({
      title,
      description,
      courseOffering,
      file: file.path,
    });

    await newMaterial.save();
    res.status(201).json(newMaterial);
  } catch (error) {
    console.error('Error uploading material:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update grading criteria
export const updateGradingCriteria = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { criteria } = req.body;

    const course = await CourseOffering.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.gradingCriteria = criteria;
    await course.save();

    res.status(200).json({ message: 'Grading criteria updated successfully' });
  } catch (error) {
    console.error('Error updating grading criteria:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const deletedAssignment = await Assessment.findByIdAndDelete(assignmentId);
    if (!deletedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    console.error('Error deleting assignment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const editAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { title, type, totalMarks, weightage, dueDate, instructions, courseOffering } = req.body;

    const updatedAssignment = await Assessment.findByIdAndUpdate(
      assignmentId,
      {
        title,
        type,
        totalMarks,
        weightage,
        dueDate,
        instructions,
        courseOffering,
      },
      { new: true } // Return the updated document
    );

    if (!updatedAssignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.status(200).json(updatedAssignment);
  } catch (error) {
    console.error('Error updating assignment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllAssessmentsByFaculty = async (req, res) => {
  console.log(req.user, req.params)
  try {
    
    const { facultyId } = req.params;

    // Find all assessments created by the faculty
    const assessments = await Assessment.find({ createdBy: facultyId })
      .populate('courseOffering', 'title') // Populate courseOffering details (e.g., title)
      .populate('createdBy', 'name'); // Populate faculty details (e.g., name)

    res.status(200).json(assessments);
  } catch (error) {
    console.error('Error fetching assessments by faculty:', error);
    res.status(500).json({ message: 'Server error' });
  }
};