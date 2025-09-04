import { useEffect, useState, useRef } from "react";

function App() {
  const [isInView, setIsInView] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const sectionRef = useRef(null);

  // Split the paragraph into two parts
  const firstHalf = (
    <>
      Welcome to OneFun Logistics — my name is Asagade Onesimus Oyewale, and I am proud to be the driving force behind this business. What began as a small idea to help people and businesses move their goods more easily has grown into a personal mission to provide reliable, transparent, and customer-focused logistics services.
      <br /><br />
      Unlike big companies where packages often get lost in the system, with me, your delivery always has my full attention. As a one-man operation, every pickup, every mile driven, and every drop-off is carried out by me personally. This means you’re not just another number in a queue — you’re a valued client whose satisfaction matters to me.
      <br /><br />
      One of the key features I’ve built into my service is real-time tracking. I know how stressful it can be waiting for a delivery without updates, so I’ve made sure that you’ll always know where your package is and when it will arrive. From the moment I pick up your item until it reaches its destination, you’ll have complete visibility.
    </>
  );

  const secondHalf = (
    <>
      <br />
      At OneFun Logistics, my approach is simple:<br /><br />
      - Personal Service – You’ll always deal directly with me. No middlemen, no customer service runarounds.<br /><br />
      - Reliability – I treat every package as if it were my own, making sure it arrives safely and on time.<br /><br />
      - Transparency – With real-time tracking, you’re never left in the dark.<br /><br />
      - Affordability – I believe quality logistics shouldn’t come with unnecessary costs.<br /><br />
      Whether you’re a small business that needs regular deliveries or an individual sending something special to a loved one, I am here to make the process stress-free. Every delivery, big or small, is a chance for me to build trust and long-term relationships.
      <br /><br />
      As OneFun Logistics continues to grow, my vision is to scale up while keeping the same personal touch that sets me apart today. But no matter how big this business becomes, my focus will always remain the same: delivering your goods safely, on time, and with honesty.
      <br /><br />
      Thank you for trusting me with your deliveries — I look forward to being your go-to logistics partner.
    </>
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      className="flex flex-col-reverse md:flex-row justify-between mt-24 items-center min-h-screen px-4 py-8 md:py-0 md:px-16 bg-white"
      ref={sectionRef}
    >
      <div
        className={`
          ${isInView ? "animate__animated animate__fadeInLeft" : "opacity-0"}
          flex-1
          ${showFull
            ? "w-full max-w-4xl px-2 md:px-12 mt-8 md:mt-0"
            : "w-full md:w-auto md:px-8 mt-8 md:mt-0"}
        `}
      >
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4`}>
          Welcome to OneFun Logistics
        </h1>
        <p
          className={`mt-5 text-gray-800 text-base sm:text-lg ${
            showFull ? "w-full max-w-3xl" : "w-full md:w-[550px]"
          }`}
        >
          {firstHalf}
          {showFull && secondHalf}
        </p>
        <div className="flex gap-4 mt-6">
          {!showFull ? (
            <button
              className="text-white bg-blue-500 p-3 px-5 rounded-full"
              onClick={() => setShowFull(true)}
            >
              Learn more
            </button>
          ) : (
            <button
              className="text-blue-500 bg-white border border-blue-500 p-3 px-5 rounded-full"
              onClick={() => setShowFull(false)}
            >
              Show less
            </button>
          )}
        </div>
      </div>
      {!showFull && (
        <div
          className={`
            flex-1 flex justify-center items-center mb-8 md:mb-0
            ${isInView ? "animate__animated animate__fadeInRight" : "opacity-0"}
          `}
        >
          <img
            src="/assets/door.png"
            alt=""
            className="max-w-full h-auto"
          />
        </div>
      )}
    </div>
  );
}

export default App;
