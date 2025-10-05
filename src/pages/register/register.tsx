import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { Input } from "../../components/input";
import { Form } from "../../components/form";
import { useAuth } from "../../hooks/useAuth";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { user, register, error, clearError } = useAuth();

  useEffect(() => {
    clearError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (user) return <Navigate to="/" />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email != confirmEmail) {
      alert("Emails do not match");
      return;
    }
    if (password != confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await register(name, email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Form type="register" handleSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <Input
            label="Confirm Email"
            type="email"
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******"
            showPassword={showPassword}
            onShowPassword={() => setShowPassword((prev) => !prev)}
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="******"
            showPassword={showConfirmPassword}
            onShowPassword={() => setShowConfirmPassword((prev) => !prev)}
          />
          {error && <p className="text-red-500">{error}</p>}
        </Form>
      </div>
    </div>
  );
}
