import { useState, useEffect } from "react";
import axios from "axios";
import {
  PlusCircle,
  Pencil,
  Trash,
  BookOpen,
  Users,
  User,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Info,
  AlertCircle,
  Calendar,
  Clock,
} from "lucide-react";

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const DepartmentManagement = () => {
  // States
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // UI States
  const [activeTab, setActiveTab] = useState("departments");
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);
  const [showCourseForm, setShowCourseForm] = useState(false);
  const [expandedDepartment, setExpandedDepartment] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [facultyToAssign, setFacultyToAssign] = useState("");

  // Form States
  const [departmentForm, setDepartmentForm] = useState({
    name: "",
    code: "",
    description: "",
    headOfDepartment: "",
  });

  const [courseForm, setCourseForm] = useState({
    courseCode: "",
    title: "",
    department: "",
    description: "",
    credits: 3,
    syllabus: "",
    prerequisites: [],
    isElective: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);

  // Config for axios requests with auth token
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("erpToken")}`,
    },
  };

  // Handle form input changes
  const handleDepartmentFormChange = (e) => {
    const { name, value } = e.target;
    setDepartmentForm({ ...departmentForm, [name]: value });
  };

  const handleCourseFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourseForm({
      ...courseForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handlePrerequisiteChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setCourseForm({ ...courseForm, prerequisites: selectedOptions });
  };

  // Load initial data
  useEffect(() => {
    fetchDepartments();
    fetchCourses();
    fetchFaculty();
  }, []);

  // Reset forms when closing
  const cancelForm = () => {
    if (showDepartmentForm) {
      setShowDepartmentForm(false);
      setDepartmentForm({
        name: "",
        code: "",
        description: "",
        headOfDepartment: "",
      });
    }

    if (showCourseForm) {
      setShowCourseForm(false);
      setCourseForm({
        courseCode: "",
        title: "",
        department: "",
        description: "",
        credits: 3,
        syllabus: "",
        prerequisites: [],
        isElective: false,
      });
    }

    setIsEditing(false);
    setCurrentItemId(null);
  };

  // Fetch all departments
  const fetchDepartments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/departments`, config);
      setDepartments(res.data.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch departments");
      console.error("Error fetching departments:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all courses
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/courses`, config);
      setCourses(res.data.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch courses");
      console.error("Error fetching courses:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all faculty
  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/users/faculty`, config);
      console.log(res.data.data);
      setFaculty(res.data.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch faculty");
      console.error("Error fetching faculty:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses by department
  const fetchDepartmentCourses = async (departmentId) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/departments/${departmentId}/courses`,
        config
      );
      return res.data.data;
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch department courses"
      );
      console.error("Error fetching department courses:", err);
      return [];
    }
  };

  // Fetch faculty by department
  const fetchDepartmentFaculty = async (departmentId) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/departments/${departmentId}/faculty`,
        config
      );
      return res.data.data;
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch department faculty"
      );
      console.error("Error fetching department faculty:", err);
      return [];
    }
  };

  // Handle department expand/collapse
  const toggleDepartmentExpand = async (departmentId) => {
    if (expandedDepartment === departmentId) {
      setExpandedDepartment(null);
    } else {
      setExpandedDepartment(departmentId);
      // Fetch related data when expanding
      const departmentCourses = await fetchDepartmentCourses(departmentId);
      const departmentFaculty = await fetchDepartmentFaculty(departmentId);

      // Update the department in the state with related data
      setDepartments(
        departments.map((dept) => {
          if (dept._id === departmentId) {
            return {
              ...dept,
              courses: departmentCourses,
              facultyMembers: departmentFaculty,
            };
          }
          return dept;
        })
      );
    }
  };

  // Handle course expand/collapse
  const toggleCourseExpand = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  // Create department
  const createDepartment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/departments`,
        departmentForm,
        config
      );
      setDepartments([...departments, res.data.data]);
      setShowDepartmentForm(false);
      setDepartmentForm({
        name: "",
        code: "",
        description: "",
        headOfDepartment: "",
      });
      setSuccess("Department created successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create department");
      console.error("Error creating department:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update department
  const updateDepartment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(
        `${API_BASE_URL}/departments/${currentItemId}`,
        departmentForm,
        config
      );
      setDepartments(
        departments.map((dept) =>
          dept._id === currentItemId ? res.data.data : dept
        )
      );
      setShowDepartmentForm(false);
      setDepartmentForm({
        name: "",
        code: "",
        description: "",
        headOfDepartment: "",
      });
      setIsEditing(false);
      setCurrentItemId(null);
      setSuccess("Department updated successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update department");
      console.error("Error updating department:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete department
  const deleteDepartment = async (departmentId) => {
    if (!window.confirm("Are you sure you want to delete this department?")) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/departments/${departmentId}`, config);
      setDepartments(departments.filter((dept) => dept._id !== departmentId));
      setSuccess("Department deleted successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete department");
      console.error("Error deleting department:", err);
    } finally {
      setLoading(false);
    }
  };

  // Edit department (prepare form for editing)
  const editDepartment = (department) => {
    setDepartmentForm({
      name: department.name,
      code: department.code,
      description: department.description || "",
      headOfDepartment: department.headOfDepartment?._id || "",
    });
    setCurrentItemId(department._id);
    setIsEditing(true);
    setShowDepartmentForm(true);
  };

  // Create course
  const createCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/courses`,
        courseForm,
        config
      );
      setCourses([...courses, res.data.data]);
      setShowCourseForm(false);
      setCourseForm({
        courseCode: "",
        title: "",
        department: "",
        description: "",
        credits: 3,
        syllabus: "",
        prerequisites: [],
        isElective: false,
      });
      setSuccess("Course created successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create course");
      console.error("Error creating course:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update course
  const updateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.put(
        `${API_BASE_URL}/courses/${currentItemId}`,
        courseForm,
        config
      );
      setCourses(
        courses.map((course) =>
          course._id === currentItemId ? res.data.data : course
        )
      );
      setShowCourseForm(false);
      setCourseForm({
        courseCode: "",
        title: "",
        department: "",
        description: "",
        credits: 3,
        syllabus: "",
        prerequisites: [],
        isElective: false,
      });
      setIsEditing(false);
      setCurrentItemId(null);
      setSuccess("Course updated successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update course");
      console.error("Error updating course:", err);
    } finally {
      setLoading(false);
    }
  };

  // Delete course
  const deleteCourse = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/courses/${courseId}`, config);
      setCourses(courses.filter((course) => course._id !== courseId));
      setSuccess("Course deleted successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete course");
      console.error("Error deleting course:", err);
    } finally {
      setLoading(false);
    }
  };

  // Edit course (prepare form for editing)
  const editCourse = (course) => {
    setCourseForm({
      courseCode: course.courseCode,
      title: course.title,
      department: course.department?._id || "",
      description: course.description || "",
      credits: course.credits || 3,
      syllabus: course.syllabus || "",
      prerequisites: course.prerequisites?.map((p) => p._id) || [],
      isElective: course.isElective || false,
    });
    setCurrentItemId(course._id);
    setIsEditing(true);
    setShowCourseForm(true);
  };

  // Set department head
  const setDepartmentHead = async (departmentId, facultyId) => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${API_BASE_URL}/departments/${departmentId}/head`,
        { facultyId },
        config
      );
      setDepartments(
        departments.map((dept) =>
          dept._id === departmentId ? res.data.data : dept
        )
      );
      setSuccess("Department head updated successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update department head"
      );
      console.error("Error updating department head:", err);
    } finally {
      setLoading(false);
    }
  };

  // Assign faculty to department
  const assignFacultyToDepartment = async (departmentId, facultyId) => {
    if (!facultyId) {
      setError("Please select a faculty member to assign");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/departments/${departmentId}/faculty`,
        { facultyId },
        config
      );

      // Update departments state with new faculty member
      setDepartments(
        departments.map((dept) => {
          if (dept._id === departmentId) {
            // Update the faculty members array if it exists
            const updatedFacultyMembers = dept.facultyMembers
              ? [
                  ...dept.facultyMembers,
                  faculty.find((f) => f._id === facultyId),
                ]
              : [faculty.find((f) => f._id === facultyId)];

            return { ...dept, facultyMembers: updatedFacultyMembers };
          }
          return dept;
        })
      );

      setSuccess("Faculty assigned to department successfully");
      setFacultyToAssign("");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to assign faculty to department"
      );
      console.error("Error assigning faculty to department:", err);
    } finally {
      setLoading(false);
    }
  };

  // Remove faculty from department
  const removeFacultyFromDepartment = async (departmentId, facultyId) => {
    if (
      !window.confirm(
        "Are you sure you want to remove this faculty member from the department?"
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(
        `${API_BASE_URL}/departments/${departmentId}/faculty/${facultyId}`,
        config
      );

      // Update departments state by removing faculty member
      setDepartments(
        departments.map((dept) => {
          if (dept._id === departmentId) {
            return {
              ...dept,
              facultyMembers: dept.facultyMembers.filter(
                (f) => f._id !== facultyId
              ),
              headOfDepartment:
                dept.headOfDepartment?._id === facultyId
                  ? null
                  : dept.headOfDepartment,
            };
          }
          return dept;
        })
      );

      setSuccess("Faculty removed from department successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to remove faculty from department"
      );
      console.error("Error removing faculty from department:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get department name by ID
  const getDepartmentName = (departmentId) => {
    const department = departments.find((dept) => dept._id === departmentId);
    return department ? department.name : "Unknown Department";
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Academic Management System
      </h1>

      {/* Tabs Navigation */}
      <div className="flex mb-6 border-b">
        <button
          className={`px-4 py-3 flex items-center ${
            activeTab === "departments"
              ? "border-b-2 border-blue-500 text-blue-600 font-medium"
              : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("departments")}
        >
          <Users className="mr-2" size={18} />
          Departments
        </button>
        <button
          className={`px-4 py-3 flex items-center ${
            activeTab === "courses"
              ? "border-b-2 border-blue-500 text-blue-600 font-medium"
              : "text-gray-600 hover:text-blue-500"
          }`}
          onClick={() => setActiveTab("courses")}
        >
          <BookOpen className="mr-2" size={18} />
          Courses
        </button>
      </div>

      {/* Feedback Messages */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <AlertCircle className="mr-2" size={18} />
            <span>{error}</span>
          </div>
          <button
            className="text-red-700 hover:text-red-900"
            onClick={() => setError("")}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <Check className="mr-2" size={18} />
            <span>{success}</span>
          </div>
          <button
            className="text-green-700 hover:text-green-900"
            onClick={() => setSuccess("")}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div className="flex justify-center items-center my-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Department Tab */}
      {activeTab === "departments" && (
        <div className="departments-container">
          {/* Department List */}
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center">
              <Users className="mr-2" size={20} />
              Departments Management
            </h2>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              onClick={() => setShowDepartmentForm(true)}
            >
              <PlusCircle className="mr-2" size={18} />
              Add Department
            </button>
          </div>

          {/* Department Form */}
          {showDepartmentForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                {isEditing ? (
                  <Pencil className="mr-2" size={18} />
                ) : (
                  <PlusCircle className="mr-2" size={18} />
                )}
                {isEditing ? "Edit Department" : "Add New Department"}
              </h3>
              <form onSubmit={isEditing ? updateDepartment : createDepartment}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Department Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={departmentForm.name}
                      onChange={handleDepartmentFormChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Computer Science"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Department Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={departmentForm.code}
                      onChange={handleDepartmentFormChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. CS"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-1 font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={departmentForm.description}
                      onChange={handleDepartmentFormChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief description of the department"
                      rows="3"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Head of Department
                    </label>
                    <select
                      name="headOfDepartment"
                      value={departmentForm.headOfDepartment}
                      onChange={handleDepartmentFormChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select Head of Department</option>
                      {faculty && faculty.length > 0 ? (
                        faculty
                          .filter((f) => f.role === "faculty")
                          .map((f) => (
                            <option key={f._id} value={f._id}>
                              {f.facultyId}
                            </option>
                          ))
                      ) : (
                        <option value="">No faculty available</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="flex mt-4 justify-end space-x-2">
                  <button
                    type="button"
                    onClick={cancelForm}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                    disabled={loading}
                  >
                    {isEditing ? "Update Department" : "Create Department"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Department List */}
          <div className="space-y-4">
            {departments?.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
                <BookOpen className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-gray-500">
                  No departments found. Create your first department to get
                  started.
                </p>
              </div>
            ) : (
              departments?.map((department) => (
                <div
                  key={department._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                >
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleDepartmentExpand(department._id)}
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {department.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Code:{" "}
                        <span className="font-medium">{department.code}</span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          editDepartment(department);
                        }}
                        className="text-blue-500 hover:text-blue-700 p-1 hover:bg-blue-50 rounded"
                        title="Edit Department"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteDepartment(department._id);
                        }}
                        className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                        title="Delete Department"
                      >
                        <Trash size={18} />
                      </button>
                      {expandedDepartment === department._id ? (
                        <ChevronUp size={18} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-500" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Department Details */}
                  {expandedDepartment === department._id && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      {department.description && (
                        <div className="mb-4 p-3 bg-white rounded border border-gray-200">
                          <h4 className="font-medium text-gray-700 mb-1 flex items-center">
                            <Info className="mr-2" size={16} />
                            Description
                          </h4>
                          <p className="text-gray-600">
                            {department.description}
                          </p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Department Info */}
                        <div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                            <h4 className="font-semibold flex items-center mb-3 text-gray-800">
                              <User className="mr-2" size={18} />
                              Head of Department
                            </h4>
                            {department.headOfDepartment ? (
                              <div className="bg-blue-50 p-3 rounded border border-blue-100">
                                <p className="font-medium">
                                  {department.headOfDepartment.name}
                                </p>
                                <p className="text-gray-600 text-sm">
                                  {department.headOfDepartment.email}
                                </p>
                                <p className="text-gray-500 text-sm mt-1">
                                  {department.headOfDepartment.designation ||
                                    "Professor"}
                                </p>
                              </div>
                            ) : (
                              <p className="text-gray-500 italic">
                                No head of department assigned
                              </p>
                            )}
                          </div>

                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="font-semibold flex items-center mb-3 text-gray-800">
                              <Users className="mr-2" size={18} />
                              Faculty Members
                            </h4>
                            {department.facultyMembers &&
                            department.facultyMembers.length > 0 ? (
                              <div className="space-y-3">
                                {department.facultyMembers.map((member) => (
                                  <div
                                    key={member._id}
                                    className="flex justify-between items-center p-2 hover:bg-gray-50 rounded border border-gray-200"
                                  >
                                    <div>
                                      <p className="font-medium">
                                        {member.name}
                                      </p>
                                      <p className="text-gray-600 text-sm">
                                        {member.designation || "Professor"}
                                      </p>
                                    </div>
                                    <div className="flex space-x-2">
                                      <button
                                        onClick={() =>
                                          setDepartmentHead(
                                            department._id,
                                            member._id
                                          )
                                        }
                                        className={`${
                                          member._id ===
                                          department.headOfDepartment?._id
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-100 hover:bg-gray-200"
                                        } px-2 py-1 rounded text-sm font-medium transition-colors`}
                                      >
                                        {member._id ===
                                        department.headOfDepartment?._id ? (
                                          <span className="flex items-center">
                                            <Check size={14} className="mr-1" />{" "}
                                            Head
                                          </span>
                                        ) : (
                                          "Make Head"
                                        )}
                                      </button>
                                      <button
                                        onClick={() =>
                                          removeFacultyFromDepartment(
                                            department._id,
                                            member._id
                                          )
                                        }
                                        className="bg-red-50 hover:bg-red-100 text-red-700 px-2 py-1 rounded text-sm transition-colors"
                                      >
                                        <X size={14} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 italic">
                                No faculty members assigned to this department
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Courses in Department */}
                        <div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="font-semibold flex items-center mb-3 text-gray-800">
                              <BookOpen className="mr-2" size={18} />
                              Courses
                            </h4>
                            {department.courses &&
                            department.courses.length > 0 ? (
                              <div className="space-y-3">
                                {department.courses.map((course) => (
                                  <div
                                    key={course._id}
                                    className="flex justify-between items-center p-2 hover:bg-gray-50 rounded border border-gray-200"
                                  >
                                    <div>
                                      <p className="font-medium">
                                        {course.title}
                                      </p>
                                      <p className="text-gray-600 text-sm">
                                        Code: {course.courseCode}
                                      </p>
                                    </div>
                                    <div className="flex space-x-2">
                                      <button
                                        onClick={() =>
                                          toggleCourseExpand(course._id)
                                        }
                                        className="bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-sm font-medium transition-colors"
                                      >
                                        {expandedCourse === course._id
                                          ? "Collapse"
                                          : "Expand"}
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500 italic">
                                No courses assigned to this department
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === "courses" && (
        <div className="courses-container">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center">
              <BookOpen className="mr-2" size={20} />
              Courses Management
            </h2>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              onClick={() => setShowCourseForm(true)}
            >
              <PlusCircle className="mr-2" size={18} />
              Add Course
            </button>
          </div>

          {/* Course Form */}
          {showCourseForm && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                {isEditing ? (
                  <Pencil className="mr-2" size={18} />
                ) : (
                  <PlusCircle className="mr-2" size={18} />
                )}
                {isEditing ? "Edit Course" : "Add New Course"}
              </h3>
              <form onSubmit={isEditing ? updateCourse : createCourse}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Course Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={courseForm.title}
                      onChange={handleCourseFormChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Data Structures"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Course Code
                    </label>
                    <input
                      type="text"
                      name="courseCode"
                      value={courseForm.courseCode}
                      onChange={handleCourseFormChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. CS101"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Department
                    </label>
                    <select
                      name="department"
                      value={courseForm.department}
                      onChange={handleCourseFormChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments && departments.length > 0 ? (
                        departments.map((dept) => (
                          <option key={dept._id} value={dept._id}>
                            {dept.name}
                          </option>
                        ))
                      ) : (
                        <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
                          <BookOpen
                            className="mx-auto text-gray-400 mb-2"
                            size={32}
                          />
                          <p className="text-gray-500">
                            No departments found. Create your first department
                            to get started.
                          </p>
                        </div>
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Credits
                    </label>
                    <input
                      type="number"
                      name="credits"
                      value={courseForm.credits}
                      onChange={handleCourseFormChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                      max="6"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block mb-1 font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={courseForm.description}
                      onChange={handleCourseFormChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief description of the course"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                <div className="flex mt-4 justify-end space-x-2">
                  <button
                    type="button"
                    onClick={cancelForm}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                    disabled={loading}
                  >
                    {isEditing ? "Update Course" : "Create Course"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Course List */}
          <div className="space-y-4">
            {courses?.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center">
                <BookOpen className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-gray-500">
                  No courses found. Create your first course to get started.
                </p>
              </div>
            ) : (
              courses?.map((course) => (
                <div
                  key={course._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                >
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleCourseExpand(course._id)}
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Code:{" "}
                        <span className="font-medium">{course.courseCode}</span>
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          editCourse(course);
                        }}
                        className="text-blue-500 hover:text-blue-700 p-1 hover:bg-blue-50 rounded"
                        title="Edit Course"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteCourse(course._id);
                        }}
                        className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                        title="Delete Course"
                      >
                        <Trash size={18} />
                      </button>
                      {expandedCourse === course._id ? (
                        <ChevronUp size={18} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-500" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Course Details */}
                  {expandedCourse === course._id && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <div className="mb-4 p-3 bg-white rounded border border-gray-200">
                        <h4 className="font-medium text-gray-700 mb-1 flex items-center">
                          <Info className="mr-2" size={16} />
                          Description
                        </h4>
                        <p className="text-gray-600">
                          {course.description || "No description provided"}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded border border-gray-200">
                        <h4 className="font-medium text-gray-700 mb-1 flex items-center">
                          <Calendar className="mr-2" size={16} />
                          Credits
                        </h4>
                        <p className="text-gray-600">{course.credits}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentManagement;
