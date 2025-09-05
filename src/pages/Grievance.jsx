import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import LocationPicker from "../components/LocationPicker";
import { X } from "lucide-react";

// Custom hook: handles warnings with auto-remove
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

// Custom hook: handles OTP cooldown
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
  const { warnings, showWarning } = useWarnings();
  const [cooldown, setCooldown] = useCooldown(0);
  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    title:"",
    grievance: "",
    department: "",
    latitude: null,
    longitude: null,
    address: "",
  });

  const dropdownRef = useRef(null);

  const departments = useMemo(
    () => [
      "Agriculture, Animal Husbandry & Co-operative",
      "Building Construction",
      "Cabinet Election",
      "Cabinet Secretariat and Vigilance",
      "Commercial Taxes",
      "Drinking Water and Sanitation",
      "Energy",
      "Excise and Prohibition",
      "Finance",
      "Food, Public Distribution & Consumer Affairs",
      "Forest, Environment & Climate Change",
      "Health, Medical Education & Family Welfare",
      "Higher and Technical Education",
      "Home, Jail & Disaster Management",
      "Industries",
      "Information & Public Relations",
      "Information Technology & e-Governance",
      "Labour, Employment, Training and Skill Development",
      "Law",
      "Mines & Geology",
      "Panchayati Raj",
      "Personnel, Administrative Reforms & Rajbhasha",
      "Planning & Development",
      "Revenue, Registration & Land Reforms",
      "Road Construction",
      "Rural Development",
      "Rural Works",
      "Scheduled Tribe, Scheduled Caste, Minority and Backward Class Welfare",
      "School Education & Literacy",
      "Tourism, Arts, Culture, Sports & Youth Affairs",
      "Transport",
      "Urban Development & Housing",
      "Water Resources",
      "Women, Child Development & Social Security",
    ],
    []
  );

  // File handler
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

  // Department handler
  const handleCheckboxChange = useCallback((problem) => {
    setSelectedProblems((prev) =>
      prev.includes(problem)
        ? prev.filter((item) => item !== problem)
        : [...prev, problem]
    );
    setFormData((prev) => ({ ...prev, department: problem }));
  }, []);

  // OTP
  const requestOtp = useCallback(() => {
    if (cooldown > 0) return;
    setVerify(true);
    setCooldown(60);
    // TODO: Backend OTP call
  }, [cooldown, setCooldown]);

  const handleOtpSubmit = useCallback(() => {
    setVerified(true);
    // TODO: Backend OTP verification
  }, []);

  // Location
  const handleLocationSelect = useCallback(({ lat, lng, address }) => {
    setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng, address }));
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Submit
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        payload.append(key, value)
      );
      files.forEach((f) => payload.append("images", f.file));

      console.log("Submitting with files:");
      for (let [key, value] of payload.entries()) {
        console.log(
          value instanceof File
            ? `${key}: ${value.name} (${value.size} bytes)`
            : `${key}: ${value}`
        );
      }

      // TODO: send to backend
    },
    [formData, files]
  );

  return (
    <div className="flex flex-col items-center gap-6 md:flex-row md:items-start lg:items-start lg:flex-row overflow-y-clip px-10 pt-6 bg-[#ddd]">
      <div className="flex-1 bg-[#ccc] p-6 rounded-lg">
        {/* Warnings */}
        <div className="fixed top-36 right-4 space-y-2 z-50">
          {warnings.map((w) => (
            <div
              key={w.id}
              className="px-4 py-2 rounded-lg shadow-lg text-white bg-[#d3cd31]
                      transition-all duration-500 ease-in-out transform opacity-100 translate-y-0"
            >
              {w.msg}
            </div>
          ))}
        </div>

        <h1 className="text-xl text-black font-bold mb-3">Raise a Grievance</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-black">
          {/* Name */}
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full p-2 border rounded"
          />

          {/* Mobile + OTP */}
          <div className="flex flex-row gap-2">
            <input
              type="tel"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, mobile: e.target.value }))
              }
              className="w-full p-2 border rounded"
            />
            {!verified && (
              <button
                type="button"
                onClick={requestOtp}
                disabled={cooldown > 0}
                className="shadow-lg rounded-lg hover:scale-105"
              >
                {cooldown > 0 ? `Resend in ${cooldown}s` : "Send OTP"}
              </button>
            )}
          </div>

          {verify && !verified && (
            <div className="flex flex-row gap-2">
              <input
                type="tel"
                placeholder="Enter OTP"
                className="w-full p-2 border rounded"
              />
              <button
                type="button"
                onClick={handleOtpSubmit}
                className="shadow-lg rounded-lg hover:scale-105"
              >
                Submit OTP
              </button>
            </div>
          )}
          {verified && (
            
            <div className="flex flex-col gap-3">
              {/* Department Dropdown */}
              <input
                type="text"
                placeholder="Grievence Title"
                value={formData.grievance}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded"
              ></input>
              <textarea
                placeholder="Description..."
                value={formData.grievance}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    grievance: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded"
              ></textarea>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowOptions((prev) => !prev)}
                  className="w-full p-2 border rounded text-left"
                >
                  {selectedProblems.length > 0
                    ? selectedProblems.join(", ")
                    : "Select The corresponding Department"}
                </button>

                <div
                  className={`origin-top transition-all duration-300 ease-in transform ${
                    showOptions
                      ? "max-h-40 opacity-100 scale-y-100 relative"
                      : "max-h-0 opacity-0 scale-y-0 absolute"
                  } overflow-y-scroll z-10 w-full border rounded p-2 mt-1 shadow`}
                >
                  {departments.map((problem, idx) => (
                    <label
                      key={idx}
                      className="flex hover:pl-1 hover:bg-[#ccd] items-center transition-all duration-300 space-x-2 mb-1"
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
              <div className="flex flex-col gap-2 border rounded-lg bg-[#ccc] shadow p-3">
                <h2 className="text-base font-semibold text-gray-700">
                  Add Images
                </h2>
                <label className="cursor-pointer border border-dashed border-green-500 bg-[#c6c6c6] hover:bg-[#09ff0018]
                            rounded-lg p-4 text-center text-gray-600 transition">
                  <span className="block mb-2">
                    Click to upload (max 10 , limit 1MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>

                {files.length > 0 && (
                  <div className="grid grid-cols-5 gap-3 mt-2">
                    {files.map((file) => (
                      <div
                        key={file.name}
                        className="relative group border rounded-lg overflow-hidden shadow-sm"
                      >
                        <img
                          src={file.url}
                          alt={file.name}
                          className="h-28 w-full object-contain "
                        />
                        <button
                          onClick={() => removeImage(file.name)}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full 
                                    opacity-80 group-hover:opacity-100 transition"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Grievance */}
              

              {/* Location Picker */}
              <LocationPicker onLocationSelect={handleLocationSelect} />

              {/* Submit */}
              <button
                type="submit"
                className="mt-4 w-full p-2 bg-black border-1 border-[#228B22] text-white py-2 rounded hover:scale-105"
              >
                Submit Grievance
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Sidebar */}
      <div className="w-64 overflow-y-clip bg-[#ccc] p-6 rounded-lg shadow">
        <h2 className="text-lg text-black font-semibold mb-4">Useful Links</h2>
        <ul className="list-disc list-inside text-black space-y-2">
          <li>
            <a
              href="#"
              className="underline text-black hover:text-gray-800 visited:text-purple-800"
            >
              Jharkhand Govt Official Website
            </a>
          </li>
          <li>
            <a
              href="#"
              className="underline text-black hover:text-gray-800 visited:text-purple-800"
            >
              Citizen Services
            </a>
          </li>
          <li>
            <a
              href="#"
              className="underline text-black hover:text-gray-800 visited:text-purple-800"
            >
              Helpline Numbers
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Grievance;
