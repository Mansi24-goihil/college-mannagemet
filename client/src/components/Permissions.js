
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const PermissionManager = () => {
//     const [roles] = useState(['superadmin', 'admin', 'user']); // Fixed role options
//     const [selectedRole, setSelectedRole] = useState('');
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState('');
//     const [permissions, setPermissions] = useState([]);
//     const [userPermissions, setUserPermissions] = useState([]);
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');


//     const navigate = useNavigate(); 

//     // Fetch permissions when component mounts
//     useEffect(() => {
//         const fetchPermissions = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/permissions'); // Adjust this endpoint as needed
//                 setPermissions(response.data);
//             } catch (error) {
//                 setError('Error fetching permissions');
//             }
//         };

//         fetchPermissions();
//     }, []);

//     // Fetch users based on selected role
//     useEffect(() => {
//         const fetchUsers = async () => {
//             if (!selectedRole) return;
//             try {
//                 const response = await axios.get(`http://localhost:5000/m_permission/${selectedRole}`);
//                 setUsers(response.data);
//                 setSelectedUser('');
//                 setUserPermissions([]);
//                 setSuccessMessage('');
//             } catch (error) {
//                 setError('Error fetching users');
//             }
//         };

//         fetchUsers();
//     }, [selectedRole]);

//     // Fetch user permissions for the selected user
//     useEffect(() => {
//         const fetchUserPermissions = async () => {
//             if (!selectedUser) return;
//             try {
//                 const response = await axios.get(`http://localhost:5000/m_permission/${selectedRole}/${selectedUser}`);
//                 setUserPermissions(response.data.permissions); // Set user permissions here
//             } catch (error) {
//                 setError('Error fetching user permissions');
//             }
//         };

//         fetchUserPermissions();
//     }, [selectedUser, selectedRole]);

//     // Handle role selection
//     const handleRoleChange = (event) => {
//         setSelectedRole(event.target.value);
//         setUsers([]);
//         setUserPermissions([]);
//         setSuccessMessage('');
//     };

//     // Handle user selection
//     const handleUserChange = (event) => {
//         setSelectedUser(event.target.value);
//         setUserPermissions([]); // Reset user permissions on user change
//         setSuccessMessage('');
//     };

//     // Toggle permission checkbox
//     const handleTogglePermission = (permissionId) => {
//         setUserPermissions((prevPermissions) => {
//             if (prevPermissions.includes(permissionId)) {
//                 return prevPermissions.filter((id) => id !== permissionId); // Remove permission
//             } else {
//                 return [...prevPermissions, permissionId]; // Add permission
//             }
//         });
//     };

//     // Save permissions for the selected user
//     const handleSavePermissions = async () => {
//         try {
//             await axios.put(`http://localhost:5000/m_permission/${selectedRole}/${selectedUser}`, {
//                 permissions: userPermissions,
//             });
//             setSuccessMessage('Permissions updated successfully');
//             setError('');
//             alert("Permission save");
//             navigate('/dashboard'); 
//         } catch (error) {
//             setError('Error updating permissions');
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Manage User Permissions</h1>

//             {error && <div className="text-red-500">{error}</div>}
//             {successMessage && <div className="text-green-500">{successMessage}</div>}

//             {/* Role Selection */}
//             <div className="mb-4">
//                 <label htmlFor="role" className="block text-lg font-medium">
//                     Select Role:
//                 </label>
//                 <select
//                     id="role"
//                     value={selectedRole}
//                     onChange={handleRoleChange}
//                     className="block w-full p-2 border border-gray-300 rounded"
//                 >
//                     <option value="">-- Select Role --</option>
//                     {roles.map((role) => (
//                         <option key={role} value={role}>
//                             {role.charAt(0).toUpperCase() + role.slice(1)}
//                         </option>
//                     ))}
//                 </select>
//             </div>

//             {/* User Selection */}
//             {selectedRole && (
//                 <div className="mb-4">
//                     <label htmlFor="user" className="block text-lg font-medium">
//                         Select User:
//                     </label>
//                     <select
//                         id="user"
//                         value={selectedUser}
//                         onChange={handleUserChange}
//                         className="block w-full p-2 border border-gray-300 rounded"
//                     >
//                         <option value="">-- Select User --</option>
//                         {users.map((user) => (
//                             <option key={user._id} value={user._id}>
//                                 {user.name} ({user.email})
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//             )}

//             {/* Permissions List */}
//             {selectedUser && (
//                 <div className="mb-4">
//                     <h2 className="text-lg font-medium mb-2">Permissions:</h2>
//                     <div className="grid grid-cols-3 gap-2">
//                         {permissions.map((permission) => (
//                             <div key={permission._id} className="flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     id={`permission-${permission._id}`}
//                                     checked={userPermissions.includes(permission._id)} // Check if the permission is included
//                                     onChange={() => handleTogglePermission(permission._id)}
//                                     className="mr-2"
//                                 />
//                                 <label htmlFor={`permission-${permission._id}`}>{permission.name}</label>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             )}

//             {/* Save Permissions Button */}
//             <button
//                 onClick={handleSavePermissions}
//                 className="bg-blue-500 text-white px-4 py-2 rounded"
//                 disabled={!selectedUser} // Disable if no user is selected
//             >
//                 Save Permissions
//             </button>
//         </div>
//     );
// };

// export default PermissionManager;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PermissionManager = () => {
    const [roles] = useState(['superadmin', 'admin', 'user']); // Fixed role options
    const [selectedRole, setSelectedRole] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [userPermissions, setUserPermissions] = useState([]);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    const navigate = useNavigate();

    // Fetch permissions when component mounts
    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/permissions'); // Adjust this endpoint as needed
                setPermissions(response.data);
            } catch (error) {
                console.error('Error fetching permissions:', error);
                setError('Error fetching permissions');
            }
        };

        fetchPermissions();
    }, []);

    // Fetch users based on selected role
    useEffect(() => {
        const fetchUsers = async () => {
            if (!selectedRole) return;
            try {
                const response = await axios.get(`http://localhost:5000/m_permission/${selectedRole}`);
                setUsers(response.data);
                setSelectedUser(''); // Reset selected user
                setUserPermissions([]); // Reset user permissions
                setSuccessMessage('');
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Error fetching users');
            }
        };

        fetchUsers();
    }, [selectedRole]);

    // Fetch user permissions for the selected user
    useEffect(() => {
        const fetchUserPermissions = async () => {
            if (!selectedUser) return;
            try {
                const response = await axios.get(`http://localhost:5000/m_permission/${selectedRole}/${selectedUser}`);
                setUserPermissions(response.data.permissions.map(permission => permission._id) || []); // Set user permissions here
            } catch (error) {
                console.error('Error fetching user permissions:', error);
                setError('Error fetching user permissions');
            }
        };

        fetchUserPermissions();
    }, [selectedUser, selectedRole]);

    // Handle role selection
    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
        setUsers([]); // Clear users on role change
        setSelectedUser(''); // Reset selected user
        setUserPermissions([]); // Reset user permissions
        setSuccessMessage('');
        setError(''); // Clear error on role change
    };

    // Handle user selection
    const handleUserChange = (event) => {
        setSelectedUser(event.target.value);
        setSuccessMessage('');
        setError(''); // Clear error on user change
    };

    // Toggle permission checkbox
    const handleTogglePermission = (permissionId) => {
        setUserPermissions((prevPermissions) => {
            if (prevPermissions.includes(permissionId)) {
                return prevPermissions.filter((id) => id !== permissionId); // Remove permission
            } else {
                return [...prevPermissions, permissionId]; // Add permission
            }
        });
    };

    // Save permissions for the selected user
    const handleSavePermissions = async () => {
        if (!selectedUser) {
            setError('Please select a user to save permissions.');
            return;
        }

        try {
            await axios.put(`http://localhost:5000/m_permission/${selectedRole}/${selectedUser}`, {
                permissions: userPermissions,
            });
            setSuccessMessage('Permissions updated successfully');
            setError('');
            alert("Permissions saved");
            navigate('/dashboard'); 
        } catch (error) {
            console.error('Error updating permissions:', error);
            setError('Error updating permissions');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Manage User Permissions</h1>

            {error && <div className="text-red-500">{error}</div>}
            {successMessage && <div className="text-green-500">{successMessage}</div>}

            {/* Role Selection */}
            <div className="mb-4">
                <label htmlFor="role" className="block text-lg font-medium">
                    Select Role:
                </label>
                <select
                    id="role"
                    value={selectedRole}
                    onChange={handleRoleChange}
                    className="block w-full p-2 border border-gray-300 rounded"
                >
                    <option value="">-- Select Role --</option>
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role.charAt(0).toUpperCase() + role.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {/* User Selection */}
            {selectedRole && (
                <div className="mb-4">
                    <label htmlFor="user" className="block text-lg font-medium">
                        Select User:
                    </label>
                    <select
                        id="user"
                        value={selectedUser}
                        onChange={handleUserChange}
                        className="block w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">-- Select User --</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.name} ({user.email})
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Permissions List */}
            {selectedUser && (
                <div className="mb-4">
                    <h2 className="text-lg font-medium mb-2">Permissions:</h2>
                    <div className="grid grid-cols-3 gap-2">
                        {permissions.map((permission) => (
                            <div key={permission._id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`permission-${permission._id}`}
                                    checked={userPermissions.includes(permission._id)} // Check if the permission is included
                                    onChange={() => handleTogglePermission(permission._id)}
                                    className="mr-2"
                                />
                                <label htmlFor={`permission-${permission._id}`}>{permission.name}</label>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Save Permissions Button */}
            <button
                onClick={handleSavePermissions}
                className="bg-blue-500 text-white px-4 py-2 rounded"
                disabled={!selectedUser} // Disable if no user is selected
            >
                Save Permissions
            </button>
        </div>
    );
};

export default PermissionManager;
