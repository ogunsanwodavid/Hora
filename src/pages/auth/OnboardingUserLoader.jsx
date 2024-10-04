import useWindowDimensions from "../../hooks/useWindowDimensions";

import { CubeSpinner } from "react-spinners-kit";

function OnboardingPageLoader() {
  const { windowHeight, windowWidth } = useWindowDimensions();
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
        We are preparing your account, this may take a few moments.
      </p>
    </div>
  );
}

export default OnboardingPageLoader;
