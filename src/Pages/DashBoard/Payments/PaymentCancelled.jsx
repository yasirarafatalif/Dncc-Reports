
import { MdCancel } from "react-icons/md";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-lg p-8 text-center">
        
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <MdCancel className="text-red-500 text-6xl" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          আপনার পেমেন্টটি বাতিল করা হয়েছে।  
          কোনো টাকা কাটা হয়নি। চাইলে আবার চেষ্টা করতে পারেন।
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/dashboard/user-issue"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
