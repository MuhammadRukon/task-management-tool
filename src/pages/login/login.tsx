import { Navigate } from "react-router";

export function Login() {
  // TODO: replace with actual user check
  const user = true;
  if (user) return <Navigate to="/" />;

  return <div>login</div>;
}
