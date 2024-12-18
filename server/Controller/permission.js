// controllers/permissionController.js
const Permission = require('../models/Permission');

// Create a new permission
exports.createPermission = async (req, res) => {
  const newPermission = new Permission(req.body);
  try {
    const existingPermission = await Permission.findOne({ name: new RegExp(`^${req.body.name}$`, 'i') });
    if (existingPermission) {
      return res.status(400).json({ message: "Permission already exists" });
    }
    const permission = await newPermission.save();
    res.status(201).json(permission);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Read all permissions
exports.getPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find({});
    res.json(permissions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete a permission by ID
exports.deletePermission = async (req, res) => {
  try {
    await Permission.findByIdAndDelete(req.params.id);
    res.status(200).send('Deleted successfully');
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
