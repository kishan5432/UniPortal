import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Input,
  Select,
  Table,
  Modal,
  Form,
  message,
  Switch,
  Tabs,
  Popconfirm,
  Space,
  Card,
  Divider,
  Tag,
} from "antd";
import {
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  UserSwitchOutlined,
  LockOutlined,
  SaveOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { TabPane } = Tabs;
const { confirm } = Modal;

const API_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;

const UserManagement = () => {
  // State variables
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [roleSpecificFields, setRoleSpecificFields] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [modalMode, setModalMode] = useState("create"); // 'create', 'edit', 'role'

  // Fetch initial data
  useEffect(() => {
    fetchUsers();
    fetchDepartments();
  }, []);

  // Filter users when search text changes
  useEffect(() => {
    if (searchText) {
      const filtered = users.filter(
        (user) =>
          user.username.toLowerCase().includes(searchText.toLowerCase()) ||
          user.email.toLowerCase().includes(searchText.toLowerCase()) ||
          user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
          user.role.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchText, users]);

  // API calls
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/users`);
      setUsers(response.data);
      setFilteredUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Failed to fetch users");
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/departments/all`);
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      message.error("Failed to fetch departments");
    }
  };

  const createUser = async (values) => {
    setLoading(true);
    try {
      // Combine basic user data with role specific fields
      const userData = {
        ...values,
        ...roleSpecificFields,
      };

      const response = await axios.post(`${API_BASE_URL}/users/`, userData);
      setUsers([...users, response.data]);
      message.success("User created successfully");
      setModalVisible(false);
      form.resetFields();
      setRoleSpecificFields({});
      setLoading(false);
    } catch (error) {
      console.error("Error creating user:", error);
      message.error(
        "Failed to create user: " +
          (error.response?.data?.message || error.message)
      );
      setLoading(false);
    }
  };

  const updateUser = async (values) => {
    setLoading(true);
    try {
      // Combine basic user data with role specific fields
      const userData = {
        ...values,
        ...roleSpecificFields,
      };

      const response = await axios.put(
        `${API_BASE_URL}/users/${currentUser._id}`,
        userData
      );

      // Update users array with the updated user
      const updatedUsers = users.map((user) =>
        user._id === currentUser._id ? response.data : user
      );

      setUsers(updatedUsers);
      message.success("User updated successfully");
      setModalVisible(false);
      form.resetFields();
      setRoleSpecificFields({});
      setCurrentUser(null);
      setLoading(false);
    } catch (error) {
      console.error("Error updating user:", error);
      message.error(
        "Failed to update user: " +
          (error.response?.data?.message || error.message)
      );
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId, isActive) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/users/${userId}/status`,
        { isActive }
      );

      // Update users array with the updated status
      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, isActive } : user
      );

      setUsers(updatedUsers);
      message.success(
        `User ${isActive ? "activated" : "deactivated"} successfully`
      );
    } catch (error) {
      console.error("Error toggling user status:", error);
      message.error("Failed to update user status");
    }
  };

  const updateUserRole = async (values) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${API_BASE_URL}/users/${currentUser._id}/role`,
        {
          role: values.role,
          ...roleSpecificFields,
        }
      );

      // Update users array with the updated role
      const updatedUsers = users.map((user) =>
        user._id === currentUser._id ? response.data : user
      );

      setUsers(updatedUsers);
      message.success("User role updated successfully");
      setModalVisible(false);
      form.resetFields();
      setRoleSpecificFields({});
      setCurrentUser(null);
      setLoading(false);
    } catch (error) {
      console.error("Error updating user role:", error);
      message.error("Failed to update user role");
      setLoading(false);
    }
  };

  const resetPassword = async (userId) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/users/${userId}/reset-password`
      );
      console.log(data.tempPassword);
      alert(`your temperory password is ${data.tempPassword}`);
      message.success("Password reset email sent successfully");
    } catch (error) {
      console.error("Error resetting password:", error);
      message.error("Failed to reset password");
    }
  };

  // Handler functions
  const handleCreate = () => {
    setModalMode("create");
    setCurrentUser(null);
    setRoleSpecificFields({});
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (user) => {
    setModalMode("edit");
    setCurrentUser(user);

    // Set form fields based on user data
    form.setFieldsValue({
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      contactNumber: user.contactNumber,
      address: user.address,
      // Add role-specific fields based on user type
      ...(user.role === "faculty" && {
        department: user.department?._id,
        designation: user.designation,
        employmentType: user.employmentType,
      }),
      ...(user.role === "student" && {
        department: user.department?._id,
        program: user.program,
        batch: user.batch,
        enrollmentYear: user.enrollmentYear,
      }),
      // Add other role-specific fields as needed
    });

    setModalVisible(true);
  };

  const handleRoleChange = () => {
    setModalMode("role");
    setCurrentUser(currentUser);
    form.setFieldsValue({
      role: currentUser.role,
    });
    setModalVisible(true);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleRoleSelectChange = (value) => {
    // Reset role-specific fields when role changes
    setRoleSpecificFields({});
    form.resetFields([
      "department",
      "designation",
      "employmentType",
      "program",
      "batch",
      "enrollmentYear",
    ]);
  };

  // Form submission handler
  const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (modalMode === "create") {
          createUser(values);
        } else if (modalMode === "edit") {
          updateUser(values);
        } else if (modalMode === "role") {
          updateUserRole(values);
        }
      })
      .catch((err) => {
        console.error("Form validation error:", err);
      });
  };

  // Table columns
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
    },
    {
      title: "Name",
      key: "name",
      render: (text, record) => `${record.firstName} ${record.lastName}`,
      sorter: (a, b) =>
        `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`
        ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={getRoleColor(role)}>{role.toUpperCase()}</Tag>
      ),
      filters: [
        { text: "Admin", value: "admin" },
        { text: "Faculty", value: "faculty" },
        { text: "Student", value: "student" },
        { text: "Library", value: "library" },
        { text: "TNP", value: "tnp" },
        { text: "Finance", value: "finance" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (isActive, record) => (
        <Switch
          checked={isActive}
          onChange={(checked) => toggleUserStatus(record._id, checked)}
        />
      ),
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="small">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
            type="primary"
            ghost
          />
          <Button
            icon={<UserSwitchOutlined />}
            onClick={() => {
              setCurrentUser(record);
              handleRoleChange();
            }}
            size="small"
            type="default"
          />
          <Popconfirm
            title="Reset password for this user?"
            onConfirm={() => resetPassword(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<LockOutlined />} size="small" type="default" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Helper function to get role color for tags
  const getRoleColor = (role) => {
    const colors = {
      admin: "red",
      faculty: "blue",
      student: "green",
      library: "purple",
      tnp: "orange",
      finance: "cyan",
    };
    return colors[role] || "default";
  };

  // Role-specific form fields
  const renderRoleSpecificFields = () => {
    const role = form.getFieldValue("role");

    if (!role) return null;

    switch (role) {
      case "admin":
        return (
          <>
            <Form.Item
              name="adminId"
              label="Admin ID"
              rules={[{ required: true, message: "Please enter admin ID" }]}
            >
              <Input placeholder="Admin ID" />
            </Form.Item>
            <Form.Item name="designation" label="Designation">
              <Input placeholder="Designation" />
            </Form.Item>
            <Form.Item name="permissions" label="Permissions">
              <Select
                mode="multiple"
                placeholder="Select permissions"
                defaultValue={["all"]}
              >
                <Option value="all">All</Option>
                <Option value="users">User Management</Option>
                <Option value="departments">Department Management</Option>
                <Option value="courses">Course Management</Option>
                <Option value="finance">Finance Management</Option>
              </Select>
            </Form.Item>
          </>
        );

      case "faculty":
        return (
          <>
            <Form.Item
              name="facultyId"
              label="Faculty ID"
              rules={[{ required: true, message: "Please enter faculty ID" }]}
            >
              <Input placeholder="Faculty ID" />
            </Form.Item>
            <Form.Item
              name="department"
              label="Department"
              rules={[{ required: true, message: "Please select department" }]}
            >
              <Select placeholder="Select department">
                {Array.isArray(departments) &&
                  departments.map((dept) => (
                    <Option key={dept._id} value={dept._id}>
                      {dept.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item name="designation" label="Designation">
              <Input placeholder="Designation" />
            </Form.Item>
            <Form.Item name="employmentType" label="Employment Type">
              <Select placeholder="Select employment type">
                <Option value="full-time">Full Time</Option>
                <Option value="part-time">Part Time</Option>
                <Option value="visiting">Visiting</Option>
                <Option value="contract">Contract</Option>
              </Select>
            </Form.Item>
            <Form.Item name="joiningDate" label="Joining Date">
              <Input type="date" />
            </Form.Item>
          </>
        );

      case "student":
        return (
          <>
            <Form.Item
              name="studentId"
              label="Student ID"
              rules={[{ required: true, message: "Please enter student ID" }]}
            >
              <Input placeholder="Student ID" />
            </Form.Item>
            <Form.Item
              name="department"
              label="Department"
              rules={[{ required: true, message: "Please select department" }]}
            >
              <Select placeholder="Select department">
                {Array.isArray(departments) &&
                  departments.map((dept) => (
                    <Option key={dept._id} value={dept._id}>
                      {dept.name}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="program"
              label="Program"
              rules={[{ required: true, message: "Please enter program" }]}
            >
              <Input placeholder="Program (e.g., B.Tech, M.Tech)" />
            </Form.Item>
            <Form.Item name="batch" label="Batch">
              <Input placeholder="Batch (e.g., 2022-26)" />
            </Form.Item>
            <Form.Item
              name="enrollmentYear"
              label="Enrollment Year"
              rules={[
                { required: true, message: "Please enter enrollment year" },
              ]}
            >
              <Input type="number" placeholder="Enrollment Year" />
            </Form.Item>
            <Form.Item name="currentSemester" label="Current Semester">
              <Input type="number" placeholder="Current Semester" />
            </Form.Item>
          </>
        );

      case "library":
        return (
          <>
            <Form.Item
              name="staffId"
              label="Staff ID"
              rules={[{ required: true, message: "Please enter staff ID" }]}
            >
              <Input placeholder="Staff ID" />
            </Form.Item>
            <Form.Item name="designation" label="Designation">
              <Input placeholder="Designation" />
            </Form.Item>
            <Form.Item name="permissions" label="Permissions">
              <Select
                mode="multiple"
                placeholder="Select permissions"
                defaultValue={["issue", "return", "catalog"]}
              >
                <Option value="issue">Issue Books</Option>
                <Option value="return">Return Books</Option>
                <Option value="catalog">Manage Catalog</Option>
                <Option value="reports">Generate Reports</Option>
              </Select>
            </Form.Item>
          </>
        );

      case "tnp":
        return (
          <>
            <Form.Item
              name="staffId"
              label="Staff ID"
              rules={[{ required: true, message: "Please enter staff ID" }]}
            >
              <Input placeholder="Staff ID" />
            </Form.Item>
            <Form.Item name="designation" label="Designation">
              <Input placeholder="Designation" />
            </Form.Item>
            <Form.Item name="responsibilities" label="Responsibilities">
              <Select mode="multiple" placeholder="Select responsibilities">
                <Option value="company-relations">Company Relations</Option>
                <Option value="student-training">Student Training</Option>
                <Option value="placement-coordination">
                  Placement Coordination
                </Option>
                <Option value="career-counseling">Career Counseling</Option>
              </Select>
            </Form.Item>
          </>
        );

      case "finance":
        return (
          <>
            <Form.Item
              name="staffId"
              label="Staff ID"
              rules={[{ required: true, message: "Please enter staff ID" }]}
            >
              <Input placeholder="Staff ID" />
            </Form.Item>
            <Form.Item name="designation" label="Designation">
              <Input placeholder="Designation" />
            </Form.Item>
            <Form.Item name="permissions" label="Permissions">
              <Select
                mode="multiple"
                placeholder="Select permissions"
                defaultValue={["view", "create"]}
              >
                <Option value="view">View Financial Records</Option>
                <Option value="create">Create Financial Records</Option>
                <Option value="update">Update Financial Records</Option>
                <Option value="approve">Approve Financial Transactions</Option>
              </Select>
            </Form.Item>
          </>
        );

      default:
        return null;
    }
  };

  // Modal title based on mode
  const getModalTitle = () => {
    switch (modalMode) {
      case "create":
        return "Create New User";
      case "edit":
        return "Edit User";
      case "role":
        return "Change User Role";
      default:
        return "User Details";
    }
  };

  return (
    <div className="user-management">
      <Card
        title="User Management"
        extra={
          <Space>
            <Input
              placeholder="Search users"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearch}
              style={{ width: 200 }}
            />
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={handleCreate}
            >
              Add User
            </Button>
            <Button icon={<ReloadOutlined />} onClick={fetchUsers}>
              Refresh
            </Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={getModalTitle()}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            icon={<SaveOutlined />}
            onClick={handleFormSubmit}
          >
            Save
          </Button>,
        ]}
        width={700}
      >
        <Form form={form} layout="vertical" initialValues={currentUser || {}}>
          {modalMode !== "role" && (
            <>
              <Divider>Basic Information</Divider>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please enter username" }]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>

              {modalMode === "create" && (
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: "Please enter password" }]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
              )}

              <Form.Item
                name="firstName"
                label="First Name"
                rules={[{ required: true, message: "Please enter first name" }]}
              >
                <Input placeholder="First Name" />
              </Form.Item>

              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[{ required: true, message: "Please enter last name" }]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>

              <Form.Item name="contactNumber" label="Contact Number">
                <Input placeholder="Contact Number" />
              </Form.Item>

              <Divider>Address Information</Divider>

              <Form.Item name={["address", "street"]} label="Street">
                <Input placeholder="Street" />
              </Form.Item>

              <Form.Item name={["address", "city"]} label="City">
                <Input placeholder="City" />
              </Form.Item>

              <Form.Item name={["address", "state"]} label="State/Province">
                <Input placeholder="State/Province" />
              </Form.Item>

              <Form.Item name={["address", "zipCode"]} label="ZIP/Postal Code">
                <Input placeholder="ZIP/Postal Code" />
              </Form.Item>

              <Form.Item name={["address", "country"]} label="Country">
                <Input placeholder="Country" />
              </Form.Item>
            </>
          )}

          <Divider>Role Information</Divider>

          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please select role" }]}
          >
            <Select
              placeholder="Select role"
              onChange={handleRoleSelectChange}
              disabled={modalMode === "edit"}
            >
              <Option value="admin">Administrator</Option>
              <Option value="faculty">Faculty</Option>
              <Option value="student">Student</Option>
              <Option value="library">Library Staff</Option>
              <Option value="tnp">Training & Placement</Option>
              <Option value="finance">Finance Staff</Option>
            </Select>
          </Form.Item>

          {renderRoleSpecificFields()}
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
