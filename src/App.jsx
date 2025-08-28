import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  Home as HomeIcon,
  FileText,
  Search,
  Info,
  Globe,
  Phone,
  Settings as SettingsIcon,
  LogIn,
  LogOut,
} from "lucide-react";
import Sidebar from "./components/Sidebar";
// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Links from "./pages/Links";
import Grievance from "./pages/Grievance";
import Track from "./pages/Track";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";
import Login from "./pages/Login";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "/", name: "Home", icon: <HomeIcon size={20} /> },
    {
      path: "/grievance",
      name: "Raise Grievance",
      icon: <FileText size={20} />,
    },
    { path: "/track", name: "Track Complaint", icon: <Search size={20} /> },
    { path: "/about", name: "About", icon: <Info size={20} /> },
    { path: "/links", name: "Change Language", icon: <Globe size={20} /> },
    { path: "/contact", name: "Contact Us", icon: <Phone size={20} /> },
    { path: "/settings", name: "Settings", icon: <SettingsIcon size={20} /> },
  ];

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className={darkMode ? "dark" : ""}>
          <div className="min-h-screen flex">
            {/* Main Content */}
            <main className="flex-1 pl-16 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 w-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/grievance" element={<Grievance />} />
                <Route path="/track" element={<Track />} />
                <Route path="/about" element={<About />} />
                <Route path="/links" element={<Links />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/settings" element={<Settings />} />
                <Route
                  path="/login"
                  element={<Login setLoggedIn={setLoggedIn} />}
                />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
