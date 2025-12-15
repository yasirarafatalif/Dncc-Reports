import React from 'react';
import useAxios from '../../../Hooks/useAxios';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

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
  console.log(paymentInf);

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

  const paymentChartData = [
    { month: "Jan", amount: 40000 },
    { month: "Feb", amount: 32000 },
    { month: "Mar", amount: 52000 },
    { month: "Apr", amount: 48000 },
    { month: "May", amount: 73000 },
  ];
const COLORS = ["#22c55e", "#facc15", "#ef4444"]; 

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


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        {/* <div className="bg-white rounded-2xl shadow p-6">
                 <h3 className="font-semibold mb-4">New Users</h3>
                 <ul className="space-y-2">
                   {paymentInf?.latestUsers?.map((u, i) => (
                     <li key={u._id} className="text-sm">
                       <p className="font-medium">{u?.display_name}</p>
                       <p className="text-gray-500">{u?.email}</p>
                     </li>
                   ))}
                 </ul>
               </div> */}
      </div>
    </div>
  );
};

export default UserDashboard;