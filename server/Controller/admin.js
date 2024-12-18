// controllers/userController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Role = require('../models/Role');

// Read all users (admins)
exports.readUsers = async (req, res) => {
  try {
    const users = await Admin.find().populate('role', 'name');
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Create a new user or admin
exports.createUser = async (req, res) => {
  const { name, email, password, role: roleId } = req.body;
  
  if (!name || !email || !password || !roleId) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userRole = await Role.findById(roleId);
    if (!userRole) {
      return res.status(404).json({ message: "Invalid role" });
    }

    const existingEmail = await User.findOne({ email });
    const adminExistingEmail = await Admin.findOne({ email });
    
    if (existingEmail || adminExistingEmail) {
      return res.status(400).json({ message: "Email ID already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let newUser;
    if (userRole.name === 'student') {
      newUser = new User({ name, email, password: hashPassword, role: userRole });
    } else if (userRole.name === 'admin') {
      newUser = new Admin({ name, email, password: hashPassword, role: userRole });
    } else {
      return res.status(404).json({ message: "Invalid role" });
    }

    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update user by ID
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id) || await Admin.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
