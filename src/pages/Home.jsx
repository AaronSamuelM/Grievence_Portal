import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    pending: 0,
    resolutionRate: 0,
  });
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  
  useEffect(() => {
    const base = import.meta.env.VITE_APP_API_URL || "";
    const primary = `${base}/stats`;
    const fallback = "/mock/stats.json";

    const fetchStats = async (url) => {
      const res = await fetch(url, { credentials: "include" }).catch(() => null);
      if (!res || !res.ok) throw new Error("Failed to load stats");
      const data = await res.json();
      setStats({
        total: data.total ?? 0,
        resolved: data.resolved ?? 0,
        pending: data.pending ?? 0,
        resolutionRate:
          data.resolutionRate ??
          (data.total ? Math.round((data.resolved / data.total) * 100) : 0),
      });
    };

    (async () => {
      try {
        await fetchStats(primary);
      } catch {
        try {
          await fetchStats(fallback);
        } catch {
          setErr("Could not load statistics.");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <section className="text-center py-6 bg-gray-50">
        <h1 className="text-4xl font-bold text-[#22406d]">
          Grievance Redressal Portal
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          File your complaints and track them easily
        </p>
      </section>

      <div className="flex justify-center gap-8 py-6 bg-gray-100">
        <Link
          to="/grievance"
          className="bg-[#22406d] text-white px-8 py-4 text-lg rounded-lg shadow-lg 
          hover:bg-[#1b3255] hover:scale-105 transition-transform duration-300"
        >
          Raise Grievance
        </Link>
        <Link
          to="/track"
          className="bg-green-600 text-white px-8 py-4 text-lg rounded-lg shadow-lg 
          hover:bg-green-700 hover:scale-105 transition-transform duration-300"
        >
          Track Complaint
        </Link>
      </div>

      <main className="flex flex-1 flex-col md:flex-row lg:flex-row px-8 py-6 bg-gray-100 gap-6" style={{ backgroundImage: "url('./slider202.png')" }}>
        <div className="flex-1 bg-[#ddddddcb] hover:bg-white p-6 rounded-lg shadow-lg flex items-center gap-6 transition-all hover:scale-101 duration-300 ease-in-out">
          <div className="flex-1">
            <h2 className="text-2xl  font-semibold text-[#22406d] mb-3">About</h2>
            <p className="text-gray-700  text-lg leading-relaxed">
              The Grievance Portal is designed to streamline the process of
              raising, tracking, and resolving complaints for the citizens of
              Jharkhand. This platform ensures transparency, accountability, and
              timely responses from government authorities.
            </p>
          </div>
        </div>

        <aside className="p-2 gap-2 flex flex-1 flex-col rounded text-blue-700 font-medium  hover:text-blue-900 transition duration-200"
>
          <div className="bg-[#ddddddcb] hover:bg-white transition-all hover:scale-101 duration-300 ease-in-out p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-[#22406d] mb-4">
              Useful Links
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="block p-2 rounded hover:bg-blue-100 hover:text-blue-900 
                  transition duration-200"
                >
                  Jharkhand Govt Official Website
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block p-2 rounded hover:bg-blue-100 hover:text-blue-900 
                  transition duration-200"
                >
                  Citizen Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block p-2 rounded hover:bg-blue-100 hover:text-blue-900 
                  transition duration-200"
                >
                  Helpline Numbers
                </a>
              </li>
            </ul>
          </div>

          <div className=" p-6 rounded-lg bg-[#ddddddcb] transition-all hover:scale-101 duration-300 ease-in-out hover:bg-white shadow-lg">
            <h2 className="text-xl font-semibold text-[#22406d] mb-4">News</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="block p-2 rounded hover:bg-green-100 hover:text-green-900 
                  transition duration-200"
                >
                  Govt launches new complaint monitoring system →
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block p-2 rounded hover:bg-green-100 hover:text-green-900 
                  transition duration-200"
                >
                  Portal maintenance scheduled for this weekend →
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </main>
      {!err && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-6 bg-gray-50">
          <div className="bg-blue-100 p-6 rounded-lg text-center shadow-lg hover:bg-blue-200 
          hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-[#22406d]">
              Complaints Resolved
            </h3>
            <p className="text-2xl text-black font-bold mt-2">
              {loading ? "…" : stats.resolved.toLocaleString()}
            </p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg text-center shadow-lg hover:bg-yellow-200 
          hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-yellow-700">
              Complaints Pending
            </h3>
            <p className="text-2xl text-black font-bold mt-2">
              {loading ? "…" : stats.pending.toLocaleString()}
            </p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg text-center shadow-lg hover:bg-green-200 
          hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-green-700">
              Resolution Rate
            </h3>
            <p className="text-2xl text-black font-bold mt-2">
              {loading ? "…" : `${stats.resolutionRate}%`}
            </p>
          </div>
        </div>
      )}

      {/* Error Message (if stats fail) */}
      {err && (
        <div className="px-8 py-4 bg-red-100 text-red-700 rounded mx-8 mt-2">
          {err}
        </div>
      )}
{/* How to File a Complaint */}
<section className="px-8 py-6 bg-gray-50">
  <div
    className="bg-white p-8 rounded-lg shadow-lg flex items-center gap-6
               hover:bg-gray-200  transition-transform duration-300"
  >
    {/* Text Content */}
    <div className="flex-1">
      <h2 className="text-2xl font-semibold text-[#22406d] mb-3">
        How to File a Complaint
      </h2>
      <p className="text-gray-700 text-lg leading-relaxed mb-4">
        Citizens can follow a few simple steps to raise their complaints
        online without visiting government offices.
      </p>
      <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed space-y-2">
        <li>Login to the portal using your credentials</li>
        <li>Fill out the complaint form with details</li>
        <li>Attach any supporting documents if required</li>
        <li>Submit and track your complaint in real-time</li>
        <li>
          You can also raise complaints via{" "}
          <span className="font-semibold">📧 grievance@jharkhand.gov.in</span>{" "}
          or <span className="font-semibold">📱 WhatsApp: +91-9876543210</span>
        </li>
      </ul>
    </div>

    {/* Image */}
    <img
      src="/support.png"
      alt="How to File"
      className="hidden lg:block w-1/3 rounded-lg shadow-md"
    />
  </div>
</section>



      {/* Functionality Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-6 bg-gray-50">
        <div
          className="bg-white p-8 rounded-lg shadow-lg text-center
          hover:bg-gray-200 hover:scale-105 transition-transform duration-300"
        >
          <h3 className="text-xl font-bold text-[#22406d] mb-3">
            Raise Complaints Easily
          </h3>
          <p className="text-gray-600">
            Citizens can submit their grievances online without visiting
            offices.
          </p>
        </div>
        <div
          className="bg-white p-8 rounded-lg shadow-lg text-center
          hover:bg-gray-200 hover:scale-105 transition-transform duration-300"
        >
          <h3 className="text-xl font-bold text-[#22406d] mb-3">
            Track Status in Real-Time
          </h3>
          <p className="text-gray-600">
            Stay updated on the progress of your complaint with instant tracking.
          </p>
        </div>
        <div
          className="bg-white p-8 rounded-lg shadow-lg text-center
          hover:bg-gray-200 hover:scale-105 transition-transform duration-300"
        >
          <h3 className="text-xl font-bold text-[#22406d] mb-3">
            Ensure Transparency
          </h3>
          <p className="text-gray-600">
            The system ensures fair handling of grievances with accountability.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;

