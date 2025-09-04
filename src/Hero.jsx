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

  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        setNavHeight(rect.height);
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight - 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  useEffect(() => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setNavHeight(rect.height);
    }
  }, [isSticky, mobileOpen]);

  return (
    <div className="hero min-h-screen h-auto relative flex flex-col">
      {/* Backgrounds */}
      <div className="hero-bg bg1"></div>
      <div className="hero-bg bg2"></div>
      <div className="hero-bg bg3"></div>
      <div className="hero-bg bg4"></div>

      {/* Overlay (stays under text now) */}
      <div className="hero-overlay absolute inset-0 bg-black/40 z-10"></div>

      {/* Top bar + Navigation */}
      <div className="headbg text-white w-full z-50 relative">
        <div className="flex flex-col md:flex-row border-b justify-between px-3 md:px-32">
          <div className="flex flex-wrap items-center gap-2 my-2">
            <i className="pi pi-phone p-1"></i>
            <p className="text-[12px] md:text-[14px]">+000 123 45 6789</p>
            <span className="hidden md:inline px-2">|</span>
            <i className="pi pi-envelope p-1"></i>
            <p className="text-[12px] md:text-[15px]">
              OneFunLogistics@gmail.com
            </p>
          </div>
          <div className="flex gap-3 my-2 text-xs md:text-sm">
            <a href="#"><i className="pi pi-facebook"></i></a>
            <a href="#"><i className="pi pi-twitter"></i></a>
            <a href="#"><i className="pi pi-linkedin"></i></a>
            <a href="#"><i className="pi pi-whatsapp"></i></a>
            <a href="#"><i className="pi pi-discord"></i></a>
            <a href="#"><i className="pi pi-instagram"></i></a>
          </div>
        </div>

        {/* Navigation Bar */}
        <div
          className={`transition-all duration-300 z-50 w-full ${
            isSticky
              ? "fixed top-0 left-0 right-0 bg-white shadow-lg text-black"
              : "relative bg-transparent text-white"
          }`}
        >
          <div
            ref={navRef}
            className="mx-4 md:mx-24 w-full max-w-6xl px-2 sm:px-4 md:px-8 py-2 md:py-3 flex items-center justify-between"
          >
            {/* Logo */}
            <h1
              className={`text-lg md:text-2xl font-semibold ${
                isSticky ? "text-blue-900" : "text-white"
              }`}
            >
              <span className="text-blue-300">OneFun</span>-Logistics
            </h1>

            {/* Search */}
            <div className="hidden lg:flex items-center ml-6">
              <i
                className={`pi pi-search p-2 text-xs rounded border ${
                  isSticky
                    ? "text-blue-600 border-black"
                    : "text-white border-white"
                }`}
              ></i>
              <input
                className={`ml-2 focus:outline-none w-32 md:w-64 text-sm rounded-sm px-2 py-1 ${
                  isSticky
                    ? "bg-gray-100 border border-black text-black"
                    : "bg-white border border-black text-black"
                }`}
                type="text"
                placeholder="Tracking ID..."
              />
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-6">
              {menu.map((item, index) => (
                <a
                  key={index}
                  href={links[item]}
                  className={`font-medium ${
                    isSticky
                      ? "text-black hover:text-blue-600"
                      : "text-white hover:text-blue-300"
                  }`}
                >
                  {item}
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:block ml-6">
              <button className="px-5 py-2 rounded-md bg-amber-300 text-white font-semibold">
                Contact us
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className={`ml-auto md:hidden p-2 ${
                isSticky ? "text-black" : "text-white"
              }`}
            >
              <i className={`pi ${mobileOpen ? "pi-times" : "pi-bars"} text-xl`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          className={`md:hidden w-full transition-all duration-300 ease-in-out z-40 ${
            mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: navRef.current
              ? `${Math.round(navRef.current.getBoundingClientRect().bottom)}px`
              : `${navHeight}px`,
            maxHeight: mobileOpen ? "55vh" : "0",
            overflow: "hidden",
            background: "white",
            boxShadow: mobileOpen ? "0 6px 24px rgba(0,0,0,0.12)" : "none",
          }}
        >
          <div className="px-3 py-3 flex flex-col gap-2">
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
            <button className="mt-2 w-full text-left px-3 py-2 rounded-md bg-amber-300 font-semibold text-sm">
              Contact us for services
            </button>
          </div>
        </div>
      </div>

      {/* Hero Content (above overlay now) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-1/3 w-[90vw] max-w-5xl px-4 text-left text-white z-20">
        <h1 className="uppercase text-sm sm:text-lg md:text-2xl tracking-[5px] mb-2">
          Let's make your life easier
        </h1>
        <h1 className="text-2xl sm:text-5xl md:text-6xl font-semibold mb-6">
          Fast and Dependable Delivery
        </h1>
        <button className="bg-blue-600 rounded-sm py-2 px-6 text-sm sm:text-lg">
          How can we help you
        </button>
      </div>

      {/* Features (also above overlay) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[70%] w-[95vw] max-w-5xl flex flex-col sm:flex-row gap-4 sm:gap-10 items-center justify-center z-20">
        {list.map((item, index) => (
          <div
            key={index}
            className="w-full sm:w-72 bg-white px-4 py-3 rounded-sm shadow-md flex items-center"
          >
            <i
              className={`pi ${item.icon} ${iconstyles[index]} p-3 rounded-full text-white text-2xl mr-3`}
            />
            <h1 className="text-lg sm:text-xl">{item.text}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
