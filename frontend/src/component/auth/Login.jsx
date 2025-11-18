import { useState } from "react";
import { Link } from "react-router";

const Login = () => {
  const [form,setForm]=useState({
    email:"",
    password:"",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT SIDE FORM */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-20">
        <h1 className="text-4xl font-bold mb-3">Welcome Back</h1>
        <p className="text-gray-600 mb-8">
          Log in to your VCHUB account and continue exploring your repositories.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Email Address</label>
            <input
              type="email"
              className="border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              value={form.email}
              onChange={(e) => setForm({...form,email:e.target.value})}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="mb-1 text-gray-700">Password</label>
            <input
              type="password"
              className="border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              value={form.password}
              onChange={(e) => setForm({...form,password:e.target.value})}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-[#0f172a] text-white py-2 rounded-md hover:bg-[#1e293b] transition"
          >
            Log In
          </button>
        </form>

        <p className="mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div className="hidden md:flex w-1/2 bg-[#0f172a] text-white flex-col justify-center px-16">
        <h2 className="text-4xl font-bold mb-4">Welcome to VCHUB CLI</h2>
        <p className="text-gray-300 mb-6 leading-relaxed">
          A lightweight and developer-friendly version control system designed
          for beginners. Log in and continue managing your commits, pushes,
          branches, and repositories seamlessly.
        </p>

        <ul className="space-y-3 text-gray-300">
          <li>✔ Track your repositories easily</li>
          <li>✔ Continue from where you left</li>
          <li>✔ Super fast, simple & secure</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
