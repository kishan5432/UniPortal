import React from "react";
import {
  BookOpen,
  CreditCard,
  FileText,
  MessageSquare,
  Calendar,
  BarChart3,
} from "lucide-react";
function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Quick Stats */}
      <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-500">CGPA</div>
              <div className="mt-1 text-2xl font-bold text-gray-800">8.75</div>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <BarChart3 className="text-green-600" size={20} />
            </div>
          </div>
          <div className="mt-2 text-xs text-green-600">
            ↑ 0.2 from last semester
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-500">Credits</div>
              <div className="mt-1 text-2xl font-bold text-gray-800">
                78/120
              </div>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <BookOpen className="text-blue-600" size={20} />
            </div>
          </div>
          <div className="mt-2 text-xs text-blue-600">65% complete</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-500">Due Today</div>
              <div className="mt-1 text-2xl font-bold text-gray-800">2</div>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <FileText className="text-amber-600" size={20} />
            </div>
          </div>
          <div className="mt-2 text-xs text-amber-600">
            Programming & Chemistry
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-500">Balance</div>
              <div className="mt-1 text-2xl font-bold text-gray-800">
                ₹11,250
              </div>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <CreditCard className="text-purple-600" size={20} />
            </div>
          </div>
          <div className="mt-2 text-xs text-purple-600">Due in 14 days</div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Today's Schedule
        </h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium w-16 text-center flex flex-col">
              <span>9:00</span>
              <span>10:30</span>
            </div>
            <div>
              <div className="font-medium">Computer Science 301</div>
              <div className="text-sm text-gray-500">
                Room 302B • Prof. Johnson
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium w-16 text-center flex flex-col">
              <span>11:00</span>
              <span>12:30</span>
            </div>
            <div>
              <div className="font-medium">Chemistry Lab</div>
              <div className="text-sm text-gray-500">
                Science Bldg • Room 105
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium w-16 text-center flex flex-col">
              <span>2:00</span>
              <span>3:30</span>
            </div>
            <div>
              <div className="font-medium">Statistics 202</div>
              <div className="text-sm text-gray-500">Math Bldg • Room 210</div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-medium w-16 text-center flex flex-col">
              <span>4:00</span>
              <span>5:00</span>
            </div>
            <div>
              <div className="font-medium">Study Group</div>
              <div className="text-sm text-gray-500">
                Library • Group Room 3
              </div>
            </div>
          </div>
        </div>
        <button className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
          View Full Schedule
        </button>
      </div>

      {/* Upcoming Assignments */}
      <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Upcoming Assignments
          </h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View All
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-red-50 border border-red-100 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-md">
                <FileText className="text-red-600" size={18} />
              </div>
              <div>
                <div className="font-medium">Programming Project</div>
                <div className="text-sm text-gray-600">
                  CS301 • Prof. Johnson
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-red-600 font-medium">Today</div>
              <div className="text-xs text-gray-500">11:59 PM</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-md">
                <FileText className="text-amber-600" size={18} />
              </div>
              <div>
                <div className="font-medium">Lab Report</div>
                <div className="text-sm text-gray-600">
                  Chemistry 201 • Prof. Williams
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-amber-600 font-medium">Tomorrow</div>
              <div className="text-xs text-gray-500">5:00 PM</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-md">
                <FileText className="text-blue-600" size={18} />
              </div>
              <div>
                <div className="font-medium">Statistics Problem Set</div>
                <div className="text-sm text-gray-600">
                  STAT202 • Prof. Chen
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-blue-600 font-medium">May 8</div>
              <div className="text-xs text-gray-500">11:59 PM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Links
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex flex-col items-center justify-center">
            <BookOpen size={20} className="text-blue-700 mb-2" />
            <span className="text-sm font-medium text-gray-800">Library</span>
          </button>

          <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors flex flex-col items-center justify-center">
            <FileText size={20} className="text-green-700 mb-2" />
            <span className="text-sm font-medium text-gray-800">
              Course Materials
            </span>
          </button>

          <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors flex flex-col items-center justify-center">
            <Calendar size={20} className="text-purple-700 mb-2" />
            <span className="text-sm font-medium text-gray-800">Calendar</span>
          </button>

          <button className="p-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors flex flex-col items-center justify-center">
            <MessageSquare size={20} className="text-amber-700 mb-2" />
            <span className="text-sm font-medium text-gray-800">Support</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
