import React, { useState } from 'react';

// Replace with your deployed Google Apps Script URL
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyKIuM2bEd3mCUsbaLkPgnRLnPrkZIZKpGz7t5W-DX2S-ZfuAA-85lelUnsiaJjaEmI/exec";

export default function Courier() {
  const employee = {
    name: "Asagade Oyewale",
    position: "Senior Courier",
    photo: "./assets/ceo.jpg",
    contact: {
      phone: "+1 234 567 8901",
      email: "asagade@onefunlogistics.com",
    },
    bio: `Asagade has over 2 years of experience in last-mile delivery and logistics. He is known for his reliability, attention to detail, and friendly customer service. Asagade ensures every package is delivered safely and on time.`,
    stats: {
      deliveries: 150,
      years: 2,
      rating: 4.9,
    },
  };

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userSuccess, setUserSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "",
    experience: "",
    license: "",
    vehicle: "",
    why: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  // Convert form data to query string
  const params = new URLSearchParams(form).toString();

  try {
    // GET request to Apps Script Web App
    const response = await fetch(`${APPS_SCRIPT_URL}?${params}`);
    const result = await response.json();

    if (result.status === "success") {
      setUserSuccess(true);
      setTimeout(() => {
        setForm({
          name: "",
          email: "",
          phone: "",
          experience: "",
          license: "",
          vehicle: "",
          why: "",
          address: "",
          dob: "",
          gender: "",
        });
        setUserSuccess(false);
        setSubmitted(true);
        setLoading(false);
      }, 4500);
    } else {
      setLoading(false);
      alert("Failed to submit application. Try again.");
    }
  } catch (error) {
    console.error(error);
    setLoading(false);
    alert("Failed to submit application. Try again.");
  }
};

  return (
    <div className="min-h-screen mt-44 bg-gray-50 flex flex-col items-center justify-center py-8 px-2 sm:px-4">
      {/* Header */}
      <header className="w-full bg-blue-700 py-6 mb-8 shadow">
        <h1 className="text-2xl sm:text-3xl font-bold text-white text-center tracking-wide">
          OneFun Logistics - Employee Profile
        </h1>
      </header>

      {!showForm ? (
        <>
          <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full max-w-5xl">
            {/* Profile Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 flex-1 flex flex-col items-center">
              <img
                src={employee.photo}
                alt={employee.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-blue-500 mb-4"
              />
              <h2 className="text-xl sm:text-2xl font-bold text-blue-700">{employee.name}</h2>
              <p className="text-gray-600">{employee.position}</p>
              <div className="mt-4 sm:mt-6 w-full">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Contact</h3>
                <p className="text-gray-700 text-sm sm:text-base">
                  <span className="font-medium">Phone:</span> {employee.contact.phone}
                </p>
                <p className="text-gray-700 text-sm sm:text-base">
                  <span className="font-medium">Email:</span> {employee.contact.email}
                </p>
              </div>
              <div className="mt-4 sm:mt-6 w-full">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">About</h3>
                <p className="text-gray-700 text-sm sm:text-base">{employee.bio}</p>
              </div>
              <div className="mt-4 sm:mt-6 flex justify-between text-center w-full max-w-xs">
                <div>
                  <div className="text-lg sm:text-xl font-bold text-blue-600">{employee.stats.deliveries}</div>
                  <div className="text-gray-500 text-xs sm:text-sm">Deliveries</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-blue-600">{employee.stats.years}</div>
                  <div className="text-gray-500 text-xs sm:text-sm">Years</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-blue-600">{employee.stats.rating}★</div>
                  <div className="text-gray-500 text-xs sm:text-sm">Rating</div>
                </div>
              </div>
            </div>
            {/* Image Beside Profile, responsive */}
            <div className="flex-1 flex justify-center items-center rounded-lg shadow-lg">
              <img
                src="./assets/employee.png"
                alt="Courier at work"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full h-full sm:h-64 md:h-80 lg:h-full object-cover rounded-lg shadow"
                style={{ aspectRatio: "3/4" }}
              />
            </div>
          </div>
          {/* Apply Button at the bottom */}
          <div className="w-full max-w-5xl flex justify-center mt-8 px-2">
            <button
              className="w-full sm:w-1/2 md:w-1/3 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              onClick={() => setShowForm(true)}
            >
              Apply to be a Courier
            </button>
          </div>
        </>
      ) : submitted ? (
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Application Submitted!</h2>
          <p className="text-gray-700 mb-4">
            Thank you for applying to be a courier with OneFun Logistics. We will review your application and contact you soon.
          </p>
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={() => {
              setShowForm(false);
              setSubmitted(false);
              setForm({
                name: "",
                email: "",
                phone: "",
                experience: "",
                license: "",
                vehicle: "",
                why: "",
                address: "",
                dob: "",
                gender: "",
              });
            }}
          >
            Back to Profile
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Courier Application Form</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* 4. Add or remove fields as needed for your sheet */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Do you have courier/delivery experience?</label>
              <select
                name="experience"
                value={form.experience}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Do you have a valid driver's license?</label>
              <select
                name="license"
                value={form.license}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Do you have your own vehicle?</label>
              <select
                name="vehicle"
                value={form.vehicle}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Select</option>
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="van">Van</option>
                <option value="none">None</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Why do you want to be a courier?</label>
              <textarea
                name="why"
                value={form.why}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                rows={3}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
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
                "Submit Application"
              )}
            </button>
            {userSuccess && (
              <p className="mt-2 text-green-600 font-medium">
                Application submitted successfully!
              </p>
            )}
          </form>
          <button
            type="button"
            className="w-full mt-2 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}