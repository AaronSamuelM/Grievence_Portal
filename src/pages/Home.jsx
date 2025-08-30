const Home = () => {
  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        

        {/* Content Area */}
        <main className="flex flex-1 p-6 bg-[#ddd]">
          {/* About Section */}
          <div className="flex-1 bg-[#ccc]  p-6 rounded-lg shadow">
            <h2 className="text-black text-4xl font-semibold ">About</h2>
            <p className="text-gray-700 text-2xl">
              The Grievance Portal is designed to streamline the process of
              raising, tracking, and resolving complaints for the citizens of
              Jharkhand. This platform ensures transparency, accountability, and
              timely responses from government authorities.
            </p>
          </div>

          {/* Useful Links */}
          <div className="w-64  ml-6 bg-[#ccc] p-6 rounded-lg shadow">
            <h2 className="text-lg text-black font-semibold mb-4">Useful Links</h2>
            <ul className="list-disc list-inside text-black space-y-2">
                <li >
                  <a href="#" className=" underline text-black hover:text-gray-800 visited:text-purple-800">Jharkhand Govt Official Website</a>
                </li>
                <li>
                  <a  href="#" className="underline text-black hover:text-gray-800 visited:text-purple-800" >Citizen Services</a>
                </li>
                <li>
                  <a href="#" className="underline text-black hover:text-gray-800 visited:text-purple-800">Helpline Numbers</a>
                </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
