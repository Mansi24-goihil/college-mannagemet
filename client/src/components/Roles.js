import React, { useEffect, useState } from 'react';
import api from 'axios';

const Roles = () => {
    const [roles, setRoles] = useState([]);
    const [newRole, setNewRole] = useState('');

    const fetchRoles = async () => {
        const response = await api.get('http://localhost:5001/role/read');
        setRoles(response.data);
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const handleAdd = async () => {
        if (newRole.trim() === '') return; // Prevent adding empty roles
        await api.post('http://localhost:5001/role/create', { name: newRole });
        setNewRole('');
        fetchRoles();
    };

    const handleDelete = async (id) => {
        await api.delete(`http://localhost:5001/role/delete/${id}`);
        fetchRoles();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Manage Roles</h1>
                <div className="flex mb-4">
                    <input
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        placeholder="New Role"
                        className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition duration-300"
                    >
                        Add Role
                    </button>
                </div>
                <ul className="list-disc pl-5">
                    {roles.map((role) => (
                        <li key={role._id} className="flex justify-between items-center bg-gray-50 p-2 rounded-md mb-2 shadow-sm">
                            <span className="text-gray-700">{role.name}</span>
                            <button
                                onClick={() => handleDelete(role._id)}
                                className="text-red-500 hover:text-red-700 transition duration-300"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Roles;
