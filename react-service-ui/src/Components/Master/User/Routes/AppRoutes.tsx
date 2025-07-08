import { lazy } from "react";
import { UserRole } from "./UserRole";

const Layout = lazy(
  () => import("../../../../Library/Components/Common/Layout")
);
const Login = lazy(() => import("../../../../Library/Components/Common/Login"));
const Demoredux = lazy(() => import("../Demoredux"));
const UserList = lazy(() => import("../UserList"));
const AdminDashboard = lazy(() => import("../../Other/AdminDashboard"));
const TeacherPanel = lazy(() => import("../../Other/TeacherPanel"));
const StudentHome = lazy(() => import("../../Other/StudentHome"));

export const AppRoutes: AppRoute[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/Home",
    element: <Layout />,
    children: [
      {
        path: "users",
        element: <UserList />,
        showInNavbar: true,
        label: "Users",
        allowedRoles: [UserRole.Admin]
      },  
      {
        path: "demoredux",
        element: <Demoredux />,
        showInNavbar: true,
        label: "Redux Demo",
        allowedRoles: [UserRole.Admin, UserRole.Teacher],
      },
      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
        showInNavbar: true,
        label: "Admin Dashboard",
        allowedRoles: [UserRole.Admin],
      },
      {
        path: "teacher-panel",
        element: <TeacherPanel />,
        showInNavbar: true,
        label: "Teacher Panel",
        allowedRoles: [UserRole.Teacher],
      },
      {
        path: "student-home",
        element: <StudentHome />,
        showInNavbar: true,
        label: "Student Home",
        allowedRoles: [UserRole.Student],
      },
    ],
  },
];
