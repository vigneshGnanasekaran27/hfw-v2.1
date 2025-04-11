import React from "react";
import { ShoppingCart, Clock, Utensils, TrendingUp } from "lucide-react";

const KitchenDashboard = () => {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kitchen Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          Place Order
        </button>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={ShoppingCart} title="Active Orders" value="18" />
        <StatCard icon={Clock} title="Pre-booked Meals" value="24" />
        <StatCard icon={Utensils} title="Menu Items" value="45" />
        <StatCard icon={TrendingUp} title="Today's Sales" value="₹8,459" />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-sm">
                <th className="text-left py-3 px-4">Order ID</th>
                <th className="text-left py-3 px-4">Items</th>
                <th className="text-left py-3 px-4">Total</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b">
                <td className="py-3 px-4">#ORD-2024-001</td>
                <td className="py-3 px-4">Protein Bowl, Green Smoothie</td>
                <td className="py-3 px-4">₹450</td>
                <td className="py-3 px-4">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    Processing
                  </span>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pre-booked Meals */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Pre-booked Meals</h2>
        <div className="space-y-4">
          <MealBooking
            date="Today"
            meals={[
              {
                time: "Lunch",
                items: "Grilled Chicken, Brown Rice",
                status: "confirmed",
              },
              { time: "Dinner", items: "Salmon Bowl", status: "pending" },
            ]}
          />
          <MealBooking
            date="Tomorrow"
            meals={[
              { time: "Breakfast", items: "Oatmeal Bowl", status: "confirmed" },
              { time: "Lunch", items: "Quinoa Salad", status: "confirmed" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <Icon size={24} className="text-gray-400" />
    </div>
  </div>
);

const MealBooking = ({ date, meals }) => (
  <div className="border rounded-lg p-4">
    <div className="font-medium mb-3">{date}</div>
    <div className="space-y-3">
      {meals.map((meal, index) => (
        <div key={index} className="flex items-center justify-between text-sm">
          <div>
            <span className="font-medium">{meal.time}:</span>
            <span className="ml-2 text-gray-600">{meal.items}</span>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              meal.status === "confirmed"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {meal.status.charAt(0).toUpperCase() + meal.status.slice(1)}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default KitchenDashboard;
