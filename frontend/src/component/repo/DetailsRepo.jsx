import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

const RepoFilesPage = () => {
  const { repoName } = useParams();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // Backend only returns file list + signed URLs
        const res = await axios.get(
          `http://localhost:5006/api/repo/${repoName}/files`
        );

        setFiles(res.data.files);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFiles();
  }, [repoName]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6">
      <h1 className="text-2xl font-bold mb-4">{repoName}</h1>

      <div className="space-y-2">
        {files.map((file) => (
          <div
            key={file.key}
            className="p-3 bg-gray-800 rounded hover:bg-gray-700 cursor-pointer"
            onClick={() => window.open(file.url, "_blank")}
          >
            {file.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepoFilesPage;
