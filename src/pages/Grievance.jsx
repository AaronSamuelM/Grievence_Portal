import { useState, useRef, useEffect } from "react";

function Grievance() {
  const [selectedProblems, setSelectedProblems] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);

  const problemTypes = [
    "Technical Issue",
    "Network Problem",
    "Facilities",
    "Harassment",
    "Academic",
    "Administration",
    "Transport",
    "Hostel",
    "Other"
  ];

  const handleCheckboxChange = (problem) => {
    setSelectedProblems((prev) =>
      prev.includes(problem)
        ? prev.filter((item) => item !== problem)
        : [...prev, problem]
    );
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
    <div>
      <h1 className="text-xl font-bold mb-3">Raise a Grievance</h1>
      <form className="space-y-3">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 border rounded"
        />

        {/* Problem type dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setShowOptions(!showOptions)}
            className="w-full p-2 border rounded bg-gray-100 text-left"
          >
            {selectedProblems.length > 0
              ? selectedProblems.join(", ")
              : "Select Type of Problem"}
          </button>

          {showOptions && (
            <div className="absolute z-10 w-full border rounded p-2 h-28 overflow-y-scroll mt-1 bg-white shadow">
              {problemTypes.map((problem, idx) => (
                <label key={idx} className="flex items-center space-x-2 mb-1">
                  <input
                    type="checkbox"
                    checked={selectedProblems.includes(problem)}
                    onChange={() => handleCheckboxChange(problem)}
                  />
                  <span>{problem}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <textarea
          placeholder="Write your grievance here..."
          className="w-full p-2 border rounded"
        ></textarea>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Grievance;
