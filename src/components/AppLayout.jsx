import { Outlet } from "react-router-dom";

import useWindowDimensions from "../hooks/useWindowDimensions";

import Sidebar from "../ui/Sidebar";

function AppLayout() {
  const { windowHeight } = useWindowDimensions();

  return (
    <div
      className="font-raleway w-full bg-electricBlue100  lg:flex lg:items-center"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <main
        className="w-full h-max bg-darkestBlue lg:w-[1100px] lg:h-[640px] lg:mx-auto lg:flex lg:rounded-3xl lg:!min-h-0"
        style={{
          minHeight: `${windowHeight}px`,
        }}
      >
        <Sidebar />
        <section className="w-full lg:p-[24px]">
          <main className="px-6 py-10 pb-20 lg:h-full lg:pb-0 lg:px-0 lg:py-0 overflow-y-auto main-scrollbar">
            <Outlet />
          </main>
        </section>
      </main>
    </div>
  );
}

export default AppLayout;
