import { useState } from "react";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // TODO: connect with backend
  };

  return (
    <div className="w-full h-screen flex bg-gray-100">
      
      {/* LEFT FORM SECTION */}
      <div className="w-[40%] bg-white shadow-lg flex flex-col justify-center px-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create your VCHUB Account</h1>

        <p className="text-gray-500 mb-6">
          Version control system made for developers using Yargs CLI.
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-gray-500 outline-none"
              onChange={(e)=>setForm({...form,username:e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-gray-500 outline-none"
              onChange={(e)=>setForm({...form,email:e.target.value})}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-gray-500 outline-none"
              onChange={(e)=>setForm({...form,password:e.target.value})}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-all"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-600 mt-5">
          Already have an account?{" "}
          <a className="text-gray-900 font-semibold hover:underline" href="/login">
            Log In
          </a>
        </p>
      </div>

      {/* RIGHT INFO SECTION */}
      <div className="w-[60%] bg-gray-900 text-gray-200 flex flex-col justify-center px-20">
        <h1 className="text-4xl font-bold mb-5">
          Introducing <span className="text-white">VCHUB CLI</span>
        </h1>

        <p className="text-lg leading-relaxed max-w-xl">
          A fast and simple version control system built using Yargs.
          <br />  
          Manage commits, pushes, pulls, branches and revert operations —  
          everything stored securely in your local environment and cloud.
          <br /><br />
          Inspired by Git but designed for beginners who want complete control
          while learning version control fundamentals.
        </p>

        <ul className="mt-6 space-y-3 text-gray-300">
          <li>✔ CLI commands using Yargs</li>
          <li>✔ Commit, Push, Pull, Branch, Revert</li>
          <li>✔ Super lightweight and developer-friendly</li>
          <li>✔ Perfect for learning version control</li>
        </ul>

        <button className="mt-10 px-6 py-3 bg-white text-gray-900 rounded-md font-semibold hover:bg-gray-300 transition-all w-fit">
          Learn More →
        </button>
      </div>

    </div>
  );
};

export default Signup;
