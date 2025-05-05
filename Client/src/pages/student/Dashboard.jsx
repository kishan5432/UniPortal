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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   BookOpen,
//   CreditCard,
//   FileText,
//   MessageSquare,
//   Calendar,
//   BarChart3,
//   Loader,
// } from "lucide-react";

// function Dashboard() {
//   const [studentData, setStudentData] = useState(null);
//   const [academicRecord, setAcademicRecord] = useState(null);
//   const [assignments, setAssignments] = useState([]);
//   const [schedule, setSchedule] = useState([]);
//   const [feeData, setFeeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Get the current user's ID from local storage or context
//     const userId = localStorage.getItem("userId");

//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         // Fetch student data
//         const studentResponse = await axios.get(`/api/students/${userId}`);
//         setStudentData(studentResponse.data);

//         // Fetch academic record
//         const academicResponse = await axios.get(
//           `/api/students/${userId}/academics`
//         );
//         setAcademicRecord(academicResponse.data);

//         // Calculate completed credits
//         const completedCredits = academicResponse.data.academicRecord.reduce(
//           (total, semester) => total + semester.totalCredits,
//           0
//         );

//         // Fetch upcoming assignments
//         const today = new Date();
//         const assignmentsResponse = await axios.get(
//           `/api/students/${userId}/assignments`,
//           {
//             params: {
//               startDate: today.toISOString(),
//               limit: 3,
//             },
//           }
//         );
//         setAssignments(assignmentsResponse.data);

//         // Fetch today's schedule
//         const scheduleResponse = await axios.get(
//           `/api/students/${userId}/schedule`,
//           {
//             params: {
//               date: today.toISOString(),
//             },
//           }
//         );
//         setSchedule(scheduleResponse.data);

//         // Fetch fee information
//         const feeResponse = await axios.get(
//           `/api/students/${userId}/fees/current`
//         );
//         setFeeData(feeResponse.data);

//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError("Failed to load dashboard data. Please try again.");
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Calculate CGPA from academic record
//   const calculateCGPA = () => {
//     if (
//       !academicRecord ||
//       !academicRecord.academicRecord ||
//       academicRecord.academicRecord.length === 0
//     ) {
//       return "N/A";
//     }

//     // Get the GPA from the latest semester
//     const currentGPA =
//       academicRecord.academicRecord[academicRecord.academicRecord.length - 1]
//         .gpa;

//     // If there's only one semester, return the current GPA
//     if (academicRecord.academicRecord.length === 1) {
//       return currentGPA.toFixed(2);
//     }

//     // Get the GPA from the second-to-last semester for comparison
//     const previousGPA =
//       academicRecord.academicRecord[academicRecord.academicRecord.length - 2]
//         .gpa;

//     // Calculate the difference
//     const difference = (currentGPA - previousGPA).toFixed(1);

//     return {
//       current: currentGPA.toFixed(2),
//       difference: difference,
//       improved: difference >= 0,
//     };
//   };

//   // Calculate total credits completed and total required
//   const calculateCredits = () => {
//     if (!academicRecord || !academicRecord.academicRecord) {
//       return { completed: 0, total: 120 };
//     }

//     const completed = academicRecord.academicRecord.reduce(
//       (total, semester) => total + semester.totalCredits,
//       0
//     );

//     // Assuming total required credits is 120, but this could be fetched from program requirements
//     const total = 120;

//     return {
//       completed,
//       total,
//       percentage: Math.round((completed / total) * 100),
//     };
//   };

//   // Format due date relative to today
//   const formatDueDate = (dueDate) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const due = new Date(dueDate);
//     due.setHours(0, 0, 0, 0);

//     const diffTime = due - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays === 0) {
//       return "Today";
//     } else if (diffDays === 1) {
//       return "Tomorrow";
//     } else {
//       return new Date(dueDate).toLocaleDateString("en-US", {
//         month: "short",
//         day: "numeric",
//       });
//     }
//   };

//   // Format time for schedule display
//   const formatTime = (time) => {
//     const date = new Date(`2000-01-01T${time}`);
//     return date.toLocaleTimeString("en-US", {
//       hour: "numeric",
//       minute: "numeric",
//       hour12: true,
//     });
//   };

