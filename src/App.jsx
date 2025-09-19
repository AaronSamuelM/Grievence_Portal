import { useState, useLayoutEffect, useEffect } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { Undo2 } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";
import GlobalWarning from "./components/GlobalWarning";
import Sidebar from "./components/Sidebar";
import Header1 from "./components/Header1.jsx";
import Home from "./pages/Home";
import About from "./pages/About";
import Links from "./pages/Links";
import Grievance from "./pages/Grievance";
import Track from "./pages/Track";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Alogin from "./pages/Alogin";
import Asignup from "./pages/Asignup";
import AHome from "./pages/Ahome.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import AccessDenied from "./components/AccessDenied";
import "./index.css";

function App() {
  const [_darkMode, _setDarkMode] = useState(false);
  const [LoggedIn, setLoggedIn] = useState(() => {
    return !!localStorage.getItem("access_token");
  });
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/login" ||
  location.pathname === "/alogin" ||
  location.pathname === "/asignup";
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
      // if (!isLoginPage) {
      //   navigate("/login"); // optional redirect if token missing
      // }
    }
  }, []);

  // const [style, api] = useSpring(() => ({
  //   opacity: 0,
  //   transform: "translateY(20px)",
  // }));

  // useLayoutEffect(() => {
   
  //   api.start({
  //     opacity: 100,
  //     transform: "translateY(0)",
  //     config: { duration: 300 },
  //   });

  //   return () => {
      
  //     api.start({
  //       opacity: 0,
  //       transform: "translateY(20px)",
  //       config: { duration: 300 },
  //     });
  //   };
  // }, [location.key, api]); 

  return (
    <div className="flex flex-col min-h-screen max-h-screen overflow-y-auto overflow-x-hidden scrollbar-hide">
      <div className="flex flex-row justify-between bg-white">
        <button
          onClick={() => navigate(-1)}
          className="cursor-pointer flex pt-1 pb-1 pr-2 rounded-r-full hover:scale-110 pl-2 font-normal bg-black text-[#E5E7EB]"
        >
          <Undo2 size={22} />
        </button>
        <button
          onClick={() => navigate("/alogin")} 
          className="cursor-pointer flex text-sm pt-1 pb-1 pr-2 rounded-l-full hover:scale-110 pl-2 font-normal bg-black text-[#E5E7EB]"
        >
          Admin Portal
        </button>
      </div>
      {!isLoginPage && (
        <Sidebar LoggedIn={LoggedIn} setLoggedIn={setLoggedIn} />
      )}
      <GlobalWarning />
      {!isLoginPage && <Header1 />}

      <main
        className={`flex-1 overflow-y-scroll overflow-x-hidden content ${
          isLoginPage
            ? "w-full h-full"
            : "bg-gray-50 dark:bg-[#dfdfdf] text-gray-800 dark:text-gray-100"
        }`}
      >
        {/* <animated.div
          style={style} 
          key={location.key} 
        > */}
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/grievance" element={<Grievance setLoggedIn={setLoggedIn} />} />
            <Route path="/track" element={<Track />} />
            <Route path="/about" element={<About />} />
            <Route path="/links" element={<Links />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/login"
              element={<Login setLoggedIn={setLoggedIn} />}
            />
            <Route
          path="/ahome"
          element={
              <AHome />
          }
        />
            <Route path="/alogin" element={<Alogin setLoggedIn={setLoggedIn}/>} />
            <Route path="/asignup" element={<Asignup setLoggedIn={setLoggedIn}/>} />
            <Route path="/access-denied" element={<AccessDenied />} />
          </Routes>
        {/* </animated.div> */}
      </main>

      <footer className="bg-[#22406d] text-white py-4">
        <div
          className="container mx-auto px-4 
                  flex flex-col text-sm items-center justify-center gap-2
                  md:flex-row md:text-lg 
                  lg:px-20 lg:text-xl"
        >
          <p>© 2025 Government of Jharkhand</p>
          <p>Helpline: 1800-123-456</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
