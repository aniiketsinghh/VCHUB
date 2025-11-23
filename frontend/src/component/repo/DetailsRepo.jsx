import { useEffect, useState } from "react";
import axios from "axios";
import { Folder, File } from "lucide-react";

const AllFiles = ({ repoName }) => {
  const [tree, setTree] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch S3 folder-tree
  useEffect(() => {
    const fetchTree = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5006/api/repo/${repoName}/files`,
          { withCredentials: true }
        );
        setTree(res.data.tree);
      } catch (err) {
        console.error("Error fetching files:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTree();
  }, [repoName]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading files...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0d1117] text-white flex flex-col">
      {/* HEADER */}
      <div className="border-b border-gray-700 p-5 text-2xl font-semibold">
        📁 Files in <span className="text-blue-400">{repoName}</span>
      </div>

      {/* MAIN CONTENT */}
      <div className="p-6">
        <TreeView tree={tree} />
      </div>
    </div>
  );
};

/* ---------------------------------------------------
   GITHUB STYLE RECURSIVE FOLDER TREE COMPONENT
--------------------------------------------------- */
const TreeView = ({ tree }) => {
  return (
    <ul className="pl-4 space-y-1">
      {Object.entries(tree).map(([name, value]) => (
        <li key={name}>
          {value === "file" ? (
            <div className="flex items-center gap-2 hover:bg-[#161b22] p-1 rounded-md cursor-pointer">
              <File size={16} className="text-gray-400" />
              <span className="text-gray-300">{name}</span>
            </div>
          ) : (
            <details className="group">
              <summary className="cursor-pointer flex items-center gap-2 hover:bg-[#161b22] p-1 rounded-md">
                <Folder size={16} className="text-yellow-400" />
                <span className="text-gray-200">{name}</span>
              </summary>

              <div className="ml-6 border-l border-gray-700 pl-3 mt-1">
                <TreeView tree={value} />
              </div>
            </details>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AllFiles;
