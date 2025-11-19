import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5006/api/user/profile",
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-xl">

        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-600">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p className="text-gray-300">{user.email}</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
          <div className="bg-gray-700 p-4 rounded-xl">
            <h2 className="text-xl font-bold">{user.reposCount || 0}</h2>
            <p className="text-gray-300 text-sm">Repositories</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-xl">
            <h2 className="text-xl font-bold">{user.followers || 0}</h2>
            <p className="text-gray-300 text-sm">Followers</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-xl">
            <h2 className="text-xl font-bold">{user.following || 0}</h2>
            <p className="text-gray-300 text-sm">Following</p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-8 bg-gray-700 p-5 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">Bio</h2>
          <p className="text-gray-300">{user.bio || "No bio added yet…"}</p>
        </div>

        {/* User Repositories */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Your Repositories</h2>

          {user.repos && user.repos.length > 0 ? (
            user.repos.map((repo) => (
              <div
                key={repo._id}
                className="bg-gray-700 p-4 mb-3 rounded-xl hover:bg-gray-600 transition cursor-pointer"
              >
                <h3 className="text-xl font-bold">{repo.title}</h3>
                <p className="text-gray-300 text-sm line-clamp-2">
                  {repo.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No repositories yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
