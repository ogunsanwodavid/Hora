import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/authContext";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import { CubeSpinner } from "react-spinners-kit";

function LoggingOutLoader() {
  const { windowHeight, windowWidth } = useWindowDimensions();

  const navigate = useNavigate();

  const { isLoggingOut } = useAuth();

  useEffect(() => {
    if (!isLoggingOut) {
      navigate("/");
    }
  }, [isLoggingOut, navigate]);

  return (
    <div
      className="font-raleway w-full bg-darkestBlue flex flex-col items-center justify-center px-6 gap-y-6 lg:gap-y-7"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <CubeSpinner
        size={windowWidth < 1200 ? 50 : 60}
        frontColor="#3F71FD"
        backColor="rgba(147, 180, 255, 1)"
      />
      <p className="max-w-[350px] mx-auto text-white text-center font-semibold lg:text-lg">
        We are logging you out.
      </p>
    </div>
  );
}

export default LoggingOutLoader;
