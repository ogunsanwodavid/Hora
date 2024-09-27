import { Link } from "react-router-dom";

import pageNotFoundImg from "../../assets/pageNotFound.svg";

function PageNotFound() {
  return (
    <div className="font-raleway w-full min-h-screen bg-darkestBlue flex flex-col gap-y-3 items-center justify-center px-6">
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
