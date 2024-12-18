import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-200 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl p-10 max-w-md mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>
                <nav className="grid grid-cols-1 gap-6">
                    <Link
                        to="/permissions"
                        className="block p-5 text-center text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                        Manage Permissions
                    </Link>
                    <Link
                        to="/roles"
                        className="block p-5 text-center text-white bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                        Manage Roles
                    </Link>
                    <Link
                        to="/users"
                        className="block p-5 text-center text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                        Manage Users
                    </Link>
                    <Link
                        to="/register"
                        className="block p-5 text-center text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                        Register New User
                    </Link>
            
                    <Link
                        to="/userpermissiondetail"
                        className="block p-5 text-center text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                        UserPermissionsDetail 
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Dashboard;
