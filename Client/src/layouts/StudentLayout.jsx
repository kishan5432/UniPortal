// import { useState } from "react";
// import {
//   BookOpen,
//   CreditCard,
//   FileText,
//   MessageSquare,
//   User,
//   Menu,
//   X,
//   Bell,
//   Search,
//   ChevronDown,
//   LogOut,
// } from "lucide-react";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import AcademicInfo from "../pages/student/AcademicInfo";
// import FinancialManagement from "../pages/student/FinancialManagement";
// import CourseRegistration from "../pages/student/CourseRegistration";
// import Profile from "../pages/student/Profile";
// import Communication from "../pages/student/Communication";
// import { useAuth } from "../context/AuthContext";

// // Main Layout Component
// export default function StudentLayout() {
//   const [activeTab, setActiveTab] = useState("academic");
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [notificationsOpen, setNotificationsOpen] = useState(false);
//   const { currentUser, logout } = useAuth();

//   const handleLogout = async () => {
//     try {
//       await logout();
//       // You might need to redirect to login page here
//       // using a router if you're using one
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   // Sample notifications data
//   const notifications = [
//     {
//       id: 1,
//       title: "Assignment Deadline",
//       message: "Project Management assignment due tomorrow",
//       time: "2 hours ago",
//       unread: true,
//     },
//     {
//       id: 2,
//       title: "Tuition Payment",
//       message: "Your recent tuition payment has been processed",
//       time: "Yesterday",
//       unread: true,
//     },
//     {
//       id: 3,
//       title: "Course Materials",
//       message: "New course materials have been uploaded for CS301",
//       time: "2 days ago",
//       unread: false,
//     },
//   ];

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-blue-900 text-white shadow-md">
//         <div className="container mx-auto px-4 py-3 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button
//               className="md:hidden"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//             <h1 className="text-xl font-bold">UniPortal</h1>
//           </div>

//           <div className="hidden md:flex items-center w-1/3">
//             <div className="relative w-full">
//               <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-300" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="w-full pl-10 pr-4 py-2 bg-blue-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             {/* Notifications Bell */}
//             <div className="relative mr-2 justify-center">
//               <button
//                 className="relative"
//                 onClick={() => setNotificationsOpen(!notificationsOpen)}
//               >
//                 <Bell size={20} />
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   {notifications.filter((n) => n.unread).length}
//                 </span>
//               </button>

//               {/* Notifications Dropdown */}
//               {notificationsOpen && (
//                 <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
//                   <div className="py-2 px-3 bg-blue-800 text-white font-medium flex justify-between items-center">
//                     <span>Notifications</span>
//                     <button className="text-xs text-blue-200 hover:text-white">
//                       Mark all as read
//                     </button>
//                   </div>
//                   <div className="max-h-72 overflow-y-auto">
//                     {notifications.length > 0 ? (
//                       notifications.map((notification) => (
//                         <div
//                           key={notification.id}
//                           className={`p-3 border-b border-gray-100 ${
//                             notification.unread ? "bg-blue-50" : ""
//                           }`}
//                         >
//                           <div className="flex justify-between">
//                             <h4 className="font-medium text-gray-800">
//                               {notification.title}
//                             </h4>
//                             <span className="text-xs text-gray-500">
//                               {notification.time}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-600 mt-1">
//                             {notification.message}
//                           </p>
//                         </div>
//                       ))
//                     ) : (
//                       <div className="p-4 text-center text-gray-500">
//                         No notifications
//                       </div>
//                     )}
//                   </div>
//                   <div className="p-2 bg-gray-50 text-center">
//                     <button className="text-sm text-blue-600 hover:text-blue-800">
//                       View all notifications
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* User Profile with Auth Integration */}
//             <div className="hidden md:flex items-center gap-2">
//               <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
//                 <span className="font-semibold">
//                   {currentUser
//                     ? currentUser.firstName
//                         // .split(" ")
//                         // .map((n) => n[0])
//                         // .join("")
//                         // .substring(0, 2)
//                         .toUpperCase()
//                     : "JS"}
//                 </span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <span className="text-sm">
//                   {currentUser ? currentUser.name : "John Smith"}
//                 </span>
//               </div>

