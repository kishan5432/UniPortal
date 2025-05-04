import Department from '../Models/Department.js';
import User from '../Models/User.js';
import Faculty from '../Models/Faculty.js';
import Course from '../Models/Course.js';

// @desc    Get all departments
// @route   GET /api/departments
// @access  Admin
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate('headOfDepartment', 'name email');
    
    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments
    });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching departments'
    });
  }
};

// @desc    Get department by ID
// @route   GET /api/departments/:id
// @access  Admin
export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('headOfDepartment', 'name email');
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    console.error('Error fetching department:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching department'
    });
  }
};

// @desc    Create new department
// @route   POST /api/departments
// @access  Admin
export const createDepartment = async (req, res) => {
  try {
    const { name, code, description, headOfDepartment } = req.body;
    
    // Check if department with the same code already exists
    const existingDepartment = await Department.findOne({ 
      $or: [{ code }, { name }] 
    });
    
    if (existingDepartment) {
      return res.status(400).json({
        success: false,
        message: 'Department with this name or code already exists'
      });
    }
    
    // If head of department is provided, verify it's a valid faculty user
    if (headOfDepartment) {
      const facultyExists = await User.findOne({ 
        _id: headOfDepartment,
        role: 'faculty'
      });
      
      if (!facultyExists) {
        return res.status(400).json({
          success: false,
          message: 'Invalid faculty ID for head of department'
        });
      }
    }
    
    const department = await Department.create({
      name,
      code,
      description,
      headOfDepartment: headOfDepartment || null
    });
    
    res.status(201).json({
      success: true,
      data: department
    });
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating department'
    });
  }
};

// @desc    Update department
// @route   PUT /api/departments/:id
// @access  Admin
export const updateDepartment = async (req, res) => {
  try {
    const { name, code, description, headOfDepartment } = req.body;
    
    // Find department to update
    let department = await Department.findById(req.params.id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    // If updating code or name, check for uniqueness
    if (code !== department.code || name !== department.name) {
      const existingDepartment = await Department.findOne({
        $or: [
          { code, _id: { $ne: req.params.id } },
          { name, _id: { $ne: req.params.id } }
        ]
      });
      
      if (existingDepartment) {
        return res.status(400).json({
          success: false,
          message: 'Department with this name or code already exists'
        });
      }
    }
    
    // If head of department is provided, verify it's a valid faculty user
    if (headOfDepartment) {
      const facultyExists = await User.findOne({ 
        _id: headOfDepartment,
        role: 'faculty'
      });
      
      if (!facultyExists) {
        return res.status(400).json({
          success: false,
          message: 'Invalid faculty ID for head of department'
        });
      }
    }
    
    // Update department
    department.name = name || department.name;
    department.code = code || department.code;
    department.description = description !== undefined ? description : department.description;
    department.headOfDepartment = headOfDepartment || department.headOfDepartment;
    
    await department.save();
    
    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    console.error('Error updating department:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating department'
    });
  }
};

// @desc    Delete department
// @route   DELETE /api/departments/:id
// @access  Admin
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    // Check if there are faculty members or courses associated with this department
    const facultyCount = await Faculty.countDocuments({ department: req.params.id });
    const courseCount = await Course.countDocuments({ department: req.params.id });
    
    if (facultyCount > 0 || courseCount > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete department with associated faculty or courses',
        facultyCount,
        courseCount
      });
    }
    
    await department.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Department deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting department:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting department'
    });
  }
};

// @desc    Set department head
// @route   PUT /api/departments/:id/head
// @access  Admin
export const setDepartmentHead = async (req, res) => {
  try {
    const { facultyId } = req.body;
    
    if (!facultyId) {
      return res.status(400).json({
        success: false,
        message: 'Faculty ID is required'
      });
    }
    
    // Check if department exists
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    // Check if faculty exists and is a faculty member
    const faculty = await User.findOne({ 
      _id: facultyId,
      role: 'faculty'
    });
    
    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found or user is not a faculty member'
      });
    }
    
    // Check if faculty belongs to this department
    const facultyDetails = await Faculty.findOne({ 
      _id: faculty._id,
      department: req.params.id
    });
    
    if (!facultyDetails) {
      return res.status(400).json({
        success: false,
        message: 'Faculty does not belong to this department'
      });
    }
    
    // Update department head
    department.headOfDepartment = facultyId;
    await department.save();
    
    res.status(200).json({
      success: true,
      data: department
    });
  } catch (error) {
    console.error('Error setting department head:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while setting department head'
    });
  }
};

// @desc    Get faculty members of a department
// @route   GET /api/departments/:id/faculty
// @access  Admin
export const getDepartmentFaculty = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    const faculty = await Faculty.find({ department: req.params.id })
      .select('name email facultyId designation employmentType specialization');
    
    res.status(200).json({
      success: true,
      count: faculty.length,
      data: faculty
    });
  } catch (error) {
    console.error('Error fetching department faculty:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching department faculty'
    });
  }
};

// @desc    Assign faculty to department
// @route   POST /api/departments/:id/faculty
// @access  Admin
export const assignFacultyToDepartment = async (req, res) => {
  try {
    const { facultyId } = req.body;
    
    if (!facultyId) {
      return res.status(400).json({
        success: false,
        message: 'Faculty ID is required'
      });
    }
    
    // Check if department exists
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      });
    }
    
    // Check if faculty exists
    const faculty = await Faculty.findById(facultyId);
    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: 'Faculty not found'
      });
    }
    
    // Update faculty's department
    faculty.department = req.params.id;
    await faculty.save();
    
    res.status(200).json({
      success: true,
      message: 'Faculty assigned to department successfully',
      data: faculty
    });
  } catch (error) {
    console.error('Error assigning faculty to department:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while assigning faculty to department'
    });
  }
};