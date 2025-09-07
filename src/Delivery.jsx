import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;
const SHEET_URL = "https://docs.google.com/spreadsheets/d/1EwwzCx9EmMavzvEAQz8T8-oPnMeoUh7RcKkIyolq2so/edit";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [userSuccess, setUserSuccess] = useState(false);
  const [staffSuccess, setStaffSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStaffLoginSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const email = decoded.email;
      setStaffSuccess(true);
      setTimeout(() => {
        window.open(SHEET_URL, "_blank");
      }, 500);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      alert("Staff login failed.");
    }
  };

  const handleStaffLoginError = () => {
    alert("Staff login failed.");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const params = new URLSearchParams({
      fullName,
      email,
      address,
      dropoff,
      phone,
      description,
    }).toString();

    try {
      const response = await fetch(`${APPS_SCRIPT_URL}?${params}`);
      const result = await response.json();

      if (result.status === "success") {
        setUserSuccess(true);
        setTimeout(() => {
          setFullName("");
          setEmail("");
          setAddress("");
          setDropoff("");
          setPhone("");
          setDescription("");
          setUserSuccess(false);
          setLoading(false);
        }, 4500); // 1.5s + 3s = 4.5s
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error submitting order:", error);
      alert("Failed to submit order. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-16 px-4 sm:px-6 bg-gray-50">
      {/* Staff Login Section */}
      <div className="w-full max-w-md mb-12 bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Staff Login</h2>
        <GoogleLogin
          onSuccess={handleStaffLoginSuccess}
          onError={handleStaffLoginError}
        />
        {staffSuccess && (
          <p className="mt-2 text-green-600 font-medium">
            Staff login successful! Opening sheet...
          </p>
        )}
      </div>

      {/* User Order Form */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 sm:p-10">
        <h1 className="text-center text-3xl sm:text-4xl font-semibold mb-8">
          Place a Delivery
        </h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded-full"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Delivery Address"
            className="w-full p-3 border rounded-full md:col-span-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Home / Drop off Address"
            className="w-full p-3 border rounded-full md:col-span-2"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 border rounded-full md:col-span-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <textarea
            rows={5}
            placeholder="Package Description"
            className="w-full p-4 border rounded-xl md:col-span-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="w-full md:col-span-2 flex flex-col items-center">
            <button
              type="submit"
              className="mt-2 px-6 py-3 rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </button>
            {userSuccess && (
              <p className="mt-2 text-green-600 font-medium">
                Order submitted successfully!
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
