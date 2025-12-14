import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useAxios from '../../../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import MonthlyPaymentChart from '../../../Components/BarChartComponents/MonthlyPaymentChart';


const AllPayments = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxios();

    const [searchEmail, setSearchEmail] = useState('');
    const [paymentType, setPaymentType] = useState('all');

    const { data: paymentInf = [] } = useQuery({
        queryKey: ["all-payments"],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-payments');
            return res.data;
        },
    });
    // console.log(paymentInf);

    const filteredPayments = paymentInf.filter(payment => {
        const emailMatch = payment?.paidEmail
            ?.toLowerCase()
            .includes(searchEmail.toLowerCase());

        const typeMatch =
            paymentType === 'all' || payment?.paymentType === paymentType;

        return emailMatch && typeMatch;
    });

    const getMonthlyPayments = (payments) => {
        const monthMap = {};

        payments.forEach(payment => {
            const date = new Date(payment.paidAt);
            const month = date.toLocaleString('default', { month: 'short' });

            if (!monthMap[month]) {
                monthMap[month] = 0;
            }

            monthMap[month] += 1; // 👉 count
            // monthMap[month] += payment.amount; // 👉 amount wise চাইলে
        });

        return Object.keys(monthMap).map(month => ({
            month,
            payments: monthMap[month],
        }));
    };


    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* HEADER */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">All Payments</h2>
                <p className="text-sm text-gray-500">View & manage all payment records</p>
            </div>

            {/* FILTER SECTION */}
            <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 items-center">
                {/* SEARCH */}
                <input
                    type="text"
                    placeholder="Search by email"
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    className="input input-bordered w-full md:w-1/3"
                />

                {/* PAYMENT TYPE FILTER */}
                <select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                    className="select select-bordered w-full md:w-1/4"
                >
                    <option value="all">All Payments</option>
                    <option value="premium">Subscription</option>
                    <option value="issue-bost">Parcel</option>
                </select>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto bg-white rounded-xl shadow">
                <table className="table table-zebra">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th>No</th>
                            <th>Email</th>
                            <th>Payment Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            filteredPayments.length > 0 ? (
                                filteredPayments.map((paymentData, i) => (
                                    <tr key={paymentData._id} className="hover">
                                        <th>{i + 1}</th>

                                        <td className="font-medium text-gray-700">
                                            {paymentData?.paidEmail}
                                        </td>

                                        <td>
                                            <span className={`badge 
                                                ${paymentData?.paymentType === 'subscription'
                                                    ? 'badge-success'
                                                    : 'badge-info'}`}>
                                                {paymentData?.paymentType}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                onClick={() => navigate(`/dashboard/payment/${paymentData._id}`)}
                                                className="btn btn-sm btn-outline btn-success"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-6 text-gray-400">
                                        No payment found
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <MonthlyPaymentChart payments={paymentInf}></MonthlyPaymentChart>

           
        </div>
    );
};

export default AllPayments;
