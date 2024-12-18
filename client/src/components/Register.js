

    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

    const Register = () => {
        const [formData, setFormData] = useState({
            name: '',
            email: '',
            password: '',
            roleId: '',
        });
        const [roles, setRoles] = useState([]);
        const [errorMessage, setErrorMessage] = useState('');
        const navigate = useNavigate(); // Initialize useNavigate

        useEffect(() => {
            const fetchRoles = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/roles'); // Adjust your endpoint
                    setRoles(response.data);
                } catch (error) {
                    console.error('Error fetching roles:', error);
                }
            };
            fetchRoles();
        }, []);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await axios.post('http://localhost:5000/users/create', formData);
                console.log('Response:', response.data);
                alert("User registered successfully!");

                // Redirect to the dashboard after successful registration
                navigate('/dashboard'); // Adjust the route as per your routing setup
            } catch (error) {
                console.error('Error occurred:', error.response.data);
                setErrorMessage(error.response.data.message); // Set error message to display
            }
        };

        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Error message display */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                placeholder="Name"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                placeholder="Email"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                placeholder="Password"
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div>
                            <select
                                name="roleId"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <option value="">Select Role</option>
                                {roles.map(role => (
                                    <option key={role._id} value={role._id}>{role.name}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    export default Register;
