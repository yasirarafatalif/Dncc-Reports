import React from 'react';
// import LogInFrom from '../../Comeponents/Shared/LogInFrom';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import useAuth from '../../Hooks/useAuth';
import SocialLogIn from '../SocialLogIn/SocialLogIn';
// import axios from 'axios';
// import useAxios from '../../Hooks/useAxios';
// import SocialLogIn from '../SocialLogIn/SocialLogIn';

const Register = () => {
    // const axiosSecure = useAxios();

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
                                    console.log('create file');
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        updateUserProfile(data?.name, photoURl)
                            .then(() => {

                            })
                            .catch(err => {
                                console.log(err);
                            })
                    })
                toast.success("You Are SuccessFully Create Account")
            })
            .catch(err => {
                console.log(err);
            })
    }
    if (user) {
        navigate('/')
    }
    return (
        <div >
            <div className="w-full max-w-md">
                {/* Heading */}
                <h1 className="text-3xl font-bold mb-1">Welcome Back</h1>
                <p className="text-gray-600 mb-6">Login with ZapShift</p>

                {/* Email */}
                <form onSubmit={handleSubmit(handeelRegister)} >
                    <label className="block text-sm font-semibold mb-1">Name</label>
                    <input
                        {...register('name', { required: true })}
                        type="text"
                        placeholder="Nmail"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none"
                    />
                    {errors.name?.type === "required" && <span className='text-red-400'>This field is required</span>}
                    <label className="block text-sm font-semibold mb-1">Photo</label>

                    <input
                        type="file"
                        {...register('image', { required: true })}

                        placeholder="Image"
                        className=" file-input w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none"
                    />
                    {errors.image?.type === "required" && <span className='text-red-400'>This field is required</span>}
                    <label className="block text-sm font-semibold mb-1">Email</label>
                    <input
                        {...register('email', { required: true })}
                        type="email"
                        placeholder="Email"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none"
                    />
                    {errors.email?.type === "required" && <span className='text-red-400'>This field is required</span>}

                    {/* Password */}
                    <label className="block text-sm font-semibold mb-1">Password</label>
                    <input
                        {...register("password", { required: true, minLength: 6 })}
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2 focus:outline-none"
                    />
                    {errors.password?.type === "required" && <span className='text-red-400'>This field is required</span>}
                    {errors.password?.type === "minLength" && <span className='text-red-400'>This Should be 6 lenth</span>}

                    <p className="text-sm text-gray-500 hover:underline cursor-pointer mb-4">
                        Forget Password?
                    </p>

                    {/* Login Button */}
                    <button className="w-full bg-[#c7f36c] hover:bg-[#b8e85a] rounded-md py-2 font-semibold text-black mb-3">
                        Register
                    </button>
                </form>

                {/* Register link */}
                <p className="text-sm text-gray-600 mb-3">
                    Don’t have any account?{" "}
                    <Link to="/login" className="text-green-600 font-semibold">
                        Log In
                    </Link>
                </p>

                {/* OR divider */}
                <div className="flex items-center gap-3 my-3">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <p className="text-gray-500 text-sm">Or</p>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Google Login Button */}
                <SocialLogIn></SocialLogIn>
                {/* <button className="w-full rounded-md bg-gray-100 py-2 flex items-center justify-center gap-2 border border-gray-200">
                    <span className="text-sm">Login with google</span>
                </button> */}
            </div>

        </div>
    );
};

export default Register;