import { RouterProvider } from "react-router/dom";
import { router } from "./routes/public-routes";
import { AuthProvider } from "./contexts/AuthContext";
import { TaskProvider } from "./contexts/taskContext";

export function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <RouterProvider router={router} />
      </TaskProvider>
    </AuthProvider>
  );
}
