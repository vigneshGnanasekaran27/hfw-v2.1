import React from "react";
import { Activity, Calendar, CheckCircle, Clock } from "lucide-react";
import LastTrainingCard from "./LastTrainingCard";

const HomeOverview = () => {
  const stats = [
    {
      title: "Active Programs",
      value: "3",
      icon: Activity,
      color: "text-blue-500 bg-blue-100",
    },
    {
      title: "Weekly Meals",
      value: "12",
      icon: Calendar,
      color: "text-green-500 bg-green-100",
    },
    {
      title: "Completed Tasks",
      value: "8",
      icon: CheckCircle,
      color: "text-purple-500 bg-purple-100",
    },
    {
      title: "Hours Trained",
      value: "24",
      icon: Clock,
      color: "text-orange-500 bg-orange-100",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome back!</h1>

      {/* Last Selected Training Card */}
      <LastTrainingCard />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex items-center"
          >
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities & Upcoming Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="ml-2">Completed workout session</span>
              <span className="ml-auto text-sm text-gray-500">2h ago</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="ml-2">Added new meal plan</span>
              <span className="ml-auto text-sm text-gray-500">5h ago</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="ml-2">Updated profile information</span>
              <span className="ml-auto text-sm text-gray-500">1d ago</span>
            </li>
          </ul>
        </div>

        {/* Upcoming Schedule */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Upcoming Schedule</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <Calendar className="h-4 w-4 text-blue-500" />
              <span className="ml-2">Morning Workout</span>
              <span className="ml-auto text-sm text-gray-500">
                Tomorrow, 7:00 AM
              </span>
            </li>
            <li className="flex items-center">
              <Calendar className="h-4 w-4 text-green-500" />
              <span className="ml-2">Meal Prep Session</span>
              <span className="ml-auto text-sm text-gray-500">
                Tomorrow, 2:00 PM
              </span>
            </li>
            <li className="flex items-center">
              <Calendar className="h-4 w-4 text-purple-500" />
              <span className="ml-2">Progress Review</span>
              <span className="ml-auto text-sm text-gray-500">
                Friday, 3:00 PM
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeOverview;
