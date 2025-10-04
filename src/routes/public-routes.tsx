import { createBrowserRouter } from "react-router";
import { Login } from "../pages/login/login";
import { Register } from "../pages/register/register";
import { Board } from "../pages/board/board";

export const router = createBrowserRouter([
  { path: "/", element: <Board /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);
