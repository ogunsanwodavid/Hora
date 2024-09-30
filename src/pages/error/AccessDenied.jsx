import { Link } from "react-router-dom";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import accessDeniedImg from "../../assets/accessDenied.svg";

function AccessDenied() {
  const { windowHeight } = useWindowDimensions();

  return (
    <div
      className="font-raleway w-full bg-darkestBlue flex flex-col gap-y-2 items-center justify-center px-6"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <img src={accessDeniedImg} className="w-full max-w-[301px]" alt="" />

      {/*  <h1 className="font-semibold text-xl text-white text-center">
        Access Denied; Login Required
      </h1> */}
      <h2 className="font-regular text-base text-white text-center">
        Oops! It looks like you are trying to access a page that requires
        authentication.
      </h2>

      <section className="w-full flex items-center justify-center gap-3 flex-wrap">
        <Link className="" to="/signin">
          <button className="w-[166px] mx-auto px-6 py-3 bg-blue300 rounded-[50px] text-white text-base font-semibold flex items-center justify-center">
            Sign In
          </button>
        </Link>

        <Link className="" to="/createaccount">
          <button className="w-[166px] mx-auto px-6 py-3 bg-blue300 rounded-[50px] text-white text-base font-semibold flex items-center justify-center">
            Create Account
          </button>
        </Link>
      </section>
    </div>
  );
}

export default AccessDenied;