//   // Get assignments due today
//   const getDueToday = () => {
//     if (!assignments || assignments.length === 0) {
//       return 0;
//     }

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const dueTodayItems = assignments.filter((assignment) => {
//       const dueDate = new Date(assignment.assessment.dueDate);
//       dueDate.setHours(0, 0, 0, 0);
//       return dueDate.getTime() === today.getTime();
//     });

//     return {
//       count: dueTodayItems.length,
//       subjects: dueTodayItems
//         .map((item) => item.assessment.courseOffering.course.name)
//         .join(" & "),
//     };
//   };

//   // Get fee balance information
//   const getFeeInfo = () => {
//     if (!feeData) {
//       return { balance: 0, dueIn: 0 };
//     }

//     const balance = feeData.dueAmount;

//     // Calculate days until due date
//     const today = new Date();
//     const dueDate = new Date(feeData.dueDate);
//     const diffTime = dueDate - today;
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     return { balance, dueIn: diffDays };
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-full">
//         <Loader className="animate-spin mr-2" size={24} />
//         <p>Loading dashboard...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
//         <p>{error}</p>
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 font-medium py-1 px-3 rounded-md text-sm"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   const cgpa = calculateCGPA();
//   const credits = calculateCredits();
//   const dueToday = getDueToday();
//   const fee = getFeeInfo();

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {/* Quick Stats */}
//       <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-sm font-medium text-gray-500">CGPA</div>
//               <div className="mt-1 text-2xl font-bold text-gray-800">
//                 {typeof cgpa === "object" ? cgpa.current : cgpa}
//               </div>
//             </div>
//             <div className="bg-green-100 p-3 rounded-full">
//               <BarChart3 className="text-green-600" size={20} />
//             </div>
//           </div>
//           {typeof cgpa === "object" && cgpa.difference !== 0 && (
//             <div
//               className={`mt-2 text-xs ${
//                 cgpa.improved ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {cgpa.improved ? "↑" : "↓"} {Math.abs(cgpa.difference)} from last
//               semester
//             </div>
//           )}
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-sm font-medium text-gray-500">Credits</div>
//               <div className="mt-1 text-2xl font-bold text-gray-800">
//                 {credits.completed}/{credits.total}
//               </div>
//             </div>
//             <div className="bg-blue-100 p-3 rounded-full">
//               <BookOpen className="text-blue-600" size={20} />
//             </div>
//           </div>
//           <div className="mt-2 text-xs text-blue-600">
//             {credits.percentage}% complete
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-sm font-medium text-gray-500">Due Today</div>
//               <div className="mt-1 text-2xl font-bold text-gray-800">
//                 {dueToday.count}
//               </div>
//             </div>
//             <div className="bg-amber-100 p-3 rounded-full">
//               <FileText className="text-amber-600" size={20} />
//             </div>
//           </div>
//           <div className="mt-2 text-xs text-amber-600">
//             {dueToday.count > 0 ? dueToday.subjects : "Nothing due today"}
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-sm font-medium text-gray-500">Balance</div>
//               <div className="mt-1 text-2xl font-bold text-gray-800">
//                 ₹{fee.balance.toLocaleString()}
//               </div>
//             </div>
//             <div className="bg-purple-100 p-3 rounded-full">
//               <CreditCard className="text-purple-600" size={20} />
//             </div>
//           </div>
//           <div className="mt-2 text-xs text-purple-600">
//             {fee.dueIn > 0 ? `Due in ${fee.dueIn} days` : "Overdue"}
//           </div>
//         </div>
//       </div>

//       {/* Today's Schedule */}
//       <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">
//           Today's Schedule
//         </h3>
//         <div className="space-y-4">
//           {schedule.length > 0 ? (
//             schedule.map((item, index) => (
//               <div className="flex gap-3" key={index}>
//                 <div
//                   className={`bg-${item.color || "blue"}-100 text-${
//                     item.color || "blue"
//                   }-800 px-2 py-1 rounded text-xs font-medium w-16 text-center flex flex-col`}
//                 >
//                   <span>{formatTime(item.startTime)}</span>
//                   <span>{formatTime(item.endTime)}</span>
//                 </div>
//                 <div>
//                   <div className="font-medium">
//                     {item.courseOffering.course.name}
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {item.room} • {item.courseOffering.faculty.firstName}{" "}
//                     {item.courseOffering.faculty.lastName}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-6 text-gray-500">
//               <p>No classes scheduled for today</p>
//             </div>
//           )}
//         </div>
//         <button
//           onClick={() => (window.location.href = "/schedule")}
//           className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
//         >
//           View Full Schedule
//         </button>
//       </div>

//       {/* Upcoming Assignments */}
//       <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="text-lg font-semibold text-gray-800">
//             Upcoming Assignments
//           </h3>
//           <button
//             onClick={() => (window.location.href = "/assignments")}
//             className="text-sm text-blue-600 hover:text-blue-800"
//           >
//             View All
//           </button>
//         </div>
//         <div className="space-y-3">
//           {assignments.length > 0 ? (
//             assignments.map((assignment, index) => {
//               const dueDate = formatDueDate(assignment.assessment.dueDate);
//               const dueTime = new Date(
//                 assignment.assessment.dueDate
//               ).toLocaleTimeString("en-US", {
//                 hour: "numeric",
//                 minute: "numeric",
//                 hour12: true,
//               });
//               const isUrgent = dueDate === "Today";

//               return (
//                 <div
//                   key={index}
//                   className={`flex items-center justify-between p-3 ${
//                     isUrgent
//                       ? "bg-red-50 border border-red-100"
//                       : "bg-white border border-gray-200"
//                   } rounded-lg`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <div
//                       className={`bg-${
//                         isUrgent
//                           ? "red"
//                           : dueDate === "Tomorrow"
//                           ? "amber"
//                           : "blue"
//                       }-100 p-2 rounded-md`}
//                     >
//                       <FileText
//                         className={`text-${
//                           isUrgent
//                             ? "red"
//                             : dueDate === "Tomorrow"
//                             ? "amber"
//                             : "blue"
//                         }-600`}
//                         size={18}
//                       />
//                     </div>
//                     <div>
//                       <div className="font-medium">
//                         {assignment.assessment.title}
//                       </div>
//                       <div className="text-sm text-gray-600">
//                         {assignment.assessment.courseOffering.course.code} •
//                         Prof.{" "}
//                         {assignment.assessment.courseOffering.faculty.lastName}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div
//                       className={`${
//                         isUrgent
//                           ? "text-red-600"
//                           : dueDate === "Tomorrow"
//                           ? "text-amber-600"
//                           : "text-blue-600"
//                       } font-medium`}
//                     >
//                       {dueDate}
//                     </div>
//                     <div className="text-xs text-gray-500">{dueTime}</div>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center py-6 text-gray-500">
//               <p>No upcoming assignments</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Resources */}
//       <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">
//           Quick Links
//         </h3>
//         <div className="grid grid-cols-2 gap-3">
//           <button
//             onClick={() => (window.location.href = "/library")}
//             className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex flex-col items-center justify-center"
//           >
//             <BookOpen size={20} className="text-blue-700 mb-2" />
//             <span className="text-sm font-medium text-gray-800">Library</span>
//           </button>

//           <button
//             onClick={() => (window.location.href = "/courses")}
//             className="p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors flex flex-col items-center justify-center"
//           >
//             <FileText size={20} className="text-green-700 mb-2" />
//             <span className="text-sm font-medium text-gray-800">
//               Course Materials
//             </span>
//           </button>

//           <button
//             onClick={() => (window.location.href = "/calendar")}
//             className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors flex flex-col items-center justify-center"
//           >
//             <Calendar size={20} className="text-purple-700 mb-2" />
//             <span className="text-sm font-medium text-gray-800">Calendar</span>
//           </button>

//           <button
//             onClick={() => (window.location.href = "/support")}
//             className="p-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors flex flex-col items-center justify-center"
//           >
//             <MessageSquare size={20} className="text-amber-700 mb-2" />
//             <span className="text-sm font-medium text-gray-800">Support</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
