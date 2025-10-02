import { createBrowserRouter, Outlet } from "react-router";
import { PrivateRoute } from "./prvate-route";
import { Login } from "../pages/login/login";
import { Register } from "../pages/register/register";
import { Home } from "../pages/home/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Outlet />
      </PrivateRoute>
    ),
    children: [{ path: "/", element: <Home /> }],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
