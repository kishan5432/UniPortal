import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Common Pages
import LoginPage from "./pages/common/LoginPage";
import UnauthorizedPage from "./pages/common/UnauthorizedPage";
import NotFoundPage from "./pages/common/NotFoundPage";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import DepartmentManagement from "./pages/admin/DepartmentManagement";
import AcademicManagement from "./pages/admin/AcademicManagement";
import SystemConfig from "./pages/admin/SystemConfig";
import AdminReports from "./pages/admin/Reports";

// Faculty Pages
import FacultyDashboard from "./pages/faculty/Dashboard";
import CourseManagement from "./pages/faculty/CourseManagement";
import StudentAssessment from "./pages/faculty/StudentAssessment";
import FacultyCommunication from "./pages/faculty/Communication";
import ResearchPublications from "./pages/faculty/ResearchPublications";
import FacultyProfile from "./pages/faculty/Profile";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import AcademicInfo from "./pages/student/AcademicInfo";
import FinancialManagement from "./pages/student/FinancialManagement";
import CourseRegistration from "./pages/student/CourseRegistration";
import StudentCommunication from "./pages/student/Communication";
import StudentProfile from "./pages/student/Profile";

// Library Pages
import LibraryDashboard from "./pages/library/Dashboard";
import CatalogManagement from "./pages/library/CatalogManagement";
import CirculationManagement from "./pages/library/CirculationManagement";
import LibraryUserManagement from "./pages/library/UserManagement";
import InventoryManagement from "./pages/library/InventoryManagement";
import LibraryReports from "./pages/library/Reports";

// TNP Pages
import TNPDashboard from "./pages/tnp/Dashboard";
import CompanyManagement from "./pages/tnp/CompanyManagement";
import JobManagement from "./pages/tnp/JobManagement";
import StudentPlacementManagement from "./pages/tnp/StudentManagement";
import EventManagement from "./pages/tnp/EventManagement";
import TNPReports from "./pages/tnp/Reports";

// Finance Pages
import FinanceDashboard from "./pages/finance/Dashboard";
import FeeManagement from "./pages/finance/FeeManagement";
import PayrollManagement from "./pages/finance/PayrollManagement";
import BudgetManagement from "./pages/finance/BudgetManagement";
import AccountsManagement from "./pages/finance/AccountsManagement";
import FinancialReports from "./pages/finance/Reports";

// Protected Route Component
import ProtectedRoute from "./routes/ProtectedRoute";

// Layout Components
import AdminLayout from "./layouts/AdminLayout";
import FacultyLayout from "./layouts/FacultyLayout";
import StudentLayout from "./layouts/StudentLayout";
import LibraryLayout from "./layouts/LibraryLayout";
import TNPLayout from "./layouts/TNPLayout";
import FinanceLayout from "./layouts/FinanceLayout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route
                path="/admin/departments"
                element={<DepartmentManagement />}
              />
              <Route path="/admin/academics" element={<AcademicManagement />} />
              <Route path="/admin/system" element={<SystemConfig />} />
              <Route path="/admin/reports" element={<AdminReports />} />
            </Route>
          </Route>

          {/* Faculty Routes */}
          <Route element={<ProtectedRoute allowedRoles={["faculty"]} />}>
            <Route element={<FacultyLayout />}>
              <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
              <Route path="/faculty/courses" element={<CourseManagement />} />
              <Route
                path="/faculty/assessment"
                element={<StudentAssessment />}
              />
              <Route
                path="/faculty/communication"
                element={<FacultyCommunication />}
              />
              <Route
                path="/faculty/research"
                element={<ResearchPublications />}
              />
              <Route path="/faculty/profile" element={<FacultyProfile />} />
            </Route>
          </Route>

          {/* Student Routes */}
          <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
            <Route element={<StudentLayout />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/academics" element={<AcademicInfo />} />
              <Route
                path="/student/finance"
                element={<FinancialManagement />}
              />
              <Route
                path="/student/registration"
                element={<CourseRegistration />}
              />
              <Route
                path="/student/communication"
                element={<StudentCommunication />}
              />
              <Route path="/student/profile" element={<StudentProfile />} />
            </Route>
          </Route>

          {/* Library Routes */}
          <Route element={<ProtectedRoute allowedRoles={["library"]} />}>
            <Route element={<LibraryLayout />}>
              <Route path="/library/dashboard" element={<LibraryDashboard />} />
              <Route path="/library/catalog" element={<CatalogManagement />} />
              <Route
                path="/library/circulation"
                element={<CirculationManagement />}
              />
              <Route
                path="/library/users"
                element={<LibraryUserManagement />}
              />
              <Route
                path="/library/inventory"
                element={<InventoryManagement />}
              />
              <Route path="/library/reports" element={<LibraryReports />} />
            </Route>
          </Route>

          {/* TNP Routes */}
          <Route element={<ProtectedRoute allowedRoles={["tnp"]} />}>
            <Route element={<TNPLayout />}>
              <Route path="/tnp/dashboard" element={<TNPDashboard />} />
              <Route path="/tnp/companies" element={<CompanyManagement />} />
              <Route path="/tnp/jobs" element={<JobManagement />} />
              <Route
                path="/tnp/students"
                element={<StudentPlacementManagement />}
              />
              <Route path="/tnp/events" element={<EventManagement />} />
              <Route path="/tnp/reports" element={<TNPReports />} />
            </Route>
          </Route>

          {/* Finance Routes */}
          <Route element={<ProtectedRoute allowedRoles={["finance"]} />}>
            <Route element={<FinanceLayout />}>
              <Route path="/finance/dashboard" element={<FinanceDashboard />} />
              <Route path="/finance/fees" element={<FeeManagement />} />
              <Route path="/finance/payroll" element={<PayrollManagement />} />
              <Route path="/finance/budget" element={<BudgetManagement />} />
              <Route
                path="/finance/accounts"
                element={<AccountsManagement />}
              />
              <Route path="/finance/reports" element={<FinancialReports />} />
            </Route>
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
