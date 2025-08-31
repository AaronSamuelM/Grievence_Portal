// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Header1 from "./components/Header1.jsx";
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
  const [darkMode, _setDarkMode] = useState(false);
  const [_loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex  flex-col h-screen">
      {!isLoginPage && <Header1 />}

      {/* Sidebar decides itself if horizontal or vertical */}
      {!isLoginPage && <Sidebar />}

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto ${
          isLoginPage
            ? "w-full h-full"
            : "bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100"
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grievance" element={<Grievance />} />
          <Route path="/track" element={<Track />} />
          <Route path="/about" element={<About />} />
          <Route path="/links" element={<Links />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
