// import { useState } from "react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { Bell, User, Search, Settings, Menu, BookOpen, GraduationCap, MessageSquare, BookText, UserCircle } from "lucide-react";

// // Import tab components
// // In a real project, these would be imported from separate files
// const CourseManagement = () => import("../pages/faculty/CourseManagement");
// const StudentAssessment = () => import("../pages/faculty/StudentAssessment");
// const Communication = () => import("../pages/faculty/Communication");
// const Research = () => import("../pages/faculty/ResearchPublications");
// const PersonalProfile = () => import("../pages/faculty/PersonalProfile");

// export default function FacultyLayout() {
//   const [activeTab, setActiveTab] = useState("courses");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Mock user data
//   const faculty = {
//     name: "Dr. Sarah Johnson",
//     role: "Associate Professor",
//     department: "Computer Science",
//     image: "/api/placeholder/150/150"
//   };

//   // Mock notifications
//   const notifications = [
//     { id: 1, text: "Grade submission deadline tomorrow", type: "deadline" },
//     { id: 2, text: "Faculty meeting at 3:00 PM", type: "meeting" },
//     { id: 3, text: "New research grant opportunity", type: "research" }
//   ];

//   return (
//     <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Sidebar */}
//       <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col`}>
//         {/* Logo */}
//         <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
//           {sidebarOpen && (
//             <div className="flex items-center space-x-2">
//               <BookOpen className="h-8 w-8 text-blue-600" />
//               <span className="text-lg font-bold text-gray-800 dark:text-white">Faculty Portal</span>
//             </div>
//           )}
//           {!sidebarOpen && <BookOpen className="h-8 w-8 mx-auto text-blue-600" />}
//           <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
//             <Menu className="h-5 w-5 text-gray-500 dark:text-gray-300" />
//           </button>
//         </div>

//         {/* Faculty info */}
//         <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//           <div className="flex items-center space-x-3">
//             <img src={faculty.image} alt="Profile" className="h-10 w-10 rounded-full" />
//             {sidebarOpen && (
//               <div className="flex flex-col">
//                 <span className="text-sm text-gray-500 dark:text-gray-400">CS101 - Introduction to Programming</p>
//                       </div>
//                       <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
//                         <Settings className="h-4 w-4 text-gray-500 dark:text-gray-400" />
//                       </button>
//                     </div>
//                   </div>
                  
//                   <div className="flex-1 overflow-y-auto p-4 space-y-4 h-80">
//                     {[
//                       { id: 1, sender: "student", message: "Hi Professor, I'm having trouble with the recursion homework problem. Could you provide some guidance?", time: "10:25 AM" },
//                       { id: 2, sender: "faculty", message: "Hello Alex, certainly! Which aspect of recursion are you struggling with?", time: "10:28 AM" },
//                       { id: 3, sender: "student", message: "I'm having trouble understanding how to set up the base case for the Fibonacci sequence problem.", time: "10:30 AM" },
//                       { id: 4, sender: "faculty", message: "For the Fibonacci sequence, you need two base cases: fib(0) = 0 and fib(1) = 1. Then your recursive case can be fib(n) = fib(n-1) + fib(n-2). Does that help clarify?", time: "10:32 AM" },
//                       { id: 5, sender: "student", message: "That makes sense! But I'm confused about the time complexity. How do I analyze that?", time: "10:35 AM" }
//                     ].map(msg => (
//                       <div 
//                         key={msg.id} 
//                         className={`flex ${msg.sender === "faculty" ? "justify-end" : "justify-start"}`}
//                       >
//                         <div 
//                           className={`max-w-md p-4 rounded-lg ${
//                             msg.sender === "faculty" 
//                               ? "bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100" 
//                               : "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
//                           }`}
//                         >
//                           <p className="text-sm">{msg.message}</p>
//                           <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">{msg.time}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
                  
