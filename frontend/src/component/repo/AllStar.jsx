import { useState, useEffect } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import Navbar from "./Navbar";

const StarredRepos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStarred = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5006/api/repo/getstarredrepos",
          { withCredentials: true }
        );
        setRepos(res.data.repos);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStarred();
  }, []);

  const toggleStar = async (repoId) => {
    try {
      await axios.patch(
        `http://localhost:5006/api/repo/togglerepostarbyid/${repoId}`,
        {},
        { withCredentials: true }
      );

      // starred list se remove (because user unstar karta hai)
      setRepos((prev) => prev.filter((r) => r._id !== repoId));
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <div className="text-center pt-10 text-lg text-gray-300">
        Loading starred repos...
      </div>
    );

  return (
    <div>
      <Navbar />

      <div className="px-10 py-8 text-white">
        <h1 className="text-3xl font-semibold mb-8">⭐ Starred Repositories</h1>

        {repos.length === 0 ? (
          <div className="text-gray-400 text-xl">
            No starred repositories found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.map((repo) => (
              <div
                key={repo._id}
                className="border border-gray-700 bg-[#0d1117] rounded-xl p-6 shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">{repo.name}</h2>

                  <button
                    onClick={() => toggleStar(repo._id)}
                    className="p-2 rounded-full border border-yellow-500 hover:bg-[#1a1f24] transition"
                  >
                    <Star className="w-6 h-6 text-yellow-500" />
                  </button>
                </div>

                <p className="text-gray-400 mt-2 mb-4 text-sm">
                  {repo.description || "No description"}
                </p>

                <div className="text-xs text-gray-500">
                  Created: {new Date(repo.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StarredRepos;
