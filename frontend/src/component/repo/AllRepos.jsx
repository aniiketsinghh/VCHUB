import { useState, useEffect } from "react";
import axios from "axios";
import Repo from "./Structure"; // make sure name matches your file

const FetchRepo = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      const res = await axios.get("http://localhost:5006/api/repo/getallrepos", {
        withCredentials: true,
      });

      // if backend sends { repos: [...] }
      setRepos(res.data.repos || res.data);
    };

    FetchData();
  }, []);

  return (
    <>
      <div className="w-3/4 mx-auto min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          All Repositories
        </h1>

        <div className="grid grid-cols-4 gap-6">
          {repos.map((repo) => (
            <Repo key={repo._id} repo={repo} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FetchRepo;
