"use client";
import React, { useState, useEffect } from "react";
import {
  Home,
  Dumbbell,
  ChefHat,
  ShoppingBag,
  Menu,
  X,
  Settings,
  Users,
  FileText,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import TrainingDashboard from "@/dashboard/user/TrainingDashboard";
import KitchenDashboard from "@/dashboard/user/KitchenDashboard";
import HomeOverview from "@/dashboard/user/HomeOverview";

import AdminHomeOverview from "@/dashboard/admin/AdminHomeOverview";
import AdminTrainingDashboard from "@/dashboard/admin/AdminTrainingDashboard";
import AdminKitchenDashboard from "@/dashboard/admin/AdminKitchenDashboard";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState("home");
  const { user, loading, hasRole, signout } = useAuth();
  const router = useRouter();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin");
    }
  }, [user, loading, router]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signout();
      router.push("/auth/signin");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Wait for loading to finish
  if (loading) {
    return <div>Loading...</div>;
  }

  // If no user, render nothing (middleware or useEffect will redirect)
  if (!user) {
    return null;
  }

  const userModules = [
    { id: "home", name: "Home", icon: Home },
    { id: "training", name: "Training", icon: Dumbbell },
    { id: "kitchen", name: "Kitchen", icon: ChefHat },
    { id: "shop", name: "Shop", icon: ShoppingBag },
  ];

  const adminModules = [
    ...userModules,
    { id: "users", name: "User Management", icon: Users },
    { id: "reports", name: "Reports", icon: FileText },
    { id: "settings", name: "Settings", icon: Settings },
  ];

  const modules = hasRole("admin") ? adminModules : userModules;

  // Access Denied component for non-admin users trying to access admin routes
  const AccessDenied = () => (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="text-red-500 text-6xl mb-4">
        <X size={64} />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
      <p className="text-gray-600">
        You don&apos;t have permission to access this page.
      </p>
      <button
        onClick={() => setActiveModule("home")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Return to Home
      </button>
    </div>
  );

  const renderContent = () => {
    switch (activeModule) {
      case "home":
        return hasRole("admin") ? <AdminHomeOverview /> : <HomeOverview />;
      case "training":
        return hasRole("admin") ? (
          <AdminTrainingDashboard />
        ) : (
          <TrainingDashboard />
        );
      case "kitchen":
        return hasRole("admin") ? (
          <AdminKitchenDashboard />
        ) : (
          <KitchenDashboard />
        );
      case "users":
        return hasRole("admin") ? <div>User Management</div> : <AccessDenied />;
      case "reports":
        return hasRole("admin") ? <div>Reports</div> : <AccessDenied />;
      case "settings":
        return hasRole("admin") ? <div>Settings</div> : <AccessDenied />;
      default:
        return <div>Module under development</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gray-900 text-white transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div className="p-4 flex justify-between items-center">
          <h2
            className={`${
              isSidebarOpen ? "block" : "hidden"
            } font-bold text-xl`}
          >
            {hasRole("admin") ? "Admin Dashboard" : "Dashboard"}
          </h2>
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Admin Status Indicator */}
        {isSidebarOpen && (
          <div className="px-4 py-2">
            <div
              className={`rounded-md p-2 text-sm ${
                hasRole("admin") ? "bg-green-800" : "bg-gray-800"
              }`}
            >
              Status: {hasRole("admin") ? "Admin" : "User"}
            </div>
          </div>
        )}

        <nav className="mt-6 flex-grow">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center p-4 hover:bg-gray-800 transition-colors ${
                activeModule === module.id ? "bg-gray-800" : ""
              }`}
            >
              <module.icon size={20} />
              <span className={`${isSidebarOpen ? "ml-4" : "hidden"}`}>
                {module.name}
              </span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className={`w-full flex items-center p-3 hover:bg-red-800 transition-colors ${
            isSidebarOpen ? "mt-auto" : "mt-auto"
          }`}
        >
          <LogOut size={20} />
          <span className={`${isSidebarOpen ? "ml-4" : "hidden"}`}>
            Logout
          </span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;