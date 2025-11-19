import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const RepoDetails = () => {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5006/api/repo/getrepobyid/${id}`,
          { withCredentials: true }
        );
        setRepo(res.data.repo);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRepo();
  }, [id]);

  if (!repo) return <div className="text-white p-5">Loading...</div>;

  return (
    <div className="p-10 text-white bg-gray-700 min-h-screen">
      <h1 className="text-4xl font-bold mb-3">{repo.name}</h1>
      <p className="text-gray-300 mb-6">{repo.description || "No description"}</p>

      <div className="bg-gray-600 p-5 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-2">Contents</h2>
        {repo.content.length === 0 ? (
          <p className="text-gray-300">No files in this repo.</p>
        ) : (
          <ul className="list-disc ml-5">
            {repo.content.map((file, idx) => (
              <li key={idx}>{file}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-gray-600 p-5 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Stars ⭐</h2>
        <p>{repo.stars.length} users starred this repo.</p>
      </div>
    </div>
  );
};

export default RepoDetails;
