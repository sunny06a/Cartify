const express = require('express');
const router = express.Router();
const {registerUser, loginUser, logout, forgotPassword, resetPassword, getUserProfile, updatePassword, updateProfile, allUsers, getUserDetails, updateRole, deleteUser} = require('../controllers/userController');
const { isAuthenticated, authorizeRoles } = require('../middleware/auth');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);  
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/profile').get(isAuthenticated, getUserProfile);
router.route('/password/update').put(isAuthenticated, updatePassword);
router.route('/profile/update').put(isAuthenticated, updateProfile);
router.route('/logout').get(logout); 

//admin routes
router.route('/admin/users').get(isAuthenticated, authorizeRoles('admin'), allUsers);
router.route('/admin/user/:id').put(isAuthenticated, authorizeRoles('admin'), getUserDetails);
router.route('/admin/updateRole').put(isAuthenticated, authorizeRoles('admin'), updateRole);
router.route('/api/v1/admin/delete/:id').delete(isAuthenticated, authorizeRoles('admin'), deleteUser);
module.exports = router; 