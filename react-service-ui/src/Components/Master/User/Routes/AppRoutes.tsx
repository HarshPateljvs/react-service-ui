import Layout from "../../../../Library/Components/Common/Layout";
import Login from "../../../../Library/Components/Common/Login";
import Demoredux from "../Demoredux";
import UserList from "../UserList";

export const AppRoutes: AppRoute[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "users", element: <UserList />, showInNavbar: true, label: "users" },
      { path: "demoredux", element: <Demoredux />, showInNavbar: true,label:"demoredux" },
      { path: "login", element: <Login />,   showInNavbar: true ,label:"login"},
    ],
  },
];
