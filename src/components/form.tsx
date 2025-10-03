import React from "react";
import { Link } from "react-router";

type Form = "login" | "register";

interface FormProps {
  handleSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  type: Form;
}

export function Form({ handleSubmit, children, type }: FormProps) {
  function getText() {
    if (type === "login") return "Sign in";
    if (type === "register") return "Sign up";
    return "";
  }

  return (
    <div className="rounded-lg shadow-lg border border-gray-300 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-2xl font-bold">{getText()}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {children}

        <button
          type="submit"
          className="bg-gray-600 text-white py-2 px-4 rounded-md transition transform duration-200 ease-in-out active:scale-95 block mx-auto"
        >
          {getText()}
        </button>
      </form>
      <p className="text-center mt-6 text-sm">
        {type === "login"
          ? "Don't have an account?"
          : "Already have an account?"}
        <Link
          to={type === "login" ? "/register" : "/login"}
          className="font-medium"
        >
          {" "}
          {getText()}
        </Link>
      </p>
    </div>
  );
}
