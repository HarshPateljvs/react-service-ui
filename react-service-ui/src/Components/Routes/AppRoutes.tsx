import { lazy } from "react";
import { UserRole } from "./UserRole";
import ProtectedRoute from "./ProtectedRoute";
import { Navigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import Groups3Icon from '@mui/icons-material/Groups3';
const Layout1 = lazy(
  () => import("../../Library/Components/Common/Layout1/Layout1")
);
const Layout2 = lazy(
  () => import("../../Library/Components/Common/Layout2/Layout2")
);
const Demoredux = lazy(() => import("../Master/User/Demoredux"));
const UserList = lazy(() => import("../Master/User/UserList"));
const AdminDashboard = lazy(() => import("../Master/Other/AdminDashboard"));
const TeacherPanel = lazy(() => import("../Master/Other/TeacherPanel"));
const StudentHome = lazy(() => import("../Master/Other/StudentHome"));
const EmployeeList = lazy(() => import("../Master/Employee/EmployeeList"));
const Home = lazy(() => import("../Master/Other/Home"));

export const AppRoutes: AppRoute[] = [
  {
    path: "/Dashboard",
    element: (
      <ProtectedRoute>
        <Layout1 />
      </ProtectedRoute>
    ),
    label: "Dashboard",
    icon: <DashboardIcon />,
    children: [
      {
        path: "", // this matches "/Dashboard"
        element: <Navigate to="home" replace />, // redirect to the default child
      },
      {
        path: "home",
        element: <Home />,
        showInNavbar: true,
        label: "Home",
        allowedRoles: [UserRole.Student, UserRole.Admin],
        icon: <HomeIcon />,
      },
      {
        path: "employee",
        element: <EmployeeList />,
        showInNavbar: true,
        label: "Employee",
        allowedRoles: [UserRole.Admin],
        icon: <PeopleIcon />,
      },
      {
        path: "teacher-panel",
        element: <TeacherPanel />,
        showInNavbar: true,
        label: "Teacher Panel",
        allowedRoles: [UserRole.Teacher, UserRole.Admin],
        icon: <SchoolIcon />,
      },
      {
        path: "student-home",
        element: <StudentHome />,
        showInNavbar: true,
        label: "Student Home",
        allowedRoles: [UserRole.Student, UserRole.Admin],
        icon: <Groups3Icon />,
      }
      
    ],
  },
  {
    path: "/Home",
    element: <Layout1 />,
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
