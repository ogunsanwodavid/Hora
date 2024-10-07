import { Outlet } from "react-router-dom";

import useWindowDimensions from "./hooks/useWindowDimensions";

import Sidebar from "./ui/Sidebar";
import { useEffect, useRef, useState } from "react";

function AppLayout() {
  const { windowHeight } = useWindowDimensions();

  const mainRef = useRef(null);
  const [isHeightSufficient, setIsHeightSufficient] = useState(false);

  useEffect(() => {
    // Function to check the height of the main element
    const checkHeight = () => {
      if (mainRef.current) {
        const mainHeight = mainRef.current.offsetHeight;
        setIsHeightSufficient(mainHeight > 616);
      }
    };

    // Run the height check on mount
    checkHeight();

    // Optionally, listen for window resize to update height dynamically
    window.addEventListener("resize", checkHeight);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", checkHeight);
    };
  }, []);

  return (
    <div
      className="font-raleway w-full bg-electricBlue100  lg:flex lg:items-center"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <main
        className="w-full h-max bg-darkestBlue overflow-hidden lg:w-[1100px] lg:h-[640px] lg:mx-auto lg:flex lg:rounded-3xl lg:!min-h-0"
        style={{
          minHeight: `${windowHeight}px`,
        }}
      >
        <Sidebar />
        <section className="w-full lg:p-[24px]">
          <main
            ref={mainRef}
            className={`h-max px-6 py-10 pb-20 lg:pb-0 lg:px-0 lg:py-0 ${
              isHeightSufficient
                ? "main-scrollbar relative overflow-y-scroll"
                : "no-scrollbar"
            }`}
          >
            <Outlet />
          </main>
        </section>
      </main>
    </div>
  );
}

export default AppLayout;
