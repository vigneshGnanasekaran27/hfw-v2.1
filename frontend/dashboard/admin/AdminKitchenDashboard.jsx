import React from "react";
import {
  Utensils,
  Users,
  ShoppingCart,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const AdminKitchenDashboard = () => {
  const mealPlans = [
    {
      name: "Weight Loss Plan",
      subscribers: 245,
      rating: 4.8,
      status: "active",
    },
    {
      name: "Muscle Gain Diet",
      subscribers: 189,
      rating: 4.6,
      status: "active",
    },
    {
      name: "Vegan Lifestyle",
      subscribers: 156,
      rating: 4.7,
      status: "active",
    },
    { name: "Keto Program", subscribers: 178, rating: 4.5, status: "active" },
  ];

  const recentOrders = [
    {
      id: "#ORD-001",
      user: "John Doe",
      plan: "Weight Loss Plan",
      date: "2024-02-23",
      status: "completed",
    },
    {
      id: "#ORD-002",
      user: "Jane Smith",
      plan: "Muscle Gain Diet",
      date: "2024-02-23",
      status: "processing",
    },
    {
      id: "#ORD-003",
      user: "Mike Johnson",
      plan: "Vegan Lifestyle",
      date: "2024-02-22",
      status: "completed",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Kitchen Management Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: Users,
            label: "Active Subscribers",
            value: 768,
            color: "text-blue-500",
          },
          {
            icon: Utensils,
            label: "Meal Plans",
            value: 12,
            color: "text-green-500",
          },
          {
            icon: ShoppingCart,
            label: "Orders Today",
            value: 24,
            color: "text-purple-500",
          },
          {
            icon: TrendingUp,
            label: "Revenue",
            value: "$5.2k",
            color: "text-orange-500",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white shadow rounded-lg flex items-center"
          >
            <item.icon className={`h-8 w-8 ${item.color}`} />
            <div className="ml-4">
              <p className="text-sm text-gray-500">{item.label}</p>
              <h3 className="text-2xl font-bold">{item.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Active Meal Plans</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Plan Name</th>
                <th className="pb-2">Subscribers</th>
                <th className="pb-2">Rating</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {mealPlans.map((plan, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">{plan.name}</td>
                  <td className="py-2">{plan.subscribers}</td>
                  <td className="py-2">⭐ {plan.rating}</td>
                  <td className="py-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {plan.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <div className="space-y-4">
            {recentOrders.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4"
              >
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.user}</p>
                  <p className="text-sm text-gray-500">{order.plan}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{order.date}</p>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Alerts & Notifications</h2>
        <div className="space-y-4">
          {[
            {
              icon: AlertCircle,
              title: "Low Inventory Alert",
              text: "Some ingredients are running low and need to be restocked.",
              color: "text-yellow-500",
              bg: "bg-yellow-50",
              textColor: "text-yellow-800",
            },
            {
              icon: AlertCircle,
              title: "New Diet Request",
              text: "3 new custom diet plan requests need review.",
              color: "text-blue-500",
              bg: "bg-blue-50",
              textColor: "text-blue-800",
            },
          ].map((alert, index) => (
            <div
              key={index}
              className={`flex items-center p-4 rounded-lg ${alert.bg}`}
            >
              <alert.icon className={`h-6 w-6 ${alert.color}`} />
              <div className="ml-3">
                <h4 className={`text-sm font-medium ${alert.textColor}`}>
                  {alert.title}
                </h4>
                <p className={`text-sm ${alert.textColor}`}>{alert.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminKitchenDashboard;
