// src/components/Sidebar.jsx
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
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
    { name: "Home", icon: <Home size={25} />, path: "/" },
    {
      name: "Raise Grievance",
      icon: <FileText size={25} />,
      path: "/grievance",
    },
    { name: "Track Complaint", icon: <Search size={25} />, path: "/track" },
    { name: "About", icon: <Info size={25} />, path: "/about" },
    { name: "Change Language", icon: <Globe size={25} />, path: "/language" },
    { name: "Contact Us", icon: <Phone size={25} />, path: "/contact" },
    { name: "Settings", icon: <Settings size={25} />, path: "/settings" },
  ];

  return (
    <>
    <div
      className={`h-screen fixed flex flex-col transition-all duration-300 ${
        darkMode ? "bg-[#1E293B] text-white" : "bg-[#2B4C7E] text-white shadow-[5px_0px_14px_0px_rgba(0,_0,_0,_0.1)]"
      } ${isOpen ? "w-56" : "w-16"}`}
    >
      {/* Toggle Button */}
      <button
        className="p-4 bg-black hover:bg-[#161616] hover:scale-110 hover:shadow-lg focus:outline-none transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="hover:rotate-180 transition-all duration-300" size={28} />
        <div className="flex items-center fixed pl-12 top-8 text-white">
              {/* Show text only when expanded */}
              {isOpen && <span className="fixed">Menu</span>}
            </div>
      </button>

      {/* Menu Items */}
      <nav className="flex flex-col  gap-2 mt-4 flex-1">
        {menuItems.map((item, idx) => (
          <div key={idx} className="relative">
          <Link
            key={idx}
            to={item.path}
            className="flex items-center gap-3 px-3 py-2 hover:bg-[#3C5C90] hover:scale-110 hover:shadow-lg rounded-md relative peer transition-all duration-300"
          >
            {/* White circle for icons */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#3e6299] text-[#DAA520]">
              {item.icon}
            </div>
            <div className="text-white fixed pl-12 ">
              {/* Show text only when expanded */}
              {<span className={`transition-opacity duration-100 ease-in ${isOpen ? "opacity-100" : "opacity-0"}`} >{item.name}</span>}
            </div>

            {/* Tooltip on hover if collapsed */}
            
          </Link>
          {!isOpen && (
              <span className="absolute bottom-3.5 left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 peer-hover:opacity-60 transition">
                {item.name}
              </span>
            )}
          </div>
        ))}
        
      </nav>

      {/* Bottom Section (Theme + Login/Logout) */}
      <div className="flex flex-col gap-2 mb-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2 bg-black hover:bg-[#161616] hover:scale-110 hover:shadow-lg rounded-md relative group transition-all duration-300"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full  text-white ">
            {darkMode ? <Sun size={25} /> : <Moon size={25} />}
          </div>
          <div className="text-white  fixed pl-10 ">
            {isOpen && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </div>
          {!isOpen && (
            <span className="absolute left-14 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-60 transition">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </span>
          )}
        </button>

        <Link 
        to={"/login"}
        className="flex items-center gap-3 px-3 py-2 bg-black hover:bg-[#161616] hover:scale-110 hover:shadow-lg rounded-md relative group transition-all duration-300"
        >
        <button
          onClick={() => setIsLoggedIn(!isLoggedIn) }
          
        >
          <div className="flex items-center justify-center  w-8 h-8 rounded-full text-white">
            {isLoggedIn ? <LogOut size={25} /> : <LogIn size={25} />}
          </div>
          <div className="text-white bottom-3.5 absolute pl-10">
            {isOpen && <span>{isLoggedIn ? "Logout" : "Login"}</span>}
          </div>
          {!isOpen && (
            <span className="absolute left-14 bottom-3.5 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-60 transition">
              {isLoggedIn ? "Logout" : "Login"}
            </span>
          )}
        </button>
        </Link>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
