import { Briefcase, Mail, Phone, UserPlus } from 'lucide-react';
import React from 'react';
import { RiIdCardLine } from 'react-icons/ri';
import useAuth from '../../../Hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxios from '../../../Hooks/useAxios';
import Swal from 'sweetalert2';

const ApplyStaff = () => {
    const { user } = useAuth();
    const  axiosSecure =useAxios();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        const updateStaffData={
            staffName: data.fullName,
            nidNumber: data.nid,
            email: data.email,
            staffPhoneNUmber: data.phone,
            role: data.role,
            staffAbout: data.about
        }


              Swal.fire({
                             title: "Are you sure?",
                             text: `Apply For Field Staff `,
                             icon: "warning",
                             showCancelButton: true,
                             confirmButtonColor: "#3085d6",
                             cancelButtonColor: "#d33",
                             confirmButtonText: "Yes, delete it!"
                         }).then((result) => {
                                axiosSecure.patch('/apply-staff', data)
                                 .then(res => {
                        
                                     reset();
                                     if (res.data.modifiedCount) {
                                         Swal.fire({
                                             position: "top-end",
                                             icon: "success",
                                             title: "Your Request has been Update",
                                             showConfirmButton: false,
                                             timer: 1500
                                         });
                                     }
                                 })
                 
                         });

    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-2xl border">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <UserPlus className="w-8 h-8 text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-800">
                        Apply for Staff Position
                    </h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Full Name */}
                    <div>
                        <label className="font-medium text-gray-700 mb-1 block">
                            Full Name
                        </label>

                        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50">
                            <UserPlus className="w-5 h-5 text-gray-500" />

                            <input
                                type="text"
                                defaultValue={user?.displayName}
                                {...register("fullName", { required: "Full name is required" })}
                                placeholder="Enter your full name"
                                className="w-full bg-transparent outline-none"
                            />
                        </div>
                        {errors.fullName && (
                            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="font-medium text-gray-700 mb-1 block">
                            Email
                        </label>

                        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50">
                            <Mail className="w-5 h-5 text-gray-500" />
                            <input
                                type="email"
                                defaultValue={user?.email}
                                {...register("email", { required: "Email is required" })}
                                placeholder="example@mail.com"
                                className="w-full bg-transparent outline-none"
                            />
                        </div>

                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="font-medium text-gray-700 mb-1 block">
                            Phone Number
                        </label>

                        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50">
                            <Phone className="w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: { value: /^01[0-9]{9}$/, message: "Invalid phone number" }
                                })}
                                placeholder="01XXXXXXXXX"
                                className="w-full bg-transparent outline-none"
                            />
                        </div>

                        {errors.phone && (
                            <p className="text-red-500 text-sm">{errors.phone.message}</p>
                        )}
                    </div>

                    {/* NID */}
                    <div>
                        <label className="font-medium text-gray-700 mb-1 block">
                            NID Number
                        </label>

                        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50">
                            <RiIdCardLine className="w-5 h-5 text-gray-500" />

                            <input
                                type="text"
                                {...register("nid", {
                                    required: "NID number is required",
                                    minLength: { value: 10, message: "NID must be at least 10 digits" }
                                })}
                                placeholder="41XXXXXXXXX"
                                className="w-full bg-transparent outline-none"
                            />
                        </div>

                        {errors.nid && (
                            <p className="text-red-500 text-sm">{errors.nid.message}</p>
                        )}
                    </div>

                    {/* Role */}
                    <div>
                        <label className="font-medium text-gray-700 mb-1 block">
                            Preferred Role
                        </label>

                        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 bg-gray-50">
                            <Briefcase className="w-5 h-5 text-gray-500" />

                            <input
                                type="text"
                                value="Field Staff"
                                readOnly
                                {...register("role")}
                                className="w-full bg-transparent outline-none"
                            />
                        </div>
                    </div>

                    {/* About */}
                    <div>
                        <label className="font-medium text-gray-700 mb-1 block">
                            Why should we select you?
                        </label>

                        <textarea
                            rows="4"
                            {...register("about", {
                                required: "Please write something about yourself"
                            })}
                            className="w-full border rounded-lg p-3 bg-gray-50 outline-none"
                            placeholder="Write a short description..."
                        ></textarea>

                        {errors.about && (
                            <p className="text-red-500 text-sm">{errors.about.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg text-lg hover:bg-blue-700 transition"
                    >
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplyStaff;
