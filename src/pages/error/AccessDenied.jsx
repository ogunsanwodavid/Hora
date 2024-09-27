import { Link } from "react-router-dom";

import accessDeniedImg from "../../assets/accessDenied.svg";

function AccessDenied() {
  return (
    <div className="w-full min-h-screen bg-darkestBlue flex flex-col gap-y-2 items-center justify-center px-6">
      <img src={accessDeniedImg} className="w-full max-w-[301px]" alt="" />

      <h1 className="font-semibold text-xl text-white text-center">
        Access Denied; Login Required
      </h1>
      <h2 className="font-regular text-base text-white text-center">
        Oops! It looks like you are trying to access a page that requires
        authentication.
      </h2>

      <Link className="w-full" to="/signin">
        <button className="w-[165px] mx-auto px-6 py-3 bg-blue300 rounded-[50px] text-white text-base font-semibold flex items-center justify-center">
          Sign In
        </button>
      </Link>

      <Link className="w-full" to="/createaccount">
        <button className="w-[165px] mx-auto px-6 py-3 bg-blue300 rounded-[50px] text-white text-base font-semibold flex items-center justify-center">
          Create Account
        </button>
      </Link>
    </div>
  );
}

export default AccessDenied;
