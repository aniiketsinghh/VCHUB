import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/useContext";

const CreateRepo = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [repos, setRepos] = useState({
    name: "",
    description: "",
    visibility: "Public",
    content: [],
  });

  const handleCreate = async () => {
    if (!repos.name.trim()) {
      alert("Repository name is required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5006/api/repo/createrepo",
        repos,
        { withCredentials: true }
      );
      console.log(res);
      alert("Repository created successfully");
      navigate("/getallrepos");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0d1117] text-white px-6 py-12 flex justify-center">
      <div className="w-full max-w-3xl">

        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-2">Create a new repository</h1>
        <p className="text-gray-300 mb-10 text-lg">
          Repositories contain all the files for your project and store its version history.
        </p>

        {/* STEP 1 */}
        <div className="border-l-2 border-gray-700 pl-7 relative mb-14">
          <span className="absolute -left-4 top-1 text-gray-500 text-xl font-semibold">1</span>

          <h2 className="text-2xl font-semibold mb-6">General</h2>

          {/* Owner + Repo Name */}
          <div className="flex gap-4">
            
            {/* Owner */}
            <div className="w-1/2">
              <label className="text-sm font-semibold mb-1 block text-gray-300">Owner *</label>
              <div className="bg-[#161b22] px-4 py-2 rounded-lg border border-gray-700 text-gray-200">
                {user.username}
              </div>
            </div>

            {/* Repo Name */}
            <div className="w-1/2">
              <label className="text-sm font-semibold mb-1 block text-gray-300">Repository name *</label>
              <input
                type="text"
                className="w-full bg-[#13161b] px-3 py-2 rounded-lg border border-gray-700
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="my-awesome-repo"
                value={repos.name}
                onChange={(e) => setRepos({ ...repos, name: e.target.value })}
              />
            </div>

          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="text-sm font-semibold mb-1 block text-gray-300">Description (optional)</label>
            <textarea
              rows="3"
              className="w-full bg-[#13161b] px-3 py-3 rounded-lg border border-gray-700
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Write a short description about your project..."
              value={repos.description}
              onChange={(e) => setRepos({ ...repos, description: e.target.value })}
            ></textarea>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="border-l-2 border-gray-700 pl-7 relative mb-20">
          <span className="absolute -left-4 top-1 text-gray-500 text-xl font-semibold">2</span>

          <h2 className="text-2xl font-semibold mb-6">Configuration</h2>

          {/* Visibility */}
          <div className="mb-8">
            <label className="text-sm font-semibold mb-1 block text-gray-300">Choose visibility *</label>

            <select
              className="w-full bg-[#161b22] px-4 py-2 rounded-lg border border-gray-700
              focus:border-blue-500 outline-none transition text-gray-200"
              value={repos.visibility}
              onChange={(e) => setRepos({ ...repos, visibility: e.target.value })}
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>

          {/* Add README (Not implemented) */}
          <div className="flex justify-between items-center bg-[#161b22] px-5 py-4 rounded-lg
          border border-gray-700 hover:border-gray-500 transition">
            <div>
              <h3 className="font-semibold text-gray-200">Add README</h3>
              <p className="text-gray-400 text-sm">A README helps people understand your project.</p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-checked:bg-green-600 transition"></div>
              <div className="absolute w-5 h-5 bg-white rounded-full left-1 top-0.5 transition-all peer-checked:left-5"></div>
            </label>
          </div>
        </div>

        {/* Create Button */}
        <button
          onClick={handleCreate}
          className="bg-green-600 hover:bg-green-700 transition px-7 py-3 rounded-lg text-lg font-semibold shadow-md"
        >
          Create repository
        </button>

      </div>
    </div>
  );
};

export default CreateRepo;
