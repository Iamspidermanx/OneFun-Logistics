import React, { useState } from "react";

// Apps Script URL for user form submission
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyK9OqlubvgI_vtBriqEgPAVQZIwrLdaS5fE7tv25GZfRVqhnwPPtWSvVFLGdAEU7C4/exec";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [userSuccess, setUserSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [trackingId, setTrackingId] = useState("");

  // User form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const params = new URLSearchParams({
      action: "createOrder",
      fullName,
      email,
      address,
      dropoff,
      phone,
      description,
    });

    setLoading(true);

    try {
      const response = await fetch(`${APPS_SCRIPT_URL}?${params.toString()}`);
      const result = await response.json();

      console.log("Response:", result);

      if (result.status === "success") {
        setTrackingId(result.trackingId || "");
        setUserSuccess(true);

        // Reset form after showing success
        setTimeout(() => {
          setFullName("");
          setEmail("");
          setAddress("");
          setDropoff("");
          setPhone("");
          setDescription("");
          setLoading(false);
        }, 3000);
      } else {
        setLoading(false);
        alert("Something went wrong: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting order:", error);
      alert("Failed to submit order. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-16 px-4 sm:px-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* User Order Form */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-10 border border-gray-100">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold mb-8 text-gray-800">
          Place a Delivery
        </h1>
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-full focus:ring-2 focus:ring-blue-300"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-full focus:ring-2 focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Delivery Address"
            className="w-full p-3 border rounded-full md:col-span-2 focus:ring-2 focus:ring-blue-300"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Drop off Address"
            className="w-full p-3 border rounded-full md:col-span-2 focus:ring-2 focus:ring-blue-300"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-full md:col-span-2 focus:ring-2 focus:ring-blue-300"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <textarea
            rows={5}
            placeholder="Package Description"
            className="w-full p-4 border rounded-xl md:col-span-2 focus:ring-2 focus:ring-blue-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="w-full md:col-span-2 flex flex-col items-center">
            <button
              type="submit"
              className={`mt-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center justify-center shadow-md hover:from-blue-700 hover:to-purple-700 transition`}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </button>
            {userSuccess && (
              <div className="mt-4 text-center">
                <p className="text-green-600 font-medium text-lg">
                  🎉 Order submitted successfully!
                </p>
                {trackingId && (
                  <p className="mt-2 text-blue-700 font-semibold">
                    Your Tracking ID:{" "}
                    <span className="bg-blue-100 px-2 py-1 rounded-md">
                      {trackingId}
                    </span>
                  </p>
                )}
                {trackingId && (
                  <a
                    href={`/track/${trackingId}`}
                    className="mt-3 inline-block text-sm text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-full shadow-md"
                  >
                    Track Package
                  </a>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
