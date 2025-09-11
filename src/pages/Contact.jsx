import { useState } from "react";

const faqs = [
  { q: "How can I raise a grievance?", a: "You can log in to the portal, click 'Raise Grievance', fill the form with details, and submit. You’ll receive a tracking ID instantly." },
  { q: "Can I submit without logging in?", a: "For better tracking and updates, login is recommended. However, you may still submit via email or WhatsApp." },
  { q: "What documents are required?", a: "It depends on the nature of your grievance. Identity proof and supporting evidence (photos, bills, notices) are usually helpful." },
  { q: "How long does it take to resolve a grievance?", a: "Resolution time varies by department, but most grievances are addressed within 7–15 working days." },
  { q: "Can I edit my grievance after submission?", a: "Once submitted, grievances cannot be edited, but you may submit additional documents or clarifications." }
];

const Contact = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="text-center py-10 bg-gray-50">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#22406d]">
          Contact Us
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-gray-700 mt-2">
          Reach out for support, feedback, or grievance-related queries
        </p>
      </section>

      {/* Steps to Contact */}
      <section className="px-4 md:px-8 lg:px-20 py-10 bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#22406d] mb-6">
            Steps to Reach Us
          </h2>
          <ol className="list-decimal list-inside text-gray-700 text-base md:text-lg lg:text-xl leading-relaxed space-y-3">
            <li>Login to the portal with your credentials</li>
            <li>Navigate to the <strong>Contact Us</strong> section</li>
            <li>Choose your preferred channel – Form, Email, or WhatsApp</li>
            <li>Submit your query or request with relevant details</li>
            <li>Receive acknowledgment and tracking ID for follow-up</li>
          </ol>
        </div>
      </section>

      {/* Contact Options */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-20 py-10 bg-gray-50">
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg text-center hover:bg-blue-200 transition-all duration-300">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#22406d] mb-3">📧 Email</h3>
          <p className="text-gray-700 text-base md:text-lg">grievance@jharkhand.gov.in</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-lg text-center hover:bg-green-200 transition-all duration-300">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-green-700 mb-3">📱 WhatsApp</h3>
          <p className="text-gray-700 text-base md:text-lg">+91-9876543210</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-lg text-center hover:bg-yellow-200 transition-all duration-300">
          <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-yellow-700 mb-3">☎️ Helpline</h3>
          <p className="text-gray-700 text-base md:text-lg">1800-123-456</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-4 md:px-8 lg:px-20 py-10 bg-gray-100">
  <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
    {/* Form */}
    <div>
      <h2 className="text-2xl md:text-3xl font-semibold text-[#22406d] mb-6">
        Contact Form
      </h2>
      <form className="grid grid-cols-1 gap-6">
  <input
    type="text"
    placeholder="Your Name"
    className="p-3 border border-gray-300 rounded-lg w-full 
               focus:outline-none focus:ring-2 focus:ring-[#22406d] 
               placeholder-gray-500"
  />
  <input
    type="email"
    placeholder="Your Email"
    className="p-3 border border-gray-300 rounded-lg w-full 
               focus:outline-none focus:ring-2 focus:ring-[#22406d] 
               placeholder-gray-500"
  />
  <textarea
    rows="4"
    placeholder="Your Message"
    className="p-3 border border-gray-300 rounded-lg w-full 
               focus:outline-none focus:ring-2 focus:ring-[#22406d] 
               placeholder-gray-500"
  ></textarea>
  <button
    type="submit"
    className="bg-[#22406d] text-white py-3 rounded-lg shadow-md 
               hover:bg-[#1b3255] transition-transform hover:scale-105"
  >
    Submit
  </button>
</form>

    </div>

    {/* Illustration (only visible on large screens) */}
    <div className="hidden lg:flex justify-center">
      <img
        src="/support.png"
        alt="Contact Support"
        className="w-4/5 rounded-lg shadow-md"
      />
    </div>
  </div>
</section>

      {/* FAQs */}
      <section className="px-4 md:px-8 lg:px-20 py-10 bg-gray-50">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#22406d] mb-6 text-center">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              <button
                className="w-full text-left flex justify-between items-center font-medium text-base md:text-lg text-[#22406d]"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              >
                {item.q}
                <span className="text-xl">{openFAQ === index ? "−" : "+"}</span>
              </button>
              {openFAQ === index && (
                <p className="mt-3 text-gray-700 text-sm md:text-base">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-20 py-10 bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-gray-200 transition-all">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#22406d] mb-3">Quick Response</h3>
          <p className="text-gray-600 text-sm md:text-base">Most queries are resolved within 24–48 hours.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-gray-200 transition-all">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#22406d] mb-3">Multi-Channel Support</h3>
          <p className="text-gray-600 text-sm md:text-base">Email, WhatsApp, and Helpline available for ease.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:bg-gray-200 transition-all">
          <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#22406d] mb-3">Escalation</h3>
          <p className="text-gray-600 text-sm md:text-base">Unresolved issues are auto-escalated to higher officials.</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
