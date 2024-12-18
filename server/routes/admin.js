// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { verifyToken, checkPermission } = require('../middleware/auth');
const userController = require('../Controller/admin');

// Read all users
router.get('/read',
     verifyToken,
    //   checkPermission('canRead'),
       userController.readUsers);

// Create a new user or admin
router.post('/create',
     verifyToken,
    //   checkPermission('canInsert'),
       userController.createUser);

// Update a user by ID
router.put('/update/:id', 
    verifyToken, 
    // checkPermission('canUpdate'),
     userController.updateUser);

// Delete a user by ID
router.delete('/delete/:id', 
    verifyToken, 
    // checkPermission('canDelete'),
     userController.deleteUser);

module.exports = router;
