import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import SocialLogIn from '../SocialLogIn/SocialLogIn';

const LogIn = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm()

    const { user, signIn } = useAuth();

    const handeelLogIN = (data) => {
        signIn(data.email, data.password)
            .then(() => {
                toast.success("Logged in successfully!");
            })
            .catch(err => {
                toast.error("Invalid Email or Password");
               
            })
    }

    if (user) navigate('/');

    return (
        <div className="w-full py-4 max-w-md mx-auto bg-white shadow-lg rounded-2xl p-8">
            
            {/* Heading */}
            <h1 className="text-3xl font-bold mb-2 text-gray-800">Welcome Back 👋</h1>
            <p className="text-gray-500 mb-6">Login to continue with Dncc</p>

            {/* Form */}
            <form onSubmit={handleSubmit(handeelLogIN)} className="space-y-4">
                
                {/* Email */}
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        {...register('email', { required: true })}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-300 focus:outline-none"
                    />
                    {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        {...register("password", { required: true, minLength: 6 })}
                        type="password"
                        placeholder="Enter your password"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-300 focus:outline-none"
                    />
                    {errors.password?.type === "required" && <span className="text-red-500 text-sm">Password is required</span>}
                    {errors.password?.type === "minLength" && <span className="text-red-500 text-sm">Minimum 6 characters</span>}
                </div>

                <p className="text-sm text-green-700 font-medium cursor-pointer hover:underline text-right">
                    Forgot Password?
                </p>

                {/* Login Button */}
                <button className="w-full bg-green-400 hover:bg-green-500 transition text-black font-semibold py-2 rounded-lg shadow-md">
                    Login
                </button>
            </form>

            {/* Register */}
            <p className="text-sm text-gray-600 mt-4 text-center">
                Don’t have an account?
                <Link to="/register" className="text-green-600 font-semibold ml-1 hover:underline">
                    Sign Up
                </Link>
            </p>

            {/* OR Divider */}
            <div className="flex items-center my-5">
                <div className="flex-1 h-px bg-gray-300"></div>
                <p className="mx-3 text-gray-500 text-sm">OR</p>
                <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Google Login */}
            <SocialLogIn />
        </div>
    );
};

export default LogIn;
