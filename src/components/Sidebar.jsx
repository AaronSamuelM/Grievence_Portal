// src/components/Sidebar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  FileText,
  Search,
  Info,
  Globe,
  Phone,
  Settings,
  LogIn,
  LogOut,
  Menu,
  Sun,
  Moon,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const menuItems = [
    { name: "Home", icon: <Home size={18} />, path: "/" },
    {
      name: "Raise Grievance",
      icon: <FileText size={18} />,
      path: "/grievance",
    },
    { name: "Track Complaint", icon: <Search size={18} />, path: "/track" },
    { name: "About", icon: <Info size={18} />, path: "/about" },
    { name: "Change Language", icon: <Globe size={18} />, path: "/language" },
    { name: "Contact Us", icon: <Phone size={18} />, path: "/contact" },
    { name: "Settings", icon: <Settings size={18} />, path: "/settings" },
  ];

  return (
    <div
      className={`h-screen fixed flex flex-col transition-all duration-300 ${
        darkMode ? "bg-[#1E293B] text-white" : "bg-[#003366] text-white"
      } ${isOpen ? "w-56" : "w-16"}`}
    >
      {/* Toggle Button */}
      <button
        className="p-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu size={22} />
      </button>

      {/* Menu Items */}
      <nav className="flex flex-col  gap-2 mt-4 flex-1">
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="flex items-center gap-3 px-3 py-2 hover:bg-[#004080] rounded-md relative group"
          >
            {/* White circle for icons */}
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black">
              {item.icon}
            </div>
            <div className="text-white fixed pl-10">
              {/* Show text only when expanded */}
              {isOpen && <span>{item.name}</span>}
            </div>

            {/* Tooltip on hover if collapsed */}
            {!isOpen && (
              <span className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                {item.name}
              </span>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom Section (Theme + Login/Logout) */}
      <div className="flex flex-col gap-2 mb-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2 hover:bg-[#004080] rounded-md relative group"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full  text-white">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </div>
          <div className="text-white fixed pl-10">
            {isOpen && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </div>
          {!isOpen && (
            <span className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </button>

        {/* Login / Logout */}
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="flex items-center gap-3 px-3 py-2 hover:bg-[#004080] rounded-md relative group"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full text-white">
            {isLoggedIn ? <LogOut size={18} /> : <LogIn size={18} />}
          </div>
          <div className="text-white fixed pl-10">
            {isOpen && <span>{isLoggedIn ? "Logout" : "Login"}</span>}
          </div>
          {!isOpen && (
            <span className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
              {isLoggedIn ? "Logout" : "Login"}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
