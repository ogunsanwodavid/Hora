import { Link } from "react-router-dom";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import pageNotFoundImg from "../../assets/pageNotFound.svg";

function PageNotFound() {
  const { windowHeight } = useWindowDimensions();
  return (
    <div
      className="font-raleway w-full bg-darkestBlue flex flex-col gap-y-3 items-center justify-center px-6"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <img src={pageNotFoundImg} className="w-full max-w-[301px]" alt="" />
      <Link className="w-full" to="/">
        <button className="w-max mx-auto px-6 py-3 bg-blue200 rounded-[50px] text-white text-base font-semibold flex items-center justify-center">
          Back To Home
        </button>
      </Link>
    </div>
  );
}

export default PageNotFound;