//                   <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//                     <div className="flex space-x-2">
//                       <input
//                         type="text"
//                         placeholder="Type your message..."
//                         className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                       <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
//                         Send
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>
            
//             <TabsContent value="research" className="mt-0">
//               {/* Placeholder for Research */}
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Active Research Projects</h3>
//                     <div className="space-y-4">
//                       {[
//                         { id: 1, title: "AI in Education", status: "In Progress", collaborators: 3, progress: 65 },
//                         { id: 2, title: "Quantum Computing Applications", status: "Early Stage", collaborators: 4, progress: 25 },
//                         { id: 3, title: "Blockchain Security", status: "Final Review", collaborators: 2, progress: 90 }
//                       ].map(project => (
//                         <div key={project.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
//                           <div className="flex justify-between mb-2">
//                             <h4 className="font-medium text-gray-800 dark:text-white">{project.title}</h4>
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               project.status === "In Progress" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300" :
//                               project.status === "Early Stage" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300" :
//                               "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
//                             }`}>{project.status}</span>
//                           </div>
//                           <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{project.collaborators} Collaborators</p>
//                           <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
//                             <div 
//                               className={`h-2 rounded-full ${
//                                 project.progress > 75 ? "bg-green-500" :
//                                 project.progress > 50 ? "bg-blue-500" :
//                                 project.progress > 25 ? "bg-yellow-500" : "bg-orange-500"
//                               }`}
//                               style={{ width: `${project.progress}%` }}
//                             ></div>
//                           </div>
//                           <p className="mt-1 text-xs text-right text-gray-500 dark:text-gray-400">{project.progress}% Complete</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Recent Publications</h3>
//                     <div className="space-y-4">
//                       {[
//                         { id: 1, title: "Machine Learning Approaches to Education Analytics", journal: "Journal of Educational Technology", date: "April 2025", citations: 12 },
//                         { id: 2, title: "Security Challenges in Blockchain Implementation", journal: "Cybersecurity Review", date: "February 2025", citations: 8 },
//                         { id: 3, title: "A Survey of Quantum Computing Applications in Data Science", journal: "Quantum Computing Journal", date: "December 2024", citations: 15 }
//                       ].map(publication => (
//                         <div key={publication.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
//                           <h4 className="font-medium text-gray-800 dark:text-white">{publication.title}</h4>
//                           <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{publication.journal}</p>
//                           <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
//                             <span>{publication.date}</span>
//                             <span>{publication.citations} Citations</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Grant Opportunities</h3>
//                     <div className="space-y-4">
//                       {[
//                         { id: 1, title: "National Science Foundation - AI Innovation", amount: "$250,000", deadline: "June 15, 2025", type: "Federal" },
//                         { id: 2, title: "Tech Innovation Research Fund", amount: "$100,000", deadline: "July 1, 2025", type: "Industry" },
//                         { id: 3, title: "Educational Technology Development Grant", amount: "$75,000", deadline: "August 20, 2025", type: "University" }
//                       ].map(grant => (
//                         <div key={grant.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
//                           <div className="flex justify-between mb-1">
//                             <h4 className="font-medium text-gray-800 dark:text-white">{grant.title}</h4>
//                             <span className={`text-xs px-2 py-1 rounded-full ${
//                               grant.type === "Federal" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300" :
//                               grant.type === "Industry" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300" :
//                               "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
//                             }`}>{grant.type}</span>
//                           </div>
//                           <p className="text-sm text-gray-600 dark:text-gray-300">{grant.amount}</p>
//                           <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Deadline: {grant.deadline}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Research Calendar</h3>
//                     <div className="space-y-4">
//                       {[
//                         { id: 1, title: "Research Team Meeting", date: "May 12, 2025", time: "10:00 AM - 11:30 AM", location: "Virtual" },
//                         { id: 2, title: "Conference Presentation Prep", date: "May 14, 2025", time: "2:00 PM - 4:00 PM", location: "Lab 5" },
//                         { id: 3, title: "Grant Proposal Review", date: "May 16, 2025", time: "1:00 PM - 3:00 PM", location: "Conference Room B" },
//                         { id: 4, title: "Annual Computer Science Research Symposium", date: "May 20, 2025", time: "9:00 AM - 5:00 PM", location: "University Hall" }
//                       ].map(event => (
//                         <div key={event.id} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
//                           <div className="bg-blue-100 dark:bg-blue-900/40 rounded-md p-3 text-blue-800 dark:text-blue-300 text-center mr-4">
//                             <div className="text-sm font-medium">{event.date.split(',')[0]}</div>
//                             <div className="text-lg font-bold">{event.date.split(', ')[1].split(' ')[0]}</div>
//                           </div>
//                           <div className="flex-1">
//                             <h4 className="font-medium text-gray-800 dark:text-white">{event.title}</h4>
//                             <p className="text-sm text-gray-600 dark:text-gray-300">{event.time}</p>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">{event.location}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Research Metrics</h3>
//                     <div className="grid grid-cols-2 gap-4 mb-6">
//                       <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md text-center">
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Total Publications</p>
//                         <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">42</p>
//                       </div>
//                       <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md text-center">
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Total Citations</p>
//                         <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">351</p>
//                       </div>
//                       <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md text-center">
//                         <p className="text-sm text-gray-500 dark:text-gray-400">H-Index</p>
//                         <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">18</p>
//                       </div>
//                       <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-md text-center">
//                         <p className="text-sm text-gray-500 dark:text-gray-400">Active Grants</p>
//                         <p className="text-2xl font-bold text-gray-800 dark:text-white mt-1">3</p>
//                       </div>
//                     </div>
                    
