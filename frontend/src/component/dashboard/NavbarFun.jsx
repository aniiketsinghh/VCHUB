import { useState } from "react";
 import { Link } from "react-router";
// import {useAuth} from "../../context/useContext";
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
  const [open, setOpen] = useState(false);


  return (
    <nav className="w-full bg-gray-600 border-b ">
      <div className="max-w-7xl  px-4 h-16 flex items-center justify-between">

        {/* ---------- LEFT SIDE ---------- */}
        <div className="flex items-center gap-4 ml-10">
          {/* LOGO */}
          <div className="flex items-center gap-2 cursor-pointer mr-30">
            <LayoutDashboard className="w-7 h-7 text-white" />
            <span className="text-xl font-semibold text-white">
              VCHUB
            </span>
          </div>

          {/* NAV ITEMS */}
        

        {/* ---------- RIGHT SIDE ---------- */}
        <div className="flex items-center gap-4 ml-40">

          {/* SEARCH BOX */}
          <div className="relative mr-20">
            <input
              type="text"
              placeholder="Search repo\devs...."
              className="pl-10 pr-3 py-2 w-130 h-9  hover:bg-gray-100 bg-gray-300 border-2 border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 "
            />
             <Search className="absolute top-2 left-2 w-4 h-5 text-gray-600 font-bold " />
          </div>

           <div className="flex items-center gap-5 ml-4 0 ">

           <button className="px-4 py-1.5 bg-gray-300 rounded-lg shadow-sm border-2 border-zinc-800  hover:bg-gray-100 text-gray-800 transition">
              Features
          </button>


            <button className="px-3 py-1.5 bg-gray-300 rounded-lg shadow-sm border-2 border-zinc-800  hover:bg-gray-100 text-gray-800 transition">
              Explore
           </button>

</div>

        </div>

          {/* PLUS ICON */}
          <Link to="/createrepo">
          <button className="p-2 bg-gray-300 border-2 border-zinc-800  rounded-lg shadow-sm hover:bg-gray-100 transition gap-5">
            <Plus className="w-5 h-5 text-gray-800" />
          </button>
          </Link>

          {/* BELL ICON */}
          <button className="p-2 bg-gray-300 border-2 border-zinc-800  rounded-lg shadow-sm hover:bg-gray-100 transition ">
            <Bell className="w-5 h-5 text-gray-800" />
          </button>

          {/* USER DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 flex items-center gap-2 bg-gray-300 border-2 border-zinc-800 rounded-lg shadow-sm hover:bg-gray-100 transition"
            >
              <User className="w-5 h-5 text-gray-800" />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-300 p-2 transition-all z-50">
                {/* USER INFO */}
                <div className="px-3 py-2 border-b border-gray-200">
                  <p className="font-semibold text-gray-800">Aniket</p>
                  <p className="text-sm text-gray-500">@aniket</p>
                </div>

                {/* OPTIONS */}
                <ul className="flex flex-col py-1">
                  <DropdownItem icon={<UserCircle />} text="Profile" />
                  <DropdownItem icon={<FolderGit2 />} text="Repositories" />
                  <DropdownItem icon={<Star />} text="Stars" />
                  <DropdownItem icon={<Settings />} text="Settings" />
                </ul>

                {/* BOTTOM SECTION */}
                <div className="border-t border-gray-200 mt-1 pt-1">
                  <DropdownItem icon={<LogOut />} text="Sign out" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* --- REUSABLE DROPDOWN ITEM --- */
function DropdownItem({ icon, text }) {
  return (
    <li className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 cursor-pointer transition">
      <span className="w-5 h-5 text-gray-800">{icon}</span>
      <span className="text-gray-800">{text}</span>
    </li>
  );
}
