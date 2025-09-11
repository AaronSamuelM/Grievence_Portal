import React, { useState, useEffect } from "react";

const About = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Check for desktop or mobile devices
  useEffect(() => {
    const updateDeviceType = () => {
      if (window.innerWidth >= 1024) {
        setIsDesktop(true);
      } else {
        setIsDesktop(false);
      }
    };

    updateDeviceType(); // Check initial window size

    window.addEventListener("resize", updateDeviceType); // Update on window resize

    return () => {
      window.removeEventListener("resize", updateDeviceType); // Clean up the event listener
    };
  }, []);

  // Handle mouse move only on desktop
  const handleMouseMove = (e) => {
    if (!hovering || !isDesktop) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = e.target.getBoundingClientRect();

    // Calculate tilt based on mouse position
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Normalize tilt values to [-1, 1] range
    setTilt({
      x: deltaX / (width / 2),
      y: deltaY / (height / 2),
    });
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setTilt({ x: 0, y: 0 }); // Reset tilt when the cursor leaves
  };

  // Apply tilt effect to the image
  const tiltStyle = {
    transform: `perspective(1000px) rotateX(${tilt.y * 10}deg) rotateY(${tilt.x * 10}deg)`,
    transition: "transform 0.1s ease-out", // Smooth transition for tilting
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* About Section */}
      <section className="py-6 bg-[#f5f5f5] text-center">
        <h1 className="text-4xl font-bold text-[#22406d]">Jharkhand at a Glance</h1>
        <p className="text-lg text-gray-700 mt-2">
          Jharkhand ("The Land of Forests") is a state in eastern India, created on 15 November 2000. It shares borders with Bihar, Uttar Pradesh, Chhattisgarh, Odisha, and West Bengal.
        </p>
      </section>

      {/* Image and Text Section */}
      <section className="flex flex-col md:flex-row lg:flex-row items-center justify-between gap-8 px-6 py-12 bg-white">
        <div className="flex-1 text-center md:text-left">
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            Jharkhand is the 15th largest state in India by area, covering 79,710 km². The state's capital is Ranchi, and Dumka is its sub-capital. Famous for its scenic landscapes, waterfalls, and holy sites like Baidyanath Dham and Rajrappa, Jharkhand stands as a state rich in cultural and natural heritage.
          </p>
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            The state is home to many indigenous communities and has a significant history of tribal culture and freedom movements. It’s also well-known for its mining, industry, and power plants.
          </p>
          <h2 className="text-2xl font-semibold text-[#22406d] mb-4">Government Officials</h2>
          <div className="flex justify-center gap-12">
            {/* Official Cards */}
            <div className="text-center hover:scale-105 transition-transform duration-300">
              <img src="/D001WhosWho31072024081249514.jpeg" alt="Governor" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <p className="text-xl font-semibold text-[#22406d]">Shri Santosh Kumar Gangwar</p>
              <p>Governor</p>
            </div>

            <div className="text-center hover:scale-105 transition-transform duration-300">
              <img src="/D002WhosWho250920240144590681.jpg" alt="Chief Minister" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <p className="text-xl font-semibold text-[#22406d]">Shri Hemant Soren</p>
              <p>Chief Minister</p>
            </div>

            <div className="text-center hover:scale-105 transition-transform duration-300">
              <img src="/D001WhosWho07112024013408001.jpg" alt="Chief Secretary" className="w-24 h-24 rounded-full mx-auto mb-4" />
              <p className="text-xl font-semibold text-[#22406d]">Smt Alka Tiwari</p>
              <p>Chief Secretary</p>
            </div>
          </div>
        </div>

        {/* Jharkhand Map Image with Tilt Effect */}
        <div className="flex-1">
          <img
            src="/jharkhand-map.png"
            alt="Jharkhand Map"
            className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
            style={tiltStyle}  // Apply dynamic tilt style
            onMouseMove={handleMouseMove}  // Track mouse movements over the image
            onMouseEnter={handleMouseEnter} // Set hover state when entering image area
            onMouseLeave={handleMouseLeave} // Reset tilt when mouse leaves image
          />
        </div>
      </section>

      {/* Additional Sections */}
      <section className="px-8 py-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-[#22406d] mb-6">Facts about Jharkhand</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-[#22406d]">Area</h3>
            <p className="text-lg text-gray-700 mt-2">79,710 km²</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-[#22406d]">Capital</h3>
            <p className="text-lg text-gray-700 mt-2">Ranchi</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-[#22406d]">Population</h3>
            <p className="text-lg text-gray-700 mt-2">3.3 Crores</p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="px-8 py-6 bg-white">
        <h2 className="text-3xl font-bold text-center text-[#22406d] mb-6">History of Jharkhand</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Jharkhand was part of Bihar until it was formed as a separate state on November 15, 2000. The creation of Jharkhand was the result of a long struggle by the indigenous tribal communities to preserve their land and culture. The state celebrates its foundation day on the 15th of November, which marks the birth anniversary of the tribal leader Bhagwan Birsa Munda.
        </p>
      </section>

      {/* Economy Section */}
      <section className="px-8 py-6 bg-gray-50">
        <h2 className="text-3xl font-bold text-center text-[#22406d] mb-6">Economy of Jharkhand</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Jharkhand is rich in natural resources, including minerals such as coal, iron ore, and mica. The state's economy is primarily driven by mining and industrial sectors, particularly steel and cement manufacturing. Key industries include Tata Steel, Bokaro Steel Plant, and several power plants that supply energy to the rest of India.
        </p>
      </section>

      {/* Culture Section */}
      <section className="px-8 py-6 bg-white">
        <h2 className="text-3xl font-bold text-center text-[#22406d] mb-6">Culture of Jharkhand</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Jharkhand is known for its rich tribal culture, diverse folklore, music, and dance forms. The tribal communities have a deep connection to their land, and festivals like Sohrai, Tusu, and Karma are celebrated with great enthusiasm. Handicrafts such as Dokra and wood carvings are a significant part of Jharkhand’s cultural heritage.
        </p>
      </section>
    </div>
  );
};

export default About;
