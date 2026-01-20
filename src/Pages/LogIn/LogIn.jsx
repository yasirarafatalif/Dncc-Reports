import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import SocialLogIn from "../SocialLogIn/SocialLogIn";

const LogIn = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { user, signIn } = useAuth();

  const handeelLogIN = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        toast.success("Logged in successfully!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Invalid Email or Password");
      });
  };

  if (user) navigate("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8">
        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-primary mb-1">
          Welcome Back 👋
        </h1>
        <p className="text-base-content/70 mb-6">
          Login to continue with Dncc
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(handeelLogIN)} className="space-y-4">

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text  font-medium">Password</span>
            </label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
            />
            {errors.password?.type === "required" && (
              <p className="text-error text-sm mt-1">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-error text-sm mt-1">Minimum 6 characters</p>
            )}
          </div>

          {/* Forgot password */}
          <div className="text-right">
            <span className="text-sm text-emerald-500 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

          {/* Button */}
          <button className="btn btn-primary w-full">
            Login
          </button>
        </form>

        {/* Register */}
        <p className="text-sm text-center mt-4 text-base-content/70">
          Don’t have an account?
          <Link to="/register" className="text-primary font-semibold ml-1 hover:underline">
            Sign Up
          </Link>
        </p>

        {/* Divider */}
        <div className="divider my-6">OR</div>

        {/* Social login */}
        <SocialLogIn />
      </div>
    </div>
  );
};

export default LogIn;
