// controllers/userController.js

const bcrypt = require('bcrypt');
const User = require('../models/User');
const Admin = require('../models/Admin');
const SuperAdmin = require('../models/SuperAdmin');
const Role = require('../models/Role');
const jwt =require('jsonwebtoken')

// Read users with permission check
const readUsers = async (req, res) => {
    try {
        const users = await Admin.find().populate('role', 'name');
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Create a new user with permission check
const createUser = async (req, res) => {
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
            newUser = new User({
                name, email, password: hashPassword, role: userRole
            });
            await newUser.save();
        } else if (userRole.name === 'admin') {
            newUser = new Admin({
                name, email, password: hashPassword, role: userRole
            });
            await newUser.save();
        } else {
            return res.status(404).json({ message: "Invalid role" });
        }

        res.status(200).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update user details
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id) || await Admin.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for user in all role collections
        let user = await SuperAdmin.findOne({ email })
            .populate({
                path: 'role',
                select:'name',
                populate: {
                    path: 'menus',
                    match:{status:true}, // Populate menus
                    populate: {
                        path: 'pages', 
                        match:{status:true}, // Populate pages within each menu
                        populate: [{
                            path: 'permissions', // Populate permissions within each page
                            select: 'name' // Fetch only permission names
                        },
                        [{
                            path: 'submenus',
                            match:{status:true}, 
                            populate: {
                                path: 'permissions',
                                select: 'name',
                              }
                              }
                        ]
                    ]
                    }
                }
            }) 
            || await Admin.findOne({ email })
            .populate({
                path: 'role',
                select:'name',
                populate: {
                    path: 'menus',
                    match:{status:true},
                    populate: {
                        path: 'pages', 
                        match:{status:true}, // Populate pages within each menu
                        populate: [{
                            path: 'permissions', // Populate permissions within each page
                            select: 'name' // Fetch only permission names
                        },
                        [{
                            path: 'submenus',
                            match:{status:true}, 
                            populate: {
                                path: 'permissions',
                                select: 'name',
                              }
                              }
                        ]
                    ]
                    }
                }
            }) || await User.findOne({ email })
            .populate({
                path: 'role',
                select:'name',
                populate: {
                    path: 'menus',
                    match:{status:true},
                    populate: {
                        path: 'pages', 
                        match:{status:true}, // Populate pages within each menu
                        populate: [{
                            path: 'permissions', // Populate permissions within each page
                            select: 'name' // Fetch only permission names
                        },
                        [{
                            path: 'submenus',
                            match:{status:true}, 
                            populate: {
                                path: 'permissions',
                                select: 'name',
                              }
                              }
                        ]
                    ]
                    }
                }
            });

        // If user is not found, return error
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isSuperAdmin=user.role.name === "SuperAdmin"
     
        // Send the populated user details with the token

       const rolemenu = user.role.menus
       .filter(menu =>isSuperAdmin || menu.status)
       .map(menu=>({
            name:menu.name,
            status:menu.status,
            pages:menu.pages.filter(page=>isSuperAdmin || page.status)
            .map(page =>({
                name:page.name,
                status:page.status,
                permissions:page.permissions.map(permission => permission.name),
                submenus:page.submenus.filter(submenu=> isSuperAdmin || submenu.status)
                .map(submenu=>({
                    name:submenu.name,
                    status:submenu.status
                })),
            }))

       }))
        console.log(rolemenu);

        const menuToken =jwt.sign(
            {menus:rolemenu},
            process.env.JWT_SECRET,
        )
        // Generate token and respond
        const token = jwt.sign({
            id: user._id,
            role: user.role.name, // Include role ID in token
            name: user.name,
            email: user.email,
           
        }, process.env.JWT_SECRET); // Optional: Add expiration

        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:'None',
            maxAge: 60 * 60 * 1000 
        });

        res.cookie('menus',menuToken,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            sameSite:'None',
            maxAge: 60 * 60 * 1000 
        })
        
        res.json({
            token,
            menuToken:menuToken,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:{
                    id:user.role._id,
                    name:user.role.name,
                    menus:rolemenu,
                }
            }
        })

  } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    readUsers,
    createUser,
    updateUser,
    deleteUser,
    login
};
