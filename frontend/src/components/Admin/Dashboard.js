import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

// Dummy data for charts
const salesData = [
  { date: "Sep 1", sales: 400 },
  { date: "Sep 2", sales: 300 },
  { date: "Sep 3", sales: 500 },
  { date: "Sep 4", sales: 250 },
  { date: "Sep 5", sales: 700 },
];

const topItems = [
  { name: "Product A", sold: 120 },
  { name: "Product B", sold: 90 },
  { name: "Product C", sold: 75 },
  { name: "Product D", sold: 60 },
];

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header Stats */}
      <h1 className="text-2xl font-bold mb-6">📊 Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-500">Total Sales</h2>
          <p className="text-2xl font-bold text-blue-600">₹ 52,340</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-500">Total Items Sold</h2>
          <p className="text-2xl font-bold text-green-600">1,245</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-500">New Customers</h2>
          <p className="text-2xl font-bold text-purple-600">320</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Over Time */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">📈 Sales Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Selling Items */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">🔥 Top Selling Items</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topItems}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sold" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
