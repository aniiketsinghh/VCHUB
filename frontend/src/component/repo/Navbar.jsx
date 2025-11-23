import { Link, useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();

  // Automatically detect active tab based on route
  const getActive = () => {
    if (location.pathname.startsWith("/getallrepos")) return "repos";
    if (location.pathname.startsWith("/getstarredrepos")) return "star";
    if (location.pathname.startsWith("/issues")) return "issues";
    return "repos";
  };

  const active = getActive();

  return (
    <div className="w-full bg-[#0d1117] text-white flex justify-between border-b border-gray-700">

      {/* All Repos */}
      <Link to="/getallrepos" className="w-1/3">
        <button
          className={`w-full py-4 text-center relative transition 
            ${active === "repos" ? "font-semibold text-white" : "opacity-70 hover:opacity-100"}
          `}
        >
          All Repos

          {active === "repos" && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[3px] bg-white rounded-full"></span>
          )}
        </button>
      </Link>

      {/* Issues */}
      <button
        className={`w-1/3 py-4 text-center relative transition
          ${active === "issues" ? "font-semibold text-white" : "opacity-70 hover:opacity-100"}
        `}
      >
        Issues
        {active === "issues" && (
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[3px] bg-white rounded-full"></span>
        )}
      </button>

      {/* Star Repo */}
      <Link to="/starrepo" className="w-1/3">
        <button
          className={`w-full py-4 text-center relative transition  
            ${active === "star" ? "font-semibold text-white" : "opacity-70 hover:opacity-100"}
          `}
        >
          StarRepo
          {active === "star" && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-[3px] bg-white rounded-full"></span>
          )}
        </button>
      </Link>

    </div>
  );
};

export default Navbar;
