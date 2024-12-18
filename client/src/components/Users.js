import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState({ SuperAdmin: [], Admin: [], User: [] });
    const [editUser, setEditUser] = useState({ role: '', email: '', name: '', newEmail: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [newRole, setNewRole] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Added state for success messages

    // Fetch users from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                setUsers(response.data);
                console.log('Fetched users:', response.data);
            } catch (error) {
                setError('Error fetching users');
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Handle user deletion
    const handleDelete = async (role, email) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            const response = await axios.delete(`http://localhost:5000/users/${role}/${email}`);
            console.log('User deleted:', response.data);
            setUsers(prevUsers => ({
                ...prevUsers,
                [role]: prevUsers[role].filter(user => user.email !== email),
            }));
            setSuccessMessage('User deleted successfully!'); // Success message
        } catch (error) {
            setError('Error deleting user');
            console.error('Error deleting user:', error);
        }
    };

    // Handle edit button click
    const handleEditClick = (role, user) => {
        setEditUser({ role, email: user.email, name: user.name, newEmail: user.email });
        setNewRole(role);
        setIsEditing(true);
    };

    // Handle user update
   
    
    // const handleUpdate = async () => {
    //     try {
    //         console.log('Updating user with data:', {
    //             role: editUser.role,         // original role
    //             newEmail: editUser.newEmail, // new email
    //             newRole: newRole,            // new role
    //         });
    
    //         // Normalize role name for backend
    //         const normalizedNewRole = newRole === 'SuperAdmin' ? 'Super_Admin' : newRole;
    //         const originalRole = editUser.role === 'SuperAdmin' ? 'Super_Admin' : editUser.role;
    
    //         const response = await axios.put(`http://localhost:5000/users/${originalRole}/${editUser.newEmail}`, {
    //             name: editUser.name,
    //             newEmail: editUser.newEmail,
    //             newRole: normalizedNewRole,  // Send normalized role in the request body
    //         });
    
    //         console.log('User updated:', response.data);
    
    //         // Handle the successful response
    //         setSuccessMessage('User updated successfully!');
    //         setIsEditing(false);
    //         setNewRole('');
    //         setEditUser({ role: '', email: '', name: '', newEmail: '' });
    //     } catch (error) {
    //         setError('Error updating user');
    //         console.error('Error updating user:', error.response ? error.response.data : error);
    //     }
    // };
    
    const handleUpdate = async () => {
        try {
            console.log('Updating user with data:', {
                role: editUser.role,         // original role
                newEmail: editUser.newEmail, // new email
                newRole: newRole,            // new role
            });
    
            // Normalize role name for backend
            const normalizedNewRole = newRole === 'SuperAdmin' ? 'Super_Admin' : newRole;
            const originalRole = editUser.role === 'SuperAdmin' ? 'Super_Admin' : editUser.role;
    
            // Send update request to the backend
            const response = await axios.put(`http://localhost:5000/users/${originalRole}/${editUser.newEmail}`, {
                name: editUser.name,
                newEmail: editUser.newEmail,
                newRole: normalizedNewRole,
            });
    
            console.log('User updated:', response.data);
    
            // Update the users state immediately
            setUsers(prevUsers => {
                // Remove the user from the original role category
                const updatedUsers = { ...prevUsers };
                updatedUsers[editUser.role] = prevUsers[editUser.role].filter(user => user.email !== editUser.email);
    
                // Add the updated user to the new role category
                if (newRole) {
                    updatedUsers[newRole] = [...(prevUsers[newRole] || []), {
                        ...editUser,
                        email: editUser.newEmail,
                        name: editUser.name,
                        role: newRole
                    }];
                }
    
                return updatedUsers;
            });
    
            // Handle success
            setSuccessMessage('User updated successfully!');
            setIsEditing(false);
            setNewRole('');
            setEditUser({ role: '', email: '', name: '', newEmail: '' });
        } catch (error) {
            setError('Error updating user');
            console.error('Error updating user:', error.response ? error.response.data : error);
        }
    };
    
    
    

    // Handle adding a new user
    const handleAddUser = () => {
        navigate('/register'); 
    };

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-5">User Management</h1>
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>} {/* Success message display */}
            <button
                onClick={handleAddUser}
                className="mb-5 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
            >
                Add User
            </button>
            {Object.entries(users).map(([role, userList]) => (
                <div key={role} className="bg-white rounded-lg shadow-md p-4 mb-4">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-3">{role}</h2>
                    <ul className="list-disc pl-5">
                        {userList.map((user) => (
                            <li key={user.email} className="flex justify-between items-center py-2">
                                <div className="text-lg text-gray-600">
                                    {user.name} - <span className="text-gray-500">{user.email}</span>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleEditClick(role, user)}
                                        className="ml-3 px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-200"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(role, user.email)}
                                        className="ml-3 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition duration-200"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {/* Edit User Modal */}
            {isEditing && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg shadow-md w-96">
                        <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
                        <select
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                            className="border p-2 rounded mb-2 w-full"
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="SuperAdmin">Super Admin</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                        <input
                            type="text"
                            value={editUser.name}
                            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                            placeholder="New Name"
                            className="border p-2 rounded mb-2 w-full"
                        />
                        <input
                            type="email"
                            value={editUser.newEmail}
                            onChange={(e) => setEditUser({ ...editUser, newEmail: e.target.value })}
                            placeholder="New Email"
                            className="border p-2 rounded mb-4 w-full"
                        />
                        <button
                            onClick={handleUpdate}
                            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 transition duration-200"
                        >
                            Update User
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="ml-2 px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 transition duration-200"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
