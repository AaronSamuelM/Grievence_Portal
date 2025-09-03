import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});
{
// Need to set up a simple API endpoint in your backend

// server.js 
// import express from "express";
// import fetch from "node-fetch";

// const app = express();

// app.get("/api/reverse-geocode", async (req, res) => {
//   const { lat, lon } = req.query;
//   const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

//   try {
//     const response = await fetch(url, {
//       headers: {
//         "User-Agent": "Jharkhand-Grievance-App/1.0 (your-email@example.com)",
//       },
//     });
//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch reverse geocode" });
//   }
// });

// app.listen(5000, () => console.log("Proxy running on http://localhost:5000"));

// Since there is error in CORS for mobile dev development
}

// 📍 Jharkhand bounding box
const BOUNDS = {
  west: 82.5,
  south: 21.0,
  east: 88.5,
  north: 25.8,
};

function LocationPicker({ onLocationSelect }) {
  const [manualAddress, setManualAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [useCurrent, setUseCurrent] = useState(false);
  const [coords, setCoords] = useState({ lat: 23.3441, lng: 85.3096 });
  const [tempCoords, setTempCoords] = useState({ lat: 23.3441, lng: 85.3096 });
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [warning, setWarning] = useState("");

  // 🔹 Show warning UI (disappears after 3s)
  const showWarning = (msg) => {
    setWarning(msg);
    setTimeout(() => setWarning(""), 3000);
  };

  // 🔹 Check geofence
  const isInsideJharkhand = (lat, lon) =>
    lon >= BOUNDS.west &&
    lon <= BOUNDS.east &&
    lat >= BOUNDS.south &&
    lat <= BOUNDS.north;

  // 🔹 Reverse geocode lat/lng → address
  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      return data.display_name || `Lat: ${lat}, Lng: ${lng}`;
    } catch (err) {
      console.error("Reverse geocoding failed:", err);
      return `Lat: ${lat}, Lng: ${lng}`;
    }
  };

  // 🔹 Debounced search restricted to Jharkhand
  const handleAddressChange = (e) => {
    const value = e.target.value;
    setManualAddress(value);

    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(async () => {
      if (value.length > 2) {
        try {
          const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            value
          )}&addressdetails=1&bounded=1&viewbox=${BOUNDS.west},${BOUNDS.north},${BOUNDS.east},${BOUNDS.south}`;
          const res = await fetch(url);
          const data = await res.json();
          setSuggestions(data);
        } catch {
          showWarning("Error fetching address suggestions.");
        }
      } else {
        setSuggestions([]);
      }
    }, 500);

    setDebounceTimer(timer);
  };

  // 🔹 Select suggestion
  const handleSuggestionClick = (s) => {
    const lat = parseFloat(s.lat);
    const lng = parseFloat(s.lon);

    if (!isInsideJharkhand(lat, lng)) {
      showWarning("Please select a location within Jharkhand.");
      return;
    }

    setCoords({ lat, lng });
    setTempCoords({ lat, lng });
    setManualAddress(s.display_name);
    setSuggestions([]);

    onLocationSelect?.({ lat, lng, address: s.display_name });
  };

  // 🔹 Current location
  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      showWarning("Geolocation not supported.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        if (!isInsideJharkhand(lat, lng)) {
          showWarning("Your current location is outside Jharkhand.");
          return;
        }

        const addr = await reverseGeocode(lat, lng);
        setCoords({ lat, lng });
        setTempCoords({ lat, lng });
        setManualAddress(addr);

        onLocationSelect?.({ lat, lng, address: addr });
      },
      () => showWarning("Unable to fetch current location.")
    );
  };

  // 🔹 Toggle mode
  const toggleLocationMode = () => {
    setUseCurrent((prev) => {
      const next = !prev;
      if (next) fetchCurrentLocation();
      return next;
    });
  };

  // 🔹 Map click handler
  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setTempCoords(e.latlng);
      },
    });
    return null;
  }

  // 🔹 Confirm location
  const confirmLocation = async () => {
    if (!isInsideJharkhand(tempCoords.lat, tempCoords.lng)) {
      showWarning("Selected location is outside Jharkhand boundaries.");
      return;
    }

    const addr = await reverseGeocode(tempCoords.lat, tempCoords.lng);
    setCoords(tempCoords);
    setManualAddress(addr);

    onLocationSelect?.({ lat: tempCoords.lat, lng: tempCoords.lng, address: addr });
  };

  return (
    <div className="bg-[#ddd] p-3 rounded-lg border relative">
      {/* Warning Banner */}
      {warning && (
        <div className="absolute top-0 left-0 right-0 bg-yellow-400 text-black text-sm text-center py-1 rounded-t">
          {warning}
        </div>
      )}

      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-black">Location</span>
        <button
          type="button"
          onClick={toggleLocationMode}
          className="text-sm px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {useCurrent ? "Use Manual" : "Use Current Location"}
        </button>
      </div>

      {!useCurrent && (
        <div className="relative mb-2">
          <input
            type="text"
            placeholder="Enter address..."
            value={manualAddress}
            onChange={handleAddressChange}
            className="w-full p-2 border rounded"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-[9999] w-full bg-white border rounded mt-1 max-h-40 overflow-y-auto shadow">
              {suggestions.map((s, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSuggestionClick(s)}
                  className="px-2 py-1 hover:bg-gray-200 cursor-pointer"
                >
                  {s.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Map */}
      <div className="rounded-lg overflow-hidden mb-2">
        <MapContainer
          center={[coords.lat, coords.lng]}
          zoom={12}
          style={{ height: "250px", width: "100%" }}
          zoomControl
          scrollWheelZoom={false}
          doubleClickZoom={false}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
          />
          <Marker
            position={[tempCoords.lat, tempCoords.lng]}
            draggable
            eventHandlers={{
              dragend: (e) => {
                const newPos = e.target.getLatLng();
                setTempCoords(newPos);
              },
            }}
          />
          <MapClickHandler />
        </MapContainer>
      </div>

      {!useCurrent && (
        <button
          type="button"
          onClick={confirmLocation}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Set Location
        </button>
      )}
    </div>
  );
}

export default LocationPicker;
