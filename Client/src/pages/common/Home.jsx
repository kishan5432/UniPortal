import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
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

// Sample upcoming events data
const upcomingEvents = [
  {
    id: 1,
    title: "Fall Semester Registration",
    date: "August 15, 2025",
    category: "Academic",
  },
  {
    id: 2,
    title: "Career Fair 2025",
    date: "September 10, 2025",
    category: "Placement",
  },
  {
    id: 3,
    title: "University Founder's Day",
    date: "September 24, 2025",
    category: "Event",
  },
  {
    id: 4,
    title: "Research Symposium",
    date: "October 5, 2025",
    category: "Academic",
  },
];

// Sample announcements
const announcements = [
  {
    id: 1,
    title: "Updated Course Catalog for Fall 2025",
    date: "May 1, 2025",
    category: "Academic",
  },
  {
    id: 2,
    title: "New Library Resources Available",
    date: "April 28, 2025",
    category: "Library",
  },
  {
    id: 3,
    title: "Scholarship Applications Now Open",
    date: "April 25, 2025",
    category: "Finance",
  },
];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real application, you would handle authentication here
    console.log(`Logging in as ${userType} with username: ${username}`);
    setIsLoginDialogOpen(false);
  };

  const menuItems = [
    { name: "Academics", icon: <BookOpen size={20} /> },
    { name: "Students", icon: <Users size={20} /> },
    { name: "Faculty", icon: <GraduationCap size={20} /> },
    { name: "Finance", icon: <DollarSign size={20} /> },
    { name: "Placement", icon: <Briefcase size={20} /> },
    { name: "Library", icon: <BookOpen size={20} /> },
  ];

  const quickLinks = [
    { name: "Course Registration", icon: <GraduationCap size={20} /> },
    { name: "Fee Payment", icon: <DollarSign size={20} /> },
    { name: "Library Services", icon: <BookOpen size={20} /> },
    { name: "Career Portal", icon: <Briefcase size={20} /> },
    { name: "Academic Calendar", icon: <Calendar size={20} /> },
    { name: "Student Services", icon: <Users size={20} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            {/* Logo */}
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="#" className="flex items-center">
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
                onClick={() => navigate("/login")}
                className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <UserCircle className="mr-2 h-5 w-5" />
                Login
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-800 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Your Gateway to University Resources
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              One portal for students, faculty, and staff to access all
              university services.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition duration-300"
              >
                Login
              </button>
              <a
                href="#explore"
                className="px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-indigo-600 transition duration-300"
              >
                Explore
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="p-5 bg-gray-50 border-b">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <GradCap className="h-6 w-6 text-indigo-600" />
                    <span className="ml-2 font-semibold text-gray-700">
                      UniPortal
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="space-y-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-5 bg-gray-200 rounded"></div>
                  <div className="h-5 bg-gray-200 rounded w-5/6"></div>
                  <div className="flex space-x-2">
                    <div className="h-10 w-10 bg-indigo-100 rounded"></div>
                    <div className="h-10 w-10 bg-purple-100 rounded"></div>
                    <div className="h-10 w-10 bg-blue-100 rounded"></div>
                  </div>
                  <div className="h-5 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section id="explore" className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Quick Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href="#"
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center"
              >
                <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-indigo-100 text-indigo-600">
                  {link.icon}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    {link.name}
                  </h3>
                  <p className="text-sm text-gray-500">Access quickly</p>
                </div>
                <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements and Events */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Announcements */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Announcements
                </h2>
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  View all
                </a>
              </div>
              <div className="space-y-4">
                {announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {announcement.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {announcement.date}
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                        {announcement.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Events */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Upcoming Events
                </h2>
                <a
                  href="#"
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  View all
                </a>
              </div>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {event.date}
                        </p>
                      </div>
                      <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                        {event.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Use UniPortal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 flex items-center justify-center rounded-md bg-indigo-100 text-indigo-600 mb-5">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Academic Excellence
              </h3>
              <p className="text-gray-500">
                Access course materials, grades, assignments, and academic
                resources all in one place.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 flex items-center justify-center rounded-md bg-indigo-100 text-indigo-600 mb-5">
                <Briefcase size={24} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Career Development
              </h3>
              <p className="text-gray-500">
                Connect with employers, access job postings, and prepare for
                your future career.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 flex items-center justify-center rounded-md bg-indigo-100 text-indigo-600 mb-5">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Library Resources
              </h3>
              <p className="text-gray-500">
                Access digital resources, reserve books, and utilize research
                tools for your studies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <GradCap className="h-6 w-6 text-indigo-400" />
                <span className="ml-2 text-xl font-bold">UniPortal</span>
              </div>
              <p className="text-gray-400">
                Your complete university resource platform, designed to enhance
                academic success and campus life.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Help & Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Library
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Academic Calendar
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Campus Map
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Events
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Connect With Us</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <div className="h-6 w-6 bg-gray-700 rounded-full flex items-center justify-center">
                    f
                  </div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <div className="h-6 w-6 bg-gray-700 rounded-full flex items-center justify-center">
                    t
                  </div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <div className="h-6 w-6 bg-gray-700 rounded-full flex items-center justify-center">
                    i
                  </div>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <div className="h-6 w-6 bg-gray-700 rounded-full flex items-center justify-center">
                    in
                  </div>
                </a>
              </div>
              <p className="text-gray-400">
                Email: info@uniportal.edu
                <br />
                Phone: (123) 456-7890
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; 2025 UniPortal. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white mr-4">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Dialog
      <Dialog open={isLoginDialogOpen} onOpenChange={setIsLoginDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              Log in to UniPortal
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleLogin} className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  userType === "student"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setUserType("student")}
              >
                Student
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  userType === "faculty"
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setUserType("faculty")}
              >
                Faculty
              </button>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>

            <DialogFooter className="sm:justify-between">
              <div>
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Need help?
                </a>
              </div>
              <Button type="submit">Log in</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