//               {/* Logout Button */}
//               <button
//                 onClick={handleLogout}
//                 className="ml-2 p-1.5 bg-blue-800 rounded-md hover:bg-blue-700 transition"
//                 title="Logout"
//               >
//                 <LogOut size={16} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white shadow-lg">
//           <nav className="container mx-auto px-4 py-2">
//             <ul>
//               {navItems.map((item) => (
//                 <li key={item.id} className="py-2 border-b border-gray-100">
//                   <button
//                     className={`flex items-center gap-2 w-full ${
//                       activeTab === item.id
//                         ? "text-blue-600 font-medium"
//                         : "text-gray-700"
//                     }`}
//                     onClick={() => {
//                       setActiveTab(item.id);
//                       setMobileMenuOpen(false);
//                     }}
//                   >
//                     <item.icon size={18} />
//                     {item.label}
//                   </button>
//                 </li>
//               ))}
//               {/* Add logout option for mobile menu */}
//               <li className="py-2">
//                 <button
//                   className="flex items-center gap-2 w-full text-red-600"
//                   onClick={handleLogout}
//                 >
//                   <LogOut size={18} />
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="flex flex-1">
//         {/* Sidebar Navigation */}
//         <aside className="hidden md:block w-64 bg-white shadow-md">
//           <nav className="p-4">
//             <ul className="space-y-1">
//               {navItems.map((item) => (
//                 <li key={item.id}>
//                   <button
//                     className={`flex items-center gap-3 w-full px-4 py-3 rounded-md transition-colors ${
//                       activeTab === item.id
//                         ? "bg-blue-50 text-blue-700 font-medium"
//                         : "text-gray-700 hover:bg-gray-100"
//                     }`}
//                     onClick={() => setActiveTab(item.id)}
//                   >
//                     <item.icon size={18} />
//                     {item.label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </aside>

//         {/* Content Area */}
//         <main className="flex-1 p-6">
//           <div className="container mx-auto">
//             {/* Breadcrumb */}
//             <div className="mb-6">
//               <h2 className="text-2xl font-bold text-gray-800">
//                 {navItems.find((item) => item.id === activeTab)?.label}
//               </h2>
//               <p className="text-sm text-gray-500">
//                 Dashboard /{" "}
//                 {navItems.find((item) => item.id === activeTab)?.label}
//               </p>
//             </div>

//             {/* Dynamic Content */}
//             {activeTab === "academic" && <AcademicInfo />}
//             {activeTab === "financial" && <FinancialManagement />}
//             {activeTab === "registration" && <CourseRegistration />}
//             {activeTab === "communication" && <Communication />}
//             {activeTab === "profile" && <Profile />}
//           </div>
//         </main>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-100 py-4 text-center text-gray-600 text-sm">
//         <div className="container mx-auto">
//           <p>© 2025 UniPortal. All rights reserved.</p>
//           <div className="mt-2 flex justify-center gap-4">
//             <a href="#" className="hover:text-blue-600">
//               Privacy Policy
//             </a>
//             <a href="#" className="hover:text-blue-600">
//               Terms of Use
//             </a>
//             <a href="#" className="hover:text-blue-600">
//               Help Center
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

// const navItems = [
//   { id: "academic", label: "Academic Information", icon: BookOpen },
//   { id: "financial", label: "Financial Management", icon: CreditCard },
//   { id: "registration", label: "Registration", icon: FileText },
//   { id: "communication", label: "Communication", icon: MessageSquare },
//   { id: "profile", label: "Personal Profile", icon: User },
// ];

import { useState, useEffect } from "react";
import {
  BookOpen,
  CreditCard,
  FileText,
  MessageSquare,
  User,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  BookMarked,
  BarChart3,
  Home,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AcademicInfo from "../pages/student/AcademicInfo";
import FinancialManagement from "../pages/student/FinancialManagement";
import CourseRegistration from "../pages/student/CourseRegistration";
import Profile from "../pages/student/Profile";
import Communication from "../pages/student/Communication";
import Dashboard from "../pages/student/Dashboard";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "academic", label: "Academic Information", icon: BookOpen },
  { id: "financial", label: "Financial Management", icon: CreditCard },
  { id: "registration", label: "Registration", icon: FileText },
  { id: "communication", label: "Communication", icon: MessageSquare },
  { id: "profile", label: "Personal Profile", icon: User },
];

