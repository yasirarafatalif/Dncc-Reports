import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxios from '../../../Hooks/useAxios';

const UserSubcriptionSuccess = () => {
     const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('loading');
  const axiosSecure = useAxios();
  const [userData, setUserData]= useState([])

  useEffect(() => {
    if (!sessionId) {
      setStatus('failed');
      return;
    }

    axiosSecure.get(`/verify-session?session_id=${sessionId}`)
    .then(res=>{
        setUserData(res.data)
    })

    axiosSecure.patch(`/verify-user-payment-success?session_id=${sessionId}`)
    .then(res=>{
       
    })

   
  }, [sessionId]);


 
    return (
        <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
            <div className="bg-white max-w-xl w-full rounded-2xl shadow-xl p-8 border border-green-200">


                <div className="flex flex-col items-center text-center">


                    {/* Success icon */}
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md border border-green-100">
                        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                    </div>


                    {/* Heading */}
                    <h1 className="text-2xl font-bold text-green-800 mt-5">Payment Successful!</h1>


                    {/* Subtext */}
                    <p className="mt-2 text-gray-600 max-w-md">
                        {userData?.session ? `${userData?.session?.customer_email}, ` : ''}your payment of <span className="font-semibold text-green-700">{userData?.session?.currency}{userData?.session?.amount_total}</span> was received. Your account has been upgraded to <span className="font-semibold">Premium</span>.
                    </p>


                    {/* Info card */}
                    <div className="mt-6 w-full bg-green-50 border border-green-100 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-800 font-medium">Premium Activated</p>
                                <p className="text-xs text-green-700/80">Unlimited issue submissions · Priority support · Premium badge</p>
                            </div>
                            <div className="text-right">
                                {/* <p className="text-lg font-bold text-green-800">{currency}{amount}</p> */}
                                <p className="text-lg font-bold text-green-800">BDT {userData?.session?.amount_total}</p>
                                <p className="text-xs text-green-600">One-time</p>
                            </div>
                        </div>
                    </div>


                    {/* Actions */}
                    <div className="mt-6 w-full flex flex-col sm:flex-row gap-3">
                        <button
                            // onClick={() => onContinue && onContinue()}
                            className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                        >
                            Go to Dashboard
                        </button>


                        <button
                            // onClick={() => onSubmitIssue && onSubmitIssue()}
                            className="flex-1 px-4 py-3 border border-green-200 text-green-700 rounded-lg bg-white hover:bg-green-50 transition"
                        >
                            Submit an Issue
                        </button>
                    </div>


                    {/* Receipt / Reference area (optional) */}
                    <div className="mt-5 text-xs text-gray-500 w-full">
                        <p>If you need a receipt or have any questions, contact support at <a href="mailto:admin@example.com" className="underline">yasirarafatalif1@gmail.com</a>.</p>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default UserSubcriptionSuccess;