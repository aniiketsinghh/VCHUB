import { useNavigate } from "react-router";

const Repo = ({ repo }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/repo/${repo._id}`)}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 hover:shadow-lg transition cursor-pointer"
    >
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
        {repo.title}
      </h2>

      <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-3">
        {repo.description}
      </p>

      <div className="flex justify-between items-center mt-4 text-gray-600 dark:text-gray-300 text-sm">
        <span>{repo.updated}</span>

        <button className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1">
          ⭐ {repo.stars}
        </button>
      </div>
    </div>
  );
};

export default Repo;
