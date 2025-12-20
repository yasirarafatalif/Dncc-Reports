import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Spinar from '../../../Components/Shared/Spinar';

const COLORS = ["#facc15", "#22c55e", "#ef4444", "#0000FF"];

const StaffDashboard = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxios();
  const { data: paymentInf = [], isLoading } = useQuery({
    queryKey: ["staff-all-get-issue"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/staff-dashboard?email=${user?.email}`
      );
      return res.data;
    },
  });

  const Spinner = () => (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="w-14 h-14 border-4 border-blue-500 
    border-dashed rounded-full animate-spin"
      ></div>
    </div>
  );
  if (isLoading || loading) {
    return <Spinar></Spinar>
  }


  const stats = [
    { title: "Assigned Issues", value: paymentInf?.totalAssignedIssues },
    { title: "Resolved Issues", value: paymentInf?.resolvedIssues },
    { title: "Pending Issues", value: paymentInf?.pendingIssues },
    { title: "Today's Tasks", value: paymentInf?.tasks?.length },
  ];

  const pieData = [
    { name: "Assigned Issues", value: paymentInf?.totalAssignedIssues },
    { name: "Resolved Issues", value: paymentInf?.resolvedIssues },
    { name: "Pending Issues", value: paymentInf?.pendingIssues },
    { name: "Today's Tasks", value: paymentInf?.tasks?.length },
  ];

  const barData = [
    { name: "Assigned", value: paymentInf?.totalAssignedIssues },
    { name: "Resolved", value: paymentInf?.resolvedIssues },
    { name: "Pending", value: paymentInf?.pendingIssues },
  ];
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* ====== STAT CARDS ====== */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow p-5">
                        <p className="text-gray-500 text-sm">{item.title}</p>
                        <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
                    </div>
                ))}
            </div> */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

      {/* ====== CHART SECTION ====== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BAR CHART */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-4">Issue Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-4">Issue Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ====== TODAY'S TASKS ====== */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-4">Today's Tasks</h3>

        <ul className="space-y-3">
          {paymentInf?.tasks?.map((d, i) => (
            <li
              key={d._id}
              className="flex justify-between items-center border-b pb-2"
            >
              <span>{d?.title}</span>
              <span
                className={`text-sm font-medium ${
                  d?.status === "pending"
                    ? "text-yellow-500"
                    : d?.status === "resolved"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {d?.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StaffDashboard;
