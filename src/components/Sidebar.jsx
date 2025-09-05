// src/components/Sidebar.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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

const Sidebar = ({ LoggedIn, setLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isHorizontal, setIsHorizontal] = useState(false);
  const navigate = useNavigate();
  // Auto detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsHorizontal(window.innerWidth >= 1024); // lg breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const menuItems = [
    { name: "Home", icon: <Home size={22} />, path: "/" },
    {
      name: "Raise Grievance",
      icon: <FileText size={22} />,
      path: "/grievance",
    },
    { name: "Track Complaint", icon: <Search size={22} />, path: "/track" },
    { name: "About", icon: <Info size={22} />, path: "/about" },
    { name: "Contact Us", icon: <Phone size={22} />, path: "/contact" },
  ];
  const handleAuth = () => {
    if (LoggedIn) {
      // Future: clear tokens, call API, etc.
      setLoggedIn(false);
      navigate("/"); // stay on home (or any safe page)
    } else {
      navigate("/login"); // go to login page
    }
  };

  return (
    <> 
      {/* Horizontal Mode */}
      {isHorizontal ? (
        <div
          className={`w-full h-10 flex flex-row justify-end z-50 gap-6 py-1 shadow-md
          ${darkMode ? "bg-[#1E293B] text-white" : "bg-[#000000] text-white"}`}
        >
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="text-white mt-1 hover:underline hover:scale-105 transition"
            >
              {item.name}
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="pr-1 py-1 rounded-md bg-black hover:bg-[#161616] transition"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Login/Logout */}
          <button
            onClick={handleAuth}
            className="pr-3 rounded-md bg-black hover:bg-[#161616] transition"
          >
            {LoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      ) : (
        <>
          <div className="w-full flex flex-col h-10 bg-[#000000]">
            <div
              className={`sticky flex flex-col transition-all duration-300 rounded-xl ${
                darkMode
                  ? "bg-[#1E293B] text-white"
                  : "bg-[#000000] text-white shadow-[5px_0px_14px_0px_rgba(0,_0,_0,_0.1)]"
              } ${isOpen ? "w-48 h-screen" : "w-16"}`}
            >
              {/* Toggle Button */}
              <button
                className={`p-2 pl-4 pr-0.5 rounded-xl bg-black ${
                  isOpen ? "w-44" : "w-16"
                } hover:bg-[#161616] hover:scale-110 hover:shadow-lg focus:outline-none transition-all duration-300`}
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="flex items-center   text-white">
                  <Menu
                    className="hover:rotate-180 transition-all w-6 h-6 relative left-1 duration-300"
                    size={22}
                  />

                  {/* Show text only when expanded */}
                  {isOpen && <p className="relative left-4">Menu</p>}
                </div>
              </button>
              {/* Menu Items */}
              {isOpen && (
                <nav className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide">
                  {menuItems.map((item, idx) => (
                    <div key={idx} className=" relative">
                      <Link
                        key={idx}
                        to={item.path}
                        className="flex items-center gap-2 px-2 py-2 hover:bg-[#1b1b1b] hover:scale-110 hover:shadow-lg rounded-md relative peer transition-all duration-300"
                      >
                        {/* White circle for icons */}
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1d1d1d] text-[#228B22]">
                          {item.icon}
                        </div>
                        <div className="text-white flex-1 min-w-0">
                          {/* Show text only when expanded */}
                          {
                            <span
                              className={`transition-opacity duration-100 ease-in ${
                                isOpen ? "opacity-100" : "opacity-0"
                              }`}
                            >
                              {item.name}
                            </span>
                          }
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
              )}

              {/* Bottom Section (Theme + Login/Logout) */}
              {isOpen && (
                <div className="flex flex-col">
                  {/* Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-3 px-1 py-2 bg-black hover:bg-[#161616] hover:scale-110 hover:shadow-lg rounded-md relative peer transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full  text-white ">
                      {darkMode ? <Sun size={25} /> : <Moon size={25} />}
                    </div>
                    <div className="text-white ">
                      {isOpen && (
                        <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
                      )}
                    </div>
                  </button>

                  <button
                    onClick={handleAuth}
                    className="flex items-center gap-3 px-1 pb-2 bg-black hover:bg-[#161616] hover:scale-110 hover:shadow-lg rounded-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full text-white">
                      {LoggedIn ? <LogOut size={25} /> : <LogIn size={25} />}
                    </div>
                    {isOpen && <span>{LoggedIn ? "Logout" : "Login"}</span>}
                  </button>
                </div>
              )}
            </div>

            <div
              aria-hidden
              className={`${isOpen ? "w-56" : "w-16"} shrink-0`}
            ></div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
