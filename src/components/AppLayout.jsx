import { Outlet } from "react-router-dom";

import { useAppDesign } from "../contexts/appDesignContext";

import useWindowDimensions from "../hooks/useWindowDimensions";

import Sidebar from "../ui/Sidebar";
import MobileNavbar from "../ui/MobileNavbar";

function AppLayout() {
  //Window size info
  const { windowHeight } = useWindowDimensions();

  //App design info
  const { showcaseMobileNav } = useAppDesign();

  return (
    <div
      className="font-raleway w-full bg-electricBlue100  lg:flex lg:items-center"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <main
        className="w-full h-max bg-darkestBlue overflow-hidden lg:w-[980px] lg:h-[600px] lg:mx-auto lg:flex lg:rounded-3xl lg:!min-h-0"
        style={{
          minHeight: `${windowHeight}px`,
        }}
      >
        <Sidebar />
        <section className="w-full relative lg:p-[24px]">
          <main className="px-5 py-10 pb-[100px] lg:h-full lg:pb-0 lg:px-[8px] lg:py-0 overflow-y-auto main-scrollbar">
            <Outlet />
          </main>
        </section>

        {showcaseMobileNav && <MobileNavbar />}
      </main>
    </div>
  );
}

export default AppLayout;
