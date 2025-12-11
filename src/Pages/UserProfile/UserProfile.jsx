import React from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../Hooks/useRole';


const UserProfile = () => {
    const {user}=useAuth();
     const axiosSecure = useAxios();
    const navigate = useNavigate();
    const {role}= useRole()

    // Fetch user subscription info from backend
    const { data: userInfo = {} } = useQuery({
        queryKey: ["userProfile", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center p-8">
            <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl p-10">
                {/* HEADER */}
                <div className="flex items-center gap-6 border-b pb-6">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-400 shadow">
                        <img
                            src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                            alt={user?.displayName || "Profile"}
                            className="w-full h-full object-cover"
                        />
                    </div>


                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">{user?.displayName}</h1>
                        <p className="text-gray-600">Rider / Delivery Partner</p>
                    </div>
                </div>


                {/* INFO SECTION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Personal Info</h2>
                        <p><strong>Name:</strong> {user?.displayName}</p>
                        <p><strong>Age:</strong> 22</p>
                        <p><strong>District:</strong> Dhaka</p>
                    </div>


                    <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Contact Info</h2>
                        <p><strong>Email:</strong> {user?.email|| "example@gmail.com"}</p>
                        <p><strong>Phone:</strong> {user?.phoneNumber||"01700000000"}</p>
                        <p><strong>NID:</strong> 1234567890</p>
                    </div>
                </div>


                {/* WAREHOUSE & STATUS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Work Info</h2>
                        <p><strong>Warehouse:</strong> Warehouse A</p>
                        <p><strong>Status:</strong> Active Rider</p>
                    </div>


                    <div className="p-5 bg-gray-50 rounded-xl shadow-sm">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Actions</h2>
                        <button className="btn w-full bg-green-500 text-white hover:bg-green-600">Edit Profile</button>
                        <button className="btn w-full mt-3 bg-red-500 text-white hover:bg-red-600">Delete Account</button>
                    </div>
                </div>

        {/* subcription */}
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
                                onClick={() => navigate('/dashboard/profile')}
                                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                            >
                                Upgrade to Premium
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;