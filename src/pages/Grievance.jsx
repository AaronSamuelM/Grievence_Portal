import { useState, useRef, useEffect } from "react";

function Grievance() {
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [verify, setVerify] = useState(false);
  const [verified, setVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [cooldown, setCooldown] = useState(0); // seconds left for resend
  const dropdownRef = useRef(null);

  const departments = [
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
    "Women, Child Development & Social Security"
  ];

  const handleCheckboxChange = (problem) => {
    setSelectedProblems((prev) =>
      prev.includes(problem)
        ? prev.filter((item) => item !== problem)
        : [...prev, problem]
    );
  };

  // OTP request function with cooldown
  const requestOtp = () => {
    if (cooldown > 0) return; // prevent spamming
    setVerify(true);
    setOtpSent(true);
    setCooldown(60); // 60s cooldown

    // TODO: 🔑 Call backend API to send OTP and return JWT for validation later

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle OTP submit
  const handleOtpSubmit = () => {
    setVerified(true);
    // 1. Send OTP + JWT token to backend
    // 2. Verify OTP against signed JWT server-side
    // 3. If valid, mark user as authenticated
  };

  // Close dropdown if click happens outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col items-start gap-6 md:flex-row lg:flex-row overflow-y-clip px-10 pt-6 bg-[#ddd]">
      <div className="flex-1 bg-[#ccc] p-6 rounded-lg">
        <h1 className="text-xl text-black font-bold mb-3">Raise a Grievance</h1>

        <form className="space-y-3 text-black">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border rounded"
          />
          {!verified &&
          <div className="flex flex-row gap-2">
            <input
              type="tel"
              placeholder="Mobile Number"
              className="w-full p-2 border rounded"
            />
            
            <button
              type="button"
              onClick={requestOtp}
              disabled={cooldown > 0}
              className="shadow-lg rounded-lg hover:scale-105"
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Send OTP"}
            </button> 
          </div>}

          {verify && (
            <div className="flex flex-row gap-2">
              <input
                type="tel"
                placeholder="Enter OTP"
                className="w-full p-2 border rounded"
              />
              {!verified &&
              <button
                type="button"
                onClick={handleOtpSubmit}
                className="shadow-lg rounded-lg hover:scale-105"
              >
                Submit OTP
              </button>}
            </div>
          )}

          {verified && (
            <div>
              {/* Problem type dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowOptions(!showOptions)}
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

              <textarea
                placeholder="Write your grievance here..."
                className="w-full p-2 border rounded mt-3"
              ></textarea>
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
