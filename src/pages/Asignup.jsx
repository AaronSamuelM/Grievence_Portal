// Signup.jsx
import { useState, useCallback } from "react";
import Header1 from "../components/Header1.jsx";
import LocationPicker from "../components/LocationPicker";
import { useAdminLoginStart, useAdminLoginVerify } from "../queries/adminAuth.js";

function Signup({ setLoggedIn }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    otp: "",
    address: "",
    aadhar: "",
    latitude: null,
    longitude: null,
  });

  const [verify, setVerify] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const requestOtp = useCallback(() => {
    if (!formData.mobile || formData.mobile.length !== 10) {
      alert("Enter valid mobile");
      return;
    }
    setVerify(true);
    setCooldown(60);
    useAdminLoginStart({ mobile: formData.mobile })
      .then(() => console.log("OTP sent"))
      .catch(() => alert("OTP request failed"));
  }, [formData.mobile]);

  const handleOtpSubmit = useCallback(() => {
    useAdminLoginVerify({
      mobile: formData.mobile,
      otp: formData.otp,
      name: formData.name,
      aadhar: formData.aadhar,
      address: formData.address,
      latitude: formData.latitude,
      longitude: formData.longitude,
      access: "admin",
    })
      .then((res) => {
        const data = res.data;
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("user_mobile", formData.mobile);
        localStorage.setItem("user_name", formData.name);
        localStorage.setItem("access", "admin");
        setLoggedIn(true);
      })
      
  }, [formData]);

  const handleLocationSelect = ({ lat, lng, address }) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      address,
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
    <Header1 />
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
        <h2 className="text-2xl font-bold text-purple-800 mb-6">Sign Up</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="tel"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />

          {verify && (
            <input
              type="text"
              placeholder="OTP"
              value={formData.otp}
              onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
              className="w-full p-3 border rounded-lg"
            />
          )}

          <input
            type="text"
            placeholder="Aadhar Number"
            value={formData.aadhar}
            onChange={(e) => setFormData({ ...formData, aadhar: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />

          <LocationPicker onLocationSelect={handleLocationSelect} />

          <input
            type="text"
            placeholder="Manual Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full p-3 border rounded-lg"
          />

          {!verify ? (
            <button
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              onClick={requestOtp}
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Send OTP"}
            </button>
          ) : (
            <button
              className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              onClick={handleOtpSubmit}
            >
              Complete Signup
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Signup;
