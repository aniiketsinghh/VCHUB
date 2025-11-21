import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "./context/useContext"; // <-- your auth context

import {
  Search,
  Plus,
  Bell,
  User,
  LogOut,
  Settings,
  Star,
  FolderGit2,
  UserCircle,
  LayoutDashboard
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // dynamic user
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // LOGOUT
  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5006/api/user/logout", {
        withCredentials: true,
      });

      setUser(null); // clear user from context
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-[#1f2937] border-b border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <LayoutDashboard className="w-7 h-7 text-white" />
              <span className="text-xl font-bold text-white tracking-wide">
                VCHUB
              </span>
            </div>
          </Link>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6">

          {/* SEARCH BAR */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search repositories..."
              className="pl-10 pr-3 py-2 w-72 bg-gray-200 hover:bg-gray-100 border border-gray-500 rounded-lg text-gray-800"
            />
            <Search className="absolute top-2.5 left-2 w-4 h-4 text-gray-600" />
          </div>

          {/* BUTTONS */}
          <button className="px-4 py-1.5 bg-gray-200 rounded-lg border border-gray-500 hover:bg-gray-100">
            StarRepo
          </button>

          <button className="px-4 py-1.5 bg-gray-200 rounded-lg border border-gray-500 hover:bg-gray-100">
            Explore
          </button>

          <Link to="/createrepo">
            <button className="p-2 bg-gray-200 border border-gray-500 rounded-lg hover:bg-gray-100">
              <Plus className="w-5 h-5 text-gray-800" />
            </button>
          </Link>

          <button className="p-2 bg-gray-200 border border-gray-500 rounded-lg hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-800" />
          </button>

          {/* USER DROPDOWN */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 flex items-center bg-gray-200 border border-gray-500 rounded-lg hover:bg-gray-100"
            >
              <User className="w-5 h-5 text-gray-800" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 p-2 z-50 animate-fadeIn">

                {/* USER INFO */}
                <div className="px-3 py-2 border-b border-gray-300">
                  <p className="font-semibold text-gray-800">
                    @{user?.username || "User"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {user?.email|| "user"}
                  </p>
                </div>

                {/* LINKS */}
                <ul className="flex flex-col py-1">
                  <Link to="/profile">
                    <DropdownItem icon={<UserCircle />} text="Profile" />
                  </Link>

                  <Link to="/getallrepos">
                    <DropdownItem icon={<FolderGit2 />} text="Repositories" />
                  </Link>

                  <DropdownItem icon={<Star />} text="Stars" />

                  <Link to="/settings">
                    <DropdownItem icon={<Settings />} text="Settings" />
                  </Link>
                </ul>

                {/* LOGOUT */}
                <button onClick={handleLogout} className="w-full border-t mt-2 pt-2">
                  <DropdownItem icon={<LogOut />} text="Sign out" />
                </button>

              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function DropdownItem({ icon, text }) {
  return (
    <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 cursor-pointer transition">
      <span className="text-gray-800">{icon}</span>
      <span className="text-gray-800">{text}</span>
    </li>
  );
}
