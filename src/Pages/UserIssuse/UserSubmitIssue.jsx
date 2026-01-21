import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { FiUploadCloud, FiAlertCircle, FiCheckCircle, FiMapPin, FiType } from "react-icons/fi";

const UserSubmitIssue = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: userInfo = {} } = useQuery({
    queryKey: ["userIssue", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    }
  });

  const onSubmit = async (data) => {
    if (userInfo?.status === "block") {
      return Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "You are blocked from submitting new issues.",
        confirmButtonColor: "#3B82F6"
      });
    }

    if (!data.images || data.images.length === 0) return toast.error("Please upload at least 1 image");
    if (data.images.length > 3) return toast.error("Maximum 3 images allowed");

    setIsUploading(true);
    const loadingToast = toast.loading("Uploading images and submitting...");

    try {
      const imageUrls = [];
      const uploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMAGE_KEY}`;

      for (let img of data.images) {
        const formData = new FormData();
        formData.append("image", img);
        const res = await axios.post(uploadURL, formData);
        imageUrls.push(res?.data?.data?.display_url);
      }

      const issuePayload = {
        name: user?.displayName,
        email: user?.email,
        submitAt: new Date(),
        title: data.title,
        description: data.description,
        location: data.location,
        category: data.category,
        images: imageUrls,
        status: "submitted",
        timeline: [{
          status: "submitted",
          message: `Issue submitted by ${user?.displayName}`,
          updatedBy: user?.email,
          dateTime: new Date()
        }]
      };

      const res = await axiosSecure.post(`/issue`, issuePayload);
      toast.dismiss(loadingToast);

      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Successfully Reported!",
          text: "Authorities will review your issue soon.",
          showConfirmButton: false,
          timer: 2000
        });
        navigate(`/issue/${res.data.insertedId}`);
      } else if (res.data.subscriptionRequired) {
        Swal.fire({
          icon: "warning",
          title: "Limit Reached",
          text: res.data.message,
          confirmButtonText: "Upgrade to Premium",
          confirmButtonColor: "#10B981"
        }).then((result) => {
          if (result.isConfirmed) navigate('/user-profile');
        });
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to submit issue. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-16 px-4">
      <title>Submit Issue </title>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header Section */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="inline-block p-3 bg-blue-100 rounded-2xl mb-4"
          >
            <FiAlertCircle className="text-3xl text-blue-600" />
          </motion.div>
          <h1 className="text-4xl font-black text-primary tracking-tight">Report an Issue</h1>
          <p className="text-secondary mt-2 font-medium">Help us make your neighborhood better by reporting infrastructure problems.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                  <FiType className="text-blue-500" /> Issue Title
                </label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  placeholder="e.g., Broken streetlight in Sector 4"
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400 font-medium"
                />
                {errors.title && <span className="text-xs text-red-500 font-bold ml-1">{errors.title.message}</span>}
              </div>

              {/* Category Select */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-secondary ml-1">
                  <FiCheckCircle className="text-blue-500" /> Category
                </label>
                <select
                  {...register("category", { required: "Category is required" })}
                  className="w-full  border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all font-medium appearance-none"
                >
                  <option value="">Select Category</option>
                  <option>Road Problem</option>
                  <option>Water Leakage</option>
                  <option>Garbage Overflow</option>
                  <option>Street Light Issue</option>
                  <option>Drainage Problem</option>
                  <option>Other</option>
                </select>
                {errors.category && <span className="text-xs text-red-500 font-bold ml-1">{errors.category.message}</span>}
              </div>
            </div>

            {/* Location Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 ml-1">
                <FiMapPin className="text-blue-500" /> Specific Location
              </label>
              <input
                type="text"
                {...register("location", { required: "Location is required" })}
                placeholder="e.g., Road 5, Block B, Uttara"
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400 font-medium"
              />
              {errors.location && <span className="text-xs text-red-500 font-bold ml-1">{errors.location.message}</span>}
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Detailed Description</label>
              <textarea
                rows={4}
                {...register("description", { required: "Description is required" })}
                placeholder="Briefly explain the issue and its impact on the community..."
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-400 font-medium"
              ></textarea>
              {errors.description && <span className="text-xs text-red-500 font-bold ml-1">{errors.description.message}</span>}
            </div>

            {/* Premium Upload Section */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Visual Evidence (Images)</label>
              <div className="relative group">
                <input
                  type="file"
                  multiple
                  {...register("images")}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="border-2 border-dashed border-slate-200 group-hover:border-blue-400 group-hover:bg-blue-50/50 rounded-[2rem] p-10 transition-all text-center">
                  <FiUploadCloud className="text-4xl text-slate-300 group-hover:text-blue-500 mx-auto mb-4 transition-colors" />
                  <p className="text-slate-600 font-bold">Click to upload or drag and drop</p>
                  <p className="text-slate-400 text-xs mt-1">PNG, JPG up to 3 files allowed</p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isUploading}
              type="submit"
              className={`w-full py-5 rounded-2xl text-white font-black text-lg shadow-xl transition-all ${
                isUploading ? "bg-slate-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200 hover:shadow-blue-300"
              }`}
            >
              {isUploading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Submitting Report...
                </span>
              ) : (
                "Submit Public Report"
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UserSubmitIssue;