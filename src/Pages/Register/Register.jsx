import React from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import SocialLogIn from "../SocialLogIn/SocialLogIn";
import useAxios from "../../Hooks/useAxios";
import axios from "axios";

const Register = () => {
  const axiosSecure = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, user, updateUserProfile } = useAuth();

  const handeelRegister = (data) => {
    const profileImage = data.image[0];
    const formData = new FormData();
    formData.append("image", profileImage);

    createUser(data.email, data.password)
      .then(() => {
        const photoimageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMAGE_KEY}`;

        axios.post(photoimageUrl, formData).then((res) => {
          const photoURl = res?.data?.data?.display_url;

          const userInfo = {
            display_name: data.name,
            email: data.email,
            createdAt: new Date(),
            photoURl,
          };

          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              toast.success("Account created successfully 🎉");
              navigate("/");
            }
          });

          updateUserProfile(data.name, photoURl);
        });
      })
      .catch(() => {
        toast.error("Registration failed");
      });
  };

  if (user) navigate("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 py-4 px-4">
      <title>Register</title>

      <div className="w-full max-w-md relative">

        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-30 blur"></div>

        <div className="relative bg-white rounded-2xl shadow-2xl p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-900">
              Create Account
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Join the DNCC smart city platform
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handeelRegister)} className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Your full name"
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5
                focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">Name is required</p>
              )}
            </div>

            {/* Photo */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Profile Photo
              </label>
              <input
                type="file"
                {...register("image", { required: true })}
                className="mt-1 file-input file-input-bordered w-full rounded-xl"
              />
              {errors.image && (
                <p className="text-red-500 text-xs mt-1">Photo is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="you@example.com"
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5
                focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                {...register("password", { required: true, minLength: 6 })}
                type="password"
                placeholder="Minimum 6 characters"
                className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-2.5
                focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-xs mt-1">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-xs mt-1">
                  Minimum 6 characters
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-4 rounded-xl bg-gradient-to-r
              from-green-500 to-emerald-500
              py-2.5 font-bold text-white
              hover:from-green-600 hover:to-emerald-600
              transition-all shadow-lg"
            >
              Register
            </button>
          </form>

          {/* Login */}
          <p className="text-center text-sm text-slate-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-green-600 hover:underline"
            >
              Login
            </Link>
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-xs text-slate-400 uppercase tracking-widest">
              Or
            </span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          {/* Social */}
          <SocialLogIn />
        </div>
      </div>
    </div>
  );
};

export default Register;