//                     <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Citations by Year</h4>
//                     <div className="h-48 flex items-end justify-between space-x-2">
//                       {[35, 42, 60, 75, 84, 95].map((count, i) => (
//                         <div key={i} className="flex flex-col items-center">
//                           <div 
//                             className="w-10 bg-blue-500 dark:bg-blue-600 rounded-t-sm" 
//                             style={{ height: `${count * 0.4}%` }}
//                           ></div>
//                           <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{2020 + i}</div>
//                           <div className="text-xs text-gray-500 dark:text-gray-400">{count}</div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>
            
//             <TabsContent value="profile" className="mt-0">
//               {/* Placeholder for Personal Profile */}
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//                 <div className="md:col-span-1">
//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                     <div className="flex flex-col items-center">
//                       <img src={faculty.image} alt="Profile" className="h-32 w-32 rounded-full mb-4" />
//                       <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{faculty.name}</h3>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">{faculty.role}</p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400">{faculty.department}</p>
                      
//                       <div className="mt-6 w-full">
//                         <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-2">
//                           Edit Profile
//                         </button>
//                         <button className="w-full px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
//                           Change Photo
//                         </button>
//                       </div>
//                     </div>
                    
//                     <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
//                       <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">Contact</h4>
//                       <ul className="space-y-3">
//                         <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
//                           <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                           </svg>
//                           s.johnson@university.edu
//                         </li>
//                         <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
//                           <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                           </svg>
//                           (555) 123-4567
//                         </li>
//                         <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
//                           <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                           Science Building, Room 405
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="md:col-span-3 space-y-6">
//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Personal Information</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
//                         <input 
//                           type="text" 
//                           value="Dr. Sarah Johnson"
//                           readOnly
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
//                         <input 
//                           type="email" 
//                           value="s.johnson@university.edu"
//                           readOnly
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
//                         <input 
//                           type="text" 
//                           value="(555) 123-4567"
//                           readOnly
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
//                         <input 
//                           type="text" 
//                           value="Computer Science"
//                           readOnly
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Office Location</label>
//                         <input 
//                           type="text" 
//                           value="Science Building, Room 405"
//                           readOnly
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Faculty ID</label>
//                         <input 
//                           type="text" 
//                           value="F-2021-0342"
//                           readOnly
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Academic Information</h3>
//                     <div className="space-y-6">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
//                         <textarea 
//                           readOnly
//                           className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
//                         >Dr. Sarah Johnson is an Associate Professor in the Computer Science department, specializing in artificial intelligence and machine learning. With over 10 years of teaching experience and numerous publications in top-tier journals, she leads cutting-edge research in educational technology applications.</textarea>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Research Interests</label>
//                         <div className="flex flex-wrap gap-2">
//                           {["Artificial Intelligence", "Machine Learning", "Educational Technology", "Data Science", "Quantum Computing"].map((topic, i) => (
//                             <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 rounded-full text-sm">
//                               {topic}
//                             </span>
//                           ))}
//                         </div>
//                       </div>
                      
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Education</label>
//                         <div className="space-y-4">
//                           {[
//                             { degree: "Ph.D. in Computer Science", institution: "Stanford University", year: "2015" },
//                             { degree: "M.S. in Computer Science", institution: "MIT", year: "2012" },
//                             { degree: "B.S. in Computer Engineering", institution: "University of Michigan", year: "2010" }
//                           ].map((edu, i) => (
//                             <div key={i} className="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
//                               <div>
//                                 <p className="font-medium text-gray-800 dark:text-white">{edu.degree}</p>
//                                 <p className="text-sm text-gray-600 dark:text-gray-300">{edu.institution}</p>
//                               </div>
//                               <p className="text-sm text-gray-500 dark:text-gray-400">{edu.year}</p>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Settings</h3>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-gray-800 dark:text-white">Email Notifications</p>
//                           <p className="text-sm text-gray-500 dark:text-gray-400">Receive email notifications for messages and updates</p>
//                         </div>
//                         <div className="h-6 w-11 bg-blue-600 rounded-full p-1 flex items-center">
//                           <div className="h-4 w-4 bg-white rounded-full transform translate-x-5"></div>
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-gray-800 dark:text-white">Dark Mode</p>
//                           <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
//                         </div>
//                         <div className="h-6 w-11 bg-gray-300 dark:bg-blue-600 rounded-full p-1 flex items-center">
//                           <div className="h-4 w-4 bg-white rounded-full transform dark:translate-x-5"></div>
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-gray-800 dark:text-white">Calendar Integration</p>
//                           <p className="text-sm text-gray-500 dark:text-gray-400">Sync events with your calendar application</p>
//                         </div>
//                         <div className="h-6 w-11 bg-blue-600 rounded-full p-1 flex items-center">
//                           <div className="h-4 w-4 bg-white rounded-full transform translate-x-5"></div>
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-gray-800 dark:text-white">Two-Factor Authentication</p>
//                           <p className="text-sm text- font-semibold text-gray-700 dark:text-gray-200">{faculty.name}</span>
//                 <span className="text-xs text-gray-500 dark:text-gray-400">{faculty.department}</span>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 p-4 space-y-2">
//           <TabsList className="flex flex-col space-y-1 w-full bg-transparent">
//             <TabsTrigger 
//               value="courses" 
//               onClick={() => setActiveTab("courses")}
//               className={`flex items-center space-x-3 p-3 rounded-md ${activeTab === "courses" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"} ${!sidebarOpen && "justify-center"}`}
//             >
//               <BookOpen className="h-5 w-5" />
//               {sidebarOpen && <span>Course Management</span>}
//             </TabsTrigger>
            
