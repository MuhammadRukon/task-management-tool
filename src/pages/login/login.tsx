import { useState } from "react";
import { Input } from "../../components/input";
import { Form } from "../../components/form";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // TODO: replace with actual user check
  // const user = false;
  // if (user) return <Navigate to="/" />;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //TODO: validate email and passwor
    //TODO: implement login logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Form type="login" handleSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        </Form>
      </div>
    </div>
  );
}
