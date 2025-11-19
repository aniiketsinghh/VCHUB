import { Link } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const Section = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5006/api/repo/getallrepos",
          { withCredentials: true }
        );

        // If backend returns { repos: [...] }
        setRepos(res.data.repos || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="w-full h-[calc(100vh-70px)] overflow-y-auto bg-gray-600 text-white">
      <div className="w-full grid grid-cols-12 gap-8 py-10 px-6">
        
        {/* LEFT — 30% */}
        <div className="col-span-4 flex justify-start ml-[20px]">
          <div className="bg-zinc-500 w-90 p-5 rounded-xl">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Top repositories</h2>

              <Link to="/createrepo">
                <button className="bg-green-700 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm">
                  New
                </button>
              </Link>
            </div>

            {/* Search Bar */}
            <input
              type="text"
              placeholder="Find a repository..."
              className="w-full px-3 py-2 rounded-md bg-gray-600 border text-white text-xl font-semibold border-gray-600 focus:outline-none focus:border-gray-400"
            />

            {/* LIST OF REPOSITORIES */}
            <div className="mt-4 bg-gray-700 p-3 rounded-md h-64 overflow-y-auto">
              {repos.length === 0 ? (
                <p className="text-gray-300 text-sm">No repositories found.</p>
              ) : (
                repos.map((repo) => (
                  <Link
                    key={repo._id}
                    to={`/repo/${repo._id}`}
                    className="block bg-gray-600 p-2 rounded-md mb-2 hover:bg-gray-500 transition"
                  >
                    {repo.name}
                  </Link>
                ))
              )}
            </div>

          </div>
        </div>

        {/* MIDDLE — 40% */}
        <div className="col-span-4 flex flex-col items-center text-center justify-center">

          <div className="w-50 h-50 rounded-full flex justify-center items-center mb-2 overflow-hidden">
            <img
              src="/home.png"
              alt="repo-logo"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-3xl font-bold">Create your own repository</h1>
          <p className="mt-3 text-gray-300 max-w-[80%]">
            Manage, track, and version your projects easily with our powerful repository tools.
          </p>
        </div>

        {/* RIGHT — 30% */}
        <div className="col-span-4 flex justify-end mr-[20px]">
          <div className="bg-zinc-500 w-90 p-6 rounded-xl shadow-lg">

            <h2 className="text-2xl font-bold mb-6">How to use it</h2>

            <div className="space-y-6 text-lg">

              <div>
                <h3 className="font-semibold text-white">1. Add</h3>
                <code className="block bg-gray-600 p-3 rounded-md mt-2">
                  vchub add .
                </code>
              </div>

              <div>
                <h3 className="font-semibold text-white">2. Commit</h3>
                <code className="block bg-gray-600 p-3 rounded-md mt-2">
                  vchub commit -m "initial commit"
                </code>
              </div>

              <div>
                <h3 className="font-semibold text-white">3. Push</h3>
                <code className="block bg-gray-600 p-3 rounded-md mt-2">
                  vchub push origin main
                </code>
              </div>

              <div>
                <h3 className="font-semibold text-white">4. Pull</h3>
                <code className="block bg-gray-600 p-3 rounded-md mt-2">
                  vchub pull origin main
                </code>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Section;
