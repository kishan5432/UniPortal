import jwt from 'jsonwebtoken';
import User from '../Models/User.js';



// export const protect = async (req, res, next) => {
//   try {
//     let token;
    
//     // Check if token exists in headers
//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//       token = req.headers.authorization.split(' ')[1];
//     }
    
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: 'Not authorized to access this route'
//       });
//     }
    
//     try {
//       // Verify token
//       const decoded = jwt.verify(token, JWT_SECRET);
      
//       // Check if user still exists
//       const currentUser = await User.findById(decoded.id);
      
//       if (!currentUser) {
//         return res.status(401).json({
//           success: false,
//           message: 'User no longer exists'
//         });
//       }
      
//       // Add user to request
//       req.user = currentUser;
//       next();
//     } catch (err) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid token'
//       });
//     }
//   } catch (error) {
//     console.error('Auth middleware error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error in authentication'
//     });
//   }
// };
 const auth = async (req, res, next) => {
  // Get token from header
  let token;
    
    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
  
  // Check if no token
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecrettoken');
    console.log(decoded);

    const currentUser = await User.findById(decoded.id);
    
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};


export default auth;


export const protect = async (req, res, next) => {
  try {
    let token;
    
    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecrettoken');
      
      // Check if user still exists
      const currentUser = await User.findById(decoded.id);
      
      if (!currentUser) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists'
        });
      }
      
      // Add user to request
      req.user = currentUser;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
  }
};