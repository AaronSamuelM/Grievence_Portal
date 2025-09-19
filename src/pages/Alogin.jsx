import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header1 from "../components/Header1.jsx";
import { useAdminLoginStart, useAdminLoginVerify } from "../queries/adminAuth.js";
import AccessDenied from "../components/AccessDenied.jsx";  // 👈 import

const Login = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("mobile");
  const [allowed, setAllowed] = useState(true);
  useEffect(() => {
    const access = localStorage.getItem("access");
    if (access && access === "admin") {
      navigate("/ahome");
      setAllowed(false); // block non-admins
    }
  }, []);

  
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      useAdminLoginStart({ mobile, access: "admin" })
        .then(() => setStep("otp"))
        .catch((error) => {
          console.error("Failed to connect to the Login Server:", error);
          alert("Login failed. Only admin accounts allowed.");
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      useAdminLoginVerify({ mobile, otp})
        .then((res) => {
          const data = res.data;
          // if (data?.access !== "admin") {
          //   alert("Access denied. Only admins can login.");
          //   return;
          // }
          localStorage.setItem("access_token", data?.access_token);
          localStorage.setItem("refresh_token", data?.refresh_token);
          localStorage.setItem("access", "admin");
          setLoggedIn(true);
          navigate("/ahome");
        })
        .catch((error) => {
          console.error("Failed to verify the user:", error);
          alert("Invalid OTP or access denied.");
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header1 />
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            {step === "mobile" ? "Admin Login" : "Verify OTP"}
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number
              </label>
              <input
                type="tel"
                disabled={step === "otp"}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none 
                 ${step === "otp"
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "text-gray-800 focus:ring-2 focus:ring-blue-500"
                  }`}
                placeholder="Enter admin mobile number"
                required
              />
            </div>
            {step === "mobile" && (
              <button
                type="submit"
                onClick={handleSendOtp}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Send OTP
              </button>
            )}

            {step === "otp" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter OTP"
                    required
                  />
                </div>
                <button
                  type="submit"
                  onClick={handleVerifyOtp}
                  className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Verify OTP
                </button>
              </>
            )}
          </form>

          {step === "otp" && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setStep("mobile")}
                className="text-sm text-blue-600 hover:underline"
              >
                Change number
              </button>
            </div>
          )}
          {step === "mobile" && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Not a user?{" "}
                <button
                  onClick={() => navigate("/asignup")}  // or "/Asignup" if that is your route
                  className="text-blue-600 hover:underline font-medium"
                  type="button"
                >
                  Create an account
                </button>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;
