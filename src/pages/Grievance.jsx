function Grievance() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Raise a Grievance</h1>
      <form className="space-y-3">
        <input type="text" placeholder="Your Name" className="w-full p-2 border rounded" />
        <input type="email" placeholder="Your Email" className="w-full p-2 border rounded" />
        <textarea placeholder="Write your grievance here..." className="w-full p-2 border rounded"></textarea>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
}
export default Grievance;
