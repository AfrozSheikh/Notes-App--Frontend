import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export const Signup = () => {
    const navigate = useNavigate(); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", { email, name, password });
            console.log(response);
            if (response.data.success) {
                navigate('/login');
            }
        } catch (error) {
            console.log("Error in Sign Up", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-md shadow-md">
                <h2 className="text-2xl font-semibold text-center text-blue-600">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 text-gray-700 font-medium">Name</label>
                        <input
                            required
                            type="text"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2 text-gray-700 font-medium">Email</label>
                        <input
                            required
                            type="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="mb-2 text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Sign Up
                    </button>
                    <p className="text-center text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
