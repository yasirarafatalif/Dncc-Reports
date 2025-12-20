import React from 'react';
import useAxios from '../../../Hooks/useAxios';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CiCircleInfo } from 'react-icons/ci';

const UserDashboard = () => {

  const axiosSecure = useAxios();
  const { user } = useAuth();

  const { data: paymentInf = [] } = useQuery({
    queryKey: ["citizen-all-get-issue"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/citizen-dashboard?email=${user.email}`);
      return res.data;
    },
  });


  const stats = [
    { title: "Total Issues", value: paymentInf?.totalIssues },
    { title: "Resolved Issues", value: paymentInf?.resolvedIssues },
    { title: "Pending Issues", value: paymentInf?.pendingIssues },
    { title: "In Progress Issues", value: paymentInf?.inProgressIssues },
    { title: "Rejected Issues", value: paymentInf?.rejectedIssues },
    { title: "Total Payment", value: paymentInf?.totalPayment },
  ];

  const issueChartData = [
    { title: "Total Issues", value: paymentInf?.totalIssues },
    { title: "Resolved Issues", value: paymentInf?.resolvedIssues },
    { title: "Pending Issues", value: paymentInf?.pendingIssues },
    { title: "In Progress Issues", value: paymentInf?.inProgressIssues },
    { title: "Rejected Issues", value: paymentInf?.rejectedIssues },
    { title: "Total Payment", value: paymentInf?.totalPayments },
  ];


const COLORS = ["#22c55e", "#facc15", "#ef4444"]; 

  return (

    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <title>User Dashboard</title>
      {/* STATS CARDS */}


       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="group relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-white rounded-2xl shadow-lg border border-blue-100/50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            style={{
              animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both`,
            }}
          >
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-200/30 rounded-full blur-2xl -z-10 group-hover:scale-150 transition-transform duration-500" />

            {/* Header */}

            {/* Title */}
            <p className="text-sm font-medium text-gray-500 mb-2 group-hover:text-blue-600 transition-colors">
              {s.title}
            </p>

            {/* Value */}
            <h2 className="text-4xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
              {s.value}
            </h2>

            {/* Bottom bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </div>
        ))}
      </div>


     

         {/*  bar charts */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-4">Issue Status Overview</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={issueChartData}
                dataKey="value"
                nameKey="title"
                outerRadius={90}
                label
              >
                {issueChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-4">Latest Issues</h3>
          <ul className="space-y-2">
            {paymentInf?.latestIssue?.map((i, idx) => (
              <li key={idx} className="flex justify-between text-sm">
                <span>{i?.category}</span>
                <span className="font-medium">{i?.status}</span>
              </li>
            ))}
          </ul>
        </div> */}

        <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-white rounded-2xl shadow-xl p-6 border border-amber-100/50">
                  {/* Decorative background elements */}
                  <div className="absolute top-0 right-0 w-36 h-36 bg-orange-200/20 rounded-full blur-3xl -z-10"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl -z-10"></div>
        
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-xl text-gray-800 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                          />
                        </svg>
                      </div>
                      Latest Issues
                    </h3>
                    <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 bg-amber-100 px-3 py-1.5 rounded-full">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      {paymentInf?.latestIssue?.length || 0} active
                    </div>
                  </div>
        
                  {/* Issues List */}
                  <ul className="space-y-3">
                    {paymentInf?.latestIssue?.map((i, idx) => {
                      return (
                        <li
                          key={idx}
                          className="group relative flex items-center justify-between gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
                          style={{
                            animation: `fadeInScale 0.4s ease-out ${idx * 0.1}s both`,
                          }}
                        >
                          {/* Category */}
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <div className="relative flex-shrink-0">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center items-center group-hover:scale-110 transition-transform">
                                <CiCircleInfo />
                              </div>
                            </div>
        
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-gray-800 group-hover:text-amber-700 transition-colors truncate">
                                {i?.category}
                              </p>
                            </div>
                          </div>
        
                          {/* Status Badge */}
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold border ${
                                i?.status === "resolved"
                                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                  : " bg-red-100 text-red-700 border-red-200"
                              }  transition-all group-hover:scale-105 uppercase tracking-wide`}
                            >
                              {i?.status}
                            </span>
        
                            {/* Chevron indicator */}
                            <div className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                              <svg
                                className="w-5 h-5 text-amber-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </div>
                          </div>
        
                          {/* Hover glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-50/0 via-amber-50/60 to-amber-50/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

  


         <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50 to-white rounded-2xl shadow-xl p-6 border border-emerald-100/50">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-200/20 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-teal-200/20 rounded-full blur-2xl -z-10"></div>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-xl text-gray-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              Latest Payments
            </h3>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              {paymentInf?.latestPayment?.length || 0} transactions
            </div>
          </div>

          {/* Payments List */}
          <ul className="space-y-3">
            {paymentInf?.latestPayment?.map((p, i) => (
              <li
                key={p._id}
                className="group relative flex items-center justify-between gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300"
                style={{
                  animation: `slideInRight 0.4s ease-out ${i * 0.08}s both`,
                }}
              >
                {/* Payment Icon */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg
                        className="w-5 h-5 text-emerald-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    {/* Success indicator */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
                  </div>

                  {/* Email */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-emerald-700 transition-colors truncate">
                      {p?.paidEmail}
                    </p>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {p?.paidAt}
                    </p>
                  </div>
                </div>

                {/* Amount */}
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                      {p?.amount}
                    </p>
                    <p className="text-xs text-gray-400">BDT</p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                    <svg
                      className="w-5 h-5 text-emerald-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>
                </div>

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/0 via-emerald-50/50 to-emerald-50/0 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none"></div>
              </li>
            ))}
          </ul>
        </div>


      </div>
    </div>
  );
};

export default UserDashboard;