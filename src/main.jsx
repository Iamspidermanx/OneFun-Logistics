import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import Hero from "./Hero.jsx";
import About from "./About.jsx";
import Courier from "./Courier.jsx";
import Delivery from "./Delivery.jsx";
import Footer from "./Footer.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

// ✅ Use Vite env variable
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Landing page component
function LandingPage() {
  return (
    <>
      <Hero />
      <About />
      <Courier />
      <Delivery />
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Keep /order route if you want a separate form page */}
          <Route path="/order" element={<Delivery />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  </StrictMode>
);
