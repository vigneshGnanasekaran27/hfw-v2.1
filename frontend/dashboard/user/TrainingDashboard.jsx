import React from "react";
import { Calendar, Clock, Users, Activity } from "lucide-react";

const TrainingDashboard = () => {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Training Dashboard</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          New Enrollment
        </button>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} title="Active Trainees" value="45" />
        <StatCard icon={Calendar} title="Pending Assessments" value="8" />
        <StatCard icon={Clock} title="Today's Sessions" value="12" />
        <StatCard icon={Activity} title="Completion Rate" value="87%" />
      </div>

      {/* Recent Enrollments */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Enrollments</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-sm">
                <th className="text-left py-3 px-4">Name</th>
                <th className="text-left py-3 px-4">Program</th>
                <th className="text-left py-3 px-4">Assessment Date</th>
                <th className="text-left py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* Sample data - replace with real data */}
              <tr className="border-b">
                <td className="py-3 px-4">John Doe</td>
                <td className="py-3 px-4">Strength Training</td>
                <td className="py-3 px-4">2024-02-25</td>
                <td className="py-3 px-4">
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Active
                  </span>
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Training Schedule */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
        <div className="space-y-4">
          {/* Sample schedule items - replace with real data */}
          <ScheduleItem
            time="09:00 AM"
            title="Fitness Assessment"
            trainee="Sarah Johnson"
            status="pending"
          />
          <ScheduleItem
            time="10:30 AM"
            title="Strength Training"
            trainee="Mike Smith"
            status="confirmed"
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

const ScheduleItem = ({ time, title, trainee, status }) => (
  <div className="flex items-center justify-between p-4 border rounded-lg">
    <div className="flex items-center space-x-4">
      <div className="text-gray-600">{time}</div>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-sm text-gray-600">{trainee}</div>
      </div>
    </div>
    <span
      className={`px-3 py-1 rounded-full text-sm ${
        status === "confirmed"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  </div>
);

export default TrainingDashboard;
