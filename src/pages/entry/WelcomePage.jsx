import { Link } from "react-router-dom";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import Logo from "../../assets/logo.svg";

function WelcomePage() {
  const { windowHeight } = useWindowDimensions();

  return (
    <div className="font-raleway w-full bg-gradient-to-b from-blue300 via-blue150 to-darkestBlue">
      <main
        className="welcome-scale w-full flex flex-col gap-y-6 items-center justify-center px-6"
        style={{
          minHeight: `${windowHeight}px`,
        }}
      >
        {/*** Logo */}
        <section className="w-20 h-20 flex items-center justify-center p-3 rounded-full bg-darkestBlue">
          <img src={Logo} className="w-16" alt="" />
        </section>

        {/*** Texts */}
        <section className="space-y-2">
          <h2 className="text-white text-2xl text-center font-semibold">
            Welcome!
          </h2>
          <h4 className="text-electricBlue50 text-base text-center font-regular">
            Thanks for joining! Access or create your account below, and get
            started on your journey
          </h4>
        </section>

        {/***Buttons */}
        <section className="w-full flex flex-wrap justify-center gap-3 mt-5 font-semibold">
          <Link className="w-full" to="/signin">
            <button className="w-full h-[44px] p-2 border-2 border-electricBlue50 text-white text-base rounded-lg">
              Sign In
            </button>
          </Link>

          <Link className="w-full" to="/createaccount">
            <button className="w-full h-[44px] p-2 bg-blue200 text-white text-base rounded-lg">
              Create Account
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}

export default WelcomePage;
