// src/pages/Home.jsx
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-blue-800 text-white p-4 shadow-md">
          <h1 className="text-xl font-bold">
            Government of Jharkhand – Grievance Portal
          </h1>
        </header>

        {/* Content Area */}
        <main className="flex flex-1 p-6 bg-gray-100">
          {/* About Section */}
          <div className="flex-1 bg-white  p-6 rounded-lg shadow">
            <h2 className="text-black text-4xl font-semibold ">About</h2>
            <p className="text-gray-700 text-3xl">
              The Grievance Portal is designed to streamline the process of
              raising, tracking, and resolving complaints for the citizens of
              Jharkhand. This platform ensures transparency, accountability, and
              timely responses from government authorities.
            </p>
          </div>

          {/* Useful Links */}
          <aside className="w-64  ml-6 bg-blue-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Useful Links</h2>
            <ul className="list-disc list-inside text-white space-y-2">
                <li >
                  <a href="#" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Jharkhand Govt Official Website</a>
                </li>
                <li>
                  <a  href="#" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" >Citizen Services</a>
                </li>
                <li>
                  <a href="#" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Helpline Numbers</a>
                </li>
            </ul>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default Home;
