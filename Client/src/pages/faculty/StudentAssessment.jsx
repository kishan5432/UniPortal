import React, { useState, useEffect } from "react";
// import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  Plus,
  Search,
  Download,
  MoreVertical,
  Edit,
  Trash,
  Calendar as CalendarIcon,
  FileText,
  BarChart,
  CheckCircle,
  XCircle,
  AlertCircle,
  Eye,
} from "lucide-react";
import { format } from "date-fns";
import axios from "axios";

const StudentAssessment = () => {
  // const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("assessments");
  const [courseOfferings, setCourseOfferings] = useState([]);
  const [selectedCourseOffering, setSelectedCourseOffering] = useState("");
  const [assessments, setAssessments] = useState([]);
  const [filteredAssessments, setFilteredAssessments] = useState([]);
  const [studentAssessments, setStudentAssessments] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showAttendanceDialog, setShowAttendanceDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const [newAssessment, setNewAssessment] = useState({
    title: "",
    type: "quiz",
    totalMarks: 100,
    weightage: 10,
    dueDate: new Date(),
    instructions: "",
    courseOffering: "",
    isPublished: false,
  });

  const [attendanceData, setAttendanceData] = useState({
    courseOffering: "",
    date: new Date(),
    attendanceRecords: [],
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const courseRes = await axios.get("/api/courseOfferings");
        setCourseOfferings(Array.isArray(courseRes.data) ? courseRes.data : []);

        if (Array.isArray(courseRes.data) && courseRes.data.length > 0) {
          const defaultCourseId = courseRes.data[0]._id;
          setSelectedCourseOffering(defaultCourseId);

          // Load assessments for this course
          const assessmentsRes = await axios.get(
            `/api/assessments?courseOffering=${defaultCourseId}`
          );
          setAssessments(
            Array.isArray(assessmentsRes.data) ? assessmentsRes.data : []
          );
          setFilteredAssessments(
            Array.isArray(assessmentsRes.data) ? assessmentsRes.data : []
          );

          // Load students for this course
          const studentsRes = await axios.get(
            `/api/courseOfferings/${defaultCourseId}/students`
          );
          setStudents(Array.isArray(studentsRes.data) ? studentsRes.data : []);

          // Load attendance records
          const attendanceRes = await axios.get(
            `/api/attendance?courseOffering=${defaultCourseId}`
          );
          setAttendanceRecords(
            Array.isArray(attendanceRes.data) ? attendanceRes.data : []
          );

          // Load student assessments
          const studentAssessmentsRes = await axios.get(
            `/api/studentAssessments?courseOffering=${defaultCourseId}`
          );
          setStudentAssessments(
            Array.isArray(studentAssessmentsRes.data)
              ? studentAssessmentsRes.data
              : []
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // toast({
        //   variant: "destructive",
        //   title: "Error",
        //   description: "Failed to load data. Please try again.",
        // });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter assessments when search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredAssessments(assessments);
    } else {
      const filtered = Array.isArray(assessments)
        ? assessments.filter(
            (assessment) =>
              assessment.title
                .toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
              assessment.type.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];
      setFilteredAssessments(filtered);
    }
  }, [searchQuery, assessments]);

  // Handle course offering change
  const handleCourseChange = async (value) => {
    setSelectedCourseOffering(value);
    setLoading(true);

    try {
      // Load assessments for this course
      const assessmentsRes = await axios.get(
        `/api/assessments?courseOffering=${value}`
      );
      setAssessments(
        Array.isArray(assessmentsRes.data) ? assessmentsRes.data : []
      );
      setFilteredAssessments(
        Array.isArray(assessmentsRes.data) ? assessmentsRes.data : []
      );

      // Load students for this course
      const studentsRes = await axios.get(
        `/api/courseOfferings/${value}/students`
      );
      setStudents(Array.isArray(studentsRes.data) ? studentsRes.data : []);

      // Load attendance records
      const attendanceRes = await axios.get(
        `/api/attendance?courseOffering=${value}`
      );
      setAttendanceRecords(
        Array.isArray(attendanceRes.data) ? attendanceRes.data : []
      );

      // Load student assessments
      const studentAssessmentsRes = await axios.get(
        `/api/studentAssessments?courseOffering=${value}`
      );
      setStudentAssessments(
        Array.isArray(studentAssessmentsRes.data)
          ? studentAssessmentsRes.data
          : []
      );

      setNewAssessment((prev) => ({ ...prev, courseOffering: value }));
      setAttendanceData((prev) => ({ ...prev, courseOffering: value }));
    } catch (error) {
      console.error("Error fetching data for course:", error);
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: "Failed to load course data. Please try again.",
      // });
    } finally {
      setLoading(false);
    }
  };

  // Create new assessment
  const handleCreateAssessment = async () => {
    try {
      const response = await axios.post("/api/assessments", newAssessment);
      setAssessments((prev) =>
        Array.isArray(prev) ? [...prev, response.data] : [response.data]
      );
      setFilteredAssessments((prev) =>
        Array.isArray(prev) ? [...prev, response.data] : [response.data]
      );
      setShowCreateDialog(false);

      // toast({
      //   title: "Success",
      //   description: "Assessment created successfully.",
      // });

      // Reset form
      setNewAssessment({
        title: "",
        type: "quiz",
        totalMarks: 100,
        weightage: 10,
        dueDate: new Date(),
        instructions: "",
        courseOffering: selectedCourseOffering,
        isPublished: false,
      });
    } catch (error) {
      console.error("Error creating assessment:", error);
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: "Failed to create assessment. Please try again.",
      // });
    }
  };

  // Delete an assessment
  const handleDeleteAssessment = async (assessmentId) => {
    try {
      await axios.delete(`/api/assessments/${assessmentId}`);

      // Update state
      const updatedAssessments = Array.isArray(assessments)
        ? assessments.filter((a) => a._id !== assessmentId)
        : [];
      setAssessments(updatedAssessments);
      setFilteredAssessments(updatedAssessments);

      // toast({
      //   title: "Success",
      //   description: "Assessment deleted successfully.",
      // });
    } catch (error) {
      console.error("Error deleting assessment:", error);
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: "Failed to delete assessment. Please try again.",
      // });
    }
  };

  // Save attendance
  const handleSaveAttendance = async () => {
    try {
      const response = await axios.post("/api/attendance", attendanceData);
      setAttendanceRecords((prev) =>
        Array.isArray(prev) ? [...prev, response.data] : [response.data]
      );
      setShowAttendanceDialog(false);

      // toast({
      //   title: "Success",
      //   description: "Attendance recorded successfully.",
      // });

      // Reset form
      setAttendanceData({
        courseOffering: selectedCourseOffering,
        date: new Date(),
        attendanceRecords: [],
      });
    } catch (error) {
      console.error("Error recording attendance:", error);
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: "Failed to record attendance. Please try again.",
      // });
    }
  };

  // Update student assessment grade
  const handleUpdateGrade = async (studentAssessmentId, marks) => {
    try {
      await axios.patch(`/api/studentAssessments/${studentAssessmentId}`, {
        marks,
      });

      // Update state
      const updatedStudentAssessments = Array.isArray(studentAssessments)
        ? studentAssessments.map((sa) =>
            sa._id === studentAssessmentId
              ? { ...sa, marks, status: "graded" }
              : sa
          )
        : [];
      setStudentAssessments(updatedStudentAssessments);

      // toast({
      //   title: "Success",
      //   description: "Grade updated successfully.",
      // });
    } catch (error) {
      console.error("Error updating grade:", error);
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: "Failed to update grade. Please try again.",
      // });
    }
  };

  // Initialize attendance data when opening dialog
  const initializeAttendanceDialog = () => {
    const initialAttendanceRecords = Array.isArray(students)
      ? students.map((student) => ({
          student: student._id,
          status: "present",
          remarks: "",
        }))
      : [];

    setAttendanceData({
      courseOffering: selectedCourseOffering,
      date: new Date(),
      attendanceRecords: initialAttendanceRecords,
    });

    setShowAttendanceDialog(true);
  };

  // Generate performance report
  const generatePerformanceReport = async () => {
    try {
      const response = await axios.get(
        `/api/reports/performance?courseOffering=${selectedCourseOffering}`
      );

      // In a real app, this would likely download a file or open a new window
      console.log("Performance report:", response.data);

      // toast({
      //   title: "Success",
      //   description: "Performance report generated successfully.",
      // });
    } catch (error) {
      console.error("Error generating report:", error);
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: "Failed to generate report. Please try again.",
      // });
    }
  };

  // Toggle assessment publish status
  const togglePublishStatus = async (assessmentId, currentStatus) => {
    try {
      await axios.patch(`/api/assessments/${assessmentId}`, {
        isPublished: !currentStatus,
      });

      // Update state
      const updatedAssessments = Array.isArray(assessments)
        ? assessments.map((a) =>
            a._id === assessmentId ? { ...a, isPublished: !currentStatus } : a
          )
        : [];
      setAssessments(updatedAssessments);
      setFilteredAssessments(updatedAssessments);

      // toast({
      //   title: "Success",
      //   description: `Assessment ${!currentStatus ? 'published' : 'unpublished'} successfully.`,
      // });
    } catch (error) {
      console.error("Error updating assessment status:", error);
      // toast({
      //   variant: "destructive",
      //   title: "Error",
      //   description: "Failed to update assessment status. Please try again.",
      // });
    }
  };

  // Get status badge for student assessment
  const getStatusBadge = (status) => {
    switch (status) {
      case "submitted":
        return <Badge className="bg-blue-600">Submitted</Badge>;
      case "graded":
        return <Badge className="bg-green-600">Graded</Badge>;
      case "late":
        return <Badge className="bg-amber-600">Late</Badge>;
      case "pending":
      default:
        return <Badge className="bg-slate-600">Pending</Badge>;
    }
  };

  // Get assessment type badge
  const getTypeBadge = (type) => {
    switch (type) {
      case "quiz":
        return <Badge className="bg-purple-600">Quiz</Badge>;
      case "assignment":
        return <Badge className="bg-blue-600">Assignment</Badge>;
      case "project":
        return <Badge className="bg-cyan-600">Project</Badge>;
      case "mid-term":
        return <Badge className="bg-amber-600">Mid-Term</Badge>;
      case "end-term":
        return <Badge className="bg-red-600">End-Term</Badge>;
      case "lab":
        return <Badge className="bg-green-600">Lab</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  // Calculate attendance percentage
  const calculateAttendancePercentage = (studentId) => {
    if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0)
      return 0;

    const studentAttendance = attendanceRecords.flatMap((record) =>
      Array.isArray(record.attendanceRecords)
        ? record.attendanceRecords.filter((ar) => ar.student === studentId)
        : []
    );

    if (studentAttendance.length === 0) return 0;

    const presentCount = studentAttendance.filter(
      (ar) => ar.status === "present"
    ).length;
    return Math.round((presentCount / studentAttendance.length) * 100);
  };

  // Find student by ID
  const findStudent = (studentId) => {
    return Array.isArray(students)
      ? students.find((s) => s._id === studentId) || {
          firstName: "Unknown",
          lastName: "Student",
        }
      : { firstName: "Unknown", lastName: "Student" };
  };

  // Find assessment by ID
  const findAssessment = (assessmentId) => {
    return Array.isArray(assessments)
      ? assessments.find((a) => a._id === assessmentId) || {
          title: "Unknown Assessment",
        }
      : { title: "Unknown Assessment" };
  };

  // Get assessments for a specific student
  const getStudentAssessments = (studentId) => {
    return Array.isArray(studentAssessments)
      ? studentAssessments.filter((sa) => sa.student === studentId)
      : [];
  };

  // Calculate student average score
  const calculateStudentAverage = (studentId) => {
    if (!Array.isArray(studentAssessments)) return "N/A";

    const studentGrades = studentAssessments.filter(
      (sa) =>
        sa.student === studentId && sa.marks !== undefined && sa.marks !== null
    );

    if (studentGrades.length === 0) return "N/A";

    const totalMarks = studentGrades.reduce((sum, sa) => sum + sa.marks, 0);
    return (totalMarks / studentGrades.length).toFixed(1);
  };

  // Handle attendance status change
  const handleAttendanceStatusChange = (studentIndex, status) => {
    const updatedRecords = [...attendanceData.attendanceRecords];
    updatedRecords[studentIndex].status = status;
    setAttendanceData({
      ...attendanceData,
      attendanceRecords: updatedRecords,
    });
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Student Assessment</h2>
        <Select
          value={selectedCourseOffering}
          onValueChange={handleCourseChange}
        >
          <SelectTrigger className="w-72">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            {courseOfferings.map((course) => (
              <SelectItem key={course._id} value={course._id}>
                {course.course?.title || "Untitled Course"} -{" "}
                {course.academicSession?.name || "Current Session"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs
        defaultValue="assessments"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="grades">Grades</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* ASSESSMENTS TAB */}
        <TabsContent value="assessments" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assessments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Assessment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Assessment</DialogTitle>
                  <DialogDescription>
                    Create a new assessment for your course
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newAssessment.title}
                      onChange={(e) =>
                        setNewAssessment({
                          ...newAssessment,
                          title: e.target.value,
                        })
                      }
                      placeholder="Assessment Title"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={newAssessment.type}
                        onValueChange={(value) =>
                          setNewAssessment({ ...newAssessment, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quiz">Quiz</SelectItem>
                          <SelectItem value="assignment">Assignment</SelectItem>
                          <SelectItem value="project">Project</SelectItem>
                          <SelectItem value="mid-term">Mid-Term</SelectItem>
                          <SelectItem value="end-term">End-Term</SelectItem>
                          <SelectItem value="lab">Lab</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newAssessment.dueDate
                              ? format(newAssessment.dueDate, "PPP")
                              : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newAssessment.dueDate}
                            onSelect={(date) =>
                              setNewAssessment({
                                ...newAssessment,
                                dueDate: date,
                              })
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleCreateAssessment}>Create</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Assessment content would go here */}
        </TabsContent>

        {/* GRADES TAB */}
        <TabsContent value="grades" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Student Grades</h3>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Grades
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                {assessments.map((assessment) => (
                  <TableHead key={assessment._id} className="text-center">
                    {assessment.title}
                    <div className="text-xs font-normal">
                      {getTypeBadge(assessment.type)}
                      <span className="ml-1">
                        ({assessment.totalMarks} marks)
                      </span>
                    </div>
                  </TableHead>
                ))}
                <TableHead className="text-center">Average</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student._id}>
                  <TableCell className="font-medium">
                    {student.firstName} {student.lastName}
                  </TableCell>

                  {assessments.map((assessment) => {
                    const studentAssessment = studentAssessments.find(
                      (sa) =>
                        sa.student === student._id &&
                        sa.assessment === assessment._id
                    );

                    return (
                      <TableCell key={assessment._id} className="text-center">
                        {studentAssessment ? (
                          <div className="space-y-1">
                            <div className="font-medium">
                              {studentAssessment.marks !== undefined
                                ? `${studentAssessment.marks}/${assessment.totalMarks}`
                                : "—"}
                            </div>
                            <div>
                              {getStatusBadge(studentAssessment.status)}
                            </div>
                          </div>
                        ) : (
                          <span className="text-muted-foreground">
                            Not submitted
                          </span>
                        )}
                      </TableCell>
                    );
                  })}

                  <TableCell className="text-center font-bold">
                    {calculateStudentAverage(student._id)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* ATTENDANCE TAB */}
        <TabsContent value="attendance" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Attendance Records</h3>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Attendance
              </Button>
              <Dialog
                open={showAttendanceDialog}
                onOpenChange={setShowAttendanceDialog}
              >
                <DialogTrigger asChild>
                  <Button onClick={initializeAttendanceDialog}>
                    <Plus className="mr-2 h-4 w-4" />
                    Record Attendance
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>Record Attendance</DialogTitle>
                    <DialogDescription>
                      Mark attendance for {format(attendanceData.date, "PPP")}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="flex items-center justify-between mb-4">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(attendanceData.date, "PPP")}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={attendanceData.date}
                            onSelect={(date) =>
                              setAttendanceData({ ...attendanceData, date })
                            }
                          />
                        </PopoverContent>
                      </Popover>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            const updatedRecords =
                              attendanceData.attendanceRecords.map(
                                (record) => ({
                                  ...record,
                                  status: "present",
                                })
                              );
                            setAttendanceData({
                              ...attendanceData,
                              attendanceRecords: updatedRecords,
                            });
                          }}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark All Present
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updatedRecords =
                              attendanceData.attendanceRecords.map(
                                (record) => ({
                                  ...record,
                                  status: "absent",
                                })
                              );
                            setAttendanceData({
                              ...attendanceData,
                              attendanceRecords: updatedRecords,
                            });
                          }}
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Mark All Absent
                        </Button>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-10">#</TableHead>
                          <TableHead>Student</TableHead>
                          <TableHead className="text-center">Present</TableHead>
                          <TableHead className="text-center">Absent</TableHead>
                          <TableHead className="text-center">Excused</TableHead>
                          <TableHead>Remarks</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendanceData.attendanceRecords.map(
                          (record, index) => {
                            const student = findStudent(record.student);
                            return (
                              <TableRow key={record.student}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">
                                  {student.firstName} {student.lastName}
                                </TableCell>
                                <TableCell className="text-center">
                                  <Checkbox
                                    checked={record.status === "present"}
                                    onCheckedChange={() =>
                                      handleAttendanceStatusChange(
                                        index,
                                        "present"
                                      )
                                    }
                                  />
                                </TableCell>
                                <TableCell className="text-center">
                                  <Checkbox
                                    checked={record.status === "absent"}
                                    onCheckedChange={() =>
                                      handleAttendanceStatusChange(
                                        index,
                                        "absent"
                                      )
                                    }
                                  />
                                </TableCell>
                                <TableCell className="text-center">
                                  <Checkbox
                                    checked={record.status === "excused"}
                                    onCheckedChange={() =>
                                      handleAttendanceStatusChange(
                                        index,
                                        "excused"
                                      )
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    placeholder="Optional remarks"
                                    value={record.remarks || ""}
                                    onChange={(e) => {
                                      const updatedRecords = [
                                        ...attendanceData.attendanceRecords,
                                      ];
                                      updatedRecords[index].remarks =
                                        e.target.value;
                                      setAttendanceData({
                                        ...attendanceData,
                                        attendanceRecords: updatedRecords,
                                      });
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          }
                        )}
                      </TableBody>
                    </Table>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowAttendanceDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleSaveAttendance}>
                      Save Attendance
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Statistics</CardTitle>
              <CardDescription>
                Overview of attendance records for selected course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead className="text-center">Present</TableHead>
                      <TableHead className="text-center">Absent</TableHead>
                      <TableHead className="text-center">Excused</TableHead>
                      <TableHead className="text-center">
                        Attendance %
                      </TableHead>
                      <TableHead className="text-center">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => {
                      // Calculate attendance statistics for this student
                      const studentRecords = attendanceRecords.flatMap(
                        (record) =>
                          record.attendanceRecords.filter(
                            (ar) => ar.student === student._id
                          )
                      );

                      const totalDays = studentRecords.length;
                      const presentDays = studentRecords.filter(
                        (r) => r.status === "present"
                      ).length;
                      const absentDays = studentRecords.filter(
                        (r) => r.status === "absent"
                      ).length;
                      const excusedDays = studentRecords.filter(
                        (r) => r.status === "excused"
                      ).length;

                      const attendancePercentage =
                        totalDays === 0
                          ? 0
                          : Math.round((presentDays / totalDays) * 100);

                      return (
                        <TableRow key={student._id}>
                          <TableCell className="font-medium">
                            {student.firstName} {student.lastName}
                          </TableCell>
                          <TableCell className="text-center">
                            {presentDays}
                          </TableCell>
                          <TableCell className="text-center">
                            {absentDays}
                          </TableCell>
                          <TableCell className="text-center">
                            {excusedDays}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center">
                              <div className="w-full max-w-xs">
                                {attendancePercentage}%
                                <div className="h-2 w-full bg-slate-200 rounded mt-1">
                                  <div
                                    className={`h-full rounded ${
                                      attendancePercentage >= 75
                                        ? "bg-green-500"
                                        : attendancePercentage >= 60
                                        ? "bg-amber-500"
                                        : "bg-red-500"
                                    }`}
                                    style={{
                                      width: `${attendancePercentage}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {attendancePercentage >= 75 ? (
                              <Badge className="bg-green-600">Good</Badge>
                            ) : attendancePercentage >= 60 ? (
                              <Badge className="bg-amber-600">Warning</Badge>
                            ) : (
                              <Badge className="bg-red-600">Critical</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Attendance Records</CardTitle>
              <CardDescription>
                Daily attendance records for selected course
              </CardDescription>
            </CardHeader>
            <CardContent>
              {attendanceRecords.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <CalendarIcon className="h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">
                    No attendance records
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    You haven't recorded any attendance for this course yet.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {attendanceRecords
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((record) => (
                      <Card key={record._id} className="overflow-hidden">
                        <CardHeader className="bg-slate-50 dark:bg-slate-800 py-3">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">
                              {format(new Date(record.date), "PPPP")}
                            </CardTitle>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="mr-2 h-4 w-4" /> Export
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead className="text-center">
                                  Status
                                </TableHead>
                                <TableHead>Remarks</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {record.attendanceRecords.map((ar) => {
                                const student = findStudent(ar.student);
                                return (
                                  <TableRow key={ar.student}>
                                    <TableCell className="font-medium">
                                      {student.firstName} {student.lastName}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      {ar.status === "present" ? (
                                        <Badge className="bg-green-600">
                                          Present
                                        </Badge>
                                      ) : ar.status === "excused" ? (
                                        <Badge className="bg-blue-600">
                                          Excused
                                        </Badge>
                                      ) : (
                                        <Badge className="bg-red-600">
                                          Absent
                                        </Badge>
                                      )}
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                      {ar.remarks || "—"}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* REPORTS TAB */}
        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                <CardDescription>Academic performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    onClick={generatePerformanceReport}
                    className="w-full"
                  >
                    <BarChart className="mr-2 h-4 w-4" />
                    Generate Performance Report
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Generate detailed performance analytics for all students in
                    the selected course.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Report</CardTitle>
                <CardDescription>
                  Attendance statistics and trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export Attendance Report
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Export comprehensive attendance data with statistics and
                    trends.
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Assessment grade statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Grade Report
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Generate detailed grade distribution and statistics for
                    assessments.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Course Performance Summary</CardTitle>
              <CardDescription>
                Overall course statistics and insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    Average Grade
                  </div>
                  <div className="text-2xl font-bold">
                    {studentAssessments.length > 0
                      ? (
                          studentAssessments.reduce(
                            (sum, sa) => sum + (sa.marks || 0),
                            0
                          ) / studentAssessments.length
                        ).toFixed(1)
                      : "N/A"}
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    Average Attendance
                  </div>
                  <div className="text-2xl font-bold">
                    {attendanceRecords.length > 0
                      ? `${Math.round(
                          students.reduce(
                            (sum, student) =>
                              sum + calculateAttendancePercentage(student._id),
                            0
                          ) / students.length
                        )}%`
                      : "N/A"}
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    Assessments
                  </div>
                  <div className="text-2xl font-bold">{assessments.length}</div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-2">
                    Students
                  </div>
                  <div className="text-2xl font-bold">{students.length}</div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-4">
                  Recent Assessment Submissions
                </h4>
                {studentAssessments.length === 0 ? (
                  <div className="text-center text-muted-foreground py-4">
                    No assessment submissions yet
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Assessment</TableHead>
                        <TableHead>Submission Date</TableHead>
                        <TableHead className="text-right">Grade</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentAssessments
                        .sort(
                          (a, b) =>
                            new Date(b.submissionDate || 0) -
                            new Date(a.submissionDate || 0)
                        )
                        .slice(0, 5)
                        .map((sa) => {
                          const student = findStudent(sa.student);
                          const assessment = findAssessment(sa.assessment);

                          return (
                            <TableRow key={sa._id}>
                              <TableCell className="font-medium">
                                {student.firstName} {student.lastName}
                              </TableCell>
                              <TableCell>{assessment.title}</TableCell>
                              <TableCell>
                                {sa.submissionDate
                                  ? format(new Date(sa.submissionDate), "PP")
                                  : "—"}
                              </TableCell>
                              <TableCell className="text-right">
                                {sa.marks !== undefined ? (
                                  <Badge
                                    variant={
                                      sa.status === "graded"
                                        ? "default"
                                        : "outline"
                                    }
                                  >
                                    {sa.marks}/{assessment.totalMarks || 100}
                                  </Badge>
                                ) : (
                                  getStatusBadge(sa.status)
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentAssessment;