//             <TabsTrigger 
//               value="assessments" 
//               onClick={() => setActiveTab("assessments")}
//               className={`flex items-center space-x-3 p-3 rounded-md ${activeTab === "assessments" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"} ${!sidebarOpen && "justify-center"}`}
//             >
//               <GraduationCap className="h-5 w-5" />
//               {sidebarOpen && <span>Student Assessment</span>}
//             </TabsTrigger>
            
//             <TabsTrigger 
//               value="communication" 
//               onClick={() => setActiveTab("communication")}
//               className={`flex items-center space-x-3 p-3 rounded-md ${activeTab === "communication" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"} ${!sidebarOpen && "justify-center"}`}
//             >
//               <MessageSquare className="h-5 w-5" />
//               {sidebarOpen && <span>Communication</span>}
//             </TabsTrigger>
            
//             <TabsTrigger 
//               value="research" 
//               onClick={() => setActiveTab("research")}
//               className={`flex items-center space-x-3 p-3 rounded-md ${activeTab === "research" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"} ${!sidebarOpen && "justify-center"}`}
//             >
//               <BookText className="h-5 w-5" />
//               {sidebarOpen && <span>Research</span>}
//             </TabsTrigger>
            
//             <TabsTrigger 
//               value="profile" 
//               onClick={() => setActiveTab("profile")}
//               className={`flex items-center space-x-3 p-3 rounded-md ${activeTab === "profile" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"} ${!sidebarOpen && "justify-center"}`}
//             >
//               <UserCircle className="h-5 w-5" />
//               {sidebarOpen && <span>Personal Profile</span>}
//             </TabsTrigger>
//           </TabsList>
//         </nav>

