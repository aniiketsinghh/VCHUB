const SettingsPage = () => {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-6 py-10 flex justify-center">
      
      <div className="w-full max-w-2xl">
        {/* Header */}
        <h1 className="text-3xl font-bold mb-10 text-center">
          Account Settings
        </h1>

        {/* Update User Info */}
        <section className="mb-12 border-b border-gray-700 pb-10">
          <h2 className="text-xl font-semibold mb-4">Update User Info</h2>

          <div className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Full Name"
              className="bg-[#161b22] p-3 rounded-lg outline-none border border-gray-700 focus:border-gray-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="bg-[#161b22] p-3 rounded-lg outline-none border border-gray-700 focus:border-gray-400"
            />

            <button className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg font-medium w-fit">
              Save Changes
            </button>
          </div>
        </section>

        {/* Change Password */}
        <section className="mb-12 border-b border-gray-700 pb-10">
          <h2 className="text-xl font-semibold mb-4">Change Password</h2>

          <div className="flex flex-col gap-5">
            <input
              type="password"
              placeholder="Current Password"
              className="bg-[#161b22] p-3 rounded-lg outline-none border border-gray-700 focus:border-gray-400"
            />

            <input
              type="password"
              placeholder="New Password"
              className="bg-[#161b22] p-3 rounded-lg outline-none border border-gray-700 focus:border-gray-400"
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              className="bg-[#161b22] p-3 rounded-lg outline-none border border-gray-700 focus:border-gray-400"
            />

            <button className="bg-green-600 hover:bg-green-700 transition px-6 py-2 rounded-lg font-medium w-fit">
              Update Password
            </button>
          </div>
        </section>

        {/* Terminate Account */}
        <section className="pt-5">
          <h2 className="text-xl font-semibold text-red-500 mb-4">
            Terminate Account
          </h2>

          <p className="text-gray-400 mb-4">
            Once you delete your account, all your repositories, stars, and
            profile data will be permanently removed from VC Hub. This action
            cannot be undone.
          </p>

          <button className="bg-red-600 hover:bg-red-700 transition px-6 py-2 rounded-lg font-medium">
            Delete My Account
          </button>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
