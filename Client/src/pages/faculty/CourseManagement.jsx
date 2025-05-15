import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
// import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import {
  CalendarIcon,
  Clock,
  FileText,
  Upload,
  Users,
  CheckCircle2,
  Book,
  BellRing,
  Plus,
  PenLine,
  Calendar as CalendarIcon2,
  GraduationCap,
  Trash2,
  BookOpen,
  ClipboardList,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`;

export default function CourseManagement() {
  // const { toast } = useToast();
  const { currentUser, role } = useAuth(); // Use AuthContext to get the current user and role
  const [faculty, setFaculty] = useState(null); // State to store faculty details
  const [activeTab, setActiveTab] = useState("courses");
  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    title: "",
    type: "assignment",
    totalMarks: 100,
    weightage: 10,
    dueDate: null,
    instructions: "",
    courseOffering: null,
  });
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    description: "",
    courseOffering: "",
    file: null,
  });
  const [gradingCriteria, setGradingCriteria] = useState([
    { name: "Assignments", percentage: 20 },
    { name: "Mid-Term", percentage: 30 },
    { name: "End-Term", percentage: 40 },
    { name: "Attendance", percentage: 10 },
  ]);
  const [showAddAssignment, setShowAddAssignment] = useState(false);
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [showGradingCriteria, setShowGradingCriteria] = useState(false);

  useEffect(() => {
    setNewAssignment((prev) => ({
      ...prev,
      courseOffering: selectedCourse,
    }));
  }, [selectedCourse]);

  useEffect(() => {
    const fetchFacultyDetails = async () => {
      if (role === "faculty" && currentUser) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/faculty-course/${currentUser._id}`
          );
          setFaculty(response.data);
        } catch (error) {
          console.error("Error fetching faculty details:", error);
        }
      }
    };

    fetchFacultyDetails();
  }, [currentUser, role]);

  useEffect(() => {
    fetchAssignments(selectedCourse);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      if (faculty) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/api/faculty-course/${faculty._id}/courses`
          );

          if (response.data && response.data.length > 0) {
            const coursedata = response.data.map((item) => ({
              _id: item._id,
              title: item.course.title,
              courseCode: item.course.courseCode,
              status: item.course.isActive ? "active" : "inactive",
              enrolledStudents: item.enrolledStudents || [],
              academicSession: item.academicSession,
              schedule: item.schedule || [],
              department: item.course.department,
              program: item.course.isElective ? "Elective" : "Core",
              credits: item.course.credits,
            }));

            setCourses(coursedata);

            setSelectedCourse(response.data[0]._id);
            fetchAssignments(response.data[0]._id);
            fetchMaterials(response.data[0]._id);
          }

          setLoading(false);
        } catch (error) {
          console.error("Error fetching courses:", error);
          setLoading(false);
        }
      }
    };

    fetchCourses();
  }, [faculty]);

  // Fetch courses assigned to the logged-in faculty member
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       // Assume the logged-in faculty ID is available (in a real app, get from auth context)
  //       const facultyId = "faculty123";
  //       const response = await axios.get(`/api/faculty/${facultyId}/courses`);
  //       setCourses(Array.isArray(response.data) ? response.data : []);

  //       if (response.data && response.data.length > 0) {
  //         setSelectedCourse(response.data[0]._id);
  //         fetchAssignments(response.data[0]._id);
  //         fetchMaterials(response.data[0]._id);
  //       }

  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching courses:", error);
  //       setCourses(mockCourses);
  //       setSelectedCourse(mockCourses[0]._id);
  //       setAssignments(mockAssignments);
  //       setMaterials(mockMaterials);
  //       setLoading(false);
  //     }
  //   };

  //   fetchCourses();
  // }, []);

  // Fetch assignments for a course
  const fetchAssignments = async (courseId) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/faculty-course/courses/${courseId}/assessments`
      );
      setAssignments(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      setAssignments(mockAssignments);
    }
  };

  // Fetch course materials
  const fetchMaterials = async (courseId) => {
    try {
      const response = await axios.get(
        `/api/faculty-course/courses/${courseId}/materials`
      );
      setMaterials(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching materials:", error);
      setMaterials(mockMaterials);
    }
  };

  // Handle course change
  const handleCourseChange = (courseId) => {
    setSelectedCourse(courseId);
    fetchAssignments(courseId);
    fetchMaterials(courseId);
  };

  // Create new assignment
  const handleCreateAssignment = async () => {
    try {
      const assignmentData = {
        ...newAssignment,
        courseOffering: selectedCourse,
      };
      const response = await axios.post(
        `${API_BASE_URL}/api/faculty-course/assessments`,
        assignmentData
      );

      // Update assignments list
      setAssignments([...assignments, response.data]);

      // Reset form
      setNewAssignment({
        title: "",
        type: "assignment",
        totalMarks: 100,
        weightage: 10,
        dueDate: null,
        instructions: "",
        courseOffering: "",
      });

      setShowAddAssignment(false);

      // toast({
      //   title: "Success",
      //   description: "Assignment created successfully!",
      //   status: "success",
      //   duration: 3000,
      // });
    } catch (error) {
      console.error("Error creating assignment:", error);
      //   toast({
      //     title: "Error",
      //     description: "Failed to create assignment. Please try again.",
      //     status: "error",
      //     duration: 3000,
      //   });
      // }
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/api/faculty-course/assessments/${assignmentId}`
      );
      // Remove the deleted assignment from the state
      setAssignments(
        assignments.filter((assignment) => assignment._id !== assignmentId)
      );
      console.log("Assignment deleted successfully");
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  const handleEditAssignment = async (assignment) => {
    const id = assignment._id;
    setNewAssignment({
      title: assignment.title,
      type: assignment.type,
      totalMarks: assignment.totalMarks,
      weightage: assignment.weightage,
      dueDate: new Date(assignment.dueDate),
      instructions: assignment.instructions,
      courseOffering: assignment.courseOffering,
    });
    setShowAddAssignment(true); // Open the dialog for editing
  };

  const fetchAllAssignmentsByFaculty = async () => {
    if (!currentUser) {
      console.error("Faculty details not available");
      return;
    }

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/faculty-course/${currentUser._id}/assessments`
      );

      // Update the assignments state with the fetched data
      setAssignments(Array.isArray(response.data) ? response.data : []);
      console.log("All assignments fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching all assignments by faculty:", error);
      setAssignments([]); // Clear assignments if there's an error
    }
  };

  // Upload course material
  const handleUploadMaterial = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newMaterial.title);
      formData.append("description", newMaterial.description);
      formData.append("courseOffering", selectedCourse);
      formData.append("file", newMaterial.file);

      const response = await axios.post(
        `${API_BASE_URL}/api/faculty-course/course-materials`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Update materials list
      setMaterials([...materials, response.data]);

      // Reset form
      setNewMaterial({
        title: "",
        description: "",
        courseOffering: "",
        file: null,
      });

      setShowAddMaterial(false);

      // toast({
      //   title: "Success",
      //   description: "Material uploaded successfully!",
      //   status: "success",
      //   duration: 3000,
      // });
    } catch (error) {
      console.error("Error uploading material:", error);
      // toast({
      //   title: "Error",
      //   description: "Failed to upload material. Please try again.",
      //   status: "error",
      //   duration: 3000,
      // });
    }
  };

  // Update grading criteria
  const handleUpdateGradingCriteria = async () => {
    try {
      const response = await axios.post(
        `/api/courses/${selectedCourse}/grading-criteria`,
        {
          criteria: gradingCriteria,
        }
      );

      setShowGradingCriteria(false);

      // toast({
      //   title: "Success",
      //   description: "Grading criteria updated successfully!",
      //   status: "success",
      //   duration: 3000,
      // });
    } catch (error) {
      console.error("Error updating grading criteria:", error);
      // toast({
      //   title: "Error",
      //   description: "Failed to update grading criteria. Please try again.",
      //   status: "error",
      //   duration: 3000,
      // });
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setNewMaterial({
      ...newMaterial,
      file: e.target.files[0],
    });
  };

  // Formatting and utility functions
  const getSelectedCourseDetails = () => {
    return courses.find((course) => course._id === selectedCourse) || {};
  };

  const getAssignmentStatusClass = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);

    if (due < today) return "text-red-500";
    if (due.setDate(due.getDate() - 2) <= today) return "text-yellow-500";
    return "text-green-500";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return format(new Date(dateString), "PPP");
  };

  const calculateTotalWeightage = () => {
    return gradingCriteria.reduce((total, item) => total + item.percentage, 0);
  };

  const handleGradingCriteriaChange = (index, value) => {
    const updated = [...gradingCriteria];
    updated[index].percentage = parseInt(value) || 0;
    setGradingCriteria(updated);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading course information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <BookOpen className="mr-2" /> Course Management
        </h1>
        <p className="text-gray-500">
          Manage your courses, assignments, and course materials
        </p>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="courses" className="flex items-center">
            <GraduationCap className="mr-2 h-4 w-4" /> Courses
          </TabsTrigger>
          <TabsTrigger value="assignments" className="flex items-center">
            <ClipboardList className="mr-2 h-4 w-4" /> Assignments
          </TabsTrigger>
          <TabsTrigger value="materials" className="flex items-center">
            <FileText className="mr-2 h-4 w-4" /> Materials
          </TabsTrigger>
          <TabsTrigger value="grading" className="flex items-center">
            <CheckCircle2 className="mr-2 h-4 w-4" /> Grading
          </TabsTrigger>
        </TabsList>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            {courses.map((course) => (
              <Card
                key={course._id}
                className={`overflow-hidden ${
                  selectedCourse === course._id ? "border-2 border-primary" : ""
                }`}
              >
                <CardHeader className="bg-slate-50 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge
                        variant={
                          course.status === "active" ? "success" : "secondary"
                        }
                        className="mb-2"
                      >
                        {course.status}
                      </Badge>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription>{course.courseCode}</CardDescription>
                    </div>
                    <Button
                      variant={
                        selectedCourse === course._id ? "default" : "outline"
                      }
                      onClick={() => handleCourseChange(course._id)}
                    >
                      {selectedCourse === course._id ? "Selected" : "Select"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-gray-500" />
                      {/* <span>
                        {course.enrolledStudents.length} students enrolled
                      </span> */}
                    </div>

                    <div className="flex items-center text-sm">
                      <CalendarIcon2 className="mr-2 h-4 w-4 text-gray-500" />
                      <span>
                        {formatDate(course.academicSession.startDate)} -{" "}
                        {formatDate(course.academicSession.endDate)}
                      </span>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium mb-2">Schedule</h4>
                      <div className="grid gap-2">
                        {course.schedule.map((slot, idx) => (
                          <div
                            key={idx}
                            className="flex items-center text-sm bg-slate-50 p-2 rounded"
                          >
                            <div className="font-medium min-w-16 capitalize">
                              {slot.day}
                            </div>
                            <div className="flex-1 flex items-center">
                              <Clock className="mr-1 h-3 w-3 text-gray-500" />
                              <span>
                                {slot.startTime} - {slot.endTime}
                              </span>
                            </div>
                            <div className="text-gray-500">{slot.room}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-slate-50 flex justify-between">
                  <div className="text-sm text-gray-500">
                    {/* Department: {course.department.name} */}
                  </div>
                  <Badge variant="outline">{course.program}</Badge>
                </CardFooter>
              </Card>
            ))}
          </div>

          {courses.length === 0 && (
            <Card className="p-8 text-center">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Book className="h-12 w-12 text-gray-300" />
                <h3 className="font-medium text-lg">No courses assigned</h3>
                <p className="text-gray-500">
                  You don't have any courses assigned for this academic session.
                </p>
              </div>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Student Progress Overview</CardTitle>
              <CardDescription>
                Track overall class performance and submissions
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-6">
                {selectedCourse && (
                  <>
                    <div className="space-y-2">
                      <Label className="text-sm text-gray-500">
                        Selected Course
                      </Label>
                      <div className="font-medium">
                        {getSelectedCourseDetails().name || "N/A"}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Assignment Completion</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Average Class Score</span>
                        <span className="font-medium">72%</span>
                      </div>
                      <Progress value={72} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Overall Attendance</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>

                    <Separator />

                    <div className="pt-2">
                      <h4 className="font-medium mb-3">Grade Distribution</h4>
                      <div className="grid grid-cols-5 gap-2 text-center">
                        <div>
                          <div
                            className="bg-green-500 h-16 md:h-24 rounded-t-md"
                            style={{ height: `${85}px` }}
                          ></div>
                          <div className="mt-1 text-xs font-medium">A</div>
                        </div>
                        <div>
                          <div
                            className="bg-emerald-400 h-16 md:h-20 rounded-t-md"
                            style={{ height: `${65}px` }}
                          ></div>
                          <div className="mt-1 text-xs font-medium">B</div>
                        </div>
                        <div>
                          <div
                            className="bg-yellow-400 h-16 md:h-16 rounded-t-md"
                            style={{ height: `${50}px` }}
                          ></div>
                          <div className="mt-1 text-xs font-medium">C</div>
                        </div>
                        <div>
                          <div
                            className="bg-orange-400 h-10 md:h-12 rounded-t-md"
                            style={{ height: `${35}px` }}
                          ></div>
                          <div className="mt-1 text-xs font-medium">D</div>
                        </div>
                        <div>
                          <div
                            className="bg-red-400 h-6 md:h-8 rounded-t-md"
                            style={{ height: `${20}px` }}
                          ></div>
                          <div className="mt-1 text-xs font-medium">F</div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Grade Management</CardTitle>
              <CardDescription>
                Manage and publish student grades for assessments
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ScrollArea className="h-80">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Submissions</TableHead>
                      <TableHead>Avg. Score</TableHead>
                      <TableHead>Grading Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment) => (
                      <TableRow key={assignment._id}>
                        <TableCell className="font-medium">
                          {assignment.title}
                        </TableCell>
                        <TableCell>{formatDate(assignment.dueDate)}</TableCell>
                        <TableCell>
                          {assignment.stats?.submitted ||
                            Math.floor(Math.random() * 30) + 20}
                          /
                          {getSelectedCourseDetails().enrolledStudents
                            ?.length || 60}
                        </TableCell>
                        <TableCell>
                          {assignment.stats?.averageScore ||
                            Math.floor(Math.random() * 20) + 70}
                          /{assignment.totalMarks}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              assignment.gradingComplete
                                ? "success"
                                : "secondary"
                            }
                          >
                            {assignment.gradingComplete
                              ? "Complete"
                              : "In Progress"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" className="h-8">
                            Grade
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Grading Settings</CardTitle>
              <CardDescription>
                Configure grading and assessment options
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Allow Late Submissions</Label>
                    <p className="text-sm text-gray-500">
                      Students can submit assignments after due date
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">
                      Automatic Grade Publishing
                    </Label>
                    <p className="text-sm text-gray-500">
                      Publish grades automatically once grading is complete
                    </p>
                  </div>
                  <Switch checked={false} />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">
                      Penalty for Late Submissions
                    </Label>
                    <p className="text-sm text-gray-500">
                      Apply automatic deduction for submissions after due date
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      className="w-16 h-8"
                      defaultValue="10"
                      min="0"
                      max="100"
                    />
                    <span className="text-sm">%</span>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Grade Visibility</Label>
                    <p className="text-sm text-gray-500">
                      Students can see their grades in the portal
                    </p>
                  </div>
                  <Switch checked={true} />
                </div>
              </div>

              <div className="mt-6">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Assignments & Assessments</CardTitle>
                <CardDescription>
                  Create and manage assignments for your courses
                </CardDescription>
              </div>
              <Dialog
                open={showAddAssignment}
                onOpenChange={setShowAddAssignment}
              >
                <DialogTrigger asChild>
                  <Button className="flex items-center">
                    <Plus className="mr-2 h-4 w-4" /> New Assignment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Create New Assignment</DialogTitle>
                    <DialogDescription>
                      Add a new assignment or assessment for your students
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Assignment Title"
                        value={newAssignment.title}
                        onChange={(e) =>
                          setNewAssignment({
                            ...newAssignment,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="type">Type</Label>
                        <Select
                          value={newAssignment.type}
                          onValueChange={(value) =>
                            setNewAssignment({ ...newAssignment, type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quiz">Quiz</SelectItem>
                            <SelectItem value="assignment">
                              Assignment
                            </SelectItem>
                            <SelectItem value="project">Project</SelectItem>
                            <SelectItem value="mid-term">
                              Mid-Term Exam
                            </SelectItem>
                            <SelectItem value="end-term">
                              End-Term Exam
                            </SelectItem>
                            <SelectItem value="lab">Lab Work</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="course">Course</Label>
                        <Select
                          value={selectedCourse}
                          onValueChange={(value) => setSelectedCourse(value)}
                          disabled={courses.length <= 1}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map((course) => (
                              <SelectItem key={course._id} value={course._id}>
                                {course.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="marks">Total Marks</Label>
                        <Input
                          id="marks"
                          type="number"
                          placeholder="100"
                          value={newAssignment.totalMarks}
                          onChange={(e) =>
                            setNewAssignment({
                              ...newAssignment,
                              totalMarks: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="weightage">Weightage (%)</Label>
                        <Input
                          id="weightage"
                          type="number"
                          placeholder="10"
                          value={newAssignment.weightage}
                          onChange={(e) =>
                            setNewAssignment({
                              ...newAssignment,
                              weightage: parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                    </div>

                    {/* <div className="grid gap-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newAssignment.dueDate ? (
                              format(new Date(newAssignment.dueDate), "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newAssignment.dueDate}
                            onSelect={handleDateChange}
                            initialFocus
                            className="border border-red-500"
                          />
                        </PopoverContent>
                      </Popover>
                    </div> */}

                    <div className="grid gap-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          console.log("Selected date:", selectedDate);
                          setNewAssignment({
                            ...newAssignment,
                            dueDate: selectedDate,
                          });
                        }}
                        value={
                          newAssignment.dueDate
                            ? new Date(newAssignment.dueDate)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="instructions">Instructions</Label>
                      <Textarea
                        id="instructions"
                        placeholder="Add detailed instructions for students..."
                        className="min-h-32"
                        value={newAssignment.instructions}
                        onChange={(e) =>
                          setNewAssignment({
                            ...newAssignment,
                            instructions: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowAddAssignment(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleCreateAssignment}>
                      Create Assignment
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>

            <CardContent>
              {courses.length === 0 ? (
                <div className="text-center py-8">
                  <p>Please select a course first to manage assignments</p>
                </div>
              ) : assignments.length === 0 ? (
                <div className="text-center py-8">
                  <ClipboardList className="mx-auto h-12 w-12 text-gray-300" />
                  <h3 className="mt-4 font-medium">No assignments yet</h3>
                  <p className="text-gray-500 mt-1">
                    Create your first assignment using the button above
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Total Marks</TableHead>
                      <TableHead>Weightage</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment) => (
                      <TableRow key={assignment._id}>
                        <TableCell className="font-medium">
                          {assignment.title}
                        </TableCell>
                        <TableCell className="capitalize">
                          {assignment.type}
                        </TableCell>
                        <TableCell
                          className={getAssignmentStatusClass(
                            assignment.dueDate
                          )}
                        >
                          {formatDate(assignment.dueDate)}
                        </TableCell>
                        <TableCell>{assignment.totalMarks}</TableCell>
                        <TableCell>{assignment.weightage}%</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              assignment.gradingComplete
                                ? "success"
                                : "secondary"
                            }
                          >
                            {assignment.gradingComplete
                              ? "Complete"
                              : "In Progress"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            {/* <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditAssignment(assignment)}
                            >
                              Edit
                            </Button> */}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleDeleteAssignment(assignment._id)
                              }
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="materials">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Course Materials</CardTitle>
                <CardDescription>
                  Upload and manage course materials
                </CardDescription>
              </div>
              <Dialog open={showAddMaterial} onOpenChange={setShowAddMaterial}>
                <DialogTrigger asChild>
                  <Button className="flex items-center">
                    <Upload className="mr-2 h-4 w-4" /> Upload Material
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px]">
                  <DialogHeader>
                    <DialogTitle>Upload New Material</DialogTitle>
                    <DialogDescription>
                      Add new course material for your students
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="materialTitle">Title</Label>
                      <Input
                        id="materialTitle"
                        placeholder="Material Title"
                        value={newMaterial.title}
                        onChange={(e) =>
                          setNewMaterial({
                            ...newMaterial,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="materialDescription">Description</Label>
                      <Textarea
                        id="materialDescription"
                        placeholder="Add a brief description..."
                        value={newMaterial.description}
                        onChange={(e) =>
                          setNewMaterial({
                            ...newMaterial,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="materialFile">File</Label>
                      <Input
                        id="materialFile"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowAddMaterial(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleUploadMaterial}>Upload</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {materials.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-gray-300" />
                  <h3 className="mt-4 font-medium">
                    No materials uploaded yet
                  </h3>
                  <p className="text-gray-500 mt-1">
                    Upload your first course material using the button above
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Uploaded On</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materials.map((material) => (
                      <TableRow key={material._id}>
                        <TableCell className="font-medium">
                          {material.title}
                        </TableCell>
                        <TableCell>{material.description}</TableCell>
                        <TableCell>{formatDate(material.uploadedAt)}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" className="h-8">
                            Download
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grading">
          <Card>
            <CardHeader>
              <CardTitle>Grading Criteria</CardTitle>
              <CardDescription>
                Define and manage grading criteria for the selected course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gradingCriteria.map((criteria, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <Label className="text-base">{criteria.name}</Label>
                    </div>
                    <Input
                      type="number"
                      className="w-16 h-8"
                      value={criteria.percentage}
                      onChange={(e) =>
                        handleGradingCriteriaChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{calculateTotalWeightage()}%</span>
                </div>
              </div>
              <div className="mt-6">
                <Button onClick={handleUpdateGradingCriteria}>
                  Save Criteria
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
