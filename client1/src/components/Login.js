// src/components/Login.js
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { UserContext } from '../context/UserContext';

const Login = () => {
    const { loginData, error, isSubmitting, handleChange, loginUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(loginData, navigate, toast);
    };

    return (
        <div className="flex bg-blue-200 justify-center items-center h-screen">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                <div className="w-full flex justify-center">
                    <FaRegUserCircle className="h-20 w-40 text-blue-700" />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={loginData.username}
                            onChange={(e) => handleChange(e, true)}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={(e) => handleChange(e, true)}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <div className="flex">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2 px-4 m-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => navigate("/register")}
                            type="button"
                            disabled={isSubmitting}
                            className="w-full py-2 px-4 m-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
