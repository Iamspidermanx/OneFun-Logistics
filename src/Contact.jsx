import React from 'react';
import { useInView } from 'react-intersection-observer';

export default function App() {
  const { ref: nameRef, inView: nameInView } = useInView({ triggerOnce: true });
  const { ref: emailRef, inView: emailInView } = useInView({ triggerOnce: true });
  const { ref: addressRef, inView: addressInView } = useInView({ triggerOnce: true });
  const { ref: dropoffRef, inView: dropoffInView } = useInView({ triggerOnce: true });
  const { ref: phoneRef, inView: phoneInView } = useInView({ triggerOnce: true });
  const { ref: packageRef, inView: packageInView } = useInView({ triggerOnce: true });
  const { ref: buttonRef, inView: buttonInView } = useInView({ triggerOnce: true });

  return (
    <div className="min-h-screen flex items-start justify-center py-16 px-4 sm:px-6 bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 sm:p-10">
        <h1 className="text-center text-3xl sm:text-4xl font-semibold mb-8">Place a Delivery</h1>

        {/* form grid */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div
            ref={nameRef}
            className={`w-full ${nameInView ? 'animate__animated animate__fadeInLeft' : 'opacity-0 translate-y-3'} transition-all`}
          >
            <label htmlFor="fullName" className="sr-only">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-label="Full Name"
            />
          </div>

          {/* Email */}
          <div
            ref={emailRef}
            className={`w-full ${emailInView ? 'animate__animated animate__fadeInRight' : 'opacity-0 translate-y-3'} transition-all`}
          >
            <label htmlFor="email" className="sr-only">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-label="Email Address"
            />
          </div>

          {/* Delivery Address */}
          <div
            ref={addressRef}
            className={`w-full md:col-span-2 ${addressInView ? 'animate__animated animate__fadeInLeft' : 'opacity-0 translate-y-3'} transition-all`}
          >
            <label htmlFor="address" className="sr-only">Delivery Address</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Delivery Address"
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-label="Delivery Address"
            />
          </div>

          {/* Home / Dropoff Address */}
          <div
            ref={dropoffRef}
            className={`w-full md:col-span-2 ${dropoffInView ? 'animate__animated animate__fadeInRight' : 'opacity-0 translate-y-3'} transition-all`}
          >
            <label htmlFor="dropoff" className="sr-only">Home / Drop off Address</label>
            <input
              id="dropoff"
              name="dropoff"
              type="text"
              placeholder="Home / Drop off Address"
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-label="Home or Drop off Address"
            />
          </div>

          {/* Phone Number */}
          <div
            ref={phoneRef}
            className={`w-full ${phoneInView ? 'animate__animated animate__fadeInLeft' : 'opacity-0 translate-y-3'} transition-all`}
          >
            <label htmlFor="phone" className="sr-only">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-200"
              aria-label="Phone Number"
            />
          </div>

          {/* Package Description */}
          <div
            ref={packageRef}
            className={`w-full md:col-span-2 ${packageInView ? 'animate__animated animate__fadeInUp' : 'opacity-0 translate-y-3'} transition-all`}
          >
            <label htmlFor="description" className="sr-only">Package Description</label>
            <textarea
              id="description"
              name="description"
              rows={5}
              placeholder="Package Description"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
              aria-label="Package Description"
            />
          </div>

          {/* Submit button */}
          <div className="w-full md:col-span-2 flex justify-center">
            <button
              ref={buttonRef}
              type="submit"
              className={`mt-2 inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 ${
                buttonInView ? 'animate__animated animate__fadeInUp' : 'opacity-0 translate-y-3'
              } transition-all`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
