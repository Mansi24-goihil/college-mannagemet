import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: '' });
    const [roles, setRoles] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [hasPermission, setHasPermission] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/data', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setUsers(response.data);
            setHasPermission(true);
        } catch (error) {
            console.error('Error fetching users:', error);
            setErrorMessage('You do not have permission to view this page.');
            setHasPermission(false);
            alert('You do not have permission to add users.'); // Alert message for no permission
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/roles', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const handleEdit = (user) => {
        setCurrentUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role._id,
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/admin/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            setErrorMessage('Error deleting user. Please check your permissions.');
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setCurrentUser(null);
        setFormData({ name: '', email: '', password: '', role: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentUser) {
                await axios.put(`http://localhost:5000/admin/users/${currentUser._id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            } else {
              const response=  await axios.post('http://localhost:5000/admin/create', formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log('User created successfully', response.data);
            }
            handleCloseForm();
            fetchUsers(); // Fetch updated user list after submit
        } catch (error) {
            console.error('Error saving user:', error);
            setErrorMessage('Error saving user. Please check your permissions.');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Admin Page</h1>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {hasPermission ? (
                <>
                    <button
                        onClick={() => setShowForm(true)}
                        disabled={!hasPermission} // Disable button if no permission
                        className={`bg-blue-500 text-white font-semibold px-4 py-2 rounded mb-4 ${!hasPermission ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Add User
                    </button>
                    {showForm && (
                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <h2 className="text-xl font-semibold mb-4">{currentUser ? 'Edit User' : 'Add User'}</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required={!currentUser} // Required only if adding a new user
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="">Select Role</option>
                                    {roles.map(role => (
                                        <option key={role._id} value={role._id}>{role.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="bg-green-500 text-white font-semibold px-4 py-2 rounded mr-2"
                            >
                                {currentUser ? 'Update User' : 'Create User'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCloseForm}
                                className="bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </form>
                    )}
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 border-b">Name</th>
                                <th className="py-2 px-4 border-b">Email</th>
                                <th className="py-2 px-4 border-b">Role</th>
                                <th className="py-2 px-4 border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">{user.name}</td>
                                    <td className="py-2 px-4 border-b">{user.email}</td>
                                    <td className="py-2 px-4 border-b">{user.role.name}</td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="bg-blue-500 text-white font-semibold px-2 py-1 rounded mr-2"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="bg-red-500 text-white font-semibold px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p className="text-red-500">You do not have permission to access this page.</p>
            )}
        </div>
    );
};

export default AdminDashboard;
