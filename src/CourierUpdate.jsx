import React, { useState } from "react";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyK9OqlubvgI_vtBriqEgPAVQZIwrLdaS5fE7tv25GZfRVqhnwPPtWSvVFLGdAEU7C4/exec"; 

export default function CourierUpdate() {
  const [trackingId, setTrackingId] = useState("");
  const [status, setStatus] = useState("In Transit");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Get live location and update order
  const updateLocation = () => {
    if (!trackingId.trim()) {
      setMessage("❌ Please enter a tracking ID");
      return;
    }

    if (!navigator.geolocation) {
      setMessage("❌ Geolocation is not supported by this browser");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        try {
          const res = await fetch(
            `${APPS_SCRIPT_URL}?action=updateOrder&trackingId=${trackingId}&status=${encodeURIComponent(
              status
            )}&lat=${lat}&lng=${lng}`
          );
          const data = await res.json();
          if (data.status === "updated") {
            setMessage("✅ Location & status updated successfully!");
          } else {
            setMessage("⚠️ Tracking ID not found");
          }
        } catch (err) {
          console.error(err);
          setMessage("❌ Error updating location. Try again.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setMessage("❌ Failed to get location");
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          🚚 Courier Update
        </h1>

        {/* Tracking ID */}
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="p-3 border rounded-xl mb-4 w-full focus:ring-2 focus:ring-indigo-300"
        />

        {/* Status Selector */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-3 border rounded-xl mb-6 w-full focus:ring-2 focus:ring-indigo-300"
        >
          <option value="Pending">Pending</option>
          <option value="Picked Up">Picked Up</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>

        {/* Update Button */}
        <button
          onClick={updateLocation}
          disabled={loading}
          className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Location"}
        </button>

        {/* Message */}
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.startsWith("✅")
                ? "text-green-600"
                : message.startsWith("⚠️")
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
