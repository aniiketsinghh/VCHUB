import { useState, useEffect } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { Link } from "react-router";

// ---------------- NAVBAR ----------------
const Navbar = () => {
  const [active, setActive] = useState("repos");

  return (
    <div className="w-full bg-[#0d1117] text-white flex border-b border-gray-700">

      {/* All Repos */}
      <Link to="/getallrepos" className="w-1/3">
        <button
          onClick={() => setActive("repos")}
          className={`w-full py-4 text-center relative transition ${
            active === "repos"
              ? "font-semibold text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          All Repos
          {active === "repos" && (
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-white rounded-full"></span>
          )}
        </button>
      </Link>

      {/* Issues */}
      <button
        onClick={() => setActive("issues")}
        className={`w-1/3 py-4 text-center relative transition ${
          active === "issues"
            ? "font-semibold text-white"
            : "text-gray-400 hover:text-white"
        }`}
      >
        Issues
        {active === "issues" && (
          <span className="absolute bottom-0 left-0 w-full h-[3px] bg-white rounded-full"></span>
        )}
      </button>

      {/* Star Repo */}
      <button
        onClick={() => setActive("star")}
        className={`w-1/3 py-4 text-center relative transition ${
          active === "star"
            ? "font-semibold text-white"
            : "text-gray-400 hover:text-white"
        }`}
      >
        StarRepo
        {active === "star" && (
          <span className="absolute bottom-0 left-0 w-full h-[3px] bg-white rounded-full"></span>
        )}
      </button>
    </div>
  );
};

// ---------------- MAIN PAGE ----------------
const FetchRepo = () => {
  const [repos, setRepos] = useState([]);
  const [starred, setStarred] = useState({}); // toggle star state

  const handleStar = (id) => {
    setStarred((prev) => ({
      ...prev,
      [id]: !prev[id], // toggle outline ↔ filled
    }));
  };

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5006/api/repo/getallrepos",
          { withCredentials: true }
        );
        setRepos(res.data.repos || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-800 text-gray-200">

      {/* Navbar */}
      <Navbar />

      <div className="w-full text-left px-6 pt-6">
        <h2 className="flex text-3xl font-bold text-white mb-6 justify-center">
          Your Repositories
        </h2>

        {/* Centered Repo Cards */}
        <div className="space-y-4 w-full flex flex-col items-center">

          {repos.map((repo) => (
            <div
              key={repo._id}
              className="bg-gray-700 border border-gray-600 w-3/4 p-5 rounded-xl 
              hover:bg-gray-600 transition cursor-pointer shadow-lg relative"
            >
              {/* ⭐ STAR ICON TOP RIGHT */}
              <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => handleStar(repo._id)}
              >
                <Star
                  size={24}
                  className={`transition 
                    ${starred[repo._id]
                      ? "text-yellow-400 fill-yellow-400" // filled
                      : "text-white" // outline
                    }`}
                />
              </div>

              {/* Repo Name */}
              <p className="text-xl font-semibold text-white">{repo.name}</p>

              {/* Description */}
              <p className="text-gray-300 mt-1">{repo.description}</p>

              {/* ---- DOT + PUBLIC/PRIVATE TEXT ---- */}
              <div className="flex items-center gap-2 mt-3">
                <span
                  className={`w-3 h-3 rounded-full ${
                    repo.visibility.toLowerCase() === "public"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                ></span>

                <span className="capitalize text-gray-300">
                  {repo.visibility.toLowerCase() === "public"
                    ? "Public"
                    : "Private"}
                </span>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default FetchRepo;