//         {/* Settings at bottom */}
//         <div className="p-4 border-t border-gray-200 dark:border-gray-700">
//           <button className={`flex items-center ${sidebarOpen ? "space-x-3" : "justify-center"} p-3 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 w-full`}>
//             <Settings className="h-5 w-5" />
//             {sidebarOpen && <span>Settings</span>}
//           </button>
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
//           <div className="px-4 py-3 flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{
//                 activeTab === "courses" ? "Course Management" : 
//                 activeTab === "assessments" ? "Student Assessment" :
//                 activeTab === "communication" ? "Communication" :
//                 activeTab === "research" ? "Research" : "Personal Profile"
//               }</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               {/* Search */}
//               <div className="relative hidden md:block">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>
              
//               {/* Notifications */}
//               <div className="relative">
//                 <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 relative">
//                   <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
//                   <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
//                 </button>
//               </div>
              
//               {/* Profile */}
//               <button className="flex items-center space-x-2">
//                 <img src={faculty.image} alt="Profile" className="h-8 w-8 rounded-full" />
//                 <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-200">{faculty.name}</span>
//               </button>
//             </div>
//           </div>
//         </header>

//         {/* Tab content */}
//         <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
//           <Tabs defaultValue={activeTab} value={activeTab} className="w-full">
//             <TabsContent value="courses" className="mt-0">
//               {/* Placeholder for Course Management */}
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Active Courses</h3>
//                     <div className="space-y-4">
//                       {[
//                         { id: 1, code: "CS101", name: "Introduction to Programming", students: 45 },
//                         { id: 2, code: "CS301", name: "Database Systems", students: 32 },
//                         { id: 3, code: "CS401", name: "Advanced Algorithms", students: 28 }
//                       ].map(course => (
//                         <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
//                           <div>
//                             <p className="font-medium text-gray-800 dark:text-white">{course.code}</p>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">{course.name}</p>
//                           </div>
//                           <div className="text-right">
//                             <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{course.students} students</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Upcoming Sessions</h3>
//                     <div className="space-y-4">
//                       {[
//                         { id: 1, course: "CS101", time: "10:00 AM", room: "Hall A", topic: "Arrays & Loops" },
//                         { id: 2, course: "CS301", time: "1:30 PM", room: "Lab 3", topic: "SQL Joins" },
//                         { id: 3, course: "CS401", time: "3:00 PM", room: "Hall B", topic: "Graph Algorithms" }
//                       ].map(session => (
//                         <div key={session.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
//                           <div className="flex justify-between mb-1">
//                             <p className="font-medium text-gray-800 dark:text-white">{session.course}</p>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">{session.time}</p>
//                           </div>
//                           <p className="text-sm text-gray-600 dark:text-gray-300">{session.topic} • {session.room}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Course Materials</h3>
//                     <div className="space-y-4">
//                       {[
//                         { id: 1, course: "CS101", type: "Lecture Slides", name: "Introduction to Variables" },
//                         { id: 2, course: "CS301", type: "Assignment", name: "Database Design Project" },
//                         { id: 3, course: "CS401", type: "Lab Work", name: "Implementing Dijkstra's Algorithm" }
//                       ].map(material => (
//                         <div key={material.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
//                           <div className="flex-1">
//                             <p className="font-medium text-gray-800 dark:text-white">{material.name}</p>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">{material.course} • {material.type}</p>
//                           </div>
//                           <button className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-md text-sm font-medium">View</button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                   <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Course Calendar</h3>
//                   <div className="grid grid-cols-7 gap-2">
//                     {[...Array(7)].map((_, i) => (
//                       <div key={i} className="text-center font-medium text-gray-600 dark:text-gray-400 py-2">
//                         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}
//                       </div>
//                     ))}
//                     {[...Array(35)].map((_, i) => {
//                       const day = i - 3; // Offset to start month from correct day
//                       return (
//                         <div 
//                           key={i} 
//                           className={`
//                             h-20 p-1 border border-gray-200 dark:border-gray-700 rounded-md
//                             ${day < 1 || day > 30 ? 'bg-gray-50 dark:bg-gray-700/50' : 'bg-white dark:bg-gray-800'}
//                           `}
//                         >
//                           {day > 0 && day <= 30 && (
//                             <>
//                               <p className="text-right text-sm text-gray-600 dark:text-gray-400">{day}</p>
//                               {day === 12 && (
//                                 <div className="mt-1 p-1 bg-blue-100 dark:bg-blue-900/40 rounded text-xs text-blue-800 dark:text-blue-300">
//                                   CS101 10:00 AM
//                                 </div>
//                               )}
//                               {day === 14 && (
//                                 <div className="mt-1 p-1 bg-green-100 dark:bg-green-900/40 rounded text-xs text-green-800 dark:text-green-300">
//                                   CS301 1:30 PM
//                                 </div>
//                               )}
//                               {day === 15 && (
//                                 <div className="mt-1 p-1 bg-purple-100 dark:bg-purple-900/40 rounded text-xs text-purple-800 dark:text-purple-300">
//                                   CS401 3:00 PM
//                                 </div>
//                               )}
//                             </>
//                           )}
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>
            
