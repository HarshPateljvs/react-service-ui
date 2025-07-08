import { lazy } from "react";
import { UserRole } from "./UserRole";
import ProtectedRoute from "./ProtectedRoute";

const Layout = lazy(
  () => import("../../Library/Components/Common/Layout")
);
const Login = lazy(() => import("../../Library/Components/Common/Login"));
const Demoredux = lazy(() => import("../Master/User/Demoredux"));
const UserList = lazy(() => import("../Master/User/UserList"));
const AdminDashboard = lazy(() => import("../Master/Other/AdminDashboard"));
const TeacherPanel = lazy(() => import("../Master/Other/TeacherPanel"));
const StudentHome = lazy(() => import("../Master/Other/StudentHome"));
const EmployeeList = lazy(() => import("../Master/Employee/EmployeeList"));

export const AppRoutes: AppRoute[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Dashboard",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "employee",
        element: <EmployeeList />,
        showInNavbar: true,
        label: "Employee",
        allowedRoles: [UserRole.Admin],
      },
    ],
  },
  {
    path: "/Home",
    element: <Layout />,
    children: [
      {
        path: "users",
        element: <UserList />,
        showInNavbar: false,
        label: "Users",
        allowedRoles: [UserRole.Admin],
      },
      {
        path: "demoredux",
        element: <Demoredux />,
        showInNavbar: false,
        label: "Redux Demo",
        allowedRoles: [UserRole.Admin, UserRole.Teacher],
      },
      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
        showInNavbar: false,
        label: "Admin Dashboard",
        allowedRoles: [UserRole.Admin],
      },
      {
        path: "teacher-panel",
        element: <TeacherPanel />,
        showInNavbar: false,
        label: "Teacher Panel",
        allowedRoles: [UserRole.Teacher],
      },
      {
        path: "student-home",
        element: <StudentHome />,
        showInNavbar: false,
        label: "Student Home",
        allowedRoles: [UserRole.Student],
      },
      {
        path: "users",
        element: <UserList />,
        showInNavbar: false,
        label: "Users",
        allowedRoles: [UserRole.Admin],
      },
      {
        path: "demoredux",
        element: <Demoredux />,
        showInNavbar: false,
        label: "Redux Demo",
        allowedRoles: [UserRole.Admin, UserRole.Teacher],
      },
      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
        showInNavbar: false,
        label: "Admin Dashboard",
        allowedRoles: [UserRole.Admin],
      },
      {
        path: "teacher-panel",
        element: <TeacherPanel />,
        showInNavbar: false,
        label: "Teacher Panel",
        allowedRoles: [UserRole.Teacher],
      },
      {
        path: "student-home",
        element: <StudentHome />,
        showInNavbar: false,
        label: "Student Home",
        allowedRoles: [UserRole.Student],
      },
    ],
  },
];
