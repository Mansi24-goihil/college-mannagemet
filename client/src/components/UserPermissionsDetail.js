import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPermissionsDetail = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users/all-users');
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    throw new Error('User data is not an array');
                }
            } catch (error) {
                setError('Error fetching user data');
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">User Permissions Details</h1>
            {users.length === 0 ? (
                <div>No users found.</div>
            ) : (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Role</th>
                            <th className="py-2 px-4 border-b">Permissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className="py-2 px-4 border-b">{user.name}</td>
                                <td className="py-2 px-4 border-b">{user.email}</td>
                                <td className="py-2 px-4 border-b">{user.role || 'No Role Assigned'}</td>
                                <td className="py-2 px-4 border-b">{user.permissions.join(', ') || 'None'}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default UserPermissionsDetail;
