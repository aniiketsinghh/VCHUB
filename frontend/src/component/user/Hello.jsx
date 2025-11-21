const Profile = () => {
  return (
    <div className="min-h-screen w-full bg-[#0d1117] flex justify-center py-14 px-4">
      <div className="bg-[#161b22] w-full max-w-lg rounded-2xl border border-[#30363d] p-8 shadow-xl text-center">

        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src="https://i.postimg.cc/Pr8M4Qdv/avatar.png"
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-green-600 object-cover shadow-md"
          />
        </div>

        {/* Name + Email */}
        <h1 className="text-white text-3xl font-semibold mt-5">Aniket Singh</h1>
        <p className="text-gray-400 text-sm mt-1">aniket@example.com</p>

        {/* Followers + Following */}
        <div className="flex justify-between mt-7 mb-6 gap-4">
          <div className="w-1/2 bg-[#21262d] rounded-xl p-4 border border-[#30363d]">
            <h2 className="text-white text-2xl font-semibold">120</h2>
            <p className="text-gray-400 text-sm mt-1">Followers</p>
          </div>
          <div className="w-1/2 bg-[#21262d] rounded-xl p-4 border border-[#30363d]">
            <h2 className="text-white text-2xl font-semibold">98</h2>
            <p className="text-gray-400 text-sm mt-1">Following</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-gray-300 leading-6 mb-8">
         Open-source is more than just code — it’s a community of passionate developers who believe in learning, building, and solving problems together.
        </p>

        {/* Footer Tag */}
        <div className="bg-green-600 text-white py-3 rounded-xl font-semibold text-lg shadow-md">
          ❤️ VCHUB Family Member
        </div>

      </div>
    </div>
  );
};

export default Profile;
