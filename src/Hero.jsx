import { useEffect, useRef, useState } from "react";

export default function App() {
  const menu = ["Home", "About Us", "Couriers", "News", "Contact"];
  const links = {
    Home: "#",
    "About Us": "#",
    Couriers: "#",
    News: "#",
    Contact: "#",
  };
  const list = [
    { icon: "pi-car", text: "Last Mile Deliveries" },
    { icon: "pi-map", text: "Route Optimization" },
    { icon: "pi-map-marker", text: "GPS Tracking" },
  ];
  const iconstyles = ["bg-green-400", "bg-yellow-400", "bg-pink-400"];

  // Sticky nav state
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef(null);

  // Mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);
  // measured nav height (used to position mobile dropdown reliably)
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setNavHeight(rect.height);
      }
    };

    // measure on mount + on resize
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // when the user scrolls past the hero viewport, make the nav sticky
      if (window.scrollY > window.innerHeight - 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  // ensure navHeight updates when sticky state changes (because layout can change)
  useEffect(() => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setNavHeight(rect.height);
    }
  }, [isSticky, mobileOpen]);

  return (
    <div className="hero min-h-screen h-auto relative flex flex-col">
      {/* Backgrounds (keep your existing background layers) */}
      <div className="hero-bg bg1"></div>
      <div className="hero-bg bg2"></div>
      <div className="hero-bg bg3"></div>
      <div className="hero-bg bg4"></div>
      <div className="hero-overlay"></div>

      {/* Top bar */}
      <div className="headbg text-white w-full">
        <div className="flex flex-col md:flex-row border-b justify-between px-3 md:px-32">
          <div className="flex flex-wrap items-center gap-2 my-2">
            <i className="pi pi-phone p-1" style={{ color: "white" }}></i>
            <p className="text-[12px] md:text-[14px] text-white">+000 123 45 6789</p>
            <span className="hidden md:inline px-2">|</span>
            <i className="pi pi-envelope p-1" style={{ color: "white" }}></i>
            <p className="text-[12px] md:text-[15px] text-white">OneFunLogistics@gmail.com</p>
          </div>
          <div className="flex gap-3 my-2 text-xs md:text-sm">
            <a href="https://www.facebook.com/asagade.alex" target="_blank" rel="noopener noreferrer">
              <i className="pi pi-facebook" style={{ color: "white" }}></i>
            </a>
            <a href="PLACEHOLDER_TWITTER_LINK" target="_blank" rel="noopener noreferrer">
              <i className="pi pi-twitter" style={{ color: "white" }}></i>
            </a>
            <a href="PLACEHOLDER_LINKEDIN_LINK" target="_blank" rel="noopener noreferrer">
              <i className="pi pi-linkedin" style={{ color: "white" }}></i>
            </a>
            <a href="PLACEHOLDER_WHATSAPP_LINK" target="_blank" rel="noopener noreferrer">
              <i className="pi pi-whatsapp" style={{ color: "white" }}></i>
            </a>
            <a href="PLACEHOLDER_DISCORD_LINK" target="_blank" rel="noopener noreferrer">
              <i className="pi pi-discord" style={{ color: "white" }}></i>
            </a>
            <a href="PLACEHOLDER_INSTAGRAM_LINK" target="_blank" rel="noopener noreferrer">
              <i className="pi pi-instagram" style={{ color: "white" }}></i>
            </a>
          </div>
        </div>

        {/* Navigation Bar outer: full-bleed background when sticky, but inner content constrained */}
        <div
          className={`transition-all duration-300 z-50 w-full ${
            isSticky ? "fixed top-0 left-0 right-0 bg-white shadow-lg text-black" : "relative bg-transparent text-white"
          }`}
          style={{ transitionProperty: "background, color, box-shadow, transform" }}
        >
          {/* Inner container: constrained width so sticky nav content fits nicely on mobile */}
          <div
            ref={navRef}
            className={`mx-auto w-full max-w-4xl px-2 sm:px-4 md:px-8 py-2 md:py-3 flex items-center gap-3 md:gap-4`}
          >
            {/* smaller logo on mobile, same on desktop */}
            <h1 className={`text-lg md:text-2xl font-semibold ${isSticky ? "text-blue-900" : "text-white"}`}>
              <span className="text-blue-300 text-sm md:text-base">OneFun</span>-<span className="hidden sm:inline">Logistics</span>
              <span className="sm:hidden">Logi</span>
            </h1>

            {/* search icon & input - on small screens we keep this compact */}
            <div className="ml-2 flex items-center w-full md:w-auto">
              <i
                className={`pi pi-search p-2 text-[12px] md:text-xs rounded border-1 ${isSticky ? "text-blue-600 border-black" : "text-white border-white"}`}
              ></i>

              <input
                className={`ml-2 focus:outline-none placeholder-black placeholder:p-2 w-20 sm:w-36 md:w-64 text-xs sm:text-sm md:text-sm rounded-sm px-2 py-1 transition-all duration-300 ${
                  isSticky ? "bg-gray-100 border-1 border-black placeholder-black text-black" : "bg-transparent placeholder-white text-white border-1 border-transparent"
                }`}
                type="text"
                placeholder="Tracking ID"
              />
            </div>

            {/* Desktop links (hidden on mobile) */}
            <nav className="hidden md:flex md:items-center md:ml-6 gap-4 flex-1">
              {menu.map((item, index) => (
                <a
                  key={index}
                  href={links[item]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-2 md:px-3 font-medium transition-colors duration-300 ${
                    isSticky ? "text-black hover:text-blue-600" : "text-white hover:text-blue-300"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex md:ml-4">
              <button className={`cursor-pointer font-semibold px-3 md:px-5 py-1 md:py-2 rounded-md bg-amber-300 ${isSticky ? "text-white" : "text-white"}`}>
                Contact us
              </button>
            </div>

            {/* Mobile hamburger button (visible only on small screens) */}
            <button
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((s) => !s)}
              className={`ml-auto md:hidden p-2 rounded-md focus:outline-none focus:ring-2 ${isSticky ? "text-black" : "text-white"}`}
            >
              <i className={`pi ${mobileOpen ? "pi-times" : "pi-bars"} text-xl`} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu (only renders on small screens)
            NOTE: we position it using the navRef measured bottom so it sits under the inner nav container */}
        <div
          id="mobile-menu"
          className={`md:hidden w-full transition-all duration-300 ease-in-out z-40 ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: navRef.current ? `${Math.round(navRef.current.getBoundingClientRect().bottom)}px` : `${navHeight}px`,
            maxHeight: mobileOpen ? "55vh" : "0",
            overflow: "hidden",
            background: "white",
            boxShadow: mobileOpen ? "0 6px 24px rgba(0,0,0,0.12)" : "none",
            transitionProperty: "top, max-height, opacity",
          }}
        >
          <div className={`px-3 py-3 flex flex-col gap-2 ${mobileOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
            {menu.map((item, index) => (
              <a
                key={index}
                href={links[item]}
                onClick={() => setMobileOpen(false)}
                className="py-2 px-3 rounded hover:bg-gray-100 font-medium text-black text-sm"
              >
                {item}
              </a>
            ))}

            {/* Mobile CTA */}
            <button onClick={() => setMobileOpen(false)} className="mt-2 w-full text-left px-3 py-2 rounded-md bg-amber-300 font-semibold text-sm">
              Contact us for services
            </button>
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 top-1/3 w-[90vw] max-w-5xl px-4 sm:px-8 text-left text-white animate__animated animate__zoomIn"
        style={{ zIndex: 2 }}
      >
        <h1 className="uppercase text-sm sm:text-lg md:text-2xl tracking-[5px] mb-2">Let's make your life easier</h1>
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-semibold mb-6">Fast and Dependable Delivery</h1>
        <button className="bg-blue-600 rounded-sm py-2 px-6 text-sm sm:text-lg">How can we help you</button>
      </div>

      <div
        className="absolute left-1/2 transform -translate-x-1/2 top-[70%] w-[95vw] max-w-5xl flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-center"
        style={{ zIndex: 2 }}
      >
        {list.map((item, index) => (
          <div key={index} className="w-full sm:w-72 bg-white px-4 py-3 rounded-sm shadow-md text-left animate__animated animate__fadeInDown flex items-center">
            <i className={`pi ${item.icon} ${iconstyles[index]} p-3 rounded-full text-white text-2xl mr-3`} />
            <h1 className="text-lg sm:text-xl">{item.text}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
