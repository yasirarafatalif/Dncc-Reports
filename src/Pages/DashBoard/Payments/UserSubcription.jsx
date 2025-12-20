import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../Hooks/useAxios';
import useAuth from '../../../Hooks/useAuth';

const UserSubcription = () => {
    const axiosSecure = useAxios();
    const { user}= useAuth();
       const { data: userInfo = {}, refetch } = useQuery({
        queryKey: ["userSubcriptions", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user?.email}`);
            return res.data;
        }
    });

     const handelPayment = async(userInfo)=>{
    const paymentInfo = {
      Name : userInfo.display_name,
      customer_email: userInfo.email,
      userId: userInfo._id,
      cost: 1000,
      percelName:'Premium User'
    }
 
    const res = await axiosSecure.post('/create-user-subcription', paymentInfo);
    window.location.href = res.data.url;
  }
    return (
        <div>

            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
                <title>User Subcription issue</title>
                <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 border border-gray-200">


                    <h1 className="text-2xl font-bold text-gray-800 text-center">
                        Upgrade to Premium
                    </h1>
                    <p className="text-gray-600 text-center mt-2">
                        Unlock unlimited issue submissions and premium features.
                    </p>


                    <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-200 shadow">
                        <h2 className="text-xl font-semibold text-gray-800">Premium Plan</h2>
                        <p className="text-gray-600 mt-1">One-time payment, no hidden fees.</p>

                        <div className="mt-4">
                            <span className="text-4xl font-extrabold text-indigo-700">৳1000</span>
                            <span className="text-gray-600">/ lifetime</span>
                        </div>

                        <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                            <li className="flex items-center gap-2">
                                ✔ Unlimited issue submissions
                            </li>
                            <li className="flex items-center gap-2">
                                ✔ Priority support
                            </li>
                            <li className="flex items-center gap-2">
                                ✔ Premium user badge
                            </li>
                        </ul>
                    </div>


                    <button
                     onClick={()=> handelPayment(userInfo)}
                        className="w-full mt-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition">
                        Pay ৳1000 & Subscribe
                    </button>


                    <p className="text-xs text-gray-500 text-center mt-3">
                        After successful payment, your account will automatically be upgraded to Premium.
                    </p>
                </div>
            </div>


        </div>
    );
};

export default UserSubcription;