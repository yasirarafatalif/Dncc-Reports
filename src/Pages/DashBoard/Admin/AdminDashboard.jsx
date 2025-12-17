import { useQuery } from "@tanstack/react-query";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import useAxios from "../../../Hooks/useAxios";
import { CiCircleInfo } from "react-icons/ci";

// Dummy stats data


const paymentChartData = [
  { month: "Jan", amount: 40000 },
  { month: "Feb", amount: 32000 },
  { month: "Mar", amount: 52000 },
  { month: "Apr", amount: 48000 },
  { month: "May", amount: 73000 },
];


const AdminDashboard = () => {
  const axiosSecure = useAxios();
  const { data: paymentInf = [] } = useQuery({
    queryKey: ["admin-all-get-issue"],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-dashboard');
      return res.data;
    },
  });
  console.log(paymentInf);

  const stats = [
    { title: "Total Issues", value: paymentInf?.totalIssue },
    { title: "Resolved Issues", value: paymentInf?.resolvedIssue },
    { title: "Pending Issues", value: paymentInf?.pendingIssue },
    { title: "Rejected Issues", value: paymentInf?.rejectedIssue },
    { title: "Total Payment", value: paymentInf?.totalPayment },
    { title: "Total Users", value: paymentInf?.totalUsers },
  ];

  const issueChartData = [
    { name: "Resolved", value: paymentInf?.resolvedIssue },
    { name: "Pending", value: paymentInf?.pendingIssue },
    { name: "Rejected", value: paymentInf?.rejectedIssue },
  ];


  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow p-4 hover:shadow-md transition"
          >
            <p className="text-sm text-gray-500">{s.title}</p>
            <h2 className="text-2xl font-bold text-gray-800">{s.value}</h2>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-4">Issue Status Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={issueChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
              >
                {issueChartData.map((_, index) => (
                  <Cell key={index} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-4">Monthly Payments</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={paymentChartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LATEST DATA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-4">Latest Issues</h3>
          <ul className="space-y-2">
            {paymentInf?.latestIssue?.map((i, idx) => (
              <li key={idx} className="flex justify-between text-sm">
                <span>{i?.category}</span>
                <span className="font-medium">{i?.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-4">Latest Payments</h3>
          <ul className="space-y-2">
            {paymentInf?.latestPayment?.map((p, i) => (
              <li key={p._id} className="flex justify-between text-sm">
                <span>{p?.paidEmail}</span>
                <span className="font-medium">{p?.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-4">New Users</h3>
          <ul className="space-y-2">
            {paymentInf?.latestUsers?.map((u, i) => (
              <li key={u._id} className="text-sm">
                <p className="font-medium">{u?.display_name}</p>
                <p className="text-gray-500">{u?.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;