// routes/user.js
const cookietoken =require('cookie-parser');
const express = require('express');
const router = express.Router();
const { verifyToken, checkPermission, authenticate } = require('../middleware/auth');
const userController = require('../Controller/user');

router.use(cookietoken());
// Read users (GET)
router.get('/read', verifyToken, checkPermission('Read'), userController.readUsers);

// Create user (POST)
router.post('/create', verifyToken, checkPermission('Insert'), userController.createUser);

// Update user (PUT)
router.put('/update/:id', verifyToken, checkPermission('Update'), userController.updateUser);

// Delete user (DELETE)
router.delete('/delete/:id', verifyToken, checkPermission('Delete'), userController.deleteUser);
router.post('/login',userController.login)


module.exports = router;
