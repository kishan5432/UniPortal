import { useState, useEffect } from "react";
import axios from "axios";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  BookOpen,
  Calendar as CalendarIcon,
  MapPin,
  Plus,
  School,
  Trash2,
  Edit,
  Save,
  X,
  Search,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

// Main component
export default function AcademicManagement() {
  // State for active tab
  const [activeTab, setActiveTab] = useState("academic-sessions");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <School className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">
              Academic Management System
            </h1>
          </div>
          <div>
            <Button variant="outline" className="mr-2">
              Help
            </Button>
            <Button>Admin Panel</Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger
              value="academic-sessions"
              className="text-sm md:text-base"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Academic Sessions
            </TabsTrigger>
            <TabsTrigger
              value="course-offerings"
              className="text-sm md:text-base"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Course Offerings
            </TabsTrigger>
            {/* <TabsTrigger
              value="classroom-management"
              className="text-sm md:text-base"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Classroom Management
            </TabsTrigger> */}
          </TabsList>

          <TabsContent value="academic-sessions" className="space-y-4">
            <AcademicSessionsTab />
          </TabsContent>

          <TabsContent value="course-offerings" className="space-y-4">
            <CourseOfferingsTab />
          </TabsContent>

          {/* <TabsContent value="classroom-management" className="space-y-4">
            <ClassroomManagementTab />
          </TabsContent> */}
        </Tabs>
      </main>
    </div>
  );
}

