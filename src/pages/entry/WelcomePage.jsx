import { Link } from "react-router-dom";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import Logo from "../../assets/logo.svg";
import resetPasswordImg from "../../assets/resetpassword.svg";

function WelcomePage() {
  const { windowHeight } = useWindowDimensions();

  return (
    <div
      className="font-raleway w-full bg-gradient-to-br from-blue300 via-darkestBlue to-blue300  lg:flex lg:items-center"
      style={{
        minHeight: `${windowHeight}px`,
      }}
    >
      <main
        className="w-full h-max px-6 py-10 pb-20 flex items-center justify-center lg:pb-0 lg:px-0 lg:py-0 lg:w-max lg:mx-auto lg:gap-x-5  lg:!min-h-0"
        style={{
          minHeight: `${windowHeight}px`,
        }}
      >
        <section className="w-full max-w-[500px] mx-auto lg:w-[500px] lg:flex lg:flex-col lg:items-center lg:justify-center lg:p-6 lg:gap-y-4">
          {/*** Logo */}
          <section className="w-20 h-20 mx-auto flex items-center justify-center p-3 rounded-full bg-darkestBlue ">
            <img src={Logo} className="w-16" alt="" />
          </section>

          {/*** Texts */}
          <section className="space-y-2">
            <h2 className="text-white text-2xl text-center font-semibold md:text-3xl lg:text-left">
              Boost Your Productivity, Stay Accountable, and Collaborate with
              Peers
            </h2>
            <h4 className="text-electricBlue50 text-base text-center font-regular md:text-lg lg:text-left">
              Join us today and start collaborating with others while staying
              accountable to your personal or academic goals.
            </h4>
          </section>

          {/***Buttons */}
          <section className="w-full mx-auto flex flex-wrap justify-center gap-3 mt-4 font-semibold lg:justify-start">
            <Link className="w-full max-w-[210px]" to="/signin">
              <button className="w-full h-[44px] max-w-[240px] p-2 border-2 border-electricBlue50 text-white text-base rounded-lg md:h-max md:text-lg">
                Sign In
              </button>
            </Link>

            <Link className="w-full max-w-[210px]" to="/createaccount">
              <button className="w-full h-[44px] max-w-[240px] p-2 bg-blue200 text-white text-base rounded-lg md:h-max md:text-lg">
                Create Account
              </button>
            </Link>
          </section>
        </section>

        <section className="hidden w-max h-full bg-blue300 m-6 rounded-2xl lg:flex items-center justify-center">
          <img src={resetPasswordImg} className="min-w-[350px]" alt="" />
        </section>
      </main>
    </div>
  );
}

export default WelcomePage;
