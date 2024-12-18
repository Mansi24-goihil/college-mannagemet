// routes/permissionRoutes.js
const express = require('express');
const router = express.Router();
const permissionController = require('../Controller/permission');

// Route to create a new permission
router.post('/create', permissionController.createPermission);

// Route to read all permissions
router.get('/read', permissionController.getPermissions);

// Route to delete a permission by ID
router.delete('/delete/:id', permissionController.deletePermission);

module.exports = router;
