import React from "react";
import { useForm } from "react-hook-form";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const UserSubmitIssue = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosSecure = useAxios()
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

  const handleSubmitClick = () => {
    if (userInfo?.status === "block") {
      Swal.fire({
        icon: "error",
        title: "You are blocked!",
        text: "You cannot submit an issue.",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
  };


  const onSubmit = async (data) => {

    // image validation
    if (!data.images || data.images.length === 0) {
      toast.error("At least 1 image required");
      return;
    }

    if (data.images.length > 3) {
      toast.error("Maximum 3 images allowed");
      return;
    }

    const imageUrls = [];
    const uploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMAGE_KEY}`;

    // Loop
    for (let img of data.images) {
      const formData = new FormData();
      formData.append("image", img);

      const res = await axios.post(uploadURL, formData);
      imageUrls.push(res?.data?.data?.display_url);
    }

    const userInfo = {
      name: user?.displayName,
      email: user?.email,
      submitAt: new Date(),
      title: data.title,
      description: data.description,
      location: data.location,
      category: data.category,
      images: imageUrls,
      timeline: [
        {
          status: "submitted",
          message: `Issue submitted by ${user?.displayName}`,
          updatedBy: user?.email,
          dateTime: new Date()
        }
      ]
    };

    // Send to backend
    axiosSecure.post(`/issue`, userInfo)
      .then((res) => {


        // PREMIUM OR FREE USER SUCCESSFULLY CREATED ISSUE
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Issue submitted successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          // navigate to My Issues page
          navigate(`/issue/${res.data.insertedId}`)
          return;
        }


        // FREE USER LIMIT REACHED
        if (res.data.subscriptionRequired) {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: res.data.message,
            showConfirmButton: true,
            confirmButtonText: "Upgrade Now",
          }).then(() => {
            // Go to profile page for subscription
            navigate('/user-profile');
          });
        }

      })
      .catch((error) => {
        
        toast.error("Something went wrong!");
      });

  };



  // const onSubmit = (data) => {

  //   const profileImage = data.images[0];
  //   const fromData = new FormData();
  //   fromData.append('image', profileImage)

  //   const photoimageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMAGE_KEY}`
  //   axios.post(photoimageUrl, fromData)
  //     .then(res => {
  //       const photoURl = res?.data?.data?.display_url;
  //       const userInfoo = {
  //         name: user?.displayName,
  //         email: user?.email,
  //         submitAt: new Date(),
  //         photoURl: photoURl,
  //       }
  //       console.log(userInfoo);
  //       axiosSecure.post(`/issue`, data)
  //         .then(res => {
  //           console.log(res.data);
  //         })
  //     })

  // };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <title>User Sumbit Issue Page</title>
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-xl p-8 space-y-8">

        <h1 className="text-3xl font-bold text-gray-800 text-center">Submit a New Issue</h1>
        <p className="text-gray-600 text-center max-w-md mx-auto">
          Report any public infrastructure problem so authorities can take action.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* ISSUE TITLE */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Issue Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="e.g. Road pothole in front of Sector 7"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.title && <p className="text-red-500 text-sm">Title is required</p>}
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              rows={4}
              {...register("description", { required: true })}
              placeholder="Describe the issue in detail..."
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">Description is required</p>}
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Location / Area</label>
            <input
              type="text"
              {...register("location", { required: true })}
              placeholder="e.g. Uttara Sector 7, Road 5"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            {errors.location && <p className="text-red-500 text-sm">Location is required</p>}
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Category</label>
            <select
              {...register("category", { required: true })}
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Select a category</option>
              <option>Road Problem</option>
              <option>Water Leakage</option>
              <option>Garbage Overflow</option>
              <option>Street Light Issue</option>
              <option>Drainage Problem</option>
              <option>Other</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">Category is required</p>}
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Upload Images</label>
            <input
              type="file"
              multiple
              {...register("images")}
              className="w-full border rounded-lg px-4 py-2 bg-gray-50"
            />
            <p className="text-xs text-gray-500 mt-1">You can upload up to 3 images.</p>
          </div>

          {/* SUBMIT BUTTON */}
          {
            userInfo.status === "block" ? <button
              type="button"
              onClick={handleSubmitClick}
              className="w-full py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Issue
            </button> : <button
              type="submit"
              className="w-full py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Issue
            </button>
          }
        </form>
      </div>
    </div>
  );
};

export default UserSubmitIssue;