// Main Layout Component
export default function StudentLayout() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  const navigate = useNavigate();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close notifications if clicking outside
      if (
        notificationsOpen &&
        !event.target.closest(".notifications-container")
      ) {
        setNotificationsOpen(false);
      }

      // Close profile menu if clicking outside
      if (profileMenuOpen && !event.target.closest(".profile-menu-container")) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notificationsOpen, profileMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Format date for header
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Format time for header
  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: "Assignment Deadline",
      message: "Computer Science project due tomorrow at 11:59 PM",
      time: "2 hours ago",
      unread: true,
      type: "academic",
    },
    {
      id: 2,
      title: "Tuition Payment",
      message: "Your recent tuition payment of $1,250 has been processed",
      time: "Yesterday",
      unread: true,
      type: "financial",
    },
    {
      id: 3,
      title: "New Course Materials",
      message: "Professor Johnson uploaded new lecture slides for CS301",
      time: "2 days ago",
      unread: false,
      type: "academic",
    },
    {
      id: 4,
      title: "Campus Event",
      message: "Tech Career Fair next Tuesday in the Student Union, 10AM-3PM",
      time: "May 2, 2025",
      unread: false,
      type: "event",
    },
    {
      id: 5,
      title: "Scholarship Opportunity",
      message: "New STEM scholarship application is now open. Deadline: May 30",
      time: "May 1, 2025",
      unread: true,
      type: "financial",
    },
  ];

  const getInitials = (name) => {
    if (!name) return "JS";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left Side - Logo and Toggle */}
            <div className="flex items-center gap-4">
              <button
                className="p-1 hover:bg-blue-800 rounded-md transition-colors"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-2">
                <BookMarked size={24} />
                <h1 className="text-xl font-bold">UniPortal</h1>
              </div>
            </div>

            {/* Center - Search */}
            <div className="hidden md:flex items-center justify-center w-1/3">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-300" />
                <input
                  type="text"
                  placeholder="Search courses, documents, resources..."
                  className="w-full pl-10 pr-4 py-2 bg-blue-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
                />
              </div>
            </div>

            {/* Right Side - Date/Time, Notifications, and Profile */}
            <div className="flex items-center gap-6">
              {/* Date and Time (Desktop only) */}
              <div className="hidden lg:flex flex-col items-end">
                <div className="flex items-center gap-1 text-xs text-blue-100">
                  <Calendar size={12} />
                  <span>{formatDate(currentTime)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-blue-100">
                  <Clock size={12} />
                  <span>{formatTime(currentTime)}</span>
                </div>
              </div>

              {/* Notifications */}
              <div className="relative notifications-container">
                <button
                  className="relative p-2 hover:bg-blue-800/50 rounded-full transition-colors"
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen);
                    setProfileMenuOpen(false);
                  }}
                  aria-label="Notifications"
                >
                  <Bell size={20} />
                  {notifications.filter((n) => n.unread).length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {notifications.filter((n) => n.unread).length}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-20 border border-gray-200">
                    <div className="py-3 px-4 bg-gradient-to-r from-blue-800 to-blue-700 text-white font-medium flex justify-between items-center">
                      <span>Notifications</span>
                      <button className="text-xs text-blue-200 hover:text-white">
                        Mark all as read
                      </button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${
                              notification.unread ? "bg-blue-50" : ""
                            }`}
                          >
                            <div className="flex justify-between">
                              <h4 className="font-medium text-gray-800">
                                {notification.title}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {notification.time}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <div className="mt-2 flex justify-between items-center">
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  notification.type === "academic"
                                    ? "bg-green-100 text-green-800"
                                    : notification.type === "financial"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-purple-100 text-purple-800"
                                }`}
                              >
                                {notification.type.charAt(0).toUpperCase() +
                                  notification.type.slice(1)}
                              </span>
                              {notification.unread && (
                                <button className="text-xs text-blue-600 hover:text-blue-800">
                                  Mark as read
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No notifications
                        </div>
                      )}
                    </div>
                    <div className="p-3 bg-gray-50 text-center">
                      <button className="text-sm text-blue-600 hover:text-blue-800">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="relative profile-menu-container">
                <button
                  className="flex items-center gap-2 p-1 hover:bg-blue-800/50 rounded-lg transition-colors"
                  onClick={() => {
                    setProfileMenuOpen(!profileMenuOpen);
                    setNotificationsOpen(false);
                  }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <span className="font-semibold text-sm">
                      {currentUser ? getInitials(currentUser.name) : "JS"}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium">
                        {currentUser ? currentUser.name : "John Smith"}
                      </span>
                      <ChevronDown size={16} />
                    </div>
                    <span className="text-xs text-blue-200">
                      {currentUser?.role || "Student"}
                    </span>
                  </div>
                </button>

                {/* Profile Menu Dropdown */}
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-20 border border-gray-200">
                    <div className="p-4 bg-gradient-to-r from-blue-800 to-blue-700 text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                          <span className="font-semibold text-lg">
                            {currentUser ? getInitials(currentUser.name) : "JS"}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium">
                            {currentUser ? currentUser.name : "John Smith"}
                          </div>
                          <div className="text-xs text-blue-200">
                            {currentUser?.email || "john.smith@university.edu"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <button
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                        onClick={() => {
                          setActiveTab("profile");
                          setProfileMenuOpen(false);
                        }}
                      >
                        <User size={16} />
                        <span>My Profile</span>
                      </button>

                      <hr className="my-1 border-gray-200" />
                      <button
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
                        onClick={() => {
                          handleLogout();
                          setProfileMenuOpen(false);
                        }}
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Search - Only visible on small screens */}
          <div className="mt-3 md:hidden">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-300" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-blue-800/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg z-30">
          <nav className="container mx-auto px-4 py-2">
            <ul>
              {navItems.map((item) => (
                <li key={item.id} className="py-2 border-b border-gray-100">
                  <button
                    className={`flex items-center gap-2 w-full ${
                      activeTab === item.id
                        ? "text-blue-600 font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="py-2">
                <button
                  className="flex items-center gap-2 w-full text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar Navigation - Collapsible */}
        <aside
          className={`${
            sidebarCollapsed ? "w-16" : "w-64"
          } bg-white shadow-md transition-all duration-300 ease-in-out hidden md:block fixed h-full z-10`}
        >
          <div className="h-full flex flex-col justify-between">
            <nav className="p-3">
              <button
                className="flex items-center justify-center w-full mb-6 p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                aria-label={
                  sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"
                }
              >
                {sidebarCollapsed ? (
                  <ChevronRight size={20} />
                ) : (
                  <ChevronLeft size={20} />
                )}
              </button>

              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      className={`flex items-center ${
                        sidebarCollapsed ? "justify-center" : "justify-start"
                      } w-full px-3 py-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveTab(item.id)}
                      title={sidebarCollapsed ? item.label : ""}
                    >
                      <item.icon size={20} />
                      {!sidebarCollapsed && (
                        <span className="ml-3">{item.label}</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Bottom Sidebar Area */}
            <div
              className={`p-3 border-t border-gray-200 ${
                sidebarCollapsed ? "text-center" : ""
              }`}
            >
              {!sidebarCollapsed && (
                <div className="mb-2 text-xs text-gray-500 flex items-center justify-between">
                  <span>Current Term</span>
                  <span className="font-medium text-blue-700">Spring 2025</span>
                </div>
              )}
              <div
                className={`${
                  sidebarCollapsed ? "text-center p-2" : "p-3"
                } bg-gradient-to-r from-green-50 to-blue-50 rounded-lg`}
              >
                {!sidebarCollapsed ? (
                  <>
                    <div className="text-xs font-medium text-green-800">
                      Next Class
                    </div>
                    <div className="text-sm font-semibold text-gray-800 mt-1">
                      Computer Science 301
                    </div>
                    <div className="text-xs text-gray-600 mt-1 flex items-center justify-between">
                      <span>Room 302B</span>
                      <span>15 min</span>
                    </div>
                  </>
                ) : (
                  <div
                    className="text-green-700"
                    title="Next Class: Computer Science 301 (15 min)"
                  >
                    <Clock size={20} className="mx-auto" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area with padding for sidebar */}
        <main
          className={`flex-1 p-6 ${
            sidebarCollapsed ? "md:ml-16" : "md:ml-64"
          } transition-all duration-300 ease-in-out`}
        >
          <div className="container mx-auto max-w-5xl">
            {/* Breadcrumb */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {navItems.find((item) => item.id === activeTab)?.label ||
                  "Dashboard"}
              </h2>
              <p className="text-sm text-gray-500">
                Home /{" "}
                {navItems.find((item) => item.id === activeTab)?.label ||
                  "Dashboard"}
              </p>
            </div>

            {/* Welcome Alert - Only on Dashboard */}
            {activeTab === "dashboard" && (
              <Alert className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                <AlertTitle className="text-blue-800">
                  Welcome back, {currentUser?.name?.split(" ")[0] || "John"}!
                </AlertTitle>
                <AlertDescription className="text-blue-700">
                  You have 3 upcoming assignments and 2 unread messages. Your
                  next class starts in 15 minutes.
                </AlertDescription>
              </Alert>
            )}

            {/* Dynamic Content */}
            {activeTab === "dashboard" && <Dashboard />}
            {activeTab === "academic" && <AcademicInfo />}
            {activeTab === "financial" && <FinancialManagement />}
            {activeTab === "registration" && <CourseRegistration />}
            {activeTab === "communication" && <Communication />}
            {activeTab === "profile" && <Profile />}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white py-4 text-center text-gray-600 text-sm border-t border-gray-200">
        <div className="container mx-auto">
          <p>© 2025 UniPortal. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-6">
            <a href="#" className="hover:text-blue-600">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-600">
              Terms of Use
            </a>
            <a href="#" className="hover:text-blue-600">
              Help Center
            </a>
            <a href="#" className="hover:text-blue-600">
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Simple Dashboard component placeholder
// function Dashboard() {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {/* Quick Stats */}
//       <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-sm font-medium text-gray-500">GPA</div>
//               <div className="mt-1 text-2xl font-bold text-gray-800">3.75</div>
//             </div>
//             <div className="bg-green-100 p-3 rounded-full">
//               <BarChart3 className="text-green-600" size={20} />
//             </div>
//           </div>
//           <div className="mt-2 text-xs text-green-600">
//             ↑ 0.2 from last semester
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-sm font-medium text-gray-500">Credits</div>
//               <div className="mt-1 text-2xl font-bold text-gray-800">
//                 78/120
//               </div>
//             </div>
//             <div className="bg-blue-100 p-3 rounded-full">
//               <BookOpen className="text-blue-600" size={20} />
//             </div>
//           </div>
//           <div className="mt-2 text-xs text-blue-600">65% complete</div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-sm font-medium text-gray-500">Due Today</div>
//               <div className="mt-1 text-2xl font-bold text-gray-800">2</div>
//             </div>
//             <div className="bg-amber-100 p-3 rounded-full">
//               <FileText className="text-amber-600" size={20} />
//             </div>
//           </div>
//           <div className="mt-2 text-xs text-amber-600">
//             Programming & Chemistry
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-sm font-medium text-gray-500">Balance</div>
//               <div className="mt-1 text-2xl font-bold text-gray-800">
//                 $1,250
//               </div>
//             </div>
//             <div className="bg-purple-100 p-3 rounded-full">
//               <CreditCard className="text-purple-600" size={20} />
//             </div>
//           </div>
//           <div className="mt-2 text-xs text-purple-600">Due in 14 days</div>
//         </div>
//       </div>

//       {/* Today's Schedule */}
//       <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">
//           Today's Schedule
//         </h3>
//         <div className="space-y-4">
//           <div className="flex gap-3">
//             <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium w-16 text-center flex flex-col">
//               <span>9:00</span>
//               <span>10:30</span>
//             </div>
//             <div>
//               <div className="font-medium">Computer Science 301</div>
//               <div className="text-sm text-gray-500">
//                 Room 302B • Prof. Johnson
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-3">
//             <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium w-16 text-center flex flex-col">
//               <span>11:00</span>
//               <span>12:30</span>
//             </div>
//             <div>
//               <div className="font-medium">Chemistry Lab</div>
//               <div className="text-sm text-gray-500">
//                 Science Bldg • Room 105
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-3">
//             <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium w-16 text-center flex flex-col">
//               <span>2:00</span>
//               <span>3:30</span>
//             </div>
//             <div>
//               <div className="font-medium">Statistics 202</div>
//               <div className="text-sm text-gray-500">Math Bldg • Room 210</div>
//             </div>
//           </div>

//           <div className="flex gap-3">
//             <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium w-16 text-center flex flex-col">
//               <span>4:00</span>
//               <span>5:00</span>
//             </div>
//             <div>
//               <div className="font-medium">Study Group</div>
//               <div className="text-sm text-gray-500">
//                 Library • Group Room 3
//               </div>
//             </div>
//           </div>
//         </div>
//         <button className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
//           View Full Schedule
//         </button>
//       </div>

//       {/* Upcoming Assignments */}
//       <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold text-gray-800">
//             Upcoming Assignments
//           </h3>
//           <button className="text-sm text-blue-600 hover:text-blue-800">
//             View All
//           </button>
//         </div>
//         <div className="space-y-3">
//           <div className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg">
//             <div className="flex items-center gap-3">
//               <div className="bg-red-100 p-2 rounded-md">
//                 <FileText className="text-red-600" size={18} />
//               </div>
//               <div>
//                 <div className="font-medium">Programming Project</div>
//                 <div className="text-sm text-gray-600">
//                   CS301 • Prof. Johnson
//                 </div>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="text-red-600 font-medium">Today</div>
//               <div className="text-xs text-gray-500">11:59 PM</div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
//             <div className="flex items-center gap-3">
//               <div className="bg-amber-100 p-2 rounded-md">
//                 <FileText className="text-amber-600" size={18} />
//               </div>
//               <div>
//                 <div className="font-medium">Lab Report</div>
//                 <div className="text-sm text-gray-600">
//                   Chemistry 201 • Prof. Williams
//                 </div>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="text-amber-600 font-medium">Tomorrow</div>
//               <div className="text-xs text-gray-500">5:00 PM</div>
//             </div>
//           </div>

//           <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
//             <div className="flex items-center gap-3">
//               <div className="bg-blue-100 p-2 rounded-md">
//                 <FileText className="text-blue-600" size={18} />
//               </div>
//               <div>
//                 <div className="font-medium">Statistics Problem Set</div>
//                 <div className="text-sm text-gray-600">
//                   STAT202 • Prof. Chen
//                 </div>
//               </div>
//             </div>
//             <div className="text-right">
//               <div className="text-blue-600 font-medium">May 8</div>
//               <div className="text-xs text-gray-500">11:59 PM</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Resources */}
//       <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">
//           Quick Links
//         </h3>
//         <div className="grid grid-cols-2 gap-3">
//           <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex flex-col items-center justify-center">
//             <BookOpen size={20} className="text-blue-700 mb-2" />
//             <span className="text-sm font-medium text-gray-800">Library</span>
//           </button>

//           <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors flex flex-col items-center justify-center">
//             <FileText size={20} className="text-green-700 mb-2" />
//             <span className="text-sm font-medium text-gray-800">
//               Course Materials
//             </span>
//           </button>

//           <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors flex flex-col items-center justify-center">
//             <Calendar size={20} className="text-purple-700 mb-2" />
//             <span className="text-sm font-medium text-gray-800">Calendar</span>
//           </button>

//           <button className="p-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors flex flex-col items-center justify-center">
//             <MessageSquare size={20} className="text-amber-700 mb-2" />
//             <span className="text-sm font-medium text-gray-800">Support</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
