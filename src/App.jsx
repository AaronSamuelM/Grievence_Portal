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
  const [_darkMode, _setDarkMode] = useState(false);
  const [LoggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex  flex-col min-h-screen max-h-screen  overflow-y-auto overflow-x-hidden scrollbar-hide">
      <div className="h-4 bg-white"></div>
      {!isLoginPage && <Sidebar LoggedIn={LoggedIn} setLoggedIn={setLoggedIn}/>}

      {!isLoginPage && <Header1 />}

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto overflow-x-hidden no-scrollbar"${
          isLoginPage
            ? "w-full h-full"
            : "bg-gray-50 dark:bg-[#dfdfdf] text-gray-800 dark:text-gray-100"
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
