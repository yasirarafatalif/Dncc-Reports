import React from 'react';
// import LogInFrom from '../../Comeponents/Shared/LogInFrom';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import SocialLogIn from '../SocialLogIn/SocialLogIn';
import useAxios from '../../Hooks/useAxios';
import axios from 'axios';



const Register = () => {
    const axiosSecure = useAxios();

    const navigate = useNavigate()
    const { register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const { signIn, createUser, signInWithGoogle, user, setuser, updateUserProfile } = useAuth();
    const handeelRegister = (data) => {

        const profileImage = data.image[0];
        const fromData = new FormData();
        fromData.append('image', profileImage)
        createUser(data.email, data.password)
            .then(() => {
                const photoimageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMAGE_KEY}`
                axios.post(photoimageUrl, fromData)
                    .then(res => {
                        const photoURl = res?.data?.data?.display_url;
                        

                        //create to user database
                        const userInfoo = {
                            display_name: data.name,
                            email: data.email,
                            createdAt: new Date(),
                            photoURl: photoURl,
                            
                        }
                        axiosSecure.post('/users', userInfoo)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    toast.success("You Are SuccessFully Create Account")
                                }
                            })
                            .catch(err => {
                                
                            })
                        updateUserProfile(data?.name, photoURl)
                            .then(() => {

                            })
                            .catch(err => {
                                
                            })
                    })
               
            })
            .catch(err => {
                
            })
    }
    if (user) {
        navigate('/')
    }
    return (
        <div className="min-h-screen py-3 flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">

                {/* Heading */}
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
                    Welcome to DNCC
                </h1>
                <p className="text-gray-500 text-center mb-6">Create your account</p>

                {/* FORM */}
                <form onSubmit={handleSubmit(handeelRegister)} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">Name is required</p>
                        )}
                    </div>

                    {/* Photo */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Profile Photo</label>
                        <input
                            type="file"
                            {...register("image", { required: true })}
                            className="file-input w-full border border-gray-300 rounded-lg px-4 py-2"
                        />
                        {errors.image && (
                            <p className="text-red-500 text-sm">Photo is required</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">Email is required</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            {...register("password", { required: true, minLength: 6 })}
                            type="password"
                            placeholder="Enter password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400"
                        />
                        {errors.password?.type === "required" && (
                            <p className="text-red-500 text-sm">Password is required</p>
                        )}
                        {errors.password?.type === "minLength" && (
                            <p className="text-red-500 text-sm">Password must be 6 characters</p>
                        )}
                    </div>

                    {/* Forget */}
                    <p className="text-sm text-green-700 cursor-pointer hover:underline">
                        Forgot Password?
                    </p>

                    {/* Submit Button */}
                    <button className="w-full bg-green-500 hover:bg-green-600 rounded-lg py-2 font-semibold text-white shadow-md transition">
                        Register
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-sm text-gray-600 text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-green-600 font-semibold hover:underline">
                        Login
                    </Link>
                </p>

                {/* Divider */}
                <div className="flex items-center gap-3 my-5">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <p className="text-gray-500 text-sm">Or</p>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Social Login */}
                <SocialLogIn />
            </div>
        </div>
    );
}

export default Register;