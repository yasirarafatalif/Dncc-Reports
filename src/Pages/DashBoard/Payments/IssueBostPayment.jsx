import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePDF from "./InvoicePDF";


const IssueBostPayment = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxios();
  const [userData, setUserData] = useState([])
  const [status, setStatus] = useState('loading');



     const res=async(id)=>{
             if (!sessionId) {
              setStatus('failed');
              return;
          }
  
           await axiosSecure.get(`/verify-session?session_id=${sessionId}`)
              .then(res => {
                  setUserData(res.data)
              })
          await axiosSecure
  .patch(`/verify-payment-success?session_id=${sessionId}`)
              .then(res => {
                setLoading(false)
                  
              })
              .catch(err => {
                  console.error(err);
              });
      }
  
  
      useEffect(() => {
          res(sessionId)
  
      }, [sessionId]);


          const invoiceData = {
        company: {
            name: "NagorikCare",
            email: "yasirarafatalif1@gmail.com",
            phone: "+880 1851973300",
        },
        invoiceNo: `INV-${Date.now()}`,
        date: new Date().toDateString(),
        customer: {
            name: userData?.userInfo?.name || "Customer",
            email: userData?.userInfo?.email,
            phone: userData?.userInfo?.phone,
        },
        items: [
            {
                title:userData?.paymentInfo?.percelName,
                qty: 1,
                price: userData?.paymentInfo?.amount,
            },
        ],
        payment: {
            method: "Card",
            transactionId: userData?.paymentInfo?.transactionId,
            status: userData?.paymentInfo?.status,
            total: userData?.paymentInfo?.amount,
        },
    };

  
  

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

 return (
   <div className="min-h-screen flex items-center justify-center bg-green-50 p-6">
    <title>Your Issue Payment</title>
     <div className="bg-white max-w-xl w-full rounded-2xl shadow-xl p-8 border border-green-200">
 
       {/* ICON */}
       <div className="flex flex-col items-center text-center">
         <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
           <svg
             xmlns="http://www.w3.org/2000/svg"
             className="w-10 h-10 text-green-600"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
           >
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
           </svg>
         </div>
 
         {/* TITLE */}
         <h1 className="text-2xl font-bold text-green-800">
           Payment Successful!
         </h1>
 
         {/* SUBTEXT */}
         <p className="mt-2 text-gray-600 max-w-md">
           <span className="font-medium">{userData?.userInfo?.name}</span>,
           your payment of{" "}
           <span className="font-semibold text-green-700">
             BDT {userData?.paymentInfo?.amount}
           </span>{" "}
           was received. Your account is now <span className="font-semibold">Premium</span>.
         </p>
 
         {/* INFO CARD */}
         <div className="mt-6 w-full bg-green-50 border border-green-100 rounded-lg p-4 flex justify-between items-center">
           <div>
             <p className="text-sm font-medium text-green-800">Premium Activated</p>
             <p className="text-xs text-green-700/80">
              Priority support · Issue Boots
             </p>
           </div>
           <div className="text-right">
             <p className="text-lg font-bold text-green-800">
               BDT {userData?.paymentInfo?.amount}
             </p>
             <p className="text-xs text-green-600">One-time payment</p>
           </div>
         </div>
 
         {/* ACTION BUTTONS */}
         <div className="mt-6 w-full flex flex-col sm:flex-row gap-3">
           <Link to='/dashboard'
             className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
           >
             Go to Dashboard
           </Link>
 
           <PDFDownloadLink
             document={<InvoicePDF data={invoiceData} />}
             fileName={`${invoiceData.invoiceNo}.pdf`}
             className="flex-1 px-4 py-3 bg-white border border-green-600 text-green-700 rounded-lg font-medium hover:bg-green-50 transition text-center"
           >
             {({ loading }) =>
               loading ? "Preparing invoice..." : "Download Invoice"
             }
           </PDFDownloadLink>
         </div>
 
         {/* FOOTER NOTE */}
         <p className="mt-5 text-xs text-gray-500">
           Need help? Contact us at{" "}
           <a
             href="mailto:yasirarafatalif1@gmail.com"
             className="underline"
           >
             yasirarafatalif1@gmail.com
           </a>
         </p>
       </div>
     </div>
   </div>
 );
};

export default IssueBostPayment;
