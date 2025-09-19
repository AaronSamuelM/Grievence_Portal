import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { useTrackGrievance, useListGrievances } from "../queries/grievance";

function Track({ LoggedIn }) {
  const [formData, setFormData] = useState({
    complaintId: "",
    mobile: "",
  });
  const [complaints, setComplaints] = useState([]); // array now
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  // 🔹 If logged in, auto-fetch all grievances
  useEffect(() => {
    if (LoggedIn) {
      const mobile = localStorage.getItem("user_mobile");
      if (!mobile) return;

      setLoading(true);
      useListGrievances({ mobile })
        .then((res) => setComplaints(res.data.data || []))
        .catch(() => setError("Failed to load grievances"))
        .finally(() => setLoading(false));
    }
  }, [LoggedIn]);

  // 🔹 Non-logged-in submit handler
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setLoading(true);
      setComplaints([]);

      try {
        const data = await useTrackGrievance({
          complaintId: formData.complaintId,
          mobile: formData.mobile,
        });
        setComplaints([data.data.data]); // keep array format
      } catch (err) {
        console.error("Error tracking complaint:", err);
        setError("Complaint not found. Please check your details.");
      } finally {
        setLoading(false);
      }
    },
    [formData]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 transition hover:shadow-xl">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 border-b pb-3 flex items-center gap-2">
            <Search className="w-5 h-5 text-green-600" />
            Track Complaint
          </h2>

          {/* Non-logged-in form */}
          {!LoggedIn && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder="Enter Complaint ID"
                value={formData.complaintId}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, complaintId: e.target.value }))
                }
                className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-green-500 transition"
                required
              />
              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={formData.mobile}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, mobile: e.target.value }))
                }
                className="w-full p-3 border text-black rounded-lg focus:ring-2 focus:ring-green-500 transition"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 hover:scale-[1.02] transition disabled:opacity-50"
              >
                {loading ? "Fetching..." : "Track Complaint"}
              </button>
            </form>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 p-3 rounded bg-red-100 text-red-700 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Complaint List */}
          {complaints.length > 0 && (
            <div className="mt-8 space-y-6">
              {complaints.map((complaint) => (
                <div
                  key={complaint._id}
                  className="bg-white border rounded-2xl p-6 shadow-md"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">
                    Complaint Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left */}
                    <div className="space-y-4 text-gray-700">
                      <div>
                        <span className="font-semibold text-gray-900">Complaint ID:</span>
                        <p>{complaint._id}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Name:</span>
                        <p>{complaint.name}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Mobile:</span>
                        <p>{complaint.mobile}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Title:</span>
                        <p>{complaint.title}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Description:</span>
                        <p className="text-sm leading-relaxed">{complaint.grievance}</p>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="space-y-4 text-gray-700">
                      <div>
                        <span className="font-semibold text-gray-900">Department:</span>
                        <p>{complaint.department}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Location:</span>
                        <p>{complaint.address || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">Status:</span>
                        <span
                          className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                            complaint.status === "resolved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {complaint.status || "Pending"}
                        </span>
                      </div>

                      {/* Images */}
                      {complaint.imageURL && complaint.imageURL.length > 0 && (
                        <div>
                          <span className="font-semibold text-gray-900 block mb-2">Images:</span>
                          <div className="grid grid-cols-2 gap-4">
                            {complaint.imageURL.map((img, idx) => (
                              <img
                                key={idx}
                                src={`${import.meta.env.VITE_APP_API_URL}/grievance${img.trim()}`}
                                alt={`Complaint Image ${idx + 1}`}
                                className="rounded-xl shadow-md object-cover w-full h-40 cursor-pointer hover:scale-105 transition-transform"
                                onClick={() =>
                                  setSelectedImage(
                                    `${import.meta.env.VITE_APP_API_URL}/grievance${img.trim()}`
                                  )
                                }
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-[#020203]/80 flex items-center justify-center z-50">
          <div className="relative max-w-3xl max-h-[90vh]">
            <button
              className="absolute -top-8 right-0 text-white hover:text-red-400"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={selectedImage}
              alt="Selected Complaint"
              className="rounded-lg shadow-lg max-h-[90vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Track;
