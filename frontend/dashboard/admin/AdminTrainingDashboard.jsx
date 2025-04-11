import React from "react";
import { Users, Award, TrendingUp, Clock } from "lucide-react";

const AdminTrainingDashboard = () => {
  const programs = [
    { name: "Beginner Fitness", users: 156, completion: 78, status: "active" },
    { name: "Advanced Strength", users: 89, completion: 65, status: "active" },
    { name: "HIIT Program", users: 234, completion: 92, status: "active" },
    { name: "Yoga Basics", users: 178, completion: 85, status: "active" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Training Programs Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <Users className="h-8 w-8 text-blue-500" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Active Users</p>
            <h3 className="text-2xl font-bold">657</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <Award className="h-8 w-8 text-green-500" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Programs</p>
            <h3 className="text-2xl font-bold">12</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <TrendingUp className="h-8 w-8 text-purple-500" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Completion Rate</p>
            <h3 className="text-2xl font-bold">82%</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <Clock className="h-8 w-8 text-orange-500" />
          <div className="ml-4">
            <p className="text-sm text-gray-500">Avg. Session</p>
            <h3 className="text-2xl font-bold">45m</h3>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Active Programs</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-4">Program Name</th>
                <th className="pb-4">Active Users</th>
                <th className="pb-4">Completion Rate</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {programs.map((program, index) => (
                <tr key={index} className="border-t">
                  <td className="py-4">{program.name}</td>
                  <td className="py-4">{program.users}</td>
                  <td className="py-4">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${program.completion}%` }}
                        ></div>
                      </div>
                      <span>{program.completion}%</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                      {program.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTrainingDashboard;
