// src/components/Register.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { UserContext } from '../context/UserContext';


const Register = () => {
    const { user, error, isSubmitting, handleChange, registerUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(user, navigate);
    };

    return (
        <div className="flex bg-blue-200 justify-center items-center h-screen">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md h-[90vh]">
                <h1 className="text-2xl font-bold text-center">Register</h1>
                <div className="w-full flex justify-center m-2">
                    <FaRegUserCircle className="h-20 w-40 text-blue-700" />
                </div>
                <form onSubmit={handleSubmit} className="gap-5">
                    <div>
                        <label htmlFor="fullname" className="block text-sm font-medium">Full Name</label>
                        <input
                            type="text"
                            name="fullname"
                            value={user.fullname}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium">Gender</label>
                        <select
                            name="gender"
                            value={user.gender}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-medium">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
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
                            Register
                        </button>
                        <button
                            onClick={() => navigate("/login")}
                            type="button"
                            disabled={isSubmitting}
                            className="w-full py-2 px-4 m-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
