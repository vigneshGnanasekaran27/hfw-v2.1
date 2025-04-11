import React from "react";
import { Users, TrendingUp, ShoppingCart, AlertCircle } from "lucide-react";

const AdminHomeOverview = () => {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      color: "text-blue-500",
    },
    {
      title: "Active Programs",
      value: "56",
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Orders",
      value: "89",
      icon: ShoppingCart,
      color: "text-purple-500",
    },
    {
      title: "Support Tickets",
      value: "12",
      icon: AlertCircle,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 flex items-center"
          >
            <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent User Activities */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Recent User Activities</h2>
          <ul className="space-y-4">
            {[
              {
                icon: Users,
                title: "New User Registration",
                detail: "John Doe",
                time: "2m ago",
                color: "text-blue-500 bg-blue-100",
              },
              {
                icon: ShoppingCart,
                title: "New Order Placed",
                detail: "Training Program",
                time: "1h ago",
                color: "text-green-500 bg-green-100",
              },
              {
                icon: AlertCircle,
                title: "Support Ticket",
                detail: "Technical Issue",
                time: "3h ago",
                color: "text-red-500 bg-red-100",
              },
            ].map((activity, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color}`}
                  >
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.detail}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* System Overview */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">System Overview</h2>
          <div className="space-y-4">
            {[
              { label: "Server Load", value: 65, color: "bg-blue-500" },
              { label: "Storage Usage", value: 82, color: "bg-green-500" },
              { label: "Network Traffic", value: 44, color: "bg-purple-500" },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full`}
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomeOverview;
