import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

import Hero from "./Hero.jsx";
import About from "./About.jsx";
import Courier from "./Courier.jsx";
import Delivery from "./Delivery.jsx";
import Footer from "./Footer.jsx";
import Vission from "./Vission.jsx";
import CourierUpdate from "./CourierUpdate.jsx";
import Tracking from "./Tracking.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";

// ✅ Use Vite env variable
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Landing page component
function LandingPage() {
  return (
    <>
      <Hero />
      <About />
      <Vission />
      <Courier />
      <Delivery />
      <Footer />
    </>
  );
}

// Page layout with navigation and footer
function PageLayout({ children }) {
  return (
    <>
      <Hero />
      {children}
      <Footer />
    </>
  );
}

function AppFontWrapper({ children }) {
  return (
    <div style={{ fontFamily: "Poppins, sans-serif" }}>
      {children}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AppFontWrapper>
        <Router>
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<LandingPage />} />

            {/* About page with nav and footer */}
            <Route
              path="/about"
              element={
                <PageLayout>
                  <About />
                </PageLayout>
              }
            />

            {/* Vission page with nav and footer */}
            <Route
              path="/vission"
              element={
                <PageLayout>
                  <Vission />
                </PageLayout>
              }
            />

            {/* Courier page with nav and footer */}
            <Route
              path="/courier"
              element={
                <PageLayout>
                  <Courier />
                </PageLayout>
              }
            />

            {/* Delivery page with nav and footer */}
            <Route
              path="/order"
              element={
                <PageLayout>
                  <Delivery />
                </PageLayout>
              }
            />

            {/* Courier update page with nav and footer */}
            <Route
              path="/courier-update"
              element={
                <PageLayout>
                  <CourierUpdate />
                </PageLayout>
              }
            />

            {/* Tracking page with nav and footer */}
            <Route
              path="/track/:trackingId"
              element={
                <PageLayout>
                  <Tracking />
                </PageLayout>
              }
            />
          </Routes>
        </Router>
      </AppFontWrapper>
    </GoogleOAuthProvider>
  </StrictMode>
);
