import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {Undo2 } from "lucide-react"

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(true);
  };
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="w-screen  fixed">
        <button onClick={() => navigate(-1)} className="absolute cursor-pointer flex text-3xl mt-1.5 pt-5 pb-5 pr-3 pl-4 rounded-r-4xl font-normal bg-black text-[#E5E7EB] ">
            <Undo2 size={22} />
          </button>
        {/* Header */}
        <header className="bg-[#22406d] text-white p-2 pl-21 shadow-md">
          <p className="text-2xl font-bold  text-[#E5E7EB]">
            Government of Jharkhand <br></br>
          </p>
          <p className="text-xl font-normal text-[#E5E7EB]">
            Grievance Portal
          </p>
          
        </header>
        </div>
        

        {/* Content Area */}
        <main className="flex w-screen  flex-1 items-center justify-center bg-[#ddd]">
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