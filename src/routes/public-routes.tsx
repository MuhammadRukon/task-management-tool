import { createBrowserRouter, Outlet } from "react-router";
import { PrivateRoute } from "./prvate-route";
import { Login } from "../pages/login/login";
import { Register } from "../pages/register/register";
import { Board } from "../pages/board/board";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Outlet />
      </PrivateRoute>
    ),
    children: [{ path: "/", element: <Board /> }],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