// ============= Academic Sessions Tab =============
function AcademicSessionsTab() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);

  // Form state for new academic session
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    type: "semester",
    isActive: true,
  });

  // Load academic sessions
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/academic/academic-sessions`
        );
        setSessions(Array.isArray(response.data) ? response.data : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching academic sessions:", err);
        setError("Failed to load academic sessions. Please try again later.");
        // For demo purposes, add some sample data
        setSessions([
          {
            _id: "1",
            name: "Fall 2025",
            startDate: "2025-08-15T00:00:00.000Z",
            endDate: "2025-12-15T00:00:00.000Z",
            type: "semester",
            isActive: true,
          },
          {
            _id: "2",
            name: "Spring 2025",
            startDate: "2025-01-10T00:00:00.000Z",
            endDate: "2025-05-20T00:00:00.000Z",
            type: "semester",
            isActive: false,
          },
          {
            _id: "3",
            name: "Summer 2025",
            startDate: "2025-06-01T00:00:00.000Z",
            endDate: "2025-07-31T00:00:00.000Z",
            type: "trimester",
            isActive: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Validate form data
      if (!formData.name || !formData.startDate || !formData.endDate) {
        setError("Please fill all required fields.");
        return;
      }

      // Format dates
      const payload = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };

      // Submit data
      const response = await axios.post(
        `${API_BASE_URL}/academic/academic-sessions`,
        payload
      );

      // Update sessions list with new session
      setSessions([...sessions, response.data]);

      // Reset form and close dialog
      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        type: "semester",
        isActive: true,
      });
      setShowAddDialog(false);

      // For demo purposes, add the new session to the list
      setSessions([
        ...sessions,
        {
          _id: Date.now().toString(),
          ...payload,
        },
      ]);
    } catch (err) {
      console.error("Error creating academic session:", err);
      setError("Failed to create academic session. Please try again.");
    }
  };

  // Delete session handler
  const handleDeleteSession = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/academic/academic-sessions/${id}`);
      setSessions(sessions.filter((session) => session._id !== id));
    } catch (err) {
      console.error("Error deleting academic session:", err);
      setError("Failed to delete academic session. Please try again.");
    }
  };

  // Toggle session active status
  const toggleSessionStatus = async (id, currentStatus) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/academic/academic-sessions/${id}`,
        {
          isActive: !currentStatus,
        }
      );

      setSessions(
        sessions.map((session) =>
          session._id === id
            ? { ...session, isActive: !currentStatus }
            : session
        )
      );
    } catch (err) {
      console.error("Error updating academic session status:", err);
      setError("Failed to update session status. Please try again.");
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Academic Sessions
          </h2>
          <p className="text-gray-500">
            Manage academic years, semesters, and terms
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Session
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Academic Session</DialogTitle>
              <DialogDescription>
                Define the details for the new academic session, term, or
                semester.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Fall 2025"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="startDate" className="text-right">
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="endDate" className="text-right">
                  End Date
                </Label>
                <Input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  name="type"
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semester">Semester</SelectItem>
                    <SelectItem value="trimester">Trimester</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isActive" className="text-right">
                  Active Status
                </Label>
                <div className="col-span-3 flex items-center">
                  <input
                    id="isActive"
                    name="isActive"
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="isActive" className="ml-2">
                    Set as active session
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Create Course Offering</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sessions?.map((session) => (
            <Card
              key={session._id}
              className={session.isActive ? "border-2 border-blue-500" : ""}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{session.name}</CardTitle>
                    <CardDescription>
                      {session.type.charAt(0).toUpperCase() +
                        session.type.slice(1)}
                    </CardDescription>
                  </div>
                  <Badge variant={session.isActive ? "default" : "outline"}>
                    {session.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Start: {formatDate(session.startDate)}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span>End: {formatDate(session.endDate)}</span>
                  </div>
                  <div className="flex items-center text-sm mt-4">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>
                      Duration:{" "}
                      {Math.round(
                        (new Date(session.endDate) -
                          new Date(session.startDate)) /
                          (1000 * 60 * 60 * 24)
                      )}{" "}
                      days
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteSession(session._id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
                <Button
                  size="sm"
                  variant={session.isActive ? "outline" : "default"}
                  onClick={() =>
                    toggleSessionStatus(session._id, session.isActive)
                  }
                >
                  {session.isActive ? "Set Inactive" : "Set Active"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ============= Course Offerings Tab =============
function CourseOfferingsTab() {
  const [courseOfferings, setCourseOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [academicSessions, setAcademicSessions] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Form state for new course offering
  const [formData, setFormData] = useState({
    course: "",
    academicSession: "",
    faculty: "",
    schedule: [
      { day: "monday", startTime: "09:00", endTime: "10:00", room: "" },
    ],
    maxStudents: 60,
  });

  // Load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // In a real app, use Promise.all for parallel requests
        const offeringsRes = await axios.get(
          `${API_BASE_URL}/academic/course-offerings`
        );
        const sessionsRes = await axios.get(
          `${API_BASE_URL}/academic/academic-sessions`
        );
        const facultyRes = await axios.get(`${API_BASE_URL}/academic/faculty`);
        const coursesRes = await axios.get(`${API_BASE_URL}/courses/`);
        const departmentsRes = await axios.get(
          `${API_BASE_URL}/academic/departments`
        );

        if (offeringsRes.data && Array.isArray(offeringsRes.data)) {
          setCourseOfferings(offeringsRes.data);
        } else {
          console.warn(
            "API didn't return an array for course offerings:",
            offeringsRes.data
          );
          setCourseOfferings([]);
        }
        setAcademicSessions(
          Array.isArray(sessionsRes.data) ? sessionsRes.data : []
        );
        setFaculty(Array.isArray(facultyRes.data) ? facultyRes.data : []);
        setCourses(
          Array.isArray(coursesRes.data.data) ? coursesRes.data.data : []
        );
        setDepartments(
          Array.isArray(departmentsRes.data) ? departmentsRes.data : []
        );
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");

        // For demo purposes, add some sample data
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle schedule changes
  const handleScheduleChange = (index, field, value) => {
    const updatedSchedule = [...formData.schedule];
    updatedSchedule[index] = { ...updatedSchedule[index], [field]: value };
    setFormData({ ...formData, schedule: updatedSchedule });
  };

  // Add new schedule item
  const addScheduleItem = () => {
    setFormData({
      ...formData,
      schedule: [
        ...formData.schedule,
        { day: "monday", startTime: "09:00", endTime: "10:00", room: "" },
      ],
    });
  };

  // Remove schedule item
  const removeScheduleItem = (index) => {
    const updatedSchedule = [...formData.schedule];
    updatedSchedule.splice(index, 1);
    setFormData({ ...formData, schedule: updatedSchedule });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Validate form data
      if (!formData.course || !formData.academicSession || !formData.faculty) {
        setError("Please fill all required fields.");
        return;
      }

      // Submit data
      const response = await axios.post(
        `${API_BASE_URL}/academic/course-offerings`,
        formData
      );

      // Update course offerings list with new offering
      setCourseOfferings([...courseOfferings, response.data]);

      // Reset form and close dialog
      setFormData({
        course: "",
        academicSession: "",
        faculty: "",
        schedule: [
          { day: "monday", startTime: "09:00", endTime: "10:00", room: "" },
        ],
        maxStudents: 60,
      });
      setShowAddDialog(false);

      // For demo purposes, add the new offering to the list
      const newOffering = {
        _id: Date.now().toString(),
        course: courses.find((c) => c._id === formData.course),
        academicSession: academicSessions.find(
          (s) => s._id === formData.academicSession
        ),
        faculty: faculty.find((f) => f._id === formData.faculty),
        schedule: formData.schedule,
        maxStudents: formData.maxStudents,
        enrolledStudents: [],
        waitlistedStudents: [],
      };
      setCourseOfferings([...courseOfferings, newOffering]);
    } catch (err) {
      console.error("Error creating course offering:", err);
      setError("Failed to create course offering. Please try again.");
    }
  };

  // Filter course offerings
  const filteredOfferings = courseOfferings.filter((offering) => {
    // Filter by department if selected
    if (
      selectedDepartment &&
      offering.course.department._id !== selectedDepartment
    ) {
      return false;
    }

    // Filter by session status
    if (selectedFilter === "active" && !offering.academicSession.isActive) {
      return false;
    }

    return true;
  });

  // Format time
  const formatTime = (timeString) => {
    try {
      const [hours, minutes] = timeString.split(":");
      return new Date(0, 0, 0, hours, minutes).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (err) {
      return timeString;
    }
  };

  // Format day name
  const formatDay = (day) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Course Offerings</h2>
          <p className="text-gray-500">
            Manage course schedules and faculty assignments
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Course Offering
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-screen overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Course Offering</DialogTitle>
              <DialogDescription>
                Set up a new course offering with schedule and room assignments.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="course" className="text-right">
                  Course
                </Label>
                <Select
                  name="course"
                  value={formData.course}
                  onValueChange={(value) =>
                    setFormData({ ...formData, course: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem
                        key={course._id}
                        value={course._id || "unknown"}
                      >
                        {course.courseCode}: {course.title || "Unnamed Course"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="academicSession" className="text-right">
                  Academic Session
                </Label>
                <Select
                  name="academicSession"
                  value={formData.academicSession}
                  onValueChange={(value) =>
                    setFormData({ ...formData, academicSession: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select academic session" />
                  </SelectTrigger>
                  <SelectContent>
                    {academicSessions.map((session) => (
                      <SelectItem
                        key={session._id}
                        value={session._id || "unknown"}
                      >
                        {session.name || "Unnamed Session"}{" "}
                        {session.isActive ? "(Active)" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="faculty" className="text-right">
                  Faculty
                </Label>
                <Select
                  name="faculty"
                  value={formData.faculty}
                  onValueChange={(value) =>
                    setFormData({ ...formData, faculty: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select faculty member" />
                  </SelectTrigger>
                  <SelectContent>
                    {faculty.map((f) => (
                      <SelectItem key={f._id} value={f._id || "unknown"}>
                        {f.firstName} {f.lastName || "Unnamed Faculty"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="maxStudents" className="text-right">
                  Max Students
                </Label>
                <Input
                  id="maxStudents"
                  name="maxStudents"
                  type="number"
                  value={formData.maxStudents}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right mt-2">Schedule</Label>
                <div className="col-span-3 space-y-4">
                  {formData.schedule.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-3 border rounded-md"
                    >
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <Select
                          value={item.day}
                          onValueChange={(value) =>
                            handleScheduleChange(index, "day", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monday">Monday</SelectItem>
                            <SelectItem value="tuesday">Tuesday</SelectItem>
                            <SelectItem value="wednesday">Wednesday</SelectItem>
                            <SelectItem value="thursday">Thursday</SelectItem>
                            <SelectItem value="friday">Friday</SelectItem>
                            <SelectItem value="saturday">Saturday</SelectItem>
                            <SelectItem value="sunday">Sunday</SelectItem>
                          </SelectContent>
                        </Select>

                        <Input
                          type="text"
                          placeholder="Room"
                          value={item.room}
                          onChange={(e) =>
                            handleScheduleChange(index, "room", e.target.value)
                          }
                        />

                        <div className="col-span-2 grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <Label className="mb-1 text-xs">Start Time</Label>
                            <Input
                              type="time"
                              value={item.startTime}
                              onChange={(e) =>
                                handleScheduleChange(
                                  index,
                                  "startTime",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label className="mb-1 text-xs">End Time</Label>
                            <Input
                              type="time"
                              value={item.endTime}
                              onChange={(e) =>
                                handleScheduleChange(
                                  index,
                                  "endTime",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeScheduleItem(index)}
                        disabled={formData.schedule.length <= 1}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addScheduleItem}
                    className="mt-2"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Time Slot
                  </Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Create Offering</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex space-x-4">
              <Select
                value={selectedDepartment}
                onValueChange={(value) => setSelectedDepartment(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="department">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept._id} value={dept._id || "unknown"}>
                      {dept.name || "Unnamed Department"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedFilter}
                onValueChange={(value) => setSelectedFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sessions</SelectItem>
                  <SelectItem value="active">Active Sessions</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOfferings.map((offering) => (
              <Card key={offering._id}>
                <CardHeader>
                  <CardTitle>
                    {offering.course.courseCode}: {offering.course.title}
                  </CardTitle>
                  <CardDescription>
                    {offering.academicSession.name} -{" "}
                    {offering.faculty.firstName} {offering.faculty.lastName}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {offering.schedule.map((slot, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <span className="mr-2 font-medium">
                          {formatDay(slot.day)}:
                        </span>
                        <span>
                          {formatTime(slot.startTime)} -{" "}
                          {formatTime(slot.endTime)} in {slot.room}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="text-sm">
                    Max Students: {offering.maxStudents}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ClassroomManagementTab() {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: "",
    capacity: "",
    facilities: "",
    isAvailable: true,
  });

  // Fetch classrooms
  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/classrooms");
        setClassrooms(Array.isArray(response.data) ? response.data : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching classrooms:", err);
        setError("Failed to load classrooms. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Validate form data
      if (!formData.roomNumber || !formData.capacity) {
        setError("Please fill all required fields.");
        return;
      }

      // Submit data
      const response = await axios.post("/api/classrooms", formData);

      // Update classrooms list with new classroom
      setClassrooms([...classrooms, response.data]);

      // Reset form and close dialog
      setFormData({
        roomNumber: "",
        capacity: "",
        facilities: "",
        isAvailable: true,
      });
      setShowAddDialog(false);
    } catch (err) {
      console.error("Error creating classroom:", err);
      setError("Failed to create classroom. Please try again.");
    }
  };

  // Delete classroom handler
  const handleDeleteClassroom = async (id) => {
    try {
      await axios.delete(`/api/classrooms/${id}`);
      setClassrooms(classrooms.filter((classroom) => classroom._id !== id));
    } catch (err) {
      console.error("Error deleting classroom:", err);
      setError("Failed to delete classroom. Please try again.");
    }
  };

  // Toggle classroom availability
  const toggleClassroomAvailability = async (id, currentStatus) => {
    try {
      const response = await axios.patch(`/api/classrooms/${id}`, {
        isAvailable: !currentStatus,
      });

      setClassrooms(
        classrooms.map((classroom) =>
          classroom._id === id
            ? { ...classroom, isAvailable: !currentStatus }
            : classroom
        )
      );
    } catch (err) {
      console.error("Error updating classroom availability:", err);
      setError("Failed to update classroom availability. Please try again.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Classroom Management
          </h2>
          <p className="text-gray-500">
            Manage classroom allocations and availability
          </p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Classroom
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Classroom</DialogTitle>
              <DialogDescription>
                Define the details for the new classroom.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="roomNumber" className="text-right">
                  Room Number
                </Label>
                <Input
                  id="roomNumber"
                  name="roomNumber"
                  placeholder="e.g. A101"
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="capacity" className="text-right">
                  Capacity
                </Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  placeholder="e.g. 60"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="facilities" className="text-right">
                  Facilities
                </Label>
                <Input
                  id="facilities"
                  name="facilities"
                  placeholder="e.g. Projector, AC"
                  value={formData.facilities}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isAvailable" className="text-right">
                  Availability
                </Label>
                <div className="col-span-3 flex items-center">
                  <input
                    id="isAvailable"
                    name="isAvailable"
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label htmlFor="isAvailable" className="ml-2">
                    Available
                  </Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Create Classroom</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classrooms.map((classroom) => (
            <Card key={classroom._id}>
              <CardHeader>
                <CardTitle>{classroom.roomNumber}</CardTitle>
                <CardDescription>
                  Capacity: {classroom.capacity} | Facilities:{" "}
                  {classroom.facilities || "None"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant={classroom.isAvailable ? "default" : "outline"}>
                  {classroom.isAvailable ? "Available" : "Unavailable"}
                </Badge>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteClassroom(classroom._id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete
                </Button>
                <Button
                  size="sm"
                  variant={classroom.isAvailable ? "outline" : "default"}
                  onClick={() =>
                    toggleClassroomAvailability(
                      classroom._id,
                      classroom.isAvailable
                    )
                  }
                >
                  {classroom.isAvailable ? "Set Unavailable" : "Set Available"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
