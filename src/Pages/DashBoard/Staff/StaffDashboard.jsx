import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from "recharts";
import useAxios from "../../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";

const COLORS = ["#facc15", "#22c55e", "#ef4444", "#0000FF"];

const StaffDashboard = () => {
    const { user,loading } = useAuth()
    const axiosSecure = useAxios();
    const { data: paymentInf = [],isLoading } = useQuery({
        queryKey: ["staff-all-get-issue"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/staff-dashboard?email=${user?.email}`);
            return res.data;
        },
    });

    const Spinner = () => (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-14 h-14 border-4 border-blue-500 
    border-dashed rounded-full animate-spin"></div>
        </div>
    );
if (isLoading) {
  return <Spinner />;
}
if (loading) {
  return <Spinner />;
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl shadow p-5">
                        <p className="text-gray-500 text-sm">{item.title}</p>
                        <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
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
                    {
                        paymentInf?.tasks?.map((d, i) =>
                            <li key={d._id} className="flex justify-between items-center border-b pb-2">
                                <span>{d?.title}</span>
                                <span
                                    className={`text-sm font-medium ${d?.status === "pending"
                                        ? "text-yellow-500"
                                        : d?.status === "resolved"
                                            ? "text-green-600"
                                            : "text-red-500"
                                        }`}
                                >
                                    {d?.status}
                                </span>

                            </li>)
                    }
                </ul>
            </div>

        </div>
    );
};

export default StaffDashboard;
