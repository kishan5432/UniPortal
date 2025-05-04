import express from 'express';
import { 
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserRole,
  toggleUserStatus,
  resetUserPassword,
  deleteUser,
  getAllDepartments,
  getFacultyUsers
} from '../controllers/userController.js';
import auth from '../middlewares/auth.js';
import roleCheck from '../middlewares/roleCheck.js';

const router = express.Router();

// Get all users
router.get('/', auth, roleCheck(['admin']), getAllUsers);

//get all faculties
router.get('/faculty',auth, roleCheck(['admin']), getFacultyUsers);

// Get user by ID
router.get('/:id', auth, getUserById);

// Create a new user
router.post('/',auth, roleCheck(['admin']),  createUser);

// Update a user
router.put('/:id', auth, updateUser);

// Update user role
router.put('/:id/role', auth, roleCheck(['admin']), updateUserRole);

// Toggle user status (activate/deactivate)
router.patch('/:id/status', auth, roleCheck(['admin']), toggleUserStatus);

// Reset user password
router.post('/:id/reset-password', auth, roleCheck(['admin']), resetUserPassword);

// Delete user
router.delete('/:id', auth, roleCheck(['admin']), deleteUser);

// Get departments (for user creation/editing)
router.get('/departments/all', auth, getAllDepartments);



export default router;


