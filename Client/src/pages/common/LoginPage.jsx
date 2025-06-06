import React, { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  BookOpen,
  Users,
  GraduationCap,
  DollarSign,
  Briefcase,
  Bell,
  Calendar,
  Menu,
  X,
  ChevronRight,
  Search,
  UserCircle,
  GraduationCap as GradCap,
} from "lucide-react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the page the user was trying to access
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const user = await login({ username, password });

      // Redirect based on user role
      const roleRedirectMap = {
        admin: "/admin/dashboard",
        faculty: "/faculty/dashboard",
        student: "/student/dashboard",
        library: "/library/dashboard",
        tnp: "/tnp/dashboard",
        finance: "/finance/dashboard",
      };

      const redirectPath = roleRedirectMap[user.role] || "/";
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const menuItems = [
    { name: "Academics", icon: <BookOpen size={20} /> },
    { name: "Students", icon: <Users size={20} /> },
    { name: "Faculty", icon: <GraduationCap size={20} /> },
    { name: "Finance", icon: <DollarSign size={20} /> },
    { name: "Placement", icon: <Briefcase size={20} /> },
    { name: "Library", icon: <BookOpen size={20} /> },
  ];

  return (
    <div className="min-h-screen ">
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-gray-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            {/* Logo */}
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="/" className="flex items-center">
                <GradCap className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">
                  UniPortal
                </span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop menu */}
            <nav className="hidden md:flex space-x-10">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className="text-base font-medium text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Search and login button */}
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0 space-x-4">
              <button
                onClick={() => navigate("/")}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <UserCircle className="mr-2 h-5 w-5" />
                Home
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 flex items-center"
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </a>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <UserCircle className="h-10 w-10 text-gray-400" />
                </div>
                <button
                  onClick={() => navigate("/login")}
                  className="ml-auto flex-shrink-0 bg-indigo-600 p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Left side with illustration (hidden on small screens) */}
      <div className="flex flex-col md:flex-row bg-gray-50">
        <div className="hidden md:flex md:w-1/2 bg-indigo-600 text-white p-8 items-center justify-center">
          <div className="max-w-md flex flex-col items-center">
            <svg className="w-64 h-64 mb-6" viewBox="0 0 600 600">
              <circle cx="300" cy="300" r="280" fill="#4338ca" />
              <circle cx="300" cy="300" r="230" fill="#4f46e5" />
              <circle cx="300" cy="300" r="180" fill="#6366f1" />
              <circle cx="300" cy="300" r="130" fill="#818cf8" />
              <circle cx="300" cy="180" r="40" fill="#e0e7ff" />
              <circle cx="180" cy="300" r="40" fill="#e0e7ff" />
              <circle cx="420" cy="300" r="40" fill="#e0e7ff" />
              <circle cx="300" cy="420" r="40" fill="#e0e7ff" />
              <path
                d="M300,240 L300,360 M240,300 L360,300"
                stroke="#e0e7ff"
                strokeWidth="15"
                strokeLinecap="round"
              />
            </svg>
            <h1 className="text-3xl font-bold mb-4">UniPortal</h1>
            <p className="text-lg text-center text-indigo-100">
              Access all your academic resources, schedules, and services in one
              place. Streamline your campus experience with our integrated
              platform.
            </p>
          </div>
        </div>

        {/* Right side with form */}
        <div className="flex-1 flex items-center justify-center p-6 bg-gray-100">
          <div className="w-full max-w-md">
            {/* Mobile header (visible only on small screens) */}
            <div className="md:hidden flex flex-col items-center mb-8">
              <div className="bg-indigo-600 rounded-full p-4 mb-4">
                <svg className="w-16 h-16 text-white" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="#4f46e5" />
                  <path
                    d="M35,50 L65,50 M50,35 L50,65"
                    stroke="white"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">UniPortal</h1>
            </div>

            <div className="bg-white px-8 py-10 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 hidden md:block">
                Welcome Back
              </h2>
              <p className="text-gray-600 mb-8 hidden md:block">
                Please sign in to access your account
              </p>

              {errorMessage && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 flex items-center">
                  <span className="mr-2">⚠️</span>
                  {errorMessage}
                </div>
              )}

              <div>
                <div className="mb-6">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="username"
                      className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="pl-10 block w-full rounded-lg border border-gray-300 py-3 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={18} className="text-gray-400" />
                      ) : (
                        <Eye size={18} className="text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
                    isLoading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
                    Contact admin
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>© 2025 UniPortal. All rights reserved.</p>
            </div>
          </div>
          <div> </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