//             <TabsContent value="assessments" className="mt-0">
//               {/* Placeholder for Student Assessment */}
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Pending Assessments</h3>
//                     <div className="space-y-4">
//                       {[
//                         { id: 1, course: "CS101", type: "Midterm Exam", due: "May 10, 2025", count: 45 },
//                         { id: 2, course: "CS301", type: "Project Submission", due: "May 12, 2025", count: 32 },
//                         { id: 3, course: "CS401", type: "Quiz 3", due: "May 15, 2025", count: 28 }
//                       ].map(assessment => (
//                         <div key={assessment.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
//                           <div>
//                             <p className="font-medium text-gray-800 dark:text-white">{assessment.type}</p>
//                             <p className="text-sm text-gray-500 dark:text-gray-400">{assessment.course} • Due: {assessment.due}</p>
//                           </div>
//                           <button className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-md text-sm font-medium">Grade</button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Recent Submissions</h3>
//                     <div className="space-y-4">
//                       {[
//                         { id: 1, name: "Alex Johnson", course: "CS101", type: "Assignment 2", submitted: "1 hour ago" },
//                         { id: 2, name: "Maya Patel", course: "CS301", type: "Lab Report", submitted: "3 hours ago" },
//                         { id: 3, name: "James Wilson", course: "CS101", type: "Assignment 2", submitted: "5 hours ago" },
//                         { id: 4, name: "Emma Davis", course: "CS401", type: "Research Paper", submitted: "Yesterday" }
//                       ].map(submission => (
//                         <div key={submission.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
//                           <div className="flex justify-between mb-1">
//                             <p className="font-medium text-gray-800 dark:text-white">{submission.name}</p>
//                             <p className="text-xs text-gray-500 dark:text-gray-400">{submission.submitted}</p>
//                           </div>
//                           <p className="text-sm text-gray-600 dark:text-gray-300">{submission.course} • {submission.type}</p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Grade Distribution</h3>
//                     <div className="h-64 flex items-end justify-between p-4 space-x-2">
//                       {['A', 'B', 'C', 'D', 'F'].map((grade, i) => {
//                         const heights = [80, 60, 40, 20, 10];
//                         return (
//                           <div key={grade} className="flex flex-col items-center">
//                             <div 
//                               className={`w-12 rounded-t-md ${
//                                 i === 0 ? 'bg-green-500' : 
//                                 i === 1 ? 'bg-blue-500' : 
//                                 i === 2 ? 'bg-yellow-500' : 
//                                 i === 3 ? 'bg-orange-500' : 'bg-red-500'
//                               }`} 
//                               style={{ height: `${heights[i]}%` }}
//                             ></div>
//                             <div className="mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">{grade}</div>
//                             <div className="text-xs text-gray-500 dark:text-gray-400">{heights[i]/2}%</div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
//                   <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Student Performance</h3>
//                   <div className="overflow-x-auto">
//                     <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                       <thead>
//                         <tr>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Student</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assignment Avg</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Midterm</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Grade</th>
//                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
//                         {[
//                           { id: 1, name: "Alex Johnson", course: "CS101", assignments: 92, midterm: 88, grade: "A-" },
//                           { id: 2, name: "Maya Patel", course: "CS301", assignments: 95, midterm: 91, grade: "A" },
//                           { id: 3, name: "James Wilson", course: "CS101", assignments: 78, midterm: 82, grade: "B" },
//                           { id: 4, name: "Emma Davis", course: "CS401", assignments: 89, midterm: 86, grade: "B+" },
//                           { id: 5, name: "Liam Chen", course: "CS301", assignments: 94, midterm: 90, grade: "A-" }
//                         ].map(student => (
//                           <tr key={student.id}>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{student.name}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{student.course}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{student.assignments}%</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{student.midterm}%</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{student.grade}</td>
//                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                               <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">Details</button>
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </TabsContent>
            
