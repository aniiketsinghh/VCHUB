const CreateRepo = () => {
  return (
    <div className="w-full min-h-screen bg-gray-500 text-white px-6 py-10 flex justify-center">
      
      <div className="w-full max-w-3xl">
        
        <h1 className="text-3xl font-bold mb-2">Create a new repository</h1>
        <p className="text-white font-bold mb-8">
          Repositories contain a project's files and version history. 
        </p>

        {/* STEP 1: GENERAL */}
        <div className="border-l-2 border-gray-700 pl-6 relative mb-10">
          <span className="absolute -left-4 top-1 text-gray-400 text-xl">1</span>

          <h2 className="text-xl font-semibold mb-4">General</h2>

          {/* Owner & Repo Name */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="text-sm font-semibold mb-1 block">Owner *</label>
              <div className="bg-[#161b22] px-4 py-2 rounded-md border border-gray-700">
                aniketsinghh
              </div>
            </div>

            <div className="w-1/2">
              <label className="text-sm font-semibold mb-1 block">Repository name *</label>
              <input
                type="text"
                className="w-full bg-[#0d1117] px-3 py-2 border border-gray-700 rounded-md focus:border-gray-500 outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-5">
            <label className="text-sm font-semibold mb-1 block">Description</label>
            <textarea
              rows="3"
              className="w-full bg-[#0d1117] px-3 py-2 border border-gray-700 rounded-md focus:border-gray-500 outline-none"
              placeholder="Write a short description (optional)"
            ></textarea>
          </div>

        </div>

        {/* STEP 2: CONFIGURATION */}
        <div className="border-l-2 border-gray-700 pl-6 relative mb-16">
          <span className="absolute -left-4 top-1 text-gray-400 text-xl">2</span>

          <h2 className="text-xl font-semibold mb-5">Configuration</h2>

          {/* Visibility */}
          <div className="mb-6">
            <label className="text-sm font-semibold mb-1 block">Choose visibility *</label>
            <select
              className="bg-[#161b22] w-full px-3 py-2 border border-gray-700 rounded-md focus:border-gray-500 outline-none"
            >
              <option>Public</option>
              <option>Private</option>
            </select>
          </div>

          {/* Add README Switch */}
          <div className="flex justify-between items-center bg-[#161b22] px-4 py-3 rounded-md border border-gray-700">
            <div>
              <h3 className="font-semibold">Add README</h3>
              <p className="text-gray-400 text-sm">README helps describe your project.</p>
            </div>

            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 peer-focus:ring-2 rounded-full peer peer-checked:bg-green-600"></div>
              <div className="absolute w-5 h-5 bg-white rounded-full left-1 top-0.5 transition-all peer-checked:left-5"></div>
            </label>
          </div>

        </div>

        {/* CREATE BUTTON */}
        <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-md font-semibold">
          Create repository
        </button>

      </div>

    </div>
  );
};

export default CreateRepo;
