import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const MonthlyTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-lg border">
        <p className="font-semibold text-gray-800">
          Month: {label}
        </p>
        <p className="text-green-600 font-bold">
          Payments: {payload[0].value}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Total payments completed this month
        </p>
      </div>
    );
  }
  return null;
};

const MonthlyPaymentChart = ({ payments }) => {

  const monthlyData = {};

  payments.forEach(payment => {
    const date = new Date(payment.paidAt);
    const month = date.toLocaleString('default', { month: 'short' });

    if (!monthlyData[month]) {
      monthlyData[month] = 0;
    }

    monthlyData[month] += 1;
  });

  const chartData = Object.keys(monthlyData).map(month => ({
    month,
    count: monthlyData[month]
  }));

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* HEADER */}
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-800">
          Monthly Payments
        </h2>
        <p className="text-sm text-gray-500">
          Payment activity overview by month
        </p>
      </div>

      {/* CHART */}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis
            dataKey="month"
            stroke="#6b7280"
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />

          <YAxis
            allowDecimals={false}
            stroke="#6b7280"
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />

          <Tooltip content={<MonthlyTooltip />} />

          <Bar
            dataKey="count"
            fill="#22c55e"     
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default MonthlyPaymentChart;