//             <TabsContent value="communication" className="mt-0">
//               {/* Placeholder for Communication */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
//                   <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//                     <h3 className="text-lg font-medium text-gray-800 dark:text-white">Conversations</h3>
//                     <div className="mt-2 relative">
//                       <input
//                         type="text"
//                         placeholder="Search messages..."
//                         className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                   </div>
//                   <div className="h-96 overflow-y-auto">
//                     {[
//                       { id: 1, name: "Alex Johnson", course: "CS101", message: "Question about the homework", time: "10:35 AM", unread: true },
//                       { id: 2, name: "Course: CS301", message: "Announcement: Lab materials updated", time: "Yesterday", unread: false },
//                       { id: 3, name: "Maya Patel", course: "CS301", message: "Request for assignment extension", time: "Yesterday", unread: false },
//                       { id: 4, name: "Department Head", message: "Faculty meeting agenda", time: "May 3", unread: false },
//                       { id: 5, name: "James Wilson", course: "CS101", message: "Project group formation", time: "May 2", unread: false },
//                       { id: 6, name: "Course: CS401", message: "Announcement: Guest lecture next week", time: "May 1", unread: false }
//                     ].map(chat => (
//                       <div 
//                         key={chat.id} 
//                         className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${chat.unread ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
//                       >
//                         <div className="flex justify-between items-start">
//                           <div className="flex-1">
//                             <p className="font-medium text-gray-900 dark:text-white">{chat.name}</p>
//                             {chat.course && <p className="text-xs text-gray-500 dark:text-gray-400">{chat.course}</p>}
//                             <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-1">{chat.message}</p>
//                           </div>
//                           <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-4">{chat.time}</div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
                
