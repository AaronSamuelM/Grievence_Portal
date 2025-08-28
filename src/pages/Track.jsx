function Track() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-3">Track Complaint</h1>
      <form className="space-y-3">
        <input type="text" placeholder="Enter Complaint ID" className="w-full p-2 border rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Track
        </button>
      </form>
    </div>
  );
}
export default Track;
