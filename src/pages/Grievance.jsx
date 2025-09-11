import { useState, useRef, useEffect, useCallback } from "react";
import LocationPicker from "../components/LocationPicker";
import { X } from "lucide-react";
import { departments } from "../constants/departments";
import { useRaiseGrievance } from "../queries/grievance";
import { useLoginStart, useLoginVerify } from "../queries/auth";

const useWarnings = () => {
  const [warnings, setWarnings] = useState([]);
  const showWarning = useCallback((msg) => {
    const id = Date.now();
    setWarnings((prev) => [...prev, { id, msg }]);
    setTimeout(() => {
      setWarnings((prev) => prev.filter((w) => w.id !== id));
    }, 3000);
  }, []);
  return { warnings, showWarning };
};

const useCooldown = (initial = 0) => {
  const [cooldown, setCooldown] = useState(initial);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  return [cooldown, setCooldown];
};

function Grievance() {
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [verify, setVerify] = useState(false);
  const [verified, setVerified] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false); // New state for overlay
  const { warnings, showWarning } = useWarnings();
  const [cooldown, setCooldown] = useCooldown(0);
  const [files, setFiles] = useState([]);
  const [submissionId, setSubmissionId] = useState(null);  // New state for submission ID

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    otp: "",
    title: "",
    grievance: "",
    department: "",
    latitude: null,
    longitude: null,
    address: "",
  });

  const dropdownRef = useRef(null);

  const handleChange = useCallback(
    (e) => {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.reduce((acc, file) => {
        if (!file.type.startsWith("image/")) {
          showWarning("Only image files are allowed.");
        } else if (file.size > 1024 * 1024) {
          showWarning(`${file.name} exceeds 1MB limit.`);
        } else if (acc.length + files.length >= 10) {
          showWarning("Maximum 10 images allowed.");
        } else {
          acc.push({
            file,
            url: URL.createObjectURL(file),
            name: file.name,
          });
        }
        return acc;
      }, []);

      setFiles((prev) => [...prev, ...validFiles]);
    },
    [files, showWarning]
  );

  const removeImage = useCallback(
    (name) => setFiles((prev) => prev.filter((f) => f.name !== name)),
    []
  );

  const handleCheckboxChange = useCallback((problem) => {
  setSelectedProblems((prev) => {
    const updatedProblems = prev.includes(problem)
      ? prev.filter((item) => item !== problem)
      : [...prev, problem];

    // Set department directly based on the updated problems
    setFormData((prevData) => ({
      ...prevData,
      department: updatedProblems,  // Use updatedProblems directly
    }));

    return updatedProblems;
  });
}, []);


  const requestOtp = useCallback(() => {
    if (cooldown > 0) return;
    setVerify(true);
    setCooldown(60);
    useLoginStart({
      mobile: formData.mobile
    })
  }, [formData, cooldown, setCooldown]);

  const handleOtpSubmit = useCallback(() => {
    useLoginVerify({
      mobile: formData.mobile,
      otp: formData.otp,
    })
      .then(() => {
        setVerified(true);
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
      });

  }, [formData]);

  const handleLocationSelect = useCallback(({ lat, lng, address }) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
      address,
    }));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = useCallback(
  async (e) => {
    e.preventDefault();
    const tempPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "otp") {
        tempPayload.append(key, value);
      }
    });

    files.forEach((img) => {
      tempPayload.append("images", img.file);
    });

    try {
      // Sending the form data to the backend
      const response = await useRaiseGrievance(tempPayload); 
      console.log("Server Response:", response.data.data.id);
      setSubmissionId(response.data.data.id);
        setShowOverlay(true);  // Show the overlay with the ID
      
    } catch (error) {
      console.error("Error submitting grievance:", error);
      showWarning("Failed to submit grievance. Please try again.");
    }
  },
  [formData, files]
);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 py-10">
        {/* Main Form Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 md:p-8 transition hover:shadow-xl">
          {/* Warnings */}
          <div className="fixed top-36 right-4 space-y-2 z-50">
            {warnings.map((w) => (
              <div
                key={w.id}
                className="px-4 py-2 rounded-lg shadow-lg text-white bg-yellow-500 
                         transition-all duration-500 ease-in-out"
              >
                {w.msg}
              </div>
            ))}
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
            Raise a Grievance
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 text-gray-700">
            {/* Mobile + OTP */}
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="tel"
                placeholder="Mobile Number"
                value={formData.mobile}
                disabled={verified}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, mobile: e.target.value }));
                }}
                className={`flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition ${verified
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : "text-gray-800 focus:ring-2 focus:ring-blue-500"
                  }`}
              />
              {!verified && (
                <button
                  type="button"
                  onClick={requestOtp}
                  disabled={cooldown > 0}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 hover:scale-105 transition disabled:opacity-50"
                >
                  {cooldown > 0 ? `Resend in ${cooldown}s` : "Send OTP"}
                </button>
              )}
            </div>

            {verify && !verified && (
              <div className="flex flex-col md:flex-row gap-3">
                <input
                  type="tel"
                  placeholder="Enter OTP"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, otp: e.target.value }))
                  }
                  className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition"
                />

                <button
                  type="button"
                  onClick={handleOtpSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 hover:scale-105 transition"
                >
                  Submit OTP
                </button>
              </div>
            )}

            {verified && (
              <div className="flex flex-col gap-6">
                {/* Name */}
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition"
                />
                {/* Title */}
                <input
                  type="text"
                  placeholder="Grievance Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition"
                />

                {/* Description */}
                <textarea
                  placeholder="Description..."
                  value={formData.grievance}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      grievance: e.target.value,
                    }))
                  }
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 transition h-28"
                />

                {/* Department Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowOptions((prev) => !prev)}
                    className="w-full p-3 border rounded-lg text-left focus:ring-2 focus:ring-green-500 transition"
                  >
                    {selectedProblems.length > 0
                      ? selectedProblems.join(", ")
                      : "Select Department"}
                  </button>

                  <div
                    className={`absolute left-0 mt-2 w-full bg-white border rounded-lg shadow-lg overflow-y-scroll transition-all duration-300 max-h-40 z-20 ${showOptions
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                      }`}
                  >
                    {departments.map((problem, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedProblems.includes(problem)}
                          onChange={() => handleCheckboxChange(problem)}
                        />
                        <span>{problem}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* File Upload */}
                <div className="bg-gray-50 border rounded-lg p-4 shadow-sm transition hover:shadow-md">
                  <h3 className="text-lg font-semibold mb-3">Add Images</h3>
                  <label className="block cursor-pointer border-2 border-dashed border-green-400 p-6 rounded-lg text-center text-gray-600 hover:bg-green-50 transition">
                    <span>Click to upload (max 10, 1MB each)</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleChange}
                    />
                  </label>

                  {files.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-3">
                      {files.map((file) => (
                        <div
                          key={file.name}
                          className="relative border rounded-lg overflow-hidden shadow-sm group"
                        >
                          <img
                            src={file.url}
                            alt={file.name}
                            className="h-28 w-full object-cover group-hover:scale-105 transition"
                          />
                          <button
                            onClick={() => removeImage(file.name)}
                            className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full 
                                     opacity-80 hover:opacity-100"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location Picker */}
                <LocationPicker onLocationSelect={handleLocationSelect} />

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 hover:scale-[1.02] transition"
                >
                  Submit Grievance
                </button>

                {submissionId && (
                  <div className="mt-4 text-center text-green-600">
                    Grievance submitted successfully! Your ID is: {submissionId}
                  </div>
                )}
              </div>
            )}
          </form>
          
        </div>

        {/* Sidebar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 flex flex-col gap-6 transition hover:shadow-xl">
          <div>
            <h3 className="text-lg text-black md:text-xl font-semibold mb-4">
              Useful Links
            </h3>
            <ul className="space-y-2 text-green-700">
              <li>
                <a href="#" className="hover:underline">
                  Jharkhand Govt Official Website
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Citizen Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Helpline Numbers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg text-black md:text-xl font-semibold mb-4">News</h3>
            <ul className="space-y-2 text-blue-600">
              <li>
                <a href="#" className="hover:underline">
                  Govt launches new complaint monitoring system →
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Portal maintenance scheduled for this weekend →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showOverlay && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              Your Grievance ID: {submissionId}  {/* Display Grievance ID */}
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for submitting your grievance. You can use this ID for future reference.
            </p>
            <button
              onClick={() => setShowOverlay(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Grievance;