//                 <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
//                   <div className="p-4 border-b border-gray-200 dark:border-gray-700">
//                     <div className="flex items-center">
//                       <div className="flex-1">
//                         <h3 className="text-lg font-medium text-gray-800 dark:text-white">Alex Johnson</h3>
//                         <p className="text-sm

import { useState, lazy, Suspense } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Bell, User, Search, Settings, Menu, BookOpen, GraduationCap, MessageSquare, BookText, UserCircle } from "lucide-react";

// Lazy load tab components
const CourseManagement = lazy(() => import("../pages/faculty/CourseManagement"));
const StudentAssessment = lazy(() => import("../pages/faculty/StudentAssessment"));
const Communication = lazy(() => import("../pages/faculty/Communication"));
const Research = lazy(() => import("../pages/faculty/ResearchPublications"));
const PersonalProfile = lazy(() => import("../pages/faculty/Profile"));

export default function FacultyLayout() {
  const [activeTab, setActiveTab] = useState("courses");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock user data
  const faculty = {
    name: "Dr. Sarah Johnson",
    role: "Associate Professor",
    department: "Computer Science",
    image: "/api/placeholder/150/150",
  };

  const tabData = [
    { id: "courses", label: "Course Management", icon: BookOpen },
    { id: "assessments", label: "Student Assessment", icon: GraduationCap },
    { id: "communication", label: "Communication", icon: MessageSquare },
    { id: "research", label: "Research", icon: BookText },
    { id: "profile", label: "Personal Profile", icon: UserCircle },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col overflow-hidden`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-blue-600 flex-shrink-0" />
              <span className="text-lg font-bold text-gray-800 dark:text-white truncate">
                Faculty Portal
              </span>
            </div>
          ) : (
            <BookOpen className="h-6 w-6 mx-auto text-blue-600" />
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5 text-gray-500 dark:text-gray-300" />
          </button>
        </div>

        {/* Faculty info */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <img
              src={faculty.image}
              alt="Profile"
              className="h-10 w-10 rounded-full flex-shrink-0"
            />
            {sidebarOpen && (
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-gray-800 dark:text-white truncate">
                  {faculty.name}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {faculty.department}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-2 flex-1 overflow-hidden flex flex-col">
          <nav className="flex-1 overflow-y-auto px-2 py-2">
            <div className="space-y-1 w-full">
              {tabData.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center ${
                    sidebarOpen ? "justify-start px-3" : "justify-center px-1"
                  } py-3 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <tab.icon className={`flex-shrink-0 ${sidebarOpen ? "mr-3 h-5 w-5" : "h-6 w-6"}`} />
                  {sidebarOpen && <span className="truncate text-sm">{tab.label}</span>}
                </button>
              ))}
            </div>
          </nav>
        </div>
        
        {/* Settings button at bottom */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button className="flex items-center space-x-3 w-full p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Settings className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Settings</span>}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {tabData.find(tab => tab.id === activeTab)?.label}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Notifications">
                  <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700" aria-label="Search">
                  <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Tab content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          <Suspense fallback={
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading content...</p>
              </div>
            </div>
          }>
            {activeTab === "courses" && <CourseManagement />}
            {activeTab === "assessments" && <StudentAssessment />}
            {activeTab === "communication" && <Communication />}
            {activeTab === "research" && <Research />}
            {activeTab === "profile" && <PersonalProfile />}
          </Suspense>
        </main>
      </div>
    </div>
  );
}