import React, { useState, lazy, Suspense, use, useContext } from "react";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  BarChart2,
  Users,
  Briefcase,
  Settings,
  FileText,
  Grid,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

// Dynamically import admin components
// Note: In a real application, you'd replace these imports with your actual component paths

const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const UserManagement = lazy(() => import("../pages/admin/UserManagement"));
const DepartmentManagement = lazy(() =>
  import("../pages/admin/DepartmentManagement")
);
const AcademicManagement = lazy(() =>
  import("../pages/admin/AcademicManagement")
);
const SystemConfiguration = lazy(() => import("../pages/admin/SystemConfig"));
const ReportsAnalytics = lazy(() => import("../pages/admin/Reports"));

// For demo purposes, create simple placeholder components
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  // State to hold user data
  const { currentUser } = useAuth(); // Get current user from context

  // Mock user data
  // const currentUser = { firstName: user.firstName, lastName: user.lastName };
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("erpToken");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
    setDropdownOpen(false);
    setSidebarOpen(false);
    setActiveTab("dashboard"); // Reset to default tab on logout
    setCurrentUser(null); // Clear user data
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Grid className="mr-2" size={20} />,
      component: Dashboard,
    },
    {
      id: "users",
      label: "User Management",
      icon: <Users className="mr-2" size={20} />,
      component: UserManagement,
    },
    {
      id: "departments",
      label: "Department Management",
      icon: <Briefcase className="mr-2" size={20} />,
      component: DepartmentManagement,
    },
    {
      id: "academics",
      label: "Academic Management",
      icon: <FileText className="mr-2" size={20} />,
      component: AcademicManagement,
    },
    {
      id: "system",
      label: "System Configuration",
      icon: <Settings className="mr-2" size={20} />,
      component: SystemConfiguration,
    },
    {
      id: "reports",
      label: "Reports & Analytics",
      icon: <BarChart2 className="mr-2" size={20} />,
      component: ReportsAnalytics,
    },
  ];

  // Render the component associated with the active tab
  const renderContent = () => {
    const activeMenuItem = menuItems.find((item) => item.id === activeTab);
    if (!activeMenuItem) return null;

    const Component = activeMenuItem.component;

    return (
      <Suspense fallback={<LoadingFallback />}>
        <Component />
      </Suspense>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-3 p-1 rounded-md lg:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="text-xl font-bold tracking-wider">
              <span className="text-blue-400">Uni</span>Portal
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 bg-gray-900 hover:bg-gray-800 py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <User size={18} />
              <span className="hidden md:inline">
                {currentUser?.firstName} {currentUser?.lastName}
              </span>
              <ChevronDown size={16} />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-10">
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                  <div className="font-medium">Welcome,</div>
                  <div>
                    {currentUser?.firstName} {currentUser?.lastName}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 container mx-auto">
        {/* Sidebar - No margin on large screens */}
        <aside
          className={`fixed min-h-screen inset-y-0 left-0 z-50 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-gray-900 text-white overflow-y-auto`}
        >
          <div className="p-4 lg:p-0">
            <nav>
              <ul className="space-y-1">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`flex items-center px-4 py-3 w-full text-left transition-all duration-200 ${
                        activeTab === item.id
                          ? "bg-blue-600 text-white"
                          : "text-gray-300 hover:bg-gray-800 hover:text-blue-400"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
            {renderContent()}
          </div>
        </main>
      </div>

      {/* Overlay for sidebar on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-4 mt-6">
        <div className="container mx-auto px-4 text-center text-sm md:text-base">
          <p>
            &copy; {new Date().getFullYear()} College ERP Portal. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
