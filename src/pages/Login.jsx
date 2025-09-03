import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Undo2 } from "lucide-react";
import Header1 from "../components/Header1.jsx";

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true);
    navigate("/");
  };
  return (
    <div className="flex flex-col ">
      {/* Sidebar */}
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer fle text-3xl mt-1 pt-3 pb-3 pr-3 pl-4  font-normal bg-black text-[#E5E7EB] "
      >
        <Undo2 size={22} />
      </button>

      {/* Main Content */}
      <Header1 />
      {/* Content Area */}
      <main className="flex w-screen pt-14 items-center justify-center">
        {/* Login Card */}
        <div className="w-full max-w-md bg-[#ccc] p-8 border-2 border-[#3d3d3dab] rounded-[20px] shadow-2xl">
          <h2 className="text-3xl font-semibold text-black mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-black font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#3e6299]"
                placeholder="Enter username"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-black font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#3e6299]"
                placeholder="Enter password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#3e6299] text-[#DAA520] py-2 rounded-lg font-semibold hover:bg-[#2e4a75] transition"
            >
              Login
            </button>
          </form>

          {/* Extra Links */}
          <div className="mt-6 text-center text-black">
            <a href="#" className="underline hover:text-gray-800">
              Forgot Password?
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
