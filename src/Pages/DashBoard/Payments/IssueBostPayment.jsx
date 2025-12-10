import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxios from "../../../Hooks/useAxios";


const IssueBostPayment = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxios();

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
    if(sessionId){
        axiosSecure.patch(`/verify-payment-success?session_id=${sessionId}`)
        .then(res=>{
            console.log(res.data);
        })

    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 text-center w-full max-w-md">
        
        <div className="flex justify-center mb-4">
          <svg
            className="w-20 h-20 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 48 48"
          >
            <path
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 24l8 8 20-20"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-semibold text-green-600 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-4">
          আপনার পেমেন্ট সফলভাবে সম্পন্ন হয়েছে।
        </p>

        {sessionId && (
          <p className="text-sm text-gray-500 mb-6">
            <span className="font-semibold">Session ID:</span> {sessionId}
          </p>
        )}

        <a
          href="/dashboard"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
};

export default IssueBostPayment;
