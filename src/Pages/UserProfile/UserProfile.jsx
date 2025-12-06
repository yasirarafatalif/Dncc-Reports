import React from 'react';
import useAuth from '../../Hooks/useAuth';


const UserProfile = () => {
    const {user}=useAuth();
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
            </div>
        </div>
    );
};

export default UserProfile;