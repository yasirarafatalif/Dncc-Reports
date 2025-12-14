import React, { useRef } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../Hooks/useRole';
import axios from 'axios';
import Swal from 'sweetalert2';
import { deleteUser } from 'firebase/auth';


const UserProfile = () => {
    const { user,updateUserProfile } = useAuth();
    const axiosSecure = useAxios();
    const navigate = useNavigate();
    const { role } = useRole()


    // Fetch user subscription info from backend
    const { data: userInfo = {}, refetch } = useQuery({
        queryKey: ["userProfile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });


    const modalRef = useRef();

    const openModal = () => {
        modalRef.current.showModal()
    }


    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const form = e.target;
        const profileImage = form.photo.files[0];
        const fromData = new FormData();
        fromData.append('image', profileImage)

        const photoimageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_IMAGE_KEY}`
        axios.post(photoimageUrl, fromData)
            .then(res => {
                const photoURl = res?.data?.data?.display_url;
                updateUserProfile(form.display_name.value,photoURl)
                .then(res=>{

                     const updatedUser = {
                    display_name: form.display_name.value,
                    phoneNumber: form.phoneNumber.value,
                    district: form.district.value,
                    age: form.age.value,
                    photoURl: photoURl,
                    nidNumber: form.nidNumber.value

                };


                axiosSecure.patch(`/users/${user?.email}`, updatedUser)
                    .then(res => {

                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Updated!",
                                text: "Profile updated successfully!",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                            });
                            refetch();
                        }

                    })

                })

            })


        modalRef.current.close();



    };
    const handelDeleteProfile = () => {
        axiosSecure.delete(`/users/${userInfo?.email}`)
            .then(res => {

                deleteUser(user).then((ress) => {
                    if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Delete!",
                        text: "Profile Deleted successfully!",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    navigate('/login')
                }
                }).catch((error) => {
                    // An error ocurred
                    // ...
                });
                
            })

    }

    const adminContact = { name: "YASIR ARAFAT ALIF", email: 'yasirarafatalif1@gmail.com', phone: '01851973300' }

    if (!user) {
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-8">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-10">
                {/* HEADER */}
                <div className="flex items-center gap-6 border-b pb-6">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-400 shadow">
                        <img
                            src={userInfo?.photoURl || "https://i.ibb.co/4pDNDk1/avatar.png"}
                            alt={userInfo?.display_name || "Profile"}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-bold text-gray-800">
                                {userInfo?.display_name}
                            </h1>

                            {
                                userInfo?.role === 'citizen' &&
                                <span>
                                    {userInfo?.subscription === "premium" && (
                                        <span
                                            title="Premium User"
                                            className="px-2 py-1 text-sm rounded-full bg-yellow-100 text-yellow-700 border border-yellow-300 flex items-center gap-1"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.364 1.118l1.287 3.967c.3.921-.755 1.688-1.538 1.118l-3.376-2.455a1 1 0 00-1.176 0L5.16 18.952c-.783.57-1.838-.197-1.538-1.118l1.287-3.967a1 1 0 00-.364-1.118L1.47 9.294c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69L9.05 2.927z" />
                                            </svg>
                                            Premium
                                        </span>
                                    )}
                                </span>


                            }

                            {/* PREMIUM BADGE */}

                        </div>

                        <p className="text-gray-600">{role}</p>
                    </div>
                </div>



                {/* INFO SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Personal Info</h2>
                        <p><strong>Name:</strong> {userInfo?.display_name}</p>
                        <p><strong>Age:</strong> 22</p>
                        <p><strong>District:</strong> Dhaka</p>
                    </div>


                    <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Contact Info</h2>
                        <p><strong>Email:</strong> {userInfo?.email || "example@gmail.com"}</p>
                        <p><strong>Phone:</strong> {userInfo?.phoneNumber || "01700000000"}</p>
                        <p><strong>NID:</strong> 1234567890</p>
                    </div>
                </div>


                {/* WAREHOUSE & STATUS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Work Info</h2>
                        <p><strong>Warehouse:</strong> Warehouse A</p>
                        <p><strong>Status:</strong> {userInfo?.status}</p>
                    </div>


                    <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Actions</h2>
                        <button

                            onClick={openModal} className="btn w-full bg-green-500 text-white hover:bg-green-600">Edit Profile</button>
                        <button
                            onClick={handelDeleteProfile}
                            className="btn w-full mt-3 bg-red-500 text-white hover:bg-red-600">Delete Account</button>
                    </div>
                </div>

                {/* subcription */}

                {
                    userInfo?.status !== 'block' &&
                    <div>
                        {
                            userInfo?.role === 'citizen' &&
                            <div className="mt-10 p-6 bg-indigo-50 rounded-xl shadow-md border border-indigo-200">
                                <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
                                    🚀 Subscription Status
                                </h2>

                                {/* If Premium */}
                                {userInfo?.subscription === "premium" ? (
                                    <div className="p-5 bg-green-100 border border-green-300 rounded-xl">
                                        <h3 className="text-xl font-bold text-green-700">
                                            ⭐ Premium Member
                                        </h3>
                                        <p className="text-green-600 mt-2">
                                            You can create **unlimited** issues.
                                            Thank you for being a premium user!
                                        </p>
                                    </div>
                                ) : (
                                    /* If Free */
                                    <div className="p-5 bg-red-100 border border-red-300 rounded-xl">
                                        <h3 className="text-xl font-bold text-red-700">
                                            ⚠ Free Membership
                                        </h3>
                                        <p className="text-red-600 mt-2">
                                            You can create **maximum 3 issues**.
                                            Upgrade now to remove all limits!
                                        </p>

                                        <button
                                            onClick={() => navigate('/dashboard/user-subcription')}
                                            className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                                        >
                                            Upgrade to Premium
                                        </button>
                                    </div>
                                )}
                            </div>
                        }
                    </div>
                }


                {
                    userInfo?.status === 'block' &&
                    <div class="max-w-lg mx-auto mt-10 p-6 rounded-2xl border border-red-200 bg-red-50 shadow">
                        <div class="flex items-center gap-4">


                            <div class="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    class="w-8 h-8 text-red-600">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <div class="flex-1">
                                <h2 class="text-xl font-bold text-red-700">Your Account Has Been Blocked</h2>

                                <p class="text-sm text-red-600 mt-2">
                                    Your access has been restricted by the administration.
                                    Please contact the authorities for further details.
                                </p>

                                <div class="mt-4 flex flex-col sm:flex-row gap-3">
                                    <a href="tel:+8801XXXXXXXXX"
                                        class="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 text-center">
                                        Contact With The Authorities
                                    </a>

                                    <a href="mailto:admin@example.com"
                                        class="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-100 text-center">
                                        Apply For Unblock
                                    </a>
                                </div>


                                <div class="mt-4 text-sm text-red-700">
                                    <p class="font-medium">Authority Information:</p>

                                    <p class="mt-1">
                                        Phone:
                                        <a href="tel:+8801851973300" class="underline text-red-600">
                                            +8801851973300
                                        </a>
                                    </p>

                                    <p>
                                        Email:
                                        <a href={`mailto:${adminContact.email}`} className="underline">yasirarafatalif1@gmail.com</a>
                                        {/* <a href=`mailto:yasirarafatalif1gmail.com` class="underline text-red-600">
                                        yasirarafatalif1"gmail.com
                                    </a> */}
                                    </p>
                                </div>

                                <p class="mt-3 text-xs text-red-500">
                                    Note: If you believe you were blocked by mistake, please submit an appeal with your information.
                                </p>
                            </div>

                        </div>
                    </div>

                }


            </div>







            {/* this is modal section */}
            <dialog ref={modalRef} className="modal">
                <div className="modal-box">
                    <h3 className="text-xl font-bold mb-4">Edit Profile</h3>

                    <form onSubmit={handleUpdateProfile} className="space-y-4">

                        {/* IMAGE UPLOAD */}
                        <div>
                            <label className="font-semibold">Profile Photo</label>
                            <input
                                type="file"
                                name="photo"
                                accept="image/*"
                                required

                                className="file-input file-input-bordered w-full"
                            />
                        </div>




                        {/* NAME */}
                        <div>
                            <label className="font-semibold">Name</label>
                            <input
                                type="text"
                                name="display_name"
                                required

                                defaultValue={userInfo?.display_name}
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* PHONE */}
                        <div>
                            <label className="font-semibold">Phone Number</label>
                            <input
                                type="text"
                                required
                                name="phoneNumber"
                                defaultValue={userInfo?.phoneNumber}
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* DISTRICT */}
                        <div>
                            <label className="font-semibold">District</label>
                            <input
                                type="text"
                                required
                                name="district"
                                defaultValue={userInfo?.district || "Dhaka"}
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* AGE */}
                        <div>
                            <label className="font-semibold">Age</label>
                            <input
                                type="number"
                                required
                                name="age"
                                defaultValue={userInfo?.age || 22}
                                className="input input-bordered w-full"
                            />
                        </div>
                        <div>
                            <label className="font-semibold">NID Number</label>
                            <input
                                type="text"
                                name="nidNumber"
                                required
                                defaultValue={userInfo?.nidNumber || 356266864}
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <button type="submit" className="btn btn-success text-white">
                                Save Changes
                            </button>

                            <button
                                type="button"
                                className="btn btn-error text-white"
                                onClick={() => modalRef.current.close()}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

        </div>
    );
};

export default UserProfile;