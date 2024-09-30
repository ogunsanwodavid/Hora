import { Link } from "react-router-dom";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import Logo from "../../assets/logo.svg";

function WelcomePage() {
  const { windowHeight } = useWindowDimensions();

  return (
    <div className="font-raleway w-full bg-gradient-to-br from-blue300 from-0% via-darkestBlue via-80% to-blue300 to-100%">
      <main
        className="welcome-scale max-w-[550px] mx-auto w-full flex flex-col gap-y-6 items-center justify-center px-6"
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
          <h2 className="text-white text-2xl text-center font-semibold md:text-3xl">
            Boost Your Productivity, Stay Accountable, and Collaborate with
            Peers
          </h2>
          <h4 className="text-electricBlue50 text-base text-center font-regular md:text-lg">
            Join us today and start collaborating with others while staying
            accountable to your personal or academic goals.
          </h4>
        </section>

        {/***Buttons */}
        <section className="w-full mx-auto flex flex-wrap justify-center gap-3 mt-5 font-semibold">
          <Link className="w-full max-w-[210px]" to="/signin">
            <button className="w-full h-[44px] max-w-[240px] p-2 border-2 border-electricBlue50 text-white text-base rounded-full md:h-max md:text-lg">
              Sign In
            </button>
          </Link>

          <Link className="w-full max-w-[210px]" to="/createaccount">
            <button className="w-full h-[44px] max-w-[240px] p-2 bg-blue200 text-white text-base rounded-full md:h-max md:text-lg">
              Create Account
            </button>
          </Link>
        </section>
      </main>
    </div>
  );
}

export default WelcomePage;
