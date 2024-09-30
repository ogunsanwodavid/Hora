import useWindowDimensions from "../../hooks/useWindowDimensions";

import Logo from "../../assets/logo.svg";

function LoadingPage() {
  const { windowHeight } = useWindowDimensions();
  return (
    <div
      className="w-full bg-darkestBlue flex items-center justify-center"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <img src={Logo} className="logo-scale w-16 md:w-24" alt="" />
    </div>
  );
}

export default LoadingPage;
